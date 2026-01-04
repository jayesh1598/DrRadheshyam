import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { CRUDTable, TableColumn } from '../../components/CRUDTable';
import { CRUDDialog, FormField } from '../../components/CRUDDialog';

interface Certificate {
  id: string;
  title: string;
  date: string;
  institution: string;
  description: string;
  image_url: string;
}

const columns: TableColumn[] = [
  {
    key: 'title',
    label: 'Title',
    sortable: true,
  },
  {
    key: 'institution',
    label: 'Institution',
    sortable: true,
  },
  {
    key: 'date',
    label: 'Date',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: 'image_url',
    label: 'Image',
    render: (value) => (
      <img
        src={value}
        alt="Certificate"
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
    name: 'title',
    label: 'Certificate Title',
    type: 'text',
    placeholder: 'e.g., Honorary Doctorate Degree',
    required: true,
  },
  {
    name: 'date',
    label: 'Date Awarded',
    type: 'date',
    required: true,
  },
  {
    name: 'institution',
    label: 'Institution/Organization',
    type: 'text',
    placeholder: 'e.g., Dr. Babasaheb Ambedkar University',
    required: true,
  },
  {
    name: 'image_url',
    label: 'Certificate Image URL',
    type: 'url',
    placeholder: 'https://example.com/certificate.jpg',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Describe this certificate',
    rows: 4,
  },
];

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error loading certificates:', error);
      alert('Error loading certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCert(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      institution: '',
      description: '',
      image_url: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (cert: Certificate) => {
    setEditingCert(cert);
    setFormData(cert);
    setIsDialogOpen(true);
  };

  const handleDelete = async (cert: Certificate) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', cert.id);

      if (error) throw error;
      loadCertificates();
    } catch (error) {
      console.error('Error deleting certificate:', error);
      alert('Error deleting certificate');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (editingCert) {
        const { error } = await supabase
          .from('certificates')
          .update(data)
          .eq('id', editingCert.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('certificates').insert([data]);
        if (error) throw error;
      }

      loadCertificates();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminLayout title="Certificates">
      <CRUDTable<Certificate>
        title="Certificates"
        data={certificates}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonLabel="Add Certificate"
        emptyMessage="No certificates yet. Add your first certificate!"
      />

      <CRUDDialog
        isOpen={isDialogOpen}
        title={editingCert ? 'Edit Certificate' : 'Add New Certificate'}
        fields={formFields}
        data={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        submitButtonLabel={editingCert ? 'Update Certificate' : 'Add Certificate'}
      />
    </AdminLayout>
  );
}
