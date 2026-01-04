import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { CRUDTable, TableColumn } from '../../components/CRUDTable';
import { CRUDDialog, FormField } from '../../components/CRUDDialog';

interface OverviewItem {
  id: string;
  title: string;
  description: string;
  display_order: number;
  created_at?: string;
}

const columns: TableColumn[] = [
  {
    key: 'display_order',
    label: 'Order',
    sortable: true,
  },
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
      <span className="line-clamp-2 text-gray-600">{value}</span>
    ),
  },
];

const formFields: FormField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'e.g., Education, Experience',
    required: true,
  },
  {
    name: 'display_order',
    label: 'Display Order',
    type: 'number',
    help: 'Lower numbers appear first',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Describe this overview item',
    rows: 5,
    required: true,
  },
];

export default function OverviewManager() {
  const [items, setItems] = useState<OverviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OverviewItem | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('overview_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading overview items:', error);
      alert('Error loading overview items');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      display_order: items.length,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: OverviewItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (item: OverviewItem) => {
    try {
      const { error } = await supabase
        .from('overview_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting overview item');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('overview_items')
          .update(data)
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('overview_items').insert([data]);
        if (error) throw error;
      }

      loadItems();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminLayout title="Overview Items">
      <CRUDTable<OverviewItem>
        title="Overview Items"
        data={items}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonLabel="Add Overview Item"
        emptyMessage="No overview items yet. Create your first item!"
      />

      <CRUDDialog
        isOpen={isDialogOpen}
        title={editingItem ? 'Edit Overview Item' : 'Add New Overview Item'}
        fields={formFields}
        data={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        submitButtonLabel={editingItem ? 'Update Item' : 'Add Item'}
      />
    </AdminLayout>
  );
}
