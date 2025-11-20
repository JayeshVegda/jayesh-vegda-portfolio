import { put, del, list, head, BlobAccessError } from '@vercel/blob';

export interface BlobUploadResponse {
  url: string;
  pathname: string;
  contentType: string;
  contentDisposition: string;
  size: number;
  uploadedAt: Date;
}

/**
 * Upload an image file to Vercel Blob Storage
 * 
 * @param file - File object (not Buffer - use File directly from FormData)
 * @param folder - Folder path in Blob storage (default: "Root")
 * @param filename - Optional filename (auto-generated if not provided)
 * @returns Upload response with URL
 */
export async function uploadImageToBlob(
  file: File,
  folder: string = 'Root',
  filename?: string
): Promise<BlobUploadResponse> {
  try {
    // Generate filename if not provided
    const originalFilename = file.name || 'image';
    const extension = originalFilename.split('.').pop() || 'png';
    const blobFilename = filename || `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const pathname = folder ? `${folder}/${blobFilename}` : blobFilename;

    // Upload to Vercel Blob
    // Vercel Blob automatically uses BLOB_READ_WRITE_TOKEN from environment variables
    const blob = await put(pathname, file, {
      access: 'public',
      contentType: file.type || 'image/png',
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      contentDisposition: blob.contentDisposition,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    };
  } catch (error: any) {
    if (error instanceof BlobAccessError) {
      throw new Error(`Blob Storage access error: ${error.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to upload image to Blob Storage: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Delete an image from Vercel Blob Storage
 * 
 * @param url - Blob URL to delete
 * @returns Deletion result
 */
export async function deleteImageFromBlob(url: string): Promise<any> {
  try {
    const result = await del(url);
    return result;
  } catch (error: any) {
    if (error instanceof BlobAccessError) {
      throw new Error(`Blob Storage access error: ${error.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to delete image from Blob Storage: ${error.message || 'Unknown error'}`);
  }
}

/**
 * List images in a folder
 * 
 * @param folder - Folder path (optional)
 * @returns List of blobs
 */
export async function listBlobs(folder?: string): Promise<any[]> {
  try {
    const { blobs } = await list({
      prefix: folder ? `${folder}/` : undefined,
    });
    return blobs;
  } catch (error: any) {
    if (error instanceof BlobAccessError) {
      throw new Error(`Blob Storage access error: ${error.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to list blobs: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Get blob metadata
 * 
 * @param url - Blob URL
 * @returns Blob metadata
 */
export async function getBlobMetadata(url: string): Promise<any> {
  try {
    const blob = await head(url);
    return blob;
  } catch (error: any) {
    if (error instanceof BlobAccessError) {
      throw new Error(`Blob Storage access error: ${error.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to get blob metadata: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Check if a URL is a Vercel Blob URL
 * @param url - URL to check
 * @returns boolean
 */
export function isBlobUrl(url: string): boolean {
  return url.includes('.public.blob.vercel-storage.com') || url.includes('blob.vercel-storage.com');
}

/**
 * Extract pathname from Blob URL
 * @param url - Blob URL
 * @returns pathname or null
 */
export function extractPathnameFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Blob URLs have pathname in format: /path/to/file
    return urlObj.pathname.substring(1); // Remove leading slash
  } catch {
    return null;
  }
}

