import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabase/client';
import { Plus, Edit, Trash2, X, Upload, Link as LinkIcon } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/table';

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

export default function ServicesManager() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadMode, setUploadMode] = useState<'link' | 'file'>('link');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    image: '',
    icon: '',
    category: '',
    active: true,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading services:', error);
        setMessage('Error loading services');
        return;
      }

      setServices(data || []);
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error loading services');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      icon: '',
      category: '',
      active: true,
    });
    setEditingId(null);
    setUploadMode('link');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      setMessage('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        setMessage('Service updated successfully!');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([formData]);

        if (error) throw error;
        setMessage('Service created successfully!');
      }

      setTimeout(() => {
        setMessage('');
        resetForm();
        setShowForm(false);
        loadServices();
      }, 1500);
    } catch (err) {
      setMessage(`Error saving service: ${(err as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessage('Service deleted successfully!');
      setTimeout(() => {
        setMessage('');
        loadServices();
      }, 1500);
    } catch (err) {
      setMessage(`Error deleting service: ${(err as Error).message}`);
    }
  };

  const handleEdit = (service: Service) => {
    setFormData(service);
    setEditingId(service.id);
    setShowForm(true);
    setUploadMode('link');
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `service_${Date.now()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: data.publicUrl });
      setMessage('Image uploaded successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setMessage(`Error uploading image: ${(err as Error).message}`);
    }
  };

  return (
    <AdminLayout title="Services Management">
      {message && (
        <div className={`mb-6 p-4 rounded-lg border flex items-center gap-2 ${
          message.includes('Error') 
            ? 'bg-red-50 border-red-200 text-red-700' 
            : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <div className="flex-1">{message}</div>
        </div>
      )}

      {!showForm ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">All Services</h2>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Service
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No services yet. Click "Add Service" to create one.</p>
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        {service.icon ? (
                          <span className="text-2xl">{service.icon}</span>
                        ) : (
                          <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-muted-foreground">-</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{service.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          service.active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {service.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-2xl bg-card rounded-lg shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h2>
            <button
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="text-muted-foreground hover:text-foreground transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Service Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background text-foreground"
                placeholder="e.g., General Consultation"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background text-foreground resize-none"
                placeholder="Detailed description of the service..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category *
              </label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background text-foreground"
                placeholder="e.g., Cardiology"
              />
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Icon (Emoji or Single Character)
              </label>
              <input
                type="text"
                maxLength={2}
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background text-foreground text-2xl"
                placeholder="❤️ or ⚕️"
              />
              <p className="text-xs text-muted-foreground mt-1">Optional: Add an emoji to represent this service</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Service Image
              </label>
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadMode('link')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                    uploadMode === 'link'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-input text-foreground hover:border-primary'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  Image Link
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                    uploadMode === 'file'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-input text-foreground hover:border-primary'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload File
                </button>
              </div>

              {uploadMode === 'link' ? (
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background text-foreground"
                  placeholder="https://example.com/image.jpg"
                />
              ) : (
                <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              )}

              {formData.image && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Preview:</p>
                  <img
                    src={formData.image}
                    alt="Service preview"
                    className="max-h-48 rounded object-cover"
                  />
                </div>
              )}
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={formData.active || false}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="active" className="text-sm font-medium text-foreground cursor-pointer">
                Active
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition font-medium"
              >
                {submitting ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="flex-1 bg-muted text-foreground px-6 py-2 rounded-lg hover:opacity-90 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
