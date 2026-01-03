'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Settings, Menu, Video, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navigation from '@/components/Navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div data-role="header" className="header-wrapper">
      <header className="guest header" aria-label="header">
        {/* Purple Strip at Top */}
        <div className="w-full h-1 bg-gradient-to-r from-purple-600 to-purple-800"></div>
        
        {/* Top Header Section */}
        <div className="top-header">
          <div className="width-wrap section-container">
          <div className="search-section flex items-center justify-between py-3 md:py-4 gap-4">
            {/* Left: Logo and Orientation Dropdown */}
            <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>

              {/* Logo Container */}
              <div className="logo-container flex items-center" aria-hidden="true">
                <Link href="/" className="logo flex items-center space-x-2.5" tabIndex={-1}>
                  {/* Hamster head icon - white outline */}
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="20" cy="20" rx="16" ry="18" stroke="white" strokeWidth="2" fill="none"/>
                      <ellipse cx="10" cy="12" rx="4" ry="5" stroke="white" strokeWidth="2" fill="none"/>
                      <ellipse cx="30" cy="12" rx="4" ry="5" stroke="white" strokeWidth="2" fill="none"/>
                      <circle cx="15" cy="18" r="2" fill="white"/>
                      <circle cx="25" cy="18" r="2" fill="white"/>
                      <ellipse cx="20" cy="22" rx="1.5" ry="1" fill="white"/>
                      <path d="M 15 26 Q 20 30 25 26" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-lg md:text-xl font-bold tracking-tight">
                      <span className="text-[#f7000a]">X</span><span className="text-white">HAMSTER</span>
                    </span>
                    <span className="text-[10px] md:text-[11px] text-gray-400 leading-tight mt-0.5 preference-hint header-preference-hint straight">IN</span>
                  </div>
                </Link>
              </div>

              {/* Orientation Dropdown - Gender Symbols */}
              <div className="container-893b3 orientationDropdownContainer-201d7 desktop-201d7 hidden md:flex items-center" aria-hidden="true">
                <DropdownMenu>
                  <DropdownMenuTrigger className="trigger-893b3 orientationDropdownTrigger-201d7 flex items-center space-x-1 p-2 hover:bg-gray-800 rounded transition-colors">
                    <span className="root-33e82 flex items-center space-x-0.5">
                      {/* Male Symbol (Mars) */}
                      <svg viewBox="0 0 24 24" width="18" height="18" className="text-[#f7000a]">
                        <circle cx="12" cy="8" r="3" fill="currentColor"/>
                        <path d="M 12 11 L 12 20 M 7 15 L 3 15 M 17 15 L 21 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                      {/* Female Symbol (Venus) */}
                      <svg viewBox="0 0 24 24" width="18" height="18" className="text-[#f7000a]">
                        <circle cx="12" cy="8" r="3" fill="currentColor"/>
                        <path d="M 12 11 L 12 20 M 7 15 L 3 15 M 17 15 L 21 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M 7 20 L 17 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-[#1a1a1a] border-gray-800">
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Straight</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Gay</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Center: Search Bar */}
            <form 
              className="searchContainer-9d2fb search-container flex-1 max-w-2xl mx-4 md:mx-8 relative hidden md:flex" 
              action="" 
              method="get" 
              aria-label="Search" 
              role="search"
            >
              <div className="relative w-full flex items-center">
                <Input
                  type="text"
                  name="q"
                  autoComplete="off"
                  maxLength={120}
                  placeholder="Search for videos"
                  className="search-text w-full bg-black border-gray-700 text-white placeholder-gray-500 pl-14 pr-24 h-11 text-base rounded-full"
                  data-role="search-text"
                  aria-label="Search for videos edit text, blank. To perform search, press Enter"
                />
                
                {/* Video Type Dropdown - Left side */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white flex items-center p-1.5 rounded hover:bg-gray-700 transition-colors">
                    <Video className="w-5 h-5" />
                    <ChevronDown className="w-4 h-4 ml-0.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-[#1a1a1a] border-gray-800">
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Videos</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Photos</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Pornstars</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Search Submit Button - Right side */}
                <button 
                  type="submit" 
                  className="search-submit searchSubmit-9d2fb absolute right-2.5 top-1/2 -translate-y-1/2 text-[#f7000a] hover:text-[#e60009] p-1.5 rounded hover:bg-gray-700 transition-colors"
                  data-role="search-submit"
                  aria-label="Search button"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
              <ul className="search-suggestions absolute top-full left-0 right-0 bg-[#1a1a1a] border border-gray-800 rounded-lg mt-1 hidden"></ul>
            </form>

            {/* Right: Language/Geo Picker and Login Section */}
            <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
              {/* Language/Geo Picker */}
              <div className="lang-geo-picker-container hidden md:block" aria-hidden="true">
                <DropdownMenu>
                  <DropdownMenuTrigger className="picker-trigger flex items-center space-x-2 p-2 hover:bg-gray-800 rounded transition-colors">
                    <div className="langGeoPickerIcons-8090e flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-gray-300" />
                      <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-green-500 rounded-sm border border-white/30 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">IN</span>
                      </div>
                    </div>
                    <span className="current-lang text-base text-gray-300 font-medium">EN</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-gray-800">
                    <DropdownMenuItem className="text-white hover:bg-gray-800">English</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Hindi</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Change Location</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Login Section */}
              <div className="login-section flex items-center space-x-2 md:space-x-3" aria-hidden="true">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hidden md:flex text-gray-300 hover:text-white h-10 px-4 text-base font-medium"
                    >
                      Login
                      <ChevronDown className="w-4 h-4 ml-1.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-gray-800">
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Sign In</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-gray-800">Create Account</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  className="bg-[#f7000a] hover:bg-[#e60009] text-white rounded-md px-5 py-2.5 h-10 text-base font-medium shadow-sm signUpButton-30c7d"
                  asChild
                >
                  <Link href="/signup">Sign up for free</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="md:hidden pb-3">
              <form className="relative" action="" method="get" role="search">
                <Input
                  type="text"
                  name="q"
                  placeholder="Search for videos"
                  className="w-full bg-black border-gray-700 text-white placeholder-gray-500 pr-12 h-11 text-base rounded-full"
                />
                <button
                  type="submit"
                  onClick={() => setMobileSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f7000a] hover:text-[#e60009]"
                >
                  <Search className="w-6 h-6" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <Navigation />

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#1a1a1a] py-4 space-y-2 bg-[#2a2a2a]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors">
            <span>Videos</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
          >
            <span className="w-2.5 h-2.5 bg-[#f7000a] rounded-full"></span>
            <span>Live Sex</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
          >
            Categories
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
          >
            Pornstars
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
          >
            Creators
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
          >
            Channels
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left hover:text-orange-500 py-2.5 px-3 text-gray-300 font-medium text-base transition-colors"
          >
            Photos
          </button>
        </nav>
      )}
      </header>
    </div>
  );
}
