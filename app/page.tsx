'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  FiUploadCloud, 
  FiShare2, 
  FiDownload, 
  FiLock, 
  FiZap, 
  FiCloud,
  FiFileText,
  FiImage,
  FiVideo
} from 'react-icons/fi';

/**
 * Home page with hero section and feature overview
 */
export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #C5F5EE 0%, #A8EDE5 50%, #8CE5DC 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: '2.5rem',
          width: '18rem',
          height: '18rem',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '9999px',
          filter: 'blur(80px)',
          animation: 'pulse 3s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '5rem',
          right: '2.5rem',
          width: '24rem',
          height: '24rem',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '9999px',
          filter: 'blur(80px)',
          animation: 'pulse 3s ease-in-out infinite',
          animationDelay: '700ms'
        }}></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-[#2C2B2B]/80 backdrop-blur-sm border border-[#393939] rounded-full">
            <span className="text-[#66E3D3] text-sm font-semibold">#TopFileSharePlatform</span>
          </div>
        </div>

        {/* Main Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
          {/* Floating file icons */}
          <div style={{
            position: 'absolute',
            left: '-2rem',
            top: 0,
            display: 'none'
          }} className="lg:block animate-float">
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(4px)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(12deg)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <FiFileText style={{ fontSize: '1.5rem', color: '#66E3D3' }} />
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            right: '-2rem',
            top: '5rem',
            display: 'none'
          }} className="lg:block animate-float delay-300">
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(4px)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-12deg)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <FiImage style={{ fontSize: '1.5rem', color: '#5BD26D' }} />
            </div>
          </div>

          <div style={{
            position: 'absolute',
            left: '4rem',
            bottom: 0,
            display: 'none'
          }} className="lg:block animate-float delay-500">
            <div style={{
              width: '3rem',
              height: '3rem',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(4px)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(6deg)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <FiVideo style={{ fontSize: '1.25rem', color: '#FF812B' }} />
            </div>
          </div>

          <div style={{
            position: 'absolute',
            right: '4rem',
            bottom: '-1rem',
            display: 'none'
          }} className="lg:block animate-float delay-700">
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(4px)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-6deg)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <FiCloud style={{ fontSize: '1.25rem', color: '#66E3D3' }} />
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 25%, #4158D0 75%, #5BD26D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              fontWeight: 900
            }}>
              Future-Proof
            </span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF1493 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              fontWeight: 900
            }}>
              Your Files,
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #0099FF 50%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              fontWeight: 900
            }}>
              Smartly Organized
            </span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#2C2B2B',
            marginBottom: '2.5rem',
            maxWidth: '50rem',
            margin: '0 auto 2.5rem',
            lineHeight: '1.8',
            fontWeight: 600,
            textShadow: '0 2px 8px rgba(255, 255, 255, 0.8)'
          }}>
            Store, share, and access your files from anywhere, with{' '}
            <span style={{
              color: '#FF6B9D',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(255, 107, 157, 0.5)'
            }}>robust security</span>,{' '}
            <span style={{
              color: '#4158D0',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(65, 88, 208, 0.5)'
            }}>seamless synchronization</span>, and{' '}
            <span style={{
              color: '#5BD26D',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(91, 210, 109, 0.5)'
            }}>complete peace of mind</span>.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }} className="sm:flex-row sm:justify-center">
            {session ? (
              <Link
                href="/upload"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 3rem',
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 50%, #4158D0 100%)',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(255, 107, 157, 0.4), 0 0 40px rgba(194, 57, 179, 0.3)',
                  border: '3px solid rgba(255, 255, 255, 0.5)',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                className="group hover:scale-110 hover:shadow-2xl"
              >
                <FiUploadCloud style={{ fontSize: '1.75rem' }} className="group-hover:animate-bounce" />
                Get Started
              </Link>
            ) : (
              <>
                <Link
                  href="/upload"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem 3rem',
                    background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 50%, #4158D0 100%)',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(255, 107, 157, 0.4), 0 0 40px rgba(194, 57, 179, 0.3)',
                    border: '3px solid rgba(255, 255, 255, 0.5)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  className="group hover:scale-110 hover:shadow-2xl"
                >
                  <FiZap style={{ fontSize: '1.75rem' }} className="group-hover:animate-pulse" />
                  Get Started
                </Link>
                <Link
                  href="/files"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem 3rem',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                    color: '#2C2B2B',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    borderRadius: '16px',
                    border: '3px solid rgba(255, 255, 255, 0.6)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  className="hover:scale-110 hover:shadow-2xl"
                >
                  <FiCloud style={{ fontSize: '1.75rem' }} />
                  View Files
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)',
            backdropFilter: 'blur(4px)',
            borderRadius: '9999px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
            transition: 'transform 0.3s ease'
          }} className="hover:scale-105">
            <FiLock style={{ color: '#FFFFFF', fontSize: '1.125rem' }} />
            <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Secure File Access</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #4158D0 0%, #5BD26D 100%)',
            backdropFilter: 'blur(4px)',
            borderRadius: '9999px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 4px 15px rgba(65, 88, 208, 0.3)',
            transition: 'transform 0.3s ease'
          }} className="hover:scale-105">
            <FiCloud style={{ color: '#FFFFFF', fontSize: '1.125rem' }} />
            <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Easy File Backup</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
            backdropFilter: 'blur(4px)',
            borderRadius: '9999px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
            transition: 'transform 0.3s ease'
          }} className="hover:scale-105">
            <FiShare2 style={{ color: '#2C2B2B', fontSize: '1.125rem' }} />
            <span style={{ color: '#2C2B2B', fontSize: '0.95rem', fontWeight: 700 }}>Share Work Seamlessly</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)',
            backdropFilter: 'blur(4px)',
            borderRadius: '9999px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
            transition: 'transform 0.3s ease'
          }} className="hover:scale-105">
            <FiZap style={{ color: '#FFFFFF', fontSize: '1.125rem' }} />
            <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Sync All Devices</span>
          </div>
        </div>

        {/* 3D Folder Illustrations Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '5rem',
          padding: '0 1rem'
        }}>
          {/* Blue Folder */}
          <div style={{
            background: 'rgba(157, 213, 255, 0.3)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center',
            position: 'relative',
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                background: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem'
              }}>
                <div style={{ width: '24px', height: '24px', background: '#8B5CF6', borderRadius: '4px' }}></div>
                ResearchDesign.fig
              </div>
              <div style={{
                background: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem'
              }}>
                <div style={{ width: '24px', height: '24px', background: '#EF4444', borderRadius: '4px' }}></div>
                FinalThesis.pdf
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #93C5FD 0%, #7DD3FC 100%)',
              height: '140px',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
              1.2GB
            </div>
          </div>

          {/* Green Folder */}
          <div style={{
            background: 'rgba(187, 247, 208, 0.3)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center',
            position: 'relative',
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                background: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem'
              }}>
                <div style={{ width: '24px', height: '24px', background: '#10B981', borderRadius: '4px' }}></div>
                TrainingSchedule.csv
              </div>
              <div style={{
                background: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem'
              }}>
                <div style={{ width: '24px', height: '24px', background: '#3B82F6', borderRadius: '4px' }}></div>
                ClientContract.docx
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #86EFAC 0%, #6EE7B7 100%)',
              height: '140px',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
              892.12MB
            </div>
          </div>

          {/* Orange/Yellow Folder */}
          <div style={{
            background: 'rgba(253, 224, 171, 0.3)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center',
            position: 'relative',
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                background: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem'
              }}>
                <div style={{ width: '24px', height: '24px', background: '#F59E0B', borderRadius: '4px' }}></div>
                ResumeTemplate.ai
              </div>
              <div style={{
                background: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem'
              }}>
                <div style={{ width: '24px', height: '24px', background: '#3B82F6', borderRadius: '4px' }}></div>
                WebsiteMockup.png
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #FCD34D 0%, #FDE68A 100%)',
              height: '140px',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
              2.4GB
            </div>
          </div>
        </div>

        {/* Storage Banner */}
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(8px)',
            border: '2px solid #66E3D3',
            borderRadius: '16px',
            padding: '1.5rem 2.5rem',
            boxShadow: '0 10px 40px rgba(102, 227, 211, 0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <p style={{
              color: '#2C2B2B',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              justifyContent: 'center'
            }}>
              <FiCloud style={{ fontSize: '1.875rem', color: '#66E3D3' }} />
              3GB Free Storage for All Users
            </p>
            <p style={{ color: '#404040', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Start uploading instantly - no credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
