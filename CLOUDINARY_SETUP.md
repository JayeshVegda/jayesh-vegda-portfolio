# Cloudinary Integration Setup

This project uses Cloudinary for image storage and delivery. All images are stored on Cloudinary instead of local disk or Vercel.

This implementation follows the [Next Cloudinary documentation](https://next.cloudinary.dev/installation) and uses the official `next-cloudinary` package.

## Configuration

Add the following environment variables to your `.env.local` file:

```env
# Client-side configuration (accessible in browser for CldImage component)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=do3xmosmr
NEXT_PUBLIC_CLOUDINARY_API_KEY=494148943952653

# Server-side only (for API routes and server-side uploads)
CLOUDINARY_CLOUD_NAME=do3xmosmr
CLOUDINARY_API_KEY=494148943952653
CLOUDINARY_API_SECRET=FFWKhpW_xxXDgg5_yzDxUk9Uo1I
```

**Important**: The `NEXT_PUBLIC_` prefix makes variables accessible in the browser. The API secret should NEVER have this prefix.

## Features

### 1. Image Upload
- **Admin Panel**: Use the `ImageUpload` component in the admin panel to upload images directly to Cloudinary
- **API Route**: Upload images via `/api/upload` endpoint
- **Folders**: Images are organized in folders (e.g., `Root/projects`, `Root/experience`)

### 2. Image Display with CldImage
The project uses `CldImage` from `next-cloudinary` for optimized Cloudinary images:

```tsx
import { CldImage } from "next-cloudinary";

<CldImage
  src="Root/projects/image-name"
  alt="Project image"
  width={800}
  height={600}
  quality="auto"
  crop="fill"
  format="auto"
/>
```

### 3. CloudinaryImage Component
A wrapper component that automatically detects Cloudinary URLs and uses `CldImage`:

```tsx
import CloudinaryImage from '@/components/common/cloudinary-image';

<CloudinaryImage
  src="https://res.cloudinary.com/do3xmosmr/image/upload/Root/projects/image.jpg"
  alt="Project image"
  width={800}
  height={600}
  cloudinaryOptions={{
    quality: 'auto',
    format: 'webp',
    crop: 'fit'
  }}
/>
```

### 4. Utility Functions

#### Upload Image
```typescript
import { uploadImageToCloudinary } from '@/lib/cloudinary';

const result = await uploadImageToCloudinary(
  fileBuffer,           // Buffer or base64 string
  'Root/projects',      // Folder path
  'optional-public-id'  // Optional public ID
);
```

#### Build Cloudinary URL
```typescript
import { getCloudinaryUrl } from '@/lib/cloudinary';

const url = getCloudinaryUrl('Root/projects/image-name', {
  width: 800,
  height: 600,
  quality: 'auto',
  format: 'webp'
});
```

#### Extract Public ID from URL
```typescript
import { extractPublicIdFromUrl } from '@/lib/cloudinary';

const publicId = extractPublicIdFromUrl(cloudinaryUrl);
// Returns: "Root/projects/image-name" (without extension)
```

#### Check if URL is Cloudinary
```typescript
import { isCloudinaryUrl } from '@/lib/cloudinary';

if (isCloudinaryUrl(imageUrl)) {
  // Handle Cloudinary image
}
```

## Usage in Components

### Using CldImage (Recommended)
```tsx
import { CldImage } from "next-cloudinary";

// Using public ID (recommended)
<CldImage
  src="Root/projects/image-name"
  alt="Project image"
  width={800}
  height={600}
/>

// Using full URL
<CldImage
  src="https://res.cloudinary.com/do3xmosmr/image/upload/Root/projects/image.jpg"
  alt="Project image"
  width={800}
  height={600}
/>
```

### Using CloudinaryImage Component (Automatic Detection)
```tsx
import CloudinaryImage from '@/components/common/cloudinary-image';

// Automatically uses CldImage for Cloudinary URLs
<CloudinaryImage
  src="https://res.cloudinary.com/do3xmosmr/image/upload/Root/projects/image.jpg"
  alt="Project image"
  width={800}
  height={600}
/>
```

### Using Next.js Image (Fallback)
```tsx
import Image from 'next/image';

// Works with Cloudinary URLs (already configured in next.config.js)
<Image
  src="https://res.cloudinary.com/do3xmosmr/image/upload/Root/projects/image.jpg"
  alt="Project image"
  width={800}
  height={600}
/>
```

## Admin Panel

The admin panel includes image upload functionality:

1. **Projects**: Upload project logo images to `Root/projects` folder
2. **Experience**: Upload company logos to `Root/experience` folder
3. **Manual Entry**: You can also paste Cloudinary URLs directly

## Migration

To migrate existing local images to Cloudinary:

1. Upload images via the admin panel
2. Update image URLs in config files (`config/projects.ts`, `config/experience.ts`, etc.)
3. Replace local paths (e.g., `/projects/image.png`) with Cloudinary URLs or public IDs

## Folder Structure in Cloudinary

```
Root/
├── projects/          # Project images
├── experience/        # Company logos
└── ...               # Other image categories
```

## Benefits of Using Next Cloudinary

- **Automatic Optimization**: `CldImage` automatically optimizes images
- **Lazy Loading**: Built-in lazy loading support
- **Responsive Images**: Automatic responsive image generation
- **Modern Formats**: Automatic WebP/AVIF format selection
- **Transformations**: Easy application of transformations
- **Type Safety**: Full TypeScript support

## Resources

- [Next Cloudinary Documentation](https://next.cloudinary.dev/installation)
- [CldImage Component](https://next.cloudinary.dev/components/cldimage)
- [CldUploadWidget](https://next.cloudinary.dev/components/clduploadwidget)
- [Cloudinary Transformations](https://cloudinary.com/documentation/transformation_reference)

## Notes

- Images uploaded to Cloudinary are automatically optimized
- Cloudinary CDN ensures fast image delivery worldwide
- No images are stored on disk or in Vercel deployments
- Image transformations can be applied on-the-fly for different use cases
- The `NEXT_PUBLIC_` prefix is required for client-side components like `CldImage`
