import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { CRUDTable, TableColumn } from '../../components/CRUDTable';
import { CRUDDialog, FormField } from '../../components/CRUDDialog';

interface BannerSlide {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}

const columns: TableColumn[] = [
  {
    key: 'display_order',
    label: 'Order',
    sortable: true,
  },
  {
    key: 'alt_text',
    label: 'Description',
    sortable: true,
  },
  {
    key: 'image_url',
    label: 'Image',
    render: (value) => (
      <img
        src={value}
        alt="Banner"
        className="h-10 w-16 object-cover rounded"
        onError={(e) => {
          e.currentTarget.src =
            'https://via.placeholder.com/64x40?text=No+Image';
        }}
      />
    ),
  },
];

const formFields: FormField[] = [
  {
    name: 'alt_text',
    label: 'Banner Description',
    type: 'text',
    placeholder: 'Describe this banner',
    required: true,
  },
  {
    name: 'image_url',
    label: 'Upload Banner Image',
    type: 'image-upload',
    required: true,
    uploadPath: 'banners',
  },
  {
    name: 'display_order',
    label: 'Display Order',
    type: 'number',
    help: 'Lower numbers appear first',
  },
];

export default function BannersManager() {
  const [banners, setBanners] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerSlide | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('banner_slides')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error('Error loading banners:', error);
      alert('Error loading banners');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingBanner(null);
    setFormData({
      image_url: '',
      alt_text: '',
      display_order: banners.length,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (banner: BannerSlide) => {
    setEditingBanner(banner);
    setFormData(banner);
    setIsDialogOpen(true);
  };

  const handleDelete = async (banner: BannerSlide) => {
    try {
      const { error } = await supabase
        .from('banner_slides')
        .delete()
        .eq('id', banner.id);

      if (error) throw error;
      loadBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Error deleting banner');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (editingBanner) {
        const { error } = await supabase
          .from('banner_slides')
          .update(data)
          .eq('id', editingBanner.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('banner_slides').insert([data]);
        if (error) throw error;
      }

      loadBanners();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminLayout title="Banner Slides">
      <CRUDTable<BannerSlide>
        title="Banner Slides"
        data={banners}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonLabel="Add Banner Slide"
        emptyMessage="No banner slides yet. Create your first banner!"
      />

      <CRUDDialog
        isOpen={isDialogOpen}
        title={editingBanner ? 'Edit Banner Slide' : 'Add New Banner Slide'}
        fields={formFields}
        data={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        submitButtonLabel={editingBanner ? 'Update Banner' : 'Add Banner'}
      />
    </AdminLayout>
  );
}
