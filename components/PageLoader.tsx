'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Hide loader when complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    };

    if (document.readyState === 'complete') {
      setProgress(100);
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000] transition-opacity duration-700"
         style={{ opacity: isLoading ? 1 : 0 }}>
      
      {/* Animated Circuit Board Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Horizontal lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent"
              style={{
                top: `${(i + 1) * 12.5}%`,
                left: 0,
                right: 0,
                animation: `slideRight ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          {/* Vertical lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-[1px] bg-gradient-to-b from-transparent via-[#8892a6] to-transparent"
              style={{
                left: `${(i + 1) * 12.5}%`,
                top: 0,
                bottom: 0,
                animation: `slideDown ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#ffffff] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center gap-8 z-10">
        
        {/* Hexagon Spinner Container */}
        <div className="relative w-24 h-24">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#1e2738]"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ffffff] border-r-[#ffffff] animate-spin"></div>
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-4 rounded-full bg-[#ffffff] opacity-20 animate-pulse"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#ffffff] rounded-full animate-ping"></div>
            <div className="absolute w-2 h-2 bg-[#ffffff] rounded-full"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 space-y-3">
          <div className="relative h-1 bg-[#1e2738] rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#e0e0e0] via-[#ffffff] to-[#e0e0e0] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          
          {/* Loading Text with Typing Effect */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#b0b0b0] font-mono typing-text">
              {progress < 30 && 'Initializing...'}
              {progress >= 30 && progress < 60 && 'Loading Components...'}
              {progress >= 60 && progress < 90 && 'Almost There...'}
              {progress >= 90 && 'Ready!'}
            </span>
            <span className="text-[#ffffff] font-mono font-bold">
              {progress}%
            </span>
          </div>
        </div>

        {/* Tech Details */}
        <div className="text-[#808080] text-xs font-mono opacity-50 flex gap-4">
          <span className="animate-pulse">SYSTEM_INIT</span>
          <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>LOADING_ASSETS</span>
          <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>READY</span>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#ffffff] opacity-30"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#ffffff] opacity-30"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#ffffff] opacity-30"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#ffffff] opacity-30"></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideRight {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes slideDown {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, -20px); }
          75% { transform: translate(-10px, -10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .glitch-layer-1 {
          animation: glitch1 0.3s infinite;
          opacity: 0.8;
        }
        
        .glitch-layer-2 {
          animation: glitch2 0.3s infinite reverse;
          opacity: 0.8;
        }
        
        @keyframes glitch1 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
          66% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch2 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(2px, -2px); filter: hue-rotate(-90deg); }
          66% { transform: translate(-2px, 2px); }
        }
        
        .typing-text {
          animation: typing 0.5s steps(20) infinite;
        }
        
        @keyframes typing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
