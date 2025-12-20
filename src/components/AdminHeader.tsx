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
  
  );
}
