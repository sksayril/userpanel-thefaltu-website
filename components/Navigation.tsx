'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Heart, Crown, MoreHorizontal, Upload, Video, TrendingUp, Clock, Star, Zap, ThumbsUp, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Navigation() {
  const pathname = usePathname();
  const isVideoPage = pathname?.startsWith('/video') || pathname === '/';
  const [isVideosHovered, setIsVideosHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const HIDE_DELAY = 200; // Delay in milliseconds before hiding the menu (200ms)

  const handleMouseEnter = () => {
    // Clear any pending hide timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVideosHovered(true);
  };

  const handleMouseLeave = () => {
    // Set a delay before hiding the menu
    timeoutRef.current = setTimeout(() => {
      setIsVideosHovered(false);
      timeoutRef.current = null;
    }, HIDE_DELAY);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-black border-t border-[#1a1a1a] w-full relative" style={{ zIndex: 100, overflow: 'visible' }}>
      <div className="w-full bg-[#303030] relative" style={{ zIndex: 100, overflow: 'visible' }}>
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-8" style={{ overflow: 'visible', position: 'relative' }}>
          <nav className="hidden md:flex items-center justify-start space-x-6 py-4 text-base overflow-x-auto overflow-y-visible scrollbar-hide border-t border-[#1a1a1a]" style={{ fontFamily: 'inherit', position: 'relative', zIndex: 100, overflow: 'visible', paddingTop: '1rem', paddingBottom: '1rem', paddingRight: '2rem' }}>
            <div 
              className="relative group"
              style={{ zIndex: 9999, position: 'relative' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/" 
                className={`flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap relative font-medium transition-colors ${
                  isVideoPage || isVideosHovered ? 'text-white' : 'text-gray-300'
                }`}
                style={{ fontFamily: 'inherit', paddingBottom: '12px', position: 'relative', zIndex: 9999 }}
                onMouseEnter={handleMouseEnter}
              >
                <span>Videos</span>
                <ChevronDown className="w-4 h-4" />
                {(isVideoPage || isVideosHovered) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"></span>
                )}
              </Link>
              
              {/* Dropdown Menu - No gap, directly attached */}
              {isVideosHovered && (
                <div 
                  className="absolute left-0 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2"
                  style={{ 
                    zIndex: 9999, 
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '0px',
                    display: 'block',
                    visibility: 'visible',
                    opacity: 1,
                    pointerEvents: 'auto',
                    minWidth: '256px',
                    backgroundColor: '#1a1a1a',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    href="/?filter=best" 
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <ThumbsUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm" style={{ color: '#d1d5db' }}>Best Videos</span>
                  </Link>
                  <Link 
                    href="/?filter=short" 
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <Settings className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm" style={{ color: '#d1d5db' }}>Short Videos</span>
                  </Link>
                  <Link 
                    href="/?filter=history" 
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm" style={{ color: '#d1d5db' }}>Watch History</span>
                  </Link>
                  <div className="h-px bg-gray-800 my-1" style={{ backgroundColor: '#1f2937' }}></div>
                  <Link 
                    href="/?category=indian" 
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <span className="text-sm" style={{ color: '#d1d5db' }}>Indian</span>
                    <span>🇮🇳</span>
                  </Link>
                  <Link 
                    href="/?category=amateur" 
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <span className="text-sm" style={{ color: '#d1d5db' }}>Amateur</span>
                  </Link>
                  <Link 
                    href="/?category=mature" 
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <span className="text-sm" style={{ color: '#d1d5db' }}>Mature</span>
                  </Link>
                  <Link 
                    href="/?category=old-young" 
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <span className="text-sm" style={{ color: '#d1d5db' }}>Old & Young</span>
                  </Link>
                  <Link 
                    href="/?category=lesbian" 
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <span className="text-sm" style={{ color: '#d1d5db' }}>Lesbian</span>
                  </Link>
                  <div className="h-px bg-gray-800 my-1" style={{ backgroundColor: '#1f2937' }}></div>
                  <Link 
                    href="/?category=all" 
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors w-full"
                    style={{ fontFamily: 'inherit', display: 'flex', width: '100%', color: '#d1d5db' }}
                    onClick={() => setIsVideosHovered(false)}
                  >
                    <span className="text-sm" style={{ color: '#d1d5db' }}>All categories</span>
                  </Link>
                </div>
              )}
            </div>
            <button className="flex items-center space-x-2 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <span className="w-2.5 h-2.5 bg-[#f7000a] rounded-full flex-shrink-0"></span>
              <span>Live Sex</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <span>Pornstars</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <span>Creators</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <span>Channels</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <span>Photos</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-2 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <Heart className="w-5 h-5 text-[#e91e63] flex-shrink-0" />
              <span>Nude Chat</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <Crown className="w-5 h-5 text-[#ffc107] flex-shrink-0" />
              <span>Premium Videos</span>
              <Badge className="bg-[#f7000a] text-white text-xs px-2 py-0 h-5 font-semibold" style={{ fontFamily: 'inherit' }}>-50%</Badge>
            </button>
            <button className="flex items-center space-x-2 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <span className="w-2.5 h-2.5 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex-shrink-0"></span>
              <span>Dating</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <MoreHorizontal className="w-5 h-5 flex-shrink-0" />
              <span>Play Sex Game</span>
            </button>
            <button className="hover:text-gray-400 whitespace-nowrap text-white transition-colors" style={{ paddingBottom: '12px' }}>
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 text-[#00bcd4] hover:text-[#00acc1] whitespace-nowrap font-medium transition-colors" style={{ fontFamily: 'inherit', paddingBottom: '12px' }}>
              <Upload className="w-5 h-5 flex-shrink-0" />
              <span>Upload</span>
            </button>
            
            {/* Black Divider Bar - Same alignment as header */}
            <div className="hidden md:block w-px h-4 bg-black mx-4" style={{ marginLeft: '1rem', marginRight: '1rem' }}></div>
          </nav>
        </div>
      </div>
    </div>
  );
}

