import Image, { ImageProps } from "next/image";
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
  // If it's a Cloudinary URL and we have width/height, apply transformations
  let imageSrc = src;
  
  if (isCloudinaryUrl(src) && (width || height || cloudinaryOptions)) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "do3xmosmr";
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
    
    // Extract public ID from URL
    const urlParts = src.split("/upload/");
    if (urlParts.length > 1) {
      const afterUpload = urlParts[1];
      const transformationParts: string[] = [];
      
      // Apply width/height if provided
      if (width) transformationParts.push(`w_${width}`);
      if (height) transformationParts.push(`h_${height}`);
      
      // Apply custom options
      if (cloudinaryOptions) {
        if (cloudinaryOptions.quality) {
          transformationParts.push(`q_${cloudinaryOptions.quality}`);
        }
        if (cloudinaryOptions.crop) {
          transformationParts.push(`c_${cloudinaryOptions.crop}`);
        }
        if (cloudinaryOptions.format) {
          transformationParts.push(`f_${cloudinaryOptions.format}`);
        }
      }
      
      // Add fetch_format auto for optimization if not specified
      if (!cloudinaryOptions?.format) {
        transformationParts.push("f_auto");
      }
      
      const transformationString = transformationParts.length > 0
        ? `${transformationParts.join(",")}/`
        : "";
      
      imageSrc = `${baseUrl}/${transformationString}${afterUpload}`;
    }
  }

  return (
    <Image
      src={imageSrc}
      width={width}
      height={height}
      {...props}
    />
  );
}

