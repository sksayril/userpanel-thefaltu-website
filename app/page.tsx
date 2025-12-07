'use client';

import { useState } from 'react';
import { Search, Settings, Globe, Upload, Menu, Play, Clock, ThumbsUp, Rss, Award, Sparkles, Film, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';

const mockVideos = [
  {
    id: 1,
    thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '22:19',
    title: 'Amazing Sunset Timelapse in 4K',
    uploader: 'NatureVideos',
    views: '72.3M',
    isHD: true,
    is4K: true,
  },
  {
    id: 2,
    thumbnail: 'https://images.pexels.com/photos/1739748/pexels-photo-1739748.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '05:44',
    title: 'Cinematic Travel Video - Epic Journey',
    uploader: 'TravelExplorer',
    views: '4.6M',
    is4K: true,
  },
  {
    id: 3,
    thumbnail: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12:05',
    title: 'Mountain Hiking Adventure Documentary',
    uploader: 'AdventureFilms',
    views: '5.6M',
    is4K: true,
  },
  {
    id: 4,
    thumbnail: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '14:04',
    title: 'Urban City Life - Downtown Vibes',
    uploader: 'CityScapes',
    views: '5M',
  },
  {
    id: 5,
    thumbnail: 'https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '15:24',
    title: 'Professional Studio Setup Tour',
    uploader: 'TechReviewer',
    views: '2.9M',
  },
  {
    id: 6,
    thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '06:05',
    title: 'Cooking Masterclass - Gourmet Cuisine',
    uploader: 'ChefMasters',
    views: '447K',
  },
  {
    id: 7,
    thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '11:07',
    title: 'Fashion Photography Behind the Scenes',
    uploader: 'FashionStudio',
    views: '8.7M',
    isLive: true,
  },
  {
    id: 8,
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '08:33',
    title: 'Fitness Training - Full Body Workout',
    uploader: 'FitnessPro',
    views: '3.2M',
  },
];

const categories = [
  'Indian 🇮🇳',
  '4K Porn 4K',
  'HD Videos HD',
  'VR Porn VR',
  '18 Year Old',
  'African',
  'Amateur',
  'American 🇺🇸',
  'Anal',
  'Arab',
  'Asian',
  'Ass',
];

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <header className="bg-[#0f0f0f] border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Header Row */}
          <div className="flex items-center justify-between py-3">
            {/* Left: Logo and Region */}
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-white" />
                </div>
                <span className="text-lg md:text-xl font-bold">
                  <span className="text-orange-600">X</span>HAMSTER
                </span>
              </div>

              <div className="hidden sm:flex items-center space-x-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-400">IN</span>
              </div>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for videos"
                  className="w-full bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-500 pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-500">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5 text-orange-600" />
              </button>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Settings className="w-4 h-4 mr-1" />
                  EN
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  Login
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Sign up for free
                </Button>
              </div>

              {/* Mobile Actions */}
              <div className="md:hidden flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3">
                  Sign up
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="md:hidden pb-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for videos"
                  className="w-full bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-500 pr-10"
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-500"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 py-2 text-sm overflow-x-auto">
            <button className="flex items-center space-x-1 hover:text-orange-500 whitespace-nowrap">
              <span>Videos</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-orange-500 whitespace-nowrap">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span>Live Sex</span>
            </button>
            <button className="hover:text-orange-500 whitespace-nowrap">Categories</button>
            <button className="hover:text-orange-500 whitespace-nowrap">Pornstars</button>
            <button className="hover:text-orange-500 whitespace-nowrap">Creators</button>
            <button className="hover:text-orange-500 whitespace-nowrap">Channels</button>
            <button className="hover:text-orange-500 whitespace-nowrap">Photos</button>
            <button className="hover:text-orange-500 whitespace-nowrap">Jerk Chat</button>
            <button className="flex items-center space-x-1 hover:text-orange-500 whitespace-nowrap">
              <span>👑 Premium Videos</span>
              <Badge className="bg-red-600 text-white text-xs">-50%</Badge>
            </button>
            <button className="hover:text-orange-500 whitespace-nowrap">Dating</button>
            <button className="hover:text-orange-500 whitespace-nowrap">🎮 Play Sex Game</button>
            <button className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 whitespace-nowrap">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden border-t border-gray-800 py-4 space-y-2">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2"
              >
                <span>Videos</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2"
              >
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>Live Sex</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                Categories
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                Pornstars
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                Creators
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                Channels
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                Photos
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                Jerk Chat
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 w-full text-left hover:text-orange-500 py-2 px-2"
              >
                <span>👑 Premium Videos</span>
                <Badge className="bg-red-600 text-white text-xs">-50%</Badge>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                Dating
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left hover:text-orange-500 py-2 px-2"
              >
                🎮 Play Sex Game
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 w-full text-left text-cyan-400 hover:text-cyan-300 py-2 px-2"
              >
                <Upload className="w-4 h-4" />
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
      </header>

      <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-3 md:py-4 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">CYBER WEEK JOY 😊 🎉</span>
          <span className="text-xs sm:text-sm">Jerk off with REAL GIRLS in Sex Video Chat</span>
          <Button className="bg-pink-600 hover:bg-pink-700 text-xs sm:text-sm whitespace-nowrap">START FOR FREE</Button>
        </div>
        <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1">
          ✕
        </button>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-[#0f0f0f] rounded-lg p-4 space-y-2">
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2">
                <Rss className="w-5 h-5" />
                <span>Subscriptions</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2">
                <ThumbsUp className="w-5 h-5" />
                <span>Liked</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2">
                <Clock className="w-5 h-5" />
                <span>Watch History</span>
              </button>
            </div>

            <div className="bg-[#0f0f0f] rounded-lg p-4 space-y-2">
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2">
                <Sparkles className="w-5 h-5" />
                <span>Newest Videos</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2">
                <ThumbsUp className="w-5 h-5" />
                <span>Best Videos</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2">
                <Film className="w-5 h-5" />
                <span>Short Videos</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2">
                <Award className="w-5 h-5" />
                <span>Top Creators</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2">
                <Award className="w-5 h-5 text-orange-500" />
                <span>Awards 2025</span>
                <Badge className="bg-red-600 text-white text-xs ml-auto">Hot</Badge>
              </button>
            </div>

            <div className="bg-[#0f0f0f] rounded-lg p-4">
              <Input
                type="text"
                placeholder="Filter by category..."
                className="w-full bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-500 mb-3"
              />
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="block w-full text-left text-sm hover:text-orange-500 py-1.5"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold">Trending Free Porn Videos</h1>
                <button className="text-gray-400 hover:text-white">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  All
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  HD
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  4K
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  VR
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              By clicking the content you will also see an ad. <Badge variant="secondary" className="bg-gray-700 text-white text-xs">AD</Badge>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => window.open(`/video/${video.id}`, '_blank')}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-2">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold">
                      {video.duration}
                    </div>
                    {video.is4K && (
                      <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold">
                        4K
                      </div>
                    )}
                    {video.isLive && (
                      <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        <span>Live</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                  <h3 className="text-sm font-medium mb-1 line-clamp-2 group-hover:text-orange-500">
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                      <span>{video.uploader}</span>
                    </span>
                    <span>|</span>
                    <span>{video.views} views</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 mb-6">
              <Pagination>
                <PaginationContent className="flex-wrap gap-1">
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      className="bg-white text-black hover:bg-gray-200 border-gray-300"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 bg-transparent"
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 bg-transparent"
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 bg-transparent"
                    >
                      4
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 bg-transparent"
                    >
                      5
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 bg-transparent"
                    >
                      6
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis className="text-gray-400" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 bg-transparent"
                    >
                      12
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis className="text-gray-400" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 bg-transparent"
                    >
                      22
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                    >
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* xHamster Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">xHamster</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    xHamster Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Creator's Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Advertising
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    xHamster Awards 2025
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Content Removal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Improve xHamster
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Terms of use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Cookies policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    DMCA/Copyright
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Parental Controls
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    EU DSA
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Trust and Safety
                  </a>
                </li>
              </ul>
            </div>

            {/* Start making money with us Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Start making money with us</h3>
              <ul className="space-y-2 text-sm text-gray-400 mb-6">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Camgirls Wanted
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Creator Contest
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Content Creators Program
                  </a>
                </li>
              </ul>
              <div>
                <h4 className="text-white font-semibold mb-3">Monetize your content</h4>
                <div className="flex items-center gap-3 mb-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Become a creator
                  </Button>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 border-2 border-[#0f0f0f]"
                        title={`Creator ${i}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] border-t border-gray-700 px-4 py-3 z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-300 flex-1">
              Cookies help us deliver our services. By using this website, you agree with our use of cookies.{' '}
              <a href="#" className="text-orange-500 hover:text-orange-400 underline">
                Learn more
              </a>
            </p>
            <Button
              onClick={() => setShowCookieBanner(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white w-full sm:w-auto"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
