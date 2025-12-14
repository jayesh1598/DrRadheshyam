import { Menu, LogOut, User } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function AdminTopbar({ title }: { title: string }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center"
        >
          <User size={18} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded shadow">
            <button
              onClick={logout}
              className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
