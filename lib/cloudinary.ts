import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadResponse } from '@/lib/types';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'do3xmosmr',
  api_key: process.env.CLOUDINARY_API_KEY || '494148943952653',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'FFWKhpW_xxXDgg5_yzDxUk9Uo1I',
  secure: true,
});

/**
 * Upload an image file to Cloudinary
 * @param file - File buffer or base64 string
 * @param folder - Folder path in Cloudinary (default: "Root")
 * @param publicId - Optional public ID for the image
 * @returns Upload response with secure URL
 */
export async function uploadImageToCloudinary(
  file: Buffer | string,
  folder: string = 'Root',
  publicId?: string
): Promise<CloudinaryUploadResponse> {
  try {
    const uploadOptions: any = {
      folder,
      resource_type: 'image',
      overwrite: false,
      invalidate: true,
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    let uploadResult;
    
    if (Buffer.isBuffer(file)) {
      // Upload from buffer using upload_stream
      uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file);
      });
    } else {
      // Upload from base64 or URL
      uploadResult = await cloudinary.uploader.upload(file, uploadOptions);
    }

    return {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      url: uploadResult.url,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
    };
  } catch (error: any) {
    throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
  }
}

/**
 * Build a Cloudinary URL from public ID
 * @param publicId - Cloudinary public ID
 * @param options - Transformation options
 * @returns Cloudinary URL
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'jpg' | 'png' | 'webp' | 'gif';
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    fetch_format?: 'auto';
  }
): string {
  const defaultOptions = {
    quality: 'auto' as const,
    fetch_format: 'auto' as const,
    ...options,
  };

  const transformations: string[] = [];
  
  if (defaultOptions.width) transformations.push(`w_${defaultOptions.width}`);
  if (defaultOptions.height) transformations.push(`h_${defaultOptions.height}`);
  if (defaultOptions.quality) transformations.push(`q_${defaultOptions.quality}`);
  if (defaultOptions.crop) transformations.push(`c_${defaultOptions.crop}`);
  if (defaultOptions.format) transformations.push(`f_${defaultOptions.format}`);

  const transformationString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : '';

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'do3xmosmr';
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${publicId}`;
}

/**
 * Delete an image from Cloudinary
 * @param publicId - Cloudinary public ID
 * @returns Deletion result
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<any> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error: any) {
    throw new Error(`Failed to delete image from Cloudinary: ${error.message}`);
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null
 */
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'do3xmosmr';
    const regex = new RegExp(`https://res\\.cloudinary\\.com/${cloudName}/image/upload/(?:[^/]+/)*(.+?)(?:\\.[^.]+)?$`);
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Check if a URL is a Cloudinary URL
 * @param url - URL to check
 * @returns boolean
 */
export function isCloudinaryUrl(url: string): boolean {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'do3xmosmr';
  return url.includes(`res.cloudinary.com/${cloudName}`);
}

