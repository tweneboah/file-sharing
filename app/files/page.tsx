'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FileCard from '@/components/FileCard';
import { FileMetadata, FileType } from '@/types/file';
import { FiFolder, FiFilter, FiUploadCloud, FiDatabase } from 'react-icons/fi';
import { formatFileSize, calculateTotalStorage } from '@/lib/utils';
import Link from 'next/link';

/**
 * Files dashboard page - Protected route
 * Shows all files uploaded by the user with filtering
 */
export default function FilesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FileType>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      loadFiles();
    }
  }, [session, filter]);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/files?type=${filter}`);
      setFiles(response.data.files);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (fileId: string) => {
    setFiles(files.filter(file => file._id !== fileId));
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#202020] via-[#2C2B2B] to-[#393939] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#ffd60a]/30 border-t-[#ffd60a] rounded-full animate-spin"></div>
          <div className="text-[#66E3D3] text-xl font-semibold">Loading your files...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const totalStorage = calculateTotalStorage(files);
  const storagePercentage = (totalStorage / (3 * 1024 * 1024 * 1024)) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#202020] via-[#2C2B2B] to-[#393939] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#66E3D3]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#5BD26D]/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-br from-[#ffd60a] to-[#ffc300] rounded-2xl flex items-center justify-center shadow-lg shadow-[#66E3D3]/30">
                  <FiFolder className="text-2xl text-[#202020]" />
                </div>
                <span>My Files</span>
              </h1>
              <p className="text-white/70 text-lg ml-[72px]">
                {files.length} file{files.length !== 1 ? 's' : ''} • {formatFileSize(totalStorage)} used
              </p>
            </div>

            <Link
              href="/upload"
              className="group flex items-center gap-3 px-6 py-3 bg-linear-to-r from-[#ffd60a] to-[#ffc300] text-[#202020] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#66E3D3]/40 transition-all transform hover:scale-105 self-start md:self-auto"
            >
              <FiUploadCloud className="text-2xl group-hover:animate-bounce" />
              <span>Upload New</span>
            </Link>
          </div>

          {/* Storage Progress Bar */}
          <div className="bg-[#2C2B2B]/60 backdrop-blur-sm border border-[#393939] rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FiDatabase className="text-[#66E3D3] text-2xl" />
                <span className="text-white font-semibold text-lg">Storage Usage</span>
              </div>
              <span className="text-[#66E3D3] font-bold text-lg">{storagePercentage.toFixed(1)}% of 3GB</span>
            </div>
            <div className="relative w-full bg-[#000814] rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className="absolute top-0 left-0 h-full bg-linear-to-r from-[#ffd60a] to-[#ffc300] rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-2">
              {formatFileSize(3 * 1024 * 1024 * 1024 - totalStorage)} remaining
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#2C2B2B]/60 backdrop-blur-sm border border-[#393939] rounded-xl">
              <FiFilter className="text-[#66E3D3] text-xl" />
              <span className="text-white font-semibold">Filter:</span>
            </div>
            {(['all', 'image', 'video', 'audio', 'document'] as FileType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`
                  px-5 py-2.5 rounded-xl capitalize font-medium transition-all transform hover:scale-105
                  ${filter === type 
                    ? 'bg-linear-to-r from-[#ffd60a] to-[#ffc300] text-[#202020] font-bold shadow-lg shadow-[#66E3D3]/30' 
                    : 'bg-[#393939]/50 text-white hover:bg-[#393939] border border-[#393939] hover:border-[#66E3D3]/30'
                  }
                `}
              >
                {type === 'all' ? 'All Files' : `${type}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 backdrop-blur-sm border-2 border-red-500 rounded-2xl p-6 mb-8 text-red-400 flex items-start gap-3 shadow-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white font-bold text-sm">!</span>
            </div>
            <div>
              <p className="font-semibold mb-1">Error Loading Files</p>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Files Grid */}
        {files.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-[#2C2B2B]/60 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 border-2 border-[#393939]">
              <FiFolder className="text-6xl text-[#66E3D3]/50" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {filter === 'all' ? 'No files uploaded yet' : `No ${filter} files found`}
            </h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Start uploading your files to see them here. Your files will be securely stored and easily accessible.'
                : `Try selecting a different filter to view other file types.`
              }
            </p>
            {filter === 'all' && (
              <Link
                href="/upload"
                className="inline-flex items-center gap-3 px-8 py-3 bg-linear-to-r from-[#ffd60a] to-[#ffc300] text-[#202020] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#66E3D3]/40 transition-all transform hover:scale-105"
              >
                <FiUploadCloud className="text-2xl" />
                Upload Your First File
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <FileCard key={file._id} file={file} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

