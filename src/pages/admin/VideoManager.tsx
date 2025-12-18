import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

interface Video {
  id: string;
  title: string;
  youtube_url: string;
  description?: string;
  thumbnail_url?: string;
  created_at?: string;
}

export default function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Video, 'id' | 'created_at'>>({
    title: '',
    youtube_url: '',
    description: '',
    thumbnail_url: '',
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading videos:', error);
        alert('Failed to load videos');
        return;
      }

      setVideos(data || []);
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while loading videos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      title: '',
      youtube_url: '',
      description: '',
      thumbnail_url: '',
    });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (video: Video) => {
    setFormData({
      title: video.title,
      youtube_url: video.youtube_url,
      description: video.description || '',
      thumbnail_url: video.thumbnail_url || '',
    });
    setEditingId(video.id);
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.youtube_url.trim()) {
      alert('Please fill in title and YouTube URL');
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('videos')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        alert('Video updated successfully');
      } else {
        const { error } = await supabase
          .from('videos')
          .insert([formData]);

        if (error) throw error;
        alert('Video added successfully');
      }

      setIsFormOpen(false);
      loadVideos();
    } catch (err) {
      console.error('Error saving video:', err);
      alert('Failed to save video');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Video deleted successfully');
      loadVideos();
    } catch (err) {
      console.error('Error deleting video:', err);
      alert('Failed to delete video');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Video Gallery Management</h1>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Video
          </button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                {editingId ? 'Edit Video' : 'Add New Video'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter video title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supports YouTube links in formats: youtube.com/watch?v=... or youtu.be/...
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    placeholder="Enter video description (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://... (optional - auto-generated if left empty)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use YouTube's default thumbnail
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Update Video' : 'Add Video'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Videos Table */}
        {loading ? (
          <p className="text-center py-8 text-gray-600">Loading videos...</p>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No videos added yet</p>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Your First Video
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    YouTube URL
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr
                    key={video.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">
                      {video.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {video.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {video.youtube_url.substring(0, 40)}...
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(video)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit video"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete video"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
