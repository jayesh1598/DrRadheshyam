import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '../utils/supabase/client';

export default function AdminGuard({
  children,
}: {
  children: JSX.Element;
}) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Get existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Checking session...</div>;
  }

  return session ? children : <Navigate to="/admin/login" replace />;
}
