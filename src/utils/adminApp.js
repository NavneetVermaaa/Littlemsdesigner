// ============================================================
// DATA LAYER
// ============================================================
const DATA_KEY = 'template_cms_data';

function getAllData() {
    try { return JSON.parse(localStorage.getItem(DATA_KEY)) || {}; } catch(e) { return {}; }
}

function saveAllData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function getItems(templateType) {
    const data = getAllData();
    return data[templateType] || [];
}

function setItems(templateType, items) {
    const data = getAllData();
    data[templateType] = items;
    saveAllData(data);
}

function addItem(templateType, item) {
    const items = getItems(templateType);
    item._id = Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    item._template = templateType;
    items.push(item);
    setItems(templateType, items);
    return item;
}

function updateItem(templateType, id, updated) {
    const items = getItems(templateType);
    const idx = items.findIndex(i => i._id === id);
    if (idx === -1) return;
    updated._id = id;
    updated._template = templateType;
    items[idx] = updated;
    setItems(templateType, items);
}

function deleteItem(templateType, id) {
    const items = getItems(templateType);
    setItems(templateType, items.filter(i => i._id !== id));
}

// Editing state
let editingId = null;
let editingTemplate = null;

// ============================================================
// TAB SWITCHING
// ============================================================
function switchTab(name) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + name).classList.remove('hidden');
    document.querySelector('.tab-btn[data-tab="' + name + '"]').classList.add('active');
    if (name === 'manage') renderManage();
    if (name === 'sitecontent') renderSiteContent();
    if (name === 'export') renderExport();
}

// ============================================================
// TEMPLATE FORM RENDERER
// ============================================================
function renderTemplateForm() {
    const type = document.getElementById('templateSelect').value;
    const container = document.getElementById('templateFormContainer');
    const formActions = document.getElementById('formActions');
    formActions.classList.remove('hidden');
    resetFormState();

    if (!type) {
        container.innerHTML = '<div class="form-section"><p style="color:#64748b;text-align:center;padding:20px">Select a template type above to begin building content.</p></div>';
        formActions.classList.add('hidden');
        return;
    }

    const formTemplates = {
        'category-grid': renderCategoryGridForm,
        'data-table': renderDataTableForm,
        'ranked-table': renderRankedTableForm,
        'spec-card': renderSpecCardForm,
        'spec-board': renderSpecBoardForm,
        'comparison': renderComparisonForm,
        'furniture-list': renderFurnitureListForm,
        'image-row': renderImageRowForm,
        'side-grid': renderSideGridForm,
        'top10': renderTop10Form,
        'split-cover': renderSplitCoverForm,
        'detail-card': renderDetailCardForm,
        'detail-card-image': renderDetailCardImageForm,
        'merged-view': renderMergedViewForm
    };

    if (formTemplates[type]) formTemplates[type]();
}

function resetFormState() {
    window.dtRows = []; window.dtGallery = [];
    window.rankedItems = []; window.specRows = []; window.specBoardRows = [];
    window.cmpRows = []; window.furnitureItems = [];
    window.imageRowItems = []; window.sideGridItems = [];
    window.top10Items = []; window.dciRows = [];
    window.mvTableRows = []; window.mvListItems = [];
}

// ============================================================
// CANONICAL SCHEMAS
// ============================================================
const SCHEMAS = {
    'category-grid': { itemKeys: ['id','name','tag','cnt','desc','img'] },
    'data-table': { itemKeys: ['title','count','cols','rows','gallery'], rowKeys: ['img','cells'] },
    'ranked-table': { itemKeys: ['title','count','items'], itemEntryKeys: ['name','cost','thick','install','maint','pros','cons','best','brands','image'] },
    'spec-card': { itemKeys: ['title','sectionTitle','image','rows'], rowKeys: ['label','value'] },
    'spec-board': { itemKeys: ['title','count','subtitle','cover','props'], rowKeys: ['label','value'] },
    'comparison': { itemKeys: ['title','cols','rows'], rowKeys: ['cells'] },
    'furniture-list': { itemKeys: ['title','count','items'], itemEntryKeys: ['name','cost','thick','install','maint','pros','cons','best','brands','image'] },
    'image-row': { itemKeys: ['items'], itemEntryKeys: ['img','label'] },
    'side-grid': { itemKeys: ['images','items'], itemEntryKeys: ['img','label'] },
    'top10': { itemKeys: ['title','count','columns','items'], itemEntryKeys: ['name','cost','thick','install','maint','pros','cons','best','brands','image'] },
    'split-cover': { itemKeys: ['leftImage','leftLabel','rightImage','rightLabel'] },
    'detail-card': { itemKeys: ['title','material','thickness','brands','pros','cons'] },
    'detail-card-image': { itemKeys: ['title','image','rows'], rowKeys: ['label','value'] },
    'merged-view': { itemKeys: ['title','tableCount','cols','tableRows','listItems'], rowKeys: ['img','cells'], listItemKeys: ['text'] }
};

// Normalize item entry to canonical keys (handles legacy aliases)
function normalizeItemEntry(entry) {
    if (!entry || typeof entry !== 'object') return entry;
    var n = {};
    if (entry.name !== undefined) n.name = entry.name;
    if (entry.cost !== undefined) n.cost = entry.cost;
    n.thick = entry.thick || entry.thk || '';
    n.install = entry.install || '';
    n.maint = entry.maint || '';
    n.pros = entry.pros || '';
    n.cons = entry.cons || '';
    n.best = entry.best || entry.bestuse || '';
    n.brands = entry.brands || '';
    n.desc = entry.desc || entry.description || '';
    n.image = entry.image || entry.img || '';
    n.img = entry.img || entry.image || '';
    n.label = entry.label || '';
    if (entry.value !== undefined || entry.v !== undefined) n.value = entry.value || entry.v || '';
    if (entry.l !== undefined && entry.label === undefined) n.label = entry.l || '';
    return n;
}

// Normalize row entry (spec rows: {l,v} <=> {label,value})
function normalizeRowEntry(row) {
    if (!row || typeof row !== 'object') return row;
    if (row.label !== undefined || row.value !== undefined) return { label: row.label||'', value: row.value||'' };
    return { label: row.l||'', value: row.v||'' };
}

// ----- Category Grid Form -----
function renderCategoryGridForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Category Grid</div><div class="form-grid">'
        + '<div><label>Category ID</label><input type="text" id="cg_id" placeholder="e.g. flooring"></div>'
        + '<div><label>Category Name</label><input type="text" id="cg_name" placeholder="e.g. Flooring Finishes"></div>'
        + '<div><label>Tag</label><input type="text" id="cg_tag" placeholder="e.g. natural, finishes">&nbsp;</div>'
        + '<div><label>Count</label><input type="text" id="cg_cnt" placeholder="e.g. 12"></div>'
        + '<div style="grid-column:1/-1"><label>Description</label><textarea id="cg_desc" placeholder="Brief description..."></textarea></div>'
        + '<div><label>Image</label><input type="file" accept="image/*" onchange="previewImg(this,\'cg_preview\')"><img id="cg_preview" class="hidden" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-top:8px;border:1px solid rgba(255,255,255,0.08)"></div>'
        + '</div></div>';
}

// ----- Data Table Form -----
function renderDataTableForm() {
    let html = '<div class="form-section"><div class="section-title">Data Table with Thumbnails</div><div class="form-grid">'
        + '<div><label>Table Title</label><input type="text" id="dt_title" placeholder="e.g. Flooring Finishes"></div>'
        + '<div><label>Item Count</label><input type="text" id="dt_count" placeholder="e.g. 8">&nbsp;</div>'
        + '<div style="grid-column:1/-1"><label>Columns (comma separated)</label><input type="text" id="dt_cols" placeholder="e.g. #,Material,Cost,Brands" onchange="window.dtCols=this.value.split(\',\');renderDtRows()"></div>'
        + '</div>';
    html += '<div style="margin-top:16px"><label>Data Rows</label><div id="dtRowContainer"></div></div>';
    html += '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addDtRow()">+ Add Row</button></div>';
    html += '<div style="margin-top:20px"><label>Gallery Images</label><div id="dtGalleryContainer"></div></div>';
    html += '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addDtGalleryItem()">+ Add Gallery Image</button></div>';
    html += '</div>';
    document.getElementById('templateFormContainer').innerHTML = html;
    renderDtRows();
    renderDtGallery();
}

