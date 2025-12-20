import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabase/client';
import { Plus, Trash2, Edit } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
}

export default function GalleryManager() {
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image_url: '',
    alt_text: '',
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading images:', error);
        return;
      }

      setImages(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_url || !formData.alt_text) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('gallery_images')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery_images')
          .insert([formData]);

        if (error) throw error;
      }

      setFormData({ image_url: '', alt_text: '' });
      setEditingId(null);
      setShowForm(false);
      loadImages();
    } catch (err) {
      alert('Error saving image: ' + (err as Error).message);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setFormData({
      image_url: image.image_url,
      alt_text: image.alt_text,
    });
    setEditingId(image.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadImages();
    } catch (err) {
      alert('Error deleting image: ' + (err as Error).message);
    }
  };

  return (
    <AdminLayout title="Gallery Management">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ image_url: '', alt_text: '' });
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Gallery Image' : 'Add Gallery Image'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text *
                </label>
                <input
                  type="text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Description of the image"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  {editingId ? 'Update Image' : 'Add Image'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ image_url: '', alt_text: '' });
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-center py-8">Loading images...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.length === 0 ? (
              <p className="text-center py-8 text-gray-500 col-span-full">No images yet</p>
            ) : (
              images.map((image) => (
                <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-700 line-clamp-2 mb-4">{image.alt_text}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(image)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
    </AdminLayout>
  );
}
