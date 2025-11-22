import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import File from '@/models/File';
import { generateSignedUrl } from '@/lib/cloudinary';

/**
 * GET /api/file?id=xxx
 * Get file metadata and generate signed download URL
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileId = searchParams.get('id');

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find file
    const file = await File.findById(fileId);

    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Generate signed download URL (expires in 10 minutes)
    const downloadUrl = generateSignedUrl(
      file.cloudinaryPublicId,
      file.resourceType
    );

    // Return file metadata with download URL
    return NextResponse.json({
      _id: file._id,
      fileName: file.fileName,
      fileSize: file.fileSize,
      mimeType: file.mimeType,
      cloudinaryUrl: file.cloudinaryUrl,
      resourceType: file.resourceType,
      createdAt: file.createdAt,
      downloadUrl,
    });

  } catch (error: any) {
    console.error('Get file error:', error);
    return NextResponse.json(
      { error: 'Failed to get file', details: error.message },
      { status: 500 }
    );
  }
}

