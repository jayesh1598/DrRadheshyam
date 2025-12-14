import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabase/client';
import { Plus, Edit2, Trash2, Check } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

interface OverviewItem {
  id: string;
  title: string;
  description: string;
  display_order: number;
  created_at?: string;
}

export default function OverviewManager() {
  const navigate = useNavigate();
  const [items, setItems] = useState<OverviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    display_order: 0,
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('overview_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error loading overview items:', error);
        return;
      }

      setItems(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage('Please fill in all fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('overview_items')
          .update({
            title: formData.title,
            description: formData.description,
            display_order: formData.display_order,
          })
          .eq('id', editingId);

        if (error) throw error;
        setMessage('Overview item updated successfully!');
      } else {
        const { error } = await supabase
          .from('overview_items')
          .insert([
            {
              title: formData.title,
              description: formData.description,
              display_order: items.length + 1,
            },
          ]);

        if (error) throw error;
        setMessage('Overview item added successfully!');
      }

      setTimeout(() => setMessage(''), 3000);
      setFormData({ title: '', description: '', display_order: 0 });
      setEditingId(null);
      setShowForm(false);
      loadItems();
    } catch (err) {
      setMessage(`Error: ${(err as Error).message}`);
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: OverviewItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      display_order: item.display_order,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('overview_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessage('Overview item deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
      loadItems();
    } catch (err) {
      setMessage(`Error deleting: ${(err as Error).message}`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', description: '', display_order: 0 });
  };

  return (
    <AdminLayout title="Overview Management">
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg border flex items-center gap-2 ${
            message.includes('Error')
              ? 'bg-destructive/10 border-destructive text-destructive'
              : 'bg-green-50 border-green-200 text-green-700'
          }`}
        >
          <Check className="w-5 h-5" />
          {message}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading overview items...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? 'Edit Overview Item' : 'Add Overview Item'}</CardTitle>
                <CardDescription>
                  {editingId ? 'Update the overview item details' : 'Create a new overview item for the "At a Glance" section'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                      placeholder="e.g., Education, Experience, Recognition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none resize-none"
                      placeholder="Enter a brief description for this overview item"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Item'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2"
              disabled={showForm}
            >
              <Plus className="w-4 h-4" />
              Add Overview Item
            </Button>
          </div>

          {items.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No overview items yet. Create your first one!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Order: {item.display_order}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          onClick={() => handleEdit(item)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
