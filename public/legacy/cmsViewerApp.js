function init() {
            var data = (function() {
                try { return JSON.parse(localStorage.getItem('template_cms_data')) || {}; } catch(e) { return {}; }
            })();
            var types = Object.keys(data);
            if (!types.length) {
                document.getElementById('contentArea').innerHTML =
                    '<div class="badge-empty"><h3 style="font-family:\'Playfair Display\',serif;font-size:28px;color:var(--navy)">No Content</h3>' +
                    '<p>No CMS data found. Go to <strong>admin.html</strong> to create content first.</p></div>';
                return;
            }
            var navBar = document.getElementById('navBar');
            var allBtn = document.createElement('button');
            allBtn.className = 'nav-btn active';
            allBtn.textContent = 'All (' + types.reduce(function(s, t) { return s + data[t].length; }, 0) + ')';
            allBtn.onclick = function() { setActive(this); renderAll(); };
            navBar.appendChild(allBtn);

            var templateLabels = {
                'category-grid': 'Category Grid', 'data-table': 'Data Table', 'ranked-table': 'Ranked Table',
                'spec-card': 'Spec Card', 'spec-board': 'Spec Board', 'comparison': 'Comparison',
                'furniture-list': 'Furniture List', 'image-row': 'Image Row', 'side-grid': 'Side Grid',
                'top10': 'Top 10', 'split-cover': 'Split Cover', 'detail-card': 'Detail Card',
                'detail-card-image': 'Detail Card w/ Image', 'merged-view': 'Merged View'
            };

            types.forEach(function(type) {
                var count = data[type].length;
                var btn = document.createElement('button');
                btn.className = 'nav-btn';
                btn.textContent = (templateLabels[type] || type) + ' (' + count + ')';
                btn.dataset.type = type;
                btn.onclick = function() {
                    setActive(this);
                    var el = document.getElementById('contentArea');
                    window.CMS.render(el, this.dataset.type);
                };
                navBar.appendChild(btn);
            });

            renderAll();

            function setActive(btn) {
                navBar.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
            }

            function renderAll() {
                var el = document.getElementById('contentArea');
                document.getElementById('homeView').style.display = 'block';
                document.getElementById('detailView').style.display = 'none';
                window.CMS.render(el);
            }
        }

        function goHome() {
            document.getElementById('homeView').style.display = 'block';
            document.getElementById('detailView').style.display = 'none';
        }

        

window.initCmsViewer = init;
