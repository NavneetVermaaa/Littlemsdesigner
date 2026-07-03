export default function CmsViewerPageContent() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<header class="lmd-header">
        <h1>CMS Content Viewer</h1>
    </header>
    <div class="main-wrap">
        <div class="nav-bar" id="navBar"></div>
        <div id="homeView">
            <div id="contentArea"></div>
        </div>
        <div id="detailView" style="display:none;">
            <button class="back-btn" onclick="goHome()">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                All content
            </button>
            <div id="detailContent" class="material-section"></div>
        </div>
    </div>` }} />
  );
}
