import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import File from '@/models/File';
import { authOptions } from '@/lib/authOptions';

/**
 * GET /api/files?type=all|image|video|audio|document
 * Get all files for logged-in user with optional type filter
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const typeFilter = searchParams.get('type') || 'all';

    // Build query
    let query: any = { userId: session.user.id };

    // Apply type filter
    if (typeFilter !== 'all') {
      if (typeFilter === 'image') {
        query.mimeType = { $regex: '^image/' };
      } else if (typeFilter === 'video') {
        query.mimeType = { $regex: '^video/' };
      } else if (typeFilter === 'audio') {
        query.mimeType = { $regex: '^audio/' };
      } else if (typeFilter === 'document') {
        query.mimeType = { 
          $regex: 'pdf|document|word|text|excel|sheet',
          $options: 'i'
        };
      }
    }

    // Get files sorted by newest first
    const files = await File.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      files,
      count: files.length,
    });

  } catch (error: any) {
    console.error('Get files error:', error);
    return NextResponse.json(
      { error: 'Failed to get files', details: error.message },
      { status: 500 }
    );
  }
}

