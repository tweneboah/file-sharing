// TypeScript types for file metadata
export interface FileMetadata {
  _id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  cloudinaryPublicId: string;
  cloudinaryUrl: string;
  resourceType: string;
  userId: string;
  createdAt: Date;
}

export interface UploadResponse {
  id: string;
  shareUrl: string;
  fileName: string;
}

export interface FileWithDownloadUrl extends FileMetadata {
  downloadUrl: string;
}

export type FileType = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'all';


