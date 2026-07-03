import CmsViewerPageContent from '../components/CmsViewerPageContent';
import { useLegacyScripts } from '../hooks/useLegacyScript';
import '../styles/cms-viewer.css';

export default function CmsViewerPage() {
  useLegacyScripts(['/legacy/cms-renderer.js', '/legacy/cmsViewerApp.js'], 'initCmsViewer');

  return <CmsViewerPageContent />;
}
