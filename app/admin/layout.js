import "../admin.css";
import AdminNavbar from "../components/AdminNavbar";
import NotificationToast from "../components/NotificationToast";
import ConfirmDialog from "../components/ConfirmDialog";

export const metadata = {
  title: "BM Pet care Admin Dashboard",
  description: "Manage BM Pet care website content",
};

export default function AdminLayout({ children }) {
  return (
    <div id="admin-root" className="min-h-screen flex flex-col font-sans admin-gradient-bg text-[var(--admin-text-primary)]">
      <AdminNavbar />
      <NotificationToast />
      <ConfirmDialog />
      <div className="flex-grow relative z-10">
        {children}
      </div>
    </div>
  );
}
