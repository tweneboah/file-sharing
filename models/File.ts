import { Schema, model, models } from 'mongoose';

/**
 * File Schema for storing file metadata in MongoDB
 * Actual file content is stored in Cloudinary
 */
const FileSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  cloudinaryPublicId: {
    type: String,
    required: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  resourceType: {
    type: String,
    required: true,
    enum: ['image', 'video', 'raw', 'auto'],
  },
  userId: {
    type: String,
    required: true,
    index: true, // Index for faster queries by user
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Index for sorting by date
  },
});

// Prevent model recompilation in development
const File = models.File || model('File', FileSchema);

export default File;

