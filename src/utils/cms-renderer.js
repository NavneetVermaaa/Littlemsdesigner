(function () {
  'use strict';

  var DATA_KEY = 'template_cms_data';

  function getData() {
    try { return JSON.parse(localStorage.getItem(DATA_KEY)) || {}; } catch (e) { return {}; }
  }

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function imgTag(src, alt, cls) {
    if (!src) return '';
    return '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" class="' + (cls || '') + '" onerror="this.style.display=\'none\'">';
  }

  function normalizeRow(r) {
    if (!r || typeof r !== 'object') return r;
    return {
      name: r.name || '',
      cost: r.cost || '',
      thick: r.thick || r.thk || '',
      install: r.install || '',
      maint: r.maint || '',
      pros: r.pros || '',
      cons: r.cons || '',
      best: r.best || r.bestuse || '',
      brands: r.brands || '',
      image: r.image || r.img || '',
      label: r.label || '',
      value: r.value || r.v || ''
    };
  }

  function normalizeRowArray(arr) {
    return (arr || []).map(function(r) { return normalizeRow(r); });
  }

  window.CMS = {
    // ============================================================
    // CATEGORY GRID (Template 1) - .cat-grid, .cat-card
    // ============================================================
    renderCategoryGrid: function (items) {
      var html = '<div class="sec-head"><span class="sec-title">Browse by Category</span><span class="sec-count">' + items.length + ' categories</span></div>';
      html += '<div class="cat-grid">';
      items.forEach(function (item) {
        html += '<div class="cat-card" onclick="CMS.openCategory(\'' + esc(item.id) + '\')">';
        if (item.img) {
          html += imgTag(item.img, item.name, 'cat-img');
        } else {
          html += '<div class="cat-img coming-soon-bg"></div>';
        }
        html += '<div class="cat-body">';
        html += '<div class="cat-name">' + esc(item.name) + '</div>';
        if (item.desc) html += '<div class="cat-desc">' + esc(item.desc) + '</div>';
        html += '<div class="cat-cta">View Details</div></div></div>';
      });
      html += '</div>';
      return html;
    },

    // ============================================================
    // DATA TABLE (Template 2) - .table-wrap, .custom-table, .detail-tbl
    // ============================================================
    renderDataTable: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '';
      items.forEach(function (item) {
        var cols = (item.cols || '').split(',').map(function (c) { return c.trim(); }).filter(Boolean);
        var rows = item.rows || [];
        var gallery = item.gallery || [];

        html += '<div class="sec-head">';
        html += '<span class="sec-title">' + esc(item.title || 'Data Table') + '</span>';
        html += '<span class="sec-count">' + esc(item.count || rows.length + ' entries') + '</span>';
        html += '</div>';

        if (gallery.length) {
          html += '<div class="mat-image-row">';
          gallery.forEach(function (g) {
            if (g.img) {
              html += '<div class="mat-img-card">';
              html += imgTag(g.img, g.label, '');
              if (g.label) html += '<div class="mat-img-label">' + esc(g.label) + '</div>';
              html += '</div>';
            }
          });
          html += '</div>';
        }

        if (cols.length && rows.length) {
          html += '<div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner detail-tbl">';
          html += '<thead><tr><th style="width:50px;font-size:9px">Photo</th>';
          cols.forEach(function (c) { html += '<th>' + esc(c) + '</th>'; });
          html += '</tr></thead><tbody>';
          rows.forEach(function (row, ri) {
            html += '<tr>';
            html += '<td class="t-th">';
            if (row.img) {
              html += '<div class="thumb-wrap">' + imgTag(row.img, '', 'row-img') + '</div>';
            } else {
              html += '<div class="thumb-wrap"><div class="th-ph">&nbsp;</div></div>';
            }
            html += '</td>';
            (row.cells || []).forEach(function (cell, ci) {
              if (ci === 0) html += '<td><span class="badge">' + esc(cell) + '</span></td>';
              else if (ci === 1) html += '<td class="t-cat">' + esc(cell) + '</td>';
              else if (ci === 2) html += '<td class="t-name">' + esc(cell) + '</td>';
              else if (ci === 4) html += '<td class="t-price">' + esc(cell) + '</td>';
              else if (ci === 5) html += '<td class="t-brand">' + esc(cell) + '</td>';
              else html += '<td>' + esc(cell) + '</td>';
            });
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        }
      });
      return html;
    },

    // ============================================================
    // RANKED TABLE (Template 3) - .exp-look-new style 7-column table
    // ============================================================
    renderRankedTable: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '<div class="exp-look-new">';
      items.forEach(function (item) {
        var rows = item.items || [];
        var label = item.count || rows.length + ' Materials';

        html += '<div class="section">';
        html += '<div class="section-header">';
        html += '<div class="section-title">' + esc(item.title || 'Ranked Table') + '</div>';
        html += '<div class="top-label">' + esc(label) + '</div>';
        html += '</div>';
        html += '<div class="table-wrapper"><table>';
        html += '<colgroup><col class="col-image"><col class="col-sno"><col class="col-material"><col class="col-cost"><col class="col-thk"><col class="col-places"><col class="col-brands"></colgroup>';
        html += '<thead><tr><th>Image</th><th>#</th><th>Material</th><th>Cost (Sq.Ft)</th><th>Thk<br><span style="text-transform:none;letter-spacing:0.5px;white-space:nowrap">(mm)</span></th><th>Best Places to Use</th><th>Brands</th></tr></thead><tbody>';
        rows.forEach(function (r, i) {
          var nr = normalizeRow(r);
          html += '<tr>';
          html += '<td class="img-cell">' + (nr.image ? imgTag(nr.image, nr.name, '') : '') + '</td>';
          html += '<td class="sno-cell">' + (i + 1) + '</td>';
          html += '<td class="material-cell">' + esc(nr.name) + '</td>';
          html += '<td class="cost-cell">' + esc(nr.cost) + '</td>';
          html += '<td class="thk-cell">' + esc(nr.thick) + '</td>';
          html += '<td class="places-cell">' + esc(nr.best) + '</td>';
          html += '<td class="brands-cell">' + esc(nr.brands) + '</td>';
          html += '</tr>';
        });
        html += '</tbody></table></div></div>';
      });
      html += '</div>';
      return html;
    },

    // ============================================================
    // SPEC CARD (Template 4) - .exp-look-new .spec-card detail section
    // ============================================================
    renderSpecCard: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '<div class="exp-look-new">';
      items.forEach(function (item) {
        var rows = item.rows || [];
        html += '<div class="section detail-section">';
        html += '<div class="detail-section-header">';
        html += '<div class="detail-section-title">' + esc(item.sectionTitle || 'Material Detail Specification') + '</div>';
        html += '<div class="detail-section-count">1 Material</div>';
        html += '</div>';
        html += '<div class="spec-card">';
        html += '<div class="spec-image-col">';
        html += '<div class="spec-image-label">Image</div>';
        if (item.image) {
          html += imgTag(item.image, item.title, '');
        } else {
          html += '<div style="padding:20px;color:#999;font-size:11px">No image</div>';
        }
        html += '</div>';
        html += '<div class="spec-table-col">';
        html += '<div class="spec-title-bar"><h2>' + esc(item.title || 'Specification') + '</h2></div>';
        html += '<div class="spec-rows">';
        rows.forEach(function (r) {
          var label = r.label || '';
          var value = r.value || '';
          var cls = r.cls || '';
          html += '<div class="spec-row">';
          html += '<div class="spec-label">' + esc(label) + '</div>';
          html += '<div class="spec-value">' + (cls ? '<span class="' + esc(cls) + '">' + esc(value) + '</span>' : esc(value)) + '</div>';
          html += '</div>';
        });
        html += '</div></div></div></div></div>';
      });
      return html;
    },

    // ============================================================
    // SPEC BOARD (Template 5) - .material-spec-new .mat-board
    // ============================================================
    renderSpecBoard: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '';
      items.forEach(function (item) {
        var props = item.props || [];
        html += '<div class="material-spec-new"><div class="mat-board">';
        if (item.cover) {
          html += '<figure class="mat-board-cover">';
          html += imgTag(item.cover, item.title, '');
          html += '</figure>';
        }
        html += '<header class="mat-board-intro">';
        html += '<h1 class="mat-board-title">' + esc(item.title || 'Spec Board') + '</h1>';
        if (item.subtitle) html += '<p class="mat-board-subtitle">' + esc(item.subtitle) + '</p>';
        html += '</header>';
        html += '<div class="mat-board-spec">';
        props.forEach(function (p) {
          html += '<div class="mat-spec-row">';
          html += '<div class="mat-spec-label">' + esc(p.label || p.l || '') + '</div>';
          html += '<div class="mat-spec-value">' + esc(p.value || p.v || '') + '</div>';
          html += '</div>';
        });
        html += '</div></div></div>';
      });
      return html;
    },

    // ============================================================
    // COMPARISON TABLE (Template 6) - .compare-table
    // ============================================================
    renderComparison: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '';
      items.forEach(function (item) {
        var cols = (item.cols || '').split(',').map(function (c) { return c.trim(); }).filter(Boolean);
        var rows = item.rows || [];
        html += '<div class="sec-head"><span class="sec-title">' + esc(item.title || 'Comparison') + '</span></div>';
        if (cols.length && rows.length) {
          html += '<div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner compare-table">';
          html += '<thead><tr>';
          cols.forEach(function (c) { html += '<th>' + esc(c) + '</th>'; });
          html += '</tr></thead><tbody>';
          rows.forEach(function (r) {
            html += '<tr>';
            (r.cells || []).forEach(function (c, ci) {
              html += '<td' + (ci === 0 ? ' style="font-weight:700;background:var(--light);text-transform:uppercase;font-size:9px;letter-spacing:0.08em"' : '') + '>' + esc(c) + '</td>';
            });
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        }
      });
      return html;
    },

    // ============================================================
    // FURNITURE LIST (Template 7) - .detail-tbl with pros/cons
    // ============================================================
    renderFurnitureList: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '';
      items.forEach(function (item) {
        var rawRows = item.items || [];
        var rows = normalizeRowArray(rawRows);
        html += '<div class="sec-head"><span class="sec-title">' + esc(item.title || 'Furniture List') + '</span>';
        html += '<span class="sec-count">' + esc(item.count || rows.length + ' items') + '</span></div>';
        html += '<div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner detail-tbl">';
        html += '<thead><tr><th style="width:50px">Photo</th><th>#</th><th>Material / Finish</th><th>Cost</th><th>Thickness</th><th>Pros</th><th>Cons</th><th>Best Use</th></tr></thead><tbody>';
        rows.forEach(function (r, i) {
          html += '<tr>';
          html += '<td class="t-th">' + (r.image ? '<div class="thumb-wrap">' + imgTag(r.image, r.name, 'row-img') + '</div>' : '<div class="thumb-wrap"><div class="th-ph">&nbsp;</div></div>') + '</td>';
          html += '<td><span class="list-num">' + String(i + 1).padStart(2, '0') + '</span></td>';
          html += '<td class="td-name">' + esc(r.name) + '</td>';
          html += '<td class="td-cost">' + esc(r.cost) + '</td>';
          html += '<td style="font-size:11px;color:#555">' + esc(r.thick) + '</td>';
          html += '<td class="td-pros">' + esc(r.pros) + '</td>';
          html += '<td class="td-cons">' + esc(r.cons) + '</td>';
          html += '<td class="td-use">' + esc(r.best) + '</td>';
          html += '</tr>';
        });
        html += '</tbody></table></div>';
      });
      return html;
    },

    // ============================================================
    // IMAGE ROW GRID (Template 8) - .mat-image-row
    // ============================================================
    renderImageRow: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var allItems = [];
      items.forEach(function (item) { allItems = allItems.concat(item.items || []); });
      if (!allItems.length) return '<div class="no-results"><p>No images.</p></div>';
      var html = '<div class="mat-image-row">';
      allItems.forEach(function (img) {
        if (img.image) {
          html += '<div class="mat-img-card">';
          html += imgTag(img.image, img.label, '');
          if (img.label) html += '<div class="mat-img-label">' + esc(img.label) + '</div>';
          html += '</div>';
        }
      });
      html += '</div>';
      return html;
    },

    // ============================================================
    // SIDE-BY-SIDE GRID (Template 9) - .st-grid-row
    // ============================================================
    renderSideGrid: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '';
      items.forEach(function (item) {
        var images = item.images || [];
        if (!images.length) return;
        html += '<div class="st-grid-row">';
        images.forEach(function (img) {
          if (img.image) {
            html += imgTag(img.image, '', 'st-grid-img');
          }
        });
        html += '</div>';
      });
      return html;
    },

    // ============================================================
    // TOP 10 MATERIALS (Template 10) - .top10-new
    // ============================================================
    renderTop10: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '<div class="top10-new">';
      items.forEach(function (item) {
        var rawRows = item.items || [];
        var rows = normalizeRowArray(rawRows);
        var cols = item.columns || {};
        var label = item.count || rows.length + ' Materials';

        html += '<div class="section">';
        html += '<div class="section-header">';
        html += '<div class="section-title">' + esc(item.title || 'Top 10') + '</div>';
        html += '<div class="top-label">' + esc(label) + '</div>';
        html += '</div>';
        html += '<div class="table-wrapper"><table>';
        html += '<colgroup><col class="col-image"><col class="col-sno"><col class="col-material"><col class="col-cost"><col class="col-thk"><col class="col-places"><col class="col-brands"></colgroup>';
        html += '<thead><tr>';
        html += '<th>Image</th><th>#</th><th>Material</th>';
        html += '<th>' + esc(cols.cost || 'Cost (Sq.Ft)') + '</th>';
        html += '<th>' + esc(cols.thick || 'Thk (mm)') + '</th>';
        html += '<th>' + esc(cols.best || 'Best Places to Use') + '</th>';
        html += '<th>' + esc(cols.brands || 'Brands') + '</th>';
        html += '</tr></thead><tbody>';
        rows.forEach(function (r, i) {
          html += '<tr>';
          html += '<td class="img-cell">' + (r.image ? imgTag(r.image, r.name, '') : '') + '</td>';
          html += '<td class="sno-cell">' + (i + 1) + '</td>';
          html += '<td class="material-cell">' + esc(r.name) + '</td>';
          html += '<td class="cost-cell">' + esc(r.cost) + '</td>';
          html += '<td class="thk-cell">' + esc(r.thick) + '</td>';
          html += '<td class="places-cell">' + esc(r.best) + '</td>';
          html += '<td class="brands-cell">' + esc(r.brands) + '</td>';
          html += '</tr>';
        });
        html += '</tbody></table></div></div>';

        // Detail spec section
        html += '<div class="section detail-section">';
        html += '<div class="detail-section-header">';
        html += '<div class="detail-section-title">Material Detail Specification</div>';
        html += '<div class="detail-section-count">' + rows.length + ' Materials</div>';
        html += '</div>';

        rows.forEach(function (r) {
          html += '<div class="spec-card">';
          html += '<div class="spec-image-col">';
          html += '<div class="spec-image-label">Image</div>';
          html += r.image ? imgTag(r.image, r.name, '') : '<div style="padding:16px;color:#999;font-size:11px">No image</div>';
          html += '</div>';
          html += '<div class="spec-table-col">';
          html += '<div class="spec-title-bar"><h2>' + esc(r.name) + '</h2></div>';
          html += '<div class="spec-rows">';
          html += '<div class="spec-row"><div class="spec-label">Raw Material Cost</div><div class="spec-value">' + esc(r.cost) + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">Thickness Required</div><div class="spec-value">' + esc(r.thick) + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">Installation Process</div><div class="spec-value">' + esc(r.install) + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">Maintenance</div><div class="spec-value">' + esc(r.maint) + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">\u2713 Pros</div><div class="spec-value"><span class="pros">' + esc(r.pros) + '</span></div></div>';
          html += '<div class="spec-row"><div class="spec-label">\u2715 Cons</div><div class="spec-value"><span class="cons">' + esc(r.cons) + '</span></div></div>';
          html += '<div class="spec-row"><div class="spec-label">Best Places to Use</div><div class="spec-value">' + esc(r.best) + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">Recommended Brands</div><div class="spec-value">' + esc(r.brands) + '</div></div>';
          html += '</div></div></div>';
        });
        html += '</div>';
      });
      html += '</div>';
      return html;
    },

    // ============================================================
    // SPLIT COVER CARD (Template 11) - .cat-split
    // ============================================================
    renderSplitCover: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '<div style="max-width:720px;margin:0 auto">';
      items.forEach(function (item) {
        html += '<div class="cat-card" style="cursor:default">';
        html += '<div class="cat-split">';
        if (item.leftImage) {
          html += imgTag(item.leftImage, item.leftLabel, 'cat-split-img');
        } else {
          html += '<div class="cat-split-img" style="background:#eee"></div>';
        }
        html += '<div class="cat-split-divider"></div>';
        if (item.rightImage) {
          html += imgTag(item.rightImage, item.rightLabel, 'cat-split-img');
        } else {
          html += '<div class="cat-split-img" style="background:#eee"></div>';
        }
        if (item.leftLabel) html += '<div class="cat-split-label-left">' + esc(item.leftLabel) + '</div>';
        if (item.rightLabel) html += '<div class="cat-split-label-right">' + esc(item.rightLabel) + '</div>';
        html += '</div></div>';
      });
      html += '</div>';
      return html;
    },

    // ============================================================
    // DETAIL CARD (Template 12) - .detail-card (no image)
    // ============================================================
    renderDetailCard: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '';
      items.forEach(function (item) {
        html += '<div class="detail-card">';
        html += '<div class="detail-card-head"><h3>' + esc(item.title || 'Detail') + '</h3></div>';
        html += '<div class="detail-card-body">';
        html += '<div class="d-row"><div class="d-label">MATERIAL</div><div class="d-value">' + esc(item.material || '-') + '</div></div>';
        html += '<div class="d-row"><div class="d-label">THICKNESS</div><div class="d-value">' + esc(item.thickness || '-') + '</div></div>';
        html += '<div class="d-row"><div class="d-label">BRANDS</div><div class="d-value">' + esc(item.brands || '-') + '</div></div>';
        html += '<div class="d-row"><div class="d-label">PROS</div><div class="d-value">' + esc(item.pros || '-') + '</div></div>';
        html += '<div class="d-row"><div class="d-label">CONS</div><div class="d-value">' + esc(item.cons || '-') + '</div></div>';
        html += '</div></div>';
      });
      return html;
    },

    // ============================================================
    // DETAIL CARD WITH IMAGE (Template 13) - .material-cards-section .detail-card
    // ============================================================
    renderDetailCardImage: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '<div class="material-cards-section">';
      items.forEach(function (item) {
        var rows = item.rows || [];
        html += '<div class="detail-card">';
        html += '<div class="detail-card-img-wrap">';
        if (item.image) {
          html += imgTag(item.image, item.title, 'detail-card-img');
        } else {
          html += '<div style="padding:20px;color:#999;font-size:11px">No image</div>';
        }
        html += '</div>';
        html += '<div class="detail-card-content">';
        html += '<div class="detail-card-head"><h3>' + esc(item.title || 'Detail') + '</h3></div>';
        html += '<div class="detail-card-body">';
        rows.forEach(function (r) {
          html += '<div class="d-row">';
          html += '<div class="d-label">' + esc(r.label || '') + '</div>';
          html += '<div class="d-value">' + esc(r.value || '') + '</div>';
          html += '</div>';
        });
        html += '</div></div></div>';
      });
      html += '</div>';
      return html;
    },

    // ============================================================
    // MERGED TABLE + LIST VIEW (Template 14) - table + list combo
    // ============================================================
    renderMergedView: function (items) {
      if (!items.length) return '<div class="no-results"><p>No items.</p></div>';
      var html = '';
      items.forEach(function (item) {
        var cols = (item.cols || '').split(',').map(function (c) { return c.trim(); }).filter(Boolean);
        var tableRows = item.tableRows || [];
        var listItems = item.listItems || [];

        if (cols.length && tableRows.length) {
          html += '<div class="sec-head">';
          html += '<span class="sec-title">' + esc(item.title || 'Merged View') + '</span>';
          html += '<span class="sec-count">' + esc(item.tableCount || tableRows.length + ' entries') + '</span></div>';
          html += '<div class="table-wrap" style="margin-bottom:28px"><table>';
          html += '<thead><tr><th style="width:50px;font-size:9px">Photo</th>';
          cols.forEach(function (c) { html += '<th>' + esc(c) + '</th>'; });
          html += '</tr></thead><tbody>';
          tableRows.forEach(function (row) {
            html += '<tr>';
            html += '<td class="t-th">' + (row.img ? '<div class="thumb-wrap">' + imgTag(row.img, '', 'row-img') + '</div>' : '<div class="thumb-wrap"><div class="th-ph">&nbsp;</div></div>') + '</td>';
            (row.cells || []).forEach(function (cell, ci) {
              if (ci === 0) html += '<td><span class="badge">' + esc(cell) + '</span></td>';
              else if (ci === 1) html += '<td class="t-cat">' + esc(cell) + '</td>';
              else if (ci === 2) html += '<td class="t-name">' + esc(cell) + '</td>';
              else if (ci === 4) html += '<td class="t-price">' + esc(cell) + '</td>';
              else if (ci === 5) html += '<td class="t-brand">' + esc(cell) + '</td>';
              else html += '<td>' + esc(cell) + '</td>';
            });
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        }

        if (listItems.length) {
          html += '<div class="sec-head" style="margin-top:8px">';
          html += '<span class="sec-title" style="font-size:20px">' + esc(item.title || 'Merged View') + ' – Detailed Guide</span></div>';
          html += '<div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner">';
          html += '<thead><tr><th>#</th><th>Details</th></tr></thead><tbody>';
          listItems.forEach(function (li, i) {
            html += '<tr><td><span class="list-num">' + String(i + 1).padStart(2, '0') + '</span></td>';
            html += '<td class="t-name">' + esc(li.text || '') + '</td></tr>';
          });
          html += '</tbody></table></div>';
        }
      });
      return html;
    },

    // ============================================================
    // UNIVERSAL RENDERER - dispatches by template type
    // ============================================================
    renderers: {
      'category-grid': 'renderCategoryGrid',
      'data-table': 'renderDataTable',
      'ranked-table': 'renderRankedTable',
      'spec-card': 'renderSpecCard',
      'spec-board': 'renderSpecBoard',
      'comparison': 'renderComparison',
      'furniture-list': 'renderFurnitureList',
      'image-row': 'renderImageRow',
      'side-grid': 'renderSideGrid',
      'top10': 'renderTop10',
      'split-cover': 'renderSplitCover',
      'detail-card': 'renderDetailCard',
      'detail-card-image': 'renderDetailCardImage',
      'merged-view': 'renderMergedView'
    },

    render: function (container, type) {
      var data = getData();
      if (type) {
        var items = data[type] || [];
        var fnName = this.renderers[type];
        if (fnName && this[fnName]) {
          container.innerHTML = this[fnName](items);
        } else {
          container.innerHTML = '<div class="no-results"><h3>Unknown Type</h3><p>No renderer for "' + esc(type) + '".</p></div>';
        }
      } else {
        var html = '';
        var types = Object.keys(data);
        types.forEach(function (t) {
          var items = data[t];
          if (!items || !items.length) return;
          var fnName = this.renderers[t];
          if (fnName && this[fnName]) {
            html += '<div style="margin-top:40px;border-top:2px solid var(--border);padding-top:24px">';
            html += '<h2 style="font-family:\'Playfair Display\',serif;font-size:24px;color:var(--navy);margin-bottom:16px">' + esc(t) + ' (' + items.length + ')</h2>';
            html += this[fnName](items);
            html += '</div>';
          }
        }.bind(this));
        container.innerHTML = html || '<div class="no-results"><p>No CMS data found. Add content via admin.html first.</p></div>';
      }
    },

    openCategory: function (id) {
      var data = getData();
      var matched = null;
      var matchedType = null;
      Object.keys(data).forEach(function (type) {
        data[type].forEach(function (item) {
          if (item.id === id || item._id === id) {
            matched = item;
            matchedType = type;
          }
        });
      });
      if (matched && matchedType) {
        var existing = document.getElementById('detailView');
        var home = document.getElementById('homeView');
        var hero = document.getElementById('heroBanner');
        if (existing && home) {
          home.style.display = 'none';
          existing.style.display = 'block';
          if (hero) hero.style.display = 'none';
          var el = document.getElementById('detailContent');
          var fnName = this.renderers[matchedType];
          if (fnName && this[fnName]) {
            el.innerHTML = this[fnName]([matched]);
          }
        }
      }
    }
  };

})();
