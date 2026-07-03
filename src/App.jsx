import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const MaterialPage = lazy(() => import('./pages/MaterialPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const CmsViewerPage = lazy(() => import('./pages/CmsViewerPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/material" element={<MaterialPage />} />
          <Route path="/material.html" element={<Navigate to="/material" replace />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin.html" element={<Navigate to="/admin" replace />} />
          <Route path="/cms-viewer" element={<CmsViewerPage />} />
          <Route path="/cms-viewer.html" element={<Navigate to="/cms-viewer" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
