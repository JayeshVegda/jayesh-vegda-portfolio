import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToBlob } from '@/lib/blob';

// Disable body parsing for file uploads (handled by FormData)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'Root';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob Storage
    const result = await uploadImageToBlob(file, folder);

    // Return response in Cloudinary-compatible format for backwards compatibility
    return NextResponse.json({
      success: true,
      data: {
        public_id: result.pathname,
        secure_url: result.url,
        url: result.url,
        format: result.contentType.split('/')[1] || 'unknown',
        width: 0, // Vercel Blob doesn't provide dimensions, use Next.js Image for optimization
        height: 0,
        bytes: result.size,
      },
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

