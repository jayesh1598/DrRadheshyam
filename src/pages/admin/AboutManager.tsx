import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabase/client';
import { Save, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

interface AboutContent {
  id: string;
  section: string;
  content: string;
}

export default function AboutManager() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('section', { ascending: true });

      if (error) {
        console.error('Error loading content:', error);
        return;
      }

      setSections(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (section: string, content: string) => {
    try {
      const existing = sections.find((s) => s.section === section);

      if (existing) {
        const { error } = await supabase
          .from('about_content')
          .update({ content })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_content')
          .insert([{ section, content }]);

        if (error) throw error;
      }

      setSections((prev) =>
        prev
          .map((s) => (s.section === section ? { ...s, content } : s))
          .concat(
            prev.some((s) => s.section === section)
              ? []
              : [{ id: Date.now().toString(), section, content }]
          )
      );
    } catch (err) {
      alert('Error saving content: ' + (err as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section? This cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('about_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadContent();
    } catch (err) {
      alert('Error deleting content: ' + (err as Error).message);
    }
  };

  return (
    <AdminLayout title="About Content Management">
      {loading ? (
        <p className="text-center py-8">Loading content...</p>
      ) : (
        <div className="space-y-8">
            <AboutSection
              section="Overview"
              id={sections.find((s) => s.section === 'Overview')?.id}
              defaultContent={sections.find((s) => s.section === 'Overview')?.content || ''}
              onUpdate={(content) => handleUpdate('Overview', content)}
              onDelete={handleDelete}
              onEditChange={setEditing}
            />
            <AboutSection
              section="Mission"
              id={sections.find((s) => s.section === 'Mission')?.id}
              defaultContent={sections.find((s) => s.section === 'Mission')?.content || ''}
              onUpdate={(content) => handleUpdate('Mission', content)}
              onDelete={handleDelete}
              onEditChange={setEditing}
            />
            <AboutSection
              section="Achievements"
              id={sections.find((s) => s.section === 'Achievements')?.id}
              defaultContent={sections.find((s) => s.section === 'Achievements')?.content || ''}
              onUpdate={(content) => handleUpdate('Achievements', content)}
              onDelete={handleDelete}
              onEditChange={setEditing}
            />
            <AboutSection
              section="Biography"
              id={sections.find((s) => s.section === 'Biography')?.id}
              defaultContent={sections.find((s) => s.section === 'Biography')?.content || ''}
              onUpdate={(content) => handleUpdate('Biography', content)}
              onDelete={handleDelete}
              onEditChange={setEditing}
            />
        </div>
      )}
    </AdminLayout>
  );
}

interface AboutSectionProps {
  section: string;
  id?: string;
  defaultContent: string;
  onUpdate: (content: string) => void;
  onDelete: (id: string) => void;
  onEditChange: (editing: boolean) => void;
}

function AboutSection({ section, id, defaultContent, onUpdate, onDelete, onEditChange }: AboutSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultContent);

  const handleSave = async () => {
    await onUpdate(content);
    setIsEditing(false);
    onEditChange(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    onEditChange(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{section}</h2>
        {id && !isEditing && (
          <button
            onClick={() => onDelete(id)}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
            title="Delete this section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            rows={10}
            placeholder={`Enter ${section} content here...`}
          />
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setContent(defaultContent);
                onEditChange(false);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="prose max-w-none mb-4">
            <p className="text-gray-700 whitespace-pre-wrap">{content || 'No content yet'}</p>
          </div>
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
