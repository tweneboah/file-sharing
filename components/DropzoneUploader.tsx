'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FiUploadCloud, FiCheck, FiX, FiCopy, FiExternalLink, FiFile } from 'react-icons/fi';
import { formatFileSize } from '@/lib/utils';

interface UploadResponse {
  id: string;
  shareUrl: string;
  fileName: string;
  message: string;
}

/**
 * Drag-and-drop file uploader component
 * Uploads to Cloudinary via API and displays shareable link
 */
export default function DropzoneUploader() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setSelectedFile(file);
    setUploading(true);
    setError(null);
    setUploadSuccess(null);
    setUploadProgress(0);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload with progress tracking
      const response = await axios.post<UploadResponse>('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(percentCompleted);
        },
      });

      setUploadSuccess(response.data);
      setUploadProgress(100);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload file');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false,
  });

  const copyToClipboard = () => {
    if (uploadSuccess?.shareUrl) {
      navigator.clipboard.writeText(uploadSuccess.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reset = () => {
    setUploadSuccess(null);
    setError(null);
    setUploadProgress(0);
    setSelectedFile(null);
  };

  // Success screen
  if (uploadSuccess) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-[#2C2B2B]/60 backdrop-blur-sm border-2 border-[#66E3D3] rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-[#66E3D3]/20 animate-slideIn">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-linear-to-br from-[#ffd60a] to-[#ffc300] rounded-3xl flex items-center justify-center shadow-lg shadow-[#66E3D3]/40 animate-bounce-slow">
                <FiCheck className="text-5xl text-[#202020]" />
              </div>
              <div className="absolute inset-0 bg-[#66E3D3] rounded-3xl animate-ping opacity-20"></div>
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#ffd60a] to-[#ffc300] bg-clip-text text-transparent mb-3">
            Upload Successful!
          </h3>
          <p className="text-white/80 text-lg mb-8">
            Your file <span className="text-[#66E3D3] font-semibold">{uploadSuccess.fileName}</span> is ready to share
          </p>

          {/* Share Link Box */}
          <div className="bg-[#202020]/50 rounded-2xl p-6 mb-8 border-2 border-[#393939]">
            <div className="flex items-center gap-2 mb-3">
              <FiFile className="text-[#66E3D3]" />
              <p className="text-sm text-[#66E3D3] font-semibold">Your Shareable Link</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={uploadSuccess.shareUrl}
                readOnly
                className="flex-1 bg-[#2C2B2B] text-white px-4 py-3 rounded-xl border-2 border-[#393939] focus:outline-none focus:border-[#66E3D3] transition-all font-mono text-sm"
                onClick={(e) => e.currentTarget.select()}
              />
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-linear-to-r from-[#ffd60a] to-[#ffc300] text-[#202020] font-bold rounded-xl hover:shadow-lg hover:shadow-[#66E3D3]/40 transition-all flex items-center justify-center gap-2 transform hover:scale-105"
              >
                {copied ? (
                  <>
                    <FiCheck className="animate-bounce" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={uploadSuccess.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#393939] text-white font-semibold rounded-xl hover:bg-[#393939]/80 transition-all border-2 border-[#393939] hover:border-[#66E3D3]/30"
            >
              <FiExternalLink />
              <span>View File</span>
            </a>
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#2C2B2B] text-white font-semibold rounded-xl hover:bg-[#202020] transition-all border-2 border-[#393939]"
            >
              Upload Another File
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-3 border-dashed rounded-3xl p-12 md:p-16 text-center cursor-pointer transition-all duration-300 overflow-hidden
          ${isDragActive 
            ? 'border-[#66E3D3] bg-[#2C2B2B]/80 backdrop-blur-sm scale-105 shadow-2xl shadow-[#66E3D3]/30' 
            : 'border-[#393939] bg-[#2C2B2B]/40 backdrop-blur-sm hover:border-[#66E3D3]/50 hover:bg-[#2C2B2B]/60 hover:scale-102'
          }
        `}
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-linear-to-br from-[#ffd60a]/5 to-[#ffc300]/5 transition-opacity duration-300 ${isDragActive ? 'opacity-100' : 'opacity-0'}`}></div>

        <input {...getInputProps()} />

        <div className="relative z-10">
          {/* Upload Icon */}
          <div className="flex justify-center mb-6">
            <div className={`transform transition-all duration-300 ${isDragActive ? 'scale-110 animate-bounce' : ''}`}>
              <FiUploadCloud className={`text-8xl md:text-9xl transition-colors ${isDragActive ? 'text-[#66E3D3]' : 'text-[#66E3D3]/70'}`} />
            </div>
          </div>

          {uploading ? (
            <div className="animate-fadeIn">
              <p className="text-2xl font-bold text-white mb-6">Uploading your file...</p>
              
              {selectedFile && (
                <div className="mb-6 p-4 bg-[#202020]/50 rounded-xl border border-[#393939] max-w-md mx-auto">
                  <p className="text-white font-semibold truncate mb-2">{selectedFile.name}</p>
                  <p className="text-[#66E3D3] text-sm">{formatFileSize(selectedFile.size)}</p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="relative w-full bg-[#202020] rounded-full h-5 mb-4 overflow-hidden border-2 border-[#393939] shadow-inner">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-[#ffd60a] to-[#ffc300] rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
              <p className="text-[#66E3D3] font-bold text-xl">{uploadProgress}%</p>
            </div>
          ) : (
            <>
              {isDragActive ? (
                <div className="animate-fadeIn">
                  <p className="text-3xl font-bold text-[#66E3D3] mb-2">Drop it here!</p>
                  <p className="text-white/70">Release to upload your file</p>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <p className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Drag & drop your file here
                  </p>
                  <p className="text-[#66E3D3] text-lg mb-6 font-semibold">or click to browse</p>
                  
                  {/* Info Pills */}
                  <div className="flex flex-wrap justify-center gap-3 mt-8">
                    <div className="px-4 py-2 bg-[#202020]/50 rounded-xl border border-[#393939] text-white/80 text-sm">
                      <span className="text-[#66E3D3] font-semibold">Max:</span> 100MB
                    </div>
                    <div className="px-4 py-2 bg-[#202020]/50 rounded-xl border border-[#393939] text-white/80 text-sm">
                      <span className="text-[#66E3D3] font-semibold">Formats:</span> All common types
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 bg-red-900/30 backdrop-blur-sm border-2 border-red-500 rounded-2xl p-6 flex items-start gap-4 shadow-lg animate-slideIn">
          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiX className="text-white text-2xl" />
          </div>
          <div className="flex-1">
            <p className="text-red-400 font-bold text-lg mb-1">Upload Failed</p>
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

