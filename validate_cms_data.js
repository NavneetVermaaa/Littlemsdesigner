// ============================================================
// CMS Data Validation Script
// Run: node validate_cms_data.js
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

// ============================================================
// VALIDATION FUNCTIONS (mirrors admin.html implementation)
// ============================================================

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

    if (templateType === 'category-grid' && !item.name) errors.push('Missing required field: name');
    if (templateType === 'ranked-table' && !item.title) errors.push('Missing required field: title');
    if (templateType === 'furniture-list' && !item.title) errors.push('Missing required field: title');
    if (templateType === 'data-table' && !item.cols) errors.push('Missing required field: cols');
    if (templateType === 'comparison' && !item.cols) errors.push('Missing required field: cols');
    if (templateType === 'top10' && !item.title) errors.push('Missing required field: title');
    if (templateType === 'detail-card' && !item.title) errors.push('Missing required field: title');

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

    if (rowKeys.length && item.rows !== undefined) {
        if (!Array.isArray(item.rows)) {
            errors.push('rows should be an array');
        } else {
            item.rows.forEach(function(row, i) {
                if (!row) {
                    errors.push('rows[' + i + '] is null');
                    return;
                }
                // For 'cells' rowKey, accept either row.cells or row-as-array (comparison tables)
                rowKeys.forEach(function(k) {
                    if (k === 'img' && !row.img && !row.image) {
                        errors.push('rows[' + i + '] missing image');
                    }
                    if (k === 'cells') {
                        var hasCells = Array.isArray(row.cells) || Array.isArray(row);
                        if (!hasCells) errors.push('rows[' + i + '] cells is not an array');
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

function validateImagePaths(allData) {
    var issues = [];
    if (!allData || typeof allData !== 'object') return { valid: false, issues: ['No data provided'] };

    var validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

    function checkPath(path, context) {
        if (!path) return;
        if (path.indexOf('data:image/') === 0) {
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
            if (item.cover) checkPath(item.cover, prefix + '.cover');
            if (item.image) checkPath(item.image, prefix + '.image');
            if (item.img) checkPath(item.img, prefix + '.img');
            if (item.leftImage) checkPath(item.leftImage, prefix + '.leftImage');
            if (item.rightImage) checkPath(item.rightImage, prefix + '.rightImage');

            (item.items || []).forEach(function(entry, ei) {
                if (!entry || typeof entry !== 'object') return;
                if (entry.image) checkPath(entry.image, prefix + '.items[' + ei + '].image');
                if (entry.img) checkPath(entry.img, prefix + '.items[' + ei + '].img');
            });

            (item.gallery || []).forEach(function(g, gi) {
                if (!g || typeof g !== 'object') return;
                if (g.img) checkPath(g.img, prefix + '.gallery[' + gi + '].img');
            });
            (item.images || []).forEach(function(g, gi) {
                if (!g || typeof g !== 'object') return;
                if (g.img) checkPath(g.img, prefix + '.images[' + gi + '].img');
            });

            (item.rows || []).forEach(function(row, ri) {
                if (!row || typeof row !== 'object') return;
                if (row.img) checkPath(row.img, prefix + '.rows[' + ri + '].img');
                if (row.image) checkPath(row.image, prefix + '.rows[' + ri + '].image');
            });
        });
    });

    return { valid: issues.length === 0, issues: issues };
}

function validateTableStructure(items, templateType) {
    var errors = [];
    if (!items || !Array.isArray(items)) return { valid: false, errors: ['items must be an array'] };

    items.forEach(function(item, idx) {
        var prefix = '[' + idx + ']';

        if (item.cols && item.rows) {
            var colCount = item.cols.split(',').filter(Boolean).length;
            item.rows.forEach(function(row, ri) {
                if (!row || typeof row !== 'object') return;
                var cells = row.cells;
                if (cells === undefined && Array.isArray(row)) cells = row;
                if (cells !== undefined && Array.isArray(cells) && cells.length !== colCount) {
                    errors.push(prefix + '.rows[' + ri + '] has ' + cells.length + ' cells, expected ' + colCount);
                }
                if (Array.isArray(cells) && cells.length > 3 && cells[2] && cells[5] !== undefined) {
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

        if (item.items && Array.isArray(item.items)) {
            item.items.forEach(function(row, ri) {
                if (!row || typeof row !== 'object') return;
                if (Array.isArray(row)) return;
                if (row.pros === undefined && row.cons === undefined && row.best === undefined && row.bestuse === undefined) {
                    return;
                }
                if (row.thk !== undefined && row.thick === undefined) {
                    errors.push(prefix + '.items[' + ri + '] uses legacy "thk" instead of "thick"');
                }
                if (row.bestuse !== undefined && row.best === undefined) {
                    errors.push(prefix + '.items[' + ri + '] uses legacy "bestuse" instead of "best"');
                }
            });
        }

        if (item.images !== undefined && item.items === undefined) {
            errors.push(prefix + ' uses legacy "images" key instead of "items"');
        }

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

function runFullValidationOnData(data) {
    var report = { valid: true, cardErrors: [], tableErrors: [], imageIssues: [] };
    var cardTotal = 0;

    Object.keys(data).forEach(function(type) {
        var items = data[type] || [];
        cardTotal += items.length;
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

    report.totalCards = cardTotal;
    return report;
}

// ============================================================
// TEST DATA CONSTRUCTION
// ============================================================

// Build data from SITE_SECTIONS defaults (real-world data patterns)
var SITE_SECTIONS_DEFAULTS = {
    'ranked-table': [
        {
            title: 'Materials That Look ₹50L+ But Cost Under ₹50K',
            count: '3',
            items: [
                {name:'Venetian Plaster Paint',cost:'₹180 – ₹350',thick:'1–3',install:'Prep wall → apply base coat → apply texture/Venetian layers → seal',maint:'Wipe dust lightly; reseal every few years',pros:'Luxurious depth and dimension like stone; customizable',cons:'Requires skilled applicator; not ideal for high-moisture areas',best:'Living room accent walls, hotel lobbies, foyer',brands:'Vasari India'},
                {name:'Marble-Finish Tiles',cost:'₹90+',thick:'8–10',install:'Lay tiles on screed with adhesive → grout → seal if matte',maint:'Mop with mild detergent; avoid harsh acids',pros:'Realistic marble aesthetic at fraction of stone cost; durable',cons:'Can feel cold; grout lines visible unless large format',best:'Living room floors, bathroom walls, kitchen backsplash',brands:'Kajaria, Somany, Nitco'},
                {name:'Premium Finish Laminates',cost:'₹200+',thick:'0.8–1.5',install:'Laminate sheets bonded to substrates with adhesive; edges banded',maint:'Wipe with soft damp cloth; avoid abrasive cleaners',pros:'Wide range of textures; durable scratch-resistant surfaces',cons:'Less rich than real wood/lacquer up close; thin laminates can peel',best:'TV units, wardrobes, kitchen cabinets, accent panels',brands:'Royale Touche Luxury Laminates'}
            ]
        }
    ],
    'comparison': [
        {
            title: 'Comparison: Marble vs Tiles',
            cols: 'Category,Marble,Tiles',
            rows: [
                ['Material & Make','Natural stone','Manufactured materials'],
                ['Cost','₹200/sqft upwards','₹60/sqft upwards'],
                ['Durability','Durable but porous','Highly durable, water-resistant']
            ]
        }
    ],
    'detail-card-image': [
        {
            title: 'Types of Tiles',
            items: [
                {name:'Vitrified Tiles',cost:'₹60 – ₹250',thick:'8–10',best:'Flooring, living rooms',brands:'Kajaria',rows:[{label:'Material',value:'Clay and silica'},{label:'Pros',value:'Durable'},{label:'Cons',value:'Slippery'}]},
                {name:'Ceramic Tiles',cost:'₹30 – ₹120',thick:'6–8',best:'Bathroom walls',brands:'Johnson',rows:[{label:'Material',value:'Natural clay'},{label:'Pros',value:'Affordable'},{label:'Cons',value:'Less durable'}]}
            ]
        }
    ],
    'furniture-list': [
        {
            title: 'Bed Finishes', count: '6',
            items: [
                {name:'PU (Polyurethane) Finish',cost:'₹40 – ₹120 / sq.ft',thk:'0.2–0.5 mm',install:'Spray application in controlled booth',maint:'Wipe with soft dry cloth',pros:'Durable, high-gloss options',cons:'Expensive, professional application needed',bestuse:'Modern bedroom sets, headboards'},
                {name:'Melamine Finish',cost:'₹30 – ₹80 / sq.ft',thk:'0.1–0.2 mm',install:'Pre-laminated board application',maint:'Wipe with damp cloth',pros:'Affordable, scratch-resistant',cons:'Cannot be repaired, limited finish depth',bestuse:'Kids beds, budget furniture'},
                {name:'Veneer Finish',cost:'₹80 – ₹300 / sq.ft',thk:'0.5–0.6 mm',install:'Adhesive bonding with pressed finish',maint:'Dust regularly, occasional polish',pros:'Natural wood look, can be refinished',cons:'Requires careful maintenance, costly',bestuse:'Premium beds, master bedrooms'}
            ]
        }
    ]
};

// Add malformed data to test error detection
var MALFORMED_DATA = {
    'ranked-table': [
        {
            title: '',  // Missing title
            items: [
                {cost:'₹100',thick:'5',pros:'Good',cons:'Bad',best:'Everywhere'},  // Missing name
                null,  // Malformed row
                {name:'Test',cost:'₹200',thk:'10',bestuse:'test'}  // Legacy keys
            ]
        }
    ],
    'data-table': [
        {
            title: 'Broken Table',
            cols: 'Name,Price,Brand',
            rows: [
                {img:'', cells:['Item A','₹100']},  // Wrong cell count (2 vs 3)
                {},  // Missing cells
                {img:'', cells:['Item B','₹200','Brand X']}  // Correct
            ],
            images: [  // Legacy key (should be items or gallery)
                {img: 'data:image/png;base64,iVBORw0KGgo='}  // Truncated base64
            ]
        }
    ],
    'spec-board': [
        {
            title: 'Test Spec Board',
            props: [
                {l:'Material', v:'Test'},  // Legacy keys
                {l:'Cost', v:'₹100'},
                {l:'', v:''}  // Empty
            ]
        }
    ],
    'furniture-list': [
        {
            title: 'Test Legacy',
            items: [
                {name:'Item 1',cost:'₹100',thk:'5mm',pros:'Good',cons:'Bad',bestuse:'Floor'},
                {name:'Item 2',cost:'₹200',thk:'10mm',pros:'Nice',cons:'Costly',bestuse:'Wall'}
            ]
        }
    ]
};

// ============================================================
// RUN VALIDATION
// ============================================================

console.log('============================================');
console.log('CMS DATA VALIDATION REPORT');
console.log('============================================\n');

// Test 1: Clean data (real-world patterns)
console.log('--- Test 1: Real-World Data Patterns ---');
var result1 = runFullValidationOnData(SITE_SECTIONS_DEFAULTS);
printReport(result1);

// Test 2: Malformed data
console.log('\n--- Test 2: Malformed / Legacy Data ---');
var result2 = runFullValidationOnData(MALFORMED_DATA);
printReport(result2);

// Test 3: Combined
console.log('\n--- Test 3: Combined Dataset ---');
var combined = {};
Object.keys(SITE_SECTIONS_DEFAULTS).forEach(function(k) { combined[k] = SITE_SECTIONS_DEFAULTS[k].slice(); });
Object.keys(MALFORMED_DATA).forEach(function(k) {
    if (!combined[k]) combined[k] = [];
    combined[k] = combined[k].concat(MALFORMED_DATA[k]);
});
var result3 = runFullValidationOnData(combined);
printReport(result3);

console.log('\n============================================');
console.log('VALIDATION SUMMARY');
console.log('============================================');

var totalCards = Object.keys(combined).reduce(function(sum, t) { return sum + combined[t].length; }, 0);
var totalErrors = result3.cardErrors.length + result3.tableErrors.length + result3.imageIssues.length;

console.log('Total cards validated: ' + totalCards);
console.log('Total issues found:    ' + totalErrors);
if (totalErrors > 0) {
    console.log('\nBreakdown:');
    console.log('  Card schema errors:  ' + result3.cardErrors.length);
    console.log('  Table structure:     ' + result3.tableErrors.length);
    console.log('  Image path issues:   ' + result3.imageIssues.length);
}

console.log('\n=== VERDICT ===');
if (totalErrors === 0) {
    console.log('ALL CLEAN - No issues detected.');
} else {
    console.log('ISSUES DETECTED - Review report above.');
}

console.log('\n(To test actual browser localStorage data,');
console.log(' open admin.html, paste the export JSON into');
console.log(' the Import tab, or call runFullValidation()');
console.log(' from the browser console.)\n');

// ============================================================
// REPORT HELPER
// ============================================================
function printReport(report) {
    console.log('Cards processed: ' + report.totalCards);

    if (report.cardErrors.length) {
        console.log('\n  CARD SCHEMA ERRORS:');
        report.cardErrors.forEach(function(ce) {
            console.log('    [' + ce.type + '#' + ce.index + ']');
            ce.errors.forEach(function(e) { console.log('      - ' + e); });
        });
    } else {
        console.log('  Card schemas: OK');
    }

    if (report.tableErrors.length) {
        console.log('\n  TABLE STRUCTURE ISSUES:');
        report.tableErrors.forEach(function(te) {
            console.log('    [' + te.type + ']');
            te.errors.forEach(function(e) { console.log('      - ' + e); });
        });
    } else {
        console.log('  Table structures: OK');
    }

    if (report.imageIssues.length) {
        console.log('\n  IMAGE PATH ISSUES:');
        report.imageIssues.forEach(function(issue) {
            console.log('    - ' + issue);
        });
    } else {
        console.log('  Image paths: OK');
    }
}

// ============================================================
// INDIVIDUAL VALIDATOR TESTS
// ============================================================

console.log('\n============================================');
console.log('INDIVIDUAL VALIDATOR UNIT TESTS');
console.log('============================================\n');

// validateCardData tests
console.log('--- validateCardData() ---');
var testItems = [
    { input: null, type: 'ranked-table', expect: false },
    { input: {title: 'Test', items: [{name:'A',cost:'₹100'}]}, type: 'ranked-table', expect: true },
    { input: {title: '', items: [{cost:'₹100'}]}, type: 'ranked-table', expect: false },
    { input: {title: 'Test', items: [{name:'A'}]}, type: 'ranked-table', expect: false },
    { input: {title: 'Test', items: [null]}, type: 'ranked-table', expect: false },
];
testItems.forEach(function(tc, i) {
    var r = validateCardData(tc.input, tc.type);
    var pass = r.valid === tc.expect;
    console.log('  Test ' + (i+1) + ': ' + (pass ? 'PASS' : 'FAIL') + ' (expected valid=' + tc.expect + ', got ' + r.valid + ')');
    if (!pass) console.log('    Errors: ' + JSON.stringify(r.errors));
});

// validateTableStructure tests
console.log('\n--- validateTableStructure() ---');
var tableTests = [
    {
        desc: 'Legacy keys detected (thk, bestuse, {l,v})',
        data: [{
            title: 'Test',
            items: [{name:'A',cost:'₹100',thk:'5',pros:'G',cons:'B',bestuse:'Floor'}],
            props: [{l:'Label',v:'Value'}]
        }],
        expect: 4  // thk + bestuse + l + v = 4 errors
    },
    {
        desc: 'Legacy images key',
        data: [{title:'T', images: [{img:'test.jpg'}]}],
        expect: 1
    },
    {
        desc: 'Column count mismatch',
        data: [{title:'T', cols:'A,B,C', rows: [{cells:['1','2']}]}],
        expect: 1
    },
    {
        desc: 'Normalized data clean',
        data: [{title:'T', items: [{name:'A',cost:'₹100',thick:'5',pros:'G',cons:'B',best:'Floor',brands:'X'}]}],
        expect: 0
    }
];
tableTests.forEach(function(tc) {
    var r = validateTableStructure(tc.data, 'furniture-list');
    var pass = r.errors.length === tc.expect;
    console.log('  ' + tc.desc + ': ' + (pass ? 'PASS' : 'FAIL'));
    if (!pass) {
        console.log('    Expected ' + tc.expect + ' errors, got ' + r.errors.length);
        r.errors.forEach(function(e) { console.log('      - ' + e); });
    }
});

// validateImagePaths tests
console.log('\n--- validateImagePaths() ---');
var imgTests = [
    {
        desc: 'Valid asset path',
        data: {'test': [{img:'assets/images/test.jpg'}]},
        expect: 0
    },
    {
        desc: 'Invalid path (no assets/)',
        data: {'test': [{img:'images/test.jpg'}]},
        expect: 1
    },
    {
        desc: 'Truncated base64 (<100 chars)',
        data: {'test': [{img:'data:image/png;base64,abc123'}]},
        expect: 1
    },
    {
        desc: 'Normal base64 (>100 chars)',
        data: {'test': [{img:'data:image/png;base64,' + 'A'.repeat(150)}]},
        expect: 0
    }
];
imgTests.forEach(function(tc) {
    var r = validateImagePaths(tc.data);
    var pass = r.issues.length === tc.expect;
    console.log('  ' + tc.desc + ': ' + (pass ? 'PASS' : 'FAIL'));
    if (!pass) {
        console.log('    Expected ' + tc.expect + ' issues, got ' + r.issues.length);
        r.issues.forEach(function(i) { console.log('      - ' + i); });
    }
});

console.log('\n============================================');
console.log('ALL TESTS COMPLETE');
console.log('============================================');
