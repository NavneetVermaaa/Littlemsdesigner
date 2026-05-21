(function() {
    'use strict';
    var PREFIX = 'cms_override_';

    function has(id) { try { return localStorage.getItem(PREFIX + id) !== null; } catch(e) { return false; } }
    function get(id) { try { return JSON.parse(localStorage.getItem(PREFIX + id)); } catch(e) { return null; } }

    function toPipe(arr) {
        if (!arr || !arr.items) return arr;
        return { title: arr.title, items: arr.items.map(function(i) {
            return [i.name,i.cost,i.thk,i.install,i.maint,i.pros,i.cons,i.bestuse].join('||');
        })};
    }

    function apply() {
        // Intercept listData
        if (typeof listData !== 'undefined') {
            ['bed','door','headboard','sidetable','study','dresser','wardrobe','wardrobe-must',
             'tvunit','kitchen-shutter','kitchen-must','limewash','limeplaster','venetian','microcement',
             'clay','metallic','laminate-types','designer-veneer','types-of-laminates','types-of-plywood',
             'tiles','granite','quartz','quartzite','mirror','glass','laminates','veneer','plywood',
             'wood-types','kitchen-counter','italian-marbles','indian-marbles','marbles','top10']
            .forEach(function(k) {
                if (has(k)) {
                    var ov = get(k);
                    if (ov && ov.tableItems && ov.detailItems) {
                        listData[k] = { title: ov.title || '', tableItems: ov.tableItems, detailItems: ov.detailItems };
                    } else if (ov && ov.items && typeof ov.items[0] === 'object') {
                        listData[k] = toPipe(ov);
                    }
                }
            });
        }

        // Intercept compareData
        if (typeof compareData !== 'undefined') {
            ['marble-vs-tiles','compare-stone','lam-vs-veneer','compare-special','plywood-guide','plywood-materials']
            .forEach(function(k) {
                if (has(k)) { var ov = get(k); if (ov && ov.cols && ov.rows) compareData[k] = ov; }
            });
        }

        // Intercept tableData
        if (typeof tableData !== 'undefined') {
            ['flooring','wall','ceiling','glass-summary','marble-summary','plywood-summary','overview']
            .forEach(function(k) {
                if (has(k)) { var ov = get(k); if (ov && ov.cols && ov.rows) tableData[k] = ov; }
            });
        }

        // Intercept detailData
        if (typeof detailData !== 'undefined') {
            ['microcement','limewash','limeplaster','venetian','clay','metallic']
            .forEach(function(k) {
                if (has(k)) { var ov = get(k); if (ov && ov.props) detailData[k] = { title: ov.title, props: ov.props }; }
            });
        }

        // Override renderNewExpLook
        if (typeof renderNewExpLook === 'function' && has('exp-look')) {
            var orig = window.renderNewExpLook;
            window.renderNewExpLook = function(el) {
                var ov = get('exp-look');
                if (ov && ov.items && ov.items.length) { renderExpLook(el, ov); return; }
                orig(el);
            };
        }
    }

    function escape(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

    function renderExpLook(el, data) {
        if (!el) el = document.getElementById('expNewLookSection');
        if (!el) return;
        var items = data.items || [];
        var h = '<div class="exp-look-wrapper"><div class="exp-look-container">';
        h += '<div class="exp-look-header"><h2 class="section-title">' + escape(data.title || 'Materials That Look Expensive') + '</h2></div>';
        h += '<div class="exp-look-table-wrap"><table class="exp-look-table"><thead><tr><th>S.No</th><th>Material</th><th>Cost</th><th>Thk</th><th>Best Places</th><th>Brands</th></tr></thead><tbody>';
        items.forEach(function(item, i) {
            h += '<tr><td>' + (i+1) + '</td><td class="material-name">' + escape(item.name) + '</td><td class="cost">' + escape(item.cost) + '</td><td>' + escape(item.thick) + '</td><td class="best-use">' + escape(item.best) + '</td><td class="brands">' + escape(item.brands) + '</td></tr>';
        });
        h += '</tbody></table></div><div class="spec-card-section">';
        items.forEach(function(item) {
            h += '<div class="spec-main-card"><div class="spec-card-inner"><div class="spec-card-detail-col">';
            h += '<h3 class="spec-card-title">' + escape(item.name) + '</h3><div class="spec-rows">';
            [['Raw Material Cost',item.cost],['Thickness Required',item.thick],['Installation Process',item.install],
             ['Maintenance',item.maint],['Best Places to Use',item.best],['Pros',item.pros],['Cons',item.cons],
             ['Recommended Brands',item.brands]].forEach(function(f) {
                if (f[1]) h += '<div class="spec-row"><span class="spec-label">' + f[0] + '</span><span class="spec-value">' + escape(f[1]) + '</span></div>';
            });
            h += '</div></div></div></div>';
        });
        h += '</div></div></div>';
        el.innerHTML = h;
    }

    window.CMSBridge = { hasOverride: has, getOverride: get, apply: apply, PREFIX: PREFIX };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
