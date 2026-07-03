import { useRef } from 'react';

const FILTER_TABS = [
  { tag: 'all', label: 'All' },
  { tag: 'trendy', label: 'Trendy Materials' },
  { tag: 'natural', label: 'Natural Finishes' },
  { tag: 'finishes', label: 'Room Finishes' },
  { tag: 'civil', label: 'Civil Materials' },
  { tag: 'carpentry', label: 'Carpentry Materials' },
  { tag: 'furniture', label: 'Furniture' },
  { tag: 'electrical', label: 'Electrical Materials' },
  { tag: 'paint', label: 'Colour Combinations' },
  { tag: 'kitchen', label: 'Kitchen' },
  { tag: 'bathroom', label: 'Bathroom' },
];

export default function Header({ searchRef }) {
  return (
    <header className="lmd-header">
      <div className="header-search">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={searchRef}
          type="text"
          id="searchInput"
          placeholder="Search materials, brands, finishes…"
          onInput={(e) => window.handleSearch?.(e.target.value)}
        />
      </div>
      <button id="darkModeToggle" className="dark-mode-btn" aria-label="Toggle Dark Mode" type="button">
        🌙
      </button>
    </header>
  );
}

export function HeroBanner() {
  return (
    <div className="hero-banner" id="heroBanner">
      <h1 className="hero-h1">
        Interior Designer&apos;s<br />
        <em>Material Library</em>
      </h1>
      <p className="hero-sub">
        A complete curated reference of every finish, material, specification and brand – the exact
        resource professional designers use with clients.
      </p>
      <div className="hero-pills">
        <span className="hero-pill">₹ 37 Categories</span>
        <span className="hero-pill">₹ 200+ Materials</span>
        <span className="hero-pill">₹ Price Ranges</span>
        <span className="hero-pill">₹ Brand Recommendations</span>
      </div>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num count-up" data-target="37">
            37
          </div>
          <div className="hero-stat-label">Categories</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num count-up" data-target="200">
            200+
          </div>
          <div className="hero-stat-label">Materials</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num count-up" data-target="100">
            100+
          </div>
          <div className="hero-stat-label">Brands</div>
        </div>
      </div>
    </div>
  );
}

export function FilterTabs() {
  return (
    <div className="filter-tabs" id="filterTabs">
      {FILTER_TABS.map((tab, i) => (
        <button
          key={tab.tag}
          type="button"
          className={`tab-btn${i === 0 ? ' active' : ''}`}
          onClick={(e) => window.filterCats?.(tab.tag, e.currentTarget)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function MainContent() {
  return (
    <div className="main-wrap">
      <div id="homeView">
        <div className="sec-head">
          <span className="sec-title">Browse by Category</span>
          <span className="sec-count" id="catCount">
            44 categories
          </span>
        </div>
        <div className="cat-grid" id="catGrid" />
      </div>

      <div id="detailView" style={{ display: 'none' }}>
        <button type="button" className="back-btn" onClick={() => window.goHome?.()}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All categories
        </button>
        <div id="detailContent" className="material-section" />
      </div>

      <div id="searchView" style={{ display: 'none' }}>
        <div className="sec-head">
          <span className="sec-title">Search Results</span>
          <span className="sec-count" id="searchMeta" />
        </div>
        <div id="searchContent" />
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="lmd-footer">
        <p>
          – 2025 <a href="https://littlemsdesigner.com">Little Ms Designer</a> – Interior Designer&apos;s Material Library –
          Prices are indicative and subject to market variation.
        </p>
      </footer>

      <footer className="dev-footer">
        <div className="dev-footer-inner">
          <p className="dev-label">Developed By</p>
          <p className="dev-name">Navneet V</p>
          <div className="dev-links">
            <a href="https://wa.me/919322962133" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <span className="dev-divider" />
            <a href="https://x.com/NAVNEET_CODES" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export function Lightbox() {
  return (
    <div id="lmd-lb" onClick={() => window.lbClose?.()} role="presentation">
      <button id="lmd-lb-x" type="button" onClick={() => window.lbClose?.()}>
        &#x2715;
      </button>
      <img id="lmd-lb-img" src="" alt="" />
      <div id="lmd-lb-cap" />
    </div>
  );
}

export function useHomeSearchRef() {
  return useRef(null);
}
