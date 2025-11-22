import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import cloudinary from '@/lib/cloudinary';
import connectDB from '@/lib/db';
import File from '@/models/File';
import { authOptions } from '@/lib/authOptions';
import { isAllowedFileType, buildPublicFileUrl, calculateTotalStorage, isStorageLimitExceeded } from '@/lib/utils';

// Validation schema
const uploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileSize: z.number().positive().max(100 * 1024 * 1024), // 100MB max
  mimeType: z.string().min(1),
});

/**
 * POST /api/upload
 * Upload file to Cloudinary and save metadata to MongoDB
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file metadata
    const validation = uploadSchema.safeParse({
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid file data', details: validation.error.errors },
        { status: 400 }
      );
    }

    // Check file type
    if (!isAllowedFileType(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed. Allowed: PDF, DOCX, images, audio, video, ZIP' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check user storage limit
    const userFiles = await File.find({ userId: session.user.id });
    const totalStorage = calculateTotalStorage(userFiles);
    
    if (isStorageLimitExceeded(totalStorage + file.size)) {
      return NextResponse.json(
        { error: 'Storage limit exceeded. Maximum 3GB per user.' },
        { status: 400 }
      );
    }

    // Determine resource type for Cloudinary
    let resourceType: 'image' | 'video' | 'raw' | 'auto' = 'raw';
    if (file.type.startsWith('image/')) resourceType = 'image';
    else if (file.type.startsWith('video/')) resourceType = 'video';

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using upload_stream
    console.log('🚀 Starting Cloudinary upload...', {
      fileName: file.name,
      fileSize: file.size,
      resourceType,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'fileshare/uploads',
          resource_type: resourceType,
          use_filename: false,
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else if (!result || !result.secure_url) {
            console.error('❌ Upload succeeded but no result returned');
            reject(new Error('Upload succeeded but no URL returned'));
          } else {
            console.log('✅ Cloudinary upload success:', {
              publicId: result.public_id,
              url: result.secure_url,
              resourceType: result.resource_type,
            });
            resolve(result);
          }
        }
      );

      // Write buffer and handle errors
      uploadStream.on('error', (error) => {
        console.error('❌ Upload stream error:', error);
        reject(error);
      });

      uploadStream.end(buffer);
    });

    // Verify upload result
    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Upload completed but no valid result returned');
    }

    console.log('💾 Saving to MongoDB...', {
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
    });

    // Save metadata to MongoDB
    const fileDoc = new File({
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      cloudinaryPublicId: uploadResult.public_id,
      cloudinaryUrl: uploadResult.secure_url,
      resourceType: uploadResult.resource_type,
      userId: session.user.id,
    });

    await fileDoc.save();
    
    console.log('✅ File saved to database:', fileDoc._id);

    // Generate shareable URL
    const shareUrl = buildPublicFileUrl(fileDoc._id.toString());

    return NextResponse.json({
      id: fileDoc._id.toString(),
      shareUrl,
      fileName: file.name,
      message: 'File uploaded successfully',
    }, { status: 201 });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error.message },
      { status: 500 }
    );
  }
}

