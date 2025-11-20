# Cloudinary Integration Setup

This project uses Cloudinary for image storage and delivery. All images are stored on Cloudinary instead of local disk or Vercel.

## Configuration

Add the following environment variables to your `.env.local` file:

```env
CLOUDINARY_CLOUD_NAME=do3xmosmr
CLOUDINARY_API_KEY=494148943952653
CLOUDINARY_API_SECRET=FFWKhpW_xxXDgg5_yzDxUk9Uo1I
```

## Features

### 1. Image Upload
- **Admin Panel**: Use the `ImageUpload` component in the admin panel to upload images directly to Cloudinary
- **API Route**: Upload images via `/api/upload` endpoint
- **Folders**: Images are organized in folders (e.g., `Root/projects`, `Root/experience`)

### 2. Image Display
- All images are served from Cloudinary CDN
- Next.js Image component automatically optimizes Cloudinary images
- Cloudinary transformations can be applied for optimization

### 3. Utility Functions

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

#### Check if URL is Cloudinary
```typescript
import { isCloudinaryUrl } from '@/lib/cloudinary';

if (isCloudinaryUrl(imageUrl)) {
  // Handle Cloudinary image
}
```

## Usage in Components

### Basic Usage (Next.js Image)
```tsx
import Image from 'next/image';

<Image
  src="https://res.cloudinary.com/do3xmosmr/image/upload/Root/projects/image.jpg"
  alt="Project image"
  width={800}
  height={600}
/>
```

### Using CloudinaryImage Component (with transformations)
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

## Admin Panel

The admin panel includes image upload functionality:

1. **Projects**: Upload project logo images to `Root/projects` folder
2. **Experience**: Upload company logos to `Root/experience` folder
3. **Manual Entry**: You can also paste Cloudinary URLs directly

## Migration

To migrate existing local images to Cloudinary:

1. Upload images via the admin panel
2. Update image URLs in config files (`config/projects.ts`, `config/experience.ts`, etc.)
3. Replace local paths (e.g., `/projects/image.png`) with Cloudinary URLs

## Folder Structure in Cloudinary

```
Root/
├── projects/          # Project images
├── experience/        # Company logos
└── ...               # Other image categories
```

## Notes

- Images uploaded to Cloudinary are automatically optimized
- Cloudinary CDN ensures fast image delivery worldwide
- No images are stored on disk or in Vercel deployments
- Image transformations can be applied on-the-fly for different use cases

