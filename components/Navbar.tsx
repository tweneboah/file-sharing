'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FiUploadCloud, FiFolder, FiLogOut, FiCloud, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

/**
 * Navigation bar component
 * Shows different options based on authentication status
 */
export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 25%, #4158D0 50%, #66E3D3 75%, #5BD26D 100%)',
      backdropFilter: 'blur(16px)',
      borderBottom: '4px solid rgba(255, 255, 255, 0.4)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 10px 40px rgba(102, 227, 211, 0.5), 0 0 80px rgba(255, 107, 157, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.3) inset',
      animation: 'gradientShift 8s ease infinite',
      backgroundSize: '200% 200%'
    }}>
      <style>
        {`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes slideDown {
            0% { 
              opacity: 0;
              transform: translateY(-20px);
            }
            100% { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div style={{
        maxWidth: '90rem',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '5.5rem'
        }}>
          {/* Logo - Responsive */}
          <Link 
            href="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              flex: 1
            }}
            className="group"
          >
            <div style={{
              width: '3rem',
              height: '3rem',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F7 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(255, 255, 255, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              animation: 'float 3s ease-in-out infinite',
              flexShrink: 0
            }} className="group-hover:scale-110 group-hover:rotate-12">
              <FiCloud style={{ fontSize: '1.5rem', color: '#FF6B9D' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <span style={{
                fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '0 3px 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5)',
                letterSpacing: '-0.5px',
                display: 'block',
                whiteSpace: 'nowrap'
              }}>
                Claudo
              </span>
              <div style={{
                fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 700,
                marginTop: '-4px',
                letterSpacing: '1px',
                whiteSpace: 'nowrap'
              }}>
                ✨ FILE SHARING ✨
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div style={{ display: 'none' }} className="md:flex md:items-center md:gap-3">
            {session ? (
              <>
                {/* Authenticated User */}
                <Link
                  href="/upload"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1.75rem',
                    borderRadius: '16px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    background: isActive('/upload') 
                      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' 
                      : 'rgba(255, 255, 255, 0.25)',
                    color: isActive('/upload') ? '#2C2B2B' : '#FFFFFF',
                    boxShadow: isActive('/upload') 
                      ? '0 8px 25px rgba(255, 215, 0, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.4)' 
                      : '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '3px solid rgba(255, 255, 255, 0.4)',
                    textShadow: isActive('/upload') ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}
                  className="hover:scale-110"
                >
                  <FiUploadCloud style={{ fontSize: '1.5rem' }} />
                  <span>Upload</span>
                </Link>

                <Link
                  href="/files"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1.75rem',
                    borderRadius: '16px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    background: isActive('/files') 
                      ? 'linear-gradient(135deg, #00D4FF 0%, #0099FF 100%)' 
                      : 'rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    boxShadow: isActive('/files') 
                      ? '0 8px 25px rgba(0, 212, 255, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.4)' 
                      : '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '3px solid rgba(255, 255, 255, 0.4)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}
                  className="hover:scale-110"
                >
                  <FiFolder style={{ fontSize: '1.5rem' }} />
                  <span>My Files</span>
                </Link>

                {/* User Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '16px',
                  border: '3px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 6px 20px rgba(168, 85, 247, 0.4)'
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F3E8FF 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}>
                    <FiUser style={{ color: '#A855F7', fontSize: '1.25rem' }} />
                  </div>
                  <span style={{
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    maxWidth: '140px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: 700,
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}>
                    {session.user?.email?.split('@')[0]}
                  </span>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={() => signOut()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1.75rem',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FF0000 0%, #DC143C 50%, #8B0000 100%)',
                    color: '#FFFFFF',
                    border: '3px solid rgba(255, 255, 255, 0.6)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.3)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  className="hover:scale-110"
                >
                  <FiLogOut style={{ fontSize: '1.5rem' }} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                {/* Guest User Navigation */}
                <Link
                  href="/"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '14px',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    border: '2px solid transparent'
                  }}
                  className="hover:bg-white/25 hover:border-white/40 hover:scale-105"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '14px',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    border: '2px solid transparent'
                  }}
                  className="hover:bg-white/25 hover:border-white/40 hover:scale-105"
                >
                  About
                </Link>
                
                <button
                  onClick={() => signIn('google')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 2.5rem',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#2C2B2B',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.5), 0 0 0 4px rgba(255, 255, 255, 0.4)',
                    transition: 'all 0.3s ease',
                    border: '3px solid rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  className="hover:scale-110"
                >
                  <span>🚀 Get Started</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)',
              border: '3px solid rgba(255, 255, 255, 0.6)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              flexShrink: 0
            }}
            className="md:hidden hover:scale-110 active:scale-95"
          >
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '1.5rem 0',
            animation: 'slideDown 0.3s ease'
          }} className="md:hidden">
            {session ? (
              <>
                <Link
                  href="/upload"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: isActive('/upload') 
                      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    color: isActive('/upload') ? '#2C2B2B' : '#FFFFFF',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    textShadow: isActive('/upload') ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <FiUploadCloud size={24} />
                  <span>Upload</span>
                </Link>

                <Link
                  href="/files"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: isActive('/files') 
                      ? 'linear-gradient(135deg, #00D4FF 0%, #0099FF 100%)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <FiFolder size={24} />
                  <span>My Files</span>
                </Link>

                <div style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Signed in as:</div>
                  <div style={{ fontWeight: 700, marginTop: '0.25rem' }}>{session.user?.email}</div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FF0000 0%, #DC143C 100%)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    border: '3px solid rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(255, 0, 0, 0.4)',
                    textTransform: 'uppercase'
                  }}
                >
                  <FiLogOut size={24} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)} 
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center'
                  }}
                >
                  Home
                </Link>

                <Link 
                  href="/about" 
                  onClick={() => setMobileMenuOpen(false)} 
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center'
                  }}
                >
                  About
                </Link>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signIn('google');
                  }}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#2C2B2B',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    border: '3px solid rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
                    textAlign: 'center'
                  }}
                >
                  🚀 Get Started
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

