import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { CRUDTable, TableColumn } from '../../components/CRUDTable';
import { CRUDDialog, FormField } from '../../components/CRUDDialog';

interface Video {
  id: string;
  title: string;
  youtube_url: string;
  description?: string;
  thumbnail_url?: string;
  created_at?: string;
}

const columns: TableColumn[] = [
  {
    key: 'title',
    label: 'Title',
    sortable: true,
  },
  {
    key: 'description',
    label: 'Description',
    sortable: false,
    render: (value) => (
      <span className="line-clamp-2 text-gray-600">{value || '-'}</span>
    ),
  },
  {
    key: 'youtube_url',
    label: 'YouTube URL',
    render: (value) => (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline truncate block"
      >
        {value.substring(0, 40)}...
      </a>
    ),
  },
];

const formFields: FormField[] = [
  {
    name: 'title',
    label: 'Video Title',
    type: 'text',
    placeholder: 'Enter video title',
    required: true,
  },
  {
    name: 'youtube_url',
    label: 'YouTube URL',
    type: 'url',
    placeholder: 'https://www.youtube.com/watch?v=...',
    required: true,
    help: 'Supports YouTube links in formats: youtube.com/watch?v=... or youtu.be/...',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter video description (optional)',
    rows: 4,
  },
  {
    name: 'thumbnail_url',
    label: 'Custom Thumbnail URL',
    type: 'url',
    placeholder: 'https://... (optional - auto-generated if left empty)',
    help: 'Leave empty to use YouTube default thumbnail',
  },
];

export default function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

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

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error loading videos:', error);
      alert('Error loading videos');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingVideo(null);
    setFormData({
      title: '',
      youtube_url: '',
      description: '',
      thumbnail_url: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      youtube_url: video.youtube_url,
      description: video.description || '',
      thumbnail_url: video.thumbnail_url || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (video: Video) => {
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', video.id);

      if (error) throw error;
      loadVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (editingVideo) {
        const { error } = await supabase
          .from('videos')
          .update(data)
          .eq('id', editingVideo.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('videos').insert([data]);
        if (error) throw error;
      }

      loadVideos();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminLayout title="Video Gallery">
      <CRUDTable<Video>
        title="Videos"
        data={videos}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonLabel="Add Video"
        emptyMessage="No videos yet. Upload your first video!"
      />

      <CRUDDialog
        isOpen={isDialogOpen}
        title={editingVideo ? 'Edit Video' : 'Add New Video'}
        fields={formFields}
        data={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        submitButtonLabel={editingVideo ? 'Update Video' : 'Add Video'}
      />
    </AdminLayout>
  );
}
