'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { FileWithDownloadUrl } from '@/types/file';
import { 
  FiFile, FiImage, FiVideo, FiMusic, FiArchive, FiFileText, 
  FiDownload, FiClock, FiCalendar, FiHardDrive, FiShield 
} from 'react-icons/fi';
import { formatFileSize, formatDate, getFileTypeFromMime } from '@/lib/utils';

/**
 * Public file page
 * Anyone with the link can view and download the file
 */
export default function FilePage() {
  const params = useParams();
  const fileId = params.id as string;
  
  const [file, setFile] = useState<FileWithDownloadUrl | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    loadFile();
  }, [fileId]);

  // Countdown timer for signed URL
  useEffect(() => {
    if (!file) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reload file to get new signed URL
          loadFile();
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [file]);

  const loadFile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<FileWithDownloadUrl>(`/api/file?id=${fileId}`);
      setFile(response.data);
      setTimeLeft(600); // Reset timer
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#202020] via-[#2C2B2B] to-[#393939] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#ffd60a]/30 border-t-[#ffd60a] rounded-full animate-spin"></div>
          <div className="text-[#66E3D3] text-xl font-semibold">Loading file...</div>
        </div>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#202020] via-[#2C2B2B] to-[#393939] flex items-center justify-center px-4">
        <div className="bg-[#2C2B2B]/60 backdrop-blur-sm border-2 border-red-500 rounded-2xl p-8 md:p-12 text-center max-w-md shadow-2xl">
          <div className="w-20 h-20 bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiFile className="text-4xl text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">File Not Found</h2>
          <p className="text-white/70 leading-relaxed">
            {error || 'This file may have been deleted or the link is invalid. Please check the URL and try again.'}
          </p>
        </div>
      </div>
    );
  }

  const fileType = getFileTypeFromMime(file.mimeType);

  // Get appropriate icon based on file type
  const getFileIcon = () => {
    switch (fileType) {
      case 'image':
        return <FiImage className="text-8xl md:text-9xl text-[#66E3D3]" />;
      case 'video':
        return <FiVideo className="text-8xl md:text-9xl text-[#66E3D3]" />;
      case 'audio':
        return <FiMusic className="text-8xl md:text-9xl text-[#66E3D3]" />;
      case 'document':
        return <FiFileText className="text-8xl md:text-9xl text-[#66E3D3]" />;
      case 'archive':
        return <FiArchive className="text-8xl md:text-9xl text-[#66E3D3]" />;
      default:
        return <FiFile className="text-8xl md:text-9xl text-[#66E3D3]" />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#202020] via-[#2C2B2B] to-[#393939] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#66E3D3]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#5BD26D]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C2B2B]/60 backdrop-blur-sm border border-[#393939] rounded-full">
            <FiShield className="text-[#66E3D3]" />
            <span className="text-white text-sm font-medium">Secure File Access</span>
          </div>
        </div>

        <div className="bg-[#2C2B2B]/60 backdrop-blur-sm border-2 border-[#393939] rounded-3xl p-6 md:p-10 shadow-2xl">
          {/* File Preview/Icon */}
          <div className="flex justify-center mb-8">
            {fileType === 'image' ? (
              <div className="relative group">
                <img
                  src={file.cloudinaryUrl}
                  alt={file.fileName}
                  className="max-w-full max-h-[500px] rounded-2xl shadow-2xl border-2 border-[#393939] group-hover:border-[#ffd60a] transition-all"
                />
              </div>
            ) : fileType === 'video' ? (
              <video
                src={file.cloudinaryUrl}
                controls
                className="max-w-full max-h-[500px] rounded-2xl shadow-2xl border-2 border-[#393939]"
              >
                Your browser does not support video playback.
              </video>
            ) : fileType === 'audio' ? (
              <div className="w-full">
                <div className="flex justify-center py-12">
                  {getFileIcon()}
                </div>
                <audio 
                  src={file.cloudinaryUrl} 
                  controls 
                  className="w-full mt-6 rounded-xl bg-[#202020] border border-[#393939]"
                >
                  Your browser does not support audio playback.
                </audio>
              </div>
            ) : (
              <div className="py-16 bg-[#202020]/50 rounded-2xl w-full flex justify-center border-2 border-[#393939]">
                {getFileIcon()}
              </div>
            )}
          </div>

          {/* File Info */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 break-words px-4">
              {file.fileName}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#202020]/50 rounded-xl border border-[#393939]">
                <FiFile className="text-[#66E3D3]" />
                <span className="text-white capitalize">{fileType}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#202020]/50 rounded-xl border border-[#393939]">
                <FiHardDrive className="text-[#66E3D3]" />
                <span className="text-white">{formatFileSize(file.fileSize)}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#202020]/50 rounded-xl border border-[#393939]">
                <FiCalendar className="text-[#66E3D3]" />
                <span className="text-white">{formatDate(file.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Download Timer */}
          <div className="bg-linear-to-r from-[#000814] to-[#001d3d] rounded-2xl p-6 mb-8 text-center border-2 border-[#393939] shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#66E3D3]/20 rounded-xl flex items-center justify-center">
                <FiClock className="text-xl text-[#66E3D3] animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">
                  Link expires in: <span className="text-[#66E3D3]">{formatTime(timeLeft)}</span>
                </p>
                <p className="text-white/60 text-sm">Will refresh automatically</p>
              </div>
            </div>
            <div className="w-full bg-[#202020] rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#ffd60a] to-[#ffc300] transition-all duration-1000"
                style={{ width: `${(timeLeft / 600) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Download Button */}
          <a
            href={file.downloadUrl}
            download={file.fileName}
            className="group w-full flex items-center justify-center gap-4 px-8 py-5 bg-linear-to-r from-[#ffd60a] to-[#ffc300] text-[#202020] font-bold text-lg md:text-xl rounded-2xl hover:shadow-2xl hover:shadow-[#66E3D3]/40 transition-all transform hover:scale-105"
          >
            <FiDownload className="text-2xl md:text-3xl group-hover:animate-bounce" />
            <span>Download File</span>
          </a>

          <p className="text-center text-white/60 text-sm mt-6">
            Click the button above to securely download this file
          </p>
        </div>
      </div>
    </div>
  );
}

