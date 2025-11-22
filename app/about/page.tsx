'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  FiCloud, 
  FiShield, 
  FiZap, 
  FiUsers, 
  FiGlobe,
  FiHeart,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiLock
} from 'react-icons/fi';

/**
 * About page showcasing Claudo's mission, values, and features
 */
export default function AboutPage() {
  const { data: session } = useSession();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #C5F5EE 0%, #A8EDE5 25%, #8CE5DC 50%, #A8EDE5 75%, #C5F5EE 100%)',
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
          top: '10%',
          left: '5%',
          width: '20rem',
          height: '20rem',
          background: 'rgba(255, 107, 157, 0.15)',
          borderRadius: '9999px',
          filter: 'blur(80px)',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '24rem',
          height: '24rem',
          background: 'rgba(91, 210, 109, 0.15)',
          borderRadius: '9999px',
          filter: 'blur(80px)',
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: '1s'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30rem',
          height: '30rem',
          background: 'rgba(65, 88, 208, 0.1)',
          borderRadius: '9999px',
          filter: 'blur(100px)',
          animation: 'pulse 5s ease-in-out infinite',
          animationDelay: '2s'
        }}></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center' }} className="mb-12 md:mb-20">
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '50px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
          }} className="mb-6 md:mb-8">
            <FiHeart style={{ color: '#FF6B9D' }} className="text-lg md:text-xl" />
            <span style={{
              color: '#2C2B2B',
              fontWeight: 700
            }} className="text-sm md:text-base">
              About Claudo
            </span>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: '1.1'
          }} className="mb-6 md:mb-8 px-2">
            <span style={{
              background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 50%, #4158D0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              Empowering Everyone
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #66E3D3 0%, #5BD26D 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              To Share Freely
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            color: '#2C2B2B',
            maxWidth: '48rem',
            margin: '0 auto',
            lineHeight: '1.7',
            fontWeight: 600,
            textShadow: '0 2px 8px rgba(255, 255, 255, 0.8)'
          }} className="px-4">
            Claudo was built with a simple mission: make file sharing <span style={{ 
              color: '#FF6B9D', 
              fontWeight: 800,
              textShadow: '0 0 10px rgba(255, 107, 157, 0.4)'
            }}>effortless</span>, <span style={{ 
              color: '#4158D0', 
              fontWeight: 800,
              textShadow: '0 0 10px rgba(65, 88, 208, 0.4)'
            }}>secure</span>, and <span style={{ 
              color: '#5BD26D', 
              fontWeight: 800,
              textShadow: '0 0 10px rgba(91, 210, 109, 0.4)'
            }}>accessible</span> to everyone, everywhere.
          </p>
        </div>

        {/* Mission Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }} className="mb-12 md:mb-20 md:gap-8">
          {/* Card 1 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s ease',
            textAlign: 'center'
          }} className="p-6 md:p-10 hover:scale-105 hover:shadow-2xl">
            <div style={{
              background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(255, 107, 157, 0.4)'
            }} className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
              <FiTarget className="text-3xl md:text-4xl text-white" />
            </div>
            <h3 style={{
              fontWeight: 800,
              color: '#2C2B2B'
            }} className="text-xl md:text-2xl mb-3 md:mb-4">
              Our Mission
            </h3>
            <p style={{
              color: '#404040',
              lineHeight: '1.7',
              fontWeight: 500
            }} className="text-sm md:text-base">
              To revolutionize file sharing by creating a platform that prioritizes simplicity, security, and user experience above all else.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s ease',
            textAlign: 'center'
          }} className="p-6 md:p-10 hover:scale-105 hover:shadow-2xl">
            <div style={{
              background: 'linear-gradient(135deg, #4158D0 0%, #00D4FF 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(65, 88, 208, 0.4)'
            }} className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
              <FiShield className="text-3xl md:text-4xl text-white" />
            </div>
            <h3 style={{
              fontWeight: 800,
              color: '#2C2B2B'
            }} className="text-xl md:text-2xl mb-3 md:mb-4">
              Our Values
            </h3>
            <p style={{
              color: '#404040',
              lineHeight: '1.7',
              fontWeight: 500
            }} className="text-sm md:text-base">
              Privacy, transparency, and reliability form the foundation of everything we build. Your trust is our greatest asset.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s ease',
            textAlign: 'center'
          }} className="p-6 md:p-10 hover:scale-105 hover:shadow-2xl">
            <div style={{
              background: 'linear-gradient(135deg, #5BD26D 0%, #66E3D3 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(91, 210, 109, 0.4)'
            }} className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
              <FiGlobe className="text-3xl md:text-4xl text-white" />
            </div>
            <h3 style={{
              fontWeight: 800,
              color: '#2C2B2B'
            }} className="text-xl md:text-2xl mb-3 md:mb-4">
              Our Vision
            </h3>
            <p style={{
              color: '#404040',
              lineHeight: '1.7',
              fontWeight: 500
            }} className="text-sm md:text-base">
              A world where sharing files is as natural as having a conversation, with no barriers and limitless possibilities.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '3px solid rgba(255, 255, 255, 0.7)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
        }} className="p-6 md:p-12 mb-12 md:mb-20">
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 900,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FF6B9D 0%, #4158D0 50%, #5BD26D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }} className="mb-8 md:mb-12">
            Why Choose Claudo?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }} className="md:gap-8">
            {/* Feature 1 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem'
            }} className="md:gap-4">
              <div style={{
                background: 'linear-gradient(135deg, #66E3D3 0%, #5BD26D 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(102, 227, 211, 0.4)'
              }} className="w-12 h-12 md:w-14 md:h-14">
                <FiZap className="text-2xl md:text-3xl text-white" />
              </div>
              <div>
                <h4 style={{
                  fontWeight: 800,
                  color: '#2C2B2B'
                }} className="text-base md:text-xl mb-1 md:mb-2">
                  Lightning Fast
                </h4>
                <p style={{
                  color: '#404040',
                  lineHeight: '1.6',
                  fontWeight: 500
                }} className="text-sm md:text-base">
                  Upload and download files at blazing speeds with our optimized cloud infrastructure.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem'
            }} className="md:gap-4">
              <div style={{
                background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(255, 107, 157, 0.4)'
              }} className="w-12 h-12 md:w-14 md:h-14">
                <FiLock className="text-2xl md:text-3xl text-white" />
              </div>
              <div>
                <h4 style={{
                  fontWeight: 800,
                  color: '#2C2B2B'
                }} className="text-base md:text-xl mb-1 md:mb-2">
                  Secure & Private
                </h4>
                <p style={{
                  color: '#404040',
                  lineHeight: '1.6',
                  fontWeight: 500
                }} className="text-sm md:text-base">
                  End-to-end encryption ensures your files remain private and accessible only to you.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem'
            }} className="md:gap-4">
              <div style={{
                background: 'linear-gradient(135deg, #4158D0 0%, #00D4FF 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(65, 88, 208, 0.4)'
              }} className="w-12 h-12 md:w-14 md:h-14">
                <FiCloud className="text-2xl md:text-3xl text-white" />
              </div>
              <div>
                <h4 style={{
                  fontWeight: 800,
                  color: '#2C2B2B'
                }} className="text-base md:text-xl mb-1 md:mb-2">
                  Always Available
                </h4>
                <p style={{
                  color: '#404040',
                  lineHeight: '1.6',
                  fontWeight: 500
                }} className="text-sm md:text-base">
                  Access your files anytime, anywhere, from any device with 99.9% uptime guarantee.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem'
            }} className="md:gap-4">
              <div style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)'
              }} className="w-12 h-12 md:w-14 md:h-14">
                <FiUsers className="text-2xl md:text-3xl text-white" />
              </div>
              <div>
                <h4 style={{
                  fontWeight: 800,
                  color: '#2C2B2B'
                }} className="text-base md:text-xl mb-1 md:mb-2">
                  Easy Collaboration
                </h4>
                <p style={{
                  color: '#404040',
                  lineHeight: '1.6',
                  fontWeight: 500
                }} className="text-sm md:text-base">
                  Share files instantly with anyone using simple, secure links that work everywhere.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem'
            }} className="md:gap-4">
              <div style={{
                background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(168, 85, 247, 0.4)'
              }} className="w-12 h-12 md:w-14 md:h-14">
                <FiTrendingUp className="text-2xl md:text-3xl text-white" />
              </div>
              <div>
                <h4 style={{
                  fontWeight: 800,
                  color: '#2C2B2B'
                }} className="text-base md:text-xl mb-1 md:mb-2">
                  Scalable Storage
                </h4>
                <p style={{
                  color: '#404040',
                  lineHeight: '1.6',
                  fontWeight: 500
                }} className="text-sm md:text-base">
                  Start small and grow as you need. Our flexible plans adapt to your requirements.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem'
            }} className="md:gap-4">
              <div style={{
                background: 'linear-gradient(135deg, #FF1493 0%, #FF6B9D 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(255, 107, 157, 0.4)'
              }} className="w-12 h-12 md:w-14 md:h-14">
                <FiAward className="text-2xl md:text-3xl text-white" />
              </div>
              <div>
                <h4 style={{
                  fontWeight: 800,
                  color: '#2C2B2B'
                }} className="text-base md:text-xl mb-1 md:mb-2">
                  Award Winning
                </h4>
                <p style={{
                  color: '#404040',
                  lineHeight: '1.6',
                  fontWeight: 500
                }} className="text-sm md:text-base">
                  Recognized for excellence in design, security, and user satisfaction worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.12)'
        }} className="p-6 md:p-12">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 50%, #4158D0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }} className="mb-4 md:mb-6 px-2">
            Ready to Experience the Future?
          </h2>
          <p style={{
            color: '#2C2B2B',
            fontWeight: 600,
            maxWidth: '42rem',
            margin: '0 auto'
          }} className="text-base md:text-lg mb-6 md:mb-8 px-4">
            Join thousands of users who trust Claudo with their files every day.
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'center'
          }} className="sm:flex-row sm:gap-4">
            <Link
              href={session ? "/upload" : "/"}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF1493 100%)',
                color: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(255, 215, 0, 0.5)',
                border: '3px solid rgba(255, 255, 255, 0.6)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '100%',
                maxWidth: '20rem'
              }}
              className="py-3 px-6 md:py-4 md:px-10 text-base md:text-xl hover:scale-105 md:hover:scale-110 hover:shadow-2xl"
            >
              <FiCloud className="text-xl md:text-2xl" />
              <span className="whitespace-nowrap">{session ? "Upload Files" : "Get Started"}</span>
            </Link>

            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(8px)',
                color: '#2C2B2B',
                fontWeight: 'bold',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                border: '3px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '20rem'
              }}
              className="py-3 px-6 md:py-4 md:px-10 text-base md:text-lg hover:scale-105 md:hover:scale-110 hover:shadow-xl"
            >
              <span className="whitespace-nowrap">Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