function addDtRow() {
    window.dtRows.push({});
    renderDtRows();
}
function removeDtRow(idx) {
    window.dtRows.splice(idx, 1);
    renderDtRows();
}
function updateDtRow(idx, field, val) {
    if (!window.dtRows[idx]) window.dtRows[idx] = {};
    window.dtRows[idx][field] = val;
}
function renderDtRows() {
    const container = document.getElementById('dtRowContainer');
    if (!container) return;
    const cols = (document.getElementById('dt_cols') && document.getElementById('dt_cols').value) ? document.getElementById('dt_cols').value.split(',') : ['#','Material','Cost','Brands'];
    if (!window.dtRows.length) {
        container.innerHTML = '<div class="row-repeater-empty">No rows yet. Add one above.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:' + cols.map(()=>'1fr').join(' ') + ' 50px">';
    cols.forEach(c => html += '<span>' + c.trim() + '</span>');
    html += '<span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.dtRows.forEach((row, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:' + cols.map(()=>'1fr').join(' ') + ' 50px">';
        cols.forEach(c => {
            const val = row[c.trim()] || '';
            html += '<input type="text" value="' + val.replace(/"/g,'&quot;') + '" onchange="updateDtRow(' + i + ',\'' + c.trim() + '\',this.value)" placeholder="' + c.trim() + '">';
        });
        html += '<div><button type="button" class="delete-btn" onclick="removeDtRow(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

function addDtGalleryItem() {
    window.dtGallery.push('');
    renderDtGallery();
}
function removeDtGalleryItem(idx) {
    window.dtGallery.splice(idx, 1);
    renderDtGallery();
}
function updateDtGalleryImg(idx, src) {
    window.dtGallery[idx] = src;
}
function renderDtGallery() {
    const container = document.getElementById('dtGalleryContainer');
    if (!container) return;
    if (!window.dtGallery.length) {
        container.innerHTML = '<div class="row-repeater-empty">No gallery images yet.</div>';
        return;
    }
    let html = '<div class="row-repeater">';
    window.dtGallery.forEach((img, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:1fr 100px 50px;align-items:center">';
        html += '<input type="file" accept="image/*" onchange="previewImg(this,\'dt_gallery_' + i + '\')" style="padding:8px;font-size:12px">';
        html += '<img id="dt_gallery_' + i + '" class="' + (img ? '' : 'hidden') + '" style="width:60px;height:60px;object-fit:cover;border-radius:6px;border:1px solid rgba(255,255,255,0.08)" src="' + img + '">';
        html += '<div><button type="button" class="delete-btn" onclick="removeDtGalleryItem(' + i + ')">×</button></div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
}

// ----- Ranked Table Form -----
function renderRankedTableForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Premium Ranked Table</div><div class="form-grid">'
        + '<div><label>Section Title</label><input type="text" id="rt_title" placeholder="e.g. Top Materials"></div>'
        + '<div><label>Item Count</label><input type="text" id="rt_count" placeholder="e.g. 8"></div>'
        + '</div><div style="margin-top:16px"><label>Ranked Items</label><div id="rtRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addRankedItem()">+ Add Item</button></div></div>';
    renderRankedItems();
}

function addRankedItem() {
    window.rankedItems.push({name:'',cost:'',thick:'',install:'',maint:'',pros:'',cons:'',best:'',brands:'',image:''});
    renderRankedItems();
}
function updateRankedItemImg(idx, input) {
    const file = input.files[0];
    if (!file || !window.rankedItems[idx]) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        window.rankedItems[idx].image = e.target.result;
        const img = document.getElementById('rt_img_' + idx);
        if (img) { img.src = e.target.result; img.classList.remove('hidden'); }
    };
    reader.readAsDataURL(file);
}
function removeRankedItem(idx) {
    window.rankedItems.splice(idx, 1);
    renderRankedItems();
}
function updateRankedItem(idx, field, val) {
    if (!window.rankedItems[idx]) return;
    window.rankedItems[idx][field] = val;
}
function renderRankedItems() {
    const container = document.getElementById('rtRowContainer');
    if (!container) return;
    const headers = ['Image','Name','Cost','Thk','Install','Maint','Pros','Cons','Best Use','Brands'];
    const keys = ['image','name','cost','thick','install','maint','pros','cons','best','brands'];
    if (!window.rankedItems.length) {
        container.innerHTML = '<div class="row-repeater-empty">No items yet.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:80px repeat(9,1fr) 50px">';
    headers.forEach(h => html += '<span>' + h + '</span>');
    html += '<span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.rankedItems.forEach((item, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:80px repeat(9,1fr) 50px;align-items:start">';
        html += '<div><input type="file" accept="image/*" onchange="updateRankedItemImg(' + i + ',this)" style="font-size:10px;padding:4px;width:72px">'
            + '<img id="rt_img_' + i + '" class="' + (item.image?'':'hidden') + '" style="width:60px;height:60px;object-fit:cover;border-radius:6px;margin-top:4px;border:1px solid rgba(255,255,255,0.08)" src="' + (item.image||'') + '"></div>';
        keys.forEach(k => {
            if (k === 'image') return;
            const v = item[k] || '';
            html += '<input type="text" value="' + v.replace(/"/g,'&quot;') + '" onchange="updateRankedItem(' + i + ',\'' + k + '\',this.value)" placeholder="' + k + '">';
        });
        html += '<div><button type="button" class="delete-btn" onclick="removeRankedItem(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

// ----- Spec Card Form -----
function renderSpecCardForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Detail Specification Card</div><div class="form-grid">'
        + '<div><label>Card Title</label><input type="text" id="sc_title" placeholder="e.g. Premium Marble"></div>'
        + '<div><label>Section Title</label><input type="text" id="sc_section_title" placeholder="e.g. Premium Materials">&nbsp;</div>'
        + '<div style="grid-column:1/-1"><label>Card Image</label><input type="file" accept="image/*" onchange="previewImg(this,\'sc_preview\')"><img id="sc_preview" class="hidden" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-top:8px;border:1px solid rgba(255,255,255,0.08)"></div>'
        + '</div><div style="margin-top:16px"><label>Specification Rows</label><div id="scRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addSpecRow()">+ Add Row</button></div></div>';
    renderSpecRows();
}

function addSpecRow() {
    window.specRows.push({label:'',value:''});
    renderSpecRows();
}
function removeSpecRow(idx) {
    window.specRows.splice(idx, 1);
    renderSpecRows();
}
function updateSpecRow(idx, field, val) {
    if (!window.specRows[idx]) return;
    window.specRows[idx][field] = val;
}
function renderSpecRows() {
    const container = document.getElementById('scRowContainer');
    if (!container) return;
    if (!window.specRows.length) {
        container.innerHTML = '<div class="row-repeater-empty">No rows yet.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:1fr 2fr 50px">'
        + '<span>Label</span><span>Value</span><span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.specRows.forEach((row, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:1fr 2fr 50px">';
        html += '<input type="text" value="' + (row.label||'').replace(/"/g,'&quot;') + '" onchange="updateSpecRow(' + i + ',\'label\',this.value)" placeholder="e.g. Material">';
        html += '<textarea rows="2" onchange="updateSpecRow(' + i + ',\'value\',this.value)" placeholder="Value">' + (row.value||'').replace(/"/g,'&quot;') + '</textarea>';
        html += '<div><button type="button" class="delete-btn" onclick="removeSpecRow(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

// ----- Spec Board Form -----
function renderSpecBoardForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Premium Material Spec Board</div><div class="form-grid">'
        + '<div><label>Board Title</label><input type="text" id="sb_title" placeholder="e.g. Microcement Finish"></div>'
        + '<div><label>Item Count</label><input type="text" id="sb_count" placeholder="e.g. 10"></div>'
        + '<div style="grid-column:1/-1"><label>Subtitle</label><input type="text" id="sb_subtitle" placeholder="e.g. Key features & specifications"></div>'
        + '<div style="grid-column:1/-1"><label>Cover Image</label><input type="file" accept="image/*" onchange="previewImg(this,\'sb_preview\')"><img id="sb_preview" class="hidden" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-top:8px;border:1px solid rgba(255,255,255,0.08)"></div>'
        + '</div><div style="margin-top:16px"><label>Specification Props</label><div id="sbRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addSpecBoardRow()">+ Add Prop</button></div></div>';
    renderSpecBoardRows();
}

function addSpecBoardRow() {
    window.specBoardRows.push({label:'',value:''});
    renderSpecBoardRows();
}
function removeSpecBoardRow(idx) {
    window.specBoardRows.splice(idx, 1);
    renderSpecBoardRows();
}
function updateSpecBoardRow(idx, field, val) {
    if (!window.specBoardRows[idx]) return;
    window.specBoardRows[idx][field] = val;
}
function renderSpecBoardRows() {
    const container = document.getElementById('sbRowContainer');
    if (!container) return;
    if (!window.specBoardRows.length) {
        container.innerHTML = '<div class="row-repeater-empty">No specification props yet.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:1fr 2fr 50px">'
        + '<span>Label</span><span>Value</span><span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.specBoardRows.forEach((row, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:1fr 2fr 50px">';
        html += '<input type="text" value="' + (row.label||'').replace(/"/g,'&quot;') + '" onchange="updateSpecBoardRow(' + i + ',\'label\',this.value)" placeholder="e.g. Cost">';
        html += '<textarea rows="2" onchange="updateSpecBoardRow(' + i + ',\'value\',this.value)" placeholder="Value">' + (row.value||'').replace(/"/g,'&quot;') + '</textarea>';
        html += '<div><button type="button" class="delete-btn" onclick="removeSpecBoardRow(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

// ----- Comparison Form -----
function renderComparisonForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Comparison Table</div><div class="form-grid">'
        + '<div style="grid-column:1/-1"><label>Table Title</label><input type="text" id="cmp_title" placeholder="e.g. Marble vs Tiles"></div>'
        + '<div style="grid-column:1/-1"><label>Column Names (comma separated)</label><input type="text" id="cmp_cols" placeholder="e.g. Category,Marble,Tiles" onchange="renderCmpRows()"></div>'
        + '</div><div style="margin-top:16px"><label>Comparison Rows</label><div id="cmpRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addCmpRow()">+ Add Row</button></div></div>';
    renderCmpRows();
}

function addCmpRow() {
    window.cmpRows.push([]);
    renderCmpRows();
}
function removeCmpRow(idx) {
    window.cmpRows.splice(idx, 1);
    renderCmpRows();
}
function updateCmpRow(idx, colIdx, val) {
    if (!window.cmpRows[idx]) return;
    window.cmpRows[idx][colIdx] = val;
}
function renderCmpRows() {
    const container = document.getElementById('cmpRowContainer');
    if (!container) return;
    const cols = (document.getElementById('cmp_cols') && document.getElementById('cmp_cols').value) ? document.getElementById('cmp_cols').value.split(',') : ['Category','Item A','Item B'];
    if (!window.cmpRows.length) {
        container.innerHTML = '<div class="row-repeater-empty">No rows yet.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:' + cols.map(()=>'1fr').join(' ') + ' 50px">';
    cols.forEach(c => html += '<span>' + c.trim() + '</span>');
    html += '<span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.cmpRows.forEach((row, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:' + cols.map(()=>'1fr').join(' ') + ' 50px">';
        cols.forEach((c, ci) => {
            const v = row[ci] || '';
            html += '<input type="text" value="' + v.replace(/"/g,'&quot;') + '" onchange="updateCmpRow(' + i + ',' + ci + ',this.value)" placeholder="' + c.trim() + '">';
        });
        html += '<div><button type="button" class="delete-btn" onclick="removeCmpRow(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

// ----- Furniture List Form -----
function renderFurnitureListForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Furniture Finish List</div><div class="form-grid">'
        + '<div><label>List Title</label><input type="text" id="fl_title" placeholder="e.g. Bed Finishes"></div>'
        + '<div><label>Item Count</label><input type="text" id="fl_count" placeholder="e.g. 6"></div>'
        + '</div><div style="margin-top:16px"><label>Items</label><div id="flRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addFurnitureItem()">+ Add Item</button></div></div>';
    renderFurnitureItems();
}

function addFurnitureItem() {
    window.furnitureItems.push({name:'',cost:'',thick:'',install:'',maint:'',pros:'',cons:'',best:'',brands:'',image:''});
    renderFurnitureItems();
}
function removeFurnitureItem(idx) {
    window.furnitureItems.splice(idx, 1);
    renderFurnitureItems();
}
function updateFurnitureItem(idx, field, val) {
    if (!window.furnitureItems[idx]) return;
    window.furnitureItems[idx][field] = val;
}
function updateFurnitureItemImg(idx, input) {
    const file = input.files[0];
    if (!file || !window.furnitureItems[idx]) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        window.furnitureItems[idx].image = e.target.result;
        const img = document.getElementById('fl_img_' + idx);
        if (img) { img.src = e.target.result; img.classList.remove('hidden'); }
    };
    reader.readAsDataURL(file);
}
function renderFurnitureItems() {
    const container = document.getElementById('flRowContainer');
    if (!container) return;
    const headers = ['Image','Name','Cost','Thk','Install','Maint','Pros','Cons','Best Use','Brands'];
    const keys = ['image','name','cost','thick','install','maint','pros','cons','best','brands'];
    if (!window.furnitureItems.length) {
        container.innerHTML = '<div class="row-repeater-empty">No items yet.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:80px repeat(9,1fr) 50px">';
    headers.forEach(h => html += '<span>' + h + '</span>');
    html += '<span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.furnitureItems.forEach((item, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:80px repeat(9,1fr) 50px;align-items:start">';
        html += '<div><input type="file" accept="image/*" onchange="updateFurnitureItemImg(' + i + ',this)" style="font-size:10px;padding:4px;width:72px">'
            + '<img id="fl_img_' + i + '" class="' + (item.image?'':'hidden') + '" style="width:60px;height:60px;object-fit:cover;border-radius:6px;margin-top:4px;border:1px solid rgba(255,255,255,0.08)" src="' + (item.image||'') + '"></div>';
        keys.forEach(k => {
            if (k === 'image') return;
            const v = item[k] || '';
            html += '<input type="text" value="' + v.replace(/"/g,'&quot;') + '" onchange="updateFurnitureItem(' + i + ',\'' + k + '\',this.value)" placeholder="' + k + '">';
        });
        html += '<div><button type="button" class="delete-btn" onclick="removeFurnitureItem(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

// ----- Image Row Form -----
function renderImageRowForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Image Row Grid</div>'
        + '<div style="margin-top:16px"><label>Images</label><div id="irRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addImageRowItem()">+ Add Image</button></div></div>';
    renderImageRowItems();
}

function addImageRowItem() {
    window.imageRowItems.push({img:'',label:''});
    renderImageRowItems();
}
function removeImageRowItem(idx) {
    window.imageRowItems.splice(idx, 1);
    renderImageRowItems();
}
function updateImageRowItem(idx, field, val) {
    if (!window.imageRowItems[idx]) return;
    window.imageRowItems[idx][field] = val;
}
function updateImageRowItemImg(idx, input) {
    const file = input.files[0];
    if (!file || !window.imageRowItems[idx]) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        window.imageRowItems[idx].img = e.target.result;
        const img = document.getElementById('ir_preview_' + idx);
        if (img) { img.src = e.target.result; img.classList.remove('hidden'); }
    };
    reader.readAsDataURL(file);
}
function renderImageRowItems() {
    const container = document.getElementById('irRowContainer');
    if (!container) return;
    if (!window.imageRowItems.length) {
        container.innerHTML = '<div class="row-repeater-empty">No images yet.</div>';
        return;
    }
    let html = '<div class="row-repeater">';
    window.imageRowItems.forEach((item, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:1fr 1fr 80px 50px">';
        html += '<input type="text" value="' + (item.label||'').replace(/"/g,'&quot;') + '" onchange="updateImageRowItem(' + i + ',\'label\',this.value)" placeholder="Label">';
        html += '<input type="file" accept="image/*" onchange="updateImageRowItemImg(' + i + ',this)" style="padding:8px;font-size:12px">';
        html += '<img id="ir_preview_' + i + '" class="' + (item.img?'':'hidden') + '" style="width:60px;height:60px;object-fit:cover;border-radius:6px" src="' + item.img + '">';
        html += '<div><button type="button" class="delete-btn" onclick="removeImageRowItem(' + i + ')">×</button></div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
}

// ----- Side Grid Form -----
function renderSideGridForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Side-by-Side Grid</div>'
        + '<div style="margin-top:16px"><label>Images</label><div id="sgRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addSideGridItem()">+ Add Image</button></div></div>';
    renderSideGridItems();
}

function addSideGridItem() {
    window.sideGridItems.push({img:'',label:''});
    renderSideGridItems();
}
function removeSideGridItem(idx) {
    window.sideGridItems.splice(idx, 1);
    renderSideGridItems();
}
function updateSideGridItem(idx, field, val) {
    if (!window.sideGridItems[idx]) return;
    window.sideGridItems[idx][field] = val;
}
function updateSideGridItemImg(idx, input) {
    const file = input.files[0];
    if (!file || !window.sideGridItems[idx]) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        window.sideGridItems[idx].img = e.target.result;
        const img = document.getElementById('sg_preview_' + idx);
        if (img) { img.src = e.target.result; img.classList.remove('hidden'); }
    };
    reader.readAsDataURL(file);
}
function renderSideGridItems() {
    const container = document.getElementById('sgRowContainer');
    if (!container) return;
    if (!window.sideGridItems.length) {
        container.innerHTML = '<div class="row-repeater-empty">No images yet.</div>';
        return;
    }
    let html = '<div class="row-repeater">';
    window.sideGridItems.forEach((item, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:1fr 1fr 80px 50px">';
        html += '<input type="text" value="' + (item.label||'').replace(/"/g,'&quot;') + '" onchange="updateSideGridItem(' + i + ',\'label\',this.value)" placeholder="Label">';
        html += '<input type="file" accept="image/*" onchange="updateSideGridItemImg(' + i + ',this)" style="padding:8px;font-size:12px">';
        html += '<img id="sg_preview_' + i + '" class="' + (item.img?'':'hidden') + '" style="width:60px;height:60px;object-fit:cover;border-radius:6px" src="' + item.img + '">';
        html += '<div><button type="button" class="delete-btn" onclick="removeSideGridItem(' + i + ')">×</button></div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
}

// ----- Top 10 Form -----
function renderTop10Form() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Top 10 Materials</div><div class="form-grid">'
        + '<div><label>Section Title</label><input type="text" id="t10_title" placeholder="Top 10 Materials 2026"></div>'
        + '<div><label>Item Count</label><input type="text" id="t10_count" placeholder="10"></div>'
        + '</div><div style="margin-top:16px"><div class="section-title" style="font-size:14px">Column Headers</div><div class="form-grid-4">'
        + '<div><label>Cost</label><input type="text" id="t10_col_cost" placeholder="Cost (Sq.Ft)"></div>'
        + '<div><label>Thk</label><input type="text" id="t10_col_thk" placeholder="Thk (mm)"></div>'
        + '<div><label>Install</label><input type="text" id="t10_col_install" placeholder="Installation Process"></div>'
        + '<div><label>Maint</label><input type="text" id="t10_col_maint" placeholder="Maintenance"></div>'
        + '<div><label>Pros</label><input type="text" id="t10_col_pros" placeholder="✓ Pros"></div>'
        + '<div><label>Cons</label><input type="text" id="t10_col_cons" placeholder="✕ Cons"></div>'
        + '<div><label>Best Use</label><input type="text" id="t10_col_best" placeholder="Best Places to Use"></div>'
        + '<div><label>Brands</label><input type="text" id="t10_col_brands" placeholder="Brands"></div>'
        + '</div></div><div style="margin-top:16px"><label>Items</label><div id="t10RowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addTop10Item()">+ Add Item</button></div></div>';
    renderTop10Items();
}

function addTop10Item() {
    window.top10Items.push({name:'',cost:'',thick:'',install:'',maint:'',pros:'',cons:'',best:'',brands:'',image:''});
    renderTop10Items();
}
function removeTop10Item(idx) {
    window.top10Items.splice(idx, 1);
    renderTop10Items();
}
function updateTop10Item(idx, field, val) {
    if (!window.top10Items[idx]) return;
    window.top10Items[idx][field] = val;
}
function updateTop10ItemImg(idx, input) {
    const file = input.files[0];
    if (!file || !window.top10Items[idx]) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        window.top10Items[idx].image = e.target.result;
        const img = document.getElementById('t10_img_' + idx);
        if (img) { img.src = e.target.result; img.classList.remove('hidden'); }
    };
    reader.readAsDataURL(file);
}
function renderTop10Items() {
    const container = document.getElementById('t10RowContainer');
    if (!container) return;
    const headers = ['Image','Name','Cost','Thick','Install','Maint','Pros','Cons','Best','Brands'];
    const keys = ['image','name','cost','thick','install','maint','pros','cons','best','brands'];
    if (!window.top10Items.length) {
        container.innerHTML = '<div class="row-repeater-empty">No items yet.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:80px repeat(9,1fr) 50px">';
    headers.forEach(h => html += '<span>' + h + '</span>');
    html += '<span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.top10Items.forEach((item, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:80px repeat(9,1fr) 50px;align-items:start">';
        html += '<div><input type="file" accept="image/*" onchange="updateTop10ItemImg(' + i + ',this)" style="font-size:10px;padding:4px;width:72px">'
            + '<img id="t10_img_' + i + '" class="' + (item.image?'':'hidden') + '" style="width:60px;height:60px;object-fit:cover;border-radius:6px;margin-top:4px;border:1px solid rgba(255,255,255,0.08)" src="' + (item.image||'') + '"></div>';
        keys.forEach(k => {
            if (k === 'image') return;
            const v = item[k] || '';
            html += '<input type="text" value="' + v.replace(/"/g,'&quot;') + '" onchange="updateTop10Item(' + i + ',\'' + k + '\',this.value)" placeholder="' + k + '">';
        });
        html += '<div><button type="button" class="delete-btn" onclick="removeTop10Item(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

// ----- Split Cover Form -----
function renderSplitCoverForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Split Cover Card</div><div class="form-grid">'
        + '<div><label>Left Label</label><input type="text" id="sp_left_label" placeholder="e.g. Before"></div>'
        + '<div><label>Right Label</label><input type="text" id="sp_right_label" placeholder="e.g. After"></div>'
        + '<div><label>Left Image</label><input type="file" accept="image/*" onchange="previewImg(this,\'sp_left_preview\')"><img id="sp_left_preview" class="hidden" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-top:8px;border:1px solid rgba(255,255,255,0.08)"></div>'
        + '<div><label>Right Image</label><input type="file" accept="image/*" onchange="previewImg(this,\'sp_right_preview\')"><img id="sp_right_preview" class="hidden" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-top:8px;border:1px solid rgba(255,255,255,0.08)"></div>'
        + '</div></div>';
}

// ----- Detail Card Form -----
function renderDetailCardForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Simple Detail Card</div><div class="form-grid">'
        + '<div><label>Card Title</label><input type="text" id="dc_title" placeholder="e.g. Material Name"></div>'
        + '<div><label>Material</label><input type="text" id="dc_material" placeholder="e.g. Natural Stone"></div>'
        + '<div><label>Thickness</label><input type="text" id="dc_thickness" placeholder="e.g. 10–20 mm"></div>'
        + '<div><label>Brands</label><input type="text" id="dc_brands" placeholder="e.g. RK Marble"></div>'
        + '<div style="grid-column:1/-1"><label>Pros</label><textarea id="dc_pros" placeholder="List pros..."></textarea></div>'
        + '<div style="grid-column:1/-1"><label>Cons</label><textarea id="dc_cons" placeholder="List cons..."></textarea></div>'
        + '</div></div>';
}

// ----- Detail Card Image Form -----
function renderDetailCardImageForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Enhanced Detail Card w/ Image</div><div class="form-grid">'
        + '<div style="grid-column:1/-1"><label>Card Title</label><input type="text" id="dci_title" placeholder="e.g. Vitrified Tiles"></div>'
        + '<div style="grid-column:1/-1"><label>Card Image</label><input type="file" accept="image/*" onchange="previewImg(this,\'dci_preview\')"><img id="dci_preview" class="hidden" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-top:8px;border:1px solid rgba(255,255,255,0.08)"></div>'
        + '</div><div style="margin-top:16px"><label>Specification Rows</label><div id="dciRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addDciRow()">+ Add Row</button></div></div>';
    renderDciRows();
}

function addDciRow() {
    window.dciRows.push({label:'',value:''});
    renderDciRows();
}
function removeDciRow(idx) {
    window.dciRows.splice(idx, 1);
    renderDciRows();
}
function updateDciRow(idx, field, val) {
    if (!window.dciRows[idx]) return;
    window.dciRows[idx][field] = val;
}
function renderDciRows() {
    const container = document.getElementById('dciRowContainer');
    if (!container) return;
    if (!window.dciRows.length) {
        container.innerHTML = '<div class="row-repeater-empty">No rows yet.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:1fr 2fr 50px">'
        + '<span>Label</span><span>Value</span><span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.dciRows.forEach((row, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:1fr 2fr 50px">';
        html += '<input type="text" value="' + (row.label||'').replace(/"/g,'&quot;') + '" onchange="updateDciRow(' + i + ',\'label\',this.value)" placeholder="e.g. Material">';
        html += '<textarea rows="2" onchange="updateDciRow(' + i + ',\'value\',this.value)" placeholder="Value">' + (row.value||'').replace(/"/g,'&quot;') + '</textarea>';
        html += '<div><button type="button" class="delete-btn" onclick="removeDciRow(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

// ----- Merged View Form -----
function renderMergedViewForm() {
    document.getElementById('templateFormContainer').innerHTML =
        '<div class="form-section"><div class="section-title">Merged Table + List View</div><div class="form-grid">'
        + '<div><label>Section Title</label><input type="text" id="mv_title" placeholder="e.g. Marbles – Detailed Guide"></div>'
        + '<div><label>Table Count</label><input type="text" id="mv_table_count" placeholder="e.g. 10"></div>'
        + '<div style="grid-column:1/-1"><label>Column Names (comma separated)</label><input type="text" id="mv_cols" placeholder="e.g. Origin,#,Marble Name" onchange="renderMvTableRows()"></div>'
        + '</div><div style="margin-top:16px"><label>Table Rows</label><div id="mvTableRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addMvTableRow()">+ Add Row</button></div>'
        + '<div style="margin-top:20px"><label>List Items</label><div id="mvListRowContainer"></div></div>'
        + '<div class="btn-group" style="margin-top:12px"><button type="button" class="btn btn-secondary btn-sm" onclick="addMvListItem()">+ Add Item</button></div></div>';
    renderMvTableRows();
    renderMvListItems();
}

function addMvTableRow() {
    window.mvTableRows.push([]);
    renderMvTableRows();
}
function removeMvTableRow(idx) {
    window.mvTableRows.splice(idx, 1);
    renderMvTableRows();
}
function updateMvTableRow(idx, colIdx, val) {
    if (!window.mvTableRows[idx]) return;
    window.mvTableRows[idx][colIdx] = val;
}
function renderMvTableRows() {
    const container = document.getElementById('mvTableRowContainer');
    if (!container) return;
    const cols = (document.getElementById('mv_cols') && document.getElementById('mv_cols').value) ? document.getElementById('mv_cols').value.split(',') : ['#','Name','Description'];
    if (!window.mvTableRows.length) {
        container.innerHTML = '<div class="row-repeater-empty">No table rows yet.</div>';
        return;
    }
    let html = '<div class="row-repeater"><div class="row-repeater-header" style="grid-template-columns:' + cols.map(()=>'1fr').join(' ') + ' 50px">';
    cols.forEach(c => html += '<span>' + c.trim() + '</span>');
    html += '<span style="text-align:center">Del</span></div><div class="row-repeater-body">';
    window.mvTableRows.forEach((row, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:' + cols.map(()=>'1fr').join(' ') + ' 50px">';
        cols.forEach((c, ci) => {
            const v = row[ci] || '';
            html += '<input type="text" value="' + v.replace(/"/g,'&quot;') + '" onchange="updateMvTableRow(' + i + ',' + ci + ',this.value)" placeholder="' + c.trim() + '">';
        });
        html += '<div><button type="button" class="delete-btn" onclick="removeMvTableRow(' + i + ')">×</button></div></div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
}

function addMvListItem() {
    window.mvListItems.push({text:''});
    renderMvListItems();
}
function removeMvListItem(idx) {
    window.mvListItems.splice(idx, 1);
    renderMvListItems();
}
function updateMvListItem(idx, val) {
    if (!window.mvListItems[idx]) return;
    window.mvListItems[idx].text = val;
}
function renderMvListItems() {
    const container = document.getElementById('mvListRowContainer');
    if (!container) return;
    if (!window.mvListItems.length) {
        container.innerHTML = '<div class="row-repeater-empty">No list items yet.</div>';
        return;
    }
    let html = '<div class="row-repeater">';
    window.mvListItems.forEach((item, i) => {
        html += '<div class="row-repeater-row" style="grid-template-columns:1fr 40px">';
        html += '<textarea rows="2" onchange="updateMvListItem(' + i + ',this.value)" placeholder="Item text...">' + (item.text||'').replace(/"/g,'&quot;') + '</textarea>';
        html += '<div><button type="button" class="delete-btn" onclick="removeMvListItem(' + i + ')">×</button></div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================
// UTILITY: Image Preview
// ============================================================
function previewImg(input, previewId) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById(previewId);
        img.src = e.target.result;
        img.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function getBase64FromInput(inputId) {
    const img = document.getElementById(inputId);
    return img && img.src && img.classList.contains('hidden') === false ? img.src : '';
}

// ============================================================
// FORM SUBMISSION
// ============================================================
document.getElementById('contentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.getElementById('templateSelect').value;
    if (!type) { alert('Please select a template type.'); return; }

    const data = collectFormData(type);
    if (!data) return;
    data.category = document.getElementById('contentCategory').value;
    data.coverImage = getBase64FromInput('coverImagePreview');
    data.template = type;

    if (siteContentEditingId) {
        saveSiteContentFromForm(siteContentEditingId, type, data);
        return;
    }

    if (editingId && editingTemplate === type) {
        updateItem(type, editingId, data);
    } else {
        addItem(type, data);
    }

    // Clear form
    document.getElementById('contentForm').reset();
    document.getElementById('templateSelect').value = '';
    document.getElementById('templateFormContainer').innerHTML = '';
    document.getElementById('formActions').classList.add('hidden');
    resetFormState();

    showStatus('Content saved successfully!', 'success');
    switchTab('manage');
});

function collectFormData(type) {
    const g = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
    const gImg = (id) => { const el = document.getElementById(id); return el && el.src && !el.classList.contains('hidden') ? el.src : ''; };

    switch(type) {
        case 'category-grid':
            return {
                id: g('cg_id'), name: g('cg_name'), tag: g('cg_tag'),
                cnt: g('cg_cnt'), desc: g('cg_desc'), img: gImg('cg_preview')
            };

        case 'data-table':
            return {
                title: g('dt_title'), count: g('dt_count'), cols: g('dt_cols'),
                rows: window.dtRows || [],
                gallery: window.dtGallery || []
            };

        case 'ranked-table':
            return {
                title: g('rt_title'), count: g('rt_count'),
                items: window.rankedItems || []
            };

        case 'spec-card':
            return {
                title: g('sc_title'), sectionTitle: g('sc_section_title'),
                image: gImg('sc_preview'),
                rows: window.specRows || []
            };

        case 'spec-board':
            return {
                title: g('sb_title'), count: g('sb_count'), subtitle: g('sb_subtitle'),
                cover: gImg('sb_preview'),
                props: (window.specBoardRows || []).map(function(r) { return {label:r.label||r.l||'',value:r.value||r.v||''}; })
            };

        case 'comparison':
            return {
                title: g('cmp_title'), cols: g('cmp_cols'),
                rows: window.cmpRows || []
            };

        case 'furniture-list':
            return {
                title: g('fl_title'), count: g('fl_count'),
                items: window.furnitureItems || []
            };

        case 'image-row':
            return { items: window.imageRowItems || [] };

        case 'side-grid':
            return { items: window.sideGridItems || [] };

        case 'top10':
            return {
                title: g('t10_title'), count: g('t10_count'),
                columns: {
                    cost: g('t10_col_cost'), thick: g('t10_col_thk'),
                    install: g('t10_col_install'), maint: g('t10_col_maint'),
                    pros: g('t10_col_pros'), cons: g('t10_col_cons'),
                    best: g('t10_col_best'), brands: g('t10_col_brands')
                },
                items: window.top10Items || []
            };

        case 'split-cover':
            return {
                leftImage: getBase64FromInput('sp_left_preview'),
                leftLabel: g('sp_left_label'),
                rightImage: getBase64FromInput('sp_right_preview'),
                rightLabel: g('sp_right_label')
            };

        case 'detail-card':
            return {
                title: g('dc_title'), material: g('dc_material'),
                thickness: g('dc_thickness'), brands: g('dc_brands'),
                pros: g('dc_pros'), cons: g('dc_cons')
            };

        case 'detail-card-image':
            return {
                title: g('dci_title'),
                image: gImg('dci_preview'),
                rows: window.dciRows || []
            };

        case 'merged-view':
            return {
                title: g('mv_title'), tableCount: g('mv_table_count'), cols: g('mv_cols'),
                tableRows: window.mvTableRows || [],
                listItems: window.mvListItems || []
            };

        default:
            return null;
    }
}

// ============================================================
// MANAGE CONTENT
// ============================================================
function renderManage() {
    const data = getAllData();
    const types = Object.keys(data).filter(t => data[t] && data[t].length > 0);
    const container = document.getElementById('manageContent');
    const filterEl = document.getElementById('manageCategoryFilter');
    const selectedCat = filterEl ? filterEl.value : '';

    // Collect all items with categories
    const allItems = [];
    const catSet = {};
    types.forEach(type => {
        (data[type] || []).forEach(item => {
            allItems.push({ type: type, item: item });
            if (item.category) catSet[item.category] = true;
        });
    });
    const total = allItems.length;
    document.getElementById('manageCount').textContent = '(' + total + ' items)';

    // Populate category filter dropdown
    if (filterEl && filterEl.options.length <= 1) {
        Object.keys(catSet).sort().forEach(function(c) {
            var opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            filterEl.appendChild(opt);
        });
    }

    // Filter by category
    const filtered = selectedCat ? allItems.filter(function(x) { return x.item.category === selectedCat; }) : allItems;

    if (!filtered.length) {
        container.innerHTML = '<p style="color:#64748b;text-align:center;padding:20px">No content matches the selected category.</p>';
        return;
    }

    // Group filtered items by type for display
    const groups = {};
    filtered.forEach(function(x) {
        if (!groups[x.type]) groups[x.type] = [];
        groups[x.type].push(x.item);
    });

    let html = '';
    Object.keys(groups).forEach(function(type) {
        html += '<div style="margin-bottom:24px"><h3 style="font-size:16px;color:#94a3b8;margin-bottom:12px">' + type + ' (' + groups[type].length + ')</h3><div class="preview">';
        groups[type].forEach(function(item) {
            html += '<div class="card"><div class="card-body">';
            if (item.img) html += '<img src="' + item.img + '">';
            if (item.category) html += '<div><span class="badge-pill" style="background:#1e3a5f;color:#60a5fa;font-size:10px;margin-bottom:8px;display:inline-block">' + item.category + '</span></div>';
            html += '<h3>' + (item.name || item.title || 'Unnamed') + '</h3>';
            if (item.desc) html += '<div class="desc">' + item.desc.substring(0, 100) + '</div>';
            html += '<div class="card-actions">'
                + '<button class="edit-btn" onclick="editCardItem(\'' + type + '\',\'' + item._id + '\')">Edit</button>'
                + '<button class="delete-btn" onclick="deleteCardItem(\'' + type + '\',\'' + item._id + '\')">Delete</button>'
                + '</div></div></div>';
        });
        html += '</div></div>';
    });
    container.innerHTML = html;
}

function deleteCardItem(type, id) {
    if (!confirm('Delete this item?')) return;
    deleteItem(type, id);
    renderManage();
}

function editCardItem(type, id) {
    const items = getItems(type);
    const item = items.find(i => i._id === id);
    if (!item) return;
    switchTab('create');
    document.getElementById('templateSelect').value = type;
    renderTemplateForm();

    setTimeout(() => {
        populateForm(type, item);
        editingId = id;
        editingTemplate = type;
        const btn = document.querySelector('#formActions button');
        if (btn) btn.textContent = 'Update Content';
    }, 100);
}

// ============================================================
// POPULATE FORM (for editing)
// ============================================================
function populateForm(type, item) {
    const sf = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

    switch(type) {
        case 'category-grid':
            sf('cg_id', item.id); sf('cg_name', item.name); sf('cg_tag', item.tag);
            sf('cg_cnt', item.cnt); sf('cg_desc', item.desc);
            if (item.img) sf('cg_preview', '');
            break;

        case 'data-table':
            sf('dt_title', item.title); sf('dt_count', item.count); sf('dt_cols', item.cols);
            window.dtRows = item.rows || [];
            window.dtGallery = item.gallery || [];
            renderDtRows(); renderDtGallery();
            break;

        case 'ranked-table':
            sf('rt_title', item.title); sf('rt_count', item.count);
            window.rankedItems = item.items || [];
            renderRankedItems();
            break;

        case 'spec-card':
            sf('sc_title', item.title); sf('sc_section_title', item.sectionTitle);
            window.specRows = item.rows || [];
            renderSpecRows();
            break;

        case 'spec-board':
            sf('sb_title', item.title); sf('sb_count', item.count); sf('sb_subtitle', item.subtitle);
            window.specBoardRows = (item.props || []).map(function(r) {
                return {label:r.label||r.l||'',value:r.value||r.v||''};
            });
            renderSpecBoardRows();
            break;

        case 'comparison':
            sf('cmp_title', item.title); sf('cmp_cols', item.cols);
            window.cmpRows = item.rows || [];
            renderCmpRows();
            break;

        case 'furniture-list':
            sf('fl_title', item.title); sf('fl_count', item.count);
            window.furnitureItems = (item.items || []).map(function(it) {
                return normalizeItemEntry(it);
            });
            renderFurnitureItems();
            break;

        case 'image-row':
            window.imageRowItems = item.items || [];
            renderImageRowItems();
            break;

        case 'side-grid':
            window.sideGridItems = item.items || item.images || [];
            renderSideGridItems();
            break;

        case 'top10':
            sf('t10_title', item.title); sf('t10_count', item.count);
            if (item.columns) {
                sf('t10_col_cost', item.columns.cost);
                sf('t10_col_thk', item.columns.thick);
                sf('t10_col_install', item.columns.install);
                sf('t10_col_maint', item.columns.maint);
                sf('t10_col_pros', item.columns.pros);
                sf('t10_col_cons', item.columns.cons);
                sf('t10_col_best', item.columns.best);
                sf('t10_col_brands', item.columns.brands);
            }
            window.top10Items = item.items || [];
            renderTop10Items();
            break;

        case 'split-cover':
            sf('sp_left_label', item.leftLabel); sf('sp_right_label', item.rightLabel);
            break;

        case 'detail-card':
            sf('dc_title', item.title); sf('dc_material', item.material);
            sf('dc_thickness', item.thickness); sf('dc_brands', item.brands);
            sf('dc_pros', item.pros); sf('dc_cons', item.cons);
            break;

        case 'detail-card-image':
            sf('dci_title', item.title);
            window.dciRows = item.rows || [];
            renderDciRows();
            break;

        case 'merged-view':
            sf('mv_title', item.title); sf('mv_table_count', item.tableCount);
            sf('mv_cols', item.cols);
            window.mvTableRows = item.tableRows || [];
            window.mvListItems = item.listItems || [];
            renderMvTableRows(); renderMvListItems();
            break;
    }
    sf('contentCategory', item.category);
    if (item.coverImage) {
        var ci = document.getElementById('coverImagePreview');
        if (ci) { ci.src = item.coverImage; ci.classList.remove('hidden'); }
    }
}

// ============================================================
// EXPORT / IMPORT
// ============================================================
function renderExport() {
    const data = getAllData();
    document.getElementById('exportOutput').textContent = JSON.stringify(data, null, 2);
}

function copyExport() {
    const text = document.getElementById('exportOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        showStatus('Copied to clipboard!', 'success');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showStatus('Copied to clipboard!', 'success');
    });
}

function downloadExport() {
    const data = getAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_cms_export.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    const text = document.getElementById('importTextarea').value.trim();
    if (!text) { showStatus('Paste JSON data first.', 'error'); return; }
    try {
        const data = JSON.parse(text);
        if (typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('Root must be an object with template type keys.');
        }
        // Validate data before import
        var validationResult = runFullValidationOnData(data);
        if (!validationResult.valid) {
            var msg = 'Data has validation issues:\n';
            if (validationResult.cardErrors.length) {
                msg += '- Card errors: ' + validationResult.cardErrors.length + '\n';
            }
            if (validationResult.tableErrors.length) {
                msg += '- Table errors: ' + validationResult.tableErrors.length + '\n';
            }
            if (validationResult.imageIssues.length) {
                msg += '- Image issues: ' + validationResult.imageIssues.length + '\n';
            }
            if (!confirm(msg + 'Import anyway?')) return;
        }
        saveAllData(data);
        document.getElementById('importTextarea').value = '';
        showStatus('Data imported successfully! (' + Object.keys(data).reduce((s, t) => s + data[t].length, 0) + ' items)', 'success');
        renderExport();
    } catch(e) {
        showStatus('Invalid JSON: ' + e.message, 'error');
    }
}

function clearAllData() {
    if (!confirm('Delete ALL content data? This cannot be undone.')) return;
    if (!confirm('Are you sure? All templates and items will be permanently deleted.')) return;
    saveAllData({});
    renderExport();
    showStatus('All data cleared.', 'success');
}

// ============================================================
// STATUS MESSAGES
// ============================================================
function showStatus(msg, type) {
    const existing = document.querySelector('.status-msg');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.className = 'status-msg status-' + type;
    div.textContent = msg;
    document.getElementById('contentForm').insertBefore(div, document.getElementById('templateFormContainer'));
    setTimeout(() => div.remove(), 3000);
}

// ============================================================
// SITE CONTENT MANAGEMENT SYSTEM
// ============================================================
const CMS_PREFIX = 'cms_override_';
let siteContentEditingId = null;

// --- Override CRUD ---
function getSectionOverride(sectionId) {
    try { return JSON.parse(localStorage.getItem(CMS_PREFIX + sectionId)); } catch(e) { return null; }
}
function setSectionOverride(sectionId, data) {
    localStorage.setItem(CMS_PREFIX + sectionId, JSON.stringify(data));
}
function removeSectionOverride(sectionId) {
    localStorage.removeItem(CMS_PREFIX + sectionId);
}
function hasSectionOverride(sectionId) {
    return localStorage.getItem(CMS_PREFIX + sectionId) !== null;
}

// --- Content Registry ---
const SITE_SECTIONS = [
    {
        id: 'exp-look', title: 'Materials That Look Expensive', template: 'ranked-table', category: 'Premium Ranked Tables',
        getDefault: function() {
            return {
                title: 'Materials That Look ₹50L+ But Cost Under ₹50K',
                count: '3',
                items: [
                    {name:'Venetian Plaster Paint',cost:'₹180 – ₹350',thick:'1–3',install:'Prep wall → apply base coat → apply texture/Venetian layers → seal',maint:'Wipe dust lightly; reseal every few years',pros:'Luxurious depth and dimension like stone; customizable',cons:'Requires skilled applicator; not ideal for high-moisture areas',best:'Living room accent walls, hotel lobbies, foyer',brands:'Vasari India'},
                    {name:'Marble-Finish Tiles',cost:'₹90+',thick:'8–10',install:'Lay tiles on screed with adhesive → grout → seal if matte',maint:'Mop with mild detergent; avoid harsh acids',pros:'Realistic marble aesthetic at fraction of stone cost; durable',cons:'Can feel cold; grout lines visible unless large format',best:'Living room floors, bathroom walls, kitchen backsplash',brands:'Kajaria, Somany, Nitco'},
                    {name:'Premium Finish Laminates',cost:'₹200+',thick:'0.8–1.5',install:'Laminate sheets bonded to substrates with adhesive; edges banded',maint:'Wipe with soft damp cloth; avoid abrasive cleaners',pros:'Wide range of textures; durable scratch-resistant surfaces',cons:'Less rich than real wood/lacquer up close; thin laminates can peel',best:'TV units, wardrobes, kitchen cabinets, accent panels',brands:'Royale Touche Luxury Laminates'}
                ]
            };
        }
    },
    {
        id: 'tiles', title: 'Tiles', template: 'detail-card-image', category: 'Premium Ranked Tables',
        getDefault: function() {
            return {
                title: 'Types of Tiles',
                tableItems: [
                    'Vitrified Tiles||₹60 – ₹250||8–10||Flooring, living rooms, bedrooms, commercial spaces||Kajaria, Somany, Nitco',
                    'Ceramic Tiles||₹30 – ₹120||6–8||Bathroom walls, kitchen backsplashes||Kajaria, Johnson',
                    'Porcelain Tiles||₹80 – ₹300||8–12||Flooring, outdoor areas, bathrooms, facades||Simpolo, Kajaria, RAK Ceramics',
                    'Natural Stone Tiles||₹150 – ₹800||10–20||Flooring, walls, feature areas||Galaxy',
                    'Cement Concrete Tiles||₹150 – ₹400||15–20||Accent flooring, bathrooms, cafes||Bharat Floorings',
                    'Mosaic Tiles||₹200 – ₹800||4–8||Backsplashes, bathrooms, pools||Galaxy'
                ],
                detailItems: [
                    {title:'Vitrified Tiles',rows:[{l:'Material',v:'Highly durable tiles made from clay and silica'},{l:'Types',v:'Double Charged, Full Body, Glazed Vitrified'},{l:'Sizes',v:'600×600, 600×1200, 800×1600'},{l:'Thk',v:'8–10'},{l:'Cost',v:'₹60 – ₹250'},{l:'Installation',v:'Tile adhesive + spacers'},{l:'Maintenance',v:'Easy cleaning, no sealing required'},{l:'Pros',v:'Durable, low maintenance, stain-resistant'},{l:'Cons',v:'Can be slippery, less natural look'},{l:'Best Places',v:'Flooring, living rooms, bedrooms, commercial'},{l:'Brands',v:'Kajaria, Somany, Nitco'}]},
                    {title:'Ceramic Tiles',rows:[{l:'Material',v:'Lightweight tiles made from natural clay'},{l:'Types',v:'Glazed, Unglazed, Digital Printed'},{l:'Sizes',v:'300×300, 300×600'},{l:'Thk',v:'6–8'},{l:'Cost',v:'₹30 – ₹120'},{l:'Installation',v:'Tile adhesive'},{l:'Maintenance',v:'Easy cleaning'},{l:'Pros',v:'Affordable, wide designs, easy installation'},{l:'Cons',v:'Less durable for heavy flooring'},{l:'Best Places',v:'Bathroom walls, kitchen backsplashes'},{l:'Brands',v:'Kajaria, Johnson'}]},
                    {title:'Porcelain Tiles',rows:[{l:'Material',v:'Dense, high-strength tiles with very low water absorption'},{l:'Types',v:'Full Body, Glazed, Matte, Polished'},{l:'Sizes',v:'600×600, 600×1200, 1200×2400'},{l:'Thk',v:'8–12'},{l:'Cost',v:'₹80 – ₹300'},{l:'Installation',v:'Tile adhesive for heavy-duty'},{l:'Maintenance',v:'Low maintenance'},{l:'Pros',v:'Highly durable, water-resistant, versatile'},{l:'Cons',v:'Costlier than ceramic'},{l:'Best Places',v:'Flooring, outdoor areas, bathrooms, facades'},{l:'Brands',v:'Simpolo, Kajaria, RAK Ceramics'}]},
                    {title:'Natural Stone Tiles',rows:[{l:'Material',v:'Tiles from marble, granite, slate, or travertine'},{l:'Types',v:'Marble, Granite, Slate, Travertine'},{l:'Sizes',v:'300×300, 600×600'},{l:'Thk',v:'10–20'},{l:'Cost',v:'₹150 – ₹800'},{l:'Installation',v:'Cement bedding or stone adhesive'},{l:'Maintenance',v:'Sealing required'},{l:'Pros',v:'Natural beauty, premium finish'},{l:'Cons',v:'Requires maintenance, can stain'},{l:'Best Places',v:'Flooring, walls, feature areas'},{l:'Brands',v:'Galaxy'}]},
                    {title:'Cement Concrete Tiles',rows:[{l:'Material',v:'Handmade tiles with pigmented cement, bold patterns'},{l:'Types',v:'Encaustic Tiles, Plain Cement Tiles'},{l:'Sizes',v:'200×200, 300×300'},{l:'Thk',v:'15–20'},{l:'Cost',v:'₹150 – ₹400'},{l:'Installation',v:'Cement bedding'},{l:'Maintenance',v:'Regular sealing required'},{l:'Pros',v:'Unique patterns, artisanal look'},{l:'Cons',v:'Porous, needs sealing'},{l:'Best Places',v:'Accent flooring, bathrooms, cafes'},{l:'Brands',v:'Bharat Floorings'}]},
                    {title:'Mosaic Tiles',rows:[{l:'Material',v:'Small tiles arranged in patterns on mesh sheets'},{l:'Types',v:'Glass, Ceramic, Stone Mosaic'},{l:'Sizes',v:'300×300 sheets'},{l:'Thk',v:'4–8'},{l:'Cost',v:'₹200 – ₹800'},{l:'Installation',v:'Tile adhesive'},{l:'Maintenance',v:'Regular grout cleaning'},{l:'Pros',v:'Decorative, flexible for curved surfaces'},{l:'Cons',v:'Expensive, grout-heavy maintenance'},{l:'Best Places',v:'Backsplashes, bathrooms, pools'},{l:'Brands',v:'Galaxy'}]}
                ]
            };
        }
    },
    {
        id: 'granite', title: 'Granite', template: 'detail-card-image', category: 'Premium Ranked Tables',
        getDefault: function() {
            return {
                title: 'Granites',
                tableItems: [
                    'Black Granite||₹180 – ₹700||16-30||Kitchen countertops, flooring, staircases, wall cladding||RK Marble, Classic Marble Company',
                    'Black Galaxy Granite||₹250 – ₹800||16-30||Kitchen countertops, feature walls, tabletops||RK Marble, Classic Marble Company',
                    'Steel Grey Granite||₹250 – ₹800||16-30||Kitchen countertops, feature walls, tabletops||RK Marble, Classic Marble Company',
                    'Tan Brown Granite||₹140 – ₹350||16-30||Countertops, flooring, staircases||RK Marble, Classic Marble Company',
                    'Viscount White Granite||₹180 – ₹450||16-30||Flooring, kitchen countertops, wall cladding, staircases||RK Marble, Classic Marble Company',
                    'Alaska White Granite||₹250 – ₹700||16-30||Kitchen countertops, islands, feature walls, bathrooms||RK Marble, Classic Marble Company',
                    'Imperial Red Granite||₹140 – ₹350||15–20||Flooring, staircases, exterior cladding, kitchen countertop||RK Marble, Classic Marble Company'
                ],
                detailItems: [
                    {title:'Black Granite',rows:[{l:'Material',v:'Deep black, uniform granite'},{l:'Types',v:'Absolute Black, Premium Black, Jet Black'},{l:'Sizes',v:'Slabs (8–10 ft), Cut sizes (2×2 ft, 2×4 ft)'},{l:'Thk',v:'16–20, 20–30'},{l:'Cost',v:'₹180 – ₹700'},{l:'Installation',v:'Cement mortar or stone adhesive'},{l:'Maintenance',v:'Easy cleaning; occasional sealing'},{l:'Pros',v:'Highly durable, stain-resistant, premium look'},{l:'Cons',v:'Shows dust and fingerprints, limited pattern variation'},{l:'Best Places',v:'Kitchen countertops, flooring, staircases, wall cladding'},{l:'Brands',v:'RK Marble, Classic Marble'}]},
                    {title:'Black Galaxy Granite',rows:[{l:'Material',v:'Deep black with golden and white speckles'},{l:'Types',v:'Small Galaxy, Medium Galaxy, Premium Galaxy'},{l:'Sizes',v:'Slabs (8–10 ft)'},{l:'Thk',v:'16–20, 20–30'},{l:'Cost',v:'₹250 – ₹800'},{l:'Installation',v:'Cement mortar or stone adhesive'},{l:'Maintenance',v:'Easy cleaning; periodic sealing'},{l:'Pros',v:'Luxurious look, durable, unique pattern'},{l:'Cons',v:'Costlier than most granites'},{l:'Best Places',v:'Kitchen countertops, feature walls, tabletops'},{l:'Brands',v:'RK Marble, Classic Marble'}]},
                    {title:'Steel Grey Granite',rows:[{l:'Material',v:'Grey granite with subtle speckled patterns'},{l:'Types',v:'Steel Grey Polished, Steel Grey Leather Finish'},{l:'Sizes',v:'Slabs (8–10 ft)'},{l:'Thk',v:'16–20, 20–30'},{l:'Cost',v:'₹150 – ₹400'},{l:'Installation',v:'Cement mortar or stone adhesive'},{l:'Maintenance',v:'Low maintenance; periodic sealing'},{l:'Pros',v:'Durable, budget-friendly, hides dust well'},{l:'Cons',v:'Less luxurious than marble, limited pattern variation'},{l:'Best Places',v:'Kitchen countertops, feature walls, tabletops'},{l:'Brands',v:'RK Marble, Classic Marble'}]},
                    {title:'Tan Brown Granite',rows:[{l:'Material',v:'Dark brown with black and reddish speckles'},{l:'Types',v:'Tan Brown Classic, Tan Brown Dark'},{l:'Sizes',v:'Slabs (8–10 ft)'},{l:'Thk',v:'16–20, 20–30'},{l:'Cost',v:'₹140 – ₹350'},{l:'Installation',v:'Cement mortar or stone adhesive'},{l:'Maintenance',v:'Easy cleaning; periodic sealing'},{l:'Pros',v:'Affordable, durable, warm tones'},{l:'Cons',v:'Busy pattern may not suit modern interiors'},{l:'Best Places',v:'Countertops, flooring, staircases'},{l:'Brands',v:'RK Marble, Classic Marble'}]},
                    {title:'Viscount White Granite',rows:[{l:'Material',v:'White to light grey with flowing linear black/grey veins'},{l:'Types',v:'Viscount White Classic, Viscount White Premium'},{l:'Sizes',v:'Slabs (8–10 ft, 4–6 ft wide)'},{l:'Thk',v:'16–20, 20–30'},{l:'Cost',v:'₹180 – ₹450'},{l:'Installation',v:'Cement mortar or stone adhesive'},{l:'Maintenance',v:'Easy maintenance; periodic sealing'},{l:'Pros',v:'Marble-like look, durable, cost-effective'},{l:'Cons',v:'Pattern variation between slabs'},{l:'Best Places',v:'Flooring, kitchen countertops, wall cladding, staircases'},{l:'Brands',v:'RK Marble, Classic Marble'}]},
                    {title:'Alaska White Granite',rows:[{l:'Material',v:'Premium white with dramatic grey, black, beige veining'},{l:'Types',v:'Alaska White Standard, Alaska White Premium'},{l:'Sizes',v:'Slabs (8–10 ft, 4–6 ft wide)'},{l:'Thk',v:'16–20, 20–30'},{l:'Cost',v:'₹250 – ₹700'},{l:'Installation',v:'Cement mortar or stone adhesive'},{l:'Maintenance',v:'Periodic sealing; easy to clean'},{l:'Pros',v:'Premium aesthetic, unique patterns, durable'},{l:'Cons',v:'Higher cost, pattern variation between slabs'},{l:'Best Places',v:'Kitchen countertops, islands, feature walls, bathrooms'},{l:'Brands',v:'RK Marble, Classic Marble'}]},
                    {title:'Imperial Red Granite',rows:[{l:'Material',v:'Rich deep red with black and grey crystalline specks'},{l:'Types',v:'Imperial Red, New Imperial Red, Ruby Red'},{l:'Sizes',v:'Slabs (8–10 ft), Cut tiles (2×2 ft, 2×4 ft)'},{l:'Thk',v:'16–20, 20–30'},{l:'Cost',v:'₹140 – ₹350'},{l:'Installation',v:'Cement mortar or stone adhesive'},{l:'Maintenance',v:'Easy maintenance; periodic sealing'},{l:'Pros',v:'Extremely durable, weather-resistant, bold color'},{l:'Cons',v:'Strong color may not suit modern interiors'},{l:'Best Places',v:'Flooring, staircases, exterior cladding, countertops'},{l:'Brands',v:'RK Marble, Classic Marble'}]}
                ]
            };
        }
    },
    {
        id: 'marble-vs-tiles', title: 'Marble vs Tiles', template: 'comparison', category: 'Comparison Tables',
        getDefault: function() {
            return {
                title: 'Comparison: Marble vs Tiles',
                cols: 'Category,Marble,Tiles',
                rows: [
                    ['Material & Make','Natural stone (Italian & Indian marbles)','Manufactured materials (ceramic, vitrified, porcelain, etc.)'],
                    ['Aesthetic','Natural grains, rich veining, luxurious, unique slabs','Printed/textured designs (marble, wood, concrete look)'],
                    ['Size & Thickness','15–22 mm thick; large slabs up to 2m × 3m','3–10 mm thick; modular sizes up to 3m × 3m'],
                    ['Cost','₹200/sqft upwards; premium marbles are expensive','₹60/sqft upwards; more budget-friendly'],
                    ['Applications','Flooring, walls, bathrooms, countertops, feature walls','Flooring, walls, kitchens, bathrooms, outdoor areas'],
                    ['Durability & Water Resistance','Durable but porous; needs sealing','Highly durable, water-resistant, stain-proof'],
                    ['Maintenance & Repairability','Needs polishing; can be repaired','Low maintenance; cannot be repaired'],
                    ['Installation & Speed','Slow; requires skilled labour','Fast; easy installation'],
                    ['Finish & Surface Options','Polished, honed, leather, brushed','Glossy, matte, textured, anti-skid'],
                    ['Joints & Finish Look','Seamless, minimal joints','Visible grout lines'],
                    ['Feel & Consistency','Natural, rich feel; unique','Uniform, consistent'],
                    ['Safety (Slip & Heat)','Heat-resistant; can be slippery','Heat-resistant; anti-skid options available'],
                    ['Best Use Case','Luxury homes, premium spaces','Budget homes, high-traffic areas']
                ]
            };
        }
    },
    {
        id: 'top10', title: 'Top 10 Materials 2026', template: 'top10', category: 'Top 10',
        getDefault: function() {
            return {
                title: 'Top 10 Materials 2026', count: '10',
                tableItems: [
                    'Liquid Metallic Ombre||₹800-₹2500||0.5–1||Feature walls, entry foyers, dining accent walls, bars, powder rooms||Colortale',
                    'Microcement||₹200–₹500||2–3||Floors, walls, bathrooms, furniture||Colortale',
                    'Alabaster Lights||₹12,000 – ₹40,000 / light||5–20||Dining rooms, bedrooms, table lamps, Luxury lounges||World of abner, Mugen Design Lab',
                    'Artistic Acoustic Panels||₹7,000 – ₹14,000||20–50||Home offices, studios, media rooms, living rooms.||Unidus Accoustics',
                    'Textured Lime Plaster||₹40–₹120||8–15||Feature walls, living rooms, hallway||Limocoat',
                    '3D Artwork||₹55,000 +||4–5"||Living room feature wall, Bedroom statement wall||Godai Arts',
                    'Optical Fibre Fabric||varies on request||—||Feature walls in bedrooms, Dining Table Tops||DreamLux',
                    'Venetian Plaster||₹180- ₹400||2–5||Foyer, Dining room, Master bedroom walls||Vasari India',
                    'Flexible MDF Curves||2400 /sheet||4–12||TV units & feature walls||Element Décor',
                    'WALL ACCOUSTIC FLUTED PANELS||₹60+||9–24||Home theatres, Study rooms, Bedrooms, Conference rooms||Unidus Acoustics'
                ],
                detailItems: [
                    'Liquid Metallic Ombre||₹800-₹2500||0.5–1||Prep → primer → base → metallic layers → seal with clear coat||Wipe soft damp microfiber; avoid abrasives||High visual impact; custom gradient effects; seamless finish||Skilled application needed; can show imperfections if not prepped well||Feature walls, entry foyers, dining accent walls, bars, powder rooms||Colortale',
                    'Microcement||₹200–₹500||2–3||Clean → primer → 2-3 base coats → top finish → sealing||Mop neutral pH cleaner; avoid harsh chemicals||Seamless waterproof finish; ultra-thin||Must be applied by experienced skills; can crack if substrate moves||Floors, walls, bathrooms, furniture||Colortale',
                    'Alabaster Lights||₹12,000 – ₹40,000 / light||5–20||Electrical planning → mounting → LED integration & testing||Dust gently with dry or damp cloth||Soft warm glow; strong visual centerpiece||Premium pricing; delicate stone||Dining, bedrooms, table lamps, lounges||World of abner, Mugen Design Lab',
                    'Artistic Acoustic Panels||₹7,000 – ₹14,000||20–50||Mark layout → mount clips → fix panels → seal gaps||Vacuum or gentle brush dusting||Reduces echo; visual design element||Higher cost; needs correct placement for acoustic impact||Home offices, studios, media rooms, living rooms||Unidus Accoustics',
                    'Textured Lime Plaster||₹40–₹120||8–15||Substrate prep → scratch coat → intermediate → final finish → curing||Wipe lightly; avoid harsh solvents||Breathable, sustainable; reduces mould risk||Longer install; requires skilled plasterer||Feature walls, living rooms, hallway||Limocoat',
                    '3D Artwork||₹55,000 +||4–5"||Mounted on prepared wall using heavy-duty anchors & adhesives||Dust gently with soft dry cloth; avoid water||One-of-a-kind luxury focal point; fully customizable||Requires professional installation||Living room, Bedroom, Hotel & reception areas||Godai Arts',
                    'Optical Fibre Fabric||varies on request||—||Stretched or panel-mounted over LED source||Gentle vacuum; dry cloth cleaning||Soft ambient light; futuristic luxury feel||High cost; specialized installation||Bedrooms, Dining Table Tops||DreamLux',
                    'Venetian Plaster||₹180- ₹400||2–5||Wall leveling → primer → 2–3 plaster coats → trowel → burnishing||Damp cloth; avoid abrasives||Luxury stone-like finish without joints; durable breathable||Requires skilled applicators; costlier than paint||Foyer, Dining, Master bedroom walls||Vasari India',
                    'Flexible MDF Curves||2400 /sheet||4–12||Fixed onto curved framework using Marine Fevicol||Dry or lightly damp cloth; protect from moisture||Seamless curves impossible with regular MDF; lightweight||Needs precise surface prep; must be sealed||TV units & feature walls||Element Décor',
                    'WALL ACCOUSTIC FLUTED PANELS||₹60+||9–24||Fixed on wall/battens with adhesive/screws||Vacuum flutes periodically||Enhances sound absorption; modern linear texture||Grooves need regular cleaning||Home theatres, Study, Bedrooms, Conference rooms||Unidus Acoustics'
                ]
            };
        }
    },
    {
        id: 'bed', title: 'Bed Finishes', template: 'furniture-list', category: 'Furniture Finish Tables',
        getDefault: function() {
            return {
                title: 'Bed Finishes', count: '6',
                items: [
                    {name:'PU (Polyurethane) Finish',cost:'₹40 – ₹120 / sq.ft',thk:'0.2–0.5 mm',install:'Spray application in controlled booth',maint:'Wipe with soft dry cloth',pros:'Durable, high-gloss options',cons:'Expensive, professional application needed',bestuse:'Modern bedroom sets, headboards'},
                    {name:'Melamine Finish',cost:'₹30 – ₹80 / sq.ft',thk:'0.1–0.2 mm',install:'Pre-laminated board application',maint:'Wipe with damp cloth',pros:'Affordable, scratch-resistant',cons:'Cannot be repaired, limited finish depth',bestuse:'Kids beds, budget furniture'},
                    {name:'Veneer Finish',cost:'₹80 – ₹300 / sq.ft',thk:'0.5–0.6 mm',install:'Adhesive bonding with pressed finish',maint:'Dust regularly, occasional polish',pros:'Natural wood look, can be refinished',cons:'Requires careful maintenance, costly',bestuse:'Premium beds, master bedrooms'},
                    {name:'Laminate Finish',cost:'₹50 – ₹150 / sq.ft',thk:'0.8–1.5 mm',install:'Bonded to substrate with adhesive',maint:'Wipe with mild cleaner',pros:'Durable, wide design options',cons:'Cannot be repaired, visible seams',bestuse:'Bed frames, side tables'},
                    {name:'Duco Paint',cost:'₹80 – ₹200 / sq.ft',thk:'0.3–0.5 mm',install:'Multiple spray coats with sanding',maint:'Avoid scratches, polish periodically',pros:'Smooth glossy finish, unlimited colors',cons:'Easily scratched, expensive',bestuse:'Designer beds, luxury headboards'},
                    {name:'Fabric Upholstered',cost:'₹150 – ₹500 / sq.ft',thk:'10–50 mm',install:'Padding + fabric stretched over frame',maint:'Vacuum regularly, professional cleaning',pros:'Luxurious look, comfortable headboard',cons:'Stains easily, needs professional cleaning',bestuse:'Master bedrooms, luxury suites'}
                ]
            };
        }
    }
];

// --- Site Content UI ---
function renderSiteContent() {
    const container = document.getElementById('siteContentContainer');
    const search = (document.getElementById('siteContentSearch').value || '').toLowerCase();
    const filter = document.getElementById('siteContentFilter').value;

    const filterEl = document.getElementById('siteContentFilter');
    if (filterEl.options.length <= 1) {
        const cats = {};
        SITE_SECTIONS.forEach(function(s) { cats[s.category] = true; });
        Object.keys(cats).sort().forEach(function(c) {
            var opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            filterEl.appendChild(opt);
        });
    }

    var filtered = SITE_SECTIONS.filter(function(s) {
        if (search && s.title.toLowerCase().indexOf(search) === -1) return false;
        if (filter && s.category !== filter) return false;
        return true;
    });

    if (!filtered.length) {
        container.innerHTML = '<div class="row-repeater-empty">No sections found matching your criteria.</div>';
        return;
    }

    var html = '<div class="preview-table-wrap"><table><thead><tr><th>Section</th><th>Template</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
    filtered.forEach(function(s) {
        var hasOvr = hasSectionOverride(s.id);
        var statusHtml = hasOvr ? '<span class="badge-pill" style="background:#064e3b;color:#6ee7b7">● Override Active</span>' : '<span class="badge-pill" style="background:#1e293b;color:#94a3b8">Default</span>';
        var resetBtn = hasOvr ? '<button class="btn btn-danger btn-xs" onclick="resetSiteSection(\'' + s.id + '\')">Reset</button>' : '';
        html += '<tr>'
            + '<td><strong>' + s.title + '</strong></td>'
            + '<td><span class="badge-pill" style="background:#1e3a5f;color:#60a5fa;font-size:10px">' + s.template + '</span></td>'
            + '<td>' + statusHtml + '</td>'
            + '<td style="display:flex;gap:6px">'
            + '<button class="btn btn-primary btn-xs" onclick="editSiteSection(\'' + s.id + '\')">Edit</button>'
            + resetBtn
            + '</td>'
            + '</tr>';
    });
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

// --- Edit Site Section ---
function editSiteSection(sectionId) {
    var section = SITE_SECTIONS.find(function(s) { return s.id === sectionId; });
    if (!section) return;

    siteContentEditingId = sectionId;
    var data = getSectionOverride(sectionId) || JSON.parse(JSON.stringify(section.getDefault()));

    switchTab('create');
    document.getElementById('templateSelect').value = section.template;
    renderTemplateForm();

    // Clear CMS card editing state
    editingId = null;
    editingTemplate = null;

    setTimeout(function() {
        populateSiteSectionForm(section, data);
    }, 150);
}

function populateSiteSectionForm(section, data) {
    switch (section.template) {
        case 'ranked-table':
            populateRankedTableSection(data);
            break;
        case 'top10':
            populateTop10Section(data);
            break;
        case 'comparison':
            populateComparisonSection(data);
            break;
        case 'detail-card-image':
            populateDetailCardImageSection(section, data);
            break;
        case 'furniture-list':
            populateFurnitureListSection(data);
            break;
        default:
            showStatus('Editor for "' + section.template + '" not yet implemented.', 'error');
    }

    var btn = document.querySelector('#formActions button');
    if (btn) btn.textContent = 'Save Section Override';
}

function saveSiteContentFromForm(sectionId, type, formData) {
    var section = SITE_SECTIONS.find(function(s) { return s.id === sectionId; });
    if (!section) { showStatus('Section not found.', 'error'); return; }

    var overrideData;
    switch (type) {
        case 'ranked-table':
        case 'comparison':
            overrideData = formData;
            break;
        case 'top10':
            overrideData = convertTop10FormToSection(formData);
            break;
        case 'furniture-list':
            overrideData = formData;
            break;
        default:
            overrideData = formData;
    }

    overrideData._edited = new Date().toISOString();
    setSectionOverride(sectionId, overrideData);

    siteContentEditingId = null;
    editingId = null;
    editingTemplate = null;
    document.getElementById('contentForm').reset();
    document.getElementById('templateSelect').value = '';
    document.getElementById('templateFormContainer').innerHTML = '';
    document.getElementById('formActions').classList.add('hidden');
    resetFormState();

    showStatus('"' + section.title + '" override saved!', 'success');
    switchTab('sitecontent');
    renderSiteContent();
}

function convertTop10FormToSection(formData) {
    var tableItems = [];
    var detailItems = [];
    (formData.items || []).forEach(function(item) {
        tableItems.push((item.name||'') + '||' + (item.cost||'') + '||' + (item.thick||'') + '||' + (item.best||'') + '||' + (item.brands||''));
        detailItems.push((item.name||'') + '||' + (item.cost||'') + '||' + (item.thick||'') + '||' + (item.install||'') + '||' + (item.maint||'') + '||' + (item.pros||'') + '||' + (item.cons||'') + '||' + (item.best||'') + '||' + (item.brands||''));
    });
    return {
        title: formData.title,
        count: formData.count,
        columns: formData.columns || {},
        tableItems: tableItems,
        detailItems: detailItems
    };
}

// --- Populate functions for each template ---
function populateRankedTableSection(data) {
    var sf = function(id, val) { var el = document.getElementById(id); if (el) el.value = val || ''; };
    sf('rt_title', data.title);
    sf('rt_count', data.count || String((data.items || []).length));
    window.rankedItems = (data.items || []).map(function(item) {
        return {
            name: item.name || '', cost: item.cost || '', thick: item.thick || '',
            install: item.install || '', maint: item.maint || '',
            pros: item.pros || '', cons: item.cons || '',
            best: item.best || '', brands: item.brands || ''
        };
    });
    renderRankedItems();
}

function populateTop10Section(data) {
    var sf = function(id, val) { var el = document.getElementById(id); if (el) el.value = val || ''; };
    sf('t10_title', data.title || 'Top 10 Materials 2026');
    sf('t10_count', data.count || '10');
    sf('t10_col_cost', (data.columns && data.columns.cost) || '');
    sf('t10_col_thk', (data.columns && data.columns.thick) || '');
    sf('t10_col_install', (data.columns && data.columns.install) || '');
    sf('t10_col_maint', (data.columns && data.columns.maint) || '');
    sf('t10_col_pros', (data.columns && data.columns.pros) || '');
    sf('t10_col_cons', (data.columns && data.columns.cons) || '');
    sf('t10_col_best', (data.columns && data.columns.best) || '');
    sf('t10_col_brands', (data.columns && data.columns.brands) || '');
    window.top10Items = (data.detailItems || []).map(function(item) {
        if (typeof item === 'string') {
            var parts = item.split('||');
            if (parts.length > 9) {
                return {name:parts[0]||'',desc:parts[1]||'',cost:parts[2]||'',thick:parts[3]||'',install:parts[4]||'',maint:parts[5]||'',pros:parts[6]||'',cons:parts[7]||'',best:parts[8]||'',brands:parts[9]||''};
            }
            return {name:parts[0]||'',cost:parts[1]||'',thick:parts[2]||'',install:parts[3]||'',maint:parts[4]||'',pros:parts[5]||'',cons:parts[6]||'',best:parts[7]||'',brands:parts[8]||''};
        }
        return item;
    });
    renderTop10Items();
}

function populateComparisonSection(data) {
    var sf = function(id, val) { var el = document.getElementById(id); if (el) el.value = val || ''; };
    sf('cmp_title', data.title || '');
    sf('cmp_cols', data.cols || '');
    window.cmpRows = (data.rows || []).map(function(r) { return r.slice(); });
    renderCmpRows();
}

function populateFurnitureListSection(data) {
    var sf = function(id, val) { var el = document.getElementById(id); if (el) el.value = val || ''; };
    sf('fl_title', data.title || '');
    sf('fl_count', data.count || String((data.items || []).length));
    window.furnitureItems = (data.items || []).map(function(item) {
        if (typeof item === 'string') {
            var parts = item.split('||');
            return {name:parts[0]||'',cost:parts[1]||'',thick:parts[2]||'',install:parts[3]||'',maint:parts[4]||'',pros:parts[5]||'',cons:parts[6]||'',best:parts[7]||'',brands:parts[8]||'',image:''};
        }
        return normalizeItemEntry(item);
    });
    renderFurnitureItems();
}

function populateDetailCardImageSection(section, data) {
    var container = document.getElementById('templateFormContainer');
    var sectionTitle = data.title || section.title;
    var items = (data.tableItems || []).map(function(ti, idx) {
        var parts = ti.split('||');
        var di = (data.detailItems || [])[idx] || {title:'',rows:[]};
        return {name:parts[0]||'',cost:parts[1]||'',thick:parts[2]||'',places:parts[3]||'',brands:parts[4]||'',detailTitle:di.title||'',detailRows:di.rows||[]};
    });

    window._dciSectionItems = items;
    window._dciSectionTitle = sectionTitle;
    window._dciSectionId = section.id;
    document.getElementById('formActions').classList.add('hidden');

    renderDciSectionEditor();
}

function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function renderDciSectionEditor() {
    var container = document.getElementById('templateFormContainer');
    var items = window._dciSectionItems || [];
    var sectionTitle = window._dciSectionTitle || '';

    var html = '<div class="form-section">';
    html += '<div class="section-title">' + escHtml(sectionTitle) + '</div>';
    html += '<div class="form-grid">';
    html += '<div><label>Section Title</label><input type="text" id="dciSec_title" value="' + escHtml(sectionTitle) + '"></div>';
    html += '<div><label>Item Count</label><input type="text" value="' + items.length + '" readonly style="color:#64748b"></div>';
    html += '</div>';
    html += '<div style="margin-top:16px"><button type="button" class="btn btn-secondary btn-sm" onclick="addDciSectionItem()">+ Add Item</button></div>';
    html += '</div>';

    items.forEach(function(item, i) {
        html += '<div class="form-section" style="border-left:3px solid #3b82f6">';
        html += '<div class="section-title">Item #' + (i+1) + ' <button type="button" class="btn btn-danger btn-xs" onclick="removeDciSectionItem(' + i + ')" style="margin-left:auto">Remove</button></div>';
        html += '<div class="form-grid">';
        html += '<div><label>Material Name</label><input type="text" id="dciSec_name_' + i + '" value="' + escHtml(item.name) + '"></div>';
        html += '<div><label>Cost (Sq.Ft)</label><input type="text" id="dciSec_cost_' + i + '" value="' + escHtml(item.cost) + '"></div>';
        html += '<div><label>Thk (mm)</label><input type="text" id="dciSec_thk_' + i + '" value="' + escHtml(item.thick) + '"></div>';
        html += '<div><label>Best Places</label><input type="text" id="dciSec_places_' + i + '" value="' + escHtml(item.places) + '"></div>';
        html += '<div><label>Brands</label><input type="text" id="dciSec_brands_' + i + '" value="' + escHtml(item.brands) + '"></div>';
        html += '</div>';

        html += '<div style="margin-top:16px"><label>Specification Details</label>';
        html += '<div class="row-repeater" id="dciSec_detailRows_' + i + '">';
        var rows = item.detailRows || [];
        if (!rows.length) {
            html += '<div class="row-repeater-empty">No spec rows yet.</div>';
        } else {
            rows.forEach(function(row, ri) {
                var lbl = row.label || row.l || '';
                var val = row.value || row.v || '';
                html += '<div class="row-repeater-row" style="grid-template-columns:1fr 2fr 40px">';
                html += '<input type="text" value="' + escHtml(lbl) + '" onchange="updateDciSecRow(' + i + ',' + ri + ',\'label\',this.value)" placeholder="Label">';
                html += '<input type="text" value="' + escHtml(val) + '" onchange="updateDciSecRow(' + i + ',' + ri + ',\'value\',this.value)" placeholder="Value">';
                html += '<button type="button" class="delete-btn" onclick="removeDciSecRow(' + i + ',' + ri + ')">×</button></div>';
            });
        }
        html += '<div style="padding:8px 12px;border-top:1px solid rgba(255,255,255,0.04)">';
        html += '<button type="button" class="btn btn-secondary btn-xs" onclick="addDciSecRow(' + i + ')">+ Add Row</button>';
        html += '</div></div></div></div>';
    });

    html += '<div class="form-section"><div class="section-title">Actions</div><div class="btn-group">';
    html += '<button type="button" class="btn btn-primary" onclick="saveDciSection()">Save Section Override</button>';
    html += '<button type="button" class="btn btn-secondary" onclick="cancelSiteEditing()">Cancel</button>';
    html += '</div></div>';

    container.innerHTML = html;
}

function updateDciSecRow(itemIdx, rowIdx, field, val) {
    var items = window._dciSectionItems;
    if (!items[itemIdx] || !items[itemIdx].detailRows[rowIdx]) return;
    // Normalize field names: 'label' stays 'label', 'value' stays 'value'
    items[itemIdx].detailRows[rowIdx][field] = val;
}

function addDciSecRow(itemIdx) {
    if (!window._dciSectionItems[itemIdx]) return;
    if (!window._dciSectionItems[itemIdx].detailRows) window._dciSectionItems[itemIdx].detailRows = [];
    window._dciSectionItems[itemIdx].detailRows.push({label:'',value:''});
    renderDciSectionEditor();
}

function removeDciSecRow(itemIdx, rowIdx) {
    if (window._dciSectionItems[itemIdx]) window._dciSectionItems[itemIdx].detailRows.splice(rowIdx, 1);
    renderDciSectionEditor();
}

function addDciSectionItem() {
    window._dciSectionItems.push({name:'',cost:'',thick:'',places:'',brands:'',detailTitle:'',detailRows:[]});
    renderDciSectionEditor();
}

function removeDciSectionItem(idx) {
    window._dciSectionItems.splice(idx, 1);
    renderDciSectionEditor();
}

function saveDciSection() {
    var items = window._dciSectionItems || [];
    var sectionTitle = document.getElementById('dciSec_title') ? document.getElementById('dciSec_title').value : '';
    var tableItems = [];
    var detailItems = [];

    items.forEach(function(item) {
        tableItems.push((item.name||'') + '||' + (item.cost||'') + '||' + (item.thick||'') + '||' + (item.places||'') + '||' + (item.brands||''));
        detailItems.push({title: item.name || '', rows: (item.detailRows || []).map(function(r) { return {l:r.label||r.l||'',v:r.value||r.v||''}; })});
    });

    var overrideData = { title: sectionTitle, tableItems: tableItems, detailItems: detailItems };
    setSectionOverride(window._dciSectionId, overrideData);
    showStatus('"' + sectionTitle + '" override saved!', 'success');

    siteContentEditingId = null;
    window._dciSectionItems = null;
    window._dciSectionTitle = null;
    window._dciSectionId = null;
    switchTab('sitecontent');
    renderSiteContent();
}

function cancelSiteEditing() {
    siteContentEditingId = null;
    window._dciSectionItems = null;
    window._dciSectionTitle = null;
    window._dciSectionId = null;
    switchTab('sitecontent');
}

function resetSiteSection(sectionId) {
    var section = SITE_SECTIONS.find(function(s) { return s.id === sectionId; });
    if (!section) return;
    if (!confirm('Reset "' + section.title + '" to its original default content?')) return;
    if (!confirm('This will delete the override and restore the original hardcoded content. Continue?')) return;
    removeSectionOverride(sectionId);
    showStatus('"' + section.title + '" has been reset to default.', 'success');
    renderSiteContent();
}

// ============================================================
// VALIDATION FUNCTIONS
// ============================================================

// Validate a single card item against its template schema
function validateCardData(item, templateType) {
    var errors = [];
    if (!item || typeof item !== 'object') return { valid: false, errors: ['Item is null or not an object'] };

    var schema = SCHEMAS[templateType];
    if (!schema) return { valid: false, errors: ['Unknown template type: ' + templateType] };

    var knownKeys = schema.itemKeys || [];
    var entryKeys = schema.itemEntryKeys || [];
    if (entryKeys.length) knownKeys = knownKeys.concat(entryKeys);
    var rowKeys = schema.rowKeys || [];
    if (rowKeys.length) knownKeys = knownKeys.concat(rowKeys);

    // Check for missing required fields
    if (templateType === 'category-grid' && !item.name) errors.push('Missing required field: name');
    if (templateType === 'ranked-table' && !item.title) errors.push('Missing required field: title');
    if (templateType === 'furniture-list' && !item.title) errors.push('Missing required field: title');
    if (templateType === 'data-table' && !item.cols) errors.push('Missing required field: cols');
    if (templateType === 'comparison' && !item.cols) errors.push('Missing required field: cols');
    if (templateType === 'top10' && !item.title) errors.push('Missing required field: title');
    if (templateType === 'detail-card' && !item.title) errors.push('Missing required field: title');

    // Check items array if expected
    if (entryKeys.length && item.items !== undefined) {
        if (!Array.isArray(item.items)) {
            errors.push('items should be an array');
        } else if (item.items.length) {
            item.items.forEach(function(entry, i) {
                if (!entry || typeof entry !== 'object') {
                    errors.push('items[' + i + '] is not an object');
                    return;
                }
                if (entryKeys.indexOf('name') >= 0 && !entry.name) {
                    errors.push('items[' + i + '] missing name');
                }
                if (entryKeys.indexOf('cost') >= 0 && !entry.cost) {
                    errors.push('items[' + i + '] missing cost');
                }
            });
        }
    }

    // Check rows if expected
    if (rowKeys.length && item.rows !== undefined) {
        if (!Array.isArray(item.rows)) {
            errors.push('rows should be an array');
        } else {
            item.rows.forEach(function(row, i) {
                if (!row || typeof row !== 'object') {
                    errors.push('rows[' + i + '] is not an object');
                    return;
                }
                rowKeys.forEach(function(k) {
                    if (k === 'img' && !row.img && !row.image) {
                        errors.push('rows[' + i + '] missing image');
                    }
                    if (k === 'cells' && (!row.cells || !Array.isArray(row.cells))) {
                        errors.push('rows[' + i + '] cells is not an array');
                    }
                    if (k === 'label' && row.label === undefined && row.l === undefined) {
                        errors.push('rows[' + i + '] missing label');
                    }
                    if (k === 'value' && row.value === undefined && row.v === undefined) {
                        errors.push('rows[' + i + '] missing value');
                    }
                });
            });
        }
    }

    return { valid: errors.length === 0, errors: errors };
}

// Validate image paths in all data for consistent category-appropriate paths
function validateImagePaths(allData) {
    var issues = [];
    if (!allData || typeof allData !== 'object') return { valid: false, issues: ['No data provided'] };

    var validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

    function checkPath(path, context) {
        if (!path) return;
        if (path.indexOf('data:image/') === 0) {
            // Base64 image - check it has valid data
            if (path.length < 100) issues.push(context + ': Base64 image appears truncated (' + path.length + ' chars)');
            return;
        }
        if (path.indexOf('assets/') !== 0) {
            issues.push(context + ': Path does not start with assets/: ' + path);
            return;
        }
        var ext = path.substring(path.lastIndexOf('.')).toLowerCase();
        if (validExtensions.indexOf(ext) < 0) {
            issues.push(context + ': Unknown file extension: ' + ext + ' in ' + path);
        }
    }

    Object.keys(allData).forEach(function(type) {
        var items = allData[type] || [];
        items.forEach(function(item, idx) {
            var prefix = type + '[' + idx + ']';
            // Check cover image
            if (item.cover) checkPath(item.cover, prefix + '.cover');
            if (item.image) checkPath(item.image, prefix + '.image');
            if (item.img) checkPath(item.img, prefix + '.img');
            if (item.leftImage) checkPath(item.leftImage, prefix + '.leftImage');
            if (item.rightImage) checkPath(item.rightImage, prefix + '.rightImage');

            // Check items array
            (item.items || []).forEach(function(entry, ei) {
                if (entry.image) checkPath(entry.image, prefix + '.items[' + ei + '].image');
                if (entry.img) checkPath(entry.img, prefix + '.items[' + ei + '].img');
            });

            // Check gallery/images
            (item.gallery || []).forEach(function(g, gi) {
                if (g.img) checkPath(g.img, prefix + '.gallery[' + gi + '].img');
            });
            (item.images || []).forEach(function(g, gi) {
                if (g.img) checkPath(g.img, prefix + '.images[' + gi + '].img');
            });

            // Check rows image
            (item.rows || []).forEach(function(row, ri) {
                if (row.img) checkPath(row.img, prefix + '.rows[' + ri + '].img');
                if (row.image) checkPath(row.image, prefix + '.rows[' + ri + '].image');
            });
        });
    });

    return { valid: issues.length === 0, issues: issues };
}

// Validate table structure (row order, column consistency)
function validateTableStructure(items, templateType) {
    var errors = [];
    if (!items || !Array.isArray(items)) return { valid: false, errors: ['items must be an array'] };

    items.forEach(function(item, idx) {
        var prefix = '[' + idx + ']';

        // Check cols string is consistent with rows
        if (item.cols && item.rows) {
            var colCount = item.cols.split(',').filter(Boolean).length;
            item.rows.forEach(function(row, ri) {
                var cells = row.cells || row;
                if (Array.isArray(cells) && cells.length !== colCount) {
                    errors.push(prefix + '.rows[' + ri + '] has ' + cells.length + ' cells, expected ' + colCount);
                }
                if (Array.isArray(cells) && cells.length > 3 && cells[2] && cells[5] !== undefined) {
                    // Check row order: pros (index 5) should come before cons (index 6)
                    // This is a 7+ column table with pros/cons/bestuse
                    if (cells[5] && cells[6] && cells[7] !== undefined) {
                        var prosIdx = -1, consIdx = -1, bestIdx = -1;
                        var colLabels = item.cols.split(',').map(function(c) { return c.trim().toLowerCase(); });
                        colLabels.forEach(function(cl, ci) {
                            if (cl.indexOf('pros') >= 0 || cl.indexOf('pro') >= 0) prosIdx = ci;
                            if (cl.indexOf('cons') >= 0 || cl.indexOf('con') >= 0) consIdx = ci;
                            if (cl.indexOf('best') >= 0 || cl.indexOf('use') >= 0) bestIdx = ci;
                        });
                        if (prosIdx >= 0 && consIdx >= 0 && bestIdx >= 0) {
                            if (prosIdx > consIdx) errors.push(prefix + ': Pros column (' + prosIdx + ') must come before Cons column (' + consIdx + ')');
                            if (consIdx > bestIdx) errors.push(prefix + ': Cons column (' + consIdx + ') must come before Best Use column (' + bestIdx + ')');
                            if (prosIdx > bestIdx) errors.push(prefix + ': Pros must come before Best Use');
                        }
                    }
                }
            });
        }

        // Check items array row order (pros before cons before best)
        if (item.items && Array.isArray(item.items)) {
            item.items.forEach(function(row, ri) {
                if (row.pros === undefined && row.cons === undefined && row.best === undefined && row.bestuse === undefined) {
                    return; // Not a pros/cons table row
                }
                // Check that fields use canonical names
                if (row.thk !== undefined && row.thick === undefined) {
                    errors.push(prefix + '.items[' + ri + '] uses legacy "thk" instead of "thick"');
                }
                if (row.bestuse !== undefined && row.best === undefined) {
                    errors.push(prefix + '.items[' + ri + '] uses legacy "bestuse" instead of "best"');
                }
                // Check best/bestuse order (just warn if before pros/cons)
                // The actual rendering order is determined by the renderer, not the field position
            });
        }

        // Check gallery/images key consistency
        if (item.images !== undefined && item.items === undefined) {
            errors.push(prefix + ' uses legacy "images" key instead of "items"');
        }

        // Check props use {label,value} instead of {l,v}
        if (item.props && Array.isArray(item.props)) {
            item.props.forEach(function(p, pi) {
                if (p.l !== undefined && p.label === undefined) {
                    errors.push(prefix + '.props[' + pi + '] uses legacy "l" instead of "label"');
                }
                if (p.v !== undefined && p.value === undefined) {
                    errors.push(prefix + '.props[' + pi + '] uses legacy "v" instead of "value"');
                }
            });
        }
    });

    return { valid: errors.length === 0, errors: errors };
}

// Run validation across all stored data
function runFullValidation() {
    return runFullValidationOnData(getAllData());
}

// Run validation on a given data object
function runFullValidationOnData(data) {
    var report = { valid: true, cardErrors: [], tableErrors: [], imageIssues: [] };

    Object.keys(data).forEach(function(type) {
        var items = data[type] || [];
        items.forEach(function(item, idx) {
            var cardResult = validateCardData(item, type);
            if (!cardResult.valid) {
                report.valid = false;
                report.cardErrors.push({ type: type, index: idx, errors: cardResult.errors });
            }
        });

        var tableResult = validateTableStructure(items, type);
        if (!tableResult.valid) {
            report.valid = false;
            report.tableErrors.push({ type: type, errors: tableResult.errors });
        }
    });

    var imgResult = validateImagePaths(data);
    if (!imgResult.valid) {
        report.imageIssues = imgResult.issues;
    }

    return report;
}

// Expose validation functions globally
window.validateCardData = validateCardData;
window.validateImagePaths = validateImagePaths;
window.validateTableStructure = validateTableStructure;
window.runFullValidation = runFullValidation;

// ============================================================
// INIT
// ============================================================
renderTemplateForm();
