'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ThumbsUp, Rss, Award, Zap, Film, ChevronRight, ChevronDown, X, Info, Search, Menu, MessageCircle, History, Play, MoreVertical, Bookmark, Share2, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

// API endpoint
const API_BASE_URL = 'https://api.xhamster01.com/api/movies/all';

// Function to get user's country
const getUserCountry = async (): Promise<string> => {
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof fetch === 'undefined') {
    // Server-side: use default
    return 'IN';
  }

  // Try browser locale first (no CORS issues)
  try {
    if (typeof navigator !== 'undefined' && navigator.language) {
      const locale = navigator.language;
      const country = locale.split('-')[1];
      if (country && country.length === 2) {
        return country.toUpperCase();
      }
    }
  } catch (error) {
    // Ignore locale errors
  }

  // Try geolocation API (with CORS error handling)
  try {
    if (typeof AbortController !== 'undefined') {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
      
      try {
        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal,
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Accept': 'application/json',
          },
        }).catch(() => {
          // CORS or network error - return null to use fallback
          return null;
        });
        
        clearTimeout(timeoutId);
        
        if (response && response.ok) {
          const data = await response.json();
          if (data && data.country_code) {
            return data.country_code;
          }
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        // CORS error or network error - silently continue to fallback
        if (fetchError.name !== 'AbortError') {
          // Only log non-timeout errors in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Country API unavailable (CORS or network issue), using fallback');
          }
        }
      }
    }
  } catch (error) {
    // Silently fail and use fallback
  }
  
  // Default fallback
  return 'IN';
};

// Function to get video duration from video URL
const getVideoDurationFromUrl = async (videoUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    if (!videoUrl || typeof window === 'undefined') {
      resolve('0:00');
      return;
    }

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;
      if (duration && !isNaN(duration) && isFinite(duration)) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        resolve('0:00');
      }
    };
    
    video.onerror = () => {
      window.URL.revokeObjectURL(video.src);
      resolve('0:00');
    };
    
    // Set timeout to avoid hanging
    setTimeout(() => {
      if (video.src) {
        window.URL.revokeObjectURL(video.src);
      }
      resolve('0:00');
    }, 5000);
    
    video.src = videoUrl;
  });
};

// Function to format duration from video file (estimate based on file size or use default)
const getVideoDuration = (videos: any[]): string => {
  // Return default, will be updated async
  return '0:00'; // Default duration, will be updated
};

// Function to format views count
const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

