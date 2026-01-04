import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { CRUDTable, TableColumn } from '../../components/CRUDTable';
import { CRUDDialog, FormField } from '../../components/CRUDDialog';

interface AboutContent {
  id: string;
  section: string;
  content: string;
}

const columns: TableColumn[] = [
  {
    key: 'section',
    label: 'Section',
    sortable: true,
  },
  {
    key: 'content',
    label: 'Content',
    render: (value) => (
      <span className="line-clamp-2 text-gray-600">{value}</span>
    ),
  },
];

const formFields: FormField[] = [
  {
    name: 'section',
    label: 'Section Name',
    type: 'text',
    placeholder: 'e.g., Biography, Mission, Vision',
    required: true,
  },
  {
    name: 'content',
    label: 'Content',
    type: 'textarea',
    placeholder: 'Write the content for this section',
    rows: 8,
    required: true,
  },
];

export default function AboutManager() {
  const [sections, setSections] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<AboutContent | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('section', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error loading content:', error);
      alert('Error loading about content');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSection(null);
    setFormData({
      section: '',
      content: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (section: AboutContent) => {
    setEditingSection(section);
    setFormData(section);
    setIsDialogOpen(true);
  };

  const handleDelete = async (section: AboutContent) => {
    try {
      const { error } = await supabase
        .from('about_content')
        .delete()
        .eq('id', section.id);

      if (error) throw error;
      loadContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Error deleting section');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (editingSection) {
        const { error } = await supabase
          .from('about_content')
          .update(data)
          .eq('id', editingSection.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('about_content').insert([data]);
        if (error) throw error;
      }

      loadContent();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminLayout title="About Content">
      <CRUDTable<AboutContent>
        title="About Sections"
        data={sections}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonLabel="Add Section"
        emptyMessage="No about sections yet. Create your first section!"
      />

      <CRUDDialog
        isOpen={isDialogOpen}
        title={editingSection ? 'Edit Section' : 'Add New Section'}
        fields={formFields}
        data={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        submitButtonLabel={editingSection ? 'Update Section' : 'Add Section'}
      />
    </AdminLayout>
  );
}
