import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabase/client';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

interface BannerSlide {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}

export default function BannersManager() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BannerSlide>>({
    image_url: '',
    alt_text: '',
    display_order: 0,
  });

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('banner_slides')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error loading banners:', error);
        return;
      }

      setBanners(data || []);
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
          .from('banner_slides')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('banner_slides')
          .insert([formData]);

        if (error) throw error;
      }

      setFormData({ image_url: '', alt_text: '', display_order: 0 });
      setEditingId(null);
      setShowForm(false);
      loadBanners();
    } catch (err) {
      alert('Error saving banner: ' + (err as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const { error } = await supabase
        .from('banner_slides')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadBanners();
    } catch (err) {
      alert('Error deleting banner: ' + (err as Error).message);
    }
  };

  const handleEdit = (banner: BannerSlide) => {
    setFormData(banner);
    setEditingId(banner.id);
    setShowForm(true);
  };

  return (
    <AdminLayout title="Banner Slides Management">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({ image_url: '', alt_text: '', display_order: banners.length });
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Add Banner Slide
        </button>
      </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Banner Slide' : 'Add New Banner Slide'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="https://example.com/banner.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order || 0}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text *
                </label>
                <input
                  type="text"
                  value={formData.alt_text || ''}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Description of the banner"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  {editingId ? 'Update Banner' : 'Add Banner'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-center py-8">Loading banners...</p>
        ) : (
          <div className="space-y-4">
            {banners.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No banners yet</p>
            ) : (
              banners.map((banner) => (
                <div key={banner.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <img
                        src={banner.image_url}
                        alt={banner.alt_text}
                        className="w-full max-w-xs h-32 object-cover rounded mb-4"
                      />
                      <p className="text-gray-700">{banner.alt_text}</p>
                      <p className="text-sm text-gray-600 mt-2">Order: {banner.display_order}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
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
