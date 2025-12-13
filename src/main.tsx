
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AdminGuard from './components/AdminGuard';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
createRoot(document.getElementById("root")!).render(<App />);

<Routes>
  <Route path="/admin/login" element={<AdminLogin />} />

  <Route
    path="/admin/dashboard"
    element={
      <AdminGuard>
        <AdminDashboard />
      </AdminGuard>
    }
  />
</Routes>;
