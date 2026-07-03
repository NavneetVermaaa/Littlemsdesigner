import AdminPageContent from '../components/AdminPageContent';
import { useLegacyScript } from '../hooks/useLegacyScript';
import '../styles/admin.css';

export default function AdminPage() {
  useLegacyScript('/legacy/adminApp.js', 'initAdmin');

  return <AdminPageContent />;
}
