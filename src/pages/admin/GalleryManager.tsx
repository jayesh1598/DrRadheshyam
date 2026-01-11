import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { CRUDTable, TableColumn } from '../../components/CRUDTable';
import { CRUDDialog, FormField } from '../../components/CRUDDialog';

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
}

const columns: TableColumn[] = [
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
        alt="Gallery"
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
    label: 'Image Description',
    type: 'text',
    placeholder: 'Describe this image',
    required: true,
  },
  {
    name: 'image_url',
    label: 'Upload Gallery Image',
    type: 'image-upload',
    required: true,
    uploadPath: 'gallery',
  },
];

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
      alert('Error loading gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingImage(null);
    setFormData({
      image_url: '',
      alt_text: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData(image);
    setIsDialogOpen(true);
  };

  const handleDelete = async (image: GalleryImage) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id);

      if (error) throw error;
      loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (editingImage) {
        const { error } = await supabase
          .from('gallery_images')
          .update(data)
          .eq('id', editingImage.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('gallery_images').insert([data]);
        if (error) throw error;
      }

      loadImages();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminLayout title="Gallery Management">
      <CRUDTable<GalleryImage>
        title="Gallery Images"
        data={images}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonLabel="Add Gallery Image"
        emptyMessage="No gallery images yet. Upload your first image!"
      />

      <CRUDDialog
        isOpen={isDialogOpen}
        title={editingImage ? 'Edit Gallery Image' : 'Add Gallery Image'}
        fields={formFields}
        data={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        submitButtonLabel={editingImage ? 'Update Image' : 'Add Image'}
      />
    </AdminLayout>
  );
}
