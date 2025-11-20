import Image, { ImageProps } from "next/image";
import { CldImage } from "next-cloudinary";
import { isCloudinaryUrl } from "@/lib/cloudinary";

interface CloudinaryImageProps extends Omit<ImageProps, "src"> {
  src: string;
  cloudinaryOptions?: {
    width?: number;
    height?: number;
    quality?: number | "auto";
    format?: "auto" | "jpg" | "png" | "webp" | "gif";
    crop?: "fill" | "fit" | "scale" | "thumb";
  };
}

/**
 * Enhanced Image component that handles both Cloudinary URLs and local paths
 * Automatically optimizes Cloudinary images with transformations
 */
export default function CloudinaryImage({
  src,
  cloudinaryOptions,
  width,
  height,
  ...props
}: CloudinaryImageProps) {
  // Extract alt from props and ensure it's provided
  const { alt, ...restProps } = props;
  
  // If it's a Cloudinary URL, use CldImage from next-cloudinary for better optimization
  if (isCloudinaryUrl(src)) {
    // Extract public ID from Cloudinary URL for better optimization
    // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}
    let publicId = src;
    
    // Try to extract public ID (remove transformations if any)
    const urlParts = src.split("/upload/");
    if (urlParts.length > 1) {
      const afterUpload = urlParts[1];
      // Check if there are transformations (patterns like w_800,h_600,q_auto)
      const parts = afterUpload.split('/');
      if (parts.length > 1 && /^[a-z]+_[0-9,]+$/i.test(parts[0])) {
        // First part looks like transformations, use rest as public_id
        publicId = parts.slice(1).join('/');
      } else {
        // No transformations, use the full path as public_id
        publicId = afterUpload;
      }
      
      // Remove file extension for public_id (CldImage handles this better)
      publicId = publicId.replace(/\.[^/.]+$/, '');
    }
    
    // Use CldImage with extracted public ID and apply our transformations
    return (
      <CldImage
        src={publicId}
        width={width || undefined}
        height={height || undefined}
        alt={alt || ""}
        quality={cloudinaryOptions?.quality || "auto"}
        crop={cloudinaryOptions?.crop || undefined}
        format={cloudinaryOptions?.format || "auto"}
        {...restProps}
      />
    );
  }
  
  // Fallback to regular Next.js Image for non-Cloudinary URLs
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt || ""}
      {...restProps}
    />
  );
}

