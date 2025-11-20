# Vercel Blob Storage Setup Guide

This guide will help you set up and use Vercel Blob Storage for image hosting in your Next.js portfolio.

## Overview

Vercel Blob Storage is a file storage solution designed specifically for Vercel deployments. It provides:
- ✅ Simple API integration
- ✅ Automatic CDN optimization
- ✅ Public access URLs
- ✅ Generous free tier (500GB bandwidth/month)
- ✅ Seamless integration with Next.js Image component

## Prerequisites

1. A Vercel account
2. A Vercel project deployed or linked
3. Node.js 18+ and npm/yarn

## Setup Steps

### 1. Install Dependencies

The package is already installed:
```bash
npm install @vercel/blob
```

### 2. Create a Blob Store

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project → **Storage** tab
3. Click **Create Database/Storage**
4. Select **Blob Storage**
5. Choose a name (e.g., `portfolio-images`)
6. Select a region close to your users
7. Click **Create**

### 3. Get Your Blob Token

1. In your Blob store, go to **Settings** → **Environment Variables**
2. Copy your **Read-Write Token** (starts with `vercel_blob_rw_...`)
3. This token is automatically available in your Vercel deployments

### 4. Configure Environment Variables

#### For Local Development

Add to your `.env.local` file:
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### For Vercel Deployment

1. Go to your project → **Settings** → **Environment Variables**
2. Add:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Your read-write token (from step 3)
   - **Environment**: Production, Preview, Development (select all)
3. Click **Save**

**Important**: The token is automatically injected in Vercel deployments, but you need it for local development.

## Usage

### Upload Images via API

The upload API route (`/api/upload`) automatically uses Vercel Blob Storage:

```typescript
// Example: Upload image
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('folder', 'projects'); // Optional folder

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const { data } = await response.json();
console.log(data.url); // Blob URL
```

### Use Images in Components

#### Using the CloudinaryImage Component (Backwards Compatible)

```tsx
import CloudinaryImage from '@/components/common/cloudinary-image';

<CloudinaryImage
  src={blobUrl}
  width={800}
  height={600}
  alt="Description"
/>
```

#### Using Next.js Image Directly

```tsx
import Image from 'next/image';

<Image
  src={blobUrl}
  width={800}
  height={600}
  alt="Description"
/>
```

Next.js automatically optimizes images from Vercel Blob Storage URLs!

### Delete Images

```typescript
import { deleteImageFromBlob } from '@/lib/blob';

await deleteImageFromBlob(blobUrl);
```

## API Reference

### `uploadImageToBlob(file, folder?, filename?)`

Upload an image to Vercel Blob Storage.

**Parameters:**
- `file: File` - The file to upload
- `folder?: string` - Optional folder path (default: "Root")
- `filename?: string` - Optional custom filename

**Returns:**
```typescript
{
  url: string;              // Public URL
  pathname: string;         // File path in storage
  contentType: string;      // MIME type
  contentDisposition: string;
  size: number;             // File size in bytes
  uploadedAt: Date;
}
```

### `deleteImageFromBlob(url)`

Delete an image from Vercel Blob Storage.

**Parameters:**
- `url: string` - Blob URL to delete

### `isBlobUrl(url)`

Check if a URL is a Vercel Blob URL.

**Parameters:**
- `url: string` - URL to check

**Returns:** `boolean`

### `listBlobs(folder?)`

List all blobs in a folder.

**Parameters:**
- `folder?: string` - Optional folder path

**Returns:** Array of blob objects

### `getBlobMetadata(url)`

Get metadata for a blob.

**Parameters:**
- `url: string` - Blob URL

**Returns:** Blob metadata object

## Image Optimization

Next.js Image component automatically optimizes images from Vercel Blob Storage:
- ✅ Automatic format conversion (WebP, AVIF)
- ✅ Responsive images
- ✅ Lazy loading
- ✅ Blur placeholders

No additional configuration needed!

## Migration from Cloudinary

If you're migrating from Cloudinary:

1. **Existing Images**: Cloudinary URLs will still work. You can keep them or migrate.
2. **Component Name**: The `CloudinaryImage` component still works but now uses Next.js Image for all URLs.
3. **API Compatibility**: The upload API returns responses in a Cloudinary-compatible format for backwards compatibility.

### Migration Steps

1. Upload new images to Vercel Blob Storage
2. Update existing image URLs in your config files if needed
3. Remove Cloudinary environment variables (optional)
4. Uninstall Cloudinary packages (optional):
   ```bash
   npm uninstall cloudinary next-cloudinary
   ```

## Troubleshooting

### "Blob Storage access error"

**Solution**: Ensure `BLOB_READ_WRITE_TOKEN` is set in your environment variables.

### Images not loading

**Solution**: 
1. Check that images are uploaded successfully (check the URL)
2. Verify `next.config.js` includes Blob storage domains in `remotePatterns`
3. Ensure images use HTTPS URLs

### Local development issues

**Solution**: 
1. Make sure `.env.local` contains `BLOB_READ_WRITE_TOKEN`
2. Restart your dev server after adding the token
3. The token is automatically available in Vercel deployments

## Pricing

**Free Tier:**
- 500 GB bandwidth/month
- Unlimited storage
- Public access

**Paid Plans:**
- $0.15 per additional GB bandwidth
- Perfect for high-traffic sites

## Best Practices

1. **Organize with Folders**: Use folders to organize images (e.g., `projects/`, `logos/`)
2. **Use Descriptive Filenames**: Auto-generated filenames are fine, but custom ones help
3. **Optimize Before Upload**: Compress large images before uploading (though Next.js optimizes automatically)
4. **Delete Unused Images**: Clean up old images to reduce storage costs (though free tier is generous)

## Resources

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Vercel Blob API Reference](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk)

## Support

If you encounter issues:
1. Check the [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
2. Review error messages in Vercel deployment logs
3. Ensure environment variables are set correctly

---

**Last Updated**: 2025-01-18

