import MaterialPageContent from '../components/MaterialPageContent';
import { useEffect } from 'react';
import { useLegacyScript } from '../hooks/useLegacyScript';
import '../styles/material.css';

export default function MaterialPage() {
  useLegacyScript('/legacy/materialPageApp.js');

  useEffect(() => {
    document.documentElement.classList.add('dark-mode');
    return () => document.documentElement.classList.remove('dark-mode');
  }, []);

  return <MaterialPageContent />;
}
