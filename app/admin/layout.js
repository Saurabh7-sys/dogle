import "../admin.css";
import AdminNavbar from "../components/AdminNavbar";

export const metadata = {
  title: "Dogle Admin Dashboard",
  description: "Manage Dogle website content",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <AdminNavbar />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}
