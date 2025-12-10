'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Settings, Menu, Play, ChevronDown, X, Video, Flag, Heart, Crown, Upload, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="bg-black border-b border-[#1a1a1a] w-full" style={{ position: 'relative', zIndex: 100, overflow: 'visible' }}>
      <div className="w-full bg-[#303030]" style={{ overflow: 'visible' }}>
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Left: Logo and Region */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <Link href="/" className="flex items-center space-x-2.5">
              {/* Hamster head icon - white outline */}
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Head outline */}
                  <ellipse cx="20" cy="20" rx="16" ry="18" stroke="white" strokeWidth="2" fill="none"/>
                  {/* Ears */}
                  <ellipse cx="10" cy="12" rx="4" ry="5" stroke="white" strokeWidth="2" fill="none"/>
                  <ellipse cx="30" cy="12" rx="4" ry="5" stroke="white" strokeWidth="2" fill="none"/>
                  {/* Eyes */}
                  <circle cx="15" cy="18" r="2" fill="white"/>
                  <circle cx="25" cy="18" r="2" fill="white"/>
                  {/* Nose */}
                  <ellipse cx="20" cy="22" rx="1.5" ry="1" fill="white"/>
                  {/* Smile */}
                  <path d="M 15 26 Q 20 30 25 26" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg md:text-xl font-bold tracking-tight" style={{ fontFamily: 'inherit' }}>
                  <span className="text-[#f7000a]">X</span><span className="text-white">HAMSTER</span>
                </span>
                <span className="text-[10px] md:text-[11px] text-gray-400 leading-tight mt-0.5" style={{ fontFamily: 'inherit' }}>IN</span>
              </div>
            </Link>

            {/* Gender Symbol Dropdown - IN text first, then symbols */}
            <div className="hidden md:flex items-center space-x-2 cursor-pointer hover:bg-gray-800 px-2.5 py-1.5 rounded transition-colors">
              <span className="text-base text-gray-300 font-medium" style={{ fontFamily: 'inherit' }}>IN</span>
              <div className="flex items-center space-x-0.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#e91e63] border border-white/20"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#2196f3] -ml-1 border border-white/20"></div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Black Divider Bar */}
          <div className="hidden md:block w-px h-4 bg-black mx-4"></div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full flex items-center">
              <Input
                type="text"
                placeholder="Search for videos"
                className="w-full bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-500 pl-14 pr-24 h-11 text-base"
                style={{ fontFamily: 'inherit' }}
              />
              {/* Camera icon with dropdown on the left */}
              <button className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white flex items-center p-1.5 rounded hover:bg-gray-700 transition-colors">
                <Video className="w-5 h-5" />
                <ChevronDown className="w-4 h-4 ml-0.5" />
              </button>
              {/* Red search icon on the right */}
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#f7000a] hover:text-[#e60009] p-1.5 rounded hover:bg-gray-700 transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Black Divider Bar */}
          <div className="hidden md:block w-px h-4 bg-black mx-4"></div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded"
              aria-label="Toggle search"
            >
              <Search className="w-6 h-6 text-orange-600" />
            </button>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Settings with flag embedded */}
              <div className="relative cursor-pointer hover:bg-gray-800 p-2.5 rounded transition-colors">
                <Settings className="w-5 h-5 text-gray-300" />
                <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-orange-500 to-green-500 rounded-sm border border-white/30"></div>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 px-3 py-2 rounded transition-colors">
                <span className="text-base text-gray-300 font-medium" style={{ fontFamily: 'inherit' }}>EN</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white h-10 px-4 text-base font-medium" style={{ fontFamily: 'inherit' }}>
                Login
                <ChevronDown className="w-4 h-4 ml-1.5" />
              </Button>
              <Button className="bg-[#f7000a] hover:bg-[#e60009] text-white rounded-md px-5 py-2.5 h-10 text-base font-medium shadow-sm" style={{ fontFamily: 'inherit' }}>
                Sign up for free
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Settings className="w-5 h-5" />
              </Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 h-9">
                Sign up
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-3 px-6 lg:px-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for videos"
                className="w-full bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-500 pr-12 h-11 text-base"
                style={{ fontFamily: 'inherit' }}
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f7000a] hover:text-[#e60009]"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-[#1a1a1a] py-4 space-y-2 bg-[#303030]" style={{ fontFamily: 'inherit' }}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors" style={{ fontFamily: 'inherit' }}>
              <span>Videos</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              <span className="w-2.5 h-2.5 bg-[#f7000a] rounded-full"></span>
              <span>Live Sex</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              Categories
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              Pornstars
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              Creators
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              Channels
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              Photos
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              <Heart className="w-5 h-5 text-[#e91e63]" />
              <span>Nude Chat</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              <Crown className="w-5 h-5 text-[#ffc107]" />
              <span>Premium Videos</span>
              <Badge className="bg-[#f7000a] text-white text-sm" style={{ fontFamily: 'inherit' }}>-50%</Badge>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              Dating
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500"></div>
              <span>Play Sex Game</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 w-full text-left text-[#00bcd4] hover:text-[#00acc1] py-2.5 px-3 font-medium text-base transition-colors"
              style={{ fontFamily: 'inherit' }}
            >
              <Upload className="w-5 h-5" />
              <span>Upload</span>
            </button>
            <div className="pt-4 border-t border-gray-800 mt-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                Login
              </button>
              <div className="flex items-center space-x-2 px-2 mt-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-400">IN</span>
              </div>
            </div>
          </nav>
        )}
        </div>
      </div>
      <Navigation />
    </header>
  );
}

