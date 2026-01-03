'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  ThumbsUp,
  Eye,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronDown,
  Info,
  X,
  Play,
  Settings,
  MoreVertical,
  Flag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// API endpoint
const API_BASE_URL = 'https://7cvccltb-3100.inc1.devtunnels.ms/api/movies';

// Function to format duration from seconds
const formatDuration = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
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

// Function to get user's country
const getUserCountry = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    return 'IN';
  }
  try {
    if (typeof navigator !== 'undefined' && navigator.language) {
      const locale = navigator.language;
      const country = locale.split('-')[1];
      if (country && country.length === 2) {
        return country.toUpperCase();
      }
    }
  } catch (error) {
    // Ignore errors
  }
  return 'IN';
};

// Function to check if a string is a MongoDB ObjectId (24 hex characters)
const isObjectId = (str: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(str);
};

const relatedVideos = [
  {
    id: 1,
    thumbnail: 'https://images.pexels.com/photos/1739748/pexels-photo-1739748.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '23:28',
    title: 'Cuckold Wife Secretly...',
    isHD: true,
  },
  {
    id: 2,
    thumbnail: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '15:12',
    title: 'Stepbrothers Fuck Beh...',
    isHD: true,
  },
  {
    id: 3,
    thumbnail: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '18:45',
    title: 'Dressing My Tantaly S...',
    isHD: true,
  },
  {
    id: 4,
    thumbnail: 'https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '22:10',
    title: 'Threesome - Cuckold...',
    isHD: true,
  },
  {
    id: 5,
    thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '19:33',
    title: 'Cuckold Wife Fucks H...',
    isHD: true,
  },
  {
    id: 6,
    thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '16:20',
    title: 'Cuckold Boyfriend Fuc...',
    isHD: true,
  },
  {
    id: 7,
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '14:55',
    title: 'Cop Fucks Whore at th...',
    isHD: true,
  },
  {
    id: 8,
    thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '21:40',
    title: 'Threesome with My St...',
    isHD: true,
  },
];

const moreVideos = [
  {
    id: 1,
    thumbnail: 'https://images.pexels.com/photos/1739748/pexels-photo-1739748.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12:28',
    title: 'Horny MILF Fucks Step-Son Until He Creams Inside Her Pussy',
    uploader: 'My pervy family',
    views: '39.6M views',
    isLive: false,
  },
  {
    id: 2,
    thumbnail: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '13:20',
    title: 'Stepson Masturbates Watching His Stepmother Being Fucked by...',
    uploader: 'Tiffany Montavani',
    views: '7.1M views',
    isLive: false,
  },
  {
    id: 3,
    thumbnail: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '15:47',
    title: 'Alex White shows Whitney Wright how they can Share their...',
    uploader: 'My Family Pies',
    views: '36.9M views',
    isLive: false,
  },
  {
    id: 4,
    thumbnail: 'https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10:07',
    title: 'Dirty Stranger Slid His Cock Under My Skirt in a Japan Train and Cu...',
    uploader: 'CoupleForFun2023',
    views: '3M views',
    isLive: false,
  },
  {
    id: 5,
    thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '17:12',
    title: 'Wife at Ultrasound with Husband.',
    uploader: 'ksalnovinhos',
    views: '9.1M views',
    is4K: true,
  },
  {
    id: 6,
    thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10:15',
    title: 'Stepdaughter And Stepdad Explore Their Sexuality Together',
    uploader: 'Family Strokes',
    views: '5.4M views',
    isLive: false,
  },
];

const comments = [
  {
    id: 1,
    username: 'sweetcheasy',
    avatar: '👩',
    comment: 'wow I\'m gonna have this tonight',
    time: '5 days ago',
    likes: 6,
  },
  {
    id: 2,
    username: 'kweeenieee',
    avatar: '👩',
    comment: 'they are so good 😊',
    time: '12 days ago',
    likes: 5,
  },
  {
    id: 3,
    username: 'jonas477',
    avatar: 'J',
    comment: 'Que rico 🤤',
    time: '1 day ago',
    likes: 2,
  },
  {
    id: 4,
    username: 'MythicalCircle1',
    avatar: '👨',
    comment: 'Sexy little INK PIG, I would have loved to be stuck up her.',
    time: '2 days ago',
    likes: 3,
  },
  {
    id: 5,
    username: 'SpecificEssence855',
    avatar: 'S',
    comment: 'da peshawar na kama aunty ya girl contact kol ghware nu inbox di oki only secret relationship da para',
    time: '3 days ago',
    likes: 1,
  },
];

