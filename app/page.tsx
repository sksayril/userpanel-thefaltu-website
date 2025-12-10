'use client';

import { useState } from 'react';
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

  return (
    <div className="min-h-screen w-full bg-black text-white" style={{ backgroundColor: '#000000', minHeight: '100vh', width: '100%', overflow: 'visible', position: 'relative' }}>
      <Header />

      {/* Promotional Banner */}
      {showPromoBanner && (
        <div className="bg-black w-full" style={{ overflow: 'visible' }}>
          <div className="w-full bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 py-3 md:py-4 relative overflow-hidden border-b border-purple-800/50">
            <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center sm:text-left relative z-10">
            <div className="flex items-center space-x-2">
              <span className="text-base font-semibold whitespace-nowrap text-white" style={{ fontFamily: 'inherit' }}>COLD SEASON, HOT CHATS</span>
              <MessageCircle className="w-5 h-5 text-purple-300" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base text-white" style={{ fontFamily: 'inherit' }}>Jerk off with REAL GIRLS in Sex Video Chat</span>
              <button className="text-white/80 hover:text-white transition-colors" aria-label="More information">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <Button className="bg-[#f7000a] hover:bg-[#e60009] text-white text-base whitespace-nowrap rounded-md px-5 py-2.5 h-10 font-semibold shadow-lg" style={{ fontFamily: 'inherit' }}>TRY FOR FREE</Button>
            </div>
            <button 
              onClick={() => setShowPromoBanner(false)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1.5 z-20 rounded hover:bg-white/10 transition-colors"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-black relative" style={{ zIndex: 1, position: 'relative' }}>
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
          <div className="w-full bg-[#1a1a1a] rounded-lg p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
            <div className="bg-[#0f0f0f] rounded-lg p-3 space-y-1 border border-gray-800">
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2 rounded transition-colors" style={{ fontFamily: 'inherit' }}>
                <Rss className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Subscriptions</span>
              </button>
              <div className="h-px bg-gray-800 my-1"></div>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2 rounded transition-colors" style={{ fontFamily: 'inherit' }}>
                <ThumbsUp className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Liked</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2 rounded transition-colors" style={{ fontFamily: 'inherit' }}>
                <History className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Watch History</span>
              </button>
            </div>

            <div className="bg-[#0f0f0f] rounded-lg p-3 space-y-1 border border-gray-800">
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2 rounded transition-colors" style={{ fontFamily: 'inherit' }}>
                <Zap className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Newest Videos</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2 rounded transition-colors" style={{ fontFamily: 'inherit' }}>
                <ThumbsUp className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Best Videos</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2 rounded transition-colors" style={{ fontFamily: 'inherit' }}>
                <Film className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Short Videos</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2 rounded transition-colors" style={{ fontFamily: 'inherit' }}>
                <Award className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Top Creators</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left hover:text-orange-500 py-2 px-2 rounded transition-colors" style={{ fontFamily: 'inherit' }}>
                <Award className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Awards 2025</span>
                <Badge className="bg-red-600 text-white text-xs ml-auto px-1.5 py-0" style={{ fontFamily: 'inherit' }}>Hot</Badge>
              </button>
            </div>

            <div className="bg-[#0f0f0f] rounded-lg p-3 border border-gray-800">
              <div className="relative mb-3">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Filter by category..."
                  className="w-full bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-500 pl-8 pr-3 h-9 text-sm"
                />
              </div>
              <div className="space-y-0.5">
                {categories.map((category) => {
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
                      className="flex items-center justify-between w-full text-left text-sm hover:text-orange-500 py-1.5 px-2 rounded transition-colors"
                      style={{ fontFamily: 'inherit' }}
                    >
                      <span>{categoryName}</span>
                      <div className="flex items-center space-x-1 ml-auto">
                        {is4K && <Badge className="bg-gray-600 text-white text-[10px] px-1.5 py-0 h-4 font-semibold" style={{ fontFamily: 'inherit' }}>4K</Badge>}
                        {isHD && <Badge className="bg-gray-600 text-white text-[10px] px-1.5 py-0 h-4 font-semibold" style={{ fontFamily: 'inherit' }}>HD</Badge>}
                        {isVR && <Badge className="bg-blue-600 text-white text-[10px] px-1.5 py-0 h-4 font-semibold" style={{ fontFamily: 'inherit' }}>VR</Badge>}
                        {hasIndianFlag && <span>🇮🇳</span>}
                        {hasUSFlag && <span>🇺🇸</span>}
                        {hasBangladeshiFlag && <span>🇧🇩</span>}
                        {hasBrazilianFlag && <span>🇧🇷</span>}
                        {hasBritishFlag && <span>🇬🇧</span>}
                        {hasChineseFlag && <span>🇨🇳</span>}
                        {hasCzechFlag && <span>🇨🇿</span>}
                        {hasFrenchFlag && <span>🇫🇷</span>}
                        {hasGermanFlag && <span>🇩🇪</span>}
                        {hasItalianFlag && <span>🇮🇹</span>}
                        {hasJapaneseFlag && <span>🇯🇵</span>}
                        {hasKoreanFlag && <span>🇰🇷</span>}
                        {hasRussianFlag && <span>🇷🇺</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            </aside>

            <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'inherit' }}>Trending Free Porn Videos:</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 h-9 px-4 text-base font-medium" style={{ fontFamily: 'inherit' }}>
                  All
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 h-9 px-4 text-base font-medium" style={{ fontFamily: 'inherit' }}>
                  HD
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 h-9 px-4 text-base font-medium" style={{ fontFamily: 'inherit' }}>
                  4K
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 h-9 px-4 text-base font-medium" style={{ fontFamily: 'inherit' }}>
                  VR
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-400 mb-4">
              By clicking the content you will also see an ad. <Badge variant="secondary" className="bg-gray-700 text-white text-xs">AD</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockVideos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer video-thumb block relative"
                >
                  <Link
                    href={`/video/${video.id}`}
                    className="block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-3 video-thumb__image-container">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      
                      {/* Play button overlay on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="w-16 h-16 bg-black/70 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                          <Play className="w-8 h-8 fill-white text-white ml-1" />
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-2.5 right-2.5 bg-black/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-white z-20" style={{ fontFamily: 'inherit' }}>
                        {video.duration}
                      </div>

                      {/* Quality badges */}
                      {video.is4K && !video.isLive && (
                        <div className="absolute top-2.5 left-2.5 bg-black/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-white flex items-center gap-1 z-20" style={{ fontFamily: 'inherit' }}>
                          <span>4K</span>
                        </div>
                      )}
                      {video.isLive && (
                        <div className="absolute top-2.5 left-2.5 bg-red-600 px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 text-white z-20" style={{ fontFamily: 'inherit' }}>
                          <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
                          <span>Live</span>
                        </div>
                      )}
                      {video.isHD && !video.is4K && !video.isLive && (
                        <div className="absolute top-2.5 left-2.5 bg-black/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-white z-20" style={{ fontFamily: 'inherit' }}>
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
                      <h3 className="text-sm font-medium mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors min-h-[2.5rem]" style={{ fontFamily: 'inherit' }}>
                        {video.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-400" style={{ fontFamily: 'inherit' }}>
                        <div className="flex items-center space-x-1.5 min-w-0 flex-1">
                          <div className="w-5 h-5 bg-orange-600 rounded-full flex-shrink-0"></div>
                          <span className="truncate font-medium">{video.uploader}</span>
                        </div>
                        <span className="text-gray-600">•</span>
                        <span className="flex-shrink-0">{video.views} views</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 mb-6">
              <Pagination>
                <PaginationContent className="flex-wrap gap-1 justify-center">
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      className="bg-white text-black hover:bg-gray-200 border-0 rounded min-w-[36px] h-9 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-white hover:text-white hover:bg-gray-700 border-0 bg-gray-800 rounded min-w-[36px] h-9 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-white hover:text-white hover:bg-gray-700 border-0 bg-gray-800 rounded min-w-[36px] h-9 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-white hover:text-white hover:bg-gray-700 border-0 bg-gray-800 rounded min-w-[36px] h-9 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      4
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-white hover:text-white hover:bg-gray-700 border-0 bg-gray-800 rounded min-w-[36px] h-9 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      5
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-white hover:text-white hover:bg-gray-700 border-0 bg-gray-800 rounded min-w-[36px] h-9 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      6
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis className="text-gray-400 h-9 flex items-center px-2" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-white hover:text-white hover:bg-gray-700 border-0 bg-gray-800 rounded min-w-[36px] h-9 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      11468
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis className="text-gray-400 h-9 flex items-center px-2" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="text-white hover:text-white hover:bg-gray-700 border-0 bg-gray-800 rounded min-w-[36px] h-9 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      22935
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      className="bg-[#f7000a] hover:bg-[#e60009] text-white border-0 rounded h-9 px-4 font-medium"
                      style={{ fontFamily: 'inherit' }}
                    >
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
            </main>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8">
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
        <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] border-t border-gray-700 px-6 lg:px-8 py-3 z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-[1600px]">
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
