import Image, { ImageProps } from "next/image";
import { isBlobUrl } from "@/lib/blob";

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
 * Enhanced Image component that handles both Blob URLs and local paths
 * Uses Next.js Image optimization for all images
 * Note: Component name kept as CloudinaryImage for backwards compatibility
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
  
  // For Vercel Blob URLs or any URL, use Next.js Image component
  // Next.js Image automatically optimizes images from Vercel Blob Storage
  // cloudinaryOptions are kept for backwards compatibility but ignored
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

