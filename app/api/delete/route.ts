import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import File from '@/models/File';
import cloudinary from '@/lib/cloudinary';
import { authOptions } from '@/lib/authOptions';

/**
 * DELETE /api/delete?id=xxx
 * Delete file from Cloudinary and MongoDB
 * Only owner can delete their files
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

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

    // Find file and verify ownership
    const file = await File.findById(fileId);

    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Check if user owns the file
    if (file.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden. You can only delete your own files.' },
        { status: 403 }
      );
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(file.cloudinaryPublicId, {
        resource_type: file.resourceType,
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary delete error:', cloudinaryError);
      // Continue with MongoDB deletion even if Cloudinary fails
    }

    // Delete from MongoDB
    await File.findByIdAndDelete(fileId);

    return NextResponse.json({
      message: 'File deleted successfully',
      fileName: file.fileName,
    });

  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error.message },
      { status: 500 }
    );
  }
}


