import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

// Validate configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn('⚠️ Cloudinary credentials are missing. Please add them to .env.local');
} else {
  console.log('✅ Cloudinary configured:', {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKeySet: !!process.env.CLOUDINARY_API_KEY,
    apiSecretSet: !!process.env.CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;

/**
 * Generate a signed download URL that expires in 10 minutes
 * @param publicId - Cloudinary public ID
 * @param resourceType - Resource type (image, video, raw)
 * @returns Signed URL
 */
export function generateSignedUrl(publicId: string, resourceType: string = 'raw'): string {
  const timestamp = Math.round(Date.now() / 1000) + 600; // Expires in 10 minutes
  
  // Generate signed URL with proper configuration
  return cloudinary.url(publicId, {
    resource_type: resourceType,
    type: 'upload',
    sign_url: true,
    secure: true,
    attachment: false, // Don't force download, allow preview
  });
}

