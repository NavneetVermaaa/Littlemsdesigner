import Header, {
  FilterTabs,
  HeroBanner,
  Lightbox,
  MainContent,
  SiteFooter,
} from '../components/HomeLayout';
import { useLegacyScript } from '../hooks/useLegacyScript';
import '../styles/home.css';

export default function HomePage() {
  useLegacyScript('/legacy/materialLibraryApp.js', 'initMaterialLibrary');

  return (
    <>
      <Header />
      <HeroBanner />
      <FilterTabs />
      <MainContent />
      <SiteFooter />
      <Lightbox />
    </>
  );
}