// Mock videos as fallback
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
  {
    id: 9,
    thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '18:45',
    title: 'Wildlife Documentary - African Safari',
    uploader: 'NatureDocs',
    views: '12.4M',
    is4K: true,
  },
  {
    id: 10,
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '09:12',
    title: 'Street Art Tour - Urban Graffiti',
    uploader: 'ArtExplorer',
    views: '6.8M',
    isHD: true,
  },
  {
    id: 11,
    thumbnail: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '16:30',
    title: 'Ocean Life - Underwater Exploration',
    uploader: 'MarineLife',
    views: '9.5M',
    is4K: true,
  },
  {
    id: 12,
    thumbnail: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '07:22',
    title: 'Music Production Tutorial - Beat Making',
    uploader: 'MusicProducer',
    views: '4.2M',
  },
  {
    id: 13,
    thumbnail: 'https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '13:18',
    title: 'Architecture Photography - Modern Buildings',
    uploader: 'ArchitectView',
    views: '7.1M',
    isHD: true,
  },
  {
    id: 14,
    thumbnail: 'https://images.pexels.com/photos/1181405/pexels-photo-1181405.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10:55',
    title: 'Yoga Session - Morning Routine',
    uploader: 'YogaMaster',
    views: '5.3M',
  },
  {
    id: 15,
    thumbnail: 'https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '19:40',
    title: 'Space Exploration - Planet Documentary',
    uploader: 'SpaceChannel',
    views: '15.6M',
    is4K: true,
  },
  {
    id: 16,
    thumbnail: 'https://images.pexels.com/photos/1181414/pexels-photo-1181414.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '11:28',
    title: 'Car Review - Luxury Sports Car',
    uploader: 'AutoReview',
    views: '8.9M',
    isHD: true,
  },
  {
    id: 17,
    thumbnail: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '14:50',
    title: 'Gaming Setup - Ultimate Battlestation',
    uploader: 'GamerPro',
    views: '6.4M',
    is4K: true,
  },
  {
    id: 18,
    thumbnail: 'https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '08:15',
    title: 'Coffee Making - Barista Techniques',
    uploader: 'CoffeeExpert',
    views: '3.7M',
  },
  {
    id: 19,
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '17:33',
    title: 'Mountain Climbing - Extreme Adventure',
    uploader: 'AdventureSeeker',
    views: '11.2M',
    is4K: true,
  },
  {
    id: 20,
    thumbnail: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12:47',
    title: 'Dance Performance - Contemporary Style',
    uploader: 'DanceStudio',
    views: '5.8M',
    isHD: true,
  },
  {
    id: 21,
    thumbnail: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '09:56',
    title: 'Pet Care Tips - Dog Training Guide',
    uploader: 'PetCare',
    views: '4.5M',
  },
  {
    id: 22,
    thumbnail: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '15:20',
    title: 'Tech Unboxing - Latest Gadgets',
    uploader: 'TechUnbox',
    views: '7.6M',
    isLive: true,
  },
  {
    id: 23,
    thumbnail: 'https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '13:42',
    title: 'Skateboarding Tricks - Street Style',
    uploader: 'SkateLife',
    views: '6.1M',
    isHD: true,
  },
  {
    id: 24,
    thumbnail: 'https://images.pexels.com/photos/1181725/pexels-photo-1181725.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '20:15',
    title: 'Cooking Show - Italian Cuisine',
    uploader: 'ChefItalia',
    views: '9.8M',
    is4K: true,
  },
  {
    id: 25,
    thumbnail: 'https://images.pexels.com/photos/1181735/pexels-photo-1181735.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '13:25',
    title: 'Sunset Photography - Golden Hour',
    uploader: 'PhotoArt',
    views: '6.2M',
    isHD: true,
  },
  {
    id: 26,
    thumbnail: 'https://images.pexels.com/photos/1181745/pexels-photo-1181745.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '09:45',
    title: 'DJ Mix - Electronic Music',
    uploader: 'DJMaster',
    views: '4.8M',
  },
  {
    id: 27,
    thumbnail: 'https://images.pexels.com/photos/1181755/pexels-photo-1181755.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '16:12',
    title: 'Mountain Biking - Extreme Trail',
    uploader: 'BikeAdventure',
    views: '7.5M',
    is4K: true,
  },
  {
    id: 28,
    thumbnail: 'https://images.pexels.com/photos/1181765/pexels-photo-1181765.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '11:30',
    title: 'Pottery Making - Ceramic Art',
    uploader: 'ArtisanCraft',
    views: '3.9M',
  },
  {
    id: 29,
    thumbnail: 'https://images.pexels.com/photos/1181775/pexels-photo-1181775.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '18:55',
    title: 'Astronomy Guide - Night Sky',
    uploader: 'StarGazer',
    views: '10.3M',
    is4K: true,
  },
  {
    id: 30,
    thumbnail: 'https://images.pexels.com/photos/1181785/pexels-photo-1181785.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '07:18',
    title: 'Sushi Making - Japanese Cuisine',
    uploader: 'SushiChef',
    views: '5.4M',
    isHD: true,
  },
  {
    id: 31,
    thumbnail: 'https://images.pexels.com/photos/1181795/pexels-photo-1181795.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '14:42',
    title: 'Rock Climbing - Indoor Gym',
    uploader: 'ClimbPro',
    views: '6.7M',
  },
  {
    id: 32,
    thumbnail: 'https://images.pexels.com/photos/1181805/pexels-photo-1181805.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12:08',
    title: 'Watercolor Painting Tutorial',
    uploader: 'ArtTutorial',
    views: '4.1M',
  },
  {
    id: 33,
    thumbnail: 'https://images.pexels.com/photos/1181815/pexels-photo-1181815.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '19:20',
    title: 'Desert Safari - Adventure Travel',
    uploader: 'DesertExplorer',
    views: '8.6M',
    is4K: true,
  },
  {
    id: 34,
    thumbnail: 'https://images.pexels.com/photos/1181825/pexels-photo-1181825.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10:33',
    title: 'Guitar Lesson - Acoustic Songs',
    uploader: 'GuitarMaster',
    views: '5.9M',
  },
  {
    id: 35,
    thumbnail: 'https://images.pexels.com/photos/1181835/pexels-photo-1181835.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '15:17',
    title: 'Ice Skating - Winter Sports',
    uploader: 'IceSkater',
    views: '7.2M',
    isHD: true,
  },
  {
    id: 36,
    thumbnail: 'https://images.pexels.com/photos/1181845/pexels-photo-1181845.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '08:52',
    title: 'Calligraphy - Beautiful Writing',
    uploader: 'CalligraphyArt',
    views: '3.5M',
  },
  {
    id: 37,
    thumbnail: 'https://images.pexels.com/photos/1181855/pexels-photo-1181855.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '17:44',
    title: 'Volcano Exploration - Natural Wonders',
    uploader: 'NatureExplorer',
    views: '11.8M',
    is4K: true,
  },
  {
    id: 38,
    thumbnail: 'https://images.pexels.com/photos/1181865/pexels-photo-1181865.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '13:56',
    title: 'Martial Arts - Karate Training',
    uploader: 'MartialArts',
    views: '6.3M',
  },
  {
    id: 39,
    thumbnail: 'https://images.pexels.com/photos/1181875/pexels-photo-1181875.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '09:27',
    title: 'Baking Tutorial - Chocolate Cake',
    uploader: 'BakingPro',
    views: '4.7M',
    isHD: true,
  },
  {
    id: 40,
    thumbnail: 'https://images.pexels.com/photos/1181885/pexels-photo-1181885.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '21:10',
    title: 'Documentary - Ancient Civilizations',
    uploader: 'HistoryChannel',
    views: '13.5M',
    is4K: true,
  },
  {
    id: 41,
    thumbnail: 'https://images.pexels.com/photos/1181895/pexels-photo-1181895.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '11:41',
    title: 'Surfing - Wave Riding',
    uploader: 'SurfLife',
    views: '7.8M',
  },
  {
    id: 42,
    thumbnail: 'https://images.pexels.com/photos/1181905/pexels-photo-1181905.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '14:29',
    title: 'Woodworking - Furniture Making',
    uploader: 'WoodCraft',
    views: '5.6M',
    isHD: true,
  },
  {
    id: 43,
    thumbnail: 'https://images.pexels.com/photos/1181915/pexels-photo-1181915.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '08:15',
    title: 'Piano Performance - Classical Music',
    uploader: 'PianoMaster',
    views: '4.3M',
  },
  {
    id: 44,
    thumbnail: 'https://images.pexels.com/photos/1181925/pexels-photo-1181925.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '16:38',
    title: 'Cave Exploration - Underground Adventure',
    uploader: 'CaveExplorer',
    views: '9.1M',
    is4K: true,
  },
  {
    id: 45,
    thumbnail: 'https://images.pexels.com/photos/1181935/pexels-photo-1181935.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12:22',
    title: 'Knitting Tutorial - Scarf Making',
    uploader: 'KnitCraft',
    views: '3.8M',
  },
  {
    id: 46,
    thumbnail: 'https://images.pexels.com/photos/1181945/pexels-photo-1181945.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10:05',
    title: 'Parkour - Urban Movement',
    uploader: 'ParkourPro',
    views: '6.5M',
    isHD: true,
  },
  {
    id: 47,
    thumbnail: 'https://images.pexels.com/photos/1181955/pexels-photo-1181955.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '18:50',
    title: 'Wildlife Photography - Safari',
    uploader: 'WildlifePhoto',
    views: '10.7M',
    is4K: true,
  },
  {
    id: 48,
    thumbnail: 'https://images.pexels.com/photos/1181965/pexels-photo-1181965.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '07:33',
    title: 'Origami - Paper Folding Art',
    uploader: 'OrigamiArt',
    views: '4.2M',
  },
  {
    id: 49,
    thumbnail: 'https://images.pexels.com/photos/1181975/pexels-photo-1181975.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '15:48',
    title: 'Scuba Diving - Underwater World',
    uploader: 'DiveMaster',
    views: '8.4M',
    isHD: true,
  },
  {
    id: 50,
    thumbnail: 'https://images.pexels.com/photos/1181985/pexels-photo-1181985.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '13:11',
    title: 'Chess Strategy - Advanced Moves',
    uploader: 'ChessMaster',
    views: '5.1M',
  },
  {
    id: 51,
    thumbnail: 'https://images.pexels.com/photos/1181995/pexels-photo-1181995.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '20:25',
    title: 'Aurora Borealis - Northern Lights',
    uploader: 'NatureWonders',
    views: '14.2M',
    is4K: true,
  },
  {
    id: 52,
    thumbnail: 'https://images.pexels.com/photos/1182005/pexels-photo-1182005.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '09:58',
    title: 'Jewelry Making - Handcrafted',
    uploader: 'JewelryCraft',
    views: '4.6M',
  },
  {
    id: 53,
    thumbnail: 'https://images.pexels.com/photos/1182015/pexels-photo-1182015.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '17:03',
    title: 'Formula 1 Racing - Track Day',
    uploader: 'RacingPro',
    views: '11.3M',
    is4K: true,
  },
  {
    id: 54,
    thumbnail: 'https://images.pexels.com/photos/1182025/pexels-photo-1182025.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '11:47',
    title: 'Macrame - Rope Art',
    uploader: 'MacrameArt',
    views: '3.7M',
  },
  {
    id: 55,
    thumbnail: 'https://images.pexels.com/photos/1182035/pexels-photo-1182035.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '14:16',
    title: 'Archery - Target Practice',
    uploader: 'ArcheryPro',
    views: '6.9M',
    isHD: true,
  },
  {
    id: 56,
    thumbnail: 'https://images.pexels.com/photos/1182045/pexels-photo-1182045.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '08:40',
    title: 'Candle Making - DIY Tutorial',
    uploader: 'CandleCraft',
    views: '4.4M',
  },
  {
    id: 57,
    thumbnail: 'https://images.pexels.com/photos/1182055/pexels-photo-1182055.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '19:52',
    title: 'Glacier Hiking - Ice Adventure',
    uploader: 'AdventureSeeker',
    views: '12.1M',
    is4K: true,
  },
  {
    id: 58,
    thumbnail: 'https://images.pexels.com/photos/1182065/pexels-photo-1182065.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10:19',
    title: 'Violin Performance - Orchestral',
    uploader: 'ViolinMaster',
    views: '5.7M',
  },
  {
    id: 59,
    thumbnail: 'https://images.pexels.com/photos/1182075/pexels-photo-1182075.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '16:54',
    title: 'Hot Air Balloon - Sky Adventure',
    uploader: 'SkyAdventure',
    views: '9.3M',
    isHD: true,
  },
  {
    id: 60,
    thumbnail: 'https://images.pexels.com/photos/1182085/pexels-photo-1182085.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12:36',
    title: 'Soap Making - Natural Products',
    uploader: 'SoapCraft',
    views: '4.9M',
  },
  {
    id: 61,
    thumbnail: 'https://images.pexels.com/photos/1182095/pexels-photo-1182095.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '21:45',
    title: 'Documentary - Ocean Depths',
    uploader: 'OceanExplorer',
    views: '15.8M',
    is4K: true,
  },
  {
    id: 62,
    thumbnail: 'https://images.pexels.com/photos/1182105/pexels-photo-1182105.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '09:12',
    title: 'Breakdancing - Street Performance',
    uploader: 'BreakDance',
    views: '6.1M',
  },
  {
    id: 63,
    thumbnail: 'https://images.pexels.com/photos/1182115/pexels-photo-1182115.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '15:28',
    title: 'Pottery Wheel - Ceramic Art',
    uploader: 'PotteryArt',
    views: '7.4M',
    isHD: true,
  },
  {
    id: 64,
    thumbnail: 'https://images.pexels.com/photos/1182125/pexels-photo-1182125.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '11:54',
    title: 'Bird Watching - Nature Guide',
    uploader: 'BirdWatcher',
    views: '5.2M',
  },
  {
    id: 65,
    thumbnail: 'https://images.pexels.com/photos/1182135/pexels-photo-1182135.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '18:07',
    title: 'Skiing - Mountain Slopes',
    uploader: 'SkiPro',
    views: '10.5M',
    is4K: true,
  },
  {
    id: 66,
    thumbnail: 'https://images.pexels.com/photos/1182145/pexels-photo-1182145.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '08:26',
    title: 'Embroidery - Needlework Art',
    uploader: 'EmbroideryArt',
    views: '3.6M',
  },
  {
    id: 67,
    thumbnail: 'https://images.pexels.com/photos/1182155/pexels-photo-1182155.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '14:50',
    title: 'Kayaking - River Adventure',
    uploader: 'KayakAdventure',
    views: '8.2M',
    isHD: true,
  },
  {
    id: 68,
    thumbnail: 'https://images.pexels.com/photos/1182165/pexels-photo-1182165.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '13:33',
    title: 'Glass Blowing - Artisan Craft',
    uploader: 'GlassBlower',
    views: '6.8M',
  },
  {
    id: 69,
    thumbnail: 'https://images.pexels.com/photos/1182175/pexels-photo-1182175.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '20:18',
    title: 'Documentary - Rainforest Life',
    uploader: 'RainforestDoc',
    views: '13.7M',
    is4K: true,
  },
  {
    id: 70,
    thumbnail: 'https://images.pexels.com/photos/1182185/pexels-photo-1182185.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10:41',
    title: 'Drumming - Rhythm Mastery',
    uploader: 'DrumMaster',
    views: '5.5M',
  },
  {
    id: 71,
    thumbnail: 'https://images.pexels.com/photos/1182195/pexels-photo-1182195.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '17:29',
    title: 'Paragliding - Sky Soaring',
    uploader: 'ParaglidePro',
    views: '9.7M',
    isHD: true,
  },
  {
    id: 72,
    thumbnail: 'https://images.pexels.com/photos/1182205/pexels-photo-1182205.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12:14',
    title: 'Quilting - Fabric Art',
    uploader: 'QuiltArt',
    views: '4.8M',
  },
  {
    id: 73,
    thumbnail: 'https://images.pexels.com/photos/1182215/pexels-photo-1182215.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '19:35',
    title: 'Documentary - Desert Wildlife',
    uploader: 'DesertWildlife',
    views: '11.9M',
    is4K: true,
  },
  {
    id: 74,
    thumbnail: 'https://images.pexels.com/photos/1182225/pexels-photo-1182225.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '09:51',
    title: 'Saxophone - Jazz Performance',
    uploader: 'JazzSax',
    views: '6.4M',
  },
];

