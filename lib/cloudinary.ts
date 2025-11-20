import { v2 as cloudinary, UploadApiResponse, UploadApiOptions } from 'cloudinary';
import { CloudinaryUploadResponse } from '@/lib/types';

// Configure Cloudinary v2 SDK
// Use server-side environment variables (CLOUDINARY_*) for security
// NEXT_PUBLIC_ variables are for client-side components like CldImage
// Reference: https://cloudinary.com/documentation/node_integration#configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'do3xmosmr',
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '494148943952653',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'FFWKhpW_xxXDgg5_yzDxUk9Uo1I',
  secure: true,
});

/**
 * Upload an image file to Cloudinary v2
 * Reference: https://cloudinary.com/documentation/image_upload_api_reference
 * 
 * @param file - File buffer or base64 string or URL
 * @param folder - Folder path in Cloudinary (default: "Root")
 * @param publicId - Optional public ID for the image
 * @param options - Additional upload options
 * @returns Upload response with secure URL
 */
export async function uploadImageToCloudinary(
  file: Buffer | string,
  folder: string = 'Root',
  publicId?: string,
  options?: Partial<UploadApiOptions>
): Promise<CloudinaryUploadResponse> {
  try {
    // Build upload options following Cloudinary v2 best practices
    const uploadOptions: UploadApiOptions = {
      folder,
      resource_type: 'image',
      overwrite: false,
      invalidate: true, // Invalidate CDN cache
      // Optimization options
      fetch_format: 'auto', // Auto-optimize format
      quality: 'auto', // Auto-optimize quality
      // Add any additional options
      ...options,
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    let uploadResult: UploadApiResponse;
    
    if (Buffer.isBuffer(file)) {
      // Upload from buffer using upload_stream (recommended for buffers)
      // Reference: https://cloudinary.com/documentation/image_upload_api_reference#upload_method
      uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error('Upload failed: No result returned'));
            }
          }
        );
        
        // Write buffer to stream and end it
        uploadStream.end(file);
      });
    } else {
      // Upload from base64 string or URL
      // Reference: https://cloudinary.com/documentation/image_upload_api_reference#upload_method
      uploadResult = await cloudinary.uploader.upload(file, uploadOptions);
    }

    // Return normalized response
    return {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      url: uploadResult.url,
      format: uploadResult.format || '',
      width: uploadResult.width || 0,
      height: uploadResult.height || 0,
      bytes: uploadResult.bytes || 0,
    };
  } catch (error: any) {
    // Enhanced error handling
    if (error.http_code) {
      throw new Error(`Cloudinary API error (${error.http_code}): ${error.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to upload image to Cloudinary: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Build a Cloudinary URL from public ID using Cloudinary v2 SDK
 * Reference: https://cloudinary.com/documentation/image_transformations
 * 
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
    crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit' | 'pad';
    fetch_format?: 'auto';
    gravity?: 'auto' | 'face' | 'faces' | 'center' | 'north' | 'south' | 'east' | 'west';
    radius?: number | 'max';
    angle?: number;
  }
): string {
  // Use Cloudinary v2 SDK's url() method for proper URL generation
  // This ensures correct transformation syntax and encoding
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
                    process.env.CLOUDINARY_CLOUD_NAME || 
                    'do3xmosmr';
  
  // Build transformation options object
  const transformationOptions: Record<string, any> = {
    fetch_format: options?.fetch_format || options?.format || 'auto',
    quality: options?.quality || 'auto',
  };

  if (options?.width) transformationOptions.width = options.width;
  if (options?.height) transformationOptions.height = options.height;
  if (options?.crop) transformationOptions.crop = options.crop;
  if (options?.gravity) transformationOptions.gravity = options.gravity;
  if (options?.radius !== undefined) transformationOptions.radius = options.radius;
  if (options?.angle !== undefined) transformationOptions.angle = options.angle;

  // Use Cloudinary v2 SDK's url() method
  // Reference: https://cloudinary.com/documentation/node_integration#url_method
  return cloudinary.url(publicId, {
    ...transformationOptions,
    secure: true,
    type: 'upload',
  });
}

/**
 * Delete an image from Cloudinary v2
 * Reference: https://cloudinary.com/documentation/admin_api#delete_resources
 * 
 * @param publicId - Cloudinary public ID
 * @param options - Delete options (e.g., resource_type, invalidate)
 * @returns Deletion result
 */
export async function deleteImageFromCloudinary(
  publicId: string,
  options?: {
    resource_type?: 'image' | 'video' | 'raw';
    invalidate?: boolean;
  }
): Promise<any> {
  try {
    const deleteOptions = {
      resource_type: options?.resource_type || 'image',
      invalidate: options?.invalidate !== false, // Invalidate CDN cache by default
    };

    const result = await cloudinary.uploader.destroy(publicId, deleteOptions);
    return result;
  } catch (error: any) {
    if (error.http_code) {
      throw new Error(`Cloudinary API error (${error.http_code}): ${error.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to delete image from Cloudinary: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Extract public ID from Cloudinary URL
 * Uses Cloudinary v2 SDK's utility method when available
 * Reference: https://cloudinary.com/documentation/image_transformations#chained_transformations
 * 
 * @param url - Cloudinary URL
 * @returns Public ID or null
 */
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
                      process.env.CLOUDINARY_CLOUD_NAME || 
                      'do3xmosmr';
    
    // Cloudinary URL pattern: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}
    // Match the full URL structure
    const regex = new RegExp(
      `https://res\\.cloudinary\\.com/${cloudName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/image/upload/(?:v\\d+/)?(?:[^/]+/)*(.+?)(?:\\.[^.]+)?$`,
      'i'
    );
    
    const match = url.match(regex);
    if (match && match[1]) {
      let publicId = match[1];
      
      // Remove version prefix if present (v1234567890/)
      publicId = publicId.replace(/^v\d+\//, '');
      
      // Remove transformations (they typically come before the public_id)
      // Transformations look like: w_800,h_600,c_fill,q_auto,f_auto
      const parts = publicId.split('/');
      
      // Filter out transformation-like patterns
      const publicIdParts = parts.filter(part => {
        // Skip parts that look like transformations
        // Transformations: w_800, h_600, c_fill, q_auto, f_auto, etc.
        // They contain underscores with specific patterns
        if (/^[a-z]+_[a-z0-9,]+$/i.test(part)) {
          // Check if it's a known transformation parameter
          const transformationKeys = ['w', 'h', 'c', 'q', 'f', 'g', 'r', 'a', 'e', 'd'];
          const key = part.split('_')[0].toLowerCase();
          if (transformationKeys.includes(key)) {
            return false; // This is a transformation, skip it
          }
        }
        return true; // Keep this part
      });
      
      return publicIdParts.length > 0 ? publicIdParts.join('/') : publicId;
    }
    return null;
  } catch (error) {
    console.error('Error extracting public ID from URL:', error);
    return null;
  }
}

/**
 * Check if a URL is a Cloudinary URL
 * @param url - URL to check
 * @returns boolean
 */
export function isCloudinaryUrl(url: string): boolean {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
                    process.env.CLOUDINARY_CLOUD_NAME || 
                    'do3xmosmr';
  return url.includes(`res.cloudinary.com/${cloudName}`);
}

