import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { CRUDTable, TableColumn } from '../../components/CRUDTable';
import { CRUDDialog, FormField } from '../../components/CRUDDialog';
import { ToastContainer } from '../../components/Toast';
import { useToast } from '../../hooks/useToast';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  source: string;
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
    key: 'date',
    label: 'Date',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: 'source',
    label: 'Source',
    sortable: false,
  },
];

const formFields: FormField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'News article title',
    required: true,
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    required: true,
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    placeholder: 'e.g., Social Service, Education',
    required: true,
  },
  {
    name: 'source',
    label: 'Source',
    type: 'text',
    placeholder: 'e.g., Lokmat, Mumbai',
  },
  {
    name: 'image',
    label: 'Image URL',
    type: 'url',
    placeholder: 'https://example.com/image.jpg',
  },
  {
    name: 'excerpt',
    label: 'Excerpt',
    type: 'textarea',
    placeholder: 'Brief description of the article',
    rows: 4,
  },
];

export default function NewsManager() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { toasts, removeToast, success, error: showError } = useToast();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
      alert('Error loading articles');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      excerpt: '',
      image: '',
      source: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData(article);
    setIsDialogOpen(true);
  };

  const handleDelete = async (article: NewsArticle) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', article.id);

      if (error) throw error;
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Error deleting article');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (editingArticle) {
        const { error } = await supabase
          .from('news_articles')
          .update(data)
          .eq('id', editingArticle.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('news_articles').insert([data]);
        if (error) throw error;
      }

      loadArticles();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminLayout title="News Articles">
      <CRUDTable<NewsArticle>
        title="News Articles"
        data={articles}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonLabel="Add News Article"
        emptyMessage="No news articles yet. Create your first article!"
      />

      <CRUDDialog
        isOpen={isDialogOpen}
        title={editingArticle ? 'Edit News Article' : 'Add New News Article'}
        fields={formFields}
        data={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        submitButtonLabel={editingArticle ? 'Update Article' : 'Add Article'}
      />
    </AdminLayout>
  );
}