const categories = [
  'Indian 🇮🇳',
  '4K Porn',
  'HD Videos',
  'VR Porn',
  '18 Year Old',
  'African',
  'Amateur',
  'American 🇺🇸',
  'Anal',
  'Arab',
  'Asian',
  'Ass',
  'Ass Licking',
  'Babe',
  'Bangladeshi 🇧🇩',
  'BBC',
  'BBW',
  'Beauty',
  'Big Ass',
  'Big Cock',
  'Big Natural Tits',
  'Big Nipples',
  'Big Tits',
  'Bisexual',
  'Black',
  'Blonde',
  'Blowjob',
  'Bondage',
  'Brazilian 🇧🇷',
  'British 🇬🇧',
  'Brunette',
  'Bukkake',
  'Busty',
  'Cartoon',
  'Celebrity',
  'Chinese 🇨🇳',
  'College',
  'Compilation',
  'Couple',
  'Creampie',
  'Cumshot',
  'Czech 🇨🇿',
  'Dancing',
  'Deep Throat',
  'Dildo',
  'Doggystyle',
  'Double Penetration',
  'Ebony',
  'European',
  'Facial',
  'Fantasy',
  'Fat',
  'Fetish',
  'Fingering',
  'First Time',
  'Fisting',
  'Footjob',
  'French 🇫🇷',
  'Gangbang',
  'Gay',
  'German 🇩🇪',
  'Gonzo',
  'Group Sex',
  'Handjob',
  'Hardcore',
  'Hentai',
  'Horny',
  'Housewife',
  'Interracial',
  'Italian 🇮🇹',
  'Japanese 🇯🇵',
  'Korean 🇰🇷',
  'Latina',
  'Lesbian',
  'Lingerie',
  'Masturbation',
  'Mature',
  'MILF',
  'Muscle',
  'Orgy',
  'Outdoor',
  'POV',
  'Public',
  'Pussy Licking',
  'Redhead',
  'Rough',
  'Russian 🇷🇺',
  'Shemale',
  'Solo',
  'Squirt',
  'Stockings',
  'Straight',
  'Teen',
  'Threesome',
  'Toys',
  'Transgender',
  'Uncensored',
  'Vintage',
  'Webcam',
  'Young',
];

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);
  const [allVideos, setAllVideos] = useState<any[]>([]); // Store all videos for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [country, setCountry] = useState<string>('US');
  const [qualityFilter, setQualityFilter] = useState<string>('all'); // 'all', 'hd', '4k', 'vr'
  const [availableQualities, setAvailableQualities] = useState({
    hasHD: false,
    has4K: false,
    hasVR: false,
  });
  const [videoDurations, setVideoDurations] = useState<Record<string, string>>({});
  const [orientationFilter, setOrientationFilter] = useState<string>('straight'); // 'straight', 'gay', 'shemale'
  const [minQualityFilter, setMinQualityFilter] = useState<string>(''); // '', '720p', '1080p', '2160p'
  const [sortBy, setSortBy] = useState<string>('relevance'); // 'relevance', 'date', 'views', 'rating', 'duration'
  const [categorySearch, setCategorySearch] = useState<string>('');

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user's country (with fallback)
        let userCountry = 'IN'; // Default country
        try {
          if (typeof window !== 'undefined') {
            userCountry = await getUserCountry().catch(() => 'IN');
          }
        } catch (error) {
          // Silently use default on any error (CORS errors are handled in getUserCountry)
          userCountry = 'IN';
        }
        setCountry(userCountry);

        // Fetch videos from API
        const response = await fetch(`${API_BASE_URL}?page=${currentPage}&limit=30&country=${userCountry}`, {
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();

        if (data.success && data.data) {
          // Map API response to video format
          const mappedVideos = data.data.map((movie: any, index: number) => {
            // Get 480p video URL for preview
            const previewVideo = movie.Videos?.find((v: any) => v.Quality === '480p') || 
                                 movie.Videos?.find((v: any) => v.Quality === '720p') ||
                                 movie.Videos?.[0];
            
            // Check available video qualities
            const has480p = movie.Videos?.some((v: any) => v.Quality === '480p') || false;
            const has720p = movie.Videos?.some((v: any) => v.Quality === '720p') || false;
            const has1080p = movie.Videos?.some((v: any) => v.Quality === '1080p') || false;
            const has4K = movie.Videos?.some((v: any) => v.Quality === '2160p' || v.Quality === '4K') || false;
            
            // HD includes both 720p and 1080p (but not 4K)
            const isHD = (has720p || has1080p) && !has4K;
            
            return {
              id: movie._id || index + 1,
              thumbnail: movie.Thumbnail || movie.Poster || 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
              duration: getVideoDuration(movie.Videos || []),
              title: movie.Title || 'Untitled',
              uploader: movie.Channel?.Name || 'Unknown',
              views: formatViews(movie.Views || 0),
              isHD: isHD,
              is4K: has4K,
              has480p: has480p,
              has720p: has720p,
              has1080p: has1080p,
              isVR: movie.Tags?.some((tag: string) => tag.toLowerCase().includes('vr')) || 
                    movie.Category?.Name?.toLowerCase().includes('vr') ||
                    movie.SubCategory?.Name?.toLowerCase().includes('vr') || false,
              isLive: false,
              slug: movie.Slug || movie._id,
              isPremium: movie.IsPremium || false,
              isTrending: movie.IsTrending || false,
              isFeatured: movie.IsFeatured || false,
              previewVideoUrl: previewVideo?.Url || null,
              allVideos: movie.Videos || [],
            };
          });

          setAllVideos(mappedVideos);
          setVideos(mappedVideos);
          setTotalPages(data.pagination?.pages || 1);

          // Check which qualities are available in the API response
          const hasHDVideos = mappedVideos.some((video: any) => video.has720p || video.has1080p);
          const has4KVideos = mappedVideos.some((video: any) => video.is4K);
          const hasVRVideos = mappedVideos.some((video: any) => video.isVR);
          
          setAvailableQualities({
            hasHD: hasHDVideos,
            has4K: has4KVideos,
            hasVR: hasVRVideos,
          });

          // Fetch video durations asynchronously
          const fetchDurations = async () => {
            const durationMap: Record<string, string> = {};
            
            // Fetch durations for all videos in parallel (with limit to avoid overwhelming)
            const durationPromises = mappedVideos.slice(0, 30).map(async (video: any) => {
              // Try to get duration from the first available video URL
              const videoUrl = video.previewVideoUrl || 
                              video.allVideos?.find((v: any) => v.Quality === '480p')?.Url ||
                              video.allVideos?.find((v: any) => v.Quality === '720p')?.Url ||
                              video.allVideos?.[0]?.Url;
              
              if (videoUrl) {
                const duration = await getVideoDurationFromUrl(videoUrl);
                durationMap[video.id] = duration;
              } else {
                durationMap[video.id] = '0:00';
              }
            });
            
            await Promise.all(durationPromises);
            setVideoDurations(prev => ({ ...prev, ...durationMap }));
          };
          
          // Fetch durations after a short delay to not block UI
          setTimeout(() => {
            fetchDurations();
          }, 500);
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to load videos');
        // Use mock videos as fallback
        setVideos(mockVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage]);

  // Filter videos based on quality
  useEffect(() => {
    if (qualityFilter === 'all') {
      setVideos(allVideos);
    } else if (qualityFilter === 'hd') {
      // HD filter: videos that have 720p OR 1080p quality (excluding 4K)
      // This includes videos with only 720p, only 1080p, or both
      setVideos(allVideos.filter(video => {
        const hasHDQuality = video.has720p || video.has1080p;
        return hasHDQuality && !video.is4K;
      }));
    } else if (qualityFilter === '4k') {
      // 4K filter: videos with 2160p or 4K quality
      setVideos(allVideos.filter(video => video.is4K === true));
    } else if (qualityFilter === 'vr') {
      // VR filter: videos with VR tags or in VR categories
      setVideos(allVideos.filter(video => video.isVR === true));
    }
  }, [qualityFilter, allVideos]);

  return (
    <div className="min-h-screen w-full bg-black text-white" style={{ backgroundColor: '#000000', minHeight: '100vh', width: '100%', overflow: 'visible', position: 'relative' }}>
      <Header />

      {/* Promotional Banner */}
      {showPromoBanner && (
        <div className="bg-black w-full" style={{ overflow: 'visible' }}>
          <div className="w-full bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 py-4 relative overflow-hidden border-b border-purple-800/50">
            <div className="w-full max-w-[1600px] mx-auto px-8 flex flex-row items-center justify-center gap-4 text-left relative z-10">
            <div className="flex items-center space-x-2">
              <span className="text-base font-semibold whitespace-nowrap text-white" style={{ fontFamily: 'inherit' }}>COLD SEASON, HOT CHATS</span>
              <MessageCircle className="w-5 h-5 text-purple-300 flex-shrink-0" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base text-white" style={{ fontFamily: 'inherit' }}>Jerk off with REAL GIRLS in Sex Video Chat</span>
              <button className="text-white/80 hover:text-white transition-colors flex-shrink-0" aria-label="More information">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <Button className="bg-[#f7000a] hover:bg-[#e60009] text-white text-base whitespace-nowrap rounded-md px-5 py-2.5 h-10 font-semibold shadow-lg" style={{ fontFamily: 'inherit' }}>TRY FOR FREE</Button>
            </div>
            <button 
              onClick={() => setShowPromoBanner(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1.5 z-20 rounded hover:bg-white/10 transition-colors"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="main-wrap" style={{ zIndex: 1, position: 'relative' }}>
        <div className="width-wrap py-6">
          <div className="w-full bg-[#1a1a1a] rounded-lg p-6">
          <div className="flex flex-row gap-6">
            {/* Sidebar - Always visible */}
            <aside className="sidebar space-y-3">
            {/* Search in orientations */}
            <div className="bg-[#0f0f0f] rounded-lg p-3 border border-gray-800">
              <div className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'inherit' }}>Search in orientations</div>
              <div className="space-y-1">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="orientation-straight"
                      value="straight"
                      checked={orientationFilter === 'straight'}
                      onChange={() => setOrientationFilter('straight')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      orientationFilter === 'straight' 
                        ? 'bg-[#f7000a] border-[#f7000a]' 
                        : 'border-gray-600 group-hover:border-gray-500'
                    }`}>
                      {orientationFilter === 'straight' && (
                        <svg viewBox="0 0 20 20" width="14" height="14" className="text-white">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <svg viewBox="0 0 48 48" width="20" height="20" className="text-[#f7000a]">
                      <circle cx="24" cy="16" r="6" fill="currentColor"/>
                      <path d="M 24 22 L 24 38 M 14 28 L 6 28 M 34 28 L 42 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors" style={{ fontFamily: 'inherit' }}>Straight</span>
                  </div>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="orientation-gay"
                      value="gay"
                      checked={orientationFilter === 'gay'}
                      onChange={() => setOrientationFilter('gay')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      orientationFilter === 'gay' 
                        ? 'bg-[#f7000a] border-[#f7000a]' 
                        : 'border-gray-600 group-hover:border-gray-500'
                    }`}>
                      {orientationFilter === 'gay' && (
                        <svg viewBox="0 0 20 20" width="14" height="14" className="text-white">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <svg viewBox="0 0 48 48" width="20" height="20" className="text-[#f7000a]">
                      <circle cx="24" cy="16" r="6" fill="currentColor"/>
                      <path d="M 24 22 L 24 38 M 14 28 L 6 28 M 34 28 L 42 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors" style={{ fontFamily: 'inherit' }}>Gay</span>
                  </div>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="orientation-shemale"
                      value="shemale"
                      checked={orientationFilter === 'shemale'}
                      onChange={() => setOrientationFilter('shemale')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      orientationFilter === 'shemale' 
                        ? 'bg-[#f7000a] border-[#f7000a]' 
                        : 'border-gray-600 group-hover:border-gray-500'
                    }`}>
                      {orientationFilter === 'shemale' && (
                        <svg viewBox="0 0 20 20" width="14" height="14" className="text-white">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <svg viewBox="0 0 48 48" width="20" height="20" className="text-[#f7000a]">
                      <circle cx="24" cy="16" r="6" fill="currentColor"/>
                      <path d="M 24 22 L 24 38 M 14 28 L 6 28 M 34 28 L 42 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      <path d="M 14 38 L 34 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors" style={{ fontFamily: 'inherit' }}>Transgender</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Minimum quality */}
            <div className="bg-[#0f0f0f] rounded-lg p-3 border border-gray-800">
              <div className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'inherit' }}>Minimum quality</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setMinQualityFilter(minQualityFilter === '720p' ? '' : '720p')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    minQualityFilter === '720p'
                      ? 'bg-gray-700 text-white border border-gray-600'
                      : 'bg-transparent text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300'
                  }`}
                  style={{ fontFamily: 'inherit' }}
                >
                  720p+
                </button>
                <button
                  onClick={() => setMinQualityFilter(minQualityFilter === '1080p' ? '' : '1080p')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    minQualityFilter === '1080p'
                      ? 'bg-gray-700 text-white border border-gray-600'
                      : 'bg-transparent text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300'
                  }`}
                  style={{ fontFamily: 'inherit' }}
                >
                  1080p+
                </button>
                <button
                  onClick={() => setMinQualityFilter(minQualityFilter === '2160p' ? '' : '2160p')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    minQualityFilter === '2160p'
                      ? 'bg-gray-700 text-white border border-gray-600'
                      : 'bg-transparent text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300'
                  }`}
                  style={{ fontFamily: 'inherit' }}
                >
                  2160p+
                </button>
              </div>
            </div>

            {/* Sort by */}
            <div className="bg-[#0f0f0f] rounded-lg p-3 border border-gray-800">
              <div className="text-sm font-semibold text-white mb-2" style={{ fontFamily: 'inherit' }}>Sort by</div>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full bg-[#2a2a2a] border border-gray-700 text-white text-sm px-3 py-2 rounded flex items-center justify-between hover:bg-gray-800 transition-colors">
                  <span style={{ fontFamily: 'inherit' }}>
                    {sortBy === 'relevance' ? 'Relevance' : 
                     sortBy === 'date' ? 'Date' : 
                     sortBy === 'views' ? 'Views' : 
                     sortBy === 'rating' ? 'Rating' : 
                     sortBy === 'duration' ? 'Duration' : 'Relevance'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-[#1a1a1a] border-gray-800 w-56">
                  <DropdownMenuItem onClick={() => setSortBy('relevance')} className="text-white hover:bg-gray-800 cursor-pointer">Relevance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('date')} className="text-white hover:bg-gray-800 cursor-pointer">Date</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('views')} className="text-white hover:bg-gray-800 cursor-pointer">Views</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('rating')} className="text-white hover:bg-gray-800 cursor-pointer">Rating</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('duration')} className="text-white hover:bg-gray-800 cursor-pointer">Duration</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Filter by Categories */}
            <div className="bg-[#0f0f0f] rounded-lg p-3 border border-gray-800">
              <div className="text-sm font-semibold text-white mb-2" style={{ fontFamily: 'inherit' }}>Filter by Categories</div>
              <div className="relative mb-2.5">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Choose category"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-500 pl-8 pr-3 h-9 text-sm"
                />
              </div>
              <ScrollArea className="h-[400px]">
                <div className="space-y-0.5 pr-2">
                {categories.filter(cat => 
                  categorySearch === '' || cat.toLowerCase().includes(categorySearch.toLowerCase())
                ).map((category) => {
                  const is4K = category === '4K Porn';
                  const isHD = category === 'HD Videos';
                  const isVR = category === 'VR Porn';
                  const hasIndianFlag = category.includes('🇮🇳');
                  const hasUSFlag = category.includes('🇺🇸');
                  const hasBangladeshiFlag = category.includes('🇧🇩');
                  const hasBrazilianFlag = category.includes('🇧🇷');
                  const hasBritishFlag = category.includes('🇬🇧');
                  const hasChineseFlag = category.includes('🇨🇳');
                  const hasCzechFlag = category.includes('🇨🇿');
                  const hasFrenchFlag = category.includes('🇫🇷');
                  const hasGermanFlag = category.includes('🇩🇪');
                  const hasItalianFlag = category.includes('🇮🇹');
                  const hasJapaneseFlag = category.includes('🇯🇵');
                  const hasKoreanFlag = category.includes('🇰🇷');
                  const hasRussianFlag = category.includes('🇷🇺');
                  let categoryName = category;
                  if (hasIndianFlag) categoryName = category.replace(/\s*🇮🇳\s*$/, '').trim();
                  if (hasUSFlag) categoryName = category.replace(/\s*🇺🇸\s*$/, '').trim();
                  if (hasBangladeshiFlag) categoryName = category.replace(/\s*🇧🇩\s*$/, '').trim();
                  if (hasBrazilianFlag) categoryName = category.replace(/\s*🇧🇷\s*$/, '').trim();
                  if (hasBritishFlag) categoryName = category.replace(/\s*🇬🇧\s*$/, '').trim();
                  if (hasChineseFlag) categoryName = category.replace(/\s*🇨🇳\s*$/, '').trim();
                  if (hasCzechFlag) categoryName = category.replace(/\s*🇨🇿\s*$/, '').trim();
                  if (hasFrenchFlag) categoryName = category.replace(/\s*🇫🇷\s*$/, '').trim();
                  if (hasGermanFlag) categoryName = category.replace(/\s*🇩🇪\s*$/, '').trim();
                  if (hasItalianFlag) categoryName = category.replace(/\s*🇮🇹\s*$/, '').trim();
                  if (hasJapaneseFlag) categoryName = category.replace(/\s*🇯🇵\s*$/, '').trim();
                  if (hasKoreanFlag) categoryName = category.replace(/\s*🇰🇷\s*$/, '').trim();
                  if (hasRussianFlag) categoryName = category.replace(/\s*🇷🇺\s*$/, '').trim();
                  
                  return (
                    <button
                      key={category}
                      className="flex items-center justify-between w-full text-left text-sm hover:text-orange-500 py-1.5 px-2 rounded transition-colors group"
                      style={{ fontFamily: 'inherit' }}
                    >
                      <span className="truncate pr-2 flex-1">{categoryName}</span>
                      <div className="flex items-center space-x-1.5 ml-auto flex-shrink-0">
                        {is4K && <Badge className="bg-gray-600 text-white text-[10px] px-1.5 py-0 h-4 font-semibold whitespace-nowrap" style={{ fontFamily: 'inherit' }}>4K</Badge>}
                        {isHD && <Badge className="bg-gray-600 text-white text-[10px] px-1.5 py-0 h-4 font-semibold whitespace-nowrap" style={{ fontFamily: 'inherit' }}>HD</Badge>}
                        {isVR && <Badge className="bg-blue-600 text-white text-[10px] px-1.5 py-0 h-4 font-semibold whitespace-nowrap" style={{ fontFamily: 'inherit' }}>VR</Badge>}
                        {hasIndianFlag && <span className="text-base flex-shrink-0">🇮🇳</span>}
                        {hasUSFlag && <span className="text-base flex-shrink-0">🇺🇸</span>}
                        {hasBangladeshiFlag && <span className="text-base flex-shrink-0">🇧🇩</span>}
                        {hasBrazilianFlag && <span className="text-base flex-shrink-0">🇧🇷</span>}
                        {hasBritishFlag && <span className="text-base flex-shrink-0">🇬🇧</span>}
                        {hasChineseFlag && <span className="text-base flex-shrink-0">🇨🇳</span>}
                        {hasCzechFlag && <span className="text-base flex-shrink-0">🇨🇿</span>}
                        {hasFrenchFlag && <span className="text-base flex-shrink-0">🇫🇷</span>}
                        {hasGermanFlag && <span className="text-base flex-shrink-0">🇩🇪</span>}
                        {hasItalianFlag && <span className="text-base flex-shrink-0">🇮🇹</span>}
                        {hasJapaneseFlag && <span className="text-base flex-shrink-0">🇯🇵</span>}
                        {hasKoreanFlag && <span className="text-base flex-shrink-0">🇰🇷</span>}
                        {hasRussianFlag && <span className="text-base flex-shrink-0">🇷🇺</span>}
                      </div>
                    </button>
                  );
                })}
                </div>
              </ScrollArea>
            </div>
            </aside>

            <main className="flex-1">
            <div className="flex flex-row items-center justify-between gap-4 mb-6">
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'inherit' }}>Trending Free Porn Videos:</h1>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={qualityFilter === 'all' ? 'outline' : 'ghost'} 
                  size="sm" 
                  onClick={() => setQualityFilter('all')}
                  className={`${
                    qualityFilter === 'all' 
                      ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  } h-9 px-4 text-base font-medium`} 
                  style={{ fontFamily: 'inherit' }}
                >
                  All
                </Button>
                {availableQualities.hasHD && (
                  <Button 
                    variant={qualityFilter === 'hd' ? 'outline' : 'ghost'} 
                    size="sm" 
                    onClick={() => setQualityFilter('hd')}
                    className={`${
                      qualityFilter === 'hd' 
                        ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    } h-9 px-4 text-base font-medium`} 
                    style={{ fontFamily: 'inherit' }}
                  >
                    HD
                  </Button>
                )}
                {availableQualities.has4K && (
                  <Button 
                    variant={qualityFilter === '4k' ? 'outline' : 'ghost'} 
                    size="sm" 
                    onClick={() => setQualityFilter('4k')}
                    className={`${
                      qualityFilter === '4k' 
                        ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    } h-9 px-4 text-base font-medium`} 
                    style={{ fontFamily: 'inherit' }}
                  >
                    4K
                  </Button>
                )}
                {availableQualities.hasVR && (
                  <Button 
                    variant={qualityFilter === 'vr' ? 'outline' : 'ghost'} 
                    size="sm" 
                    onClick={() => setQualityFilter('vr')}
                    className={`${
                      qualityFilter === 'vr' 
                        ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    } h-9 px-4 text-base font-medium`} 
                    style={{ fontFamily: 'inherit' }}
                  >
                    VR
                  </Button>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-400 mb-4">
              By clicking the content you will also see an ad. <Badge variant="secondary" className="bg-gray-700 text-white text-xs">AD</Badge>
            </div>

            {error && !loading && (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <p className="text-gray-400">Showing fallback videos...</p>
              </div>
            )}

            {!loading && videos.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-gray-400">No videos found.</p>
              </div>
            )}

            <div className="thumb-list thumb-list--sidebar gap-4">
              {loading ? (
                // Skeleton Loaders
                Array.from({ length: 12 }).map((_, index) => (
                  <div key={`skeleton-${index}`} className="video-thumb block relative">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-3">
                      <Skeleton className="w-full h-full bg-gray-700" />
                      {/* Duration badge skeleton */}
                      <div className="absolute bottom-2.5 right-2.5">
                        <Skeleton className="h-5 w-12 bg-gray-700" />
                      </div>
                      {/* Quality badge skeleton */}
                      <div className="absolute top-2.5 left-2.5">
                        <Skeleton className="h-5 w-8 bg-gray-700" />
                      </div>
                    </div>
                    {/* Title skeleton */}
                    <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 mb-2 bg-gray-700" />
                    {/* Info skeleton */}
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-5 w-5 rounded-full bg-gray-700" />
                      <Skeleton className="h-3 w-24 bg-gray-700" />
                      <Skeleton className="h-3 w-16 bg-gray-700" />
                    </div>
                  </div>
                ))
              ) : (
                videos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer video-thumb video-thumb--type-video"
                >
                  <Link
                    href={`/video/${video.slug || video.id}`}
                    className="block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="video-thumb__image-container">
                      {/* Thumbnail Image */}
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className={`thumb-image-container__image ${
                          video.previewVideoUrl ? 'group-hover:opacity-0' : 'group-hover:scale-105'
                        }`}
                        loading="lazy"
                      />
                      
                      {/* Video Preview on Hover */}
                      {video.previewVideoUrl && (
                        <video
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                          src={video.previewVideoUrl}
                          muted
                          playsInline
                          loop
                          preload="metadata"
                          onLoadedMetadata={(e) => {
                            const videoEl = e.currentTarget;
                            // Skip to 20% of video for better preview
                            if (videoEl.duration) {
                              videoEl.currentTime = videoEl.duration * 0.2;
                            }
                          }}
                          onMouseEnter={(e) => {
                            const videoEl = e.currentTarget;
                            // Start from 20% of video if not already set
                            if (videoEl.currentTime === 0 && videoEl.duration) {
                              videoEl.currentTime = videoEl.duration * 0.2;
                            }
                            videoEl.playbackRate = 2.0; // Fast-forward at 2x speed
                            videoEl.play().catch(() => {
                              // Auto-play failed, ignore
                            });
                          }}
                          onMouseLeave={(e) => {
                            const videoEl = e.currentTarget;
                            videoEl.pause();
                            // Reset to start position for next hover
                            if (videoEl.duration) {
                              videoEl.currentTime = videoEl.duration * 0.2;
                            }
                          }}
                          onEnded={(e) => {
                            const videoEl = e.currentTarget;
                            // Loop back to 20% when video ends
                            if (videoEl.duration) {
                              videoEl.currentTime = videoEl.duration * 0.2;
                              videoEl.play();
                            }
                          }}
                        />
                      )}
                      
                      {/* Play button overlay - only show if no video preview */}
                      {!video.previewVideoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          <div className="w-16 h-16 bg-black/70 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                            <Play className="w-8 h-8 fill-white text-white ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Duration badge */}
                      <div className="thumb-image-container__duration" style={{ fontFamily: 'inherit' }}>
                        {videoDurations[video.id] || video.duration || '0:00'}
                      </div>

                      {/* Quality badges */}
                      {video.is4K && !video.isLive && (
                        <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-semibold text-white z-20" style={{ fontFamily: 'inherit' }}>
                          4K
                        </div>
                      )}
                      {video.isLive && (
                        <div className="absolute top-2 left-2 bg-red-600 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-1 text-white z-20" style={{ fontFamily: 'inherit' }}>
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                          <span>Live</span>
                        </div>
                      )}
                      {video.isHD && !video.is4K && !video.isLive && (
                        <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-semibold text-white z-20" style={{ fontFamily: 'inherit' }}>
                          HD
                        </div>
                      )}

                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-[5]"></div>

                      {/* Three-dot menu button - appears on hover */}
                      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                            <button
                              className="w-8 h-8 bg-black/80 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              aria-label="More options"
                            >
                              <MoreVertical className="w-4 h-4 text-white" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 bg-[#1a1a1a] border-gray-800 text-white z-[10000]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DropdownMenuItem
                              className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <Bookmark className="w-4 h-4 mr-2" />
                              Save
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <DropdownMenuItem
                              className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <Flag className="w-4 h-4 mr-2" />
                              Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="video-thumb-info">
                      <a
                        href={`/video/${video.slug || video.id}`}
                        className="video-thumb-info__name"
                        style={{ fontFamily: 'inherit' }}
                      >
                        {video.title}
                      </a>
                      <div className="video-thumb-uploader">
                        <div className="video-uploader-data">
                          <a 
                            href="#" 
                            className="video-uploader-logo"
                            style={{ 
                              backgroundImage: `url(${video.thumbnail})`, 
                              backgroundColor: '#f97316'
                            }}
                          ></a>
                          <a 
                            href="#" 
                            className="video-uploader__name"
                            style={{ fontFamily: 'inherit' }}
                          >
                            {video.uploader}
                          </a>
                          <div className="video-thumb-uploader__separator"></div>
                          <div className="video-thumb-views" style={{ fontFamily: 'inherit' }}>
                            {video.views} views
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="mt-8 mb-6">
              <Pagination>
                <PaginationContent className="flex-wrap gap-2 justify-center">
                  {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                        className={`${
                          currentPage === page
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'text-white hover:text-white hover:bg-gray-700 bg-gray-800'
                        } border-0 rounded min-w-[36px] h-9 font-medium`}
                        style={{ fontFamily: 'inherit' }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {totalPages > 6 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis className="text-gray-400 h-9 flex items-center px-2" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(totalPages);
                          }}
                          className="text-white hover:text-white hover:bg-gray-700 border-0 bg-gray-800 rounded min-w-[36px] h-9 font-medium"
                          style={{ fontFamily: 'inherit' }}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                        }}
                        className="bg-[#f7000a] hover:bg-[#e60009] text-white border-0 rounded h-9 px-4 font-medium"
                        style={{ fontFamily: 'inherit' }}
                      >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                      </PaginationNext>
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
            </main>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8">
            <div className="grid grid-cols-4 gap-8">
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
                <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'inherit' }}>Help</h3>
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
                <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'inherit' }}>Legal</h3>
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
                <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'inherit' }}>Start making money with us</h3>
                <ul className="space-y-2 text-sm text-gray-400 mb-6">
                  <li>
                    <a href="#" className="hover:text-orange-500 transition-colors" style={{ fontFamily: 'inherit' }}>
                      Camgirls Wanted
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500 transition-colors" style={{ fontFamily: 'inherit' }}>
                      Content Creators Program
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500 transition-colors" style={{ fontFamily: 'inherit' }}>
                      Creator Contest
                    </a>
                  </li>
                </ul>
                <div>
                  <h4 className="text-white font-semibold mb-3" style={{ fontFamily: 'inherit' }}>Monetize your content</h4>
                  <div className="flex items-center gap-3">
                    <Button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 flex items-center gap-2" style={{ fontFamily: 'inherit' }}>
                      <Play className="w-4 h-4 fill-green-500 text-green-500" />
                      Become a creator
                    </Button>
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 border-2 border-[#1a1a1a]"
                          title={`Creator ${i}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] border-t border-gray-700 px-8 py-3 z-50">
          <div className="container mx-auto flex flex-row items-center justify-between gap-3 max-w-[1600px]">
            <p className="text-sm text-gray-300 flex-1">
              Cookies help us deliver our services. By using this website, you agree with our use of cookies.{' '}
              <a href="#" className="text-orange-500 hover:text-orange-400 underline">
                Learn more
              </a>
            </p>
            <Button
              onClick={() => setShowCookieBanner(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white w-auto"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
