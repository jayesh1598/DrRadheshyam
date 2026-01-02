import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Play } from 'lucide-react';
import { supabase } from '../utils/supabase/client';

interface Video {
  id: string;
  title: string;
  youtube_url: string;
  description?: string;
  thumbnail_url?: string;
}

const defaultVideos: Video[] = [];

function extractYoutubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    } else if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.slice(1);
    }
  } catch {
    return null;
  }
  return null;
}

function getYoutubeThumbnail(url: string): string {
  const videoId = extractYoutubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return 'https://via.placeholder.com/320x180?text=Video';
}

function getYoutubeEmbedUrl(url: string): string | null {
  const videoId = extractYoutubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}

export default function VideoGallery() {
  const [videos, setVideos] = useState<Video[]>(defaultVideos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          const errorMsg = error.message || JSON.stringify(error);
          console.error('Error loading videos:', errorMsg);
          setError(`Failed to load videos: ${errorMsg}`);
          return;
        }

        if (data && data.length > 0) {
          setVideos(data);
        }
        setError(null);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error('Error:', errorMsg);
        setError(`An unexpected error occurred: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-center text-3xl sm:text-4xl font-bold">Video Gallery</h1>
          </div>
          <p className="text-center text-blue-100 text-lg">Watch our latest videos and updates</p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <p className="text-center py-12 text-gray-600">Loading videos...</p>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            <p className="font-semibold">Unable to load videos</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : videos.length === 0 ? (
          <p className="text-center py-12 text-gray-600 text-lg">No videos available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  <img
                    src={video.thumbnail_url || getYoutubeThumbnail(video.youtube_url)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-blue-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
            <div className="aspect-video">
              {getYoutubeEmbedUrl(selectedVideo.youtube_url) ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={getYoutubeEmbedUrl(selectedVideo.youtube_url) || ''}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center text-white">
                  <p>Invalid video URL</p>
                </div>
              )}
            </div>
            <div className="mt-4 bg-gray-900 p-4 rounded-lg">
              <h2 className="text-white text-xl font-bold mb-2">{selectedVideo.title}</h2>
              {selectedVideo.description && (
                <p className="text-gray-300">{selectedVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
