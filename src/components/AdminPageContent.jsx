export default function AdminPageContent() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div style="margin-bottom:32px">
    <h1>Template CMS</h1>
    <p class="sub">Create and manage structured content for every layout type on your site.</p>
</div>

<div class="tab-bar" id="tabBar">
    <button class="tab-btn active" data-tab="create" onclick="switchTab('create')">+ Create New</button>
    <button class="tab-btn" data-tab="manage" onclick="switchTab('manage')">Preview Cards</button>
    <button class="tab-btn" data-tab="sitecontent" onclick="switchTab('sitecontent')">Site Content</button>
    <button class="tab-btn" data-tab="export" onclick="switchTab('export')">Export / Import</button>
</div>

<!-- ============ TAB: CREATE ============ -->
<div id="tab-create" class="tab-content">
    <form id="contentForm" autocomplete="off">
        <div class="form-section">
            <div class="section-title">Choose Template</div>
            <select id="templateSelect" onchange="renderTemplateForm()">
                <option value="">— Select a template type —</option>
                <option value="category-grid">Category Grid (Eg. Browse by Category)</option>
                <option value="data-table">Data Table with Thumbnails (Eg. Flooring Finishes)</option>
                <option value="ranked-table">Premium Ranked Table (Eg. Materials That Look Expensive)</option>
                <option value="spec-card">Detail Specification Card (Eg. Venetian Plaster Finish)</option>
                <option value="spec-board">Premium Material Spec Board (Eg. Microcement)</option>
                <option value="comparison">Comparison Table (Eg. Marble vs Tiles)</option>
                <option value="furniture-list">Furniture Finish List (Eg. Wardrobe Finishes)</option>
                <option value="image-row">Image Row Grid (Eg. Marble Collections)</option>
                <option value="side-grid">Side-by-Side Grid (Eg. Side Table Finishes)</option>
                <option value="top10">Top 10 Materials (Eg. Top 10 Materials 2026)</option>
                <option value="split-cover">Split Cover Card (Eg. Marble vs Tiles Cover)</option>
                <option value="detail-card">Simple Detail Card (Eg. Admin Material Card)</option>
                <option value="detail-card-image">Enhanced Detail Card w/ Image (Eg. Material Feature Card)</option>
                <option value="merged-view">Merged Table + List View (Eg. Marble Guide)</option>
            </select>
        </div>

        <div class="form-section">
            <div class="section-title">Category Assignment</div>
            <div class="form-grid">
                <div>
                    <label>Category</label>
                    <select id="contentCategory">
                        <option value="">— Select a category —</option>
                        <option value="Trendy Materials">Trendy Materials</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Bathroom">Bathroom</option>
                        <option value="Flooring">Flooring</option>
                        <option value="Wall Finishes">Wall Finishes</option>
                        <option value="Outdoor &amp; Facade">Outdoor &amp; Facade</option>
                        <option value="Glass &amp; Mirror">Glass &amp; Mirror</option>
                        <option value="Laminates &amp; Veneer">Laminates &amp; Veneer</option>
                        <option value="Stone &amp; Quartz">Stone &amp; Quartz</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="form-section">
            <div class="section-title">Section Cover Image</div>
            <div class="form-grid">
                <div>
                    <label>Cover Image</label>
                    <input type="file" id="coverImageInput" accept="image/*" onchange="previewImg(this,'coverImagePreview')">
                    <img id="coverImagePreview" class="hidden" style="width:120px;height:120px;object-fit:cover;border-radius:10px;margin-top:8px;border:1px solid rgba(255,255,255,0.08)">
                </div>
            </div>
        </div>

        <div id="templateFormContainer"></div>

        <div id="formActions" class="hidden" style="margin-top:24px;display:flex;gap:12px">
            <button type="submit" class="btn btn-primary w-full">Save Content</button>
        </div>
    </form>
</div>

<!-- ============ TAB: MANAGE ============ -->
<div id="tab-manage" class="tab-content hidden">
    <div class="form-section">
        <div class="section-title">
            <span>Manage Content <span id="manageCount" style="font-size:14px;color:#64748b;font-weight:400"></span></span>
            <span style="display:flex;gap:8px;align-items:center">
                <select id="manageCategoryFilter" onchange="renderManage()" style="width:auto;padding:6px 10px;font-size:12px">
                    <option value="">All Categories</option>
                </select>
            </span>
        </div>
        <div id="manageContent"></div>
    </div>
</div>

<!-- ============ TAB: SITE CONTENT ============ -->
<div id="tab-sitecontent" class="tab-content hidden">
    <div class="form-section">
        <div class="section-title">
            Existing Website Sections
            <span style="font-size:14px;color:#64748b;font-weight:400;display:flex;gap:8px;align-items:center">
                <input type="text" id="siteContentSearch" placeholder="Search sections..." oninput="renderSiteContent()" style="width:200px;padding:6px 10px;font-size:12px">
                <select id="siteContentFilter" onchange="renderSiteContent()" style="width:auto;padding:6px 10px;font-size:12px">
                    <option value="">All Types</option>
                </select>
            </span>
        </div>
        <div id="siteContentContainer"></div>
    </div>
</div>

<!-- ============ TAB: EXPORT ============ -->
<div id="tab-export" class="tab-content hidden">
    <div class="form-section">
        <div class="section-title">Export All Data</div>
        <p style="color:#94a3b8;font-size:13px;margin-bottom:16px">Copy this JSON to transfer data to another system or create a backup.</p>
        <button class="btn btn-secondary btn-sm" onclick="copyExport()">Copy to Clipboard</button>
        <button class="btn btn-secondary btn-sm" onclick="downloadExport()">Download .json</button>
        <div id="exportOutput" class="json-output"></div>
    </div>
    <div class="form-section">
        <div class="section-title">Import Data</div>
        <p style="color:#94a3b8;font-size:13px;margin-bottom:12px">Paste JSON data to restore or bulk-import content.</p>
        <textarea id="importTextarea" style="min-height:200px;font-family:'Fira Code',monospace;font-size:12px" placeholder="Paste JSON here..."></textarea>
        <div class="btn-group">
            <button class="btn btn-primary btn-sm" onclick="importData()">Import</button>
            <button class="btn btn-danger btn-sm" onclick="clearAllData()">Clear All Data</button>
        </div>
        <div id="importStatus" class="mt-12"></div>
    </div>
</div>` }} />
  );
}
