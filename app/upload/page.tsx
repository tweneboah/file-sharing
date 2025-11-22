'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DropzoneUploader from '@/components/DropzoneUploader';
import { FiUploadCloud, FiShield, FiZap, FiCheck } from 'react-icons/fi';

/**
 * Upload page - Protected route
 * Allows authenticated users to upload files
 */
export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#202020] via-[#2C2B2B] to-[#393939] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#66E3D3]/30 border-t-[#66E3D3] rounded-full animate-spin"></div>
          <div className="text-[#66E3D3] text-xl font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#202020] via-[#2C2B2B] to-[#393939] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#66E3D3]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#5BD26D]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C2B2B]/60 backdrop-blur-sm border border-[#393939] rounded-full">
              <FiUploadCloud className="text-[#66E3D3]" />
              <span className="text-white text-sm font-medium">Secure Upload</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Upload Your <span className="bg-linear-to-r from-[#66E3D3] to-[#5BD26D] bg-clip-text text-transparent">Files</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Drag and drop your files below or click to browse. 
            Get an instant shareable link once uploaded.
          </p>

          {/* Quick Info Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#2C2B2B]/60 backdrop-blur-sm rounded-full border border-[#393939]">
              <FiCheck className="text-[#66E3D3]" />
              <span className="text-white text-sm">100MB Max</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#2C2B2B]/60 backdrop-blur-sm rounded-full border border-[#393939]">
              <FiZap className="text-[#66E3D3]" />
              <span className="text-white text-sm">Instant Share</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#2C2B2B]/60 backdrop-blur-sm rounded-full border border-[#393939]">
              <FiShield className="text-[#66E3D3]" />
              <span className="text-white text-sm">Secure Storage</span>
            </div>
          </div>
        </div>

        {/* Uploader */}
        <DropzoneUploader />

        {/* Supported Formats */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-[#2C2B2B]/40 backdrop-blur-sm border border-[#393939] rounded-2xl px-8 py-6 max-w-3xl">
            <h3 className="text-white font-semibold mb-3 flex items-center justify-center gap-2">
              <FiCheck className="text-[#66E3D3]" />
              Supported File Types
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Documents (PDF, DOCX) • Images (JPG, PNG, GIF, WEBP) • 
              Videos (MP4, AVI, MOV) • Audio (MP3, WAV) • Archives (ZIP, RAR)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

