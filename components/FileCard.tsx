'use client';

import { useState } from 'react';
import { 
  FiFile, FiImage, FiVideo, FiMusic, FiArchive, FiFileText, 
  FiDownload, FiCopy, FiTrash2, FiCheck, FiExternalLink 
} from 'react-icons/fi';
import { FileMetadata } from '@/types/file';
import { formatFileSize, formatDate, getFileTypeFromMime, buildPublicFileUrl } from '@/lib/utils';
import axios from 'axios';

interface FileCardProps {
  file: FileMetadata;
  onDelete: (fileId: string) => void;
}

/**
 * File card component for displaying file information
 * Shows preview, metadata, and action buttons
 */
export default function FileCard({ file, onDelete }: FileCardProps) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fileType = getFileTypeFromMime(file.mimeType);
  const shareUrl = buildPublicFileUrl(file._id);

  // Get appropriate icon based on file type
  const getFileIcon = () => {
    switch (fileType) {
      case 'image':
        return <FiImage className="text-5xl md:text-6xl text-[#66E3D3]" />;
      case 'video':
        return <FiVideo className="text-5xl md:text-6xl text-[#66E3D3]" />;
      case 'audio':
        return <FiMusic className="text-5xl md:text-6xl text-[#66E3D3]" />;
      case 'document':
        return <FiFileText className="text-5xl md:text-6xl text-[#66E3D3]" />;
      case 'archive':
        return <FiArchive className="text-5xl md:text-6xl text-[#66E3D3]" />;
      default:
        return <FiFile className="text-5xl md:text-6xl text-[#66E3D3]" />;
    }
  };

  // Get type badge color
  const getTypeBadgeColor = () => {
    switch (fileType) {
      case 'image':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'video':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'audio':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'document':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'archive':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/delete?id=${file._id}`);
      onDelete(file._id);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete file');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="group bg-[#2C2B2B]/60 backdrop-blur-sm border-2 border-[#393939] rounded-2xl p-6 hover:border-[#66E3D3] hover:bg-[#2C2B2B]/90 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#66E3D3]/10">
      {/* File Preview/Icon */}
      <div className="relative flex justify-center mb-5 overflow-hidden rounded-xl">
        {fileType === 'image' ? (
          <div className="relative w-full h-52 overflow-hidden rounded-xl border-2 border-[#393939] group-hover:border-[#66E3D3] transition-all">
            <img
              src={file.cloudinaryUrl}
              alt={file.fileName}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ) : (
          <div className="w-full h-52 bg-linear-to-br from-[#000814] to-[#001d3d] rounded-xl flex items-center justify-center border-2 border-[#393939] group-hover:border-[#66E3D3] transition-all">
            <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              {getFileIcon()}
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg border backdrop-blur-sm text-xs font-semibold uppercase ${getTypeBadgeColor()}`}>
          {fileType}
        </div>
      </div>

      {/* File Info */}
      <div className="mb-5">
        <h3 className="text-white font-bold text-lg mb-2 truncate group-hover:text-[#66E3D3] transition-colors" title={file.fileName}>
          {file.fileName}
        </h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#202020]/50 rounded-lg border border-[#393939]">
            <FiFile className="text-[#66E3D3]" />
            <span className="text-white">{formatFileSize(file.fileSize)}</span>
          </div>
          <span className="text-white/60 text-xs">{formatDate(file.createdAt)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={copyLink}
          className="group/btn w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-[#ffd60a] to-[#ffc300] text-[#202020] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#66E3D3]/30 transition-all transform hover:scale-105"
        >
          {copied ? <FiCheck className="group-hover/btn:animate-bounce" /> : <FiCopy />}
          <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
        </button>

        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#393939] text-white font-medium rounded-xl hover:bg-[#393939]/80 hover:shadow-lg transition-all border border-[#393939] hover:border-[#66E3D3]/30"
        >
          <FiExternalLink />
          <span>View File</span>
        </a>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-900/20 text-red-400 font-medium rounded-xl hover:bg-red-900/40 transition-all border border-red-900/30 hover:border-red-500/50"
          >
            <FiTrash2 />
            <span>Delete</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {deleting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Deleting...
                </span>
              ) : (
                'Confirm Delete'
              )}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 px-4 py-2.5 bg-[#393939] text-white font-medium rounded-xl hover:bg-[#2C2B2B] transition-all border border-[#393939]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

