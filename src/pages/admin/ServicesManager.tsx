import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { CRUDTable, TableColumn } from '../../components/CRUDTable';
import { CRUDDialog, FormField } from '../../components/CRUDDialog';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  category: string;
  active: boolean;
  created_at: string;
}

const columns: TableColumn[] = [
  {
    key: 'title',
    label: 'Title',
    sortable: true,
  },
  {
    key: 'category',
    label: 'Category',
    sortable: true,
  },
  {
    key: 'active',
    label: 'Status',
    render: (value) => (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
        value
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {value ? 'Active' : 'Inactive'}
      </span>
    ),
  },
];

const formFields: FormField[] = [
  {
    name: 'title',
    label: 'Service Title',
    type: 'text',
    placeholder: 'e.g., Consulting',
    required: true,
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    placeholder: 'e.g., Business, Education',
    required: true,
  },
  {
    name: 'icon',
    label: 'Icon Name (Lucide)',
    type: 'text',
    placeholder: 'e.g., Briefcase',
    help: 'Use lucide-react icon names',
  },
  {
    name: 'image',
    label: 'Image URL',
    type: 'url',
    placeholder: 'https://example.com/image.jpg',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Describe this service',
    rows: 5,
    required: true,
  },
];

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
      alert('Error loading services');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      icon: '',
      category: '',
      active: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setIsDialogOpen(true);
  };

  const handleDelete = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', service.id);

      if (error) throw error;
      loadServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(data)
          .eq('id', editingService.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert([data]);
        if (error) throw error;
      }

      loadServices();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminLayout title="Services">
      <CRUDTable<Service>
        title="Services"
        data={services}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonLabel="Add Service"
        emptyMessage="No services yet. Create your first service!"
      />

      <CRUDDialog
        isOpen={isDialogOpen}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        fields={formFields}
        data={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        submitButtonLabel={editingService ? 'Update Service' : 'Add Service'}
      />
    </AdminLayout>
  );
}
