'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Heart, Crown, MoreHorizontal, Upload, Video, Clock, Star, Settings, Trophy, Award, Globe, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navigation() {
  const pathname = usePathname();
  const isVideoPage = pathname?.startsWith('/video') || pathname === '/';
  
  // State for each dropdown
  const [isVideosHovered, setIsVideosHovered] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
  const [isPornstarsHovered, setIsPornstarsHovered] = useState(false);
  const [isCreatorsHovered, setIsCreatorsHovered] = useState(false);
  const [isPhotosHovered, setIsPhotosHovered] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const HIDE_DELAY = 200;

  const handleMouseEnter = (setter: (val: boolean) => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setter(true);
  };

  const handleMouseLeave = (setter: (val: boolean) => void) => {
    timeoutRef.current = setTimeout(() => {
      setter(false);
      timeoutRef.current = null;
    }, HIDE_DELAY);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="top-menu-container bg-[#2a2a2a] border-t border-[#1a1a1a] w-full" aria-hidden="true">
      <div className="top-menu width-wrap max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="container-3b1bc flex items-center justify-between">
          <div className="items-3b1bc flex items-center space-x-6 py-4 text-base overflow-x-auto overflow-y-visible scrollbar-hide">
            {/* Videos Dropdown */}
            <div 
              className={`container-64b3c xh-dropdown relative ${isVideoPage || isVideosHovered ? 'selected-64b3c' : ''}`}
              data-role="nav-item-offset"
              data-nav-item-id="videos"
              onMouseEnter={() => handleMouseEnter(setIsVideosHovered)}
              onMouseLeave={() => handleMouseLeave(setIsVideosHovered)}
            >
              <Link 
                href="/" 
                className={`root-48288 invert-48288 link-64b3c flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap font-medium transition-colors ${
                  isVideoPage || isVideosHovered ? 'text-white' : 'text-gray-300'
                }`}
                data-statistic-name="Videos"
                data-role="tab"
                tabIndex={-1}
              >
                <div className="h4-8643e invert-8643e linkText-64b3c">Videos</div>
                <ChevronDown className="w-4 h-4 text-white arrowIcon-64b3c" />
                {(isVideoPage || isVideosHovered) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"></span>
                )}
              </Link>
              
              {isVideosHovered && (
                <ul className="dropdown container-12755 absolute left-0 top-full mt-0 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2 z-50"
                  onMouseEnter={() => handleMouseEnter(setIsVideosHovered)}
                  onMouseLeave={() => handleMouseLeave(setIsVideosHovered)}
                >
                  <li>
                    <Link href="/?filter=best" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_best/weekly">
                      <Star className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Best Videos</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/?filter=short" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_Moments">
                      <Video className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Short Videos</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/?filter=history" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_my/watch-history">
                      <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Watch History</span>
                    </Link>
                  </li>
                  <li className="separator h-px bg-gray-800 my-1"></li>
                  <li>
                    <Link href="/?category=indian" className="itemContent-12755 flex items-center justify-between px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_categories/indian">
                      <span>Indian</span>
                      <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-green-500 rounded-sm border border-white/30 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">IN</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/?category=amateur" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_categories/amateur">
                      <span>Amateur</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/?category=mature" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_categories/mature">
                      <span>Mature</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/?category=old-young" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_categories/old-young">
                      <span>Old & Young</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/?category=lesbian" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_categories/lesbian">
                      <span>Lesbian</span>
                    </Link>
                  </li>
                  <li className="separator h-px bg-gray-800 my-1"></li>
                  <li>
                    <Link href="/?category=all" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Videos_categories">
                      <span>All categories</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Live Sex */}
            <div className="container-64b3c" data-role="nav-item-offset" data-nav-item-id="cams">
              <Link 
                href="/live" 
                className="root-48288 invert-48288 link-64b3c flex items-center space-x-2 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Live Sex"
                tabIndex={-1}
              >
                <span className="w-2.5 h-2.5 bg-[#f7000a] rounded-full flex-shrink-0"></span>
                <div className="h4-8643e invert-8643e linkText-64b3c">Live Sex</div>
              </Link>
            </div>

            {/* Categories Dropdown */}
            <div 
              className="container-64b3c xh-dropdown relative"
              data-role="nav-item-offset"
              data-nav-item-id="categories"
              onMouseEnter={() => handleMouseEnter(setIsCategoriesHovered)}
              onMouseLeave={() => handleMouseLeave(setIsCategoriesHovered)}
            >
              <Link 
                href="/categories" 
                className="root-48288 invert-48288 link-64b3c flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Categories"
                data-role="tab"
                tabIndex={-1}
              >
                <div className="h4-8643e invert-8643e linkText-64b3c">Categories</div>
                <ChevronDown className="w-4 h-4 text-white arrowIcon-64b3c" />
              </Link>
              
              {isCategoriesHovered && (
                <ul className="dropdown container-12755 absolute left-0 top-full mt-0 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2 z-50"
                  onMouseEnter={() => handleMouseEnter(setIsCategoriesHovered)}
                  onMouseLeave={() => handleMouseLeave(setIsCategoriesHovered)}
                >
                  <li>
                    <Link href="/categories/indian" className="itemContent-12755 flex items-center justify-between px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Categories_categories/indian">
                      <span>Indian</span>
                      <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-green-500 rounded-sm border border-white/30 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">IN</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/18-year-old" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Categories_categories/18-year-old">
                      <span>18 Year Old</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/desi" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Categories_categories/desi">
                      <span>Desi</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/mom" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Categories_categories/mom">
                      <span>Mom</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/russian" className="itemContent-12755 flex items-center justify-between px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Categories_categories/russian">
                      <span>Russian</span>
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-red-500 rounded-sm border border-white/30 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">RU</span>
                      </div>
                    </Link>
                  </li>
                  <li className="separator h-px bg-gray-800 my-1"></li>
                  <li>
                    <Link href="/categories" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Categories_categories">
                      <span>All categories</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Pornstars Dropdown */}
            <div 
              className="container-64b3c xh-dropdown relative"
              data-role="nav-item-offset"
              data-nav-item-id="pornstars"
              onMouseEnter={() => handleMouseEnter(setIsPornstarsHovered)}
              onMouseLeave={() => handleMouseLeave(setIsPornstarsHovered)}
            >
              <Link 
                href="/pornstars" 
                className="root-48288 invert-48288 link-64b3c flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Pornstars"
                data-role="tab"
                tabIndex={-1}
              >
                <div className="h4-8643e invert-8643e linkText-64b3c">Pornstars</div>
                <ChevronDown className="w-4 h-4 text-white arrowIcon-64b3c" />
              </Link>
              
              {isPornstarsHovered && (
                <ul className="dropdown container-12755 absolute left-0 top-full mt-0 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2 z-50"
                  onMouseEnter={() => handleMouseEnter(setIsPornstarsHovered)}
                  onMouseLeave={() => handleMouseLeave(setIsPornstarsHovered)}
                >
                  <li>
                    <Link href="/pornstars" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars_pornstars">
                      <Star className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Pornstars</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/celebrities" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars_celebrities">
                      <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Celebrities</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pornstars/all/countries" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars_pornstars/all/countries">
                      <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>By Countries</span>
                    </Link>
                  </li>
                  <li className="separator h-px bg-gray-800 my-1"></li>
                  <li>
                    <Link href="/creators" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars_creators">
                      <Video className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>xHamster Creators</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Creators Dropdown */}
            <div 
              className="container-64b3c xh-dropdown relative xh-helper-hidden"
              data-role="nav-item-offset"
              data-nav-item-id="creators"
              onMouseEnter={() => handleMouseEnter(setIsCreatorsHovered)}
              onMouseLeave={() => handleMouseLeave(setIsCreatorsHovered)}
            >
              <Link 
                href="/creators/contest/sa" 
                className="root-48288 invert-48288 link-64b3c flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Pornstars contest"
                data-role="tab"
                tabIndex={-1}
              >
                <div className="h4-8643e invert-8643e linkText-64b3c">Creators</div>
                <ChevronDown className="w-4 h-4 text-white arrowIcon-64b3c" />
              </Link>
              
              {isCreatorsHovered && (
                <ul className="dropdown container-12755 absolute left-0 top-full mt-0 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2 z-50"
                  onMouseEnter={() => handleMouseEnter(setIsCreatorsHovered)}
                  onMouseLeave={() => handleMouseLeave(setIsCreatorsHovered)}
                >
                  <li>
                    <Link href="/creators/contest/sa" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars contest_creators/contest/sa">
                      <Trophy className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Top Creators</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/creators/videos/sa" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars contest_creators/videos/sa">
                      <Video className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Top Creator Videos</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/awards" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars contest_awards">
                      <Award className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Awards 2025</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/creators" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars contest_creators">
                      <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>All xHamster Creators</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/creators/all/countries" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars contest_creators/all/countries">
                      <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>By Countries</span>
                    </Link>
                  </li>
                  <li className="separator h-px bg-gray-800 my-1"></li>
                  <li>
                    <Link href="/creator-signup?source=creators" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Pornstars contest_creator-signup">
                      <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span>Become a Creator</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Channels */}
            <div className="container-64b3c xh-helper-hidden" data-role="nav-item-offset" data-nav-item-id="channels">
              <Link 
                href="/channels" 
                className="root-48288 invert-48288 link-64b3c flex items-center hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Channels"
                tabIndex={-1}
              >
                <div className="h4-8643e invert-8643e linkText-64b3c">Channels</div>
              </Link>
            </div>

            {/* Photos Dropdown */}
            <div 
              className="container-64b3c xh-dropdown xh-helper-hidden relative"
              data-role="nav-item-offset"
              data-item="photos"
              data-nav-item-id="photos"
              onMouseEnter={() => handleMouseEnter(setIsPhotosHovered)}
              onMouseLeave={() => handleMouseLeave(setIsPhotosHovered)}
            >
              <Link 
                href="/photos" 
                className="root-48288 invert-48288 link-64b3c flex items-center space-x-1.5 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Photos"
                data-role="tab"
                tabIndex={-1}
              >
                <div className="h4-8643e invert-8643e linkText-64b3c">Photos</div>
                <ChevronDown className="w-4 h-4 text-white arrowIcon-64b3c" />
              </Link>
              
              {isPhotosHovered && (
                <ul className="dropdown container-12755 absolute left-0 top-full mt-0 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2 z-50"
                  onMouseEnter={() => handleMouseEnter(setIsPhotosHovered)}
                  onMouseLeave={() => handleMouseLeave(setIsPhotosHovered)}
                >
                  <li>
                    <Link href="/photos/categories/mature" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Photos_photos/categories/mature">
                      <span>Mature</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/photos/categories/milf" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Photos_photos/categories/milf">
                      <span>MILF</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/photos/categories/hentai" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Photos_photos/categories/hentai">
                      <span>Hentai</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/photos/categories/big-tits" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Photos_photos/categories/big-tits">
                      <span>Big Tits</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/photos/categories/granny" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Photos_photos/categories/granny">
                      <span>Granny</span>
                    </Link>
                  </li>
                  <li className="separator h-px bg-gray-800 my-1"></li>
                  <li>
                    <Link href="/photos/categories" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="dropdown_Photos_photos/categories">
                      <span>All categories</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Nude Chat (Flirtify) */}
            <div className="container-64b3c" data-role="nav-item-offset" data-item="flirtify" data-nav-item-id="flirtify">
              <Link 
                href="/ff/out" 
                className="root-48288 invert-48288 link-64b3c flex items-center space-x-2 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Flirtify"
                tabIndex={-1}
                target="_blank"
              >
                <Heart className="w-5 h-5 text-[#e91e63] flex-shrink-0" />
                <div className="h4-8643e invert-8643e linkText-64b3c">Nude Chat</div>
              </Link>
            </div>

            {/* Premium Videos */}
            <div className="container-64b3c" data-role="nav-item-offset" data-item="premium" data-nav-item-id="premium">
              <Link 
                href="/premium" 
                className="root-48288 invert-48288 link-64b3c bigGap-64b3c flex items-center space-x-2 hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Premium"
                tabIndex={-1}
                target="_blank"
              >
                <Crown className="w-5 h-5 text-[#ffc107] flex-shrink-0" />
                <div className="h4-8643e invert-8643e linkText-64b3c">
                  <span className="fap-highlight">Premium</span> Videos
                </div>
                <Badge className="bg-[#f7000a] text-white text-xs px-2 py-0 h-5 font-semibold">-60%</Badge>
              </Link>
            </div>

            {/* Dating */}
            <div className="container-64b3c xh-helper-hidden" data-role="nav-item-offset" data-item="dating" data-nav-item-id="dating">
              <Link 
                href="/dating" 
                className="root-48288 invert-48288 link-64b3c flex items-center hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Dating"
                tabIndex={-1}
              >
                <div className="h4-8643e invert-8643e linkText-64b3c">Dating</div>
              </Link>
            </div>

            {/* Subscriptions */}
            <div className="container-64b3c xh-helper-hidden" data-role="nav-item-offset">
              <Link 
                href="/my/subscriptions" 
                className="root-48288 invert-48288 link-64b3c flex items-center hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors"
                data-statistic-name="Subscriptions"
                tabIndex={-1}
              >
                <div className="h4-8643e invert-8643e linkText-64b3c">Subscriptions</div>
              </Link>
            </div>

            {/* More Menu */}
            <div>
              <div 
                className="dropdown-3b1bc xh-dropdown relative"
                onMouseEnter={() => handleMouseEnter(setIsMoreHovered)}
                onMouseLeave={() => handleMouseLeave(setIsMoreHovered)}
              >
                <span className="root-48288 primary-48288 more-3b1bc flex items-center hover:text-orange-500 whitespace-nowrap text-white font-medium transition-colors cursor-pointer" tabIndex={-1}>
                  <MoreHorizontal className="w-5 h-5 moreIcon-3b1bc" />
                </span>
                
                {isMoreHovered && (
                  <ul className="dropdown container-12755 position-right absolute right-0 top-full mt-0 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2 z-50 xh-helper-hidden"
                    onMouseEnter={() => handleMouseEnter(setIsMoreHovered)}
                    onMouseLeave={() => handleMouseLeave(setIsMoreHovered)}
                  >
                    <li data-relates="" data-nav-item-id="creators">
                      <Link href="/creators/contest/sa" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="Pornstars contest" target="_self">
                        <span>Creators</span>
                      </Link>
                    </li>
                    <li data-relates="" data-nav-item-id="channels">
                      <Link href="/channels" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="Channels" target="_self">
                        <span>Channels</span>
                      </Link>
                    </li>
                    <li data-relates="photos" data-nav-item-id="photos">
                      <Link href="/photos" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="Photos" target="_self">
                        <span>Photos</span>
                      </Link>
                    </li>
                    <li data-relates="dating" data-nav-item-id="dating">
                      <Link href="/dating" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="Dating" target="_self">
                        <span>Dating</span>
                      </Link>
                    </li>
                    <li data-relates="">
                      <Link href="/my/subscriptions" className="itemContent-12755 flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-800 text-gray-300 transition-colors" data-statistic-name="Subscriptions" target="_self">
                        <span>Subscriptions</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Upload */}
          <ul className="top-menu__side-group right flex items-center">
            <li className="navItem-3682d upload-nav upload-section-menu xh-dropdown popup">
              <Link 
                href="/creator-signup?source=uploadHeader" 
                className="root-48288 primary-48288 link-3682d flex items-center space-x-2 text-[#00bcd4] hover:text-[#00acc1] whitespace-nowrap font-medium transition-colors"
                data-statistic-name="Upload"
                tabIndex={-1}
              >
                <Upload className="w-5 h-5 iconSvg-3682d" />
                <span className="hideable-3682d">Upload</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
