import { useLocation, Link } from 'react-router';

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link to="/admin/dashboard">Admin</Link>
      {paths.slice(1).map((p, i) => (
        <span key={i}> / {p.replace('-', ' ')}</span>
      ))}
    </nav>
  );
}
