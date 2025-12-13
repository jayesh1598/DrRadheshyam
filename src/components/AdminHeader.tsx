import { useNavigate } from 'react-router';
import { supabase } from '../utils/supabase/client';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error.message);
      setLoading(false);
      return;
    }

    // ✅ Supabase session cleared properly
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </header>
  );
}
