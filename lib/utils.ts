import { type ClassValue, clsx } from "clsx";

/**
 * Format file size from bytes to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file type category from MIME type
 * @param mimeType - File MIME type
 * @returns File type category
 */
export function getFileTypeFromMime(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('text')) return 'document';
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('archive')) return 'archive';
  return 'file';
}

/**
 * Build public file URL
 * @param fileId - MongoDB file ID
 * @returns Public URL
 */
export function buildPublicFileUrl(fileId: string): string {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return `${baseUrl}/file/${fileId}`;
}

/**
 * Validate file type against allowed types
 * @param mimeType - File MIME type
 * @returns Boolean indicating if file type is allowed
 */
export function isAllowedFileType(mimeType: string): boolean {
  const allowedTypes = [
    // Images
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    // Documents
    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain', 'text/csv',
    // Audio
    'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm',
    // Video
    'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm',
    // Archives
    'application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed',
  ];
  
  return allowedTypes.includes(mimeType);
}

/**
 * Format date to readable string
 * @param date - Date object or string
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Calculate total storage used by user
 * @param files - Array of file metadata
 * @returns Total bytes used
 */
export function calculateTotalStorage(files: { fileSize: number }[]): number {
  return files.reduce((total, file) => total + file.fileSize, 0);
}

/**
 * Check if user has exceeded storage limit (3GB)
 * @param totalBytes - Total bytes used
 * @returns Boolean indicating if limit exceeded
 */
export function isStorageLimitExceeded(totalBytes: number): boolean {
  const MAX_STORAGE = 3 * 1024 * 1024 * 1024; // 3GB in bytes
  return totalBytes >= MAX_STORAGE;
}