const categories = ['Amateur', 'Blowjob', 'Latina', 'Big Ass', 'Big Tits', 'Colombian', 'Doggy Style', 'MILF', 'Nude', 'Taboo', 'Teen (18+)', 'Missionary'];

export default function VideoPage() {
  const params = useParams();
  const slug = params?.id as string;
  const [activeTab, setActiveTab] = useState('related');
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>('720p');
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch movie data from API
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);

        // Get user's country
        const userCountry = await getUserCountry();

        // The API endpoint handles both slug and ObjectId
        // Fetch movie by slug or ObjectId
        const response = await fetch(`${API_BASE_URL}/${slug}`, {
          headers: {
            'Accept': 'application/json',
            'X-Country-Code': userCountry,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }

        const data = await response.json();

        if (data.success && data.data) {
          setMovieData(data.data);
          
          // Set default video quality (prefer 720p, then 1080p, then first available)
          const videos = data.data.Videos || [];
          const preferredVideo = videos.find((v: any) => v.Quality === '720p') ||
                                 videos.find((v: any) => v.Quality === '1080p') ||
                                 videos.find((v: any) => v.Quality === '480p') ||
                                 videos[0];
          
          if (preferredVideo) {
            setSelectedQuality(preferredVideo.Quality);
            setCurrentVideoUrl(preferredVideo.Url);
          }
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load movie');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [slug]);

  // Update video URL when quality changes
  useEffect(() => {
    if (movieData?.Videos) {
      const selectedVideo = movieData.Videos.find((v: any) => v.Quality === selectedQuality);
      if (selectedVideo) {
        setCurrentVideoUrl(selectedVideo.Url);
      }
    }
  }, [selectedQuality, movieData]);

  // Use movie data or fallback to mock data
  const videoData = movieData ? {
    id: movieData._id,
    title: movieData.Title || 'Untitled',
    thumbnail: movieData.Thumbnail || movieData.Poster || 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200',
    duration: movieData.Videos?.[0]?.Duration ? formatDuration(movieData.Videos[0].Duration) : '0:00',
    views: formatViews(movieData.Views || 0),
    likes: movieData.Likes || 0,
    uploader: movieData.Channel?.Name || 'Unknown',
    uploaderSubscribers: '11.8K',
    tags: movieData.Tags || [],
    description: movieData.Description || '',
    videos: movieData.Videos || [],
    subtitles: movieData.Subtitles || [],
    category: movieData.Category,
    subCategory: movieData.SubCategory,
    cast: movieData.Cast || [],
    comments: movieData.topComments || [],
    isPremium: movieData.IsPremium || false,
    rating: movieData.Rating || 0,
    isFavorite: movieData.isFavorite || false,
    isLiked: movieData.isLiked || false,
    watchHistory: movieData.watchHistory,
  } : {
    id: 1,
    title: 'Loading...',
    thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200',
    duration: '0:00',
    views: '0',
    likes: 0,
    uploader: 'Loading...',
    uploaderSubscribers: '0',
    tags: [],
    description: '',
    videos: [],
    subtitles: [],
    category: null,
    subCategory: null,
    cast: [],
    comments: [],
    isPremium: false,
    rating: 0,
    isFavorite: false,
    isLiked: false,
    watchHistory: null,
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#1a1a1a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#1a1a1a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Link href="/">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', width: '100%' }}>
      <Header />

      {/* Promotional Banner */}
      {showPromoBanner && (
        <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 py-4 relative overflow-hidden border-b border-purple-800/50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}></div>
          </div>
          <div className="container mx-auto px-8 flex flex-row items-center justify-center gap-4 text-left relative z-10 max-w-[1600px]">
            <span className="text-base font-semibold whitespace-nowrap text-yellow-300">WINTER MAGIC SALE ❄️ ⭐</span>
            <div className="flex items-center space-x-2">
              <span className="text-base text-white">December Deals Kickoff</span>
              <button className="text-gray-300 hover:text-white transition-colors" aria-label="More information">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <Button className="bg-[#f7000a] hover:bg-[#e60009] text-white text-base whitespace-nowrap rounded-md px-5 py-2.5 h-10 font-semibold shadow-lg">GET +14 MONTHS FREE</Button>
          </div>
          <button 
            onClick={() => setShowPromoBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1.5 z-20 rounded hover:bg-white/10 transition-colors"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-8 py-6 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Video Section */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              {currentVideoUrl ? (
                <video
                  src={currentVideoUrl}
                  className="w-full h-full"
                  controls
                  poster={videoData.thumbnail}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  {videoData.subtitles.map((subtitle: any, index: number) => (
                    <track
                      key={index}
                      kind="subtitles"
                      srcLang={subtitle.LanguageCode || 'en'}
                      label={subtitle.Language || 'English'}
                      src={subtitle.Url}
                      default={index === 0}
                    />
                  ))}
                </video>
              ) : (
                <>
                  <img
                    src={videoData.thumbnail}
                    alt={videoData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
                    >
                      <Play className="w-10 h-10 fill-white text-white ml-1" />
                    </button>
                  </div>
                </>
              )}
              
              {/* Quality Selector */}
              {videoData.videos && videoData.videos.length > 1 && (
                <div className="absolute top-4 right-4 z-20">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-black/80 border-gray-700 text-white hover:bg-black/90">
                        <Settings className="w-4 h-4 mr-2" />
                        {selectedQuality}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-gray-800">
                      {videoData.videos.map((video: any) => (
                        <DropdownMenuItem
                          key={video.Quality}
                          className={`text-white hover:bg-gray-800 cursor-pointer ${
                            selectedQuality === video.Quality ? 'bg-gray-800' : ''
                          }`}
                          onClick={() => setSelectedQuality(video.Quality)}
                        >
                          {video.Quality} {video.Duration && `(${formatDuration(video.Duration)})`}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Subtitles Indicator */}
              {videoData.subtitles && videoData.subtitles.length > 0 && (
                <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-xs">
                  Subtitles: {videoData.subtitles.map((s: any) => s.Language).join(', ')}
                </div>
              )}
            </div>

            {/* Video Title and Stats */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-3">{videoData.title}</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{videoData.views} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{formatViews(videoData.likes)} likes</span>
                  </div>
                  {videoData.rating > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-300">{videoData.rating.toFixed(1)}</span>
                    </div>
                  )}
                  {videoData.isPremium && (
                    <Badge className="bg-yellow-600 text-white">Premium</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`${videoData.isLiked ? 'text-orange-500' : 'text-gray-300'} hover:text-white`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`${videoData.isFavorite ? 'text-orange-500' : 'text-gray-300'} hover:text-white`}
                  >
                    <Bookmark className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Description */}
            {videoData.description && (
              <div className="mb-4 p-4 bg-[#0f0f0f] rounded-lg">
                <p className="text-gray-300 leading-relaxed">{videoData.description}</p>
              </div>
            )}

            {/* Creator Info and Tags */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4 flex-wrap">
                <Link href={`/channel/${videoData.uploader}`} className="text-orange-500 hover:text-orange-400 font-semibold">
                  {videoData.uploader}
                </Link>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Subscribe {videoData.uploaderSubscribers}
                </Button>
                {videoData.category && (
                  <Link href={`/category/${videoData.category.Slug}`} className="text-cyan-400 hover:text-cyan-300 text-sm">
                    {videoData.category.Name}
                  </Link>
                )}
                {videoData.subCategory && (
                  <Link href={`/category/${videoData.subCategory.Slug}`} className="text-cyan-400 hover:text-cyan-300 text-sm">
                    {videoData.subCategory.Name}
                  </Link>
                )}
                {videoData.tags.map((tag: string, index: number) => (
                  <Link
                    key={index}
                    href={`/?tag=${tag}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cast Section */}
            {videoData.cast && videoData.cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Cast</h3>
                <div className="flex flex-wrap gap-3">
                  {videoData.cast.map((actor: any) => (
                    <Link
                      key={actor._id}
                      href={`/actor/${actor.Slug}`}
                      className="flex items-center space-x-2 bg-[#0f0f0f] rounded-lg p-2 hover:bg-gray-800 transition-colors"
                    >
                      {actor.Image && (
                        <img
                          src={actor.Image}
                          alt={actor.Name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium">{actor.Name}</p>
                        {actor.Nationality && (
                          <p className="text-xs text-gray-400">{actor.Nationality}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Watch More Button */}
            <div className="mb-6">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-6">
                WATCH MORE
                <div className="text-xs font-normal mt-1">Click to watch more videos like this</div>
              </Button>
            </div>

            {/* Tabs for Related Videos */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="bg-[#0f0f0f] border-b border-gray-800">
                <TabsTrigger value="related" className="data-[state=active]:text-orange-500">
                  Related Videos
                </TabsTrigger>
                <TabsTrigger value="creator" className="data-[state=active]:text-orange-500">
                  From {videoData.uploader}
                </TabsTrigger>
                <TabsTrigger value="recommended" className="data-[state=active]:text-orange-500">
                  Recommended
                </TabsTrigger>
              </TabsList>

              <TabsContent value="related" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {moreVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group cursor-pointer block relative"
                    >
                      <Link
                        href={`/video/${video.id}`}
                        className="block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-2">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Play button overlay on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="w-14 h-14 bg-black/70 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                              <Play className="w-7 h-7 fill-white text-white ml-1" />
                            </div>
                          </div>

                          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold z-20">
                            {video.duration}
                          </div>
                          {video.is4K && (
                            <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold z-20">
                              4K
                            </div>
                          )}
                          {video.isLive && (
                            <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1 z-20">
                              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                              <span>Live</span>
                            </div>
                          )}

                          {/* Dark overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-[5]"></div>

                          {/* Three-dot menu button - appears on hover */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
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
                        <h3 className="text-sm font-medium mb-1 line-clamp-2 group-hover:text-orange-500">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>{video.uploader}</span>
                          <span>|</span>
                          <span>{video.views}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button variant="outline" className="bg-[#0f0f0f] border-gray-700 text-white hover:bg-gray-800">
                    Show more related videos
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="creator" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group cursor-pointer block relative"
                    >
                      <Link
                        href={`/video/${video.id}`}
                        className="block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-2">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Play button overlay on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="w-14 h-14 bg-black/70 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                              <Play className="w-7 h-7 fill-white text-white ml-1" />
                            </div>
                          </div>

                          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold z-20">
                            HD {video.duration}
                          </div>

                          {/* Dark overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-[5]"></div>

                          {/* Three-dot menu button - appears on hover */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
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
                        <h3 className="text-sm font-medium mb-1 line-clamp-2 group-hover:text-orange-500">
                          {video.title}
                        </h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {moreVideos.slice(0, 6).map((video) => (
                    <div
                      key={video.id}
                      className="group cursor-pointer block relative"
                    >
                      <Link
                        href={`/video/${video.id}`}
                        className="block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-2">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Play button overlay on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="w-14 h-14 bg-black/70 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                              <Play className="w-7 h-7 fill-white text-white ml-1" />
                            </div>
                          </div>

                          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold z-20">
                            {video.duration}
                          </div>

                          {/* Dark overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-[5]"></div>

                          {/* Three-dot menu button - appears on hover */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
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
                        <h3 className="text-sm font-medium mb-1 line-clamp-2 group-hover:text-orange-500">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>{video.uploader}</span>
                          <span>|</span>
                          <span>{video.views}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Comments Section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Comments ({videoData.comments.length})</h2>
              {videoData.comments && videoData.comments.length > 0 ? (
                <div className="space-y-4">
                  {videoData.comments.map((comment: any) => (
                    <div key={comment._id} className="flex space-x-3">
                      <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {comment.User?.ProfilePicture ? (
                          <img
                            src={comment.User.ProfilePicture}
                            alt={comment.User.Name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span>{comment.User?.Name?.charAt(0) || 'U'}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold">{comment.User?.Name || 'Anonymous'}</span>
                          <span className="text-xs text-gray-400">
                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Recently'}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">{comment.Comment}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-xs">{formatViews(comment.Likes || 0)}</span>
                          </button>
                          {comment.Replies && comment.Replies.length > 0 && (
                            <button className="text-gray-400 hover:text-white text-xs">
                              {comment.Replies.length} Replies
                            </button>
                          )}
                          <button className="text-gray-400 hover:text-white text-xs">
                            Reply
                          </button>
                        </div>
                        {/* Replies */}
                        {comment.Replies && comment.Replies.length > 0 && (
                          <div className="mt-3 ml-4 space-y-2 border-l-2 border-gray-800 pl-4">
                            {comment.Replies.map((reply: any, index: number) => (
                              <div key={index} className="flex space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs flex-shrink-0">
                                  {reply.User?.Name?.charAt(0) || 'R'}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-semibold text-sm">{reply.User?.Name || 'Anonymous'}</span>
                                  </div>
                                  <p className="text-gray-400 text-sm mb-1">{reply.Comment}</p>
                                  <div className="flex items-center space-x-3">
                                    <button className="flex items-center space-x-1 text-gray-500 hover:text-white text-xs">
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>{formatViews(reply.Likes || 0)}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}

              {/* Comments Pagination */}
              <div className="mt-6 flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm" className="bg-white text-black hover:bg-gray-200">
                  1
                </Button>
                <Button variant="outline" size="sm" className="bg-[#0f0f0f] border-gray-700 text-white hover:bg-gray-800">
                  2
                </Button>
                <Button variant="outline" size="sm" className="bg-[#0f0f0f] border-gray-700 text-white hover:bg-gray-800">
                  3
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Promotional Banner */}
            <div className="bg-[#0f0f0f] rounded-lg p-4 mb-6">
              <p className="text-white mb-3">
                <span className="font-semibold">W</span> Watch and download full length videos on{' '}
                <a href="#" className="text-orange-500 hover:text-orange-400 underline">
                  FapHouse.com
                </a>
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-[#1a1a1a] border-gray-700 text-white hover:bg-gray-800 cursor-pointer"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedVideos.slice(0, 6).map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer block relative"
                >
                  <Link
                    href={`/video/${video.id}`}
                    className="block"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-2">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Play button overlay on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="w-10 h-10 bg-black/70 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                          <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                        </div>
                      </div>

                      <div className="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-semibold z-20">
                        W
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-semibold z-20">
                        {video.isHD ? 'HD' : '4K'} {video.duration}
                      </div>

                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-[5]"></div>
                    </div>
                    <h3 className="text-xs font-medium line-clamp-2 group-hover:text-orange-500">
                      {video.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            {/* Creator Profile */}
            <div className="bg-[#0f0f0f] rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Maxxx Betancur</h3>
                  <p className="text-sm text-gray-400">52 videos</p>
                </div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Join now
              </Button>
            </div>

            {/* Related Videos Sidebar */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
              <div className="space-y-4">
                {relatedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex space-x-3 group cursor-pointer block relative"
                  >
                    <Link
                      href={`/video/${video.id}`}
                      className="flex space-x-3 w-full"
                    >
                      <div className="relative w-40 h-24 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Play button overlay on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          <div className="w-8 h-8 bg-black/70 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                          </div>
                        </div>

                        <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-xs font-semibold z-20">
                          HD {video.duration}
                        </div>

                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-[5]"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-orange-500 mb-1">
                          {video.title}
                        </h4>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
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
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] border-t border-gray-700 px-6 lg:px-8 py-3 z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-[1400px]">
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

