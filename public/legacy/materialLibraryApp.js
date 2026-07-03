// Fix table overflow - scale table to fit viewport
    (function fitTableMobile() {
      function scaleTable() {
        if (window.innerWidth <= 768) {
          document.querySelectorAll('.table-wrap, .table-responsive').forEach(function (wrap) {
            if (wrap.classList.contains('bootstrap-test') || wrap.classList.contains('bootstrap-exp') || wrap.classList.contains('custom-table') || wrap.classList.contains('exp-responsive')) return;
            var table = wrap.querySelector('table');
            if (table) {
              var tableWidth = table.offsetWidth;
              var screenWidth = window.innerWidth;
              var scale = screenWidth / tableWidth;
              if (scale < 1) {
                scale = Math.max(scale, 0.5); // Don't scale below 50%
                wrap.style.overflowX = 'hidden';
                wrap.style.width = screenWidth + 'px';
                table.style.transform = 'scaleX(' + scale + ')';
                table.style.transformOrigin = 'left top';
                table.style.width = (tableWidth * scale) + 'px';
              }
            }
          });
        } else {
          // Reset on larger screens
          document.querySelectorAll('.table-wrap table').forEach(function (table) {
            if (table.closest('.bootstrap-test') || table.closest('.bootstrap-exp') || table.closest('.custom-table') || table.closest('.exp-responsive')) return;
            table.style.transform = '';
            table.style.transformOrigin = '';
            table.style.width = '';
          });
        }
      }
      // Run multiple times
      scaleTable();
      setTimeout(scaleTable, 100);
      setTimeout(scaleTable, 300);
      window.addEventListener('resize', scaleTable);
      new MutationObserver(function () { setTimeout(scaleTable, 100); })
        .observe(document.body, { childList: true, subtree: true });
    })();

    // Dark mode toggle
    (function () {
      const toggle = document.getElementById('darkModeToggle');
      if (toggle) {
        // Load saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
          document.body.classList.add('dark-mode');
          toggle.textContent = '☀️';
        }
        toggle.addEventListener('click', function () {
          const isDark = document.body.classList.toggle('dark-mode');
          toggle.textContent = isDark ? '☀️' : '🌙';
          localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        });
      }
    })();

    /**
     * ============================================================
     * 📸 IMAGE MAINTENANCE GUIDE (FOR NON-CODERS)
     * ============================================================
     * To update images in this library, follow these simple steps:
     *
     * 1. HOMEPAGE COVERS:
     *    - Go to: /assets/1.Cover Images/
     *    - Replace the image file with a new one using the SAME NAME (e.g., "1.Flooring Finishes Cover.jpg").
     *
     * 2. MATERIAL THUMBNAILS (Inside the Tables):
     *    - Find the folder for your category (e.g., "19. Tiles").
     *    - Name your image like this: [Index].[Material Name].jpg
     *    - Example: "1.Vitrified Tiles.jpg" or "2. Ceramic Tiles.jpg".
     *
     * 3. ADDING NEW FOLDERS:
     *    - If you add a new category folder, update the "FOLDER_MAP" section below.
     * ============================================================
     */

    const IMAGE_SETTINGS = {
      // Maps the category text to the filename in "1.Cover Images"
      COVERS: {
        "Flooring Finishes": "1.Flooring Finishes Cover.jpg",
        "Wall Finishes": "2.Wall Finishes.jpg",
        "False Ceiling Finishes": "3.False Ceiling Finishes.jpeg",
        "Door Finishes": "4.Door Finishes.jpg",
        "Bed Finishes": "5.Bed Finishes.jpg",
        "Headboard Finishes": "6.Headboard Finishes.jpg",
        "Side Table Finishes": "7.Side Table Finishes.jpg",
        "Study Table Finishes": "8.Study table.jpg",
        "Dresser Table Finishes": "9.Dresser Table Finishes.jpg",
        "Wardrobe Shutter Finishes": "10. Wardrobe Shutter Finishes.jpg",
        "5 Wardrobe Must Haves": "11. 5 Wardrobe Must Haves.jpg",
        "TV Unit Finishes": "12.TV Unit Finishes.jpg",
        "Kitchen Counter Top": "13. Kitchen Counter Top.jpg",
        "Kitchen Shutter Finishes": "14. Kitchen Shutters.jpg",
        "5 Kitchen Must Haves": "15. Kitchen Must Haves.jpg",
        "Lime Wash": "16. Limewash.jpg",
        "Lime Plaster": "17. Lime Plaster.jpg",
        "Venetian Plaster": "18. Venetian Plaster.jpg",
        "Microcement": "19. Micro Concrete.jpg",
        "Clay Cladding": "20. Clay Cladding.jpg",
        "Liquid Metallic Ombres": "21.Liquid Mettalic Ombres.jpg",
        "Natural Finishes Comparison": "22. Natural Finishes Comparison.jpg",
        "Italian Marbles": "23.Marbles.jpg",
        "Indian Marbles": "52.Indian Marble.jpg",
        "Marble": "23.Marbles.jpg",
        "Tiles": "24.Tiles.jpg",
        "Types of Tiles": "24.Tiles.jpg",
        "TILES": "24.Tiles.jpg",
        "Granite": "26.Granite.jpg",
        "Quartz": "27.Quartz.jpg",
        "Quartzite": "28.Quartzite.jpg",
        "Granite vs Quartz vs Quartzite": "29.Granite vs qurtz vs quartzite.jpg",
        "Glass": "30.Glass.jpg",
        "Types of Glass": "30.Glass.jpg",
        "Mirror": "31.Mirror.jpg",
        "Laminates": "32.Laminates.jpg",
        "Types of Laminates": "32.Laminates.jpg",
        "Veneer": "33.Veneer.jpg",
        "Types of Veneer": "33.Veneer.jpg",
        "Plywood": "35.Plywood.jpg",
        "Types of Plywood": "35.Plywood.jpg",
        "Wood": "36.Wood.jpg",
        "Material Price Overview": "37.Material Price Overview.jpg",
        "Top 10 Materials 2026": "38.Top 10 materials 2026.jpg",
        // [COMMENTED OUT] "Materials That Look Expensive": "39.Materials that look expensive.jpg",
        "Marble vs Tiles": "marble vs tiles.png",
        "Laminate vs Veneer": "laminate vs vaneer.png",
        "Hardware": "51.Hardware.jpg",
        "Sanitary Fittings": "49.Sanitary Fittings.jpg",
        "Lights": "40.Lights.jpg",
        "Switch Boards": "41. Switch Boards.jpg",
        "Automation": "42.Automation.jpg"
      },

      // Maps internal category IDs to their physical folder names
      FOLDER_MAP: {
        // [COMMENTED OUT] "exp-look": "2.Materials that look expensive",
        "top10": "3. Top 10 Materials",
        "bed": "5.Bed Finishes",
        "bed_grid": "5.Bed Finishes",
        "door": "6.Door Finishes",
        "headboard": "7.Headboard Finishes",
        "sidetable": "8.Side Table Finishes",
        "side_table": "8.Side Table Finishes",
        "study": "9.Study Table Finishes",
        "study_table": "9.Study Table Finishes",
        "dresser": "10.Dresser Table Finishes",
        "wardrobe": "11.Wardrobe Shutter Finishes",
        "wardrobe-shutter": "11.Wardrobe Shutter Finishes",
        "wardrobe-must": "12.5 Must Wardrobe Haves",
        "tvunit": "13. TV Unit Finishes",
        "kitchen-counter": "14. Kitchen Counter Tops",
        "kitchen-shutter": "14.5 Kitchen Shutters",
        "kitchen-must": "16.5 Kitchen Must Haves",
        "flooring": "30.Flooring",
        "wall": "32.Wall",
        "limewash": "17.Natural Materials",
        "limeplaster": "17.Natural Materials",
        "venetian": "17.Natural Materials",
        "clay": "17.Natural Materials",
        "metallic": "17.Natural Materials",
        "microcement": "17.Natural Materials",
        "natural": "17.Natural Materials",
        "marbles": "18. Marbles",
        "italian-marbles": "18. Marbles",
        "indian-marbles": "18. Marbles",
        "tiles": "19. Tiles",
        "granite": "20. Granite",
        "quartz": "21. Quartz",
        "quartzite": "22.Quartzite",
        "glass": "23. Glass",
        "glass-summary": "23. Glass",
        "mirror": "36.Mirrors",
        "laminates": "24. Laminate",
        "designer-laminates": "24. Laminate",
        "veneer": "25. Veneer",
        "designer-veneer": "34.Designer Veneer",
        "ceiling": "31. False Ceiling",
        "wood-types": "35.Wood",
        "laminates-finish": "33.Laminate Finishes",
        "hardware": "37. Hardware",
        "sanitary": "41. Sanitary Fittings",
        "lights": "38.Lights",
        "switches": "39.Switch Board",
        "automation": "40.Automation"
      }
    };

    /**
     * Finds the correct local path for a homepage cover.
     */
    function getCoverPath(label) {
      const filename = IMAGE_SETTINGS.COVERS[label];
      if (!filename) return 'https://source.unsplash.com/random/600x400?interior,' + encodeURIComponent(label);
      return `assets/1.Cover Images/${filename}`;
    }

    /**
     * Finds the correct local path for a material table row thumbnail.
     * Searches by index and material name.
     */
    function getThumbPath(catKey, index, materialName) {
      const folder = IMAGE_SETTINGS.FOLDER_MAP[catKey];
      if (!folder) return 'https://source.unsplash.com/random/100x100?material,' + encodeURIComponent(materialName);
      // Construct path: assets/[Folder]/[Index].[Name].jpg
      return `assets/${folder}/${materialName.trim()}.jpg`; // Adjusted per user feedback to match material names directly
    }

    /**
     * Centralized image path resolver for material images.
     * Builds path as: assets/[FOLDER]/[Name].jpg
     * For non-standard mappings, use imgOverrides in the section config.
     */
    function getImagePath(section, name) {
      var folder = IMAGE_SETTINGS.FOLDER_MAP[section];
      if (!folder) return '';
      return 'assets/' + folder + '/' + name.trim() + '.jpg';
    }

    const PIMG = {};

    // Split-cover helper – renders two images side by side with a divider line
    // Used as the card image for "vs" comparison categories
    function splitCoverHTML(leftSrc, rightSrc) {
      return `split:${leftSrc}|||${rightSrc}`;
    }

    /* ============================================================
      CATEGORIES  (merged, renamed, new Pinterest covers)

      Merges:
      - marble-summary + marbles  ? 'marbles'       (single card)
      - glass-summary + glass     ? 'glass'          (single card)
      - designer-laminates + laminate ? 'laminates'  (single card)
      - veneer + designer-veneer  ? 'veneer'         (single card)
      - plywood-summary + plywood ? 'plywood'        (single card)

      Split covers (img = 'split:LEFT|||RIGHT'):
      - marble-vs-tiles
      - lam-vs-veneer
      ============================================================ */






    let categories = [];

    async function loadCategories() {
      try {
        const response = await fetch('categories.json');
        if (!response.ok) {
          console.error('Failed to fetch categories.json:', response.status, response.statusText);
          return;
        }

        const jsonCards = await response.json();

        const localCards =
          JSON.parse(localStorage.getItem('cards')) || [];

        categories = [...jsonCards, ...localCards];

        renderCats('all');
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }

/* ============================================================
      DETAIL IMAGE BANKS (shown inside each category)
      ============================================================ */
    const detailImages = {
      marbles: ['Calacatta', 'Carrara', 'Statuario', 'Marble Flooring'],
      flooring: ['WPC Deck Flooring', 'SPC Flooring', 'Laminate Wood', 'Engineered Wood', 'Solid Wood', 'Italian Marble', 'Vitrified Tiles', 'Microcement'],
      wall: ['Textured Wall', 'Limewash', 'Feature Wall', 'Plaster Finish'],
      ceiling: ['POP False Ceiling', 'Gypsum Board Ceiling', 'PVC Ceiling Panels', 'Wooden Ceiling Panels', 'Acoustic Panels', 'Glass Ceiling Panels', 'Stretch Ceiling', 'Veneer'],
      'glass-summary': ['Clear Glass', 'Frosted Glass', 'Fluted Glass'],
      'plywood-summary': ['Plywood', 'MDF Board'],
      laminate: ['Matt Laminate', 'Metallic Laminate', 'Wood Grain'],
      'laminate-types': ['Matt Laminate', 'Gloss Laminate', 'Wood Grain', 'Textured Laminate'],
      veneer: ['Natural Veneer', 'Oak Veneer'],
      'designer-veneer': ['Designer Veneer', 'Exotic Veneer'],
      granite: ['Black Granite', 'Grey Granite'],
      quartz: ['White Quartz', 'Calacatta Quartz'],
      quartzite: ['Taj Mahal Quartzite', 'Sea Pearl Quartzite'],
      tiles: ['Vitrified Tiles', 'Large Format Tiles', 'Designer Tiles'],
      tvunit: ['Laminate Finish', 'Veneer Finish', 'PU Paint Finish', 'Acrylic Finish', 'Glass Finish'],
      top10: ['Liquid Metallic Ombre', 'Alabaster Lights', 'Acoustic Panels', 'Textured Lime Plaster', '3D Artwork', 'Optical Fibre Fabric', 'Venetian Plaster', 'Flexible MDF Curves', 'Acoustic Fluted Panels'],
      microcement: ['Microcement'],
      glass: ['Types of Glass'],
      limewash: ['Limewash'],
      limeplaster: ['Lime Plaster'],
      venetian: ['Venetian Plaster'],
      clay: ['Clay Cladding'],
      metallic: ['Liquid Metallic Ombre'],
    };

    /* ============================================================
      TABLE DATA
      ============================================================ */
    const tableData = {
      flooring: {
        title: 'Flooring Finishes',
        cols: ['#', 'Material', 'Cost (sq.ft)', 'Thk (mm)', 'Best Place To Use', 'Brands'],
        rows: [
          [1, 'Outdoor Flooring', 'WPC Deck Flooring', '20–25', '₹350 – ₹900', 'Inovar Flooring, VOX', 'Balconies, terraces, pool decks'],
          [2, 'Vinyl Flooring', 'SPC Flooring', '4–8', '₹180 – ₹350', 'Welspun, Euro Pratik', 'Bedroom flooring, office flooring'],
          [3, 'Vinyl Flooring', 'PVC Vinyl Flooring', '2–5', '₹120 – ₹300', 'Welspun, Euro Pratik', 'Bedrooms, office spaces, retail stores'],
          [4, 'Wood Flooring', 'Laminate Wood', '8–12', '₹120 – ₹350', 'Pergo, Greenlam', 'Bedrooms, study rooms, offices'],
          [5, 'Wood Flooring', 'Engineered Wood', '12–18', '₹350 – ₹900', 'Square Foot, Mikasa, Greenlam', 'Living rooms, bedrooms, luxury apartments'],
          [6, 'Wood Flooring', 'Solid Wood', '18–20', '₹600 – ₹2,000', 'Square Foot, Mikasa Floors', 'Luxury living rooms, villas, premium bedrooms'],
          [7, 'Natural Stone', 'Italian Marble', '16–20', '₹250 – ₹8,000+', 'Classic Marble Company', 'Living rooms, staircases, luxury bathrooms'],
          [8, 'Natural Stone', 'Indian Marble', '16–20', '₹90 – ₹600', 'RK Marble, Bhandari Marble Group', 'Living rooms, bedrooms, staircases'],
          [9, 'Natural Stone', 'Granite', '18–20', '₹120 – ₹400', 'RK Marble, Classic Marble Company', 'Staircases, exterior flooring'],
          [10, 'Natural Stone', 'Kota Stone', '18–25', '₹90 – ₹200', 'Local quarries', 'Outdoor, staircases, utility areas'],
          [11, 'Natural Stone', 'Slate Stone', '10–15', '₹150 – ₹400', 'Classic Marble Company', 'Outdoor flooring, rustic interiors'],
          [12, 'Natural Stone', 'Limestone', '18–25', '₹120 – ₹350', 'Stonex India, RK Marble', 'Traditional homes, courtyards'],
          [13, 'Natural Stone', 'Sandstone', '18–25', '₹80 – ₹250', 'Array Stone, Tripura Stones', 'Outdoor, pathways'],
          [14, 'Composite Stone', 'Terrazzo', '15–20', '₹150 – ₹350', 'Bharat Flooring, NITCO Terrazzo', 'Living rooms, corridors, commercial floors'],
          [15, 'Cement Flooring', 'Cement IPS', '25–40', '₹80 – ₹180', 'Local IPS contractors', 'Industrial homes, terraces, balconies'],
          [16, 'Decorative Cement', 'Microcement', '2–3', '₹300 – ₹700', 'Ideal Work, Topciment, Terraco', 'Modern homes, bathrooms, seamless flooring'],
          [17, 'Industrial Flooring', 'Epoxy', '1–3', '₹250 – ₹600', 'Fosroc, Sika, Flowcrete', 'Parking areas, commercial kitchens, garages'],
          [18, 'Tiles', 'Ceramic Tiles', '8–10', '₹40 – ₹120', 'Kajaria, Somany', 'Bathrooms, kitchens, balconies, utility areas'],
          [19, 'Tiles', 'Vitrified Tiles', '8–10', '₹60 – ₹250', 'Kajaria, Somany, Johnson', 'Living room, bedroom, commercial floors'],
          [20, 'Tiles', 'Porcelain Tiles', '8–12', '₹120 – ₹400', 'Kajaria, RAK Ceramics', 'Luxury floors, high traffic areas'],
          [21, 'Wood Alternative', 'Bamboo Flooring', '10–15', '₹250 – ₹600', 'Greenlam, Epitome', 'Sustainable eco friendly homes'],
          [22, 'Wood Alternative', 'Cork Flooring', '6–12', '₹300 – ₹700', 'Amorim, Granorte', 'Bedrooms, quiet spaces'],
          [23, 'Decorative Flooring', 'Concrete Polished', '50–100 base', '₹150 – ₹400', 'Ultratech', 'Industrial interiors'],
          [24, 'Decorative Flooring', 'Metal Inlay Flooring', 'Custom', '₹800+', 'Arttd\'inox', 'Accent for homes'],
          [25, 'Soft Flooring', 'Carpet Tiles', '6–8', '₹150 – ₹400', 'Venjara Carpets', 'Office workspace, retail stores'],
          [26, 'Rubber Flooring', 'Rubber Gym Tiles', '8–20', '₹200 – ₹600', 'Duraflor', 'Commercial gyms, weightlifting areas'],
          [27, 'Turf Flooring', 'Artificial Turf', '10–20 pile', '₹120 – ₹350', 'Field Turf, TigerTurf', 'Training zones, CrossFit areas, balconies'],
        ]
      },
      wall: {
        title: 'Wall Finishes',
        cols: ['#', 'Material', 'Cost (sq.ft)', 'Thk (mm)', 'Best Place To Use', 'Brands'],
        rows: [
          [1, 'Decorative Paint', 'Texture Paint', '1–3', '₹80 – ₹250', 'Asian Paints Royale Play, Nerolac Impressions', 'Living room feature walls, bedroom accent walls'],
          [2, 'Spray Paint Finish', 'PU Paint', '0.06 – 0.12', '₹250 – ₹600', 'ICA Pidilite, Asian Paints PU', 'Wardrobe shutters, wall panels, furniture finishes'],
          [3, 'Spray Paint Finish', 'Duco Paint', '0.08 – 0.15', '₹200 – ₹450', 'Asian Paints, ICA Pidilite', 'MDF panels, furniture, decorative wall panels'],
          [4, 'Paint Finish', 'Emulsion Paint', '0.04 – 0.08', '₹18 – ₹40', 'Asian Paints, Berger, Dulux', 'Living rooms, bedrooms, ceilings'],
          [5, 'Paint Finish', 'Royale Paint', '0.04 – 0.08', '₹40 – ₹80', 'Asian Paints Royale, Dulux Velvet Touch', 'Living rooms, master bedrooms'],
          [6, 'Paint Finish', 'Satin Paint', '0.04 – 0.08', '₹25 – ₹60', 'Asian Paints, Dulux', 'Living rooms, hallways'],
          [7, 'Paint Finish', 'Matt Paint', '0.04 – 0.08', '₹20 – ₹50', 'Asian Paints, Berger', 'Bedrooms'],
          [8, 'Decorative Paint', 'Metallic Paint', '0.1 – 0.3', '₹150 – ₹400', 'Asian Paints, Royal Play', 'Luxury feature walls'],
          [9, 'Decorative Paint', 'Stucco Finish', '1 – 3', '₹250 – ₹700', 'Asian Paints', 'Premium living rooms'],
          [10, 'Decorative Paint', 'Concrete Finish Paint', '1 – 3', '₹200 – ₹500', 'Terraco', 'Industrial style interiors'],
          [11, 'Decorative Paint', 'Limewash Paint', '0.05 – 0.10', 'Basic₹50 – ₹120 Designer ₹150 – ₹200', 'Limocoat', 'Premium living rooms, bedrooms'],
          [12, 'Decorative Plaster', 'Lime Plaster', '1 – 2', '₹150 – ₹500', 'Limocoat', 'Premium living rooms, bedrooms'],
          [13, 'Decorative Plaster', 'Clay Plaster', '2 – 5', '₹120 – ₹300', 'Clay works', 'Organic interiors, villas, eco homes'],
          [14, 'Wooden Panels', 'Veneer Paneling', '4–8 veneer\non ply/MDF', '₹250 – ₹700', 'Century Veneers, Greenply', 'TV walls, luxury bedrooms, living rooms'],
          [15, 'Engineered Panels', 'HDMR Paneling', '6 – 18', '₹120 – ₹350', 'Century, Greenply', 'Wall paneling, wardrobes, TV units'],
          [16, 'Engineered Panels', 'Laminate Wall Paneling', '1 laminate on ply/MDF', '₹150 – ₹350', 'Greenlam, Merino, Century Laminates', 'TV walls, wardrobes, feature walls'],
          [17, 'Panels', 'MDF Jali Panels', '12–18', '₹200 – ₹500', 'Greenpanel, Century', 'Partitions, feature walls, mandir panels'],
          [18, 'Panels', 'CNC Cut Panels', '12–18', '₹250 – ₹700', 'Panels', 'Mandir walls, decorative panels'],
          [19, 'Panels', 'Metal Wall Panels (Brass / SS)', '1–2 metal sheet on panel backing', '₹800 – ₹3,000', 'Stonelam Metal, Local fabricators', 'Luxury interiors, hotel lobbies, premium feature walls'],
          [20, 'PVC Panels', 'PVC Wall Panels', '6–10', '₹120 – ₹300', 'Alstone, Ecoste, Euro Pratik', 'TV walls, bedrooms, commercial interiors'],
          [21, 'Decorative Panels', 'WPC Panels', '8–12', '₹180 – ₹400', 'Alstone, Ecoste', 'Feature walls, exterior cladding'],
          [22, 'Decorative Tiles', 'Decorative Wall Tiles', '6–10', '₹60 – ₹250', 'Kajaria, Somany, Johnson', 'Kitchen backsplashes, bathroom walls'],
          [23, 'Natural Stone', 'Marble Wall Cladding', '16–20', '₹250 – ₹8000+', 'RK Marble, Classic Marble Company', 'Living room feature walls, bathrooms'],
          [24, 'Natural Stone', 'Granite Wall Cladding', '18–20', '₹120 – ₹350', 'RK Marble, Classic Marble Company', 'Exterior walls, staircases'],
          [25, 'Natural Stone', 'Slate stone', '10–15', '₹250 – ₹600', 'Stone Depot, EarthStona', 'Exterior walls, rustic interiors, landscape walls'],
          [26, 'Stone', 'Quartzite Wall Cladding', '12–20', '₹300 – ₹1,200', 'Classic Marble Company', 'Feature walls, luxury interiors'],
          [27, 'Stone', 'Slate Stone Cladding', '10–15', '₹250 – ₹600', 'EarthStona, Stone Depot', 'Exterior / rustic interiors'],
          [28, 'Fabric', 'Fabric Wall Panels', '15–40 (with\nfoam backing)', '₹400 – ₹1,200', 'D\'Decor, Stanley', 'Bedrooms, acoustic walls'],
          [29, 'Acoustic', 'Acoustic Panels', '12–25', '₹300 – ₹800', 'Unidus accoustics', 'Home theatres, offices'],
          [30, 'Decorative Plaster', 'Venetian Plaster', '1–2', '₹250 – ₹600', 'Asian Paints, Novacolor', 'Luxury living rooms'],
          [31, 'Decorative Cement', 'Microcement', '2–3', '₹300 – ₹700', 'Topciment, Ideal Work', 'Bathrooms, modern interiors'],
          [32, 'Decorative Panels', 'Fluted Panels', '12–18', '₹180 – ₹350', 'Action Tesa, Greenpanel', 'TV walls, bedroom feature walls'],
          [33, 'Decorative Panels', 'Charcoal Panels', '8–12', '₹200 – ₹450', 'Advance Laminates, Alstone', 'TV walls, commercial interiors'],
          [34, 'Decorative Panels', 'HPL Wall Cladding', '6 – 8', '₹350 – ₹900', 'Greenlam, Merino', 'Exterior walls, balconies'],
          [35, 'Decorative Panels', 'Stone Veneer Panels', '2 – 4', '₹250 – ₹700', 'Flex stone', 'Bedroom accent walls, living rooms'],
          [36, 'Decorative Panels', '3D Wall Panels (PVC / Gypsum)', '10 – 20', '₹150 – ₹450\nEuro Pratik', 'Euro Pratik', 'Living room feature wall'],
          [37, 'Decorative Panels', 'Upholstered Panels', '20 – 40', '₹600 – ₹1,500', 'D décor', 'Bedroom headboards'],
          [38, 'Decorative Metal', 'Liquid Metal Finish', '1 – 3', '₹1,200 – ₹4,000', 'Midas Metal, De Castelli', 'Luxury feature walls, furniture panels'],
          [39, 'Wall Coverings', 'Wallpaper', '0.20 – 0.50', '₹80 – ₹1,200+', 'Marshalls, D\'Decor', 'Bedroom accent walls, living rooms'],
        ]
      },
      ceiling: {
        title: 'False Ceiling Finishes',
        cols: ['#', 'Material', 'Cost (sq.ft)', 'Thk (mm)', 'Best Place To Use', 'Brands'],
        rows: [
          [1, 'False Ceiling', 'POP False Ceiling', '10–15', '₹80 – ₹150', 'Local POP contractors', 'Living rooms, decorative ceilings'],
          [2, 'False Ceiling', 'Gypsum Board Ceiling', '9–12', '₹80 – ₹150', 'Gyproc, Saint Gobain', 'Homes, offices'],
          [3, 'False Ceiling', 'Calcium Silicate Board', '6–12', '₹70 – ₹140', 'Shera, Hilux', 'Bathrooms, balconies, moisture-prone areas'],
          [4, 'False Ceiling', 'PVC Ceiling Panels', '6–10', '₹120 – ₹300', 'Alstone, Ecoste', 'Kitchens, bathrooms, commercial interiors'],
          [5, 'False Ceiling', 'Metal Ceiling (Aluminium/GI)', '0.5–1', '₹250 – ₹700', 'Armstrong, Hunter Douglas', 'Offices, airports, commercial buildings'],
          [6, 'False Ceiling', 'Mineral Fibre Ceiling Tiles', '12–15', '₹120 – ₹250', 'Armstrong World Industries', 'Offices, commercial spaces'],
          [7, 'False Ceiling', 'Wooden Ceiling Panels', '12–18', '₹250 – ₹800', 'Greenpanel, CenturyPly', 'Luxury living rooms, lounges'],
          [8, 'False Ceiling', 'WPC Ceiling Panels', '8–12', '₹180 – ₹400', 'Alstone, Ecoste', 'Balconies, semi-outdoor ceilings'],
          [9, 'False Ceiling', 'Acoustic Panels (Fabric/PET)', '12–25', '₹250 – ₹800', 'Armstrong, Inque Group', 'Offices, home theatres, studios'],
          [10, 'False Ceiling', 'Glass Ceiling Panels', '8–12', '₹800+', 'Saint Gobain', 'Feature ceilings, luxury spaces'],
          [11, 'False Ceiling', 'Stretch Ceiling', '0.2–0.5', '₹500 – ₹1,500', 'Barrisol, Clipso', 'Modern homes, backlit ceilings'],
          [12, 'False Ceiling', 'Veneer', '6–12', '₹200 – ₹600', 'Greenlam, CenturyPly, Merino', 'Living rooms, feature ceilings'],
          [13, 'False Ceiling', 'Metal Baffle Ceiling', '0.5–1', '₹400 – ₹1,200', 'Hunter Douglas, Armstrong', 'Offices, commercial spaces, lobbies'],
          [14, 'Ceiling Finish', 'Clay Plaster', '3–8', '₹150 – ₹400', '-', 'Farmhouses, eco homes, rustic interiors'],
          [15, 'Ceiling Finish', 'Exposed Concrete', '-', '₹80 – ₹250', '-', 'Industrial interiors, modern homes'],
          [16, 'Ceiling Finish', 'Texture Paint', '1–2', '₹80 – ₹250', 'Asian Paints, Nerolac', 'Feature ceilings, living rooms'],
          [17, 'Ceiling Finish', 'Venetian Plaster', '2–3', '₹400 – ₹1,200', 'San Marco, Novacolor', 'Luxury homes, feature ceilings'],
          [18, 'Ceiling Finish', 'Lime Wash', '1–2', '₹60 – ₹150', 'Limocoat', 'Bedrooms, living rooms, heritage homes'],
          [19, 'Ceiling Finish', 'Lime Plaster', '2–5', '₹120 – ₹350', 'Limocoat', 'Villas, luxury homes, textured ceilings'],
        ]
      },
      'glass-summary': {
        title: 'Types of Glass',
        cols: ['#', 'Glass Type', 'Key Feature', 'Transparency', 'Thickness', 'Price ₹/sq ft'],
        rows: [
          [1, 'Clear Glass', 'Basic transparent glass', 'High', '4–12 mm', '₹40 – ₹150'],
          [2, 'Toughened Glass', 'Heat-treated safety glass', 'High', '8–15 mm', '₹180 – ₹400'],
          [3, 'Laminated Glass', 'Glass layers with interlayer', 'High', '6–13.5 mm', '₹250 – ₹700'],
          [4, 'Frosted Glass', 'Translucent for privacy', 'Medium', '4–12 mm', '₹150 – ₹350'],
          [5, 'Tinted Glass', 'Reduces glare & heat', 'Medium', '5–12 mm', '₹120 – ₹300'],
          [6, 'Lacquered Glass', 'Back-painted decorative glass', 'Opaque', '5–8 mm', '₹200 – ₹450'],
          [7, 'Fluted Glass', 'Vertical grooved texture', 'Medium', '5–10 mm', '₹350 – ₹900'],
          [8, 'Smoked Glass', 'Dark tinted glass', 'Low–Medium', '5–12 mm', '₹200 – ₹500'],
          [9, 'Sandwiched Glass', 'Layers bonded together', 'Medium–High', '10–16 mm', '₹250 – ₹800'],
          [10, 'Smart Glass', 'Switchable privacy glass', 'Adjustable', '8–12 mm', '₹2,500 – ₹8,000'],
        ]
      },
      'marble-summary': {
        title: 'Types of Marble',
        cols: ['Origin', '#', 'Marble Name', 'Appearance', 'Thickness', 'Price ₹/sq ft'],
        rows: [
          ['Italian', 1, 'Carrara Marble', 'White to light grey with soft grey veins', '16–20 mm', '₹500 – ₹1,500'],
          ['Italian', 2, 'Calacatta Marble', 'Bright white with bold grey/gold veins', '18–20 mm', '₹2,000 – ₹6,000'],
          ['Italian', 3, 'Statuario Marble', 'Pure white with strong grey veining', '18–20 mm', '₹1,500 – ₹5,000'],
          ['Italian', 4, 'Crema Marfil Marble', 'Beige with light subtle veins', '18–20 mm', '₹600 – ₹1,500'],
          ['Italian', 5, 'Onyx Marble', 'Translucent (white, green, honey)', '16–20 mm', '₹2,000 – ₹7,000'],
          ['Italian', 6, 'Armani Brown Marble', 'Dark brown with fine linear veins', '16–20 mm', '₹700 – ₹2,000'],
          ['Italian', 7, 'White Portoro Marble', 'Black with gold veins', '18–20 mm', '₹2,500 – ₹8,000'],
          ['Italian', 8, 'Michelangelo Marble', 'White with grey/beige veins', '18–20 mm', '₹900 – ₹2,500'],
          ['Italian', 9, 'Bianco Lasa Marble', 'Bright white with fine grey veins', '16–20 mm', '₹1,500 – ₹4,000'],
          ['Italian', 10, 'Travertine Marble', 'Beige to cream with natural holes and veins', '18–20 mm', '₹250 – ₹800'],
          ['Indian', 1, 'Makrana Marble', 'Pure white with minimal veins', '16–20 mm', '₹150 – ₹600'],
          ['Indian', 2, 'Banswara Marble', 'White with light purple or grey veins', '18–20 mm', '₹120 – ₹400'],
          ['Indian', 3, 'Katni Marble', 'Beige to light cream with soft veins', '18–20 mm', '₹90 – ₹250'],
          ['Indian', 4, 'Ambaji Marble', 'Milky white with very light patterns', '18–20 mm', '₹100 – ₹350'],
          ['Indian', 5, 'Morwad Marble', 'White with soft grey patterns', '18–20 mm', '₹90 – ₹250'],
        ]
      },
      'italian-marbles': {
        title: 'Italian Marbles',
        cols: ['#', 'Marble Type', 'Description', 'Types', 'Sizes', 'Thickness', 'Price Range', 'Brands / Suppliers', 'Applications', 'Pros', 'Cons', 'Installation Method', 'Maintenance'],
        rows: [
          [1, 'Carrara Marble', 'Carrara marble is a popular Italian marble with a light grey or white background and soft grey veining, widely used in contemporary interiors.', 'Bianco Carrara, Carrara Venato', 'Slabs 8–10 ft length, 4–6 ft width', '16–18 mm (standard), 18–20 mm (premium slabs)', '₹500 – ₹1500 per sq ft', 'Classic Marble Company, Elegant Marble', 'Flooring, wall panels, bathrooms, countertops', 'Elegant look, relatively affordable for Italian marble', 'Can stain easily', 'Cement bedding or stone adhesive', 'Sealing recommended'],
          [2, 'Calacatta Marble', 'Calacatta marble is a luxurious Italian marble featuring a white base with dramatic thick gold or grey veining.', 'Calacatta Gold, Calacatta Borghini, Calacatta Oro', 'Large random slabs 8–10 ft length', '18mm – 20mm', '₹2000 – ₹6000 per sq ft', 'Classic Marble Company, Elegant Marble', 'Luxury flooring, statement walls, countertops', 'Highly luxurious aesthetic, Bold dramatic veining', 'Very expensive, Porous', 'Installed using marble adhesive', 'Requires sealing'],
          [3, 'Statuario Marble', 'Statuario marble is a premium Italian marble known for its bright white background with bold grey veins, commonly used in luxury interiors.', 'Statuario Classic, Statuario Extra, Statuario Venato', '8–10 ft length Slabs', '16–18 mm 18–20 mm premium slabs', '₹1500 – ₹5000 per sq ft', 'Classic Marble Company, Elegant Marble', 'Luxury flooring, wall cladding, bathrooms, tabletops', 'Premium appearance, elegant veining', 'Expensive, porous', 'Installed using cement mortar or stone adhesive', 'Requires sealing'],
          [4, 'Crema Marfil', 'Crema Marfil is a beige marble from Spain with subtle veining, commonly used for elegant flooring and wall finishes.', 'Crema Marfil Classic, Crema Marfil Select, Crema Marfil Coto', 'Random slabs (7–9 ft typical)', '18mm – 20mm', '₹600 – ₹1500 per sq ft', 'Classic Marble Company, Elegant Marble', 'Flooring, staircases, wall panels', 'Warm neutral tone suitable for many interiors, Very versatile', 'Porous stone', 'Cement mortar bedding', 'Requires sealing'],
          [5, 'Onyx Marble', 'Onyx is a translucent natural stone with dramatic patterns and vibrant colors, often backlit for decorative walls.', 'Honey Onyx, Green Onyx, White Onyx, Pink Onyx', 'Random slabs (6–9 ft typical)', '16mm – 20mm', '₹2000 – ₹7000 per sq ft', 'Classic Marble Company, Elegant Marble', 'Feature walls, bar counters, luxury interiors', 'Translucent, unique patterns', 'Fragile and expensive', 'Special stone adhesive with back support', 'Careful cleaning and sealing'],
          [6, 'Armani Brown Marble', 'Armani Brown marble is a luxurious dark brown marble known for its fine linear veins and elegant texture. It is widely used in premium residential and hospitality interiors for its rich and sophisticated appearance.', 'Armani Brown Classic, Armani Grey, Armani Bronze', '8–10 ft length Slabs', '16mm – 20mm', '₹700 – ₹2000 per sq ft', 'Classic Marble Company, Elegant Marble', 'Luxury flooring, wall cladding, bathroom walls, feature walls, countertops', 'Rich elegant colour, luxurious appearance, suitable for modern interiors', 'Requires sealing, darker colour may show dust', 'Installed with cement mortar or stone adhesive with proper leveling', 'Periodic polishing and sealing recommended'],
          [7, 'White Portoro Marble', 'White Portoro marble is a rare and luxurious Italian marble characterized by a deep black base with dramatic gold and white veins, often used for statement interiors.', 'Portoro Gold, Portoro Black', 'Random slabs (6–8 ft typical)', '18mm – 20mm', '₹2500 – ₹8000 per sq ft', 'Classic Marble Company, Elegant Marble', 'Feature walls, luxury bathrooms, decorative panels, tabletops', 'Highly luxurious appearance, unique veining pattern', 'Very expensive, limited availability', 'Installed using stone adhesive with skilled stone installation', 'Regular sealing and careful cleaning recommended'],
          [8, 'Michelangelo Marble', 'Michelangelo marble is a premium Italian marble featuring a soft white background with elegant grey and beige veining. It is commonly used in luxury residential and hospitality interiors for its refined and timeless appearance.', 'Michelangelo White, Michelangelo Grey', '8–10 ft length Slabs', '18mm – 20mm', '₹900 – ₹2500 per sq ft', 'Classic Marble Company, Elegant Marble', 'Luxury flooring, wall cladding, bathrooms, countertops, decorative wall panels', 'Elegant veining, premium aesthetic, versatile for modern and classic interiors', 'Porous material, requires sealing', 'Installed using cement mortar bedding or stone adhesive by skilled marble installers', 'Periodic sealing and polishing recommended'],
          [9, 'Bianco Lasa Marble', 'Bianco Lasa marble is a high-quality Italian marble known for its bright white background with fine grey veining. It is valued for its purity and sophisticated look in luxury interiors.', 'Bianco Lasa Classic, Bianco Lasa Venato', 'Random slabs (7–9 ft typical)', '16mm – 20mm', '₹1500 – ₹4000 per sq ft', 'Classic Marble Company, Elegant Marble', 'Premium flooring, wall cladding, bathrooms, luxury feature walls', 'Bright white appearance, elegant and timeless design', 'Expensive and requires regular maintenance', 'Installed with cement mortar or marble adhesive with professional stone fixing', 'Sealing and periodic polishing required to maintain shine'],
          [10, 'Travertine Marble', 'Travertine is a natural limestone formed by mineral deposits from hot springs. It is known for its warm earthy tones and naturally occurring holes and linear patterns, giving it a rustic and textured appearance. Travertine is widely used in luxury interiors and Mediterranean-style architecture.', 'Classic Travertine, Silver Travertine, Walnut Travertine, Ivory Travertine', 'Random slabs (approx. 7–10 ft length), Tiles 2×2 ft, 2×4 ft also available', '16 – 20 mm (flooring), 12 – 16 mm (wall cladding)', '₹250 – ₹800', 'Classic Marble Company, Elegant Marble', 'Living room flooring, Bathroom walls, Outdoor flooring and patios, Staircases', 'Elegant natural texture, Unique patterns, Cool Temperature, Durable', 'Porous material, Natural holes may require filling, Can stain, Softer', 'Installed using cement mortar or stone adhesive on a prepared base', 'Seal the stone. Clean with mild pH-neutral stone cleaner. Avoid acidic cleaners'],
        ]
      },
      'indian-marbles': {
        title: 'Indian Marbles',
        cols: ['#', 'Marble Type', 'Description', 'Types', 'Sizes', 'Thickness', 'Price Range', 'Brands / Suppliers', 'Applications', 'Pros', 'Cons', 'Installation Method', 'Maintenance'],
        rows: [
          [1, 'Makrana Marble', 'Makrana marble is a premium Indian marble known for its pure white colour and historical use in monuments like the Taj Mahal.', 'Makrana White, Makrana Albeta', '8–10 ft length Slabs, Cut tiles: 1×1 ft, 2×2 ft, 2×4 ft', '16–18 mm (flooring), 18–20 mm (staircases), 12–15 mm (wall cladding)', '₹200 – ₹700 per sq ft', 'Rajasthan marble quarries', 'Flooring, temples, wall cladding', 'Durable and long-lasting', 'Limited vein patterns', 'Cement mortar bedding', 'Periodic polishing'],
          [2, 'Banswara Marble', 'Banswara Marble is a white marble with distinctive purple or grey veins. It comes from Rajasthan and is popular for its decorative veining patterns.', 'Banswara White, Banswara Purple, Banswara Gold', '5–9 ft length Slabs, Cut tiles 2×2 ft, 2×4 ft', '16–18 mm flooring, 18–20 mm heavy-use areas, 12–15 mm wall cladding', '₹120 – ₹400 / sq ft', 'Classic Marble Company, Elegant Marble', 'Living room flooring, Staircases, Feature walls', 'Attractive natural veining, Good durability, Suitable for large flooring areas', 'Requires sealing, Slight colour variation between slabs', 'Cement mortar bed installation, Polishing after laying', 'Periodic sealing recommended, Avoid acidic cleaners'],
          [3, 'Katni Marble', 'Katni Marble comes from Madhya Pradesh and is known for its beige and cream tones with subtle veining. It is commonly used in budget to mid-range residential projects.', 'Katni Beige, Katni Brown, Katni Pink', 'Slabs 4–8 ft length, Tiles 1×1 ft, 2×2 ft', '16–18 mm flooring, 12–15 mm wall cladding', '₹90 – ₹250 / sq ft', 'Classic Marble Company, Elegant Marble', 'Living rooms, Bedrooms, Commercial flooring', 'Affordable, Neutral colours suit many interiors, Widely available', 'Slightly porous, Less luxurious than Italian marbles', 'Installed with cement mortar, Mirror polishing done after installation', 'Seal periodically, Regular cleaning with mild detergent'],
          [4, 'Ambaji Marble', 'Ambaji Marble is a milky white marble from Gujarat, known for its uniform appearance and smooth texture.', 'Ambaji White, Ambaji Grey', 'Slabs 5–8 ft length, Tiles 2×2 ft, 2×4 ft', '16–18 mm flooring, 12–15 mm cladding', '₹100 – ₹350 / sq ft', 'RK Marble', 'Flooring, Wall cladding, Staircases', 'Clean white appearance, Affordable, Easy to polish', 'Can stain if not sealed, Slightly porous', 'Installed using cement mortar or stone adhesive', 'Periodic polishing, Use pH-neutral cleaners'],
          [5, 'Morwad Marble', 'Morwad Marble is a white marble from Rajasthan with subtle grey patterns. It is commonly used in residential flooring due to its affordability and clean look.', 'Morwad White, Morwad Light Vein', 'Slabs 5–8 ft length, Tiles 2×2 ft', '16–18 mm flooring, 12–15 mm cladding', '₹90 – ₹250 / sq ft', 'Rajasthan marble suppliers', 'Bedrooms, Living room flooring, Staircases', 'Budget-friendly marble, Light colour brightens interiors, Easy to install', 'Slightly softer than premium marbles, May require regular polishing', 'Cement mortar installation, Polishing after laying', 'Periodic sealing recommended, Clean with mild stone cleaner'],
        ]
      },
      'plywood-summary': {
        title: 'Types of Plywood',
        cols: ['Material', 'Water Resistance', 'Strength', 'Thickness', 'Price ₹/sq ft', 'Best For', 'Brands'],
        rows: [
          ['MR Plywood (Commercial)', 'Low–Moderate', 'Good', '6–18 mm', '₹70 – ₹130', 'Wardrobes, beds, TV units, study tables', 'CenturyPly, Greenply'],
          ['BWR Plywood', 'High', 'Very Good', '6–18 mm', '₹100 – ₹180', 'Kitchen cabinets, utility furniture', 'CenturyPly, Greenply, National Plywood'],
          ['BWP / Marine Plywood', 'Very High', 'Excellent', '6–18 mm', '₹140 – ₹250', 'Kitchen carcass, bathroom vanity, sink units', 'CenturyPly Marine, Greenply Gold'],
          ['Flexible Plywood', 'Low', 'Low structural', '4–8 mm', '₹130 – ₹250', 'Curved furniture, arches, curved wall panels', 'CenturyPly Flexi, Greenply Flexiply'],
          ['Fire Retardant Plywood', 'Moderate', 'Good', '6–18 mm', '₹180 – ₹350', 'Commercial interiors, theatres, hospitals', 'CenturyPly Firewall, Greenply FR'],
          ['Blockboard', 'Low–Moderate', 'Good for long panels', '16–19 mm', '₹90 – ₹160', 'Doors, long shelves, partitions', 'CenturyPly, Greenply'],
          ['MDF', 'Low', 'Moderate', '6–18 mm', '₹50 – ₹120', 'Wall panels, shutters, CNC panels', 'Greenpanel, CenturyPly'],
          ['HDHMR Board', 'High', 'Very High', '6–18 mm', '₹120 – ₹220', 'Wardrobe shutters, kitchen shutters', 'Action Tesa HDHMR, Greenpanel HDHMR'],
          ['Particle Board', 'Low', 'Low', '12–18 mm', '₹40 – ₹90', 'Budget furniture, modular interiors', 'Greenpanel, CenturyPly'],
        ]
      },
      overview: {
        title: 'Interior Material Price Overview',
        cols: ['Material', 'Typical Price Range', 'Recommended Brands'],
        rows: [
          ['Vitrified Tiles', '₹60 – ₹250 / sq.ft', 'Kajaria, Somany, Johnson'],
          ['Ceramic Tiles', '₹40 – ₹120 / sq.ft', 'Kajaria, Somany'],
          ['Natural Marble', '₹150 – ₹1,200 / sq.ft', 'RK Marble, Classic Marble Company'],
          ['Granite', '₹120 – ₹400 / sq.ft', 'Pokarna, Rashi Granite'],
          ['Engineered Quartz', '₹350 – ₹800 / sq.ft', 'Caesarstone, KalingaStone'],
          ['Laminates (1mm)', '₹70 – ₹250 / sq.ft', 'Greenlam, Merino, CenturyLaminates'],
          ['Acrylic Laminates', '₹250 – ₹600 / sq.ft', 'Greenlam, Stylam'],
          ['Veneer', '₹80 – ₹250 / sq.ft', 'Century Veneers, Durian'],
          ['PU Polish', '₹180 – ₹450 / sq.ft', 'ICA Pidilite, Asian Paints'],
          ['Duco Paint', '₹150 – ₹350 / sq.ft', 'Asian Paints, Berger'],
          ['Texture Paint', '₹25 – ₹80 / sq.ft', 'Asian Paints Royale Play, Nerolac'],
          ['Wallpaper', '₹60 – ₹300 / sq.ft', 'Marshalls, Excel Wallpapers'],
          ['WPC Boards', '₹120 – ₹220 / sq.ft', 'Alstone, Ecoste'],
          ['PVC Panels', '₹60 – ₹150 / sq.ft', 'Dumaplast, Polycab'],
          ['Gypsum Board', '₹35 – ₹80 / sq.ft', 'Saint-Gobain Gyproc'],
          ['Corian / Solid Surface', '₹450 – ₹1,200 / sq.ft', 'Dupont Corian, LG Hi-Macs'],
          ['Glass (Toughened)', '₹180 – ₹350 / sq.ft', 'Saint-Gobain Glass'],
          ['Fluted Panels', '₹180 – ₹350 / sq.ft', 'Action Tesa, Greenpanel'],
          ['Charcoal Panels', '₹200 – ₹450 / sq.ft', 'Advance Laminates, Alstone'],
          ['SPC Flooring', '₹180 – ₹350 / sq.ft', 'Welspun Flooring, Responsive'],
        ]
      },
    };

    /* DETAIL DATA */
    const detailData = {


      microcement: {
        title: 'Microcement', props: [
          { l: 'Material & Composition', v: 'A decorative coating made from cement, fine aggregates, polymers, resins, and pigments. Modified with additives for flexibility and water resistance.' },
          { l: 'Raw Material Cost', v: '₹180 – ₹450 per sq.ft (including material & labour), depending on brand, finish, and application complexity.' },
          { l: 'Thickness', v: '2 – 4 mm thickness applied in multiple layers. Supplied as powder + liquid polymer mix system.' },
          { l: 'Installation Process', v: 'Surface Prep → multiple thin coats with steel trowel → burnish → optional sealing/waxing' },
          { l: 'Maintenance', v: 'High durability. 10–15 years. Highly resistant to wear when sealed. Easy maintenance—clean with mild detergent; avoid abrasive scrubbing. Resealing may be required over time.' },
          { l: 'Pros', v: 'Seamless with no joints, highly versatile (walls, floors, bathrooms, furniture), waterproof when sealed, can be applied over existing surfaces.' },
          { l: 'Cons', v: 'Requires highly skilled application, risk of cracks if substrate moves, expensive compared to tiles/paint, repair can be tricky, proper sealing is critical.' },
          { l: 'Best Place To Use', v: 'Bathrooms, kitchens, living rooms, feature walls, floors, staircases, furniture surfaces, modern and industrial interiors.' },
          { l: 'Recommended Brands', v: 'Colortale' },
        ]
      },
      limewash: {
        title: 'Limewash Finish', props: [
          { l: 'Material', v: 'Natural mineral-based paint made from hydrated lime (calcium hydroxide), water, and natural pigments. Chalky, breathable finish.' },
          { l: 'Raw Material Cost', v: '₹20 – ₹38 / sq.ft' },
          { l: 'Thickness', v: '0.2 – 0.5 mm per coat, built up in multiple layers. Supplied in liquid form in 5L, 10L, 20L buckets' },
          { l: 'Installation Process', v: 'Surface prep → dilute lime → apply 2–3 coats with brush → allow drying between coats' },
          { l: 'Maintenance', v: 'Medium durability of 2–5 years. Requires occasional touch-ups and recoating over time. Clean with dry or damp cloth; avoid harsh chemicals.' },
          { l: 'Pros', v: 'Cost-effective, natural finish, breathable walls, unique handcrafted aesthetic, antibacterial properties, soft earthy tones.' },
          { l: 'Cons', v: 'Less durable in high-traffic areas, may appear uneven if poorly applied, limited colour range, slower application due to multiple coats, requires periodic maintenance.' },
          { l: 'Best Place To Use', v: 'Living rooms, bedrooms, feature walls, boutique hotels, rustic interiors' },
          { l: 'Recommended Brands', v: 'Limecoat, Vasari India' }
        ]
      },
      limeplaster: {
        title: 'Lime Plaster', props: [
          { l: 'Material', v: 'A natural wall finish made from slaked lime (lime putty), fine sand and water. It may include natural additives. Completely mineral-based and free from synthetic chemicals.' },
          { l: 'Raw Material Cost', v: '₹80 – ₹250 per sq.ft depending on finish type, material quality, and applicator expertise.' },
          { l: 'Thickness', v: '2 – 5 mm. Applied in multiple layers (base + finish coats). Supplied as paste or dry mix.' },
          { l: 'Installation Process', v: 'Surface prep → base coat → second coat → smoothing/burnishing → curing' },
          { l: 'Maintenance', v: 'High durability: 8–15 years. Low maintenance; can be cleaned gently and may require occasional sealing in high-use areas.' },
          { l: 'Pros', v: 'Highly durable<br>Breathable<br>Natural and eco-friendly<br>Versatile textures<br>Crack-resistant<br>Long lifespan' },
          { l: 'Cons', v: 'Higher cost than lime wash<br>Requires skilled labour<br>Longer application time<br>Limited bright colour options<br>Surface cracks possible if improperly cured' },
          { l: 'Best Place To Use', v: 'Feature walls, living rooms, bedrooms, luxury residences, boutique hotels, villas, Mediterranean and wabi-sabi interiors.' },
          { l: 'Recommended Brands', v: 'Limecoat, Vasari India and Colortale' }
        ]
      },
      venetian: {
        title: 'Venetian Plaster', props: [
          { l: 'Material', v: 'A premium decorative plaster made from slaked lime (lime putty) with very fine marble dust and natural pigments. Mineral-based with a polished stone-like finish.' },
          { l: 'Raw Material Cost', v: '₹250 – ₹800/ sq.ft, depending on finish complexity, brand, and applicator expertise' },
          { l: 'Thickness', v: '1 – 3 mm overall thickness applied in multiple thin layers.' },
          { l: 'Installation Process', v: 'Base → multiple thin coats with steel trowel → burnish → optional sealing/waxing' },
          { l: 'Maintenance', v: 'High durability when sealed. Interior lifespan: 10–15+ years. Low maintenance; wipe with soft damp cloth. Avoid harsh chemicals. Periodic waxing may be required to maintain sheen.' },
          { l: 'Pros', v: 'Luxurious marble-like finish<br>Seamless surface<br>Highly durable<br>Breathable<br>Wide range of finishes like gloss, satin' },
          { l: 'Cons', v: 'Expensive<br>Requires highly skilled labour<br>Time-intensive application<br>Difficult to repair seamlessly<br>Surface imperfections highly visible if base is not perfect' },
          { l: 'Best Place To Use', v: 'Feature walls, living rooms, master bedrooms, luxury residences, hotel lobbies, reception areas, high-end retail spaces.' },
          { l: 'Recommended Brands', v: 'Vasari India' }
        ]
      },
      clay: {
        title: 'Clay Cladding Finish', props: [
          { l: 'Material & Composition', v: 'Made from natural clay that is shaped and kiln-fired into panels, tiles, or bricks. May include terracotta, baked clay, or extruded clay elements. Completely natural and mineral-based.' },
          { l: 'Raw Material Cost', v: '₹150 – ₹500 per sq.ft. depending on profile, brand, and installation system.' },
          { l: 'Thickness', v: '10 – 25 mm thickness. Available as tiles, panels, hollow blocks, or baguette systems.' },
          { l: 'Installation Process', v: 'Surface prep → substructure framing preparation → fixing (mechanical or adhesive) → alignment & joint leveling → finishing (grouting/edge detailing)' },
          { l: 'Maintenance', v: 'Very high durability. 0–50 years. Resistant to weather, UV, and fading. Low maintenance; occasional cleaning with water recommended.' },
          { l: 'Pros', v: 'Natural material, highly durable, weather-resistant, excellent thermal insulation, breathable, timeless aesthetic, ideal for façades and feature walls.' },
          { l: 'Cons', v: 'Higher initial cost, requires proper installation system, heavier than paint/plaster finishes, limited colour palette (earth tones), skilled labour required.' },
          { l: 'Best Place To Use', v: 'Building façades, exterior walls, balconies, feature walls, commercial buildings, villas, earthy modern interiors.' },
          { l: 'Recommended Brands', v: 'MCM Flexi, and Articlad' }
        ]
      },
      metallic: {
        title: 'Liquid Metallic Ombre Finish', props: [
          { l: 'Material', v: 'Decorative coating made from water-based or solvent-based metallic paints containing metallic pigments, binders, and additives. Applied in layers to create gradient effects with reflective sheen.' },
          { l: 'Raw Material Cost', v: '₹180 – ₹500+ per sq.ft (including material & labour), depending on brand, metallic quality, and application complexity.' },
          { l: 'Thickness', v: 'Very thin coating of 0.5 – 1 mm overall across layer. Supplied as liquid paint system.' },
          { l: 'Installation Process', v: 'Surface prep → base coat → metallic layer application → ombre blending → optional protective topcoat' },
          { l: 'Maintenance', v: 'Medium durability. 5–8 years. Requires gentle cleaning with soft cloth; avoid abrasive cleaners. Protective coating improves longevity.' },
          { l: 'Pros', v: 'High visual impact, luxurious metallic sheen, customizable designs, wide colour options, perfect for statement walls, enhances lighting reflection.' },
          { l: 'Cons', v: 'Requires highly skilled application, expensive compared to regular paints, difficult to repair seamlessly, base surface imperfections highly visible, not suitable for rough use areas.' },
          { l: 'Best Place To Use', v: 'Feature walls, living rooms, dining areas, bedrooms, hotel lobbies, reception areas, salons, luxury retail spaces.' },
          { l: 'Recommended Brands', v: 'Colortale' }
        ]
      },
      /* [COMMENTED OUT - OLD exp-look detailData]
      'exp-look': {
        title: 'Materials That Look ₹50L+ But Cost Under ₹50K', props: [
          { l: 'Raw Material Cost', v: '₹180 – ₹350 / sq.ft' },
          { l: 'Thickness Required', v: '1–3 mm finished texture coat on prepared wall' },
          { l: 'Installation Process', v: 'Prep wall (repair/primer) → apply base coat → apply texture/Venetian layers → seal with protective finish' },
          { l: 'Maintenance', v: 'Wipe dust lightly; reseal every few years to preserve sheen' },
          { l: 'Pros', v: 'Creates luxurious depth like stone or polished plaster, elevating feature walls. Can be customized with colour, sheen, and vein patterns to mimic high-end finishes.' },
          { l: 'Cons', v: 'Requires skilled applicator for premium finish. Not ideal for high-moisture areas without proper sealing.' },
          { l: 'Best Places to Use', v: 'Living room and bedroom accent walls, hotel lobbies, luxury bathrooms, foyer, reception' },
          { l: 'Recommended Brands', v: 'Vasari India' }
        ]
      },
      */
    };

    /* COMPARE DATA */
    const compareData = {
      'compare-special': {
        title: 'Comparison: Lime Wash vs Lime Plaster vs Venetian Plaster vs Clay Cladding',
        cols: ['Category', 'Lime Wash', 'Lime Plaster', 'Venetian Plaster', 'Clay Cladding'],
        rows: [
          ['Material', 'Mineral paint', 'Natural plaster', 'Decorative plaster', 'Cladding system'],
          ['Composition', 'Slaked lime + water + pigments', 'Lime + sand, marble dust', 'Lime + marble dust + pigments', 'Kiln-fired natural clay'],
          ['Finish Look', 'Soft, cloudy, matte', 'Smooth to textured, earthy', 'Glossy, satin, marble-like', 'Rustic to modern, earthy panels'],
          ['Aesthetic Positioning', 'Subtle, rustic', 'Premium natural', 'Luxury statement', 'Curves, façades'],
          ['Thickness', '0.2 – 0.5 mm', '2 – 5 mm', '1 – 3 mm', '10 – 25 mm'],
          ['Cost (₹/sq.ft)', '₹20 – ₹38', '₹80 – ₹250', '₹250 – ₹800', '₹150 – ₹500'],
          ['Application Type', 'Brush layered coats', 'Trowel multi-layer plaster', 'Trowel + burnishing', 'Mechanical tiling'],
          ['Skill Level Required', 'Medium', 'High', 'Very high', 'High'],
          ['Durability', 'Medium (3–5 yrs)', 'High (8–15 yrs)', 'High (10–15+ yrs)', 'High (20–50 yrs)'],
          ['Maintenance', 'Periodic recoating', 'Low maintenance', 'Low', 'Very low'],
          ['Seamlessness', 'Seamless', 'Seamless', 'Seamless', 'Jointed system'],
        ]
      },
      'marble-vs-tiles': {
        title: 'Comparison: Marble vs Tiles',
        cols: ['Category', 'Marble', 'Tiles'],
        rows: [
          ['Material', 'Natural stone', 'Manufactured materials like ceramic, vitrified, porcelain, etc.'],
          ['Aesthetic', 'Natural grains, rich veining, extremely luxurious. Every slab is unique', 'Artificial, printed, textured designs with marble, wood, concrete look'],
          ['Thickness', '15–22 mm thick; slabs up to 2m × 3m → seamless, minimal joints', '3–10 mm thick; tiles up to 3m × 3m + modular sizes'],
          ['Cost (₹/sq.ft)', '₹200+', '₹60+'],
          ['Best Places to Use', 'Flooring, wall cladding, bathrooms, countertops, feature walls, staircases', 'Flooring, walls, kitchens, bathrooms, outdoor areas, commercial spaces'],
          ['Durability', 'Durable but porous; can stain if not sealed properly', 'Highly durable, stain-proof, water-resistant; minor chipping possible'],
          ['Maintenance', 'Requires sealing & polishing', 'Low maintenance. It cannot be repaired; damaged tiles must be replaced'],
          ['Installation Process', 'Slow process. Needs skilled labour, polishing, finishing', 'Fast installation using tile adhesive; ideal for quick projects'],
          ['Finish', 'Polished, honed, leather, brushed', 'Glossy, matte, textured, anti-skid'],
          ['Joints', 'Minimal joints with seamless, high-end finish', 'Visible grout lines'],
          ['Safety', 'Heat-resistant; polished finish can be slippery', 'Heat-resistant; anti-skid options available'],
        ]
      },
      'compare-stone': {
        title: 'Comparison: Granite vs Quartz vs Quartzite',
        cols: ['Category', 'Granite', 'Quartz', 'Quartzite'],
        rows: [
          ['Material', 'Natural igneous stone', 'Engineered stone (quartz + resin)', 'Natural metamorphic stone'],
          ['Aesthetic', 'Natural speckled or uniform patterns', 'Uniform, controlled designs (plain to marble-like veins)', 'Marble-like veining with natural variation'],
          ['Look', 'Limited to natural colors and patterns', 'Wide variety like white, grey, black, terrazzo', 'Exotic, unique patterns'],
          ['Natural Feel', 'Feels natural and slightly textured', 'Slightly artificial but consistent', 'Very natural, luxurious, closest to marble'],
          ['Thickness Range', '16–30 mm', '15–20 mm', '15–30 mm'],
          ['Available Sizes', 'Slabs (8–10 ft) +cut sizes', 'Slabs + jumbo slabs', 'Large slabs up to 2m × 3m or more'],
          ['Cost', '₹140 – ₹800/sq ft', '₹200 – ₹1000/sq ft', '₹400 – ₹3000/sq ft'],
          ['Durability', 'Very durable, scratch-resistant', 'Highly durable, non-porous', 'Extremely durable, harder than granite'],
          ['Heat Resistance', 'Excellent', 'Moderate. Resin can get damaged', 'Excellent .Best among all three.'],
          ['Water/Stain Resistance', 'Moderate (porous)', 'Excellent (non-porous)', 'Good but requires sealing'],
          ['Repairability', 'Can be polished and repaired', 'Cannot be repaired if chipped', 'Limited repair depends on damage'],
        ]
      },
      'lam-vs-veneer': {
        title: 'Comparison: Laminate vs Veneer',
        cols: ['Category', 'Laminate', 'Veneer'],
        rows: [
          ['Material', 'Artificial surface made from kraft paper + resins', 'Thin slice of natural wood applied on plywood and MDF'],
          ['Types', 'Technical: HPL (regular), PVC, LPL, Compact, Acrylic\nDesign: Solid colors, wood, stone, textured, metallic, digital, cane', 'Technical: Natural veneer, Engineered (recon veneer)\nDesign: Teak, Walnut, Oak, Sucupira, Wenge, Burl'],
          ['Finish', 'Uniform designs, repeat patterns; available in matte, gloss, textured, anti-fingerprint finishes', 'Natural grains, unique patterns; polish (matte, gloss)'],
          ['Thickness & Sizes', '0.8–1 mm up to 12 mm\nSizes: 8×4 ft, 10×4 ft', '0.5–1 mm\nSizes: 8×4 ft'],
          ['Cost Range', '₹70 – ₹600+ per sq ft', '₹120 – ₹1200+ per sq ft'],
          ['Installation & Time', 'Adhesive pasting; quick and easy installation', 'Adhesive + polishing; slow and requires skilled labor'],
          ['Durability & Resistance', 'Scratch-resistant, water-resistant, good for high-use areas', 'Durable but porous; sensitive to moisture, depends on polish'],
          ['Repairability & Longevity', 'Cannot be repaired; replacement required if damaged\nLifespan: 5–10 years', 'Can be sanded & repolished multiple times\nLifespan: 10–20+ years'],
          ['Maintenance', 'Very low; simple cleaning', 'High; requires polishing and careful use'],
          ['Design Flexibility', 'Very high — wide variety of colors, textures, patterns, finishes', 'Limited to wood aesthetics but offers unmatched natural richness'],
          ['Applications', 'Kitchens, wardrobes, furniture, offices, rentals', 'Wall panels, luxury furniture, doors, premium interiors'],
          ['Budget', 'Budget to mid-range', 'Premium to luxury'],
        ]
      },
      'plywood-guide': {
        title: 'Recommended Plywood by Area',
        cols: ['Area', 'Recommended Ply'],
        rows: [
          ['Wardrobes', 'MR'],
          ['TV Unit', 'MR'],
          ['Bed', 'MR'],
          ['Kitchen Carcass', 'BWR'],
          ['Sink Unit', 'BWP'],
          ['Bathroom Vanity', 'BWP'],
          ['Curved Panels', 'Flexible Ply'],
          ['Commercial Interiors', 'Fire Retardant'],
        ]
      },
      'plywood-materials': {
        title: 'Best Material by Furniture Element',
        cols: ['Furniture Element', 'Best Material'],
        rows: [
          ['Wardrobe Carcass', 'MR / BWR Plywood'],
          ['Kitchen Carcass', 'BWR / BWP Plywood'],
          ['Kitchen Shutters', 'HDHMR / MDF'],
          ['Bathroom Vanity', 'BWP Plywood'],
          ['Curved Panels', 'Flexible Plywood'],
          ['Long Shelves', 'Blockboard'],
          ['Painted Panels', 'MDF'],
          ['Budget Modular Furniture', 'Particle Board'],
        ]
      },
    };

    /* LIST DATA */
    const listData = {
      top10: {
        title: 'Top 10 Materials 2026',
        tableItems: [
          'Liquid Metallic Ombre||₹800–₹2500||0.5–1||Feature walls, entry foyers, dining accent walls, bars, powder rooms||Colortale',
          'Microcement||As premium finish ₹200–₹500||2–3||Floors, walls, bathrooms, furniture||Colortale',
          'Alabaster Lights||₹12,000 – ₹40,000 / light fixture||5–20||Dining rooms, bedrooms, bedside lamps, luxury lounges||Visual of above: Musa Design Lab',
          'Artistic Acoustic Panels||₹7,000 – ₹14,000 / panel unit||20–50||Home offices, studios, media rooms, living rooms.||Unidus Acoustics',
          'Textured Lime Plaster||Lime plaster material ₹40–₹120||8–15||Feature walls, living rooms, hallway||Limocoat',
          '3D Artwork||₹55,000 onwards.||4–5 inches||Living room feature wall, bedroom statement wall, luxury hotel & reception areas||Godai Arts',
          'Optical Fibre Fabric||Varies on request||—||Feature walls in bedrooms, Dining Table Tops||DreamLux',
          'Venetian Plaster||₹180 – ₹400||2–5||Foyer & entry walls, dining room feature walls, master bedroom walls||Vasari India',
          'Flexible MDF Curves||₹2,400 / sheet||4, 6, 8, 12||TV units & feature walls||Element Décor',
          'Wall Acoustic Fluted Panels||₹60 onwards||9–24||Home theatres, study rooms, bedrooms, conference & meeting rooms||Unidus Acoustics'
        ],
        detailItems: [
          'Liquid Metallic Ombre||Glossy gradient metallic fluid wall finish||₹800–₹2500 / sq ft||0.5–1 mm thin liquid coats epoxy layers, build up by multiple thin layers||Prep surface → primer → base colour → metallic layers → seal with clear coat → level & cure.||Wipe with a soft, damp microfiber, avoid abrasive cleaners.||• High visual impact & custom gradient effects with ultra-modern look.<br>• Seamless, continuous finish with minimal joints.||• Skilled application needed for smooth blends & avoiding streaks.<br>• Can show imperfections if surface not prepped perfectly.||Feature walls, entry foyers, dining accent walls, bars, powder rooms||Colortale',
          'Microcement||Cement polymer resins fine aggregates mixture||As premium finish ₹200–₹500 / sq ft||2–3 mm total on walls/floors||Clean & prep → primer → base coats (2–3 coats) → top finish coats → sealing.||Mop with neutral pH cleaner; avoid harsh chemicals.||• Seamless & waterproof finish with minimal look.<br>• Ultra-thin so no change to floor/door levels.||• Must be applied by experienced skills for good adhesion.<br>• Can show cracks/chips if substrate moves.||Floors, walls, bathrooms, furniture||Colortale',
          'Alabaster Lights||Soft, glowing, sculptural lighting creating warmth and luxury without visual heavines.||₹12,000 – ₹40,000 / light fixture||5–20 mm solid alabaster stone or cast alabaster used in fixtures.||Electrical point planning → ceiling hook / mounting plate → fixture installation → LED integration & testing||Dust regularly and wipe gently with a dry or slightly damp cloth; avoid harsh cleaners.||• Creates a soft, warm glow and works as a strong visual centerpiece.<br>• Pairs beautifully with modern interiors.||• Premium pricing.<br>• Requires careful handling due to the stone\'s delicate nature.||Dining rooms, bedrooms, bedside lamps, luxury lounges||World of Abner<br>Mugen Design Lab',
          'Artistic Acoustic Panels||Artistic wall panels that improves sound quality||₹7,000 – ₹14,000 / panel unit||20–50 mm||Mark panel layout → mount clips/framing → fix panels → seal gaps.||Vacuum or gentle fabric brushing dusting.||• Reduces echo & improves room acoustics.<br>• Visual design element.||• Higher cost than plain wall finishes.<br>• Needs correct placement for real acoustic impact.||Home offices, studios, media rooms, living rooms.||Unidus Acoustics',
          'Textured Lime Plaster||Traditional lime + sand mixture-Breathable and timeless. Adds depth, softness, and an earthy elegance||Lime plaster material ₹40–₹120 / sq ft||8–15 mm typical multi-coat||Prep substrate → scratch coat → intermediary coat → final finish coat → curing.||Wipe lightly & avoid harsh solvents.||• Breathable, sustainable & timeless finish.<br>• Reduces mould risk & regulates humidity.||• Longer install & requires skilled plasterer.<br>• Slightly higher cost and time than gypsum plaster.||Feature walls, living rooms, hallway||Limocoat',
          '3D Artwork||Handcrafted wall art with strong depth,giving a 3D feel||₹55,000 onwards.||4–5 inches||Artwork mounted on prepared wall using heavy-duty anchors & adhesives||Dust gently with a soft dry cloth; avoid water or harsh cleaners.||• Creates a one-of-a-kind luxury focal point that cannot be replicated.<br>• Fully customizable in design, size, texture, and colour.||• Longer install & requires skilled plasterer.<br>• Slightly higher cost and time than gypsum plaster.<br>• Requires professional installation.||Living room feature wall, bedroom statement wall, luxury hotel & reception areas||Godai Arts',
          'Optical Fibre Fabric||A high-end luminous fabric that create glowing surfaces with light within.||Varies on request.||—||Fabric stretched or panel-mounted over LED light source, with concealed wiring and power supply. Executed with fabricator + electrician.||Gentle vacuuming and dry cloth cleaning keeps lighting components dust-free.||Creates soft ambient lighting with a futuristic luxury feel.<br>Highly custom and experiential material.||High cost.<br>Requires specialized installation expertise.||Feature walls in bedrooms, Dining Table Tops||DreamLux (Italy)',
          'Venetian Plaster||A premium wall finish that mimics natural stone with depth and subtle sheen.||₹180 – ₹400 / sq.ft||2–5 mm applied in multiple thin coats||Wall leveling → primer → 2–3 plaster coats applied with steel trowel → burnishing → optional sealer.||Clean with a slightly damp cloth.<br>Avoid abrasive cleaners.||• Gives a luxury stone-like finish without joints.<br>• Durable, breathable, and visually rich.||• Requires skilled applicators for best results.<br>• Costlier than regular paint finishes.||Foyer & entry walls, dining room feature walls, master bedroom walls||Vasari India',
          'Flexible MDF Curves||Flexible MDF sheets help give flute panel look, specially for curved or rounded walls.||₹2,400 / sheet||4 mm, 6 mm, 8 mm, 12 mm||Fixed onto curved surface or framework using Marine Fevicol.<br>Clear silicone used at joints for flexibility and neat finish.||Wipe with a dry or lightly damp cloth, protect from moisture.||• Enables seamless curves impossible with regular MDF.<br>• Lightweight and ideal for contemporary designs.||• Needs precise surface preparation.<br>• Must be properly sealed to prevent moisture damage.||TV units & feature walls||Element Décor',
          'Wall Acoustic Fluted Panels||Decorative fluted panels that improve acoustics while adding aesthetic look to walls.||₹60 / sq.ft onwards depending on acoustic core & finish||9 mm–24 mm thick||Panels fixed on wall or battens using adhesives/screws, with optional acoustic insulation backing.||Vacuum flutes periodically to avoid dust accumulation.||• Enhances sound absorption and speech clarity.<br>• Adds modern linear texture to interiors.||• Grooves require regular cleaning.<br>• Performance depends on correct backing and installation.||Home theatres, study rooms, bedrooms, conference & meeting rooms||Unidus Acoustics'
        ]
      },
      /* [COMMENTED OUT - OLD exp-look listData]
      'exp-look': {
        title: 'Materials That Look ₹50L+ But Cost Under ₹50K', items: [
          'Textured Decorative & Venetian Plaster Paint|||||₹80 / sq.ft onwards for textured coats; Venetian Plaster marble-look additives ~₹180 – ₹350 / sq.ft material-only.|||1–3 mm finished texture coat on prepared wall.|||Prep wall (repair/primer) → apply base coat → apply texture/Venetian layers → seal with protective finish.|||Wipe dust lightly; reseal every few years to preserve sheen.|||Creates luxurious depth and dimension like stone or polished plaster, elevating feature walls.Can be customized with color, sheen, and vein patterns to mimic high-end finishes.|||Requires skilled applicator for premium finish. DIY often looks uneven. Not ideal for high-moisture areas without proper sealing.|||Living room feature wall, bedroom accent wall, foyer, hotel lobbies. Living room feature walls, bedroom accent walls, hotel lobbies, luxury bathrooms, reception areas.|||Vasari India',
          'Marble-Finish Tiles|||||₹90 / sq.ft onwards for decent marble-look tiles.|||Typically 8–10 mm tile thickness.|||Lay tiles on pre-prepared screed with adhesive → grout joints → seal if matte finish.|||Mop with mild detergent; avoid harsh acids on polished surfaces.|||Realistic marble aesthetic at a fraction of stone cost and no upkeep of real stone. Durable for floors/walls and available in many vein styles.|||Can feel cold/echoey without rugs or soft materials. Grout lines still visible unless large format used.|||Living room floors, bathroom walls, kitchen backsplash.|||Kajaria, Somany, Nitco',
          'Premium Finish Laminates|||||₹200 / sq.ft onwards for high-finish decorative laminates|||0.8 mm – 1.5 mm based on quality.|||Laminate sheets are bonded to substrates (ply/MDF) with adhesive; edges banded for finish.|||Wipe with a soft damp cloth; avoid abrasive cleaners.|||Wide range of textures— stone, wood, gloss, matte. Durable, scratch-resistant surfaces with easy cleaning.|||Looks less rich than real wood or lacquer if viewed closely. Thin laminates can peel if bonded poorly or exposed to moisture.|||TV units, wardrobes, kitchen cabinets, accent panels.|||Royale Touche Luxury Laminates'
        ]
      },
      */
      glass: {
        title: 'Types of Glass',
        tableItems: [
          'Clear Glass||₹40 – ₹150||4–12||Windows, partitions, doors, tabletops||Saint-Gobain',
          'Toughened Glass||₹180 – ₹400||8–15||Shower enclosures, glass doors, railings, partitions||Saint-Gobain, AIS Glass',
          'Laminated Glass||₹250 – ₹700||6–13.5||Skylights, glass floors, railings, safety glazing||Saint-Gobain, AIS Glass',
          'Frosted Glass||₹150 – ₹350||4–12||Bathroom partitions, office partitions, doors||Saint-Gobain, AIS Glass',
          'Tinted Glass||₹120 – ₹300||5–12||Facades, windows, decorative panels||Saint-Gobain, AIS Glass',
          'Lacquered Glass||₹200 – ₹450||5–8||Kitchen backsplashes, wardrobes, wall panels||Saint-Gobain, AIS Glass',
          'Fluted Glass||₹350 – ₹900||5–10||Cabinet shutters, partitions, wardrobe shutters, sliding doors, decorative panels||Saint-Gobain, AIS Glass',
          'Smoked Glass||₹200 – ₹500||5–12||Cabinet shutters, partitions, offices, wardrobe shutters, tabletops||Saint-Gobain, AIS Glass',
          'Sandwiched Glass||₹250 – ₹800||10–16||Facades, Glass partitions, Shower enclosures, Railings, Office cabins||Saint-Gobain, AIS Glass',
          'Smart Glass||₹2500 – ₹8000||8–12||Office meeting rooms, bathroom partitions, luxury homes, smart windows||Saint-Gobain, AIS Glass'
        ],
        detailItems: [
          {
            title: 'Clear Glass', rows: [
              { label: 'Material', value: 'Transparent glass with high light transmission, unobstructed visibility and natural light.' },
              { label: 'Types', value: 'Clear Float Glass, Ultra Clear Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '4, 5, 6, 8, 10, 12'],
              ['Cost (sq.ft)', '₹40 – ₹150'],
              ['Installation Method', 'Installed in aluminium, wood, or metal frames'],
              ['Maintenance', 'Clean regularly with glass cleaner and soft cloth'],
              { label: '✓ Pros', value: 'High transparency, affordable, widely available', cls: 'pros' },
              { label: '✕ Cons', value: 'Breaks into sharp shards if not tempered', cls: 'cons' },
              ['Best Places to Use', 'Windows, partitions, doors, tabletops'],
              ['Brands', 'Saint-Gobain']
            ]
          },
          {
            title: 'Toughened Glass', rows: [
              { label: 'Material', value: 'A heat-treated safety glass that is 4–5 times stronger than normal glass and breaks into small blunt pieces instead of sharp shards.' },
              { label: 'Types', value: 'Clear Toughened Glass, Frosted Toughened Glass, Tinted Toughened Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '8, 10, 12, 15'],
              ['Cost (sq.ft)', '₹180 – ₹400'],
              ['Installation Method', 'Installed with glass fittings, clamps, or patch fittings'],
              ['Maintenance', 'Clean with glass cleaner'],
              { label: '✓ Pros', value: 'High strength, safer breakage', cls: 'pros' },
              { label: '✕ Cons', value: 'Cannot be cut after tempering', cls: 'cons' },
              ['Best Places to Use', 'Shower enclosures, glass doors, railings, partitions'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Laminated Glass', rows: [
              { label: 'Material', value: 'Made by bonding two or more layers of glass with a plastic interlayer, which holds the glass together when broken.' },
              { label: 'Types', value: 'Clear Laminated Glass, Colored Laminated Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '6–12'],
              ['Cost (sq.ft)', '₹250 – ₹500'],
              ['Installation Method', 'Installed in structural frames'],
              ['Maintenance', 'Regular glass cleaning'],
              { label: '✓ Pros', value: 'High safety, sound insulation', cls: 'pros' },
              { label: '✕ Cons', value: 'Expensive compared to regular glass', cls: 'cons' },
              ['Best Places to Use', 'Skylights, glass floors, railings, safety glazing'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Frosted Glass', rows: [
              { label: 'Material', value: 'Glass that has been acid-etched or sandblasted to create a translucent surface that allows light while providing privacy.' },
              { label: 'Types', value: 'Acid Etched Glass, Sandblasted Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '4–12'],
              ['Cost (sq.ft)', '₹150 – ₹350'],
              ['Installation Method', 'Installed in frames or partitions'],
              ['Maintenance', 'Clean with mild glass cleaner'],
              { label: '✓ Pros', value: 'Provides privacy while allowing light', cls: 'pros' },
              { label: '✕ Cons', value: 'Fingerprints can be visible', cls: 'cons' },
              ['Best Places to Use', 'Bathroom partitions, office partitions, doors'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Tinted Glass', rows: [
              { label: 'Material', value: 'Colored glass produced by adding metal oxides during manufacturing to reduce glare and solar heat gain.' },
              { label: 'Types', value: 'Grey Glass, Bronze Glass, Blue Glass, Green Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5–12'],
              ['Cost (sq.ft)', '₹120 – ₹300'],
              ['Installation Method', 'Installed in frames or curtain wall systems'],
              ['Maintenance', 'Regular cleaning with glass cleaner'],
              { label: '✓ Pros', value: 'Reduces glare and sunlight', cls: 'pros' },
              { label: '✕ Cons', value: 'Slightly reduces visibility', cls: 'cons' },
              ['Best Places to Use', 'Facades, windows, decorative panels'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Lacquered/Back Painted Glass', rows: [
              { label: 'Material', value: 'Clear float glass coated with colored paint on one side to create a decorative and glossy finish.' },
              { label: 'Types', value: 'White Lacquered Glass, Colored Lacquered Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5–8'],
              ['Cost (sq.ft)', '₹200 – ₹450'],
              ['Installation Method', 'Fixed with adhesive or silicone on boards'],
              ['Maintenance', 'Clean with soft cloth'],
              { label: '✓ Pros', value: 'Smooth glossy finish, easy to clean', cls: 'pros' },
              { label: '✕ Cons', value: 'Scratches can be visible', cls: 'cons' },
              ['Best Places to Use', 'Kitchen backsplashes, wardrobes, wall panels'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Fluted Glass', rows: [
              { label: 'Material', value: 'Decorative textured glass with vertical grooves or ribbed patterns on its surface, allowing partial light to pass through.' },
              { label: 'Types', value: 'Clear Fluted Glass, Frosted Fluted Glass, Tinted Fluted Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5, 6, 8, 10'],
              ['Cost (sq.ft)', '₹350 – ₹900'],
              ['Installation Method', 'Installed in aluminium, wooden, or metal frames or fixed using glass fittings'],
              ['Maintenance', 'Clean carefully using glass cleaner and soft brush for grooves'],
              { label: '✓ Pros', value: 'Modern aesthetic, provides privacy while allowing light, decorative texture', cls: 'pros' },
              { label: '✕ Cons', value: 'Grooves collect dust, slightly difficult to clean', cls: 'cons' },
              ['Best Places to Use', 'Cabinet shutters, partitions, wardrobe shutters, sliding doors, shower enclosures, decorative panels'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Smoked Glass', rows: [
              { label: 'Material', value: 'Tinted glass with a dark grey or brown tone that reduces glare and creates a sleek, modern look.' },
              { label: 'Types', value: 'Grey Smoked Glass, Bronze Smoked Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5, 6, 8, 10, 12'],
              ['Cost (sq.ft)', '₹200 – ₹500'],
              ['Installation Method', 'Installed in frames or fixed with clamps and glass fittings'],
              ['Maintenance', 'Regular cleaning with glass cleaner to avoid smudges'],
              { label: '✓ Pros', value: 'Stylish modern look, reduces glare, hides clutter slightly', cls: 'pros' },
              { label: '✕ Cons', value: 'Dark tint reduces transparency', cls: 'cons' },
              ['Best Places to Use', 'Cabinet shutters, partitions, offices, wardrobe shutters, tabletops'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Sandwiched Glass', rows: [
              { label: 'Material', value: 'Consists of two or more layers of glass bonded together with a plastic interlayer. Safer than regular glass.' },
              { label: 'Types', value: 'Clear Laminated Glass, Frosted Laminated Glass, Colored Laminated Glass, Fabric Laminated Glass, Acoustic Laminated Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '10, 12, 16'],
              ['Cost (sq.ft)', '₹250 – ₹800'],
              ['Installation Method', 'Installed using aluminium channels, glass clamps, or patch fittings. Silicone sealant is used to seal the edges.'],
              ['Maintenance', 'Clean using glass cleaner or mild soap solution'],
              { label: '✓ Pros', value: 'Safety glass, Sound insulation properties, UV protection, Strong and durable', cls: 'pros' },
              { label: '✕ Cons', value: 'More expensive, Edges must be sealed properly, Slightly heavier', cls: 'cons' },
              ['Best Places to Use', 'Facades, Glass partitions, Shower enclosures, Railings, Office cabins'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Smart Glass', rows: [
              { label: 'Material', value: 'Also known as switchable glass. It changes from transparent to opaque when an electric current is applied.' },
              { label: 'Types', value: 'Electrochromic Glass, Suspended Particle Device (SPD) Glass' },
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '8–12'],
              ['Cost (sq.ft)', '₹2500 – ₹8000'],
              ['Installation Method', 'Installed as laminated glass panels with electrical wiring connected to a switch or remote control'],
              ['Maintenance', 'Clean with mild glass cleaner and avoid water contact with electrical connections'],
              { label: '✓ Pros', value: 'Instant privacy control, modern technology, eliminates need for curtains or blinds', cls: 'pros' },
              { label: '✕ Cons', value: 'Expensive, requires electrical connection', cls: 'cons' },
              ['Best Places to Use', 'Office meeting rooms, bathroom partitions, luxury homes, smart windows'],
              ['Brands', 'AIS Smart Glass, Smartglass International, Gauzy']
            ]
          }
        ]
      },
      limewash: {
        title: 'Limewash Finish', items: [
          'Limewash||₹20 – ₹38 / sq.ft||0.2–0.5 mm per coat (multi-layer)||Surface prep → dilute lime → apply 2–3 coats with brush → allow drying between coats||Clean with dry/damp cloth; may need touch-ups over time||Cost-effective, natural breathable, antibacterial, unique handcrafted look||Less durable in high-traffic areas, uneven if poorly applied||Living rooms, bedrooms, feature walls, boutique hotels, rustic interiors'
        ]
      },
      limeplaster: {
        title: 'Lime Plaster Finish', items: [
          'Lime Plaster||₹80 – ₹250 / sq.ft||2–5 mm (multi-layer)||Surface prep → base coat → second coat → smoothing/burnishing → curing||High durability; low maintenance; occasional cleaning and sealing||Highly durable, breathable, eco-friendly, premium aesthetic||Higher cost, needs skilled labour, longer application time||Feature walls, living rooms, bedrooms, luxury interiors, villas'
        ]
      },
      venetian: {
        title: 'Venetian Plaster Finish', items: [
          'Venetian Plaster||₹250 – ₹800+ per sq.ft||1–3 mm (multi-layer)||Material: Made from slaked lime, fine marble dust, natural pigments. Finish: Smooth glossy or satin surface, marble-like appearance. Installation: Base → multiple thin coats with steel trowel → burnish → optional sealing/waxing||Maintenance: Wipe with damp cloth; avoid harsh chemicals; occasional waxing. Brands: Vasari India, Granotone, Pratta India||Luxurious marble-like finish, seamless surface, highly durable, breathable, premium appearance||Expensive, requires skilled labour, time-intensive, difficult to repair||Feature walls, living rooms, master bedrooms, luxury homes, hotel lobbies'
        ]
      },
      clay: {
        title: 'Clay Cladding Finish', items: [
          'Clay Cladding||₹150 – ₹500+ per sq.ft||10–25 mm (depending on system)||Material: Natural clay, kiln-fired into tiles, panels, or bricks. Finish: Earthy matte textured finish with warm tones. Installation: Base → metal framework → fix panels using clips or adhesive||Maintenance: Low maintenance; occasional water cleaning; weather-resistant. Brands: MCM Flexi, Articlad||Natural material, highly durable, weather-resistant, breathable, excellent insulation||Higher cost, heavy material, requires proper installation, limited colours||Building facades, exterior walls, balconies, feature walls, villas'
        ]
      },
      metallic: {
        title: 'Liquid Metallic Ombre Finish', items: [
          'Liquid Metallic Ombre||₹180 – ₹500+ per sq.ft||0.5–1 mm (thin layered coating)||Material: Metallic paints with mica pigments. Finish: Luxurious gradient ombre effect with reflective sheen. Installation: Base → base coat → metallic layers → blend tones → optional protective topcoat||Maintenance: Clean with soft cloth; avoid abrasives; protective coating improves lifespan||High visual impact, luxurious metallic finish, customizable gradients, enhances lighting||Requires skilled labour, expensive vs regular paint, difficult to repair||Feature walls, living rooms, dining areas, bedrooms, hotel lobbies, luxury retail'
        ]
      },
      'laminate-types': {
        title: 'Types of Laminates', items: [
          'Regular Laminate (HPL)||₹70 – ₹250 / sq.ft||0.8–1 mm||Adhesive bonding to plywood/MDF substrate using contact adhesive; edge banding with matching PVC strips; roller pressed for uniform adhesion||Wipe with damp microfiber cloth; avoid abrasive cleaners; mild soap for stubborn stains||Durable, scratch-resistant, wide variety of textures and colors, budget-friendly, easy to clean||Cannot be bent or molded, edges can peel if low-quality glue used, less premium look than veneer||Wardrobes, TV units, kitchen cabinets, office furniture, bedroom sets',
          'PVC Laminate||₹50 – ₹150 / sq.ft||0.5–1.5 mm||Adhesive application on substrate; can be applied on curved surfaces due to flexibility; heat-assisted application for complex shapes||Easy to clean with damp cloth; avoid sharp objects that can puncture PVC layer||Moisture-resistant, flexible for curved surfaces, affordable, good durability||Can fade in direct sunlight, less heat-resistant, thinner than HPL||Kitchen cabinets, bathroom vanities, moisture-prone areas, budget furniture',
          'High Pressure Laminate (HPL)||₹150 – ₹400 / sq.ft||0.8–1.5 mm||Industrial-grade adhesive application; CNC-cut for precision; edge finishing with aluminum or matching strips||Regular cleaning with mild detergent; periodic polishing for high-gloss finishes||Highly durable, superior impact resistance, excellent surface finish, antibacterial options available||Higher cost, requires skilled installation, heavier than standard laminates||Premium wardrobes, office workstations, commercial furniture, kitchen countertops',
          'Prelam Board (Pre-Laminated)||₹60 – ₹180 / sq.ft||6–25 mm (board thickness)||Edge band and assemble using cam and dowel system; no on-site lamination required; fast installation process||Dust regularly; clean edges with dry cloth; avoid water contact at edges||Ready-to-use, no lamination needed, cost-effective, uniform finish, quick installation||Limited customization, visible joints between panels, edges require edge banding||Modular furniture, rental properties, flat-pack furniture, quick installations',
          'Core Laminate (Compact)||₹200 – ₹500 / sq.ft||6–16 mm||Can be edge-fastened or bonded; drill and tap for hardware; edge finishing optional due to decorative core||Easy to clean with any cleaner; resistant to most chemicals and stains||Self-supporting, no substrate needed, extremely durable, hygienic, moisture-resistant||Heavy material, expensive, requires strong hardware for installation||Kitchen countertops, bathroom partitions, lab tables, public furniture, lockers',
          'Acrylic Laminate (High Gloss)||₹250 – ₹600 / sq.ft||1–2 mm||Contact adhesive application; protect surface during handling; edge band with matching acrylic strip; polish edges for seamless look||Microfiber cloth for dust; glass cleaner for smudges; avoid abrasive materials||Ultra-high gloss, mirror-like finish, modern luxury look, adds brightness to space||Shows fingerprints easily, scratches visible, expensive, requires careful handling||Modern TV units, wardrobes, kitchen shutters, contemporary furniture, accent panels',
          'Anti-Fingerprint Laminate||₹180 – ₹350 / sq.ft||0.8–1 mm||Standard lamination process with contact adhesive; handle with clean gloves to maintain surface quality during installation||Wipe with soft cloth; nano-coating maintains fingerprint resistance after cleaning||Fingerprint-resistant, smudge-proof, easy maintenance, modern matte finish||Limited availability, premium pricing, coating may wear over time with heavy use||Kitchen cabinets, wardrobes in kids rooms, furniture handles, high-use surfaces',
          'Textured Decorative Laminate||₹100 – ₹300 / sq.ft||0.8–1.2 mm||Standard adhesive bonding; alignment important for texture continuity in large areas; edge band with matching texture||Clean along texture direction; soft brush for grooves; mild cleaner for stubborn dirt||Realistic textures, hides minor scratches, tactile feel, decorative appeal, affordable alternative to natural materials||Texture can collect dust in grooves, harder to clean than smooth surfaces, pattern repetition may be visible||TV units, wardrobes, feature walls, office furniture, statement furniture pieces',
          'Exterior Grade Laminate||₹250 – ₹600 / sq.ft||6–12 mm (compact)||Mechanical fixing with screws or clips; leave expansion gaps; use stainless steel hardware||Hose down with water; clean with mild detergent; inspect fixings annually||UV-resistant, waterproof, weatherproof, durable in harsh conditions, maintains color||Expensive, heavy, limited decorative options, requires proper ventilation behind panels||Exterior cladding, outdoor furniture, balcony railings, signage boards, pergola panels'
        ]
      },
      door: {
        title: 'Door Finishes',
        tableItems: [
          'Door Skins||₹1,500–₹5,000/door||1–2 mm||Main doors, bedroom doors, passage doors, low-use interior doors||',
          'Flute Panel Doors||₹250–₹600 / sq.ft||12–18 mm MDF panel||Main doors, bedroom doors, bathroom dry-area doors||',
          'Veneer Doors||₹100–₹350 / sq.ft||0.5–1 mm veneer on 30–35 mm door||Bedrooms, living room doors, home office doors||',
          'Laminate Doors||₹80–₹250 / sq.ft||0.8–1 mm laminate on 30–35 mm flush door||Bathrooms (dry areas), bedrooms, passage doors, rental homes||',
          'Metal Doors (SS/Brass/MS)||₹500–₹2,000 / sq.ft||1–2 mm metal sheet||Main entrance doors, statement doors, office doors||',
          'PU Painted Doors||₹150–₹350 / sq.ft||30–35 mm door + 2–3 coats of PU||Bedrooms, kids rooms, minimalist design homes||',
          'Glass Doors (Clear/Fluted/Tinted/Smoked)||₹250–₹800 / sq.ft||8–12 mm toughened glass||Walk-in closets, bathrooms, partitions, study rooms||'
        ],
        detailItems: [
          {
            title: 'Door Skins', rows: [
              ['Raw Material Cost', '₹1,500–₹5,000/door skin'],
              ['Thickness Required', '1–2 mm'],
              ['Installation Process', 'Skin glued onto flush door using adhesive + roller pressing; edges trimmed and polished'],
              ['Maintenance', 'Wipe with damp microfiber cloth weekly'],
              { label: '\u2713 Pros', value: 'Premium look at affordable cost; huge variety of textures and finishes', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Not as durable as veneer; can peel if exposed to moisture', cls: 'cons' },
              ['Best Places to Use', 'Main doors, bedroom doors, passage doors, low-use interior doors'],
            ]
          },
          {
            title: 'Flute Panel Doors', rows: [
              ['Raw Material Cost', '₹250–₹600 / sq.ft (MDF Fluting)'],
              ['Thickness Required', '12–18 mm MDF panel over door'],
              ['Installation Process', 'Fluted sheets cut to size, glued/nailed on door, edges finished with beading,then painted or polished'],
              ['Maintenance', 'Dust with soft brush; clean grooves using vacuum brush attachment'],
              { label: '\u2713 Pros', value: 'Adds modern, textured look; works well for large statement doors', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Takes more time to clean grooves; paint can chip if hit by heavy objects', cls: 'cons' },
              ['Best Places to Use', 'Main doors, bedroom doors, bathroom dry-area doors'],
            ]
          },
          {
            title: 'Veneer Doors', rows: [
              ['Raw Material Cost', '₹100–₹350 per sq ft (veneers); door cost varies'],
              ['Thickness Required', '0.5–1 mm veneer on 30–35 mm door'],
              ['Installation Process', 'Veneer sheet glued + pressed, sanded, finished with melamine/PU polish'],
              ['Maintenance', 'Wipe with dry cloth; avoid water spills'],
              { label: '\u2713 Pros', value: 'Rich, natural, luxurious wood look; customizable with stains and polishes', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires skilled polishing; susceptible to scratches and moisture', cls: 'cons' },
              ['Best Places to Use', 'Bedrooms, living room doors, home office doors'],
            ]
          },
          {
            title: 'Laminate Doors', rows: [
              ['Raw Material Cost', '₹80–₹250 / sq.ft'],
              ['Thickness Required', '0.8–1 mm laminate on 30–35 mm flush door'],
              ['Installation Process', 'Laminate sheets glued and pressed; edges finished with matching PVC edge banding'],
              ['Maintenance', 'Clean with mild soap solution; easy to maintain'],
              { label: '\u2713 Pros', value: 'Budget-friendly and very durable; wide variety of textures and colours', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Looks less premium than veneer; edge banding may loosen if low-quality glue used', cls: 'cons' },
              ['Best Places to Use', 'Bathrooms (dry areas), bedrooms, passage doors, rental homes'],
            ]
          },
          {
            title: 'Metal Doors (SS/Brass/MS)', rows: [
              ['Raw Material Cost', '₹500–₹2,000 per sq ft (SS, brass, MS sheets)'],
              ['Thickness Required', '1–2 mm metal sheet over door panel'],
              ['Installation Process', 'Metal sheets CNC cut, stuck with high-strength adhesive, screwed at corners; powder coating done after'],
              ['Maintenance', 'Soft cloth + metal-safe cleaner; avoid harsh chemical polishes'],
              { label: '\u2713 Pros', value: 'Extremely strong, premium, and impactful; perfect for modern luxury interiors', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive + heavy; fingerprints and scratches show easily on some finishes', cls: 'cons' },
              ['Best Places to Use', 'Main entrance doors, statement doors, office doors'],
            ]
          },
          {
            title: 'PU Painted Doors', rows: [
              ['Raw Material Cost', '₹150–₹350 / sq.ft'],
              ['Thickness Required', '30–35 mm door + 2–3 coats of PU'],
              ['Installation Process', 'Surface sanded, primed, sprayed with PU coats, polished to matte/gloss finish'],
              ['Maintenance', 'Wipe with soft microfiber cloth; avoid abrasives'],
              { label: '\u2713 Pros', value: 'Seamless, smooth, premium finish; any shade possible—fully customizable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can chip if hit strongly; slightly expensive due to labour & polish', cls: 'cons' },
              ['Best Places to Use', 'Bedrooms, kids rooms, minimalist design homes'],
            ]
          },
          {
            title: 'Glass Doors (Clear/Fluted/Tinted/Smoked)', rows: [
              ['Raw Material Cost', '₹250–₹800 / sq.ft (painting cost)'],
              ['Thickness Required', '8–12 mm toughened glass'],
              ['Installation Process', 'Glass toughened, polished, fitted in wooden/metal frame or installed frameless with floor spring + hardware'],
              ['Maintenance', 'Clean with glass cleaner; avoid watermarks'],
              { label: '\u2713 Pros', value: 'Opens up space and increases natural light; modern, sleek, and elegant', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Needs regular cleaning; privacy limited unless frosted/tinted', cls: 'cons' },
              ['Best Places to Use', 'Walk-in closets, bathrooms, partitions, study rooms'],
            ]
          }
        ]
      },
      bed: {
        title: 'Bed Finishes',
        tableItems: [
          'LAMINATE FINISH||₹80–₹300 per sq ft||18 mm ply structure + 0.8–1 mm laminate||Budgeted homes, rental properties, functional storage beds||',
          'VENEER FINISH||₹120–₹400 per sq ft||18 mm ply + 0.5–1 mm veneer||Master bedrooms, premium homes||',
          'PU PAINT FINISH||₹180–₹450 per sq ft||MDF/ply base + multiple PU coats||Modern minimal beds||',
          'SOLID WOOD FINISH (TEAK / SHEESHAM WOOD)||₹1500–₹5000+ per sq ft (wood dependent)||25–75 mm sections (structural members)||Luxury homes, long-term investment beds||',
          'UPHOLSTERED FINISH (FABRIC / LEATHER)||₹150–₹600 per sq ft||1–3 mm metal sections||Minimal homes, guest rooms, studio apartments||',
          'METAL FINISH (MS / SS FRAME)||₹250–₹800 per sq ft||10–25 mm (varies by stone type)||Rustic interiors, accent TV walls, textured backdrops||',
          'PRE-LAM PARTICLE BOARD FINISH||₹70–₹200 per sq ft||15–18 mm boards||Budget homes, rental furniture||',
          'ACRYLIC FINISH||₹250–₹600 per sq ft||~1 mm acrylic sheet on MDF/ply||Contemporary bedrooms||',
          'RATTAN CANE FINISH||₹150–₹500 per sq ft||Cane weave + wood frame||Boho, tropical, airy bedrooms||',
          'BAMBOO FINISH||₹200–₹600 per sq ft||15–30 mm panels/sections||Eco-conscious homes, minimalist interiors||'
        ],
        detailItems: [
          {
            title: 'LAMINATE FINISH', rows: [
              ['Raw Material Cost', '₹80–₹300 per sq ft'],
              ['Thickness Required', '18 mm ply structure + 0.8–1 mm laminate'],
              ['Installation Process', 'Plywood bed structure made (box/storage), laminate sheets glued & edge-banded.'],
              ['Maintenance', 'Easy—wipe with damp cloth.'],
              { label: '\u2713 Pros', value: 'Budget-friendly, durable, wide design options.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less premium than veneer/solid wood.', cls: 'cons' },
              ['Best Places to Use', 'Budgeted homes, rental properties, functional storage beds.'],
            ]
          },
          {
            title: 'VENEER FINISH', rows: [
              ['Raw Material Cost', '₹120–₹400 per sq ft'],
              ['Thickness Required', '18 mm ply + 0.5–1 mm veneer'],
              ['Installation Process', 'Veneer applied on ply structure, polished with melamine/PU.'],
              ['Maintenance', 'Dry cloth; avoid moisture.'],
              { label: '\u2713 Pros', value: 'Natural wood look, premium finish.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive; requires skilled polish.', cls: 'cons' },
              ['Best Places to Use', 'Master bedrooms, premium homes.'],
            ]
          },
          {
            title: 'PU PAINT FINISH', rows: [
              ['Raw Material Cost', '₹180–₹450 per sq ft'],
              ['Thickness Required', 'MDF/ply base + multiple PU coats'],
              ['Installation Process', 'Surface prepared, spray painted, and polished.'],
              ['Maintenance', 'Soft cloth cleaning.'],
              { label: '\u2713 Pros', value: 'Seamless finish, any colour possible.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Chips on impact; higher labour cost.', cls: 'cons' },
              ['Best Places to Use', 'Modern minimal beds.'],
            ]
          },
          {
            title: 'SOLID WOOD FINISH (TEAK / SHEESHAM WOOD)', rows: [
              ['Raw Material Cost', '₹1500–₹5000+ per sq ft (wood dependent)'],
              ['Thickness Required', '25–75 mm sections (structural members)'],
              ['Installation Process', 'Fully carpentered or factory-made bed with joinery; polished or coated.'],
              ['Maintenance', 'Regular polishing; avoid moisture.'],
              { label: '\u2713 Pros', value: 'Extremely durable, timeless, premium feel.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive; heavy; may expand/shrink.', cls: 'cons' },
              ['Best Places to Use', 'Luxury homes, long-term investment beds.'],
            ]
          },
          {
            title: 'UPHOLSTERED FINISH (FABRIC / LEATHER)', rows: [
              ['Raw Material Cost', '₹150–₹600 per sq ft'],
              ['Thickness Required', '1–3 mm metal sections'],
              ['Installation Process', 'Welded metal frame; powder-coated or painted.'],
              ['Maintenance', 'Low; occasional cleaning.'],
              { label: '\u2713 Pros', value: 'Strong, lightweight, modern/industrial look.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Limited storage options; can feel less premium.', cls: 'cons' },
              ['Best Places to Use', 'Minimal homes, guest rooms, studio apartments.'],
            ]
          },
          {
            title: 'METAL FINISH (MS / SS FRAME)', rows: [
              ['Raw Material Cost', '₹250–₹800 per sq ft'],
              ['Thickness Required', '10–25 mm (varies by stone type)'],
              ['Installation Process', 'Stone pieces/slabs fixed using adhesive + cement backing; joints may be visible or dry-stacked.'],
              ['Maintenance', 'Occasional dusting; sealing recommended to prevent stains.'],
              { label: '\u2713 Pros', value: 'Natural textured look, adds depth & warmth; good for feature walls.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Uneven surface collects dust; requires sealing; not a sleek finish.', cls: 'cons' },
              ['Best Places to Use', 'Rustic interiors, accent TV walls, textured backdrops.'],
            ]
          },
          {
            title: 'PRE-LAM PARTICLE BOARD FINISH', rows: [
              ['Raw Material Cost', '₹70–₹200 per sq ft'],
              ['Thickness Required', '15–18 mm boards'],
              ['Installation Process', 'Modular panels assembled using connectors.'],
              ['Maintenance', 'Dry cloth cleaning; avoid water.'],
              { label: '\u2713 Pros', value: 'Affordable, factory-finished, quick installation.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less durable than ply; moisture sensitive.', cls: 'cons' },
              ['Best Places to Use', 'Budget homes, rental furniture.'],
            ]
          },
          {
            title: 'ACRYLIC FINISH', rows: [
              ['Raw Material Cost', '₹250–₹600 per sq ft'],
              ['Thickness Required', '~1 mm acrylic sheet on MDF/ply'],
              ['Installation Process', 'Acrylic sheets pressed onto panels.'],
              ['Maintenance', 'Microfiber cloth; avoid scratches.'],
              { label: '\u2713 Pros', value: 'High-gloss, modern, reflective finish.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Scratches & fingerprints visible.', cls: 'cons' },
              ['Best Places to Use', 'Contemporary bedrooms.'],
            ]
          },
          {
            title: 'RATTAN CANE FINISH', rows: [
              ['Raw Material Cost', '₹150–₹500 per sq ft'],
              ['Thickness Required', 'Cane weave + wood frame'],
              ['Installation Process', 'Cane woven into wooden frame panels.'],
              ['Maintenance', 'Dry cleaning; avoid moisture.'],
              { label: '\u2713 Pros', value: 'Lightweight, breathable, natural aesthetic.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Not very durable under heavy impact; can sag over time.', cls: 'cons' },
              ['Best Places to Use', 'Boho, tropical, airy bedrooms.'],
            ]
          },
          {
            title: 'BAMBOO FINISH', rows: [
              ['Raw Material Cost', '₹200–₹600 per sq ft'],
              ['Thickness Required', '15–30 mm panels/sections'],
              ['Installation Process', 'Bamboo treated, cut, and assembled like wood furniture.'],
              ['Maintenance', 'Occasional polishing; avoid excess moisture.'],
              { label: '\u2713 Pros', value: 'Sustainable, lightweight, unique aesthetic.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Limited availability; not as strong as hardwood.', cls: 'cons' },
              ['Best Places to Use', 'Eco-conscious homes, minimalist interiors.'],
            ]
          }
        ]
      },
      headboard: {
        title: 'Headboard Finishes',
        tableItems: [
          'FABRIC UPHOLSTERED||₹250–₹800 per sq ft||25–75 mm (ply + foam + fabric)||Comfortable, cozy bedrooms, family homes||',
          'LEATHERITE||₹400–₹1200 per sq ft||25–75 mm (ply + foam + leatherette)||Luxury bedrooms, hotel-style interiors||',
          'RATTAN CANE||₹150–₹500 per sq ft||Cane weave + wooden frame||Boho, tropical, airy bedrooms||',
          'CHARCOAL PANEL||₹150–₹400 per sq ft||8–25 mm panels||Modern, low-maintenance bedrooms||',
          'ACRYLIC||₹300–₹800 per sq ft||1–1.5 mm acrylic on MDF||Contemporary, high-gloss interiors||',
          'CNC CUT / JAALI DESIGN||₹300–₹900 per sq ft||8–18 mm MDF||Statement bedrooms||',
          'PU PAINT FINISH||₹180–₹450 per sq ft||MDF/ply base + PU coating||Modern, minimal interiors||',
          'VENEER FINISH||₹120–₹400 per sq ft||16–18 mm ply + veneer||Premium bedrooms||'
        ],
        detailItems: [
          {
            title: 'FABRIC UPHOLSTERED', rows: [
              ['Raw Material Cost', '₹250–₹800 per sq ft'],
              ['Thickness Required', '25–75 mm (ply + foam + fabric)'],
              ['Installation Process', 'Ply base fixed to wall, foam layered, fabric stretched and upholstered.'],
              ['Maintenance', 'Vacuum cleaning; stain removal required.'],
              { label: '\u2713 Pros', value: 'Soft, cozy, wide fabric options, breathable.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Absorbs dust/stains; higher maintenance.', cls: 'cons' },
              ['Best Places to Use', 'Comfortable, cozy bedrooms, family homes.'],
            ]
          },
          {
            title: 'LEATHERITE', rows: [
              ['Raw Material Cost', '₹400–₹1200 per sq ft'],
              ['Thickness Required', '25–75 mm (ply + foam + leatherette)'],
              ['Installation Process', 'Foam added over base and leatherette tightly upholstered.'],
              ['Maintenance', 'Easy—wipe with damp cloth.'],
              { label: '\u2713 Pros', value: 'Premium look, easy maintenance, stain-resistant.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less breathable; may crack over time.', cls: 'cons' },
              ['Best Places to Use', 'Luxury bedrooms, hotel-style interiors.'],
            ]
          },
          {
            title: 'RATTAN CANE', rows: [
              ['Raw Material Cost', '₹150–₹500 per sq ft'],
              ['Thickness Required', 'Cane weave + wooden frame'],
              ['Installation Process', 'Cane woven into wooden/MDF frame panels and fixed to wall/bed.'],
              ['Maintenance', 'Dry cleaning; avoid moisture.'],
              { label: '\u2713 Pros', value: 'Natural, breathable, lightweight, trendy.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can sag over time; not very impact-resistant.', cls: 'cons' },
              ['Best Places to Use', 'Boho, tropical, airy bedrooms.'],
            ]
          },
          {
            title: 'CHARCOAL PANEL', rows: [
              ['Raw Material Cost', '₹150–₹400 per sq ft'],
              ['Thickness Required', '8–25 mm panels'],
              ['Installation Process', 'Panels fixed on framework or directly on wall using adhesive/screws.'],
              ['Maintenance', 'Easy—dusting or wiping.'],
              { label: '\u2713 Pros', value: 'Waterproof, termite-resistant, modern fluted look.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Limited colour options; slightly artificial finish.', cls: 'cons' },
              ['Best Places to Use', 'Modern, low-maintenance bedrooms.'],
            ]
          },
          {
            title: 'ACRYLIC', rows: [
              ['Raw Material Cost', '₹300–₹800 per sq ft'],
              ['Thickness Required', '1–1.5 mm acrylic on MDF'],
              ['Installation Process', 'Acrylic sheets machine-pressed on boards and fixed.'],
              ['Maintenance', 'Microfiber cleaning; avoid scratches.'],
              { label: '\u2713 Pros', value: 'Ultra-glossy, modern, reflective.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Scratch-prone; fingerprints visible.', cls: 'cons' },
              ['Best Places to Use', 'Contemporary, high-gloss interiors.'],
            ]
          },
          {
            title: 'CNC CUT / JAALI DESIGN', rows: [
              ['Raw Material Cost', '₹300–₹900 per sq ft'],
              ['Thickness Required', '8–18 mm MDF'],
              ['Installation Process', 'CNC-cut panels fixed and painted/polished.'],
              ['Maintenance', 'Easy cleaning.'],
              { label: '\u2713 Pros', value: 'Custom patterns, designer look.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Costly; design-specific.', cls: 'cons' },
              ['Best Places to Use', 'Statement bedrooms.'],
            ]
          },
          {
            title: 'PU PAINT FINISH', rows: [
              ['Raw Material Cost', '₹180–₹450 per sq ft'],
              ['Thickness Required', 'MDF/ply base + PU coating'],
              ['Installation Process', 'Spray painted and polished.'],
              ['Maintenance', 'Soft cloth cleaning.'],
              { label: '\u2713 Pros', value: 'Seamless finish, customizable colours.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Prone to scratches/chips.', cls: 'cons' },
              ['Best Places to Use', 'Modern, minimal interiors.'],
            ]
          },
          {
            title: 'VENEER FINISH', rows: [
              ['Raw Material Cost', '₹120–₹400 per sq ft'],
              ['Thickness Required', '16–18 mm ply + veneer'],
              ['Installation Process', 'Veneer pasted and polished (melamine/PU).'],
              ['Maintenance', 'Dry cloth; avoid moisture.'],
              { label: '\u2713 Pros', value: 'Natural wood feel, premium finish.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive; requires polishing.', cls: 'cons' },
              ['Best Places to Use', 'Premium bedrooms.'],
            ]
          }
        ]
      },
      sidetable: {
        title: 'Side Table Finishes',
        tableItems: [
          'LAMINATE FINISH||₹80–₹300 per sq ft||16–18 mm ply/MDF + 0.8–1 mm laminate||Budget homes, rental furniture.||',
          'VENEER FINISH||₹120–₹400 per sq ft||0.5–1 mm veneer on ply||||',
          'PU PAINT FINISH||₹180–₹450 per sq ft||MDF/ply base + PU coating||Modern, minimal interiors.||',
          'SOLID WOOD TABLE (TEAK / SHEESHAM WOOD)||₹1500–₹5000+ per sq ft||18–40 mm sections||Luxury bedrooms, long-term furniture.||',
          'FABRIC FINISH||₹300–₹1200 per sq ft||Ply base + foam + fabric/leather||Luxury bedrooms.||',
          'METAL FINISH (MS / SS FRAME)||₹150–₹600 per sq ft||1–3 mm metal sections||Minimal, industrial homes.||',
          'PRE-LAM PARTICLE FINISH||₹60–₹150 per sq ft||15–18 mm pre-laminated particle board/MDF||Budget homes, rental furniture, quick projects.||',
          'ACRYLIC FINISH||₹300–₹800 per sq ft||1–1.5 mm acrylic sheet on MDF/HDHMR||Modern luxury bedrooms, high-gloss interiors.||',
          'MIRROR FINISH||₹300–₹900 per sq ft||5–6 mm mirror panels||Small bedrooms, glam interiors.||',
          'FLUTED PANEL FINISH||₹250–₹700 per sq ft||12–18 mm MDF/HDHMR with grooves||Modern luxury bedrooms.||',
          'LEATHERITE FINISH||₹400–₹1500 per sq ft||Ply base + foam + leather||Luxury bedrooms.||',
          'TERRAZZO FINISH||₹300–₹1000 per sq ft||15–20 mm slab / coating||Designer, contemporary homes.||',
          'CORIAN FINISH||₹800–₹2500 per sq ft||6–12 mm sheets||Ultra-luxury interiors.||',
          'METAL INLAY / BRASS||₹500–₹2000 per sq ft||Thin metal strips (1–3 mm)||Premium and bespoke furniture.||',
          'MARBLE FINISH||₹400–₹2000+ per sq ft||15–20 mm marble slab (top); 18 mm ply/MDF base for structure (if not full marble)||Luxury bedrooms, hotel-style interiors, statement side tables.||'
        ],
        detailItems: [
          {
            title: 'LAMINATE FINISH', rows: [
              ['Raw Material Cost', '₹80–₹300 per sq ft'],
              ['Thickness Required', '16–18 mm ply/MDF + 0.8–1 mm laminate'],
              ['Installation Process', 'Laminate sheets glued and edge-banded on structure.'],
              ['Maintenance', 'Easy—wipe with damp cloth.'],
              { label: '\u2713 Pros', value: 'Budget-friendly, durable, wide variety.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less premium look.', cls: 'cons' },
              ['Best Places to Use', 'Budget homes, rental furniture.'],
            ]
          },
          {
            title: 'VENEER FINISH', rows: [
              ['Raw Material Cost', '₹120–₹400 per sq ft'],
              ['Thickness Required', '0.5–1 mm veneer on ply'],
              ['Installation Process', 'Veneer applied and polished (melamine/PU).'],
              ['Maintenance', 'Dry cloth; avoid moisture.'],
              { label: '\u2713 Pros', value: 'Natural wood feel, premium look.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive; requires care.', cls: 'cons' },
              ['Best Places to Use', 'Home offices, premium study rooms.'],
            ]
          },
          {
            title: 'PU PAINT FINISH', rows: [
              ['Raw Material Cost', '₹180–₹450 per sq ft'],
              ['Thickness Required', 'MDF/ply base + PU coating'],
              ['Installation Process', 'Spray painted and polished (matte/gloss).'],
              ['Maintenance', 'Soft cloth cleaning.'],
              { label: '\u2713 Pros', value: 'Seamless, customizable colours.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Chips on impact.', cls: 'cons' },
              ['Best Places to Use', 'Modern, minimal interiors.'],
            ]
          },
          {
            title: 'SOLID WOOD TABLE (TEAK / SHEESHAM WOOD)', rows: [
              ['Raw Material Cost', '₹1500–₹5000+ per sq ft'],
              ['Thickness Required', '18–40 mm sections'],
              ['Installation Process', 'Fully carpentered or factory-made, polished.'],
              ['Maintenance', 'Periodic polishing.'],
              { label: '\u2713 Pros', value: 'Durable, timeless, premium.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, heavy.', cls: 'cons' },
              ['Best Places to Use', 'Luxury bedrooms, long-term furniture.'],
            ]
          },
          {
            title: 'FABRIC FINISH', rows: [
              ['Raw Material Cost', '₹300–₹1200 per sq ft'],
              ['Thickness Required', 'Ply base + foam + fabric/leather'],
              ['Installation Process', 'Upholstery fixed over structure.'],
              ['Maintenance', 'Vacuum; stain care.'],
              { label: '\u2713 Pros', value: 'Soft, luxurious look.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'High maintenance.', cls: 'cons' },
              ['Best Places to Use', 'Luxury bedrooms.'],
            ]
          },
          {
            title: 'METAL FINISH (MS / SS FRAME)', rows: [
              ['Raw Material Cost', '₹150–₹600 per sq ft'],
              ['Thickness Required', '1–3 mm metal sections'],
              ['Installation Process', 'Welded frame; powder-coated/painted.'],
              ['Maintenance', 'Low maintenance.'],
              { label: '\u2713 Pros', value: 'Lightweight, modern, durable.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Limited storage.', cls: 'cons' },
              ['Best Places to Use', 'Minimal, industrial homes.'],
            ]
          },
          {
            title: 'PRE-LAM PARTICLE FINISH', rows: [
              ['Raw Material Cost', '₹60–₹150 per sq ft'],
              ['Thickness Required', '15–18 mm pre-laminated particle board/MDF'],
              ['Installation Process', 'Boards are factory-finished; cut and edge-banded, then assembled using connectors.'],
              ['Maintenance', 'Very easy—wipe with damp cloth.'],
              { label: '\u2713 Pros', value: 'Cost-effective, quick installation, uniform finish, no polishing required.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Limited design options; visible joints/edges; lower durability than plywood.', cls: 'cons' },
              ['Best Places to Use', 'Budget homes, rental furniture, quick projects.'],
            ]
          },
          {
            title: 'ACRYLIC FINISH', rows: [
              ['Raw Material Cost', '₹300–₹800 per sq ft'],
              ['Thickness Required', '1–1.5 mm acrylic sheet on MDF/HDHMR'],
              ['Installation Process', 'Acrylic sheets machine-pressed onto boards; edges finished with edge band.'],
              ['Maintenance', 'Clean with microfiber cloth; avoid scratches.'],
              { label: '\u2713 Pros', value: 'Ultra-glossy, premium look, highly reflective, modern appeal.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Scratch-prone; fingerprints visible; higher cost than laminate.', cls: 'cons' },
              ['Best Places to Use', 'Modern luxury bedrooms, high-gloss interiors.'],
            ]
          },
          {
            title: 'MIRROR FINISH', rows: [
              ['Raw Material Cost', '₹300–₹900 per sq ft'],
              ['Thickness Required', '5–6 mm mirror panels'],
              ['Installation Process', 'Mirror panels fixed on structure.'],
              ['Maintenance', 'Frequent cleaning required.'],
              { label: '\u2713 Pros', value: 'Makes space look bigger; adds glamour.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'High maintenance; fragile.', cls: 'cons' },
              ['Best Places to Use', 'Small bedrooms, glam interiors.'],
            ]
          },
          {
            title: 'FLUTED PANEL FINISH', rows: [
              ['Raw Material Cost', '₹250–₹700 per sq ft'],
              ['Thickness Required', '12–18 mm MDF/HDHMR with grooves'],
              ['Installation Process', 'CNC-cut grooves or ready fluted panels fixed on structure.'],
              ['Maintenance', 'Dust collects in grooves—regular cleaning needed.'],
              { label: '\u2713 Pros', value: 'Trendy, adds texture and depth.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Slightly high maintenance.', cls: 'cons' },
              ['Best Places to Use', 'Modern luxury bedrooms.'],
            ]
          },
          {
            title: 'LEATHERITE FINISH', rows: [
              ['Raw Material Cost', '₹400–₹1500 per sq ft'],
              ['Thickness Required', 'Ply base + foam + leather'],
              ['Installation Process', 'Leather wrapped and stitched over panels.'],
              ['Maintenance', 'Requires careful cleaning; avoid stains.'],
              { label: '\u2713 Pros', value: 'Premium, hotel-like luxury feel.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive; high maintenance.', cls: 'cons' },
              ['Best Places to Use', 'Luxury bedrooms.'],
            ]
          },
          {
            title: 'TERRAZZO FINISH', rows: [
              ['Raw Material Cost', '₹300–₹1000 per sq ft'],
              ['Thickness Required', '15–20 mm slab / coating'],
              ['Installation Process', 'Precast slab fixed or terrazzo cast in mold.'],
              ['Maintenance', 'Easy cleaning; polishing occasionally.'],
              { label: '\u2713 Pros', value: 'Unique patterns, very trendy.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Heavy; slightly expensive.', cls: 'cons' },
              ['Best Places to Use', 'Designer, contemporary homes.'],
            ]
          },
          {
            title: 'CORIAN FINISH', rows: [
              ['Raw Material Cost', '₹800–₹2500 per sq ft'],
              ['Thickness Required', '6–12 mm sheets'],
              ['Installation Process', 'Thermoformed and seamlessly joined.'],
              ['Maintenance', 'Easy; scratches can be buffed.'],
              { label: '\u2713 Pros', value: 'Seamless, premium, hygienic.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive.', cls: 'cons' },
              ['Best Places to Use', 'Ultra-luxury interiors.'],
            ]
          },
          {
            title: 'METAL INLAY / BRASS', rows: [
              ['Raw Material Cost', '₹500–₹2000 per sq ft'],
              ['Thickness Required', 'Thin metal strips (1–3 mm)'],
              ['Installation Process', 'Metal inlays embedded into wood panels.'],
              ['Maintenance', 'Occasional polishing.'],
              { label: '\u2713 Pros', value: 'Adds luxury detailing, designer appeal.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive; skilled work needed.', cls: 'cons' },
              ['Best Places to Use', 'Premium and bespoke furniture.'],
            ]
          },
          {
            title: 'MARBLE FINISH', rows: [
              ['Raw Material Cost', '₹400–₹2000+ per sq ft'],
              ['Thickness Required', '15–20 mm marble slab (top); 18 mm ply/MDF base for structure (if not full marble)'],
              ['Installation Process', 'Marble slab cut and polished, fixed over plywood/metal base OR fully carved marble structure (in luxury cases); edges finishe, sealed.'],
              ['Maintenance', 'Regular cleaning with mild solution; periodic polishing; sealing recommended to avoid stains.'],
              { label: '\u2713 Pros', value: 'Extremely premium, timeless look; heat-resistant; adds high perceived value.', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Heavy; expensive; prone to staining (especially lighter marbles); requires skilled handling.', cls: 'cons' },
              ['Best Places to Use', 'Luxury bedrooms, hotel-style interiors, statement side tables.'],
            ]
          }
        ]
      },
      study: {
        title: 'Study Table Finishes', items: [
          'Laminate Finish||₹80 – ₹300 / sq.ft||16–18 mm ply/MDF + 0.8–1 mm laminate||Laminate sheets glued and edge-banded on structure||Easy—wipe with damp cloth||Budget-friendly, durable, scratch-resistant, wide variety||Less premium look||Kids study tables, rental homes, budget setups',
          'Pre-Laminated Board||₹60 – ₹150 / sq.ft||15–18 mm pre-laminated board||Factory-finished boards cut and assembled with connectors||Very easy cleaning||Cost-effective, quick installation, uniform finish||Visible joints; lower durability vs plywood||Budget and modular furniture',
          'Veneer Finish||₹120 – ₹400 / sq.ft||0.5–1 mm veneer on ply||Veneer applied and polished (melamine/PU)||Dry cloth; avoid moisture||Natural wood feel, premium look||Expensive; requires care||Home offices, premium study rooms',
          'PU Paint||₹180 – ₹450 / sq.ft||MDF/ply base + PU coating||Spray painted and polished||Soft cloth cleaning||Seamless, customizable colours, modern look||Prone to scratches||Minimal and modern interiors',
          'Solid Wood||₹1500 – ₹5000+ / sq.ft||18–40 mm sections||Carpentry or factory-made; polished||Periodic polishing required||Durable, timeless, premium||Expensive; heavy||Luxury home offices',
          'Metal Finish||₹150 – ₹600 / sq.ft||1–3 mm metal + board top||Metal frame fabricated + top fixed||Low maintenance||Strong, lightweight, modern||Limited storage||Minimal, industrial setups',
          'Acrylic||₹300 – ₹800 / sq.ft||1–1.5 mm acrylic on MDF||Machine-pressed sheets applied||Microfiber cleaning||High gloss, premium modern look||Scratches and fingerprints visible||Contemporary interiors',
          'Leatherette Finish||₹400 – ₹1200 / sq.ft||3–10 mm (ply base + foam optional + leatherette)||Leatherette wrapped or pasted over desk surface; inset into wooden frame||Easy—wipe with damp cloth; avoid sharp objects||Premium look, smooth writing surface, stain-resistant, easy maintenance||Can crack/peel over time; not heat-resistant||Home offices, executive desks, luxury study tables'
        ]
      },
      dresser: {
        title: 'Dresser Table Finishes', items: [
          'Laminate Finish||₹80 – ₹300 / sq.ft||16–18 mm ply/MDF + laminate||Laminate sheets applied and edge-banded on structure||Easy—wipe with damp cloth||Budget-friendly, durable, wide variety||Less premium look||Budget homes, rental spaces',
          'Pre-Laminated Board||₹60 – ₹150 / sq.ft||15–18 mm pre-laminated board||Factory-finished boards cut and assembled||Very easy cleaning||Cost-effective, quick installation||Visible joints; less durable||Budget and quick projects',
          'Veneer Finish||₹120 – ₹400 / sq.ft||0.5–1 mm veneer on ply||Veneer applied and polished||Dry cloth; avoid moisture||Natural wood look, premium feel||Requires care; expensive||Premium bedrooms',
          'PU Paint Finish||₹180 – ₹450 / sq.ft||MDF/ply base + PU coating||Spray painted and polished (matte/gloss)||Soft cloth cleaning||Seamless, modern, customizable colours||Scratches/chips possible||Modern, minimal interiors',
          'Mirror Finish||₹300 – ₹900 / sq.ft||5–12 mm glass/mirror||Glass/mirror panels fixed on structure||Frequent cleaning required||Makes space look bigger; adds glamour||Fragile; high maintenance||Small bedrooms, glam interiors',
          'Marble Finish||₹250 – ₹800 / sq.ft||10–25 mm (varies by stone type)||Stone pieces/slabs fixed using adhesive + cement backing||Occasional dusting; sealing recommended||Natural textured look, adds depth & warmth||Uneven surface collects dust; requires sealing||Rustic interiors, accent TV walls, textured backdrops',
          'Leatherette Finish||₹300 – ₹1200 / sq.ft||Ply + foam + leatherette||Upholstery fixed over panels or drawer fronts||Soft clean||Soft, luxurious, unique look||Maintenance required||Luxury bedrooms',
          'Fluted Panel Finish||₹250 – ₹700 / sq.ft||12–18 mm MDF/HDHMR||Fluted panels applied on drawer fronts||Dusting required||Trendy, adds texture||Slight maintenance||Designer modern bedrooms',
          'Rattan Cane Finish||₹150 – ₹500 / sq.ft||Cane + wooden frame||Cane woven into panels/drawers||Dry cleaning; avoid moisture||Natural, breathable, trendy||Less durable; can sag||Boho, casual interiors'
        ]
      },
      wardrobe: {
        title: 'Wardrobe Shutter Finishes', items: [
          'Fluted Glass||₹350 – ₹650 / sq.ft||18 mm MDF/ply shutter + glass||Fix the fluted glass onto an 18 mm MDF/ply shutter using silicone or secure it inside an aluminum/SS frame||Clean with glass cleaner and a microfiber cloth||Adds luxurious, modern look; diffuses visual clutter; enhances wardrobe with soft-reflected light||Fragile and requires careful usage; fingerprints appear easily||Walk-in wardrobes, master bedrooms',
          'PU Paint||₹350 – ₹800 / sq.ft||MDF shutter + multi PU coats||Sand the MDF shutter → apply primer → apply multiple PU coats → allow curing → final polish||Wipe with a damp microfiber cloth; avoid harsh chemicals||Seamless, ultra-premium finish; limitless color customization; makes wardrobes look luxurious||Can chip or scratch if hit; expensive and time-consuming||Master bedrooms, luxury wardrobes',
          'Rattan Cane||₹200 – ₹600 / sq.ft||Cane sheet + wooden/MDF frame||Stretch the cane sheet and fix it into a wooden/MDF frame, ensuring tight tension to avoid sagging||Dust regularly and keep away from moisture||Warm, natural ventilation-friendly wardrobe; earthy, boho-style aesthetics||Can sag over time if not stretched properly; absorbs moisture in humid areas||Boho bedrooms, guest rooms',
          'Leather / Leatherette||₹200 – ₹2000+ / sq.ft||Ply/MDF + adhesive + leather||Apply adhesive on the shutter, stretch the leather/leatherette over it, finish with stitching or panel grooves||Wipe gently with a damp cloth; avoid sharp objects||Soft-touch luxurious feel; improves room acoustics by absorbing sound||Leatherette can peel over time; real leather is costly and high-maintenance||Master bedrooms, walk-in wardrobes',
          'Acrylic Matte||₹250 – ₹500 / sq.ft||Acrylic sheet on MDF||Paste the acrylic sheet onto MDF using adhesive and finish with matching edge banding||Clean with a soft damp cloth to prevent scratches||Smooth, ultra-matte modern finish; relatively scratch-resistant||Corners can chip if mishandled; sheet cannot bend or mold easily||Modern bedrooms, walk-in wardrobes',
          'Wallpaper||₹50 – ₹200 / sq.ft||Surface finish layer||Apply adhesive on a smooth sealed shutter surface and paste the wallpaper carefully to avoid bubbles||Use a soft damp cloth only on washable wallpaper||Endless design choices; affordable for quick wardrobe makeovers||Can peel and fade over time, especially in humid rooms||Kids rooms, guest rooms, rental wardrobes',
          'Metallic Laminate||₹250 – ₹600 / sq.ft||MDF/ply + laminate||Paste the laminate onto MDF/ply using adhesive; add matching edge banding||Wipe regularly with a dry or slightly damp cloth||Strong, durable metallic look; resists stains and daily wear||Shows fingerprints quickly; can appear industrial if not balanced||Modern minimalist bedrooms, studio-style wardrobes',
          'Back-Painted Glass||₹450 – ₹900 / sq.ft||Glass + aluminum frame||Mount the back-painted glass onto the shutter using high-grade silicone or fit it inside an aluminum frame||Clean with glass cleaner to maintain shine||Glossy, reflective premium finish; instantly elevates the wardrobe||Heavy and fragile; fingerprints show easily||Master bedrooms, walk-in wardrobes',
          'Veneer||₹150 – ₹400 / sq.ft||MDF/ply + veneer + PU polish||Paste veneer sheet onto MDF/ply and finish with PU polish for protection and shine||Wipe dry and polish periodically to retain natural sheen||Warm, natural wood feel; looks rich and organic||Scratches easily; requires regular polishing to stay fresh||Premium bedrooms, studies, elegant wardrobes',
          'Fluted Panel (MDF/WPC/Wood)||₹150 – ₹1200 / sq.ft||MDF/WPC/Wood panels||Paste or screw the fluted panels onto the shutter and finish edges neatly||Clean grooves with a soft brush + dry cloth||Adds strong texture and creates a statement modern design||Dust accumulates in the grooves; panels add weight to the shutters||Statement wardrobes, master bedrooms',
          'Fabric Panels||₹80 – ₹350 / sq.ft||Foam + fabric over shutter||Add foam onto the shutter, stretch fabric over it, and fix tightly using a staple/track system||Vacuum regularly to prevent dust and lint buildup||Soft, luxurious, boutique-style aesthetic; enhances acoustic comfort||Can stain easily; absorbs dust faster than hard finishes||Luxury bedrooms, boutique-style wardrobes'
        ]
      },
      'wardrobe-must': {
        title: '5 Wardrobe Must-Have Internals', items: [
          'Shoe Revolving Rack||₹4,000 – ₹15,000 depending on size & finish||Steel/rod diameter 12–16 mm; shelf board thickness 18 mm||Fix top & bottom plates inside wardrobe, insert revolving pole and attach shelves; ensure smooth rotation.||Wipe rods & shelves monthly and avoid water to prevent rust/stains.||• Maximizes vertical shoe space neatly.<br>• Easy access & reduced clutter.||• Can be heavy if overloaded with shoes.<br>• Takes up dedicated width in a compact wardrobe.||Walk-in wardrobe, shoe zone near bedroom entrance||Powder-coated steel / SS rods + laminated wood shelves',
          'Hidden Watch Pull Down||₹3,000 – ₹9,000 per module||Panel thickness 18–25 mm||Fix guided slide/pull-down mechanism inside wardrobe, attach watch tray, ensure secure mounting.||Dust tray and mechanism gently; avoid spilling liquids on watches.||• Keeps watches organized & protected.<br>• Adds a premium, hidden feature.||• Limited capacity per module.<br>• Mechanism needs precise fitting or may misalign.||Walk-in wardrobe or bedroom wardrobe||Laminated wood or veneer + smooth pull mechanism',
          'Fingerprint Lock||₹1,500 – ₹6,000 depending on brand & features||Lock panel cutout; 18–25 mm door thickness||Drill cutout in door, insert lock body, connect batteries and test multiple fingerprints.||Wipe sensor area weekly; replace batteries as needed.||• Quick access with high security.<br>• No keys to lose or misplace.||• Needs battery changes.<br>• May misread if sensor gets dirty.||Master bedroom wardrobe for valuables||Metal lock body, electronic sensor unit',
          'Drawer Organisers||₹500 – ₹4,000 per set||Divider thickness 5–10 mm; fits existing drawer with 18 mm sides||Place or slot inside drawers; customize sections as needed.||Wipe weekly and remove dust.||• Keeps small items sorted and visible.<br>• Budget-friendly wardrobe upgrade.||• Less effective if drawer sizes vary widely.<br>• Plastic options may crack over time.||All wardrobe drawers, clothes, accessories, socks, belts, etc.||Plastic, acrylic, MDF dividers',
          'Seamless Handles||₹200 – ₹1,200 per linear foot / handle type||Groove depth 8–12 mm in panel; panel thickness 18 mm||Cut groove/recess in door, fix recessed profile, ensure smooth finger grip finish.||Dust grooves weekly; wipe with dry cloth.||• Sleek, modern look with no protruding hardware.<br>• Easy to clean and ergonomic.||• More installation precision needed.<br>• Recessed grooves collect dust if not maintained.||All wardrobe doors for a minimalist finish||Aluminium/SS recessed pulls or groove channels'
        ]
      },
      tvunit: {
        title: 'TV Unit Finishes', items: [
          'LAMINATE FINISH||₹80 – ₹300 / sq.ft||0.8–1 mm laminate on ply/MDF||Laminate sheets cut, glued, and pressed on plywood/MDF; edges finished with PVC edge banding||Clean with damp cloth or mild soap solution||Budget-friendly, durable, scratch-resistant, huge variety of colours & textures||Less premium look; edge banding may peel if poor quality||Budget homes, rental properties, kids rooms',
          'VENEER FINISH||₹120 – ₹400 / sq.ft||0.5–1 mm veneer on ply||Veneer glued, pressed, sanded, then polished (melamine/PU)||Dry cloth only; avoid water exposure||Rich, natural wood look; high-end finish||Expensive; needs skilled labour; prone to scratches/moisture||Living rooms, luxury TV units, statement walls',
          'PU PAINT FINISH||₹180 – ₹450 / sq.ft||MDF/ply base + multiple PU coats||Surface sanded, primed, spray-painted, and polished (matte/gloss)||Soft cloth cleaning; avoid abrasives||Seamless, smooth, premium look; any colour possible||Expensive; chips on impact; high labour cost||Modern, minimal, high-end interiors',
          'ACRYLIC FINISH||₹250 – ₹600 / sq.ft||1 mm acrylic sheet on MDF||Acrylic sheets machine-pressed onto boards; edges laser-finished||Clean with microfiber cloth; avoid scratches||High gloss, mirror-like finish; very modern||Scratches easily; fingerprints visible||Contemporary homes, sleek TV units',
          'GLASS FINISH (BACK-PAINTED / FLUTED / TINTED)||₹250 – ₹900 / sq.ft||5–12 mm toughened glass||Glass panels fixed with adhesive or framing; can be back-painted or fluted||Glass cleaner required; frequent cleaning needed||Reflective, makes space look bigger; modern aesthetic||Fingerprints; fragile if mishandled||Small living rooms, modern luxury spaces',
          'NATURAL STONE CLADDING (SLATE / SANDSTONE / STACK STONE)||₹250 – ₹800 / sq.ft||10–25 mm (varies by stone type)||Stone pieces/slabs fixed using adhesive + cement backing; joints may be visible or dry-stacked||Occasional dusting; sealing recommended||Natural textured look, adds depth & warmth; good for feature walls||Uneven surface collects dust; requires sealing; not a sleek finish||Rustic interiors, accent TV walls, textured backdrops',
          'MARBLE CLADDING||₹300 – ₹1500+ / sq.ft||15–20 mm slab||Marble slabs fixed using adhesive + mechanical clamps; polished on-site or factory-finished||Regular wiping; periodic polishing recommended||Ultra-premium look, natural patterns, enhances luxury appeal||Porous and stain-prone if unsealed; expensive; requires skilled labour||Luxury TV feature walls, statement living rooms',
          'GRANITE CLADDING||₹200 – ₹600 / sq.ft||15–20 mm slab||Granite slabs fixed using adhesive + mechanical support; machine-polished finish||Very low; easy cleaning with damp cloth||Highly durable, scratch-resistant, water & stain resistant||Limited design variety; heavier visual appearance; less luxurious than marble||Practical homes, modern dark-themed interiors, low-maintenance TV walls',
          'CHARCOAL PANELS||₹180 – ₹400 / sq.ft||8–25 mm panels||Panels cut to size and fixed on a plywood/MDF base using adhesive or screws; joints aligned seamlessly||Easy—dusting with cloth or vacuum; occasional wipe||Modern matte finish, termite & moisture resistant, lightweight compared to wood||Limited colour options (mostly dark tones); can look repetitive if overused||Contemporary TV feature walls, fluted panel backdrops, modern interiors',
          'WPC PANELS (WOOD PLASTIC COMPOSITE)||₹150 – ₹350 / sq.ft||8–25 mm panels||Panels fixed on framework or directly on wall using screws/adhesive; grooves interlocked for seamless finish||Low—wipe with damp cloth; no polishing required||Waterproof, termite-proof, wood-like finish, suitable for humid areas||Slightly artificial look compared to real wood; limited premium feel||Budget-friendly TV units, rental homes, moisture-prone areas',
          'FLUTED / GROOVED PANELS||₹200 – ₹600 / sq.ft||12–18 mm panel||Grooved panels cut and fixed; painted/laminated/veneered||Dust grooves with brush/vacuum||Trendy, adds depth & texture||Dust accumulation; harder to clean||Statement TV walls',
          'METAL ACCENTS (SS / BRASS / MS)||₹500 – ₹2000 / sq.ft||1–2 mm sheets||CNC-cut metal sheets fixed with adhesive/screws; polished or coated||Metal cleaner; avoid harsh chemicals||Ultra-luxury, bold design element||Expensive; fingerprints visible||Luxury interiors, designer TV units',
          'WALLPAPER FINISH||₹80 – ₹400 / sq.ft||Surface finish layer||Wallpaper pasted on smooth prepared wall using adhesive; joints aligned carefully||Gentle cleaning with dry cloth; avoid water exposure||Wide variety of designs, quick installation, budget-friendly transformation||Can peel over time; sensitive to moisture; less durable||Budget TV walls, rental homes, quick makeovers',
          'TEXTURED PAINT FINISH||₹120 – ₹500 / sq.ft||2–5 mm textured coating||Texture paint applied using tools (roller/trowel/spray) over primed surface to create patterns||Easy—wipe with damp cloth; more durable than wallpaper||Seamless finish, more durable, variety of textures (stucco, concrete, etc.)||Requires skilled applicator; difficult to repair patches||Feature TV walls, modern and contemporary interiors',
          'MIRROR FINISH (CLEAR / BRONZE / SMOKED)||₹500–₹2000 per sq ft||1–2 mm sheets||CNC-cut metal sheets fixed with adhesive/screws; polished or coated.||Metal cleaner; avoid harsh chemicals.||Ultra-luxury, bold design element.||Expensive; fingerprints visible.||Luxury interiors, designer TV units.',
          'LEATHER / UPHOLSTERED PANELS||₹300–₹1200 per sq ft||12–25 mm panel with foam + fabric/leather||Foam-padded panels upholstered and fixed onto backing board.||Vacuum + occasional dry cleaning.||Soft, luxurious, improves acoustics.||Can stain; not ideal for dusty homes.||Luxury homes, home theatres.',
          'CNC CUT PANELS||₹250–₹900 per sq ft||8–18 mm||CNC-cut sheets fixed with backlighting (optional).||Dusting + wipe.||Custom patterns, dramatic visual impact.||Dust accumulation in cuts.||Feature walls, modern statement designs.',
          'CORIAN||₹800–₹2500 per sq ft||6–12 mm sheets||Sheets joined seamlessly, can be backlit.||Easy cleaning; polishable surface.||Seamless joints, ultra-premium, backlit effects possible.||Expensive.||Ultra-luxury TV units, modern villas.',
          'CONCRETE FINISH||₹180–₹500 per sq ft||2–5 mm coating||Applied in layers over base surface and sealed.||Damp cloth cleaning; resealing over time.||Seamless, industrial, modern aesthetic.||Skilled labour needed; cracks if poorly applied.||Industrial, contemporary homes.',
          'WALL MOULDING + PAINT||₹120–₹400 per sq ft||10–25 mm panels||Panels glued and painted.||Dusting required regularly.||Adds depth, visually interesting.||Can look busy if overdone.||Accent TV walls.',
          '3D WALL PANELS (PVC / GYPSUM)||₹300–₹1200 per sq ft||12–25 mm panel with foam + fabric/leather||Foam-padded panels upholstered and fixed onto backing board.||Vacuum + occasional dry cleaning.||Soft, luxurious, improves acoustics.||Can stain; not ideal for dusty homes.||Luxury homes, home theatres.',
          'TILE CLADDING (VITRIFIED)||₹100–₹800 per sq ft||6–12 mm||Tiles fixed with adhesive + grout.||Very easy; water-resistant.||Durable, marble look at lower cost.||Visible joints (unless large slabs).||Budget luxury designs.',
          'BACKLIT PANELS||₹150–₹600 per sq ft (excluding finish)||Depends on finish + lighting cavity||LED strips installed behind panels (acrylic/corian/CNC).||Occasional electrical check.||Dramatic ambience, enhances any finish.||Requires planning + wiring.||Feature TV walls, luxury interiors',
          'STONE VENEER (FLEXIBLE STONE)||₹180–₹500 per sq ft||1–3 mm sheets||Flexible sheets glued onto substrate.||Easy wipe cleaning.||Real stone look without weight.||Limited availability.||'
        ]
      },
      'kitchen-shutter': {
        title: 'Kitchen Shutter Finishes',
        tableItems: [
          'Laminate||₹80–₹300 per sq ft||0.8–1 mm laminate on ply/MDF||Budget-friendly, durable, scratch-resistant; Huge variety of colours and textures||Less premium look compared to veneer/PU; Edge banding may peel if poor quality||Budget homes, rental properties, kids\' rooms',
          'Veneer||₹120–₹400 per sq ft||0.5–1 mm veneer on ply||Rich, natural wood look; High-end finish||Expensive; Needs skilled labour; Prone to scratches and moisture||Living rooms, luxury TV units, statement walls',
          'PU Paint||₹180–₹450 per sq ft||MDF/ply base + multiple PU coats||Seamless, smooth, premium look; Any colour possible||Expensive; Chips on impact; High labour cost||Modern, minimal, high-end interiors',
          'Acrylic||₹250–₹600 per sq ft||1 mm acrylic sheet on MDF||High gloss, mirror-like finish; Very modern||Scratches easily; Fingerprints visible||Contemporary homes, sleek TV units',
          'Glass||₹250–₹900 per sq ft||5–12 mm toughened glass||Reflective finish makes spaces look larger; Modern aesthetic||Fingerprints visible; Fragile if mishandled||Small living rooms, modern luxury spaces',
          'Natural Stone Finish||₹250–₹800 per sq ft||10–25 mm (varies by stone type)||Natural textured look; Adds depth and warmth; Excellent for feature surfaces||Uneven surface collects dust; Requires sealing; Not a sleek finish||Rustic interiors, accent TV walls, textured backdrops'
        ],
        detailItems: [
          {
            title: 'Laminate', rows: [
              ['Raw Material Cost', '₹80–₹300 per sq ft'],
              ['Thickness Required', '0.8–1 mm laminate on ply/MDF'],
              ['Installation Process', 'Laminate sheets are cut, glued, and pressed on plywood/MDF; edges finished with PVC edge banding.'],
              ['Maintenance', 'Easy—clean with damp cloth or mild soap solution.'],
              { label: '\u2713 Pros', value: '• Budget-friendly, durable, scratch-resistant.<br>• Huge variety of colours and textures.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Less premium look compared to veneer/PU.<br>• Edge banding may peel if poor quality.', cls: 'cons' },
              ['Best Places to Use', 'Budget homes, rental properties, kids\' rooms.'],
            ]
          },
          {
            title: 'Veneer', rows: [
              ['Raw Material Cost', '₹120–₹400 per sq ft'],
              ['Thickness Required', '0.5–1 mm veneer on ply'],
              ['Installation Process', 'Veneer is glued, pressed, sanded, then polished (melamine/PU).'],
              ['Maintenance', 'Dry cloth only; avoid water exposure.'],
              { label: '\u2713 Pros', value: '• Rich, natural wood look.<br>• High-end finish.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Expensive.<br>• Needs skilled labour.<br>• Prone to scratches and moisture.', cls: 'cons' },
              ['Best Places to Use', 'Living rooms, luxury TV units, statement walls.'],
            ]
          },
          {
            title: 'PU Paint', rows: [
              ['Raw Material Cost', '₹180–₹450 per sq ft'],
              ['Thickness Required', 'MDF/ply base + multiple PU coats'],
              ['Installation Process', 'Surface is sanded, primed, spray-painted, and polished (matte/gloss).'],
              ['Maintenance', 'Soft cloth cleaning; avoid abrasives.'],
              { label: '\u2713 Pros', value: '• Seamless, smooth, premium look.<br>• Any colour possible.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Expensive.<br>• Chips on impact.<br>• High labour cost.', cls: 'cons' },
              ['Best Places to Use', 'Modern, minimal, high-end interiors.'],
            ]
          },
          {
            title: 'Acrylic', rows: [
              ['Raw Material Cost', '₹250–₹600 per sq ft'],
              ['Thickness Required', '1 mm acrylic sheet on MDF'],
              ['Installation Process', 'Acrylic sheets are machine-pressed onto boards; edges laser-finished.'],
              ['Maintenance', 'Clean with microfiber cloth; avoid scratches.'],
              { label: '\u2713 Pros', value: '• High gloss, mirror-like finish.<br>• Very modern.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Scratches easily.<br>• Fingerprints visible.', cls: 'cons' },
              ['Best Places to Use', 'Contemporary homes, sleek TV units.'],
            ]
          },
          {
            title: 'Glass', rows: [
              ['Raw Material Cost', '₹250–₹900 per sq ft'],
              ['Thickness Required', '5–12 mm toughened glass'],
              ['Installation Process', 'Glass panels fixed with adhesive or framing; can be back-painted or fluted.'],
              ['Maintenance', 'Glass cleaner required; frequent cleaning needed.'],
              { label: '\u2713 Pros', value: '• Reflective finish makes spaces look larger.<br>• Modern aesthetic.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Fingerprints visible.<br>• Fragile if mishandled.', cls: 'cons' },
              ['Best Places to Use', 'Small living rooms, modern luxury spaces.'],
            ]
          },
          {
            title: 'Natural Stone Finish', rows: [
              ['Raw Material Cost', '₹250–₹800 per sq ft'],
              ['Thickness Required', '10–25 mm (varies by stone type)'],
              ['Installation Process', 'Stone pieces/slabs fixed using adhesive + cement backing; joints may be visible or dry-stacked.'],
              ['Maintenance', 'Occasional dusting; sealing recommended to prevent stains.'],
              { label: '\u2713 Pros', value: '• Natural textured look.<br>• Adds depth and warmth.<br>• Excellent for feature surfaces.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Uneven surface collects dust.<br>• Requires sealing.<br>• Not a sleek finish.', cls: 'cons' },
              ['Best Places to Use', 'Rustic interiors, accent TV walls, textured backdrops.'],
            ]
          }
        ]
      },
      'kitchen-must': {
        title: '5 Kitchen Must Haves',
        detailItems: [
          {
            title: 'Corner Drawers', rows: [
              ['Materials', 'Laminated MDF/ply with heavy-duty runners'],
              ['Approx Cost', '₹4,000 – ₹12,000 per unit'],
              ['Thickness Required', 'Drawer front & box: 18 – 22 mm. heavy duty runners.'],
              ['Installation Process', 'Install cabinet carcass → fit heavy-duty runners → assemble and attach corner drawer panels → adjust for smooth glide.'],
              ['Maintenance', 'Wipe runners and drawer boxes regularly. avoid overloading.'],
              { label: '\u2713 Pros', value: '• Makes full use of awkward corner space.\n• Easy access compared to blind corner shelves.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Slightly higher cost than regular drawers.\n• Needs accurate planning & measurement.', cls: 'cons' },
              ['Best Places to Use', 'Kitchen base cabinets corners for pots, pans, mixes.'],
            ]
          },
          {
            title: 'Multi Functional Sink', rows: [
              ['Materials', 'SS 304/316 kitchen sink with accessories'],
              ['Approx Cost', '₹6,000 – ₹25,000 depending on size'],
              ['Thickness Required', 'Sink gauge 0.8 – 1.2 mm for stainless steel. countertop cutout accordingly'],
              ['Installation Process', 'Cut countertop opening → drop-in or under-mount sink → seal edges with silicone → connect drain & faucet.'],
              ['Maintenance', 'Clean and dry after use. avoid harsh acids to protect finish.'],
              { label: '\u2713 Pros', value: '• Combines prep, wash & drain zones in one unit.\n• Saves counter space and improves workflow.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Higher upfront cost than standard single sink.\n• Accessories may require storage space.', cls: 'cons' },
              ['Best Places to Use', 'Main kitchen counter near dishwasher or prep area'],
            ]
          },
          {
            title: 'Tall Utility Unit', rows: [
              ['Materials', 'Laminated MDF/ply with adjustable shelves & hardware'],
              ['Approx Cost', '₹12,000 – ₹40,000 depending on height & fittings'],
              ['Thickness Required', 'Panels 18 – 22 mm. shelves 18 mm'],
              ['Installation Process', 'Construct carcass → install vertical tall unit → fit shelves & doors → align hardware.'],
              ['Maintenance', 'Wipe inside/outside monthly. check shelf clips.'],
              { label: '\u2713 Pros', value: '• Maximizes vertical storage for oils, grains & appliances.\n• Keeps tall items organized and easy to reach.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Needs careful planning to access top shelves.\n• Occupies vertical wall space.', cls: 'cons' },
              ['Best Places to Use', 'Pantry wall, kitchen tall storage zones, near ovens/fridge'],
            ]
          },
          {
            title: 'Drawer Internals', rows: [
              ['Materials', 'Acrylic/wood/plastic dividers'],
              ['Approx Cost', '₹500 – ₹4,000 per drawer set'],
              ['Thickness Required', 'Dividers 5 – 10 mm. drawer sides usually 18 mm'],
              ['Installation Process', 'Slot or place organisers in drawers → adjust compartments based on utensils/plates.'],
              ['Maintenance', 'Clean weekly; remove crumbs & wipe dry.'],
              { label: '\u2713 Pros', value: '• Keeps utensils, cutlery & tools neatly sorted.\n• Budget-friendly and customizable.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Plastic organisers may wear or crack.\n• Needs precise sizing per drawer.', cls: 'cons' },
              ['Best Places to Use', 'All kitchen drawers for cutlery, tools, wraps, spices'],
            ]
          },
          {
            title: 'Shutter Storages (Upper and Lower)', rows: [
              ['Materials', 'Laminated MDF/ply or membrane/veneer finishes'],
              ['Approx Cost', '₹12,000 – ₹40,000 depending on height & fittings'],
              ['Thickness Required', 'Shutter panels 18 – 22 mm'],
              ['Installation Process', 'Build cabinets → fix top/bottom frames → mount shutters with hinges → align & adjust.'],
              ['Maintenance', 'Wipe shutters weekly and avoid excess water on surfaces.'],
              { label: '\u2713 Pros', value: '• Conceals clutter elegantly and protects items from dust.\n• Wide style & finish options to suit kitchen theme.', cls: 'pros' },
              { label: '\u2715 Cons', value: '• Frequent use hinges may loosen over time.\n• Higher cost for premium finishes.', cls: 'cons' },
              ['Best Places to Use', 'Upper & lower kitchen cabinets across the kitchen'],
            ]
          }
        ]
      },
      marbles: { title: 'Marbles – Detailed Guide', items: ['Carrara Marble (Italian) – White, soft grey veins. Classic, versatile. ₹500 – ₹1,500 / sq.ft', 'Calacatta Marble (Italian) – Bright white, bold veins. Ultra-luxury. ₹2,000 – ₹6,000 / sq.ft', 'Statuario Marble (Italian) – Pure white, strong grey veining. Premium. ₹1,500 – ₹5,000 / sq.ft', 'Crema Marfil (Italian) – Beige, subtle veins. Warm and elegant. ₹600 – ₹1,500 / sq.ft', 'Onyx Marble (Italian) – Translucent, dramatic. Luxury feature walls. ₹2,000 – ₹7,000 / sq.ft', 'Armani Brown (Italian) – Dark brown, linear veins. Modern luxury. ₹700 – ₹2,000 / sq.ft', 'White Portoro (Italian) – Black with gold veins. Ultra premium. ₹2,500 – ₹8,000 / sq.ft', 'Michelangelo (Italian) – White with grey/beige veins. Classic. ₹900 – ₹2,500 / sq.ft', 'Bianco Lasa (Italian) – Bright white, fine grey veins. Minimal. ₹1,500 – ₹4,000 / sq.ft', 'Travertine (Italian) – Beige cream, natural holes. Mediterranean look. ₹250 – ₹800 / sq.ft', 'Makrana Marble (Indian) – Pure white, minimal veins. Iconic Indian marble. ₹150 – ₹600 / sq.ft', 'Banswara Marble (Indian) – White with purple/grey veins. ₹120 – ₹400 / sq.ft', 'Katni Marble (Indian) – Beige to cream with soft veins. ₹90 – ₹250 / sq.ft', 'Ambaji Marble (Indian) – Milky white, very light patterns. ₹100 – ₹350 / sq.ft', 'Morwad Marble (Indian) – White with soft grey patterns. ₹90 – ₹250 / sq.ft'] },
      tiles: {
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
          {
            title: 'Vitrified Tiles', rows: [
              { label: 'Material', value: 'Highly durable tiles made from clay and silica' },
              { label: 'Types', value: 'Double Charged, Full Body, Glazed Vitrified (GVT), Polished Glazed Vitrified (PGVT)' },
              ['Sizes (mm)', '600\u00d7600, 600\u00d71200, 800\u00d71600'],
              ['Thk (mm)', '8\u201310'],
              ['Slab Cost (sq.ft)', '\u20b960 \u2013 \u20b9250'],
              ['Installation Method', 'Tile adhesive + spacers'],
              ['Maintenance', 'Easy cleaning, no sealing required'],
              { label: '\u2713 Pros', value: 'Durable, low maintenance, stain-resistant', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can be slippery, less natural look', cls: 'cons' },
              ['Best Places to Use', 'Flooring, living rooms, bedrooms, commercial spaces'],
              ['Brands', 'Kajaria, Somany, Nitco']
            ]
          },
          {
            title: 'Ceramic Tiles', rows: [
              { label: 'Material', value: 'Lightweight tiles made from natural clay' },
              { label: 'Types', value: 'Glazed, Unglazed, Digital Printed' },
              ['Sizes (mm)', '300\u00d7300, 300\u00d7600'],
              ['Thk (mm)', '6\u20138'],
              ['Slab Cost (sq.ft)', '\u20b930 \u2013 \u20b9120'],
              ['Installation Method', 'Tile adhesive'],
              ['Maintenance', 'Easy cleaning'],
              { label: '\u2713 Pros', value: 'Affordable, wide designs, easy installation', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less durable for heavy flooring', cls: 'cons' },
              ['Best Places to Use', 'Bathroom walls, kitchen backsplashes'],
              ['Brands', 'Kajaria, Johnson']
            ]
          },
          {
            title: 'Porcelain Tiles', rows: [
              { label: 'Material', value: 'Dense, high-strength tiles with very low water absorption, ideal for heavy-duty use.' },
              { label: 'Types', value: 'Full Body, Glazed, Matte, Polished' },
              ['Sizes (mm)', '600\u00d7600, 600\u00d71200, 1200\u00d72400'],
              ['Thk (mm)', '8\u201312'],
              ['Slab Cost (sq.ft)', '\u20b980 \u2013 \u20b9300'],
              ['Installation Method', 'Tile adhesive for heavy-duty for large slabs'],
              ['Maintenance', 'Low maintenance'],
              { label: '\u2713 Pros', value: 'Highly durable, water-resistant, versatile', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Costlier than ceramic', cls: 'cons' },
              ['Best Places to Use', 'Flooring, outdoor areas, bathrooms, facades'],
              ['Brands', 'Simpolo, Kajaria, RAK Ceramics']
            ]
          },
          {
            title: 'Natural Stone Tiles', rows: [
              { label: 'Material', value: 'Tiles made from natural stones like marble, granite, slate, or travertine.' },
              { label: 'Types', value: 'Marble, Granite, Slate, Travertine' },
              ['Sizes (mm)', '300\u00d7300, 600\u00d7600'],
              ['Thk (mm)', '10\u201320'],
              ['Slab Cost (sq.ft)', '\u20b9150 \u2013 \u20b9800'],
              ['Installation Method', 'Cement bedding or stone adhesive'],
              ['Maintenance', 'Sealing required'],
              { label: '\u2713 Pros', value: 'Natural beauty, premium finish', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires maintenance, can stain', cls: 'cons' },
              ['Best Places to Use', 'Flooring, walls, feature areas'],
              ['Brands', 'Galaxy']
            ]
          },
          {
            title: 'Cement Concrete Tiles', rows: [
              { label: 'Material', value: 'Handmade tiles with pigmented cement, with bold patterns and matte finish.' },
              { label: 'Types', value: 'Encaustic Tiles, Plain Cement Tiles' },
              ['Sizes (mm)', '200\u00d7200, 300\u00d7300'],
              ['Thk (mm)', '15\u201320'],
              ['Slab Cost (sq.ft)', '\u20b9150 \u2013 \u20b9400'],
              ['Installation Method', 'Cement bedding'],
              ['Maintenance', 'Regular sealing required'],
              { label: '\u2713 Pros', value: 'Unique patterns, artisanal look', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Porous, needs sealing', cls: 'cons' },
              ['Best Places to Use', 'Accent flooring, bathrooms, cafes'],
              ['Brands', 'Bharat Floorings']
            ]
          },
          {
            title: 'Mosaic Tiles', rows: [
              { label: 'Material', value: 'Small tiles arranged in patterns, mounted on mesh sheets.' },
              { label: 'Types', value: 'Glass, Ceramic, Stone Mosaic' },
              ['Sizes (mm)', '300\u00d7300 sheets'],
              ['Thk (mm)', '4\u20138'],
              ['Slab Cost (sq.ft)', '\u20b9200 \u2013 \u20b9800'],
              ['Installation Method', 'Tile adhesive'],
              ['Maintenance', 'Regular grout cleaning'],
              { label: '\u2713 Pros', value: 'Decorative, flexible for curved surfaces', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, grout-heavy maintenance', cls: 'cons' },
              ['Best Places to Use', 'Backsplashes, bathrooms, pools'],
              ['Brands', 'Galaxy']
            ]
          }
        ]
      },
      quartz: {
        title: 'Quartz',
        tableItems: [
          'Calacatta Quartz||₹300 – ₹800||15–20||Kitchen countertops, islands, backsplashes, bathrooms||Caesarstone, KalingaStone, Specta, AGL Quartz',
          'Carrara Quartz||₹250 – ₹600||15–20||Countertops, bathrooms, wall cladding||KalingaStone, Caesarstone',
          'Solid White Quartz||₹200 – ₹500||15–20||Kitchen countertops, lab counters, modern interiors||AGL Quartz, KalingaStone',
          'Black Quartz||₹250 – ₹700||15–20||Countertops, vanities, feature walls||Caesarstone, KalingaStone',
          'Grey Quartz||₹220 – ₹600||15–20||Kitchens, bathrooms, commercial spaces||AGL Quartz, KalingaStone',
          'Terrazzo Quartz||₹300 – ₹700||15–18||Countertops, feature walls, cafes, retail||AGL Quartz',
          'Brown Quartz||₹250 – ₹700||15–20||Kitchen countertops, bar units, vanities, feature counters||KalingaStone, Caesarstone, AGL Quartz'
        ],
        detailItems: [
          {
            title: 'Calacatta Quartz', rows: [
              { label: 'Material', value: 'Engineered quartz with a bright white base and bold grey veining' },
              { label: 'Types', value: 'Calacatta Gold, Calacatta Classic, Calacatta Oro' },
              ['Sizes', 'Slabs (8\u201310 ft length, 4\u20135 ft width)'],
              ['Thk (mm)', '15, 18, 20'],
              ['Cost (sq.ft)', '\u20b9300 \u2013 \u20b9800'],
              ['Installation Method', 'Installed using adhesive on plywood/stone base'],
              ['Maintenance', 'Very low maintenance; no sealing required'],
              { label: '\u2713 Pros', value: 'Marble-like aesthetic, non-porous, stain-resistant, premium look', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, visible seams in large areas', cls: 'cons' },
              ['Best Places to Use', 'Kitchen countertops, islands, backsplashes, bathrooms'],
              ['Brands', 'Caesarstone, KalingaStone, Specta, AGL Quartz']
            ]
          },
          {
            title: 'Carrara Quartz', rows: [
              { label: 'Material', value: 'Subtle white quartz with soft grey veining' },
              { label: 'Types', value: 'Carrara White, Carrara Mist' },
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '15, 18, 20'],
              ['Cost (sq.ft)', '\u20b9250 \u2013 \u20b9600'],
              ['Installation Method', 'Adhesive on base substrate'],
              ['Maintenance', 'Low maintenance; no sealing'],
              { label: '\u2713 Pros', value: 'Elegant, consistent pattern, budget-friendly vs Calacatta', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less dramatic appearance', cls: 'cons' },
              ['Best Places to Use', 'Countertops, bathrooms, wall cladding'],
              ['Brands', 'KalingaStone, Caesarstone']
            ]
          },
          {
            title: 'Solid White Quartz', rows: [
              { label: 'Material', value: 'Plain white engineered quartz with a clean, uniform appearance' },
              { label: 'Types', value: 'Pure White, Super White, Arctic White' },
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '15, 18, 20'],
              ['Cost (sq.ft)', '\u20b9200 \u2013 \u20b9500'],
              ['Installation Method', 'Adhesive on base'],
              ['Maintenance', 'Easy cleaning; no sealing'],
              { label: '\u2713 Pros', value: 'Clean look, consistent color, easy to match', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Shows stains/dirt if not cleaned regularly', cls: 'cons' },
              ['Best Places to Use', 'Kitchen countertops, lab counters, modern interiors'],
              ['Brands', 'AGL Quartz, KalingaStone']
            ]
          },
          {
            title: 'Black Quartz', rows: [
              { label: 'Material', value: 'Deep black quartz available in plain or speckled finishes' },
              { label: 'Types', value: 'Absolute Black Quartz, Black Mirror Quartz' },
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '15, 18, 20'],
              ['Cost (sq.ft)', '\u20b9250 \u2013 \u20b9700'],
              ['Installation Method', 'Adhesive installation'],
              ['Maintenance', 'Easy cleaning'],
              { label: '\u2713 Pros', value: 'Premium look, non-porous, stain-resistant', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Shows fingerprints and dust', cls: 'cons' },
              ['Best Places to Use', 'Countertops, vanities, feature walls'],
              ['Brands', 'Caesarstone, KalingaStone']
            ]
          },
          {
            title: 'Grey Quartz', rows: [
              { label: 'Material', value: 'Neutral grey quartz with uniform or textured finishes' },
              { label: 'Types', value: 'Concrete Grey, Ash Grey, Cement Quartz' },
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '15, 18, 20'],
              ['Cost (sq.ft)', '\u20b9220 \u2013 \u20b9600'],
              ['Installation Method', 'Adhesive on substrate'],
              ['Maintenance', 'Low maintenance'],
              { label: '\u2713 Pros', value: 'Modern look, versatile, hides stains better than white', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can look flat if not paired well', cls: 'cons' },
              ['Best Places to Use', 'Kitchens, bathrooms, commercial spaces'],
              ['Brands', 'AGL Quartz, KalingaStone']
            ]
          },
          {
            title: 'Terrazzo Quartz', rows: [
              { label: 'Material', value: 'Quartz designed with chip-like patterns to mimic terrazzo, adding texture and visual interest.' },
              { label: 'Types', value: 'Fine Chip, Large Chip Terrazzo Quartz' },
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '15, 18'],
              ['Cost (sq.ft)', '\u20b9300 \u2013 \u20b9700'],
              ['Installation Method', 'Adhesive installation'],
              ['Maintenance', 'Easy cleaning'],
              { label: '\u2713 Pros', value: 'Unique design, trendy, hides stains well', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Not suitable for minimal aesthetics', cls: 'cons' },
              ['Best Places to Use', 'Countertops, feature walls, cafes, retail'],
              ['Brands', 'AGL Quartz']
            ]
          },
          {
            title: 'Brown Quartz', rows: [
              { label: 'Material', value: 'Engineered quartz in warm brown tones ranging from light beige to deep chocolate' },
              { label: 'Types', value: 'Caramel Brown, Cappuccino, Coffee Brown, Espresso Brown, Veined Brown Quartz' },
              ['Sizes', 'Slabs (8\u201310 ft length, 4\u20135 ft width)'],
              ['Thk (mm)', '15, 18, 20'],
              ['Cost (sq.ft)', '\u20b9250 \u2013 \u20b9700'],
              ['Installation Method', 'Installed using adhesive on plywood/stone base'],
              ['Maintenance', 'Very low maintenance; no sealing required'],
              { label: '\u2713 Pros', value: 'Warm aesthetic, hides stains better than white, non-porous, durable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can make small spaces look darker, less commonly used than white/grey', cls: 'cons' },
              ['Best Places to Use', 'Kitchen countertops, bar units, vanities, feature counters'],
              ['Brands', 'KalingaStone, Caesarstone, AGL Quartz']
            ]
          }
        ]
      },
      mirror: {
        title: 'Types Of Mirror',
        tableItems: [
          'Clear Mirror||₹80 – ₹200||4–6||Wardrobes,Bathrooms, Dressing areas,Gyms||Saint-Gobain',
          'Tinted Mirror||₹150 – ₹400||5–6||Wardrobes, Bar units, Feature walls||Saint-Gobain, AIS Glass',
          'Antique Mirror||₹400 – ₹1200||4–6||Feature walls, Backsplashes, Decorative panels||AIS Glass',
          'Bevelled Mirror||₹250 – ₹600||5–6||Wall panels, Dressing areas, Feature walls||AIS Glass',
          'Mirror Tiles||₹200 – ₹800||4–6||Feature walls, Foyers, Living rooms||AIS Glass',
          'Fluted Mirror||₹500 – ₹1500||5–8||Wardrobes, Partitions, Feature panels||AIS Glass',
          'Etched Mirror||₹250 – ₹600||4–6||Bathrooms, Partitions, Decorative panels||Saint-Gobain, AIS Glass',
          'Back-Painted Mirror||₹200 – ₹500||5–6||Panels, Furniture, Decorative surfaces||AIS Glass',
          'LED Mirror||₹2000 – ₹10,000+ per piece||5||Bathrooms, Vanity areas||Jaquar, Kohler, Hindware'
        ],
        detailItems: [
          {
            title: 'Clear Mirror', rows: [
              { label: 'Material', value: 'Standard silver-backed mirror that provides a clear and accurate reflection.' },
              ['Types', 'Float Glass Mirror, Ultra Clear Mirror'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '4–6'],
              ['Cost (sq.ft)', '₹80 – ₹200'],
              ['Installation Method', 'Fixed with adhesive + screws,Back panel (ply/board)'],
              ['Maintenance', 'Clean with glass cleaner, Avoid harsh chemicals'],
              { label: '\u2713 Pros', value: 'True reflection,Budget-friendly,Easily available', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Scratches visible over time, Can look basic if overused', cls: 'cons' },
              ['Best Places to Use', 'Wardrobes,Bathrooms, Dressing areas,Gyms'],
              ['Brands', 'Saint-Gobain']
            ]
          },
          {
            title: 'Tinted Mirror', rows: [
              { label: 'Material', value: 'Mirror with a coloured base that gives a premium reflection.' },
              ['Types', 'Bronze Mirror, Grey Mirror, Blue/Green Tinted Mirror'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5–6'],
              ['Cost (sq.ft)', '₹150 – ₹400'],
              ['Installation Method', 'Fixed with adhesive + screws, Back panel support'],
              ['Maintenance', 'Clean with glass cleaner, Avoid scratches'],
              { label: '\u2713 Pros', value: 'Premium look, Reduces glare, Adds warmth', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Darkens space, Less clear reflection', cls: 'cons' },
              ['Best Places to Use', 'Wardrobes, Bar units, Feature walls'],
              ['Brands', 'Saint-Gobain, AIS Glass']
            ]
          },
          {
            title: 'Antique Mirror', rows: [
              { label: 'Material', value: 'Distressed mirror with a vintage textured appearance' },
              ['Types', 'Foxed Mirror, Patterned Antique Mirror'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '4–6'],
              ['Cost (sq.ft)', '₹400 – ₹1200'],
              ['Installation Method', 'Panel-based fixing on backing board'],
              ['Maintenance', 'Dry cloth cleaning, Avoid harsh chemicals'],
              { label: '\u2713 Pros', value: 'Unique luxury finish, Hides fingerprints', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, Not functional for reflection', cls: 'cons' },
              ['Best Places to Use', 'Feature walls, Backsplashes, Decorative panels'],
              ['Brands', 'AIS Glass']
            ]
          },
          {
            title: 'Bevelled Mirror', rows: [
              { label: 'Material', value: 'Mirror with angled edges that create a framed reflective effect without using an actual frame.' },
              ['Types', 'Single Bevel, Double Bevel, Bevelled Tiles'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5–6'],
              ['Cost (sq.ft)', '₹250 – ₹600'],
              ['Installation Method', 'Grid/panel installation with adhesive'],
              ['Maintenance', 'Regular cleaning, Extra care at edges'],
              { label: '\u2713 Pros', value: 'Elegant detailing, Reflects light well', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Dust collects in joints, Can look dated if overused', cls: 'cons' },
              ['Best Places to Use', 'Wall panels, Dressing areas, Feature walls'],
              ['Brands', 'AIS Glass']
            ]
          },
          {
            title: 'Mirror Tiles', rows: [
              { label: 'Material', value: 'Mirrors cut into geometric shapes or grids' },
              ['Types', 'Square Panels, Rectangular Panels, Geometric Designs'],
              ['Sizes', '1x1 ft, 2x2 ft'],
              ['Thk (mm)', '4–6'],
              ['Cost (sq.ft)', '₹200 – ₹800'],
              ['Installation Method', 'Grid-based installation with proper spacing'],
              ['Maintenance', 'Clean panels individually, Maintain joints'],
              { label: '\u2713 Pros', value: 'Customizable design, Visually striking', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Alignment issues, Can look cluttered', cls: 'cons' },
              ['Best Places to Use', 'Feature walls, Foyers, Living rooms'],
              ['Brands', 'AIS Glass']
            ]
          },
          {
            title: 'Fluted Mirror', rows: [
              { label: 'Material', value: 'Textured mirror with vertical grooves that create a distorted reflection.' },
              ['Types', 'Fine Ribbed, Wide Fluted'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5–8'],
              ['Cost (sq.ft)', '₹500 – ₹1500'],
              ['Installation Method', 'Panel fixing with backing support'],
              ['Maintenance', 'Cleaning required, Dust in grooves'],
              { label: '\u2713 Pros', value: 'Trendy, Adds texture, Soft reflection', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, Not functional as clear mirror', cls: 'cons' },
              ['Best Places to Use', 'Wardrobes, Partitions, Feature panels'],
              ['Brands', 'AIS Glass']
            ]
          },
          {
            title: 'Etched Mirror', rows: [
              { label: 'Material', value: 'Mirror with a matte finish that diffuses reflection.' },
              ['Types', 'Full Frosted, Pattern Frosted'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '4–6'],
              ['Cost (sq.ft)', '₹250 – ₹600'],
              ['Installation Method', 'Fixed with adhesive on backing'],
              ['Maintenance', 'Gentle cleaning, Avoid stains'],
              { label: '\u2713 Pros', value: 'Privacy, Soft aesthetic', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Not reflective, Can stain if not maintained', cls: 'cons' },
              ['Best Places to Use', 'Bathrooms, Partitions, Decorative panels'],
              ['Brands', 'AIS Glass, Saint-Gobain']
            ]
          },
          {
            title: 'Back-Painted Mirror', rows: [
              { label: 'Material', value: 'Mirror with coloured paint applied at the back for a glossy decorative finish.' },
              ['Types', 'Solid Colours, Custom Colours'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5–6'],
              ['Cost (sq.ft)', '₹200 – ₹500'],
              ['Installation Method', 'Panel installation with adhesive'],
              ['Maintenance', 'Clean gently, Avoid scratches'],
              { label: '\u2713 Pros', value: 'Sleek finish, Adds colour', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Scratches visible, Not reflective', cls: 'cons' },
              ['Best Places to Use', 'Panels, Furniture, Decorative surfaces'],
              ['Brands', 'AIS Glass']
            ]
          },
          {
            title: 'LED Mirror', rows: [
              { label: 'Material', value: 'Mirror with integrated lighting that has anti-fog features' },
              ['Types', 'Backlit LED, Front-lit LED, Smart Mirror'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '5mm mirror with frame'],
              ['Cost (sq.ft)', '₹2000 – ₹10,000+ per piece'],
              ['Installation Method', 'Wall-mounted with concealed wiring'],
              ['Maintenance', 'Clean mirror, Check electricals periodically'],
              { label: '\u2713 Pros', value: 'Premium look, Functional lighting, Modern design', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires electricity, Higher cost', cls: 'cons' },
              ['Best Places to Use', 'Bathrooms, Vanity areas'],
              ['Brands', 'Jaquar, Kohler, Hindware']
            ]
          }
        ]
      },
      quartzite: {
        title: 'Quartzite',
        tableItems: [
          'Taj Mahal Quartzite||₹400 – ₹1200 per sq.ft||15–30 mm||Kitchen countertops, islands, bathrooms, wall cladding||Classic Marble Company',
          'Patagonia Quartzite||₹800 – ₹2500 per sq.ft||15-30 mm||Feature walls, islands, luxury spaces||Classic Marble Company',
          'White Macaubas Quartzite||₹500 – ₹1200 per sq.ft||15–20 mm||Kitchens, bathrooms, minimal interiors||Classic Marble Company',
          'Cristallo Quartzite||₹1000 – ₹3000 per sq.ft||15–20 mm||Feature walls, bar counters, luxury interiors||Classic Marble Company',
          'Blue Roma Quartzite||₹700 – ₹2000 per sq.ft||15-20 mm||Feature walls, countertops, statement areas||Classic Marble Company'
        ],
        detailItems: [
          {
            title: 'Taj Mahal Quartzite', rows: [
              { label: 'Material', value: 'A premium quartzite with a creamy beige/ivory base and soft gold-grey veining.' },
              ['Types', 'Taj Mahal Classic, Taj Mahal Premium'],
              ['Sizes', 'Slabs (8\u201310 ft length, 4\u20136 ft width)'],
              ['Thk (mm)', '15\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9400 \u2013 \u20b91200'],
              ['Installation Method', 'Stone adhesive / cement base'],
              ['Maintenance', 'Periodic sealing recommended'],
              { label: '\u2713 Pros', value: 'Luxurious, heat-resistant, durable, timeless', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, requires sealing', cls: 'cons' },
              ['Best Places to Use', 'Kitchen countertops, islands, bathrooms, wall cladding'],
              ['Brands', 'Classic Marble Company']
            ]
          },
          {
            title: 'Patagonia Quartzite', rows: [
              { label: 'Material', value: 'A dramatic, exotic quartzite with a mix of white, gold, black, and translucent crystal patches' },
              ['Types', 'Patagonia Classic, Backlit Patagonia'],
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '18\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9800 \u2013 \u20b92500'],
              ['Installation Method', 'Expert installation required'],
              ['Maintenance', 'Sealing required'],
              { label: '\u2713 Pros', value: 'Unique patterns, can be backlit, highly premium', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, not uniform', cls: 'cons' },
              ['Best Places to Use', 'Feature walls, islands, luxury spaces'],
              ['Brands', 'Classic Marble Company']
            ]
          },
          {
            title: 'White Macaubas Quartzite', rows: [
              { label: 'Material', value: 'A light white quartzite with subtle linear grey veining' },
              ['Types', 'White Macaubas Classic'],
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '15\u201320'],
              ['Cost (sq.ft)', '\u20b9500 \u2013 \u20b91200'],
              ['Installation Method', 'Stone adhesive'],
              ['Maintenance', 'Periodic sealing'],
              { label: '\u2713 Pros', value: 'Elegant, minimal, durable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Limited dramatic pattern', cls: 'cons' },
              ['Best Places to Use', 'Kitchens, bathrooms, minimal interiors'],
              ['Brands', 'Classic Marble Company']
            ]
          },
          {
            title: 'Cristallo Quartzite', rows: [
              { label: 'Material', value: 'A translucent white quartzite with crystalline structure, often backlit for a glowing luxury effect.' },
              ['Types', 'Cristallo White, Cristallo Gold'],
              ['Sizes', 'Customised'],
              ['Thk (mm)', '15\u201320'],
              ['Cost (sq.ft)', '\u20b91000 \u2013 \u20b93000'],
              ['Installation Method', 'Specialized installation'],
              ['Maintenance', 'Careful maintenance + sealing'],
              { label: '\u2713 Pros', value: 'Translucent, unique, ultra-luxury', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, delicate handling', cls: 'cons' },
              ['Best Places to Use', 'Feature walls, bar counters, luxury interiors'],
              ['Brands', 'Classic Marble Company']
            ]
          },
          {
            title: 'Blue Roma Quartzite', rows: [
              { label: 'Material', value: 'A bold quartzite with blue, grey, and golden tones' },
              ['Types', 'Blue Roma Classic'],
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '15\u201320'],
              ['Cost (sq.ft)', '\u20b9700 \u2013 \u20b92000'],
              ['Installation Method', 'Expert installation'],
              ['Maintenance', 'Sealing required'],
              { label: '\u2713 Pros', value: 'Unique color, high visual impact', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, not versatile for all interiors', cls: 'cons' },
              ['Best Places to Use', 'Feature walls, countertops, statement areas'],
              ['Brands', 'Classic Marble Company']
            ]
          }
        ]
      },
      'granite': {
        title: 'Types of Granite (Detailed)',
        tableItems: [
          'Black Granite||₹180 – ₹700||16–20, 20–30||Kitchen countertops, flooring, staircases, wall cladding||RK Marble, Classic Marble Company',
          'Black Galaxy Granite||₹250 – ₹800||16–20, 20–30||Kitchen countertops, feature walls, tabletops||RK Marble, Classic Marble Company',
          'Steel Grey Granite||₹150 – ₹400||16–20, 20–30||Kitchen countertops, flooring, outdoor areas||RK Marble, Classic Marble Company',
          'Tan Brown Granite||₹140 – ₹350||16–20, 20–30||Countertops, flooring, staircases||RK Marble, Classic Marble Company',
          'Viscount White Granite||₹180 – ₹450||16–20, 20–30||Flooring, kitchen countertops, wall cladding, staircases||RK Marble, Classic Marble Company',
          'Alaska White Granite||₹250 – ₹700||16–20, 20–30||Kitchen countertops, islands, feature walls, bathrooms||RK Marble, Classic Marble Company',
          'Imperial Red Granite||₹140 – ₹350||16–20, 20–30||Flooring, staircases, exterior cladding, kitchen countertops, commercial spaces||RK Marble, Classic Marble Company'
        ],
        detailItems: [
          {
            title: 'Black Granite', rows: [
              { label: 'Material', value: 'Deep black, uniform granite with a sleek and modern appearance.' },
              ['Types', 'Absolute Black, Premium Black, Jet Black'],
              ['Sizes', 'Slabs (8\u201310 ft), Cut sizes (2\u00d72 ft, 2\u00d74 ft)'],
              ['Thk (mm)', '16\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9180 \u2013 \u20b9700'],
              ['Installation Method', 'Cement mortar or stone adhesive'],
              ['Maintenance', 'Easy cleaning; occasional sealing recommended'],
              { label: '\u2713 Pros', value: 'Highly durable, stain-resistant, premium look, easy to maintain', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Shows dust and fingerprints, limited pattern variation', cls: 'cons' },
              ['Best Places to Use', 'Kitchen countertops, flooring, staircases, wall cladding'],
              ['Brands', 'RK Marble, Classic Marble Company']
            ]
          },
          {
            title: 'Black Galaxy Granite', rows: [
              { label: 'Material', value: 'Black granite with gold or white specks.' },
              ['Types', 'Small Galaxy, Medium Galaxy, Premium Galaxy'],
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '16\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9250 \u2013 \u20b9800'],
              ['Installation Method', 'Cement mortar or stone adhesive'],
              ['Maintenance', 'Easy cleaning; periodic sealing'],
              { label: '\u2713 Pros', value: 'Luxurious look, durable, unique pattern', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Costlier than other granites', cls: 'cons' },
              ['Best Places to Use', 'Kitchen countertops, feature walls, tabletops'],
              ['Brands', 'RK Marble, Classic Marble Company']
            ]
          },
          {
            title: 'Steel Grey Granite', rows: [
              { label: 'Material', value: 'Grey granite with subtle speckled patterns.' },
              ['Types', 'Steel Grey Polished, Steel Grey Leather Finish'],
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '16\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9150 \u2013 \u20b9400'],
              ['Installation Method', 'Cement mortar or stone adhesive'],
              ['Maintenance', 'Low maintenance; periodic sealing'],
              { label: '\u2713 Pros', value: 'Durable, budget-friendly, hides dust well', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less luxurious compared to marble, limited veining', cls: 'cons' },
              ['Best Places to Use', 'Kitchen countertops, flooring, outdoor areas'],
              ['Brands', 'RK Marble, Classic Marble Company']
            ]
          },
          {
            title: 'Tan Brown Granite', rows: [
              { label: 'Material', value: 'Dark brown granite with black and reddish specks.' },
              ['Types', 'Tan Brown Classic, Tan Brown Dark'],
              ['Sizes', 'Slabs 8\u201310 ft'],
              ['Thk (mm)', '16\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9140 \u2013 \u20b9350'],
              ['Installation Method', 'Cement mortar or stone adhesive'],
              ['Maintenance', 'Easy cleaning; occasional sealing'],
              { label: '\u2713 Pros', value: 'Affordable, durable, warm tones', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Busy pattern may not suit minimal interiors', cls: 'cons' },
              ['Best Places to Use', 'Countertops, flooring, staircases'],
              ['Brands', 'RK Marble, Classic Marble Company']
            ]
          },
          {
            title: 'Viscount White Granite', rows: [
              { label: 'Material', value: 'A white to light grey granite with flowing linear black and grey veins.' },
              ['Types', 'Viscount White Classic, Viscount White Premium'],
              ['Sizes', 'Slabs (8\u201310 ft length, 4\u20136 ft width)'],
              ['Thk (mm)', '16\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9180 \u2013 \u20b9450'],
              ['Installation Method', 'Cement mortar or stone adhesive'],
              ['Maintenance', 'Easy maintenance; periodic sealing recommended'],
              { label: '\u2713 Pros', value: 'Marble-like look, durable, cost-effective, widely available', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Pattern variation between slabs, may require careful selection', cls: 'cons' },
              ['Best Places to Use', 'Flooring, kitchen countertops, wall cladding, staircases'],
              ['Brands', 'RK Marble, Classic Marble Company']
            ]
          },
          {
            title: 'Alaska White Granite', rows: [
              { label: 'Material', value: 'A premium white granite with dramatic grey, black, and beige patterns.' },
              ['Types', 'Alaska White Standard, Alaska White Premium'],
              ['Sizes', 'Slabs (8\u201310 ft length, 4\u20136 ft width)'],
              ['Thk (mm)', '16\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9250 \u2013 \u20b9700'],
              ['Installation Method', 'Cement mortar or stone adhesive'],
              ['Maintenance', 'Periodic sealing recommended; easy cleaning'],
              { label: '\u2713 Pros', value: 'Premium aesthetic, unique patterns, durable, enhances luxury appeal', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Higher cost, high variation in patterns, requires selection from slabs', cls: 'cons' },
              ['Best Places to Use', 'Kitchen countertops, islands, feature walls, bathrooms'],
              ['Brands', 'RK Marble, Classic Marble Company']
            ]
          },
          {
            title: 'Imperial Red Granite', rows: [
              { label: 'Material', value: 'A rich, deep red granite with black and grey crystalline specks.' },
              ['Types', 'Imperial Red, New Imperial Red, Ruby Red, Jhansi Red'],
              ['Sizes', 'Slabs (8\u201310 ft length, 4\u20136 ft width), Cut tiles (2\u00d72 ft, 2\u00d74 ft)'],
              ['Thk (mm)', '16\u201320, 20\u201330'],
              ['Cost (sq.ft)', '\u20b9140 \u2013 \u20b9350'],
              ['Installation Method', 'Cement mortar or stone adhesive'],
              ['Maintenance', 'Easy maintenance; periodic sealing recommended'],
              { label: '\u2713 Pros', value: 'Extremely durable, weather-resistant, bold color, low maintenance, widely available', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Strong color may not suit modern minimal interiors, busy pattern', cls: 'cons' },
              ['Best Places to Use', 'Flooring, staircases, exterior cladding, kitchen countertops, commercial spaces'],
              ['Brands', 'RK Marble, Classic Marble Company']
            ]
          }
        ]
      },
      'designer-laminates': { title: 'Types of Designer Laminates', items: ['Solid Color Laminate – Plain, uniform colors offering a clean and minimal aesthetic', 'Wood Grain Laminate – Realistic wood textures and patterns, most popular finish', 'Fabric Texture Laminate – Soft textile-like surface finish, tactile and warm', 'Metallic Laminate – Gold, silver, copper reflective finish for feature panels', 'Leather Texture Laminate – Luxury leather-like appearance for premium furniture', 'Woven / Basket Weave Laminate – Intricate woven patterns, unique visual texture', 'Matt Suede Laminate – Velvety soft-touch finish, very on-trend for 2025–26', 'Digital Print Laminate – Custom printed images and patterns, completely bespoke'] },
      'laminates-finish': {
        title: 'Laminates Finishes',
        tableItems: [
          'Solid Color Laminate||₹70 – ₹200||0.8, 1||Wardrobes, kitchens, offices||Greenlam, Merino, CenturyPly',
          'Wood Grain Laminate||₹100 – ₹300||0.8 – 1||Furniture, wardrobes, wall panels||Merino, Greenlam, CenturyPly',
          'Marble Finish Laminate||₹120 – ₹350||1||TV units, wall panels, kitchens||Royale Touche, Greenlam',
          'Fabric Finish Laminate||₹150 – ₹400||1||Feature walls, wardrobe||Greenlam, CenturyPly',
          'Metallic Finish Laminate||₹250 – ₹600||0.8 – 1||Feature walls, commercial interiors||Royale Touche, Merino',
          'Digital Printed Laminate||₹150 – ₹400||0.8 – 1||Wardrobes, cabinet shutters, feature panels||Greenlam, Merino, Royale Touche',
          'Cane Finish Laminate||₹150 – ₹400||0.8 – 1||Wardrobes, cabinet shutters, feature panels||Greenlam, Merino, Royale Touche',
          'Stone Finish Laminate||₹120 – ₹350||1||TV units, wall panels, kitchen shutters||Royale Touche, Greenlam, Merino'
        ],
        detailItems: [
          {
            title: 'Solid Color Laminate', rows: [
              { label: 'Material', value: 'Laminates with plain, uniform colors' },
              { label: 'Types', value: 'Matte, Gloss, Pastel, Bold Colors' },
              { label: 'Sizes', value: '8 ft \u00d7 4 ft, 10 ft \u00d7 4 ft' },
              { label: 'Thk (mm)', value: '0.8 \u2013 1' },
              { label: 'Cost (sq.ft)', value: '\u20b970 \u2013 \u20b9200' },
              { label: 'Installation Method', value: 'Adhesive pasting' },
              { label: 'Maintenance', value: 'Easy to maintain' },
              { label: '\u2713 Pros', value: 'Minimal, versatile, budget-friendly', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can look plain if not paired well', cls: 'cons' },
              { label: 'Best Places to Use', value: 'Wardrobes, kitchens, offices' },
              { label: 'Brands', value: 'Greenlam, Merino, CenturyPly' }
            ]
          },
          {
            title: 'Wood Grain Laminate', rows: [
              { label: 'Material', value: 'Replicates natural wood textures and grains.' },
              { label: 'Types', value: 'Oak, Walnut, Teak, Ash finishes' },
              { label: 'Sizes', value: '8 ft \u00d7 4 ft' },
              { label: 'Thk (mm)', value: '0.8 \u2013 1' },
              { label: 'Cost (sq.ft)', value: '\u20b9100 \u2013 \u20b9300' },
              { label: 'Installation Method', value: 'Adhesive pasting' },
              { label: 'Maintenance', value: 'Low maintenance' },
              { label: '\u2713 Pros', value: 'Warm look, cost-effective wood alternative', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less authentic than veneer', cls: 'cons' },
              { label: 'Best Places to Use', value: 'Furniture, wardrobes, wall panels' },
              { label: 'Brands', value: 'Merino, Greenlam, CenturyPly' }
            ]
          },
          {
            title: 'Marble Finish Laminate', rows: [
              { label: 'Material', value: 'Mimics marble surfaces for a luxurious look at lower cost.' },
              { label: 'Types', value: 'Marble Finish in white, black, grey etc' },
              { label: 'Sizes', value: '8 ft \u00d7 4 ft' },
              { label: 'Thk (mm)', value: '1' },
              { label: 'Cost (sq.ft)', value: '\u20b9120 \u2013 \u20b9350' },
              { label: 'Installation Method', value: 'Adhesive pasting' },
              { label: 'Maintenance', value: 'Easy cleaning' },
              { label: '\u2713 Pros', value: 'Premium look, lightweight alternative to stone', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can look artificial in close inspection', cls: 'cons' },
              { label: 'Best Places to Use', value: 'TV units, wall panels, kitchens' },
              { label: 'Brands', value: 'Royale Touche, Greenlam' }
            ]
          },
          {
            title: 'Fabric Finish Laminate', rows: [
              { label: 'Material', value: 'Digitally printed patterns, graphics, or custom visuals.' },
              { label: 'Types', value: 'Floral, Abstract, Custom Prints' },
              { label: 'Sizes', value: '8 ft \u00d7 4 ft' },
              { label: 'Thk (mm)', value: '1' },
              { label: 'Cost (sq.ft)', value: '\u20b9150 \u2013 \u20b9400' },
              { label: 'Installation Method', value: 'Adhesive pasting' },
              { label: 'Maintenance', value: 'Easy cleaning' },
              { label: '\u2713 Pros', value: 'Customizable, creative freedom', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can go out of trend quickly', cls: 'cons' },
              { label: 'Best Places to Use', value: 'Feature walls, wardrobe' },
              { label: 'Brands', value: 'Greenlam, CenturyPly' }
            ]
          },
          {
            title: 'Metallic Finish Laminate', rows: [
              { label: 'Material', value: 'Metallic sheen or brushed metal appearance' },
              { label: 'Types', value: 'Brushed Metal, Bronze, Steel Finish' },
              { label: 'Sizes', value: '8 ft \u00d7 4 ft' },
              { label: 'Thk (mm)', value: '0.8 \u2013 1' },
              { label: 'Cost (sq.ft)', value: '\u20b9250 \u2013 \u20b9600' },
              { label: 'Installation Method', value: 'Adhesive pasting' },
              { label: 'Maintenance', value: 'Regular cleaning' },
              { label: '\u2713 Pros', value: 'Unique, premium appearance', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, niche usage', cls: 'cons' },
              { label: 'Best Places to Use', value: 'Feature walls, commercial interiors' },
              { label: 'Brands', value: 'Royale Touche, Merino' }
            ]
          },
          {
            title: 'Digital Printed Laminate', rows: [
              { label: 'Material', value: 'Laminates with digitally printed patterns, graphics, or custom visuals.' },
              { label: 'Types', value: 'Floral, Abstract, Custom Prints' },
              { label: 'Sizes', value: '8 ft \u00d7 4 ft' },
              { label: 'Thk (mm)', value: '1' },
              { label: 'Cost (sq.ft)', value: '\u20b9150 \u2013 \u20b9400' },
              { label: 'Installation Method', value: 'Adhesive pasting' },
              { label: 'Maintenance', value: 'Easy cleaning' },
              { label: '\u2713 Pros', value: 'Customizable, creative freedom', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can go out of trend quickly', cls: 'cons' },
              { label: 'Best Places to Use', value: 'Kids rooms, feature walls' },
              { label: 'Brands', value: 'Greenlam, CenturyPly' }
            ]
          },
          {
            title: 'Cane Finish Laminate', rows: [
              { label: 'Material', value: 'Replicates natural cane or rattan weaving patterns, giving a warm, handcrafted aesthetic without using actual cane.' },
              { label: 'Types', value: 'Rattan Pattern, Woven Cane, Natural Cane Look' },
              { label: 'Sizes', value: '8 ft \u00d7 4 ft' },
              { label: 'Thk (mm)', value: '0.8 \u2013 1' },
              { label: 'Cost (sq.ft)', value: '\u20b9150 \u2013 \u20b9400' },
              { label: 'Installation Method', value: 'Adhesive pasting' },
              { label: 'Maintenance', value: 'Easy cleaning with cloth' },
              { label: '\u2713 Pros', value: 'Trendy, warm aesthetic, low maintenance vs real cane', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can look artificial if low quality, limited styles', cls: 'cons' },
              { label: 'Best Places to Use', value: 'Wardrobes, cabinet shutters, feature panels' },
              { label: 'Brands', value: 'Greenlam, Merino, Royale Touche' }
            ]
          },
          {
            title: 'Stone Finish Laminate', rows: [
              { label: 'Material', value: 'Mimics natural stone surfaces like granite, slate, or concrete with realistic textures' },
              { label: 'Types', value: 'Concrete Finish, Slate Finish, Granite Look' },
              { label: 'Sizes', value: '8 ft \u00d7 4 ft' },
              { label: 'Thk (mm)', value: '1' },
              { label: 'Cost (sq.ft)', value: '\u20b9120 \u2013 \u20b9350' },
              { label: 'Installation Method', value: 'Adhesive pasting' },
              { label: 'Maintenance', value: 'Easy to clean, low maintenance' },
              { label: '\u2713 Pros', value: 'Stone-like premium look, lightweight alternative', cls: 'pros' },
              { label: '\u2715 Cons', value: 'May look repetitive or artificial up close', cls: 'cons' },
              { label: 'Best Places to Use', value: 'TV units, wall panels, kitchen shutters' },
              { label: 'Brands', value: 'Royale Touche, Greenlam, Merino' }
            ]
          }
        ]
      },
      laminate: { title: 'Types of Laminates', items: ['Regular Laminate (HPL) – Standard high-pressure laminate, most common for all furniture', 'Low Pressure Laminate (LPL) – Thin, cost-effective, ready-to-use boards', 'Acrylic Laminate – High-gloss mirror finish, premium kitchens and wardrobes', 'PVC Laminate – Flexible, moisture resistant, budget option', 'Suede / Velvet Finish – Soft tactile surface, on-trend for wardrobes and beds', 'Metallic Laminate – Reflective metallic sheen for feature panels', 'Anti-Fingerprint Laminate – Smudge-resistant surface, ideal for kitchens', 'Anti-Bacterial Laminate – Hygienic surface for kitchens and hospitals'] },
      'types-of-laminates': {
        title: 'Types of Laminates (Detailed)',
        items: [
          '01 Regular Laminate||₹70 – ₹250 / sq.ft||0.8–1 mm||Affordable, durable, wide variety||Cannot be repaired, visible joints||Wardrobes, kitchen shutters, furniture',
          '02 PVC Laminate||₹50 – ₹200 / sq.ft||0.3–1 mm||Flexible, moisture-resistant||Can peel, less durable than HPL||Kitchens, wardrobes, curved furniture',
          '03 High Pressure Laminate||₹80 – ₹400 / sq.ft||0.8–1.5 mm||Durable, scratch-resistant||Not flexible for curves||Furniture, wardrobes',
          '04 Prelam Board||₹60 – ₹150 / sq.ft||18 mm||Cost-effective, ready-to-use||Lower durability||Budget furniture',
          '05 Core Laminate||₹300 – ₹1200 / sq.ft||6–12 mm||Waterproof, strong||Expensive, heavy||Toilets, partitions, outdoor',
          '06 Acrylic Laminate||₹250 – ₹700 / sq.ft||1–2 mm||High gloss, premium||Expensive, fingerprints||Kitchen shutters',
          '07 Anti-Fingerprint Laminate||₹200 – ₹500 / sq.ft||1 mm||Smudge-proof, matte finish||Costlier||Kitchens, wardrobes',
          '08 Textured Decorative Laminate||₹100 – ₹350 / sq.ft||0.8–1 mm||Realistic textures||Slightly harder to clean||Furniture, panels',
          '09 Exterior Grade Laminate||₹300 – ₹1000 / sq.ft||6–12 mm||Weatherproof, durable||Expensive||Outdoor cladding'
        ]
      },
      'designer-laminates-detail': {
        title: 'Types of Designer Laminates (Detailed)',
        items: [
          '01 Solid Color Laminate||₹70 – ₹200 / sq.ft||0.8–1 mm||Minimal, versatile||Can look plain||Wardrobes, offices',
          '02 Wood Grain Laminate||₹100 – ₹300 / sq.ft||0.8–1 mm||Warm wood look||Less authentic than veneer||Furniture, panels',
          '03 Marble Finish Laminate||₹120 – ₹350 / sq.ft||1 mm||Premium look||Can look artificial||TV units, kitchens',
          '04 Fabric Finish Laminate||₹150 – ₹400 / sq.ft||1 mm||Creative designs||Trend-based||Kids rooms, feature walls',
          '05 Metallic Finish Laminate||₹250 – ₹600 / sq.ft||0.8–1 mm||Unique, modern||Expensive||Commercial interiors',
          '06 Digital Printed Laminate||₹150 – ₹400 / sq.ft||1 mm||Custom designs||Trend dependent||Feature walls',
          '07 Cane Finish Laminate||₹150 – ₹400 / sq.ft||0.8–1 mm||Trendy, warm look||Can look artificial||Cabinets, panels',
          '08 Stone Finish Laminate||₹120 – ₹350 / sq.ft||1 mm||Stone-like look||Repetitive patterns||TV units, kitchens'
        ]
      },
      laminates: {
        title: 'Types of Laminates',
        tableItems: [
          'Regular Laminate||₹70 – ₹250||0.8, 1||Wardrobes, kitchen shutters, TV units, furniture||Greenlam, Merino, CenturyPly, Royale Touche',
          'PVC Laminate||₹50 – ₹200||0.3 – 1||Modular kitchens, wardrobes, curved furniture||Greenlam, Merino',
          'High Pressure Laminate||₹80 – ₹400||0.8 – 1.5||Furniture, wardrobes, kitchen shutters||Greenlam, Merino, CenturyPly, Royale Touche',
          'Prelam Board||₹60 – ₹150||18||Budget furniture, wardrobes, office furniture||Greenpanel',
          'Core Laminate||₹300 – ₹1200||6 – 12||Toilet cubicles, partitions, outdoor furniture||Greenlam Compact, Merino, Signature',
          'Acrylic Laminate||₹250 – ₹700||1 – 2||Kitchen shutters, wardrobes||Greenlam, Advance Laminates',
          'Anti-Fingerprint Laminate||₹200 – ₹500||1||Kitchens, wardrobes, offices||Greenlam, Royale Touche',
          'Textured Decorative Laminate||₹100 – ₹350||0.8 – 1||Furniture, wall panels, wardrobes||Merino, CenturyPly, Greenlam',
          'Exterior Grade Laminate||₹300 – ₹1000||6 – 12||Facades, balconies, outdoor cladding||Greenlam Exterior'
        ],
        detailItems: [
          {
            title: 'Regular Laminate', rows: [
              ['Material', 'Standard decorative laminate made under high pressure'],
              ['Types', 'Matte, Gloss, Suede, Textured, Wood Grain'],
              ['Sizes', '8 ft × 4 ft, 10 ft × 4 ft'],
              ['Thk (mm)', '0.8, 1'],
              ['Cost (sq.ft)', '₹70 – ₹250'],
              ['Installation Method', 'Adhesive pasting on plywood/MDF'],
              ['Maintenance', 'Easy cleaning with damp cloth, low maintenance'],
              { label: '✓ Pros', value: 'Affordable, durable, wide variety of designs, easily available', cls: 'pros' },
              { label: '✕ Cons', value: 'Cannot be repaired if chipped, visible joints, not as premium as acrylic/PU', cls: 'cons' },
              ['Best Places to Use', 'Wardrobes, kitchen shutters, TV units, furniture'],
              ['Brands', 'Greenlam, Merino, CenturyPly, Royale Touche'],
            ]
          },
          {
            title: 'PVC Laminate', rows: [
              ['Material', 'Flexible laminate made from polyvinyl chloride (PVC), used for curved surfaces and moisture-prone areas.'],
              ['Types', 'Matte PVC, Gloss PVC, Membrane Finish'],
              ['Sizes', 'Rolls or sheets'],
              ['Thk (mm)', '0.3 – 1'],
              ['Cost (sq.ft)', '₹50 – ₹200'],
              ['Installation Method', 'Heat pressing / adhesive pasting'],
              ['Maintenance', 'Easy cleaning; avoid heat exposure'],
              { label: '✓ Pros', value: 'Flexible, moisture-resistant, cost-effective', cls: 'pros' },
              { label: '✕ Cons', value: 'Less durable than HPL, can peel over time', cls: 'cons' },
              ['Best Places to Use', 'Modular kitchens, wardrobes, curved furniture'],
              ['Brands', 'Greenlam, Merino'],
            ]
          },
          {
            title: 'High Pressure Laminate', rows: [
              ['Material', 'Durable laminate made under high pressure'],
              ['Types', 'Matte, Gloss, Textured HPL'],
              ['Sizes', '8 ft × 4 ft, 10 ft × 4 ft'],
              ['Thk (mm)', '0.8 – 1.5'],
              ['Cost (sq.ft)', '₹80 – ₹400'],
              ['Installation Method', 'Adhesive pasting on plywood/MDF'],
              ['Maintenance', 'Low maintenance'],
              { label: '✓ Pros', value: 'Durable, scratch-resistant, widely available', cls: 'pros' },
              { label: '✕ Cons', value: 'Limited flexibility for curves', cls: 'cons' },
              ['Best Places to Use', 'Furniture, wardrobes, kitchen shutters'],
              ['Brands', 'Greenlam, Merino, CenturyPly, Royale Touche'],
            ]
          },
          {
            title: 'Prelam Board', rows: [
              ['Material', 'Factory-laminated boards. Laminate is bonded to particle board or MDF under low pressure.'],
              ['Types', 'Prelam MDF, Prelam Particle Board'],
              ['Sizes', '8 ft × 4 ft boards'],
              ['Thk (mm)', '18'],
              ['Cost (sq.ft)', '₹60 – ₹150'],
              ['Installation Method', 'Direct cutting and edge banding'],
              ['Maintenance', 'Basic cleaning'],
              { label: '✓ Pros', value: 'Cost-effective, ready-to-use', cls: 'pros' },
              { label: '✕ Cons', value: 'Lower durability, limited finish options', cls: 'cons' },
              ['Best Places to Use', 'Budget furniture, wardrobes, office furniture'],
              ['Brands', 'Greenpanel'],
            ]
          },
          {
            title: 'Core Laminate', rows: [
              ['Material', 'Thick, self-supporting laminate sheets with a solid core, no substrate required.'],
              ['Types', 'Interior Compact, Exterior Compact'],
              ['Sizes', '8 ft × 4 ft, 10 ft × 4 ft'],
              ['Thk (mm)', '6 – 12'],
              ['Cost (sq.ft)', '₹300 – ₹1200'],
              ['Installation Method', 'Mechanical fixing with screws'],
              ['Maintenance', 'Very low maintenance'],
              { label: '✓ Pros', value: 'Waterproof, strong, self-supporting', cls: 'pros' },
              { label: '✕ Cons', value: 'Expensive, heavy', cls: 'cons' },
              ['Best Places to Use', 'Toilet cubicles, partitions, outdoor furniture'],
              ['Brands', 'Greenlam Compact, Merino, Signature'],
            ]
          },
          {
            title: 'Acrylic Laminate', rows: [
              ['Material', 'High-gloss laminate with acrylic surface for a mirror-like premium finish.'],
              ['Types', 'Solid Acrylic, Metallic Acrylic'],
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '1 – 2'],
              ['Cost (sq.ft)', '₹250 – ₹700'],
              ['Installation Method', 'Adhesive pasting on MDF'],
              ['Maintenance', 'Clean with microfiber cloth'],
              { label: '✓ Pros', value: 'High gloss, scratch-resistant, premium look', cls: 'pros' },
              { label: '✕ Cons', value: 'Expensive, shows fingerprints', cls: 'cons' },
              ['Best Places to Use', 'Kitchen shutters, wardrobes'],
              ['Brands', 'Greenlam, Advance Laminates'],
            ]
          },
          {
            title: 'Anti-Fingerprint Laminate', rows: [
              ['Material', 'Advanced nano-tech laminates designed to resist fingerprints and smudges.'],
              ['Types', 'Super Matte, Nano-Tech Laminates'],
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '1'],
              ['Cost (sq.ft)', '₹200 – ₹500'],
              ['Installation Method', 'Adhesive pasting'],
              ['Maintenance', 'Very low maintenance'],
              { label: '✓ Pros', value: 'Smudge-proof, premium matte finish', cls: 'pros' },
              { label: '✕ Cons', value: 'Costlier than regular laminates', cls: 'cons' },
              ['Best Places to Use', 'Kitchens, wardrobes, offices'],
              ['Brands', 'Greenlam, Royale Touche'],
            ]
          },
          {
            title: 'Textured Decorative Laminate', rows: [
              ['Material', 'Laminates with surface textures like wood grain, stone, fabric, or abstract finishes.'],
              ['Types', 'Wood Grain, Stone Finish, Fabric Finish'],
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '0.8 – 1'],
              ['Cost (sq.ft)', '₹100 – ₹350'],
              ['Installation Method', 'Adhesive pasting'],
              ['Maintenance', 'Wipe with damp cloth'],
              { label: '✓ Pros', value: 'Realistic look, design variety', cls: 'pros' },
              { label: '✕ Cons', value: 'Slightly harder to clean', cls: 'cons' },
              ['Best Places to Use', 'Furniture, wall panels, wardrobes'],
              ['Brands', 'Merino, CenturyPly, Greenlam']
            ]
          },
          {
            title: 'Exterior Grade Laminate', rows: [
              ['Material', 'Laminates designed for outdoor use'],
              ['Types', 'Exterior HPL, UV Resistant Laminates'],
              ['Sizes', '8 ft × 4 ft, 10 ft × 4 ft'],
              ['Thk (mm)', '6 – 12'],
              ['Cost (sq.ft)', '₹300 – ₹1000'],
              ['Installation Method', 'Mechanical fixing system'],
              ['Maintenance', 'Low maintenance'],
              { label: '✓ Pros', value: 'Weatherproof, durable, high resistance to UV, moisture, weather conditions.', cls: 'pros' },
              { label: '✕ Cons', value: 'Expensive, needs proper installation', cls: 'cons' },
              ['Best Places to Use', 'Facades, balconies, outdoor cladding'],
              ['Brands', 'Greenlam Exterior']
            ]
          }
        ]
      },
      'types-of-plywood': {
        title: 'Types of Plywood (Detailed)',
        items: [
          '01 MR Plywood||₹70 – ₹130 / sq.ft||6–18 mm||Affordable, easily available, good for interior use||Not waterproof, not for wet areas||Wardrobes, beds, TV units',
          '02 BWR Plywood||₹100 – ₹180 / sq.ft||6–18 mm||Good water resistance, durable||Costlier than MR||Kitchen cabinets',
          '03 BWP / Marine Plywood||₹140 – ₹250 / sq.ft||6–18 mm||Highly water resistant, durable||Expensive||Kitchen carcass, bathroom',
          '04 Flexible Plywood||₹130 – ₹250 / sq.ft||4–8 mm||Bends easily||Low strength||Curved panels',
          '05 Fire Retardant Plywood||₹180 – ₹350 / sq.ft||6–18 mm||Fire resistant||Expensive||Commercial interiors',
          '06 Blockboard||₹90 – ₹160 / sq.ft||16–19 mm||Lightweight, good for long panels||Less moisture resistant||Doors, shelves',
          '07 MDF||₹50 – ₹120 / sq.ft||6–18 mm||Smooth, good for CNC||Poor moisture resistance||Panels, shutters',
          '08 HDHMR Board||₹120 – ₹220 / sq.ft||6–18 mm||Strong, moisture resistant||Costlier||Kitchen shutters',
          '09 Particle Board||₹40 – ₹90 / sq.ft||12–18 mm||Cheap, lightweight||Low durability||Budget furniture'
        ]
      },
      veneer: {
        title: 'Types of Veneer',
        tableItems: [
          'Natural Wood Veneer||₹120 – ₹500||0.5–1||Furniture, wall panels, doors, wardrobes||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Engineered Veneer||₹80 – ₹300||0.5–1||Furniture, wall panels, offices||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Teak Veneer||₹250 – ₹800||0.6–1||Luxury furniture, doors, paneling||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Walnut Veneer||₹200 – ₹600||0.5–1||Wall panels, furniture, offices||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Oak Veneer||₹150 – ₹400||0.5–1||Furniture, wall panels, wardrobes, Scandinavian interiors||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Dyed Smoked Veneer||₹180 – ₹500||0.5–1||Feature walls, luxury interiors||Venzo'
        ],
        detailItems: [
          {
            title: 'Natural Wood Veneer', rows: [
              ['Material', 'Thin slices of real wood applied on plywood/MDF to achieve a natural wood finish with authentic grains and textures'],
              ['Types', 'Teak, Walnut, Oak, Ash, Maple'],
              ['Sizes', '8 ft \u00d7 4 ft (standard sheets), also in flitches'],
              ['Thk (mm)', '0.5 \u2013 1'],
              ['Cost (sq.ft)', '\u20b9120 \u2013 \u20b9500'],
              ['Installation Method', 'Adhesive pasting + polishing (PU/melamine)'],
              ['Maintenance', 'Requires periodic polishing, avoid moisture'],
              { label: '\u2713 Pros', value: 'Natural look, premium feel, unique grain patterns', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires polishing, can be expensive, needs maintenance', cls: 'cons' },
              ['Best Places to Use', 'Furniture, wall panels, doors, wardrobes'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Engineered Veneer', rows: [
              ['Material', 'Man-made veneer created to achieve uniform grain patterns and consistent color'],
              ['Types', 'Straight Grain, Exotic Patterns'],
              ['Sizes', '8 ft \u00d7 4 ft'],
              ['Thk (mm)', '0.5 \u2013 1'],
              ['Cost (sq.ft)', '\u20b980 \u2013 \u20b9300'],
              ['Installation Method', 'Adhesive pasting + polishing'],
              ['Maintenance', 'Moderate maintenance'],
              { label: '\u2713 Pros', value: 'Uniform look, cost-effective, sustainable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Less natural variation compared to real wood', cls: 'cons' },
              ['Best Places to Use', 'Furniture, wall panels, offices'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Teak Veneer', rows: [
              ['Material', 'Premium natural veneer made from teak wood'],
              ['Types', 'Burma Teak, African Teak'],
              ['Sizes', '8 ft \u00d7 4 ft'],
              ['Thk (mm)', '0.6 \u2013 1'],
              ['Cost (sq.ft)', '\u20b9250 \u2013 \u20b9800'],
              ['Installation Method', 'Adhesive + PU polish'],
              ['Maintenance', 'Periodic polishing required'],
              { label: '\u2713 Pros', value: 'Highly durable, rich appearance, long-lasting', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, requires polishing', cls: 'cons' },
              ['Best Places to Use', 'Luxury furniture, doors, paneling'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Walnut Veneer', rows: [
              ['Material', 'Dark-toned veneer with rich grain pattern'],
              ['Types', 'American Walnut, European Walnut'],
              ['Sizes', '8 ft \u00d7 4 ft'],
              ['Thk (mm)', '0.5 \u2013 1'],
              ['Cost (sq.ft)', '\u20b9200 \u2013 \u20b9600'],
              ['Installation Method', 'Adhesive + polish'],
              ['Maintenance', 'Moderate maintenance'],
              { label: '\u2713 Pros', value: 'Elegant dark finish, premium appeal', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, needs polishing', cls: 'cons' },
              ['Best Places to Use', 'Wall panels, furniture, offices'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Oak Veneer', rows: [
              ['Material', 'Light-colored veneer with subtle grain'],
              ['Types', 'White Oak, Red Oak'],
              ['Sizes', '8 ft \u00d7 4 ft'],
              ['Thk (mm)', '0.5 \u2013 1'],
              ['Cost (sq.ft)', '\u20b9150 \u2013 \u20b9400'],
              ['Installation Method', 'Adhesive + polish'],
              ['Maintenance', 'Regular care required'],
              { label: '\u2713 Pros', value: 'Light aesthetic, versatile design', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Needs polishing, can stain', cls: 'cons' },
              ['Best Places to Use', 'Furniture, wall panels, wardrobes, Scandinavian interiors'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Dyed Smoked Veneer', rows: [
              ['Material', 'Veneers treated with dyes or smoke for custom tones while retaining natural grain'],
              ['Types', 'Smoked Oak, Dyed Ash'],
              ['Sizes', '8 ft \u00d7 4 ft'],
              ['Thk (mm)', '0.5 \u2013 1'],
              ['Cost (sq.ft)', '\u20b9180 \u2013 \u20b9500'],
              ['Installation Method', 'Adhesive + polish'],
              ['Maintenance', 'Moderate maintenance'],
              { label: '\u2713 Pros', value: 'Unique colors with natural texture', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, requires finishing', cls: 'cons' },
              ['Best Places to Use', 'Feature walls, luxury interiors'],
              ['Brands', 'Venzo']
            ]
          }
        ]
      },
      'designer-veneer': {
        title: 'Designer Veneers',
        tableItems: [
          'Sucupira Veneer||₹120 – ₹500||0.5 – 1||Wall panels, luxury furniture, doors||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Wenge Veneer||₹400 – ₹1200||0.5 – 1||Luxury furniture, statement panels||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Ebony Veneer||₹500 – ₹1200||1||Luxury furniture, wardrobes, wall panels, executive spaces||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Zebrano Veneer||₹300 – ₹900||0.5 – 1||Feature walls, furniture, panels||Century Veneers, Su Veneers, Sanghvi Suppliers',
          'Burl Veneer||₹400 – ₹1200||0.5 – 1||Luxury furniture, feature panels||Century Veneers, Su Veneers, Sanghvi Suppliers'
        ],
        detailItems: [
          {
            title: 'Sucupira Veneer', rows: [
              { label: 'Material', value: 'Exotic South American veneer with deep brown tones and subtle lighter streaks' },
              ['Types', 'Flat Cut, Quarter Cut, Recon Sucupira'],
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '0.5 – 1'],
              ['Cost (sq.ft)', '₹250 – ₹800'],
              ['Installation Method', 'Adhesive pasting + PU polish'],
              ['Maintenance', 'Moderate to high maintenance'],
              { label: '\u2713 Pros', value: 'Rich tone, premium feel, durable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, requires polishing', cls: 'cons' },
              ['Best Places to Use', 'Wall panels, luxury furniture, doors'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Wenge Veneer', rows: [
              { label: 'Material', value: 'Premium dark veneer with deep black to dark brown tones' },
              ['Types', 'Natural Ebony, Recon Ebony'],
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '0.5 – 1'],
              ['Cost (sq.ft)', '₹400 – ₹1200'],
              ['Installation Method', 'Adhesive + high-gloss polish'],
              ['Maintenance', 'High maintenance'],
              { label: '\u2713 Pros', value: 'Ultra-premium look, rare material', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, limited availability', cls: 'cons' },
              ['Best Places to Use', 'Luxury furniture, statement panels'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Ebony Veneer', rows: [
              { label: 'Material', value: 'Dark, luxurious veneer with deep black to dark brown tones, with subtle grain patterns' },
              ['Types', 'Crown Cut, Quarter Cut'],
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '0.5 – 1'],
              ['Cost (sq.ft)', '₹500 – ₹1500'],
              ['Installation Method', 'Adhesive + polish'],
              ['Maintenance', 'Moderate to high maintenance (needs regular polishing to retain finish)'],
              { label: '\u2713 Pros', value: 'Rich premium look, adds depth and elegance, timeless appeal', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, can make spaces look smaller if overused, requires skilled polishing', cls: 'cons' },
              ['Best Places to Use', 'Luxury furniture, wardrobes, wall panels, executive spaces'],
              ['Brands', 'Century Veneers, Greenply, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Zebrano Veneer', rows: [
              { label: 'Material', value: 'Striking veneer with bold striped patterns resembling zebra lines' },
              ['Types', 'Crown Cut, Quarter Cut'],
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '0.5 – 1'],
              ['Cost (sq.ft)', '₹300 – ₹900'],
              ['Installation Method', 'Adhesive + polish'],
              ['Maintenance', 'Moderate maintenance'],
              { label: '\u2713 Pros', value: 'Unique pattern, eye-catching design', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can overpower space if overused', cls: 'cons' },
              ['Best Places to Use', 'Feature walls, furniture, panels'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          },
          {
            title: 'Burl Veneer', rows: [
              { label: 'Material', value: 'Highly decorative veneer with intricate swirling grain patterns formed from tree burls' },
              ['Types', 'Walnut Burl, Elm Burl, Oak Burl'],
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '0.5– 1'],
              ['Cost (sq.ft)', '₹400 – ₹1200'],
              ['Installation Method', 'Adhesive + high-gloss polish'],
              ['Maintenance', 'High maintenance'],
              { label: '\u2713 Pros', value: 'Extremely unique, high-end appeal', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, limited stock', cls: 'cons' },
              ['Best Places to Use', 'Luxury furniture, feature panels'],
              ['Brands', 'Century Veneers, Su Veneers, Sanghvi Suppliers']
            ]
          }
        ]
      },
      plywood: {
        title: 'Types of Plywood',
        tableItems: [
          'MR Plywood||₹70 – ₹130||6, 9, 12, 16, 18||Wardrobes, beds, study tables, TV units, indoor furniture||CenturyPly, Greenply',
          'BWR Plywood||₹100 – ₹180 / sq ft||6, 9, 12, 16, 18||Kitchen cabinets, utility furniture, wash area storage||CenturyPly, Greenply',
          'BWP (Boiling Water Proof)||₹140 – ₹250||6, 9, 12, 16, 18||Kitchen carcass, bathroom vanities, sink units, high-moisture areas||CenturyPly Marine, Greenply Gold',
          'Flexible Plywood||₹130 – ₹250||4, 6, 8||Curved furniture, arches, curved wall panels, reception desks||Greenply Flexiply, CenturyPly Flexi',
          'Fire Retardant Plywood||₹180 – ₹350||6, 9, 12, 16, 18||Commercial interiors, hospitals, theatres, public buildings||CenturyPly Firewall, Greenply FR',
          'Blockboard||₹90 – ₹160||16, 18, 19||Doors, long shelves, partitions, tables, wall panels||CenturyPly, Greenply',
          'MDF (Medium Density Fiberboard)||₹50 – ₹120||6, 9, 12, 16, 18||Wall panels, wardrobe shutters, decorative CNC panels, furniture shutters||Greenpanel, CenturyPly',
          'HDHMR Board||₹120 – ₹220||6, 9, 12, 16, 18||Wardrobe shutters, kitchen shutters, furniture panels||Action Tesa HDHMR, Greenpanel HDHMR, CenturyPly Club Prime',
          'Particle Board||₹40 – ₹90||12, 16, 18||Budget furniture, modular kitchens, office furniture||Greenply, CenturyPly'
        ],
        detailItems: [
          {
            title: 'MR Plywood', rows: [
              { label: 'Material', value: 'MR plywood (Moisture Resistant), commonly called commercial plywood, is an interior-grade plywood made using urea formaldehyde resin. It can resist humidity and mild moisture but is not waterproof.' },
              { label: 'Types', value: 'Commercial Grade / MR Grade Plywood' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '6, 9, 12, 16, 18'],
              ['Cost (sq.ft)', '₹70 – ₹130'],
              ['Installation Method', 'Fixed with screws or nails onto wooden or metal framework'],
              ['Maintenance', 'Depends on finish like laminate or veneer'],
              { label: '✓ Pros', value: 'Affordable, easily available, good for interior use', cls: 'pros' },
              { label: '✕ Cons', value: 'Not waterproof, not suitable for wet areas', cls: 'cons' },
              ['Best Places to Use', 'Wardrobes, beds, study tables, TV units, indoor furniture'],
              ['Brands', 'CenturyPly, Greenply']
            ]
          },
          {
            title: 'BWR Plywood', rows: [
              { label: 'Material', value: 'BWR plywood (Boiling Water Resistant) is highly resistant to water and humidity compared to MR plywood.' },
              { label: 'Types', value: 'Exterior Grade BWR Plywood' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '6, 9, 12, 16, 18'],
              ['Cost (sq.ft)', '₹100 – ₹180 / sq ft'],
              ['Installation Method', 'Cut and fixed to framework using screws or nails'],
              ['Maintenance', 'Laminates or veneer finish recommended'],
              { label: '✓ Pros', value: 'Good water resistance, strong and durable', cls: 'pros' },
              { label: '✕ Cons', value: 'Costlier than MR plywood', cls: 'cons' },
              ['Best Places to Use', 'Kitchen cabinets, utility furniture, wash area storage'],
              ['Brands', 'CenturyPly, Greenply']
            ]
          },
          {
            title: 'BWP (Boiling Water Proof)', rows: [
              { label: 'Material', value: 'Marine plywood is the highest grade of plywood made with waterproof phenol formaldehyde resin. It is boil-proof and can withstand extreme weather and moisture conditions.' },
              { label: 'Types', value: 'Marine Grade BWP' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '6, 9, 12, 16, 18'],
              ['Cost (sq.ft)', '₹140 – ₹250'],
              ['Installation Method', 'Cut and fixed to framework with waterproof glue and screws'],
              ['Maintenance', 'Use with waterproof laminate or tile finish'],
              { label: '✓ Pros', value: 'Highly water resistant, very durable, boil proof', cls: 'pros' },
              { label: '✕ Cons', value: 'Very expensive compared to other grades', cls: 'cons' },
              ['Best Places to Use', 'Kitchen carcass, bathroom vanities, sink units, high-moisture areas'],
              ['Brands', 'CenturyPly Marine, Greenply Gold']
            ]
          },
          {
            title: 'Flexible Plywood', rows: [
              { label: 'Material', value: 'Flexible plywood is designed to bend and curve into various shapes. It is made with a unique construction of thin veneers that allow bending.' },
              { label: 'Types', value: 'Long grain, Short grain' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '4, 6, 8'],
              ['Cost (sq.ft)', '₹130 – ₹250'],
              ['Installation Method', 'Fixed over curved framework and laminated'],
              ['Maintenance', 'Regular cleaning'],
              { label: '✓ Pros', value: 'Easily bends to create curved shapes', cls: 'pros' },
              { label: '✕ Cons', value: 'Lower structural strength, not load bearing', cls: 'cons' },
              ['Best Places to Use', 'Curved furniture, arches, curved wall panels, reception desks'],
              ['Brands', 'Greenply Flexiply, CenturyPly Flexi']
            ]
          },
          {
            title: 'Fire Retardant Plywood', rows: [
              { label: 'Material', value: 'Fire retardant plywood is specially treated with fire-resistant chemicals to slow down the spread of flames, reducing fire damage.' },
              { label: 'Types', value: 'Fire Retardant Interior' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '6, 9, 12, 16, 18'],
              ['Cost (sq.ft)', '₹180 – ₹350'],
              ['Installation Method', 'Installed like regular plywood with screws'],
              ['Maintenance', 'Regular surface finish maintenance'],
              { label: '✓ Pros', value: 'Improves fire safety, slows flame spread', cls: 'pros' },
              { label: '✕ Cons', value: 'Expensive, limited availability', cls: 'cons' },
              ['Best Places to Use', 'Commercial interiors, hospitals, theatres, public buildings'],
              ['Brands', 'CenturyPly Firewall, Greenply FR']
            ]
          },
          {
            title: 'Blockboard', rows: [
              { label: 'Material', value: 'Blockboard is not a solid plywood but a panel made with a core of softwood strips between two layers of veneer. It is lightweight and stable for long spans.' },
              { label: 'Types', value: 'Interior Grade, BWR Grade' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '16, 18, 19'],
              ['Cost (sq.ft)', '₹90 – ₹160'],
              ['Installation Method', 'Fixed onto framework using screws or nails'],
              ['Maintenance', 'Surface should be finished with laminate, veneer, or paint'],
              { label: '✓ Pros', value: 'Lightweight, good screw holding, stable for long panels', cls: 'pros' },
              { label: '✕ Cons', value: 'Lower moisture resistance than plywood', cls: 'cons' },
              ['Best Places to Use', 'Doors, long shelves, partitions, tables, wall panels'],
              ['Brands', 'CenturyPly, Greenply']
            ]
          },
          {
            title: 'MDF (Medium Density Fiberboard)', rows: [
              { label: 'Material', value: 'MDF (Medium Density Fiberboard) is an engineered wood product made by breaking down hardwood or softwood residuals into fine wood fibers and combining them with wax and resin under high temperature and pressure.' },
              { label: 'Types', value: 'Interior, MR MDF, Exterior Grade' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '6, 9, 12, 16, 18'],
              ['Cost (sq.ft)', '₹50 – ₹120'],
              ['Installation Method', 'Cut and fixed to framework using screws or adhesive'],
              ['Maintenance', 'Requires protective surface finish'],
              { label: '✓ Pros', value: 'Smooth surface, ideal for paint finishes, good for CNC cutting', cls: 'pros' },
              { label: '✕ Cons', value: 'Poor moisture resistance, weaker screw holding than plywood', cls: 'cons' },
              ['Best Places to Use', 'Wall panels, wardrobe shutters, decorative CNC panels, furniture shutters'],
              ['Brands', 'Greenpanel, CenturyPly']
            ]
          },
          {
            title: 'HDHMR Board', rows: [
              { label: 'Material', value: 'HDHMR (High Density High Moisture Resistant) board is a high-performance engineered wood panel that offers superior strength and moisture resistance compared to standard MDF.' },
              { label: 'Types', value: 'Interior Grade HDHMR' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '6, 9, 12, 16, 18'],
              ['Cost (sq.ft)', '₹120 – ₹220'],
              ['Installation Method', 'Fixed to furniture framework using screws'],
              ['Maintenance', 'Surface should be finished with laminate, veneer, or paint'],
              { label: '✓ Pros', value: 'High strength, moisture resistant, smooth surface', cls: 'pros' },
              { label: '✕ Cons', value: 'Costlier than MDF', cls: 'cons' },
              ['Best Places to Use', 'Wardrobe shutters, kitchen shutters, furniture panels'],
              ['Brands', 'Action Tesa HDHMR, Greenpanel HDHMR, CenturyPly Club Prime']
            ]
          },
          {
            title: 'Particle Board', rows: [
              { label: 'Material', value: 'Particle board is an engineered wood product made from wood chips, sawdust, and resin compressed under heat and pressure. It is the most economical option.' },
              { label: 'Types', value: 'Interior, Pre-laminated' },
              ['Sizes', '8 ft × 4 ft'],
              ['Thk (mm)', '12, 16, 18'],
              ['Cost (sq.ft)', '₹40 – ₹90'],
              ['Installation Method', 'Fixed to framework using screws and connectors'],
              ['Maintenance', 'Protect surface with laminate or veneer'],
              { label: '✓ Pros', value: 'Economical, lightweight, smooth surface for laminate', cls: 'pros' },
              { label: '✕ Cons', value: 'Low durability, weak screw holding, poor moisture resistance', cls: 'cons' },
              ['Best Places to Use', 'Budget furniture, modular kitchens, office furniture'],
              ['Brands', 'Greenply, CenturyPly']
            ]
          }
        ]
      },
      'wood-types': {
        title: 'Types Of Wood',
        tableItems: [
          'Teak Wood||₹2500 – ₹8000||15 – 50||Doors, furniture, outdoor furniture||Local timber suppliers',
          'Sheesham Wood||₹1500 – ₹3500||15 – 40||Furniture, beds, cabinets||Local timber markets',
          'Oak Wood||₹3000 – ₹7000||15 – 40||Furniture, flooring, paneling||Imported timber suppliers',
          'Walnut Wood||₹4000 – ₹9000||15 – 40||Luxury furniture, wall panels||Imported timber suppliers',
          'Pine Wood||₹800 – ₹2000||15 – 35||Furniture, paneling||Local suppliers',
          'Ash Wood||₹2500 – ₹5000||15 – 40||Furniture, paneling||Imported timber suppliers'
        ],
        detailItems: [
          {
            title: 'Teak Wood', rows: [
              { label: 'Material', value: 'Premium hardwood that is durabie and resistance to moisture and termites.' },
              ['Types', 'Burma Teak, African Teak'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '15 – 50'],
              ['Cost (sq.ft)', '₹2500 – ₹8000'],
              ['Installation Method', 'Carpentry joinery + polishing'],
              ['Maintenance', 'Low to moderate ,periodic polishing'],
              { label: '\u2713 Pros', value: 'Highly durable, termite-resistant, long-lasting', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, heavy', cls: 'cons' },
              ['Best Places to Use', 'Doors, furniture, outdoor furniture'],
              ['Brands', 'Local timber suppliers']
            ]
          },
          {
            title: 'Sheesham Wood', rows: [
              { label: 'Material', value: 'Strong hardwood with rich grain patterns' },
              ['Types', 'North Indian Sheesham'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '15 – 40'],
              ['Cost (sq.ft)', '₹1500 – ₹3500'],
              ['Installation Method', 'Carpentry joinery'],
              ['Maintenance', 'Moderate maintenance'],
              { label: '\u2713 Pros', value: 'Durable, attractive grain, cost-effective', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can develop cracks if not seasoned properly', cls: 'cons' },
              ['Best Places to Use', 'Furniture, beds, cabinets'],
              ['Brands', 'Local timber markets']
            ]
          },
          {
            title: 'Oak Wood', rows: [
              { label: 'Material', value: 'Imported hardwood with a light tone and subtle grain' },
              ['Types', 'White Oak, Red Oak'],
              ['Sizes', 'Imported planks'],
              ['Thk (mm)', '15 – 40'],
              ['Cost (sq.ft)', '₹3000 – ₹7000'],
              ['Installation Method', 'Carpentry + polishing'],
              ['Maintenance', 'Moderate maintenance'],
              { label: '\u2713 Pros', value: 'Strong, elegant, versatile', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, not locally available', cls: 'cons' },
              ['Best Places to Use', 'Furniture, flooring, paneling'],
              ['Brands', 'Imported timber suppliers']
            ]
          },
          {
            title: 'Walnut Wood', rows: [
              { label: 'Material', value: 'Premium dark hardwood with rich brown tones' },
              ['Types', 'American Walnut, European Walnut'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '15 – 40'],
              ['Cost (sq.ft)', '₹4000 – ₹9000'],
              ['Installation Method', 'Carpentry + polish'],
              ['Maintenance', 'Moderate maintenance'],
              { label: '\u2713 Pros', value: 'Rich color, premium appeal', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive', cls: 'cons' },
              ['Best Places to Use', 'Luxury furniture, wall panels'],
              ['Brands', 'Imported timber suppliers']
            ]
          },
          {
            title: 'Pine Wood', rows: [
              { label: 'Material', value: 'Softwood with a light color and visible knots' },
              ['Types', 'Natural Pine'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '15 – 35'],
              ['Cost (sq.ft)', '₹800 – ₹2000'],
              ['Installation Method', 'Carpentry'],
              ['Maintenance', 'Moderate'],
              { label: '\u2713 Pros', value: 'Affordable, lightweight', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Soft, prone to dents and scratches', cls: 'cons' },
              ['Best Places to Use', 'Furniture, paneling'],
              ['Brands', 'Local suppliers']
            ]
          },
          {
            title: 'Ash Wood', rows: [
              { label: 'Material', value: 'Light-colored hardwood with straight grain' },
              ['Types', 'White Ash'],
              ['Sizes', 'Custom sizes'],
              ['Thk (mm)', '15 – 40'],
              ['Cost (sq.ft)', '₹2500 – ₹5000'],
              ['Installation Method', 'Carpentry + polish'],
              ['Maintenance', 'Moderate'],
              { label: '\u2713 Pros', value: 'Strong, flexible, light aesthetic', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Needs polishing, not very moisture-resistant', cls: 'cons' },
              ['Best Places to Use', 'Furniture, paneling'],
              ['Brands', 'Imported timber suppliers']
            ]
          }
        ]
      },
      hardware: {
        title: 'Hardware',
        tableItems: [
          'Soft Close Hinge||₹80 – ₹500 / hinge||0.8 – 1.5||Kitchen shutters, wardrobes, storage units||Hettich, Hafele, Blum, Ebco',
          'Telescopic Channel||₹150 – ₹1,000 / pair||35 – 45||Drawer systems, study tables, wardrobes||Hettich, Ebco, Hafele',
          'Tandem Box System||₹2,000 – ₹8,000 / drawer||N/A||Premium kitchen drawers||Blum, Hettich, Hafele',
          'Gola Profile||₹150 – ₹600 / rft||Aluminium Profile||Handleless kitchens & wardrobes||Hafele, Hettich, Ebco',
          'Profile Handle||₹100 – ₹500 / rft||Aluminium||Modern kitchens, wardrobes||Hafele, Ebco, Ozone',
          'Cabinet Handle||₹50 – ₹2,000 / pc||N/A||Kitchen shutters, wardrobes, drawers||Dorset, Ozone, Hafele',
          'Door Hinge||₹50 – ₹800 / hinge||2 – 4||Main doors, bedroom doors, bathroom doors||Dorset, Godrej, Yale, Hafele',
          'Door Handle||₹200 – ₹15,000 / set||10 – 25||Main doors, internal doors||Dorset, Ozone, Yale, Hafele',
          'Mortise Lock||₹500 – ₹8,000||45 – 70 Door Thickness||Bedroom & entrance doors||Godrej, Yale, Dorset',
          'Digital Door Lock||₹5,000 – ₹50,000||35 – 100 Door Thickness||Main entrance doors||Yale, Godrej, Hafele',
          'Concealed Door Closer||₹800 – ₹12,000||N/A||Offices, commercial spaces, heavy doors||Dorma, Hafele, Ozone',
          'Door Stopper||₹100 – ₹2,000||N/A||All doors||Ozone, Dorset, Godrej',
          'Tower Bolt||₹50 – ₹1,000||N/A||Bathrooms, utility areas||Godrej, Dorset',
          'Magnetic Door Catcher||₹100 – ₹500||N/A||Bedroom & office doors||Hafele, Ebco',
          'Floor Spring||₹2,500 – ₹20,000||Glass 10 – 15||Frameless glass doors||Dorma, Hafele',
          'Patch Fitting||₹300 – ₹5,000 / pc||Glass 10 – 15||Glass doors & partitions||Dorma, Ozone',
          'Spider Fitting||₹1,000 – ₹15,000 / pc||Glass 12 – 20||Glass façades||Dorma, Ozone',
          'Shower Hinge||₹1,000 – ₹8,000 / pair||Glass 8 – 12||Shower cubicles||Hafele, Ozone',
          'Glass Connector||₹200 – ₹2,500||Glass 8 – 15||Glass partitions||Ozone, Dorma',
          'Curtain Track||₹100 – ₹1,500 / rft||N/A||Living rooms, bedrooms||Forest, Silent Gliss',
          'Curtain Rod||₹150 – ₹3,000 / rft||19 – 32 Dia||Windows & balcony doors||D\'Decor, Ikea',
          'Sliding Door System||₹2,000 – ₹25,000 / door||Door 18 – 45||Room dividers, balcony partitions||Hafele, Hettich'
        ],
        detailItems: [
          {
            title: 'Soft Close Hinge', rows: [
              { label: 'Material', value: 'Hinge with built-in damping mechanism that prevents slamming and ensures silent door closing.' },
              ['Types', 'Clip-on, Slide-on, Screw-on'],
              ['Sizes', '35mm cup dia, 0–15mm overlay adjustment'],
              ['Thk (mm)', '0.8 – 1.5'],
              ['Cost (pc)', '₹80 – ₹500 / hinge'],
              ['Installation Method', 'Screw-mount on cabinet frame and door panel'],
              ['Maintenance', 'Wipe clean; occasional lubrication of moving parts'],
              { label: '\u2713 Pros', value: 'Silent operation, prevents wear, easy installation', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Premium brands are expensive', cls: 'cons' },
              ['Best Places to Use', 'Kitchen shutters, wardrobes, storage units'],
              ['Brands', 'Hettich, Hafele, Blum, Ebco']
            ]
          },
          {
            title: 'Telescopic Channel', rows: [
              { label: 'Material', value: 'Full-extension ball-bearing slide channel for smooth drawer movement.' },
              ['Types', 'Partial extension, Full extension, Heavy-duty'],
              ['Sizes', '250mm – 600mm length'],
              ['Thk (mm)', '35 – 45 (channel width)'],
              ['Cost (pair)', '₹150 – ₹1,000 / pair'],
              ['Installation Method', 'Side-mount or under-mount on drawer boxes'],
              ['Maintenance', 'Wipe clean; occasional lubrication'],
              { label: '\u2713 Pros', value: 'Smooth sliding, full drawer access, durable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can jam if overloaded', cls: 'cons' },
              ['Best Places to Use', 'Drawer systems, study tables, wardrobes'],
              ['Brands', 'Hettich, Ebco, Hafele']
            ]
          },
          {
            title: 'Tandem Box System', rows: [
              { label: 'Material', value: 'Complete drawer system with integrated runners, sides, and back panel.' },
              ['Types', 'Tandem, Tandem XL, Legrabox'],
              ['Sizes', '250mm – 600mm width, custom depths'],
              ['Thk (mm)', 'N/A (integrated system)'],
              ['Cost (drawer)', '₹2,000 – ₹8,000 / drawer'],
              ['Installation Method', 'Clip-mount on cabinet frame; pre-assembled drawer box'],
              ['Maintenance', 'Wipe clean; minimal maintenance'],
              { label: '\u2713 Pros', value: 'Smooth action, high load capacity, premium feel', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, requires precise cabinetry', cls: 'cons' },
              ['Best Places to Use', 'Premium kitchen drawers'],
              ['Brands', 'Blum, Hettich, Hafele']
            ]
          },
          {
            title: 'Gola Profile', rows: [
              { label: 'Material', value: 'Aluminium profile used as a handle alternative on cabinet shutters.' },
              ['Types', 'C-profile, L-profile, U-channel'],
              ['Sizes', '8ft standard length, custom cut'],
              ['Thk (mm)', 'Aluminium Profile (1 – 2mm wall thickness)'],
              ['Cost (rft)', '₹150 – ₹600 / rft'],
              ['Installation Method', 'Screw-mount or adhesive-mount on shutter edge'],
              ['Maintenance', 'Wipe clean with mild detergent'],
              { label: '\u2713 Pros', value: 'Sleek look, no protruding handles, modern aesthetic', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can collect dust in groove', cls: 'cons' },
              ['Best Places to Use', 'Handleless kitchens & wardrobes'],
              ['Brands', 'Hafele, Hettich, Ebco']
            ]
          },
          {
            title: 'Profile Handle', rows: [
              { label: 'Material', value: 'Aluminium or stainless steel horizontal/vertical profile used as a handle.' },
              ['Types', 'Anodized, Powder-coated, Brushed finish'],
              ['Sizes', 'Custom lengths up to 8ft'],
              ['Thk (mm)', 'Aluminium (1.5 – 3mm)'],
              ['Cost (rft)', '₹100 – ₹500 / rft'],
              ['Installation Method', 'Screw-mount on shutter or drawer front'],
              ['Maintenance', 'Wipe clean; avoid abrasive cleaners'],
              { label: '\u2713 Pros', value: 'Durable, sleek, wide variety of finishes', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can be sharp on edges if not finished well', cls: 'cons' },
              ['Best Places to Use', 'Modern kitchens, wardrobes'],
              ['Brands', 'Hafele, Ebco, Ozone']
            ]
          },
          {
            title: 'Cabinet Handle', rows: [
              { label: 'Material', value: 'Decorative and functional handle for cabinets and drawers.' },
              ['Types', 'Bar handles, T-handles, Ring handles, Drop handles'],
              ['Sizes', '32mm – 512mm hole centers, various lengths'],
              ['Thk (mm)', 'N/A (varies by design)'],
              ['Cost (pc)', '₹50 – ₹2,000 / pc'],
              ['Installation Method', 'Screw-mount on shutter or drawer front'],
              ['Maintenance', 'Polish with dry cloth; clean with mild soap'],
              { label: '\u2713 Pros', value: 'Wide design variety, easy to replace, affordable options', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can loosen over time, needs tightening', cls: 'cons' },
              ['Best Places to Use', 'Kitchen shutters, wardrobes, drawers'],
              ['Brands', 'Dorset, Ozone, Hafele']
            ]
          },
          {
            title: 'Door Hinge', rows: [
              { label: 'Material', value: 'Heavy-duty hinge for main doors and room doors.' },
              ['Types', 'Butt hinge, Piano hinge, Pivot hinge, Ball-bearing hinge'],
              ['Sizes', '3 inch, 4 inch, 5 inch, 6 inch'],
              ['Thk (mm)', '2 – 4 (leaf thickness)'],
              ['Cost (hinge)', '₹50 – ₹800 / hinge'],
              ['Installation Method', 'Recess-mount on door frame and door leaf'],
              ['Maintenance', 'Oil moving parts periodically'],
              { label: '\u2713 Pros', value: 'Strong, reliable, wide load capacity', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Heavy doors may need 3+ hinges', cls: 'cons' },
              ['Best Places to Use', 'Main doors, bedroom doors, bathroom doors'],
              ['Brands', 'Dorset, Godrej, Yale, Hafele']
            ]
          },
          {
            title: 'Door Handle', rows: [
              { label: 'Material', value: 'Decorative and functional handle for entry and internal doors.' },
              ['Types', 'Lever handles, Knob handles, Pull handles, Privacy sets'],
              ['Sizes', 'Various lengths from 100mm – 1500mm'],
              ['Thk (mm)', '10 – 25 (handle diameter or width)'],
              ['Cost (set)', '₹200 – ₹15,000 / set'],
              ['Installation Method', 'Screw-mount on door with through-bolts'],
              ['Maintenance', 'Polish with dry cloth; tighten screws if loose'],
              { label: '\u2713 Pros', value: 'Enhances door aesthetics, wide variety of styles', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Premium designs are expensive', cls: 'cons' },
              ['Best Places to Use', 'Main doors, internal doors'],
              ['Brands', 'Dorset, Ozone, Yale, Hafele']
            ]
          },
          {
            title: 'Mortise Lock', rows: [
              { label: 'Material', value: 'Recessed door lock mechanism installed inside the door edge.' },
              ['Types', 'Standard, Deadbolt, Night latch, Smart-ready'],
              ['Sizes', '4 inch, 5 inch, 6 inch backset'],
              ['Thk (mm)', '45 – 70 Door Thickness'],
              ['Cost', '₹500 – ₹8,000'],
              ['Installation Method', 'Cut-out recess in door edge + screw mounting'],
              ['Maintenance', 'Lubricate keyway and latch periodically'],
              { label: '\u2713 Pros', value: 'Secure, concealed mechanism, durable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Complex installation, requires door preparation', cls: 'cons' },
              ['Best Places to Use', 'Bedroom & entrance doors'],
              ['Brands', 'Godrej, Yale, Dorset']
            ]
          },
          {
            title: 'Digital Door Lock', rows: [
              { label: 'Material', value: 'Electronic lock with keypad, fingerprint, or smart access.' },
              ['Types', 'Biometric, RFID, Bluetooth, Wi-Fi enabled, Face recognition'],
              ['Sizes', 'Standard door prep, various finishes'],
              ['Thk (mm)', '35 – 100 Door Thickness'],
              ['Cost', '₹5,000 – ₹50,000'],
              ['Installation Method', 'Replace existing mortise lock; screw-mount on door'],
              ['Maintenance', 'Battery replacement every 6–12 months; wipe clean'],
              { label: '\u2713 Pros', value: 'Keyless entry, remote access, multiple user codes', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Battery-dependent, expensive, needs tech support', cls: 'cons' },
              ['Best Places to Use', 'Main entrance doors'],
              ['Brands', 'Yale, Godrej, Hafele']
            ]
          },
          {
            title: 'Concealed Door Closer', rows: [
              { label: 'Material', value: 'Hydraulic or pneumatic door closing mechanism hidden in floor or frame.' },
              ['Types', 'Floor spring, Overhead closer, Concealed in frame'],
              ['Sizes', 'Various load ratings (40kg – 150kg)'],
              ['Thk (mm)', 'N/A (mechanism size varies)'],
              ['Cost', '₹800 – ₹12,000'],
              ['Installation Method', 'Recess-mount in floor or door frame'],
              ['Maintenance', 'Check hydraulic fluid; adjust closing speed'],
              { label: '\u2713 Pros', value: 'Automatic closing, neat appearance, adjustable speed', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Complex installation, harder to service', cls: 'cons' },
              ['Best Places to Use', 'Offices, commercial spaces, heavy doors'],
              ['Brands', 'Dorma, Hafele, Ozone']
            ]
          },
          {
            title: 'Door Stopper', rows: [
              { label: 'Material', value: 'Fitting that prevents doors from swinging too far or damaging walls.' },
              ['Types', 'Wall-mounted, Floor-mounted, Hinge-pin type, Magnetic'],
              ['Sizes', 'Various sizes for different door gaps'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹100 – ₹2,000'],
              ['Installation Method', 'Screw-mount on wall, floor, or baseboard'],
              ['Maintenance', 'Tighten if loose; replace rubber bumper if worn'],
              { label: '\u2713 Pros', value: 'Prevents wall damage, affordable, easy installation', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can be a tripping hazard if floor-mounted', cls: 'cons' },
              ['Best Places to Use', 'All doors'],
              ['Brands', 'Ozone, Dorset, Godrej']
            ]
          },
          {
            title: 'Tower Bolt', rows: [
              { label: 'Material', value: 'Sliding bolt lock for additional door security.' },
              ['Types', 'Aluminium, Brass, Stainless Steel, Zinc alloy'],
              ['Sizes', '4 inch, 6 inch, 8 inch, 12 inch'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹50 – ₹1,000'],
              ['Installation Method', 'Screw-mount on door and frame'],
              ['Maintenance', 'Lubricate sliding bolt occasionally'],
              { label: '\u2713 Pros', value: 'Simple, reliable, inexpensive', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Manual operation, not key-lockable', cls: 'cons' },
              ['Best Places to Use', 'Bathrooms, utility areas'],
              ['Brands', 'Godrej, Dorset']
            ]
          },
          {
            title: 'Magnetic Door Catcher', rows: [
              { label: 'Material', value: 'Magnetic fitting that holds doors in open position.' },
              ['Types', 'Surface mount, Flush mount, Heavy-duty'],
              ['Sizes', 'Standard size for most doors'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹100 – ₹500'],
              ['Installation Method', 'Screw-mount on door and wall/floor'],
              ['Maintenance', 'Clean magnet surface; tighten screws'],
              { label: '\u2713 Pros', value: 'Holds door securely, silent operation, compact', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Magnet weakens over time', cls: 'cons' },
              ['Best Places to Use', 'Bedroom & office doors'],
              ['Brands', 'Hafele, Ebco']
            ]
          },
          {
            title: 'Floor Spring', rows: [
              { label: 'Material', value: 'Hydraulic door closer mechanism installed in the floor for heavy doors.' },
              ['Types', 'Single-acting, Double-acting'],
              ['Sizes', 'Load capacity up to 300kg'],
              ['Thk (mm)', 'Glass 10 – 15 (for glass door applications)'],
              ['Cost', '₹2,500 – ₹20,000'],
              ['Installation Method', 'Floor recess installation with concrete anchoring'],
              ['Maintenance', 'Check hydraulic oil level; adjust closing speed'],
              { label: '\u2713 Pros', value: 'Invisible mechanism, handles heavy doors, smooth operation', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive installation, difficult to repair', cls: 'cons' },
              ['Best Places to Use', 'Frameless glass doors'],
              ['Brands', 'Dorma, Hafele']
            ]
          },
          {
            title: 'Patch Fitting', rows: [
              { label: 'Material', value: 'Glass-to-glass or glass-to-frame connector for frameless glass doors.' },
              ['Types', 'Corner patch, Side patch, Spigot patch'],
              ['Sizes', 'Various sizes for 8–15mm glass'],
              ['Thk (mm)', 'Glass 10 – 15'],
              ['Cost (pc)', '₹300 – ₹5,000 / pc'],
              ['Installation Method', 'Clamp-mount on glass edge with rubber gaskets'],
              ['Maintenance', 'Tighten screws periodically; clean glass'],
              { label: '\u2713 Pros', value: 'Minimalist look, secure glass holding', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Precision alignment required', cls: 'cons' },
              ['Best Places to Use', 'Glass doors & partitions'],
              ['Brands', 'Dorma, Ozone']
            ]
          },
          {
            title: 'Spider Fitting', rows: [
              { label: 'Material', value: 'Multi-arm glass connector used for structural glass façades and railings.' },
              ['Types', '4-arm, 6-arm, Wall-mount, Floor-mount'],
              ['Sizes', 'Various for 12–20mm glass'],
              ['Thk (mm)', 'Glass 12 – 20'],
              ['Cost (pc)', '₹1,000 – ₹15,000 / pc'],
              ['Installation Method', 'Bolted through glass with countersunk holes'],
              ['Maintenance', 'Check bolt tightness; clean periodically'],
              { label: '\u2713 Pros', value: 'Creates seamless glass look, strong structural hold', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires glass drilling, complex installation', cls: 'cons' },
              ['Best Places to Use', 'Glass façades'],
              ['Brands', 'Dorma, Ozone']
            ]
          },
          {
            title: 'Shower Hinge', rows: [
              { label: 'Material', value: 'Hinge specifically designed for glass shower enclosure doors.' },
              ['Types', '90-degree, 180-degree, Pivot hinge, Spring hinge'],
              ['Sizes', 'Various for 8–12mm glass'],
              ['Thk (mm)', 'Glass 8 – 12'],
              ['Cost (pair)', '₹1,000 – ₹8,000 / pair'],
              ['Installation Method', 'Clamp or drill-through mount on glass door'],
              ['Maintenance', 'Clean glass and hinge; lubricate moving parts'],
              { label: '\u2713 Pros', value: 'Holds glass securely, corrosion-resistant', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can rust if not stainless steel', cls: 'cons' },
              ['Best Places to Use', 'Shower cubicles'],
              ['Brands', 'Hafele, Ozone']
            ]
          },
          {
            title: 'Glass Connector', rows: [
              { label: 'Material', value: 'Connector used to join two glass panels at various angles.' },
              ['Types', 'L-connector, T-connector, Line connector, Angle connector'],
              ['Sizes', 'Various for 8–15mm glass'],
              ['Thk (mm)', 'Glass 8 – 15'],
              ['Cost', '₹200 – ₹2,500'],
              ['Installation Method', 'Clamp-mount on glass edges with rubber lining'],
              ['Maintenance', 'Tighten screws if loose'],
              { label: '\u2713 Pros', value: 'Enables seamless glass panel joins, versatile angles', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Visible hardware may not suit all aesthetics', cls: 'cons' },
              ['Best Places to Use', 'Glass partitions'],
              ['Brands', 'Ozone, Dorma']
            ]
          },
          {
            title: 'Curtain Track', rows: [
              { label: 'Material', value: 'Track system for hanging and sliding curtains smoothly.' },
              ['Types', 'Ceiling mount, Wall mount, Curved, Motorized'],
              ['Sizes', '1m – 6m standard lengths, custom cut'],
              ['Thk (mm)', 'N/A'],
              ['Cost (rft)', '₹100 – ₹1,500 / rft'],
              ['Installation Method', 'Screw-mount on ceiling or wall with brackets'],
              ['Maintenance', 'Clean track; lubricate gliders'],
              { label: '\u2713 Pros', value: 'Smooth glide, quiet operation, various styles', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Installation requires precise alignment', cls: 'cons' },
              ['Best Places to Use', 'Living rooms, bedrooms'],
              ['Brands', 'Forest, Silent Gliss']
            ]
          },
          {
            title: 'Curtain Rod', rows: [
              { label: 'Material', value: 'Decorative rod for hanging curtains with rings.' },
              ['Types', 'Metal, Wood, Acrylic, Tension rods'],
              ['Sizes', '1m – 4m lengths, 19mm – 32mm diameter'],
              ['Thk (mm)', '19 – 32 Dia'],
              ['Cost (rft)', '₹150 – ₹3,000 / rft'],
              ['Installation Method', 'Bracket-mount on wall above window'],
              ['Maintenance', 'Dust regularly; tighten brackets'],
              { label: '\u2713 Pros', value: 'Classic look, easy installation, widely available', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can sag under heavy curtains if too long', cls: 'cons' },
              ['Best Places to Use', 'Windows & balcony doors'],
              ['Brands', 'D\'Decor, Ikea']
            ]
          },
          {
            title: 'Sliding Door System', rows: [
              { label: 'Material', value: 'Complete system for sliding doors with tracks, rollers, and guides.' },
              ['Types', 'Top hung, Bottom rolling, Pocket door, Barn door'],
              ['Sizes', 'Door width 600mm – 1200mm, custom heights'],
              ['Thk (mm)', 'Door 18 – 45'],
              ['Cost (door)', '₹2,000 – ₹25,000 / door'],
              ['Installation Method', 'Track-mount on ceiling or floor; hang door on rollers'],
              ['Maintenance', 'Clean track; lubricate rollers; adjust alignment'],
              { label: '\u2713 Pros', value: 'Space-saving, modern look, smooth operation', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Track can collect dust, higher hardware cost', cls: 'cons' },
              ['Best Places to Use', 'Room dividers, balcony partitions'],
              ['Brands', 'Hafele, Hettich']
            ]
          }
        ]
      },
      sanitary: {
        title: 'Sanitary Fittings',
        tableItems: [
          'Floor Mounted WC||₹4,000 – ₹25,000||N/A||Standard residential bathrooms||Jaquar, Cera, Hindware, Parryware',
          'Wall Hung WC||₹8,000 – ₹60,000||N/A||Premium apartments, villas||Kohler, Jaquar, Roca, Cera',
          'Countertop Wash Basin||₹2,000 – ₹50,000||12–20||Vanity counters||Kohler, Cera, Jaquar',
          'Wall Hung Wash Basin||₹1,500 – ₹20,000||12–20||Compact bathrooms||Hindware, Cera, Parryware',
          'Full Pedestal Basin||₹2,000 – ₹15,000||12–20||Guest bathrooms||Cera, Hindware, Jaquar',
          'Under Counter Basin||₹3,000 – ₹30,000||12–20||Luxury vanities||Kohler, Roca, Jaquar',
          'Basin Mixer Faucet||₹2,000 – ₹30,000||N/A||Vanity areas||Jaquar, Grohe, Kohler',
          'Tall Body Basin Mixer||₹4,000 – ₹50,000||N/A||Countertop basins||Kohler, Grohe, Jaquar',
          'Wall Mounted Faucet||₹1,500 – ₹20,000||N/A||Wash basins||Cera, Jaquar, Hindware',
          'Health Faucet||₹500 – ₹8,000||N/A||WC areas||Jaquar, Cera, Hindware',
          'Wall Mounted Shower Head||₹500 – ₹10,000||N/A||Standard residential bathrooms||Jaquar, Cera, Hindware',
          'Overhead Rain Shower||₹2,000 – ₹60,000||200–600 Dia||Master bathrooms||Jaquar, Kohler, Grohe',
          'Ceiling Mounted Rain Shower||₹5,000 – ₹1,00,000+||200–800 Dia||Luxury bathrooms||Kohler, Grohe, TOTO',
          'Hand Shower Set||₹1,000 – ₹15,000||N/A||All bathrooms||Jaquar, Cera, Grohe',
          'Exposed Shower Mixer||₹2,000 – ₹15,000||N/A||Budget & renovation projects||Jaquar, Cera',
          'Thermostatic Shower Mixer||₹10,000 – ₹75,000||N/A||Luxury bathrooms||Grohe, Kohler, Hansgrohe',
          'Shower Panel||₹8,000 – ₹1,50,000||N/A||Premium bathrooms||Kohler, Jaquar',
          'Body Jets||₹2,000 – ₹15,000 / jet||N/A||Spa-style showers||Grohe, Kohler',
          'Waterfall Shower||₹10,000 – ₹1,00,000+||N/A||Luxury villas & resorts||Kohler, Grohe',
          'Steam Shower System||₹50,000 – ₹10,00,000+||N/A||Wellness & luxury projects||Kohler, TOTO',
          'Digital Shower Control||₹25,000 – ₹3,00,000+||N/A||Smart homes||Kohler, Grohe',
          'Freestanding Bathtub||₹20,000 – ₹5,00,000+||Acrylic 5–15||Luxury villas, master baths||Kohler, Roca, Jaquar',
          'Built-In Bathtub||₹15,000 – ₹2,00,000||Acrylic 5–15||Premium residences||Jaquar, Hindware',
          'Urinal||₹3,000 – ₹25,000||N/A||Commercial projects||Cera, Hindware, Jaquar',
          'Sensor Faucet||₹5,000 – ₹50,000||N/A||Commercial & luxury projects||Grohe, Kohler, Jaquar',
          'Flush Plate||₹1,000 – ₹20,000||N/A||Concealed cistern systems||Geberit, Grohe, Jaquar',
          'Floor Drain / Nahani Trap||₹300 – ₹5,000||75–150||Bathrooms, utility areas||Jaquar, Hindware',
          'Bottle Trap||₹500 – ₹8,000||N/A||Designer wash basins||Kohler, Jaquar'
        ],
        detailItems: [
          {
            title: 'Floor Mounted WC', rows: [
              { label: 'Material', value: 'Standard two-piece toilet with floor-mounted bowl and concealed or exposed cistern.' },
              ['Types', 'Two-piece, One-piece, Angled flush, Horizontal flush'],
              ['Sizes', 'Standard: 650–750mm length x 350–400mm width'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹4,000 – ₹25,000'],
              ['Installation Method', 'Floor mounting with flange and wax ring seal'],
              ['Maintenance', 'Regular cleaning with mild bathroom cleaner'],
              { label: '\u2713 Pros', value: 'Widely available, easy installation, economical', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Takes floor space, harder to clean underneath', cls: 'cons' },
              ['Best Place To Use', 'Standard residential bathrooms'],
              ['Brands', 'Jaquar, Cera, Hindware, Parryware']
            ]
          },
          {
            title: 'Wall Hung WC', rows: [
              { label: 'Material', value: 'Wall-mounted toilet with concealed cistern for a modern, space-saving look.' },
              ['Types', 'Round bowl, Elongated bowl, Compact, Rimless'],
              ['Sizes', 'Standard: 500–600mm projection from wall'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹8,000 – ₹60,000'],
              ['Installation Method', 'Mount on wall frame with concealed carrier system'],
              ['Maintenance', 'Easy floor cleaning; access panel for cistern service'],
              { label: '\u2713 Pros', value: 'Space-saving, modern look, easy floor cleaning', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Higher cost, complex installation, requires wall frame', cls: 'cons' },
              ['Best Place To Use', 'Premium apartments, villas'],
              ['Brands', 'Kohler, Jaquar, Roca, Cera']
            ]
          },
          {
            title: 'Countertop Wash Basin', rows: [
              { label: 'Material', value: 'Basin that sits on top of a vanity counter, creating a statement look.' },
              ['Types', 'Round, Oval, Square, Rectangular, Vessel, Semi-recessed'],
              ['Sizes', '300–600mm diameter or width'],
              ['Thk (mm)', '12 – 20'],
              ['Cost', '₹2,000 – ₹50,000'],
              ['Installation Method', 'Place on counter with sealant; connect to wall plumbing'],
              ['Maintenance', 'Wipe with soft cloth; avoid abrasive cleaners'],
              { label: '\u2713 Pros', value: 'Designer look, easy to install, wide variety', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires tall body mixer, more counter space needed', cls: 'cons' },
              ['Best Place To Use', 'Vanity counters'],
              ['Brands', 'Kohler, Cera, Jaquar']
            ]
          },
          {
            title: 'Wall Hung Wash Basin', rows: [
              { label: 'Material', value: 'Wall-mounted basin without a pedestal, ideal for compact spaces.' },
              ['Types', 'Wall hung, Semi-pedestal, Wall-mounted with shelf'],
              ['Sizes', '400–600mm width x 300–500mm depth'],
              ['Thk (mm)', '12 – 20'],
              ['Cost', '₹1,500 – ₹20,000'],
              ['Installation Method', 'Wall mounting with heavy-duty brackets and anchors'],
              ['Maintenance', 'Regular cleaning; accessible plumbing for repairs'],
              { label: '\u2713 Pros', value: 'Compact, space-saving, exposed plumbing is accessible', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Plumbing visible unless boxed', cls: 'cons' },
              ['Best Place To Use', 'Compact bathrooms'],
              ['Brands', 'Hindware, Cera, Parryware']
            ]
          },
          {
            title: 'Full Pedestal Basin', rows: [
              { label: 'Material', value: 'Basin with a full pedestal that conceals the plumbing.' },
              ['Types', 'Full pedestal, Semi pedestal, Two-piece'],
              ['Sizes', '500–700mm width x 400–500mm depth'],
              ['Thk (mm)', '12 – 20'],
              ['Cost', '₹2,000 – ₹15,000'],
              ['Installation Method', 'Wall mounting over pedestal; pedestal rests on floor'],
              ['Maintenance', 'Clean basin and pedestal with mild cleaner'],
              { label: '\u2713 Pros', value: 'Concealed plumbing, classic look, affordable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Pedestal takes floor space, harder to clean around', cls: 'cons' },
              ['Best Place To Use', 'Guest bathrooms'],
              ['Brands', 'Cera, Hindware, Jaquar']
            ]
          },
          {
            title: 'Under Counter Basin', rows: [
              { label: 'Material', value: 'Basin installed beneath the countertop for a seamless look.' },
              ['Types', 'Undermount rectangular, Oval, Square'],
              ['Sizes', '400–600mm width x 300–500mm depth'],
              ['Thk (mm)', '12 – 20'],
              ['Cost', '₹3,000 – ₹30,000'],
              ['Installation Method', 'Under-mount adhesive + clamp to stone/laminate counter'],
              ['Maintenance', 'Wipe counter; seal edges periodically'],
              { label: '\u2713 Pros', value: 'Seamless counter look, easy counter cleaning', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires professional installation, higher cost', cls: 'cons' },
              ['Best Place To Use', 'Luxury vanities'],
              ['Brands', 'Kohler, Roca, Jaquar']
            ]
          },
          {
            title: 'Basin Mixer Faucet', rows: [
              { label: 'Material', value: 'Single-lever faucet for basin mixing hot and cold water.' },
              ['Types', 'Single lever, Dual lever, Sensor, Deck-mount'],
              ['Sizes', 'Standard deck mount, 35mm hole'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹2,000 – ₹30,000'],
              ['Installation Method', 'Deck-mount on basin or counter through pre-drilled hole'],
              ['Maintenance', 'Clean aerator; wipe with dry cloth'],
              { label: '\u2713 Pros', value: 'Easy temperature control, sleek design', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can drip if cartridge wears out', cls: 'cons' },
              ['Best Place To Use', 'Vanity areas'],
              ['Brands', 'Jaquar, Grohe, Kohler']
            ]
          },
          {
            title: 'Tall Body Basin Mixer', rows: [
              { label: 'Material', value: 'Tall faucet designed for countertop wash basins with extra height clearance.' },
              ['Types', 'Deck mount, Wall mount, Thermostatic'],
              ['Sizes', 'Height: 250–400mm, Spout reach: 100–200mm'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹4,000 – ₹50,000'],
              ['Installation Method', 'Deck-mount on counter behind basin'],
              ['Maintenance', 'Clean spout and body; descale aerator'],
              { label: '\u2713 Pros', value: 'Perfect for vessel basins, elegant look', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, requires taller counter clearance', cls: 'cons' },
              ['Best Place To Use', 'Countertop basins'],
              ['Brands', 'Kohler, Grohe, Jaquar']
            ]
          },
          {
            title: 'Wall Mounted Faucet', rows: [
              { label: 'Material', value: 'Faucet mounted on the wall above the basin, freeing counter space.' },
              ['Types', 'Single hole, Centerset, Widespread, Gooseneck'],
              ['Sizes', 'Spout projection: 150–250mm'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹1,500 – ₹20,000'],
              ['Installation Method', 'Wall mounting with concealed plumbing connections'],
              ['Maintenance', 'Wipe clean; access valve through wall access panel'],
              { label: '\u2713 Pros', value: 'Clean countertop, modern look', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires in-wall plumbing, harder to retrofit', cls: 'cons' },
              ['Best Place To Use', 'Wash basins'],
              ['Brands', 'Cera, Jaquar, Hindware']
            ]
          },
          {
            title: 'Health Faucet', rows: [
              { label: 'Material', value: 'Handheld bidet spray attached near the WC for personal hygiene.' },
              ['Types', 'Wall-mounted, Deck-mounted, Concealed'],
              ['Sizes', 'Hose length: 1.0m – 1.5m'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹500 – ₹8,000'],
              ['Installation Method', 'Wall mounting near WC with T-connection to water line'],
              ['Maintenance', 'Replace hose if cracked; clean spray head'],
              { label: '\u2713 Pros', value: 'Hygienic, low cost, easy to install', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Basic models can leak over time', cls: 'cons' },
              ['Best Place To Use', 'WC areas'],
              ['Brands', 'Jaquar, Cera, Hindware']
            ]
          },
          {
            title: 'Wall Mounted Shower Head', rows: [
              { label: 'Material', value: 'Fixed or adjustable shower head mounted on the wall.' },
              ['Types', 'Fixed head, Adjustable angle, Swivel arm'],
              ['Sizes', '100–300mm diameter'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹500 – ₹10,000'],
              ['Installation Method', 'Wall mount with adjustable bracket on 1/2" threaded pipe'],
              ['Maintenance', 'Clean nozzles periodically to remove limescale'],
              { label: '\u2713 Pros', value: 'Affordable, easy to install, space-saving', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Fixed position cannot be moved', cls: 'cons' },
              ['Best Place To Use', 'Standard residential bathrooms'],
              ['Brands', 'Jaquar, Cera, Hindware']
            ]
          },
          {
            title: 'Overhead Rain Shower', rows: [
              { label: 'Material', value: 'Large ceiling-mounted shower head that mimics rainfall.' },
              ['Types', 'Round, Square, Rectangular, LED-lit'],
              ['Sizes', '200–600mm diameter'],
              ['Thk (mm)', '200–600 Dia'],
              ['Cost', '₹2,000 – ₹60,000'],
              ['Installation Method', 'Ceiling or overhead arm mount with concealed piping'],
              ['Maintenance', 'Clean nozzles; descale periodically'],
              { label: '\u2713 Pros', value: 'Luxurious rain effect, wide coverage', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires good water pressure, expensive', cls: 'cons' },
              ['Best Place To Use', 'Master bathrooms'],
              ['Brands', 'Jaquar, Kohler, Grohe']
            ]
          },
          {
            title: 'Ceiling Mounted Rain Shower', rows: [
              { label: 'Material', value: 'Premium rain shower fully integrated into the ceiling.' },
              ['Types', 'Flush mount, Semi-flush, LED', 'Stainless, Brass'],
              ['Sizes', '200–800mm diameter'],
              ['Thk (mm)', '200–800 Dia'],
              ['Cost', '₹5,000 – ₹1,00,000+'],
              ['Installation Method', 'Recessed ceiling mount with concealed rough-in valve'],
              ['Maintenance', 'Clean and descale; occasional cartridge replacement'],
              { label: '\u2713 Pros', value: 'Ultra-luxurious, seamless ceiling integration', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, complex installation, high water flow needed', cls: 'cons' },
              ['Best Place To Use', 'Luxury bathrooms'],
              ['Brands', 'Kohler, Grohe, TOTO']
            ]
          },
          {
            title: 'Hand Shower Set', rows: [
              { label: 'Material', value: 'Handheld shower head with flexible hose and wall bracket.' },
              ['Types', 'Standard, Multi-function, Slide bar set'],
              ['Sizes', 'Hose: 1.5m or 2.0m, Head: 80–120mm'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹1,000 – ₹15,000'],
              ['Installation Method', 'Wall bracket mounting + hose connection to shower arm'],
              ['Maintenance', 'Rinse hose; clean head nozzles'],
              { label: '\u2713 Pros', value: 'Flexible use, easy to clean, good for kids & elderly', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Hose can wear over time', cls: 'cons' },
              ['Best Place To Use', 'All bathrooms'],
              ['Brands', 'Jaquar, Cera, Grohe']
            ]
          },
          {
            title: 'Exposed Shower Mixer', rows: [
              { label: 'Material', value: 'Wall-mounted shower mixer with visible pipes and valve.' },
              ['Types', 'Two-way, Three-way, Thermostatic'],
              ['Sizes', 'Standard wall mount, 150mm centers'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹2,000 – ₹15,000'],
              ['Installation Method', 'Wall mounting on exposed hot/cold water connections'],
              ['Maintenance', 'Easy access for repairs; clean visible parts'],
              { label: '\u2713 Pros', value: 'Easy to install, repair-friendly, affordable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Pipes exposed, less clean look', cls: 'cons' },
              ['Best Place To Use', 'Budget & renovation projects'],
              ['Brands', 'Jaquar, Cera']
            ]
          },
          {
            title: 'Thermostatic Shower Mixer', rows: [
              { label: 'Material', value: 'Premium shower mixer that maintains constant water temperature.' },
              ['Types', 'Exposed, Concealed, Digital'],
              ['Sizes', 'Standard wall mount with thermostatic cartridge'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹10,000 – ₹75,000'],
              ['Installation Method', 'In-wall rough-in or surface mount with thermostatic valve'],
              ['Maintenance', 'Replace thermostatic cartridge if temperature drifts'],
              { label: '\u2713 Pros', value: 'Constant temperature, anti-scald safety, luxury feel', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, complex to install and repair', cls: 'cons' },
              ['Best Place To Use', 'Luxury bathrooms'],
              ['Brands', 'Grohe, Kohler, Hansgrohe']
            ]
          },
          {
            title: 'Shower Panel', rows: [
              { label: 'Material', value: 'All-in-one shower system with overhead shower, hand shower, and body jets.' },
              ['Types', 'Single function, Multi-function, LED, Steam-ready'],
              ['Sizes', 'Height: 1200–2000mm, Width: 200–400mm'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹8,000 – ₹1,50,000'],
              ['Installation Method', 'Wall mounting with concealed plumbing connections'],
              ['Maintenance', 'Clean panel surface; descale jets'],
              { label: '\u2713 Pros', value: 'Complete shower solution, spa experience', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, requires professional plumbing', cls: 'cons' },
              ['Best Place To Use', 'Premium bathrooms'],
              ['Brands', 'Kohler, Jaquar']
            ]
          },
          {
            title: 'Body Jets', rows: [
              { label: 'Material', value: 'Small adjustable water jets installed in shower walls for hydrotherapy.' },
              ['Types', 'Recessed, Surface mounted, Adjustable, Pulsating'],
              ['Sizes', 'Jet diameter: 25–50mm each'],
              ['Thk (mm)', 'N/A'],
              ['Cost (jet)', '₹2,000 – ₹15,000 / jet'],
              ['Installation Method', 'In-wall rough-in with directional nozzle'],
              ['Maintenance', 'Clean nozzle heads; flush system periodically'],
              { label: '\u2713 Pros', value: 'Spa-like hydrotherapy experience', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, complex installation, high water usage', cls: 'cons' },
              ['Best Place To Use', 'Spa-style showers'],
              ['Brands', 'Grohe, Kohler']
            ]
          },
          {
            title: 'Waterfall Shower', rows: [
              { label: 'Material', value: 'Shower head that creates a wide cascading water flow like a waterfall.' },
              ['Types', 'Ceiling mount, Wall mount, Custom size'],
              ['Sizes', 'Width: 300–1000mm'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹10,000 – ₹1,00,000+'],
              ['Installation Method', 'Ceiling or wall mount with high-flow water supply'],
              ['Maintenance', 'Clean water channels; descale periodically'],
              { label: '\u2713 Pros', value: 'Dramatic visual effect, luxurious feel', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires very high water pressure, expensive', cls: 'cons' },
              ['Best Place To Use', 'Luxury villas & resorts'],
              ['Brands', 'Kohler, Grohe']
            ]
          },
          {
            title: 'Steam Shower System', rows: [
              { label: 'Material', value: 'Enclosed shower system with steam generator for a spa-like steam bath experience.' },
              ['Types', 'Prefabricated enclosure, Custom tile, Steam-only'],
              ['Sizes', 'Custom: 900×900mm to 1500×2000mm'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹50,000 – ₹10,00,000+'],
              ['Installation Method', 'Steam generator + sealed enclosure with vapor-proof door'],
              ['Maintenance', 'Descale generator; clean enclosure; replace seals'],
              { label: '\u2713 Pros', value: 'Luxury spa experience, health benefits, premium home feature', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Extremely expensive, complex installation, high maintenance', cls: 'cons' },
              ['Best Place To Use', 'Wellness & luxury projects'],
              ['Brands', 'Kohler, TOTO']
            ]
          },
          {
            title: 'Digital Shower Control', rows: [
              { label: 'Material', value: 'Digital interface for controlling water temperature, flow, and presets.' },
              ['Types', 'Touchscreen, Knob, App-controlled, Voice-activated'],
              ['Sizes', 'Control panel: 80–150mm square'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹25,000 – ₹3,00,000+'],
              ['Installation Method', 'In-wall control box with digital interface plate'],
              ['Maintenance', 'Software updates; battery replacement if wireless'],
              { label: '\u2713 Pros', value: 'Precise temperature control, presets, smart home integration', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, requires power, tech support needed', cls: 'cons' },
              ['Best Place To Use', 'Smart homes'],
              ['Brands', 'Kohler, Grohe']
            ]
          },
          {
            title: 'Freestanding Bathtub', rows: [
              { label: 'Material', value: 'Standalone bathtub that is not attached to walls, creating a centerpiece.' },
              ['Types', 'Acrylic, Cast iron, Stone resin, Copper'],
              ['Sizes', 'Length: 1500–1900mm, Width: 700–900mm'],
              ['Thk (mm)', 'Acrylic 5–15'],
              ['Cost', '₹20,000 – ₹5,00,000+'],
              ['Installation Method', 'Place on floor; connect water supply and drainage'],
              ['Maintenance', 'Clean with non-abrasive cleaner; avoid harsh chemicals'],
              { label: '\u2713 Pros', value: 'Stunning focal point, flexible placement, deep soaking', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, requires large space, heavy', cls: 'cons' },
              ['Best Place To Use', 'Luxury villas, master baths'],
              ['Brands', 'Kohler, Roca, Jaquar']
            ]
          },
          {
            title: 'Built-In Bathtub', rows: [
              { label: 'Material', value: 'Bathtub built into a tiled or stone platform against the wall.' },
              ['Types', 'Drop-in, Alcove, Corner, Whirlpool'],
              ['Sizes', 'Length: 1500–1800mm, Width: 700–800mm'],
              ['Thk (mm)', 'Acrylic 5–15'],
              ['Cost', '₹15,000 – ₹2,00,000'],
              ['Installation Method', 'Drop into framed enclosure; tile or stone surround'],
              ['Maintenance', 'Clean tub surface; access plumbing through service panel'],
              { label: '\u2713 Pros', value: 'Integrated look, space-efficient, durable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Difficult to replace, permanent installation', cls: 'cons' },
              ['Best Place To Use', 'Premium residences'],
              ['Brands', 'Jaquar, Hindware']
            ]
          },
          {
            title: 'Urinal', rows: [
              { label: 'Material', value: 'Wall-mounted sanitary fixture for male use, common in commercial bathrooms.' },
              ['Types', 'Standard, Waterless, Flush valve, Manual flush'],
              ['Sizes', 'Standard: 300–400mm width'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹3,000 – ₹25,000'],
              ['Installation Method', 'Wall mounting with concealed or exposed flush mechanism'],
              ['Maintenance', 'Regular cleaning; deodorizer block replacement'],
              { label: '\u2713 Pros', value: 'Water-saving, hygienic for commercial spaces', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Not common in residential, requires dedicated plumbing', cls: 'cons' },
              ['Best Place To Use', 'Commercial projects'],
              ['Brands', 'Cera, Hindware, Jaquar']
            ]
          },
          {
            title: 'Sensor Faucet', rows: [
              { label: 'Material', value: 'Touchless faucet with infrared sensor for automatic water flow.' },
              ['Types', 'Battery-powered, AC-powered, Deck-mount, Wall-mount'],
              ['Sizes', 'Standard deck mount, 35mm hole'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹5,000 – ₹50,000'],
              ['Installation Method', 'Deck-mount on basin; connect to power and water supply'],
              ['Maintenance', 'Clean sensor lens; replace batteries if applicable'],
              { label: '\u2713 Pros', value: 'Touchless, hygienic, water-saving', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Battery lifespan limited, sensor can fail', cls: 'cons' },
              ['Best Place To Use', 'Commercial & luxury projects'],
              ['Brands', 'Grohe, Kohler, Jaquar']
            ]
          },
          {
            title: 'Flush Plate', rows: [
              { label: 'Material', value: 'Wall plate for actuating concealed cisterns.' },
              ['Types', 'Single flush, Dual flush, Pneumatic, Front actuation, Top actuation'],
              ['Sizes', 'Standard: 160×250mm approx'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹1,000 – ₹20,000'],
              ['Installation Method', 'Clip-mount on concealed cistern frame'],
              ['Maintenance', 'Clean plate surface; replace pneumatic cable if needed'],
              { label: '\u2713 Pros', value: 'Sleek finish for concealed cisterns, dual flush saves water', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires compatible concealed cistern system', cls: 'cons' },
              ['Best Place To Use', 'Concealed cistern systems'],
              ['Brands', 'Geberit, Grohe, Jaquar']
            ]
          },
          {
            title: 'Floor Drain / Nahani Trap', rows: [
              { label: 'Material', value: 'Floor drain with water seal trap to prevent sewer gases from entering.' },
              ['Types', 'Regular, Heavy-duty, Decorative, Stainless steel'],
              ['Sizes', '75–150mm drain diameter'],
              ['Thk (mm)', '75–150'],
              ['Cost', '₹300 – ₹5,000'],
              ['Installation Method', 'Floor recess with slope; connect to waste pipe'],
              ['Maintenance', 'Clean debris trap; flush with water; refill water seal'],
              { label: '\u2713 Pros', value: 'Essential for all wet areas, affordable, easy to install', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Water seal can dry out if unused, letting gases in', cls: 'cons' },
              ['Best Place To Use', 'Bathrooms, utility areas'],
              ['Brands', 'Jaquar, Hindware']
            ]
          },
          {
            title: 'Bottle Trap', rows: [
              { label: 'Material', value: 'Decorative under-sink trap with a bottle-like shape for open vanities.' },
              ['Types', 'Brass, Chrome, Stainless steel, Colored finishes'],
              ['Sizes', 'Standard: 32mm or 40mm connection'],
              ['Thk (mm)', 'N/A'],
              ['Cost', '₹500 – ₹8,000'],
              ['Installation Method', 'Connect between basin drain and wall plumbing'],
              ['Maintenance', 'Clean glass body; unscrew bottom for debris removal'],
              { label: '\u2713 Pros', value: 'Designer look, easy to clean, visible water flow check', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can clog easily, plastic ones look cheap', cls: 'cons' },
              ['Best Place To Use', 'Designer wash basins'],
              ['Brands', 'Kohler, Jaquar']
            ]
          }
        ]
      },
      lights: {
        title: 'Lights',
        tableItems: [
          'LED Downlight (Recessed Light)||₹200 – ₹2,000 / pc||Cutout 50–150||Living rooms, bedrooms, corridors, general lighting||Philips, Havells, Wipro, Crompton',
          'COB Spotlight||₹300 – ₹3,500 / pc||Cutout 60–120||Artwork, feature walls, display units||Philips, Opple, Havells',
          'Track Light||₹800 – ₹5,000 / light||Rail 20–35||Art walls, galleries, modern living rooms||Philips, Opple, Wipro',
          'LED Strip Light||₹80 – ₹500 / rft||8–15||Cove lighting, wardrobes, shelves, mirrors||Philips, Wipro, LEDure',
          'Pendant Light||₹1,000 – ₹50,000+||N/A||Dining tables, kitchen islands, bedside lighting||IKEA, Philips, The White Teak Company',
          'Chandelier||₹5,000 – ₹5,00,000+||N/A||Double-height spaces, living rooms, foyers||Saint Louis, The White Teak Company, Philips',
          'Wall Sconce||₹500 – ₹15,000||N/A||Bedrooms, passages, accent walls||Philips, Jainsons, The White Teak Company',
          'Surface Mounted Downlight||₹300 – ₹3,000||50–120 Height||Areas without false ceiling||Philips, Wipro, Havells',
          'Linear Light||₹500 – ₹5,000 / rft||25–75||Offices, modern homes, workspaces||Opple, Philips, Wipro',
          'Magnetic Track Lighting||₹3,000 – ₹15,000 / rft||35–60||Luxury residences, modern interiors||Flos, Opple, Hafele',
          'Wall Washer Light||₹500 – ₹4,000||N/A||Textured walls, artwork, feature panels||Philips, Opple',
          'Picture Light||₹1,000 – ₹10,000||N/A||Paintings, artwork displays||Philips, Hafele',
          'Mirror Light||₹500 – ₹8,000||N/A||Vanity mirrors, bathrooms, dressers||Philips, Wipro',
          'Floor Lamp||₹2,000 – ₹50,000+||N/A||Reading corners, living rooms||IKEA, The White Teak Company',
          'Table Lamp||₹1,000 – ₹25,000||N/A||Bedside tables, study desks||IKEA, Philips',
          'Step Light||₹500 – ₹5,000||40–100||Staircases, passages||Philips, Wipro'
        ],
        detailItems: [
          {
            title: 'LED Downlight (Recessed Light)', rows: [
              { label: 'Material', value: 'Recessed LED light fixture installed into ceiling cutouts for clean, low-profile illumination.' },
              ['Types', 'Fixed, Gimbal, Adjustable tilt, Anti-glare'],
              ['Sizes', 'Cutout 50–150mm diameter'],
              ['Wattage', '3W – 25W'],
              ['Cost (pc)', '₹200 – ₹2,000 / pc'],
              ['Installation Method', 'Cut ceiling hole, connect to mains, clip light into place'],
              ['Maintenance', 'Minimal; replace LED module if dimming'],
              { label: '\u2713 Pros', value: 'Sleek, energy-efficient, long life, even light distribution', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires false ceiling or access above', cls: 'cons' },
              ['Best Places to Use', 'Living rooms, bedrooms, corridors, general lighting'],
              ['Brands', 'Philips, Havells, Wipro, Crompton']
            ]
          },
          {
            title: 'COB Spotlight', rows: [
              { label: 'Material', value: 'Chip-on-board LED spotlight delivering high-intensity focused beam.' },
              ['Types', 'Fixed, Track-mount, Gimbal, Surface-mount'],
              ['Sizes', 'Cutout 60–120mm, various beam angles'],
              ['Wattage', '5W – 30W'],
              ['Cost (pc)', '₹300 – ₹3,500 / pc'],
              ['Installation Method', 'Recess or surface mount; connect to junction box'],
              ['Maintenance', 'Wipe lens; replace driver if needed'],
              { label: '\u2713 Pros', value: 'High brightness, excellent color rendering, focused beam', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can be glare-prone without proper shielding', cls: 'cons' },
              ['Best Places to Use', 'Artwork, feature walls, display units'],
              ['Brands', 'Philips, Opple, Havells']
            ]
          },
          {
            title: 'Track Light', rows: [
              { label: 'Material', value: 'Adjustable light heads mounted on a continuous track for flexible directional lighting.' },
              ['Types', 'Linear track, Flexible track, Monorail, 1-circuit, 3-circuit'],
              ['Sizes', 'Rail 20–35mm wide, 1m – 4m lengths'],
              ['Wattage', '5W – 20W per head'],
              ['Cost (light)', '₹800 – ₹5,000 / light'],
              ['Installation Method', 'Mount track on ceiling, snap in light heads, connect to power'],
              ['Maintenance', 'Clean track and heads; replace individual heads if faulty'],
              { label: '\u2713 Pros', value: 'Flexible positioning, modular, modern look', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Track can be visible, premium systems expensive', cls: 'cons' },
              ['Best Places to Use', 'Art walls, galleries, modern living rooms'],
              ['Brands', 'Philips, Opple, Wipro']
            ]
          },
          {
            title: 'LED Strip Light', rows: [
              { label: 'Material', value: 'Flexible PCB with surface-mounted LEDs for linear accent lighting.' },
              ['Types', 'Single color, RGB, RGBW, Addressable, High-density'],
              ['Sizes', '8–15mm wide, 5m reels, cuttable every 25–50mm'],
              ['Wattage', '4.8W – 24W per metre'],
              ['Cost (rft)', '₹80 – ₹500 / rft'],
              ['Installation Method', 'Adhesive mount on clean surface; connect to LED driver'],
              ['Maintenance', 'Clean gently; replace driver if flickering'],
              { label: '\u2713 Pros', value: 'Versatile, easy to install, creates ambient glow', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires diffuser for clean look, driver needed', cls: 'cons' },
              ['Best Places to Use', 'Cove lighting, wardrobes, shelves, mirrors'],
              ['Brands', 'Philips, Wipro, LEDure']
            ]
          },
          {
            title: 'Pendant Light', rows: [
              { label: 'Material', value: 'Suspended light fixture hanging from ceiling by cord, chain, or rod.' },
              ['Types', 'Single pendant, Multi-light, Mini pendant, Drum, Globe'],
              ['Sizes', 'Diameter 150–600mm, drop length adjustable'],
              ['Wattage', '5W – 60W per fixture'],
              ['Cost', '₹1,000 – ₹50,000+'],
              ['Installation Method', 'Ceiling mount with canopy; wire to ceiling junction box'],
              ['Maintenance', 'Dust shade; replace bulb/LED module'],
              { label: '\u2713 Pros', value: 'Designer statement piece, focused task lighting', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Can obstruct view, requires ceiling anchoring', cls: 'cons' },
              ['Best Places to Use', 'Dining tables, kitchen islands, bedside lighting'],
              ['Brands', 'IKEA, Philips, The White Teak Company']
            ]
          },
          {
            title: 'Chandelier', rows: [
              { label: 'Material', value: 'Decorative multi-arm ceiling light fixture, often ornate and grand.' },
              ['Types', 'Crystal, Modern, Rustic, Mini, Flush-mount'],
              ['Sizes', 'Width 300–1500mm, variable height'],
              ['Wattage', '20W – 200W total'],
              ['Cost', '₹5,000 – ₹5,00,000+'],
              ['Installation Method', 'Ceiling mount with heavy-duty bracket; support chain'],
              ['Maintenance', 'Dust crystals/arms; periodic bulb replacement'],
              { label: '\u2713 Pros', value: 'Spectacular focal point, adds grandeur and luxury', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, heavy, requires high ceiling', cls: 'cons' },
              ['Best Places to Use', 'Double-height spaces, living rooms, foyers'],
              ['Brands', 'Saint Louis, The White Teak Company, Philips']
            ]
          },
          {
            title: 'Wall Sconce', rows: [
              { label: 'Material', value: 'Wall-mounted light fixture providing accent or ambient lighting.' },
              ['Types', 'Up-light, Down-light, Swing-arm, Picture, Candle-style'],
              ['Sizes', 'Height 150–600mm, projection 100–300mm'],
              ['Wattage', '3W – 15W'],
              ['Cost', '₹500 – ₹15,000'],
              ['Installation Method', 'Wall mount with backplate; wire to wall junction box'],
              ['Maintenance', 'Dust shade; replace bulb when needed'],
              { label: '\u2713 Pros', value: 'Space-saving, decorative, layered lighting', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Hardwired installation, difficult to reposition', cls: 'cons' },
              ['Best Places to Use', 'Bedrooms, passages, accent walls'],
              ['Brands', 'Philips, Jainsons, The White Teak Company']
            ]
          },
          {
            title: 'Surface Mounted Downlight', rows: [
              { label: 'Material', value: 'LED light mounted directly on ceiling surface, ideal where no false ceiling exists.' },
              ['Types', 'Round, Square, Ultra-slim, Adjustable tilt'],
              ['Sizes', 'Height 50–120mm, diameter 150–300mm'],
              ['Wattage', '6W – 24W'],
              ['Cost', '₹300 – ₹3,000'],
              ['Installation Method', 'Surface mount on ceiling with screws; wire to junction box'],
              ['Maintenance', 'Clean diffuser; replace LED module if needed'],
              { label: '\u2713 Pros', value: 'No false ceiling needed, easy retrofit, affordable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Projects below ceiling, less sleek than recessed', cls: 'cons' },
              ['Best Places to Use', 'Areas without false ceiling'],
              ['Brands', 'Philips, Wipro, Havells']
            ]
          },
          {
            title: 'Linear Light', rows: [
              { label: 'Material', value: 'Slim rectangular LED light for clean architectural lines.' },
              ['Types', 'Surface mount, Recessed, Suspended, Continuous row'],
              ['Sizes', 'Width 25–75mm, length 300–3000mm'],
              ['Wattage', '10W – 60W'],
              ['Cost (rft)', '₹500 – ₹5,000 / rft'],
              ['Installation Method', 'Surface or recess mount; link multiple units for continuous line'],
              ['Maintenance', 'Clean diffuser; replace individual section if faulty'],
              { label: '\u2713 Pros', value: 'Clean lines, even light distribution, modern aesthetic', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Installation alignment critical, harder to retrofit', cls: 'cons' },
              ['Best Places to Use', 'Offices, modern homes, workspaces'],
              ['Brands', 'Opple, Philips, Wipro']
            ]
          },
          {
            title: 'Magnetic Track Lighting', rows: [
              { label: 'Material', value: 'Track system using magnetic attachment for easy light head positioning.' },
              ['Types', 'Recessed track, Surface track, Suspended track'],
              ['Sizes', 'Width 35–60mm, lengths 1m – 6m'],
              ['Wattage', '5W – 25W per head'],
              ['Cost (rft)', '₹3,000 – ₹15,000 / rft'],
              ['Installation Method', 'Recess or surface mount track; magnetically attach light heads'],
              ['Maintenance', 'Clean track; swap heads easily without tools'],
              { label: '\u2713 Pros', value: 'Tool-less adjustment, ultra-modern, flexible layout', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Very expensive, premium system', cls: 'cons' },
              ['Best Places to Use', 'Luxury residences, modern interiors'],
              ['Brands', 'Flos, Opple, Hafele']
            ]
          },
          {
            title: 'Wall Washer Light', rows: [
              { label: 'Material', value: 'Light designed to wash a wall with even illumination, highlighting texture.' },
              ['Types', 'Recessed, Surface, Linear, Adjustable angle'],
              ['Sizes', 'Various lengths and beam angles'],
              ['Wattage', '5W – 30W'],
              ['Cost', '₹500 – ₹4,000'],
              ['Installation Method', 'Ceiling or wall mount, angled towards wall surface'],
              ['Maintenance', 'Clean lens; adjust angle if needed'],
              { label: '\u2713 Pros', value: 'Enhances wall texture, creates dramatic effect', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires smooth wall surface for best effect', cls: 'cons' },
              ['Best Places to Use', 'Textured walls, artwork, feature panels'],
              ['Brands', 'Philips, Opple']
            ]
          },
          {
            title: 'Picture Light', rows: [
              { label: 'Material', value: 'Focused light designed to illuminate artwork or photographs.' },
              ['Types', 'Battery-powered, Hardwired, Clip-on, Adjustable arm'],
              ['Sizes', 'Arm length 200–600mm'],
              ['Wattage', '3W – 10W'],
              ['Cost', '₹1,000 – ₹10,000'],
              ['Installation Method', 'Mount above artwork; direct beam onto canvas/frame'],
              ['Maintenance', 'Clean lens; replace batteries if battery-powered'],
              { label: '\u2713 Pros', value: 'Highlights art, adjustable beam, gallery look', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Limited to single artwork, wiring can be visible', cls: 'cons' },
              ['Best Places to Use', 'Paintings, artwork displays'],
              ['Brands', 'Philips, Hafele']
            ]
          },
          {
            title: 'Mirror Light', rows: [
              { label: 'Material', value: 'Light designed for installation above or around mirrors for even facial illumination.' },
              ['Types', 'Above mirror, Side strip, Integrated, Backlit'],
              ['Sizes', 'Length 400–1200mm, width 30–80mm'],
              ['Wattage', '5W – 20W'],
              ['Cost', '₹500 – ₹8,000'],
              ['Installation Method', 'Mount above or beside mirror; wire to junction box'],
              ['Maintenance', 'Clean fixture; keep connections moisture-free'],
              { label: '\u2713 Pros', value: 'Even shadow-free lighting, essential for grooming', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires electrical planning, moisture-prone area', cls: 'cons' },
              ['Best Places to Use', 'Vanity mirrors, bathrooms, dressers'],
              ['Brands', 'Philips, Wipro']
            ]
          },
          {
            title: 'Floor Lamp', rows: [
              { label: 'Material', value: 'Freestanding tall lamp providing ambient or task lighting.' },
              ['Types', 'Torchiere, Arc, Reading, Tripod, LED'],
              ['Sizes', 'Height 1200–2000mm, base 200–400mm'],
              ['Wattage', '10W – 60W'],
              ['Cost', '₹2,000 – ₹50,000+'],
              ['Installation Method', 'Plug into wall outlet, no installation required'],
              ['Maintenance', 'Dust shade; replace bulb'],
              { label: '\u2713 Pros', value: 'Portable, no installation, versatile placement', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Takes floor space, cord can be visible', cls: 'cons' },
              ['Best Places to Use', 'Reading corners, living rooms'],
              ['Brands', 'IKEA, The White Teak Company']
            ]
          },
          {
            title: 'Table Lamp', rows: [
              { label: 'Material', value: 'Compact lamp designed to sit on tables, desks, or nightstands.' },
              ['Types', 'Desk, Bedside, Decorative, LED, USB'],
              ['Sizes', 'Height 300–700mm, base 100–200mm'],
              ['Wattage', '5W – 25W'],
              ['Cost', '₹1,000 – ₹25,000'],
              ['Installation Method', 'Place on surface; plug into outlet'],
              ['Maintenance', 'Dust shade; replace bulb'],
              { label: '\u2713 Pros', value: 'Space-saving, task-focused, portable', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Limited coverage, cord management needed', cls: 'cons' },
              ['Best Places to Use', 'Bedside tables, study desks'],
              ['Brands', 'IKEA, Philips']
            ]
          },
          {
            title: 'Step Light', rows: [
              { label: 'Material', value: 'Low-level light for illuminating stair treads for safety and ambiance.' },
              ['Types', 'Recessed, Surface mount, Strip, Round'],
              ['Sizes', 'Width 40–100mm, length 80–300mm'],
              ['Wattage', '1W – 5W per light'],
              ['Cost', '₹500 – ₹5,000'],
              ['Installation Method', 'Recess or surface mount on stair riser; wire to low-voltage driver'],
              ['Maintenance', 'Clean lens; check connections if flickering'],
              { label: '\u2713 Pros', value: 'Safety enhancement, elegant look, low energy', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires wiring, can be dim if under-powered', cls: 'cons' },
              ['Best Places to Use', 'Staircases, passages'],
              ['Brands', 'Philips, Wipro']
            ]
          }
        ]
      },
      switches: {
        title: 'Switch Boards',
        tableItems: [
          'Basic Modular Switch Board||₹150 – ₹800 / plate||6 – 8||Budget homes, utility rooms, rental projects||Anchor Roma, GM Modular, Goldmedal',
          'Premium Modular Switch Board||₹500 – ₹3,000 / plate||7 – 10||Living rooms, bedrooms, premium residences||Legrand Myrius, Schneider Livia, Havells Fabio',
          'Touch Switch Board||₹2,000 – ₹15,000 / plate||8 – 12||Smart homes, modern residences||Wipro Smart, Goldmedal i-Touch, Schneider',
          'Wi-Fi Smart Switch Board||₹3,000 – ₹25,000 / plate||8 – 12||Home automation projects||Philips Wiz, Wipro Smart, Schneider Wiser',
          'USB Charging Switch Board||₹500 – ₹5,000 / plate||6 – 10||Bedside tables, study areas, offices||Legrand, Schneider, GM',
          'Pop-Up Socket Box||₹2,000 – ₹15,000||60 – 100 Depth||Workstations, conference tables, kitchen islands||Hafele, Ozone, Legrand',
          'Floor Socket Box||₹1,500 – ₹12,000||50 – 80 Depth||Living rooms, offices, conference rooms||Legrand, Schneider, Hager',
          'Weatherproof Switch Board (IP Rated)||₹500 – ₹5,000||8 – 15||Balconies, terraces, outdoor spaces||Schneider, Legrand, Hager',
          'Dimmer Switch Board||₹500 – ₹8,000||Standard Modular||Living rooms, bedrooms, mood lighting||Legrand, Schneider, Havells',
          'Motion Sensor Switch Board||₹1,000 – ₹8,000||Standard Modular||Bathrooms, passages, utility areas||Legrand, Schneider, Philips'
        ],
        detailItems: [
          {
            title: 'Basic Modular Switch Board', rows: [
              { label: 'Material', value: 'Entry-level modular switches with standard functionality and finish.' },
              ['Types', 'Piano, Rocker, Toggle'],
              ['Sizes', 'Standard modular plate: 6–8mm thickness'],
              ['Rating', '6A – 16A'],
              ['Cost (plate)', '₹150 – ₹800 / plate'],
              ['Installation Method', 'Mount on wall box; wire to electrical circuit'],
              ['Maintenance', 'Wipe with dry cloth; tighten screws if loose'],
              { label: '\u2713 Pros', value: 'Affordable, widely available, easy installation', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Basic look, limited design options', cls: 'cons' },
              ['Best Places to Use', 'Budget homes, utility rooms, rental projects'],
              ['Brands', 'Anchor Roma, GM Modular, Goldmedal']
            ]
          },
          {
            title: 'Premium Modular Switch Board', rows: [
              { label: 'Material', value: 'Mid-range modular switches with better finish, feel, and durability.' },
              ['Types', 'Rocker, Slimline, Wide plate'],
              ['Sizes', 'Standard modular: 7–10mm thickness'],
              ['Rating', '6A – 16A'],
              ['Cost (plate)', '₹500 – ₹3,000 / plate'],
              ['Installation Method', 'Mount on wall box; screw or clip-on cover'],
              ['Maintenance', 'Wipe clean; replace individual modules if needed'],
              { label: '\u2713 Pros', value: 'Better aesthetics, smooth operation, modular design', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Costlier than basic, plate may yellow over time', cls: 'cons' },
              ['Best Places to Use', 'Living rooms, bedrooms, premium residences'],
              ['Brands', 'Legrand Myrius, Schneider Livia, Havells Fabio']
            ]
          },
          {
            title: 'Touch Switch Board', rows: [
              { label: 'Material', value: 'Touch-sensitive switch panel with capacitive touch technology.' },
              ['Types', 'Single touch, Multi-touch, Glass touch'],
              ['Sizes', 'Standard modular plate: 8–12mm'],
              ['Rating', '6A – 10A'],
              ['Cost (plate)', '₹2,000 – ₹15,000 / plate'],
              ['Installation Method', 'Mount on wall box; connect neutral wire required'],
              ['Maintenance', 'Clean touch surface; reset if unresponsive'],
              { label: '\u2713 Pros', value: 'Modern look, easy to clean, smooth surface', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires neutral wire, costlier than mechanical', cls: 'cons' },
              ['Best Places to Use', 'Smart homes, modern residences'],
              ['Brands', 'Wipro Smart, Goldmedal i-Touch, Schneider']
            ]
          },
          {
            title: 'Wi-Fi Smart Switch Board', rows: [
              { label: 'Material', value: 'Smart switch board with Wi-Fi connectivity for remote control via app.' },
              ['Types', 'Single channel, Multi-channel, Dimmer, Curtain'],
              ['Sizes', 'Standard modular plate: 8–12mm'],
              ['Rating', '6A – 10A'],
              ['Cost (plate)', '₹3,000 – ₹25,000 / plate'],
              ['Installation Method', 'Mount on wall box; connect to Wi-Fi via app'],
              ['Maintenance', 'Reset router if offline; firmware updates via app'],
              { label: '\u2713 Pros', value: 'Remote control, voice control, scheduling, energy monitoring', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires stable Wi-Fi, neutral wire needed', cls: 'cons' },
              ['Best Places to Use', 'Home automation projects'],
              ['Brands', 'Philips Wiz, Wipro Smart, Schneider Wiser']
            ]
          },
          {
            title: 'USB Charging Switch Board', rows: [
              { label: 'Material', value: 'Switch plate with integrated USB charging ports for devices.' },
              ['Types', 'USB-A, USB-C, Quick Charge, Combo'],
              ['Sizes', 'Standard modular plate: 6–10mm'],
              ['Rating', '2.1A – 3.1A USB output'],
              ['Cost (plate)', '₹500 – ₹5,000 / plate'],
              ['Installation Method', 'Mount on wall box; connect to mains power'],
              ['Maintenance', 'Clean ports; check charging performance'],
              { label: '\u2713 Pros', value: 'No adapter needed, convenient bedside charging', cls: 'pros' },
              { label: '\u2715 Cons', value: 'USB ports may become outdated (USB-C upgrade)', cls: 'cons' },
              ['Best Places to Use', 'Bedside tables, study areas, offices'],
              ['Brands', 'Legrand, Schneider, GM']
            ]
          },
          {
            title: 'Pop-Up Socket Box', rows: [
              { label: 'Material', value: 'Concealed power socket that pops up from countertop or table surface.' },
              ['Types', 'Round, Rectangular, Single module, Multi-module'],
              ['Sizes', 'Depth: 60–100mm below surface'],
              ['Rating', '6A – 16A'],
              ['Cost', '₹2,000 – ₹15,000'],
              ['Installation Method', 'Cut hole in countertop; mount body underneath; wire to mains'],
              ['Maintenance', 'Clean top surface; ensure mechanism opens/closes smoothly'],
              { label: '\u2713 Pros', value: 'Concealed when not in use, neat countertop', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires under-counter depth, expensive', cls: 'cons' },
              ['Best Places to Use', 'Workstations, conference tables, kitchen islands'],
              ['Brands', 'Hafele, Ozone, Legrand']
            ]
          },
          {
            title: 'Floor Socket Box', rows: [
              { label: 'Material', value: 'Recessed floor box with flip-lid access for power/data connections.' },
              ['Types', 'Single gang, Double gang, Data + power combo'],
              ['Sizes', 'Depth: 50–80mm'],
              ['Rating', '6A – 16A'],
              ['Cost', '₹1,500 – ₹12,000'],
              ['Installation Method', 'Cut floor opening; embed box in screed/subfloor; wire to mains'],
              ['Maintenance', 'Clean lid opening; keep mechanism free of debris'],
              { label: '\u2713 Pros', value: 'Invisible when not in use, floor-level convenience', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires floor cut-out, can collect dust', cls: 'cons' },
              ['Best Places to Use', 'Living rooms, offices, conference rooms'],
              ['Brands', 'Legrand, Schneider, Hager']
            ]
          },
          {
            title: 'Weatherproof Switch Board (IP Rated)', rows: [
              { label: 'Material', value: 'Water and dust resistant switch board rated for outdoor use.' },
              ['Types', 'IP54, IP65, IP66 with gaskets and covers'],
              ['Sizes', '8–15mm plate thickness'],
              ['Rating', '6A – 16A, IP54–IP66'],
              ['Cost', '₹500 – ₹5,000'],
              ['Installation Method', 'Mount on outdoor wall with weatherproof conduit'],
              ['Maintenance', 'Check gasket integrity; clean exterior'],
              { label: '\u2713 Pros', value: 'Weather-resistant, safe for outdoor use', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Bulky, limited design options', cls: 'cons' },
              ['Best Places to Use', 'Balconies, terraces, outdoor spaces'],
              ['Brands', 'Schneider, Legrand, Hager']
            ]
          },
          {
            title: 'Dimmer Switch Board', rows: [
              { label: 'Material', value: 'Switch with integrated dimmer control for adjustable light brightness.' },
              ['Types', 'Rotary, Slide, Touch, Smart Wi-Fi dimmer'],
              ['Sizes', 'Standard modular plate'],
              ['Rating', '60W – 400W load capacity'],
              ['Cost', '₹500 – ₹8,000'],
              ['Installation Method', 'Mount on wall box; compatible dimmable bulbs required'],
              ['Maintenance', 'Clean surface; replace dimmer module if flickering'],
              { label: '\u2713 Pros', value: 'Adjustable brightness, energy saving, mood setting', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Requires dimmable bulbs, may generate hum', cls: 'cons' },
              ['Best Places to Use', 'Living rooms, bedrooms, mood lighting'],
              ['Brands', 'Legrand, Schneider, Havells']
            ]
          },
          {
            title: 'Motion Sensor Switch Board', rows: [
              { label: 'Material', value: 'Switch with built-in motion sensor for automatic light activation.' },
              ['Types', 'PIR sensor, Microwave sensor, Hybrid'],
              ['Sizes', 'Standard modular plate'],
              ['Rating', '6A – 10A'],
              ['Cost', '₹1,000 – ₹8,000'],
              ['Installation Method', 'Mount on wall box; set sensitivity and time delay'],
              ['Maintenance', 'Clean sensor lens; adjust settings seasonally'],
              { label: '\u2713 Pros', value: 'Automatic on/off, energy saving, convenient', cls: 'pros' },
              { label: '\u2715 Cons', value: 'False triggering, limited coverage area', cls: 'cons' },
              ['Best Places to Use', 'Bathrooms, passages, utility areas'],
              ['Brands', 'Legrand, Schneider, Philips']
            ]
          }
        ]
      },
      automation: {
        title: 'Automation',
        tableItems: [
          'Smart Lighting Automation||₹50 – ₹300 / sq.ft.||N/A||Entire home, living rooms, bedrooms||KNX, Control4, Lutron, Legrand',
          'Smart Switch Automation||₹2,000 – ₹15,000 / switch||Standard Modular||Living rooms, bedrooms||Schneider Wiser, Legrand, Wipro',
          'Curtain & Blind Automation||₹10,000 – ₹75,000 / window||N/A||Living rooms, bedrooms, double-height spaces||Somfy, Dooya, Forest',
          'Smart Home Hub / Controller||₹20,000 – ₹3,00,000+||N/A||Central automation system||Control4, KNX, Crestron',
          'Voice Control Integration||₹5,000 – ₹50,000||N/A||Entire home||Alexa, Google Home, Control4',
          'Motion Sensor Automation||₹1,500 – ₹15,000 / point||N/A||Bathrooms, passages, staircases||Schneider, Legrand, Philips',
          'Smart HVAC / AC Automation||₹10,000 – ₹1,00,000+||N/A||Bedrooms, living rooms||Daikin, Mitsubishi, KNX',
          'Smart Thermostat||₹5,000 – ₹50,000||N/A||Climate-controlled homes||Ecobee, Honeywell, Schneider',
          'Smart Door Lock System||₹8,000 – ₹75,000||Door 35–100||Main entrance doors||Yale, Godrej, Hafele'
        ],
        detailItems: [
          {
            title: 'Smart Lighting Automation', rows: [
              { label: 'Material', value: 'Automated lighting control system with dimming, scenes, and scheduling.' },
              ['Types', 'Wired (KNX/DALI), Wireless (Zigbee/Z-Wave), Hybrid'],
              ['Sizes', 'Per point: switch, dimmer, or sensor module'],
              ['Cost', '₹50 – ₹300 / sq.ft.'],
              ['Installation Method', 'Wired: run control cables during construction. Wireless: retrofit with smart bulbs/ modules'],
              ['Maintenance', 'Update firmware; replace battery in wireless sensors'],
              { label: '\u2713 Pros', value: 'Energy saving, mood scenes, remote control, increased property value', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Higher upfront cost, complex for retrofit, requires planning', cls: 'cons' },
              ['Best Places to Use', 'Entire home, living rooms, bedrooms'],
              ['Brands', 'KNX, Control4, Lutron, Legrand']
            ]
          },
          {
            title: 'Smart Switch Automation', rows: [
              { label: 'Material', value: 'Smart switches replacing traditional switches, controllable via app or voice.' },
              ['Types', 'Wi-Fi, Zigbee, Z-Wave, Bluetooth mesh'],
              ['Sizes', 'Standard modular plate'],
              ['Cost (switch)', '₹2,000 – ₹15,000 / switch'],
              ['Installation Method', 'Replace existing switch; neutral wire may be required'],
              ['Maintenance', 'Reset if offline; update firmware via app'],
              { label: '\u2713 Pros', value: 'Easy retrofit, remote control, scheduling, scene integration', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Neutral wire needed, Wi-Fi dependent', cls: 'cons' },
              ['Best Places to Use', 'Living rooms, bedrooms'],
              ['Brands', 'Schneider Wiser, Legrand, Wipro']
            ]
          },
          {
            title: 'Curtain & Blind Automation', rows: [
              { label: 'Material', value: 'Motorized curtain track or blind system with remote or app control.' },
              ['Types', 'Curtain track, Roller blind, Roman blind, Venetian blind'],
              ['Sizes', 'Per window: 1–12m track length'],
              ['Cost (window)', '₹10,000 – ₹75,000 / window'],
              ['Installation Method', 'Mount motorized track/roller; connect to power and control system'],
              ['Maintenance', 'Clean track; lubricate moving parts; replace motor battery (if battery-powered)'],
              { label: '\u2713 Pros', value: 'Convenience, scheduled operation, clean look', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, motor noise, power supply needed', cls: 'cons' },
              ['Best Places to Use', 'Living rooms, bedrooms, double-height spaces'],
              ['Brands', 'Somfy, Dooya, Forest']
            ]
          },
          {
            title: 'Smart Home Hub / Controller', rows: [
              { label: 'Material', value: 'Central brain of the smart home system controlling all connected devices.' },
              ['Types', 'Wired controller (KNX IP), Wireless hub (Hubitat, SmartThings), Pro (Control4)'],
              ['Sizes', 'Desktop or rack-mount unit'],
              ['Cost', '₹20,000 – ₹3,00,000+'],
              ['Installation Method', 'Connect to network; pair with all devices; configure via software'],
              ['Maintenance', 'Software updates; backup configuration; UPS recommended'],
              { label: '\u2713 Pros', value: 'Unified control, automation logic, remote access', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, single point of failure, complex setup', cls: 'cons' },
              ['Best Places to Use', 'Central automation system'],
              ['Brands', 'Control4, KNX, Crestron']
            ]
          },
          {
            title: 'Voice Control Integration', rows: [
              { label: 'Material', value: 'Integration of voice assistants to control smart home devices.' },
              ['Types', 'Amazon Alexa, Google Home, Apple HomeKit, Control4 voice'],
              ['Sizes', 'Smart speaker or in-wall display'],
              ['Cost', '₹5,000 – ₹50,000'],
              ['Installation Method', 'Connect smart speaker to Wi-Fi; pair with smart devices'],
              ['Maintenance', 'Update software; check voice recognition accuracy'],
              { label: '\u2713 Pros', value: 'Hands-free control, convenient, accessible', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Privacy concerns, requires internet, accent limitations', cls: 'cons' },
              ['Best Places to Use', 'Entire home'],
              ['Brands', 'Alexa, Google Home, Control4']
            ]
          },
          {
            title: 'Motion Sensor Automation', rows: [
              { label: 'Material', value: 'Sensor that detects motion to trigger lights, alarms, or other actions.' },
              ['Types', 'PIR, Microwave, Dual-tech, Ceiling/wall mount'],
              ['Sizes', 'Per point: 40–120mm diameter'],
              ['Cost (point)', '₹1,500 – ₹15,000 / point'],
              ['Installation Method', 'Mount on wall/ceiling; wire to control system or smart hub'],
              ['Maintenance', 'Clean sensor lens; adjust sensitivity'],
              { label: '\u2713 Pros', value: 'Automatic control, energy saving, security benefit', cls: 'pros' },
              { label: '\u2715 Cons', value: 'False triggers, limited range, pets can activate', cls: 'cons' },
              ['Best Places to Use', 'Bathrooms, passages, staircases'],
              ['Brands', 'Schneider, Legrand, Philips']
            ]
          },
          {
            title: 'Smart HVAC / AC Automation', rows: [
              { label: 'Material', value: 'Automated control of heating, ventilation, and air conditioning systems.' },
              ['Types', 'Zoned control, VRF integration, Smart AC controller'],
              ['Sizes', 'Per zone: controller + temperature sensor'],
              ['Cost', '₹10,000 – ₹1,00,000+'],
              ['Installation Method', 'Connect to HVAC system; install sensors in each zone'],
              ['Maintenance', 'Clean filters; check sensor accuracy; update firmware'],
              { label: '\u2713 Pros', value: 'Energy efficient, zone control, remote scheduling', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Expensive, requires professional installation', cls: 'cons' },
              ['Best Places to Use', 'Bedrooms, living rooms'],
              ['Brands', 'Daikin, Mitsubishi, KNX']
            ]
          },
          {
            title: 'Smart Thermostat', rows: [
              { label: 'Material', value: 'Programmable thermostat with learning capability and remote access.' },
              ['Types', 'Learning, Programmable, Zoned, Line voltage, Low voltage'],
              ['Sizes', 'Standard wall plate, 80–120mm'],
              ['Cost', '₹5,000 – ₹50,000'],
              ['Installation Method', 'Replace existing thermostat; connect to HVAC system and Wi-Fi'],
              ['Maintenance', 'Clean screen; update schedule seasonally'],
              { label: '\u2713 Pros', value: 'Auto scheduling, energy reports, remote control', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Compatibility issues with older HVAC systems', cls: 'cons' },
              ['Best Places to Use', 'Climate-controlled homes'],
              ['Brands', 'Ecobee, Honeywell, Schneider']
            ]
          },
          {
            title: 'Smart Door Lock System', rows: [
              { label: 'Material', value: 'Electronic door lock with keyless entry via code, fingerprint, or smartphone.' },
              ['Types', 'Biometric, Keypad, Bluetooth, Wi-Fi enabled'],
              ['Sizes', 'Fits standard door: 35–100mm thickness'],
              ['Cost', '₹8,000 – ₹75,000'],
              ['Installation Method', 'Replace existing deadbolt; install strike plate and connect to power'],
              ['Maintenance', 'Replace batteries; clean fingerprint sensor; update firmware'],
              { label: '\u2713 Pros', value: 'Keyless entry, temporary codes, remote access, monitoring', cls: 'pros' },
              { label: '\u2715 Cons', value: 'Battery-dependent, vulnerable to hacking if unencrypted', cls: 'cons' },
              ['Best Places to Use', 'Main entrance doors'],
              ['Brands', 'Yale, Godrej, Hafele']
            ]
          },
        ]
      },
    'kitchen-counter': {
      title: 'Kitchen Counter Top Finishes',
        tableItems: [
          'Engineered Quartz||₹400–₹1200||15–20||Modern kitchens||Caesarstone, Kalinga Stone',
          'Granite||₹150–₹600||18–20||Indian kitchens||RK Marble',
          'Natural Quartzite||₹500–₹2000||18–20||High-end luxury kitchens||Balaji Stone Export',
          '15 MM Tiles||₹80–₹250||15||Budget kitchens, utility areas||Italica Tiles',
          'Corian||₹800–₹2500||6–12||Luxury kitchens||Evo Surfaces',
          'Natural Marble||₹300–₹1500||18–20||Low-usage luxury kitchens||Classic Marble Company',
          'Terrazzo Slabs||₹300–₹900||15–20||Designer kitchens||Kalinga Stone',
          'Concrete Microtopping||₹200–₹600||10–40||Industrial kitchens||Colortale',
          'Porcelain Stone||₹600–₹2000||6–12||High-end modern kitchens||AGL',
          'Stainless Steel||₹800–₹2500||1.2||Commercial kitchens||Jindal Stainless'
        ],
          detailItems: [
            'Engineered Quartz||₹400–₹1200||15–20||Factory-cut slabs installed over base; joints sealed.||Very low, easy cleaning.||Non-porous, stain-resistant, uniform finish.||Not fully heat-proof; expensive.||Modern kitchens||Caesarstone, Kalinga Stone',
            'Granite||₹150–₹600||18–20||Slab installed and edge polished.||Very low, occasional sealing.||Highly durable, heat-resistant, affordable.||Limited patterns vs quartz.||Indian kitchens||RK Marble',
            'Natural Quartzite||₹500–₹2000||18–20||Slab installed and edge polished.||Moderate; sealing required.||Stronger than marble; natural luxury look.||Expensive; limited availability.||High-end luxury kitchens||Balaji Stone Export',
            '15 MM Tiles||₹80–₹250||15||Tiles fixed over base with grout joints.||Grout cleaning required.||Budget-friendly, easy replacement.||Joints visible; less premium.||Budget kitchens, utility areas||Italica Tiles',
            'Corian||₹800–₹2500||6–12||Seamless joining; can integrate sink.||Easy; scratches repairable.||Seamless, hygienic, premium finish.||Heat-sensitive; expensive.||Luxury kitchens||Evo Surfaces',
            'Natural Marble||₹300–₹1500||18–20||Slabs installed and polished.||Needs sealing; prone to stains.||Premium, elegant, natural beauty.||Porous; stains easily; high maintenance.||Low-usage luxury kitchens||Classic Marble Company',
            'Terrazzo Slabs||₹300–₹900||15–20||Precast slabs installed and polished.||Easy; durable surface.||Unique patterns, trendy look.||Slightly porous; niche aesthetic.||Designer kitchens||Kalinga Stone',
            'Concrete Microtopping||₹200–₹600||10–40||Cast-in-place or coated over base.||Sealing required.||Seamless, modern, industrial look.||Can crack; requires expertise.||Industrial kitchens||Colortale',
            'Porcelain Stone||₹600–₹2000||6–12||Installed over support base.||Very low maintenance.||Heat-proof, scratch-resistant, ultra-modern.||Expensive; needs skilled installation.||High-end modern kitchens||AGL',
            'Stainless Steel||₹800–₹2500||1.2||Fabricated and fixed.||Easy; hygienic cleaning.||Waterproof, hygienic, heat-resistant.||Scratches visible; industrial look.||Commercial kitchens||Jindal Stainless'
          ]
    },
    'italian-marbles': {
      title: 'Italian Marbles',
        tableItems: [
          'Carrara Marble||₹500 – ₹1,500||16–18||Flooring, wall panels, bathrooms, countertops||Classic Marble Company, Elegant Marble',
          'Calacatta Marble||₹2,000 – ₹6,000||18–20||Luxury flooring, statement walls, countertops||Classic Marble Company, Elegant Marble',
          'Statuario Marble||₹1,500 – ₹5,000||16–20||Luxury flooring, wall cladding, bathrooms, tabletops||Classic Marble Company, Elegant Marble',
          'Crema Marfil||₹600 – ₹1,500||18–20||Flooring, staircases, wall panels||Classic Marble Company, Elegant Marble',
          'Onyx Marble||₹2,000 – ₹7,000||16–20||Feature walls, bar counters, luxury interiors||Classic Marble Company, Elegant Marble',
          'Armani Brown Marble||₹700 – ₹2,000||16–20||Luxury flooring, wall cladding, bathroom walls, feature walls, countertops||Classic Marble Company, Elegant Marble',
          'White Portoro Marble||₹2,500 – ₹8,000||18–20||Feature walls, luxury bathrooms, decorative panels, tabletops||Classic Marble Company, Elegant Marble',
          'Michelangelo Marble||₹900 – ₹2,500||18–20||Luxury flooring, wall cladding, bathrooms, countertops, decorative wall panels||Classic Marble Company, Elegant Marble',
          'Bianco Lasa Marble||₹1,500 – ₹4,000||16–20||Premium flooring, wall cladding, bathrooms, luxury feature walls||Classic Marble Company, Elegant Marble',
          'Travertine Marble||₹250 – ₹800||16–20||Living room flooring, bathroom walls, outdoor flooring, staircases||Classic Marble Company, Elegant Marble'
        ],
          detailItems: [
            {
              title: 'Carrara Marble',
              rows: [
                { label: 'Material', value: 'Light grey or white background with soft grey veining' },
                { label: 'Types', value: 'Bianco Carrara, Carrara Venato' },
                { label: 'Sizes', value: 'Slabs 8\u201310 ft length, 4\u20136 ft width' },
                { label: 'Thk (mm)', value: '16\u201318\u201320' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b9500 \u2013 \u20b91500' },
                { label: 'Installation Method', value: 'Cement bedding or stone adhesive' },
                { label: 'Maintenance', value: 'Sealing recommended' },
                { label: '\u2713 Pros', value: 'Elegant look, relatively affordable for Italian marble', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Can stain easily', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Flooring, wall panels, bathrooms, countertops' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Calacatta Marble',
              rows: [
                { label: 'Material', value: 'Luxurious Italian marble with a white base and dramatic thick gold or grey veining.' },
                { label: 'Types', value: 'Calacatta Gold, Calacatta Borghini, Calacatta Oro' },
                { label: 'Sizes', value: '8\u201310 ft length' },
                { label: 'Thk (mm)', value: '18mm \u2013 20mm' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b92000 \u2013 \u20b95000' },
                { label: 'Installation Method', value: 'Installed using marble adhesive' },
                { label: 'Maintenance', value: 'Requires sealing' },
                { label: '\u2713 Pros', value: 'Highly luxurious aesthetic, bold dramatic veining', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Very expensive, porous', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Luxury flooring, statement walls, countertops' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Statuario Marble',
              rows: [
                { label: 'Material', value: 'Bright white background with bold grey veins.' },
                { label: 'Types', value: 'Statuario Classic, Statuario Extra, Statuario Venato' },
                { label: 'Sizes', value: '8\u201310 ft length' },
                { label: 'Thk (mm)', value: '16\u201318\u201320' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b91500 \u2013 \u20b95000' },
                { label: 'Installation Method', value: 'Installed using cement mortar or stone adhesive' },
                { label: 'Maintenance', value: 'Requires sealing' },
                { label: '\u2713 Pros', value: 'Premium appearance, elegant veining', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Expensive, porous', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Luxury flooring, wall cladding, bathrooms, tabletops' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Crema Marfil',
              rows: [
                { label: 'Material', value: 'Beige marble from Spain with subtle veining.' },
                { label: 'Types', value: 'Crema Marfil Classic, Crema Marfil Select, Crema Marfil Coto' },
                { label: 'Sizes', value: '7\u20139 ft' },
                { label: 'Thk (mm)', value: '18\u201320' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b9600 \u2013 \u20b91500' },
                { label: 'Installation Method', value: 'Cement mortar bedding' },
                { label: 'Maintenance', value: 'Requires sealing' },
                { label: '\u2713 Pros', value: 'Warm neutral tone suitable for many interiors, Very versatile', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Porous stone', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Flooring, staircases, wall panels' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Onyx Marble',
              rows: [
                { label: 'Material', value: 'Translucent natural stone with dramatic patterns and vibrant colors.' },
                { label: 'Types', value: 'Honey Onyx, Green Onyx, White Onyx, Pink Onyx' },
                { label: 'Sizes', value: '6\u20139 ft' },
                { label: 'Thk (mm)', value: '16\u201320' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b92000 \u2013 \u20b97000' },
                { label: 'Installation Method', value: 'Special stone adhesive with back support' },
                { label: 'Maintenance', value: 'Careful cleaning and sealing' },
                { label: '\u2713 Pros', value: 'Translucent, unique patterns', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Fragile and expensive', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Feature walls, bar counters, luxury interiors' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Armani Brown Marble',
              rows: [
                { label: 'Material', value: 'Dark brown marble with fine linear veins and elegant texture.' },
                { label: 'Types', value: 'Armani Brown Classic, Armani Grey, Armani Bronze' },
                { label: 'Sizes', value: '8\u201310 ft length' },
                { label: 'Thk (mm)', value: '16\u201320' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b9700 \u2013 \u20b92000' },
                { label: 'Installation Method', value: 'Installed with cement mortar or stone adhesive with proper leveling' },
                { label: 'Maintenance', value: 'Periodic polishing and sealing recommended' },
                { label: '\u2713 Pros', value: 'Rich elegant colour, luxurious appearance, suitable for modern interiors', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Requires sealing, darker colour may show dust', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Luxury flooring, wall cladding, bathrooms, feature walls' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'White Portoro Marble',
              rows: [
                { label: 'Material', value: 'Characterized by a deep black base with dramatic gold and white veins.' },
                { label: 'Types', value: 'Portoro Gold, Portoro Black' },
                { label: 'Sizes', value: '6\u20138 ft' },
                { label: 'Thk (mm)', value: '18\u201320' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b92500 \u2013 \u20b98000' },
                { label: 'Installation Method', value: 'Installed using stone adhesive with skilled stone installation' },
                { label: 'Maintenance', value: 'Regular sealing and careful cleaning recommended' },
                { label: '\u2713 Pros', value: 'Highly luxurious appearance, unique veining pattern', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Very expensive, limited availability', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Feature walls, luxury bathrooms, decorative panels' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Michelangelo Marble',
              rows: [
                { label: 'Material', value: 'Soft white background with elegant grey and beige veining' },
                { label: 'Types', value: 'Michelangelo White, Michelangelo Grey' },
                { label: 'Sizes', value: '8\u201310 ft length' },
                { label: 'Thk (mm)', value: '18\u201320' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b9900 \u2013 \u20b92500' },
                { label: 'Installation Method', value: 'Installed using cement mortar bedding or stone adhesive by skilled marble installers' },
                { label: 'Maintenance', value: 'Periodic sealing and polishing recommended' },
                { label: '\u2713 Pros', value: 'Elegant veining, premium aesthetic, versatile for modern and classic interiors', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Porous material, requires sealing', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Luxury flooring, wall cladding, bathrooms, countertops, decorative wall panels' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Bianco Lasa Marble',
              rows: [
                { label: 'Material', value: 'Bright white appearance, with fine grey veining' },
                { label: 'Types', value: 'Bianco Lasa Classic, Bianco Lasa Venato' },
                { label: 'Sizes', value: '7\u20139 ft' },
                { label: 'Thk (mm)', value: '16\u201320' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b91500 \u2013 \u20b94000' },
                { label: 'Installation Method', value: 'Installed with cement mortar or marble adhesive with professional stone fixing' },
                { label: 'Maintenance', value: 'Sealing and periodic polishing required to maintain shine' },
                { label: '\u2713 Pros', value: 'Bright white appearance, elegant and timeless design', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Expensive and requires regular maintenance', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Premium flooring, wall cladding, bathrooms, luxury feature walls' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Travertine Marble',
              rows: [
                { label: 'Material', value: 'Natural limestone in warm earthy tones with naturally occurring holes and linear patterns.' },
                { label: 'Types', value: 'Classic Travertine, Silver Travertine, Walnut Travertine, Ivory Travertine' },
                { label: 'Sizes', value: '7\u201310 ft length' },
                { label: 'Thk (mm)', value: '15 \u2013 20 mm (flooring), 12 \u2013 16 mm (wall cladding)' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b9250 \u2013 \u20b9800' },
                { label: 'Installation Method', value: 'Installed using cement mortar or stone adhesive on a prepared base' },
                { label: 'Maintenance', value: 'Seal the stone. Clean with mild pH-neutral stone cleaner. Avoid acidic cleaners.' },
                { label: '\u2713 Pros', value: 'Elegant natural texture, unique patterns, Cool Temperature, Durable', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Porous material, Natural holes may require filling, Can stain, Softer', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Living room flooring, Bathroom walls, Outdoor flooring and patios, Staircases' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            }
          ]
    },
    'indian-marbles': {
      title: 'Indian Marbles',
        tableItems: [
          'Makrana Marble||₹200 – ₹700||16–20||Flooring, temples, wall cladding||Classic Marble Company, Elegant Marble',
          'Banswara Marble||₹120 – ₹400||16–20||Living room flooring, Staircases, Feature walls||Classic Marble Company, Elegant Marble',
          'Katni Marble||₹90 – ₹250||12–16||Living rooms, Bedrooms, Commercial flooring||Classic Marble Company, Elegant Marble',
          'Ambaji Marble||₹100 – ₹350||12–18||Flooring, staircases, wall panels||RK Marble',
          'Morwad Marble||₹90 – ₹250||12–18||Bedrooms, Living room flooring, Staircases||Rajasthan marble suppliers'
        ],
          detailItems: [
            {
              title: 'Makrana Marble',
              rows: [
                { label: 'Material', value: 'Pure white colour' },
                { label: 'Types', value: 'Makrana White, Makrana Albeta' },
                { label: 'Sizes', value: '8\u201310 ft length slabs, Cut tiles: 1\u00d71 ft, 2\u00d72 ft, 2\u00d74 ft' },
                { label: 'Thk (mm)', value: '16\u201318 flooring, 18\u201320 staircases, 12\u201315 wall cladding' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b9200 \u2013 \u20b9700' },
                { label: 'Installation Method', value: 'Cement mortar bedding' },
                { label: 'Maintenance', value: 'Periodic polishing' },
                { label: '\u2713 Pros', value: 'Durable and long-lasting', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Limited vein patterns', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Flooring, temples, wall cladding' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Banswara Marble',
              rows: [
                { label: 'Material', value: 'White marble with distinctive purple or grey veins' },
                { label: 'Types', value: 'Banswara White, Banswara Purple, Banswara Gold' },
                { label: 'Sizes', value: '5\u20139 ft length slabs, Cut tiles 2\u00d72 ft, 2\u00d74 ft' },
                { label: 'Thk (mm)', value: '16\u201318 flooring, 18\u201320 heavy-use areas, 12\u201315 wall cladding' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b9120 \u2013 \u20b9400' },
                { label: 'Installation Method', value: 'Cement mortar bed installation, Polishing after laying' },
                { label: 'Maintenance', value: 'Periodic sealing recommended, Avoid acidic cleaners' },
                { label: '\u2713 Pros', value: 'Attractive natural veining, Good durability, Suitable for large flooring areas', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Requires sealing, Slight colour variation between slabs', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Living room flooring, Staircases, Feature walls' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Katni Marble',
              rows: [
                { label: 'Material', value: 'Beige and cream tones with subtle veining' },
                { label: 'Types', value: 'Katni Beige, Katni Brown, Katni Pink' },
                { label: 'Sizes', value: '4\u20138 ft length slabs, Tiles 1\u00d71 ft, 2\u00d72 ft' },
                { label: 'Thk (mm)', value: '16\u201318 flooring, 12\u201315 wall cladding' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b990 \u2013 \u20b9250' },
                { label: 'Installation Method', value: 'Installed with cement mortar, Mirror polishing done after installation' },
                { label: 'Maintenance', value: 'Seal periodically, Regular cleaning with mild detergent' },
                { label: '\u2713 Pros', value: 'Affordable, Neutral colours, Widely available', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Slightly porous, Less luxurious than Italian marbles', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Living rooms, Bedrooms, Commercial flooring' },
                { label: 'Brands', value: 'Classic Marble Company, Elegant Marble' }
              ]
            },
            {
              title: 'Ambaji Marble',
              rows: [
                { label: 'Material', value: 'Milky white marble with uniform appearance and smooth texture' },
                { label: 'Types', value: 'Ambaji White, Ambaji Grey' },
                { label: 'Sizes', value: 'Slabs 5\u20138 ft length, Tiles 2\u00d72 ft, 2\u00d74 ft' },
                { label: 'Thk (mm)', value: '16\u201318 flooring, 12\u201315 cladding' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b9100 \u2013 \u20b9350' },
                { label: 'Installation Method', value: 'Installed using cement mortar or stone adhesive' },
                { label: 'Maintenance', value: 'Periodic polishing, Use pH-neutral cleaners' },
                { label: '\u2713 Pros', value: 'Clean white appearance, Affordable, Easy to polish', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Can stain if not sealed, Slightly porous', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Flooring, Wall cladding, Staircases' },
                { label: 'Brands', value: 'RK Marble' }
              ]
            },
            {
              title: 'Morwad Marble',
              rows: [
                { label: 'Material', value: 'White marble with subtle grey patterns' },
                { label: 'Types', value: 'Morwad White, Morwad Light Vein' },
                { label: 'Sizes', value: 'Slabs 5\u20138 ft length, Tiles 2\u00d72 ft' },
                { label: 'Thk (mm)', value: '16\u201318 flooring, 12\u201315 cladding' },
                { label: 'Slab Cost (sq.ft)', value: '\u20b990 \u2013 \u20b9250' },
                { label: 'Installation Method', value: 'Cement mortar installation, Polishing after laying' },
                { label: 'Maintenance', value: 'Periodic sealing recommended, Clean with mild stone cleaner' },
                { label: '\u2713 Pros', value: 'Budget-friendly marble, Light colour brightens interiors, Easy to install', cls: 'pros' },
                { label: '\u2715 Cons', value: 'Slightly softer than premium marbles, May require regular polishing', cls: 'cons' },
                { label: 'Best Places to Use', value: 'Bedrooms, Living room flooring, Staircases' },
                { label: 'Brands', value: 'Rajasthan marble suppliers' }
              ]
            }
          ]
    },
    'kitchen-colors-2': {
      title: 'Kitchen Colour Combinations',
        items: [
          'White Countertop + Mint Green Shutters',
          'White Marble Countertop + Beige Shutters',
          'Light Cream Countertop + Light Terracotta Shutters',
          'White Countertop + Pastel Blue Shutters + Light Wooden Handles',
          'Greige Overhead Storage + Sea Green Under-Counter Shutters + White Countertop',
          'Pastel Blue + White Satuario Marble',
          'White Marble Countertop + Beige Shutters',
          'Plain Burgundy + Textures Burgundy',
          'Beige Marble + Lavender + Light Lavender',
          'Light Pink Overhead + Beige Countertop + Light Pink Undercounter',
          'Light Plum Overhead + Light Green Countertop + Greyish-Green Undercounter',
          'Plumish-Brown Overhead + Light Cream Countertop + Light Beige Undercounter'
        ]
    },
    'kitchen-colors': {
      title: 'Kitchen Colour Combinations',
        items: [
          'White Countertop + Mint Green Shutters',
          'White Marble Countertop + Beige Shutters',
          'Light Cream Countertop + Light Terracotta Shutters',
          'White Countertop + Pastel Blue Shutters + Light Wooden Handles',
          'Greige Overhead Storage + Sea Green Under-Counter Shutters + White Countertop',
          'Pastel Blue + White Satuario Marble',
          'White Marble Countertop + Beige Shutters',
          'Plain Burgundy + Textures Burgundy',
          'Beige Marble + Lavender + Light Lavender',
          'Light Pink Overhead + Beige Countertop + Light Pink Undercounter',
          'Light Plum Overhead + Light Green Countertop + Greyish-Green Undercounter',
          'Plumish-Brown Overhead + Light Cream Countertop + Light Beige Undercounter'
        ]
    },
    'bathroom-colors': {
      title: 'Bathroom Colour Combinations',
        items: [
          'Taupe + Beige',
          'Light Plum + White',
          'White + Dark wood',
          'Lavender + White',
          'Greige + Black',
          'Pastel Blue + Gold Fittings',
          'Light Plum Counter Shutter & Basin + Off White',
          'Lime Plaster + Walnut Wood Door',
          'Pink Accent Stripe Tiles + Beige Floor & Wall Tiles + Gold Fittings',
          'Terracotta Accent Tiles + Black Fittings + Terrazzo Tile Backsplash',
          'Light Cream Wall & Flooring Tiles + Blue Wall Tiles',
          'Light Plum Wall Tiles + Beige Wall & Floor Tiles',
          'Lime Plaster Floor & Walls + Cane Lights',
          'Light Pink Overhead + Beige Countertop + Light Pink Undercounter',
          'Light Plum Overhead + Light Green Countertop + Greyish-Green Undercounter',
          'Plumish-Brown Overhead + Light Cream Countertop + Light Beige Undercounter'
        ]
    },
    'bedroom-colors': {
      title: 'Bedroom Colour Combinations',
        items: [
          'Taupe and Dark wood',
          'Blue + Light Wood',
          'Plum + White',
          'Lavender + White',
          'Greige + Light Wood',
          'Lime Green + Walnut Wood',
          'Tan + Green',
          'Cream + Off white',
          'Light Grey + White',
          'Green + Brown',
          'Plum + Grey'
        ]
    },
    'living-colors': {
      title: 'Living Room Colour Combinations',
        items: [
          'Greige + Green',
          'Taupe + Cane',
          'Moccha Mouse + Light Wood',
          'Light Grey + Mushroom',
          'Beige + Wine'
        ]
    },
    };


    /* -- LIGHTBOX -- */
    function lbOpen(src, lbl) {
      document.getElementById('lmd-lb-img').src = src;
      document.getElementById('lmd-lb-cap').textContent = lbl || '';
      document.getElementById('lmd-lb').classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function lbClose() {
      document.getElementById('lmd-lb').classList.remove('on');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lbClose(); });

    /* -- COLOR COMBINATION LIGHTBOX -- */
    function colorComboZoomOpen(src, lbl) {
      document.getElementById('colorComboLbImg').src = src;
      document.getElementById('colorComboLbCap').textContent = lbl || '';
      document.getElementById('colorComboLightbox').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function colorComboZoomClose() {
      document.getElementById('colorComboLightbox').classList.remove('active');
      document.body.style.overflow = '';
    }

    /* -- FURNITURE & KITCHEN FIGMA LIGHTBOX -- */
    function furnitureFigmaZoom(src, lbl) {
      document.getElementById('furnitureFigmaLbImg').src = src;
      document.getElementById('furnitureFigmaLbCap').textContent = lbl || '';
      document.getElementById('furnitureFigmaLightbox').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function furnitureFigmaZoomClose() {
      document.getElementById('furnitureFigmaLightbox').classList.remove('active');
      document.body.style.overflow = '';
    }
    function kitchenFigmaZoom(src, lbl) {
      document.getElementById('kitchenFigmaLbImg').src = src;
      document.getElementById('kitchenFigmaLbCap').textContent = lbl || '';
      document.getElementById('kitchenFigmaLightbox').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function kitchenFigmaZoomClose() {
      document.getElementById('kitchenFigmaLightbox').classList.remove('active');
      document.body.style.overflow = '';
    }

    /* -- THUMBNAIL DATA --
      source.unsplash.com keyword URLs - always load, free, no hotlinking issues */
    var rowThumb = {};


    function getThumb(tid, idx) { return rowThumb[tid + ':' + idx] || null; }

    function thumbTD(tid, idx, lbl) {
      // Check for explicit override first
      var override = rowThumb[tid + ':' + idx];
      if (override) {
        var escLbl = (lbl || '').replace(/'/g, '');
        return '<td class="t-th"><div class="thumb-wrap"><img class="row-img" src="' + override + '" alt="' + escLbl + '" loading="lazy" onclick="event.stopPropagation();lbOpen(this.src,\'' + escLbl + '\')"></div></td>';
      }
      var label = (lbl || '').replace(/'/g, '').trim();
      var folder = IMAGE_SETTINGS.FOLDER_MAP[tid];
      if (!folder) return '<td class="t-th"><div class="thumb-wrap"><img class="row-img" src="assets/1.Cover Images/coming soon.jpg" alt="' + label + '" loading="lazy"></div></td>';

      var srcBase = 'assets/' + folder + '/';

      // Sanitize illegal filename chars
      var safeLabel = label.replace(/[\/\\:*?"<>|]/g, '-');

      // Extract short name before dash/em-dash (for marbles/tiles/laminates)
      var shortLabel = safeLabel.split(/\s+[\u2013\u2014\-]\s+/)[0].trim();

      // Remove trailing parenthetical like (Italian) for marble matching
      var coreLabel = shortLabel.replace(/\s*\([^)]*\)\s*$/, '').trim();

      // Build fallback chain
      var chain = [
        srcBase + safeLabel + '.png',
        srcBase + safeLabel + '.jpg',
        srcBase + shortLabel + '.png',
        srcBase + shortLabel + '.jpg',
        srcBase + coreLabel + '.png',
        srcBase + coreLabel + '.jpg'
      ];

      var escapedLabel = label.replace(/'/g, '');
      var img = '<img class="row-img" src="' + chain[0] + '" alt="' + label + '" loading="lazy"';
      img += ' onclick="event.stopPropagation();lbOpen(this.src,\'' + escapedLabel + '\')"';
      img += ' onerror="var a=(this.getAttribute(\'data-attempt\')|0)+1;this.setAttribute(\'data-attempt\',a);';
      img += 'var c=[\'' + chain.join('\',\'') + '\'];';
      img += 'if(a<c.length){this.src=c[a]}else{this.onerror=null;this.src=\'assets/1.Cover Images/coming soon.jpg\'}"';
      img += ' data-attempt="0">';
      return '<td class="t-th"><div class="thumb-wrap">' + img + '</div></td>';
    }


    /* ============================================================
      RENDER FUNCTIONS
      ============================================================ */
    function renderCats(filter) {
      const grid = document.getElementById('catGrid');

      let list = filter === 'all'
        ? categories
        : categories.filter(c => c.tag === filter);

      // Remove duplicate names on homepage
      if (filter === 'all') {
        const seen = new Set();
        list = list.filter(c => {
          if (seen.has(c.name)) return false;
          seen.add(c.name);
          return true;
        });
      }

      grid.innerHTML = list.map(c => {
        let imgHTML = `
      <img 
        class="cat-img" 
        src="${c.img}" 
        alt="${c.name}" 
        loading="lazy"
        onerror="this.style.background='#e0e4ec'; this.removeAttribute('src')"
      >
    `;

        return `
<div class="cat-card"
     onclick="openCat('${c.id}')">

    ${imgHTML}

    <div class="cat-body">

        <div class="cat-name">
            ${c.name}
        </div>

        <div class="cat-desc">
            ${c.desc}
        </div>

        <div class="cat-cta">
            View Details
        </div>

    </div>

</div>
`;
      }).join('');
    }




    /**
     * Finds the correct local path for a detail image (shown in grids).
     */
    function getDetailPath(catKey, label) {
      const folder = IMAGE_SETTINGS.FOLDER_MAP[catKey];
      if (!folder) return 'https://source.unsplash.com/random/400x300?interior,' + encodeURIComponent(label);
      // Construct path: assets/[Folder]/Detail.[Name].jpg
      return `assets/${folder}/Detail.${label.trim()}.jpg`;
    }

    const MATERIAL_SPEC_IDS = ['limewash', 'limeplaster', 'venetian', 'microcement', 'clay', 'metallic'];
    const MATERIAL_COVER_SRC = {
      limewash: 'assets/17.Natural Materials/Limewash.jpg',
      limeplaster: 'assets/17.Natural Materials/Lime Plaster.jpg',
      venetian: 'assets/17.Natural Materials/Venetian Plaster.jpg',
      microcement: 'assets/17.Natural Materials/Microcement.jpg',
      clay: 'assets/17.Natural Materials/Clay cadding.jpg',
      metallic: 'assets/17.Natural Materials/Liquid Metallic Ombres.jpg'
    };
    const MATERIAL_COVER_LABELS = {
      limewash: 'Lime Wash',
      limeplaster: 'Lime Plaster',
      venetian: 'Venetian Plaster',
      microcement: 'Microcement',
      clay: 'Clay Cladding',
      metallic: 'Liquid Metallic Ombres'
    };

    function getMaterialSpecCoverSrc(id) {
      if (MATERIAL_COVER_SRC[id]) return MATERIAL_COVER_SRC[id];
      const coverLabel = MATERIAL_COVER_LABELS[id];
      if (coverLabel) {
        const coverPath = getCoverPath(coverLabel);
        if (coverPath && coverPath.indexOf('unsplash.com') === -1) return coverPath;
      }
      const labels = detailImages[id];
      const name = labels && labels[0] ? labels[0] : '';
      if (name) {
        const folderPath = getImagePath(id, name);
        if (folderPath) return folderPath;
        return getDetailPath(id, name);
      }
      return '';
    }

    function renderMaterialSpecSheet(el, id) {
      const d = detailData[id];
      if (!d) return;
      const coverSrc = getMaterialSpecCoverSrc(id);
      const finishProp = d.props.find(function (p) { return p.l && p.l.indexOf('Finish') !== -1; });
      const subtitle = finishProp ? finishProp.v : '';
      const titleEsc = d.title.replace(/'/g, "\\'");
      let html = '<div class="material-spec-new"><div class="mat-board">';
      if (coverSrc) {
        html += '<figure class="mat-board-cover">';
        html += '<img src="' + coverSrc + '" alt="' + d.title + '" loading="lazy" onclick="lbOpen(this.src,\'' + titleEsc + '\')" onerror="this.parentElement.style.display=\'none\'">';
        html += '</figure>';
      }
      html += '<header class="mat-board-intro">';
      html += '<h1 class="mat-board-title">' + d.title + '</h1>';
      if (subtitle) html += '<p class="mat-board-subtitle">' + subtitle + '</p>';
      html += '</header>';
      html += '<div class="mat-board-spec">';
      d.props.forEach(function (p) {
        html += '<div class="mat-spec-row">';
        html += '<div class="mat-spec-label">' + p.l + '</div>';
        html += '<div class="mat-spec-value">' + p.v + '</div>';
        html += '</div>';
      });
      html += '</div></div></div>';
      el.innerHTML = html;
    }

    function imgRow(id) {
      const labels = detailImages[id];
      if (!labels || !labels.length) return '';
      return `<div class="mat-image-row">${labels.map(label => {
        const src = getDetailPath(id, label);
        return `
      <div class="mat-img-card">
        <img src="${src}" alt="${label}" loading="lazy" onclick="lbOpen(this.src, '${label}')" onerror="this.parentElement.style.display='none'">
        <div class="mat-img-label">${label}</div>
      </div>`;
      }).join('')}</div>`;
    }

    function openCat(id) {
      const localCards =
        JSON.parse(localStorage.getItem('cards')) || [];
      const dynamicCard =
        localCards.find(c => c.id === id);
      if (dynamicCard) {
        openDynamicCard(dynamicCard);
        return;
      }
      document.getElementById('homeView').style.display = 'none';
      document.getElementById('searchView').style.display = 'none';
      document.getElementById('detailView').style.display = 'block';
      document.getElementById('heroBanner').style.display = 'none';
      window.scrollTo(0, 0);

      const el = document.getElementById('detailContent');

      if (detailData[id] && MATERIAL_SPEC_IDS.indexOf(id) >= 0) {
        renderMaterialSpecSheet(el, id);
        return;
      }

      // -- Route Kitchen Colour Combination (real images) --
      if (id === 'kitchen-colors' || id === 'kitchen-colors-2') {
        var kitchenColorImages = [
          'assets/26.Kitchen Colour Combinations/1.White Countertop and Mint Green Shutters.png',
          'assets/26.Kitchen Colour Combinations/2.Beige Shutters and White.jpg',
          'assets/26.Kitchen Colour Combinations/3.Light Cream andLight Terracotta.jpg',
          'assets/26.Kitchen Colour Combinations/4.White Countertop and Pastel Blue Shutters.jpg',
          'assets/26.Kitchen Colour Combinations/5. Greige Overhead Storage and Sea Green Under-Counter Shutters and White Countertop.jpg',
          'assets/26.Kitchen Colour Combinations/6.PASTEL BLUE and WHITE STATUARIO MARBLE.png',
          'assets/26.Kitchen Colour Combinations/7.White Marble Countertop and Beige Shutters.png',
          'assets/26.Kitchen Colour Combinations/8.Plain Burgundy and Textures Burgundy.png',
          'assets/26.Kitchen Colour Combinations/9.BEIGE MARBLE and LAVENDER and LIGHT LAVENDER.png',
          'assets/26.Kitchen Colour Combinations/10.Light Pink Overhead and Beige Countertop and Light Pink Undercounter.png',
          'assets/26.Kitchen Colour Combinations/11.Light Plum Overhead and Light Green Countertop and Greyish-Green Undercounter.png',
          'assets/26.Kitchen Colour Combinations/12.Plumish-Brown Overhead and Light Cream Countertop and Light Beige Undercounter.png'
        ];
        renderColorComboGrid(el, id, kitchenColorImages); return;
      }

      // -- Route Bathroom Colour Combination (real images) --
      if (id === 'bathroom-colors' || id === 'bathroom-colors-2') {
        var bathroomColorImages = [
          'assets/29.Bathroom Colour Combinations/1.Taupe and Beige.png',
          'assets/29.Bathroom Colour Combinations/2.Light Plum and White.png',
          'assets/29.Bathroom Colour Combinations/3.White and Dark wood.png',
          'assets/29.Bathroom Colour Combinations/4. Lavender and White.png',
          'assets/29.Bathroom Colour Combinations/5.Greige and Black.png',
          'assets/29.Bathroom Colour Combinations/6.Pastel Blue and Gold Fittings.png',
          'assets/29.Bathroom Colour Combinations/7.Light Plum Counter Shutter and Basin and Off White.png',
          'assets/29.Bathroom Colour Combinations/8.Lime Plaster and Walnut Wood Door.png',
          'assets/29.Bathroom Colour Combinations/9.Pink Accent Stripe Tiles and Beige Floor and Wall Tiles and Gold Fittings.png',
          'assets/29.Bathroom Colour Combinations/10.Terracotta Accent Tiles and Black Fittings and Terrazzo Tile Backsplash.png',
          'assets/29.Bathroom Colour Combinations/11.Light Cream Wall and Flooring Tiles and Blue Wall Tiles.png',
          'assets/29.Bathroom Colour Combinations/12.Light Plum Wall Tiles and Beige Wall and Floor Tiles.png',
          'assets/29.Bathroom Colour Combinations/13.Lime Plaster Floor and Walls and Cane Lights.png',
          'assets/29.Bathroom Colour Combinations/14.Light Pink Overhead and Beige Countertop and Light Pink Undercounter.png',
          'assets/29.Bathroom Colour Combinations/15.Light Plum Overhead and Light Green Countertop and Greyish-Green Undercounter.png',
          'assets/29.Bathroom Colour Combinations/16.Plumish-Brown Overhead and Light Cream Countertop and Light Beige Undercounter.png'
        ];
        renderColorComboGrid(el, 'bathroom-colors', bathroomColorImages); return;
      }

      // -- Route Bedroom Colour Combination (real images) --
      if (id === 'bedroom-colors') {
        var bedroomColorImages = [
          'assets/27.Bedroom Colour Combinations/1. Taupe and Dark wood.jpg',
          'assets/27.Bedroom Colour Combinations/2. Blue and Light Wood.jpg',
          'assets/27.Bedroom Colour Combinations/3. Plum and White.jpg',
          'assets/27.Bedroom Colour Combinations/4.Lavenderand White.jpg',
          'assets/27.Bedroom Colour Combinations/5. Greige and Light Wood.jpg',
          'assets/27.Bedroom Colour Combinations/6. Lime Green and Walnut Wood.jpg',
          'assets/27.Bedroom Colour Combinations/7.Tan and Green.jpg',
          'assets/27.Bedroom Colour Combinations/8.Cream and Off white.jpg',
          'assets/27.Bedroom Colour Combinations/9.Light Grey and White.jpg',
          'assets/27.Bedroom Colour Combinations/10. Green and Brown.jpg',
          'assets/27.Bedroom Colour Combinations/11. Plum and Grey.jpg'
        ];
        renderColorComboGrid(el, id, bedroomColorImages); return;
      }

      // -- Route Living Room Colour Combination (real images) --
      if (id === 'living-colors') {
        var livingColorImages = [
          'assets/28. Living Room Colour Combinations/1. Greige and Green.jpg',
          'assets/28. Living Room Colour Combinations/2. Taupe and Cane.jpg',
          'assets/28. Living Room Colour Combinations/3. Moccha Mouse and Light Wood.jpg',
          'assets/28. Living Room Colour Combinations/4. Light Grey andMushroom.jpg',
          'assets/28. Living Room Colour Combinations/5. Beige andWine.jpg'
        ];
        renderColorComboGrid(el, id, livingColorImages); return;
      }

      // -- Route merged categories --
      // 'marbles'   = merged marble-summary table + marbles list
      if (id === 'marbles') { renderMerged(el, 'Marbles', tableData['marble-summary'], listData['marbles'], 'marble-summary'); return; }
      if (id === 'italian-marbles' || id === 'indian-marbles' || id === 'kitchen-counter') {
        var imgMap = {};
        var renderOpts = { title: listData[id].title };
        if (id === 'kitchen-counter') {
          imgMap = {
            'Engineered Quartz': 'assets/14. Kitchen Counter Tops/Engineered Quartz.jpg',
            'Granite': 'assets/14. Kitchen Counter Tops/Granite.jpg',
            'Natural Quartzite': 'assets/14. Kitchen Counter Tops/Natural Quartzite.jpg',
            '15 MM Tiles': 'assets/14. Kitchen Counter Tops/15 mm Tile.jpg',
            'Corian': 'assets/14. Kitchen Counter Tops/Corian.jpg',
            'Natural Marble': 'assets/14. Kitchen Counter Tops/Natural Marble.jpg',
            'Terrazzo Slabs': 'assets/14. Kitchen Counter Tops/Terrazzo.jpg',
            'Concrete Microtopping': 'assets/14. Kitchen Counter Tops/Concrete.jpg',
            'Porcelain Stone': 'assets/14. Kitchen Counter Tops/Porcelain Stone.jpg',
            'Stainless Steel': 'assets/14. Kitchen Counter Tops/Stainless Steel.jpg'
          };
          renderOpts.tableItems = listData[id].tableItems;
          renderOpts.detailItems = listData[id].detailItems;
        } else if (id === 'indian-marbles') {
          imgMap = {
            'Makrana Marble': 'assets/18. Marbles/Makrana marble.jpg',
            'Banswara Marble': 'assets/18. Marbles/Banswara Marble.jpg',
            'Katni Marble': 'assets/18. Marbles/Katni Marble.jpg',
            'Ambaji Marble': 'assets/18. Marbles/Ambaji Marble.jpg',
            'Morwad Marble': 'assets/18. Marbles/Morwad Marble.jpg'
          };
          renderOpts.tableItems = listData[id].tableItems;
          renderOpts.detailItems = listData[id].detailItems;
        } else if (id === 'italian-marbles') {
          imgMap = {
            'Carrara Marble': 'assets/18. Marbles/Carrara marble.jpg',
            'Calacatta Marble': 'assets/18. Marbles/Calacatta marble.jpg',
            'Statuario Marble': 'assets/18. Marbles/Statuario marble.jpg',
            'Crema Marfil': 'assets/18. Marbles/Crema Marfil.jpg',
            'Onyx Marble': 'assets/18. Marbles/Onyx Marble.jpg',
            'Armani Brown Marble': 'assets/18. Marbles/Armani Brown marble.jpg',
            'White Portoro Marble': 'assets/18. Marbles/White Portoro marble.jpg',
            'Michelangelo Marble': 'assets/18. Marbles/Michelangelo marble.jpg',
            'Bianco Lasa Marble': 'assets/18. Marbles/Bianco Lasa marble.jpg',
            'Travertine Marble': 'assets/18. Marbles/Travertine Marble.jpg'
          };
          renderOpts.tableItems = listData[id].tableItems;
          renderOpts.detailItems = listData[id].detailItems;
        }
        renderOpts.imgMap = imgMap;
        renderOpts.section = id;
        renderDataDrivenSection(el, renderOpts);
        return;
      }

      if (id === 'top10') {
        renderTop10New(el, { data: listData[id], isAdmin: false });
        return;
      }

      /* [COMMENTED OUT - OLD exp-look render handler - preserved below for restoration]
      if (id === 'exp-look') { renderNewExpLook(el); return; }
      */
      if (id === 'exp-look') { renderNewExpLook(el); return; }

      if (id === 'tiles' || id === 'granite' || id === 'quartz' || id === 'mirror' || id === 'quartzite') {
        var imgMap = {};
        if (id === 'tiles') {
          imgMap = {
            'Vitrified Tiles': 'assets/19. Tiles/Vitrified Tiles.jpg',
            'Ceramic Tiles': 'assets/19. Tiles/Ceramic Tiles.jpg',
            'Porcelain Tiles': 'assets/19. Tiles/Porcelain Tiles.jpg',
            'Natural Stone Tiles': 'assets/19. Tiles/Stone Tile.jpg',
            'Cement Concrete Tiles': 'assets/19. Tiles/Cement Concrete Tile.jpg',
            'Mosaic Tiles': 'assets/19. Tiles/Terrazzo Tile.jpg'
          };
        } else if (id === 'granite') {
          imgMap = {
            'Black Granite': 'assets/20. Granite/Black Granite.jpg',
            'Black Galaxy Granite': 'assets/20. Granite/Black Galaxy Granite.jpg',
            'Steel Grey Granite': 'assets/20. Granite/Steel Grey Granite.jpg',
            'Tan Brown Granite': 'assets/20. Granite/Tan Brown Granite.jpg',
            'Viscount White Granite': 'assets/20. Granite/Viscount White Granite.jpg',
            'Alaska White Granite': 'assets/20. Granite/Alaska White Granite.jpg',
            'Imperial Red Granite': 'assets/20. Granite/Imperial Red Granite.jpg'
          };
        } else if (id === 'quartz') {
          imgMap = {
            'Calacatta Quartz': 'assets/21. Quartz/CALACATTA GOLD QUARTZ.jpg',
            'Carrara Quartz': 'assets/21. Quartz/Carrara Quartz.jpg',
            'Solid White Quartz': 'assets/21. Quartz/Solid White Quartz.jpg',
            'Black Quartz': 'assets/21. Quartz/Black Quartz.jpg',
            'Grey Quartz': 'assets/21. Quartz/Grey Quartz.jpg',
            'Terrazzo Quartz': 'assets/21. Quartz/Terrazzo Quartz.jpg',
            'Brown Quartz': 'assets/21. Quartz/Brown Quartz.jpg'
          };
        } else if (id === 'mirror') {
          imgMap = {
            'Clear Mirror': 'assets/36.Mirrors/1.Clear Mirror.jpg',
            'Tinted Mirror': 'assets/36.Mirrors/2.Tinted Mirror.jpg',
            'Antique Mirror': 'assets/36.Mirrors/3.Antique Mirror.jpg',
            'Bevelled Mirror': 'assets/36.Mirrors/4.Bevelled Mirror.jpg',
            'Mirror Tiles': 'assets/36.Mirrors/5.Mirror Tiles.jpg',
            'Fluted Mirror': 'assets/36.Mirrors/6.Fluted Mirror.jpg',
            'Etched Mirror': 'assets/36.Mirrors/7.Etched Mirror.jpg',
            'Back-Painted Mirror': 'assets/36.Mirrors/8.Back-Painted Mirror.jpg',
            'LED Mirror': 'assets/36.Mirrors/9.LED Mirror.jpg'
          };
        } else if (id === 'quartzite') {
          imgMap = {
            'Taj Mahal Quartzite': 'assets/22.Quartzite/Taj Mahal Quartzite.jpg',
            'Patagonia Quartzite': 'assets/22.Quartzite/Patagonia Quartzite.jpg',
            'White Macaubas Quartzite': 'assets/22.Quartzite/White Macaubas Quartzite.jpg',
            'Cristallo Quartzite': 'assets/22.Quartzite/Cristallo Quartzite.jpg',
            'Blue Roma Quartzite': 'assets/22.Quartzite/Blue Roma Quartzite.jpg'
          };
        }
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: imgMap
        });
        return;
      }

      if (id === 'glass' || id === 'laminates' || id === 'veneer') {
        var imgMap = {};
        if (id === 'glass') {
          imgMap = {
            'Clear Glass': 'assets/23. Glass/Clear glass.jpg',
            'Toughened Glass': 'assets/23. Glass/Toughened glass.jpg',
            'Laminated Glass': 'assets/23. Glass/Laminated glass.jpg',
            'Frosted Glass': 'assets/23. Glass/Frosted glass.jpg',
            'Tinted Glass': 'assets/23. Glass/Tinted glass.jpg',
            'Lacquered Glass': 'assets/23. Glass/Back painted  glass.jpg',
            'Lacquered/Back Painted Glass': 'assets/23. Glass/Back painted  glass.jpg',
            'Fluted Glass': 'assets/23. Glass/Fluted glass.jpg',
            'Smoked Glass': 'assets/23. Glass/Smoked glass.jpg',
            'Sandwiched Glass': 'assets/23. Glass/Sandwiched glass.jpg',
            'Smart Glass': 'assets/23. Glass/Smart glass.jpg'
          };
        } else if (id === 'laminates') {
          imgMap = {
            'Regular Laminate': 'assets/24. Laminate/1.Regular Laminate.png',
            'PVC Laminate': 'assets/24. Laminate/2.PVC Laminate.jpg',
            'High Pressure Laminate': 'assets/24. Laminate/3.High Pressure Laminate.jpg',
            'Prelam Board': 'assets/24. Laminate/4.Prelam Board.jpg',
            'Core Laminate': 'assets/24. Laminate/5.Core Laminate.jpg',
            'Acrylic Laminate': 'assets/24. Laminate/6.Acrylic Laminate.jpg',
            'Anti-Fingerprint Laminate': 'assets/24. Laminate/7.Anti-Fingerprint Laminate.jpg',
            'Textured Decorative Laminate': 'assets/24. Laminate/8.Textured Decorative Laminate.jpg',
            'Exterior Grade Laminate': 'assets/24. Laminate/9.Exterior Grade Laminate.jpg'
          };
        } else if (id === 'veneer') {
          imgMap = {
            'Natural Wood Veneer': 'assets/25. Veneer/Natural Wood Veneer.jpg',
            'Engineered Veneer': 'assets/25. Veneer/Engineered Veneer.jpg',
            'Teak Veneer': 'assets/25. Veneer/Teak Veneer.jpg',
            'Walnut Veneer': 'assets/25. Veneer/Walnut Veneer.jpg',
            'Oak Veneer': 'assets/25. Veneer/Oak Veneer.jpg',
            'Dyed Smoked Veneer': 'assets/25. Veneer/Dyed Smoked Veneer.jpg'
          };
        }
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: imgMap
        });
        return;
      }

      if (id === 'plywood') {
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: {}
        });
        var plyExtra = '';
        ['plywood-guide', 'plywood-materials'].forEach(function (k) {
          var d = compareData[k];
          if (!d) return;
          plyExtra += '<div class="sec-head" style="margin-top:36px"><span class="sec-title">' + d.title + '</span></div>';
          plyExtra += '<div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner compare-table">';
          plyExtra += '<thead><tr>' + d.cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead>';
          plyExtra += '<tbody>' + d.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + String(c).replace(/\n/g, '<br>') + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody>';
          plyExtra += '</table></div>';
        });
        el.innerHTML += plyExtra;
        return;
      }

      // Kitchen — single-card layout with real images
      if (id === 'kitchen-shutter' || id === 'kitchen-must') {
        var kitData = listData[id];
        var kitImgMap = {};
        if (id === 'kitchen-shutter') {
          kitImgMap = {
            'Laminate': 'assets/14.5 Kitchen Shutters/Laminate.jpg',
            'Veneer': 'assets/14.5 Kitchen Shutters/Veneer.jpg',
            'PU Paint': 'assets/14.5 Kitchen Shutters/PU Paint.jpg',
            'Acrylic': 'assets/14.5 Kitchen Shutters/Acrylic.jpg',
            'Glass': 'assets/14.5 Kitchen Shutters/Glass.jpg',
            'Natural Stone Finish': 'assets/14.5 Kitchen Shutters/Natural Stone.jpg'
          };
        } else if (id === 'kitchen-must') {
          kitImgMap = {
            'Corner Drawers': 'assets/16.5 Kitchen Must Haves/Corner Drawers.jpg',
            'Multi Functional Sink': 'assets/16.5 Kitchen Must Haves/Multi Fuctional Sink.jpg',
            'Tall Utility Unit': 'assets/16.5 Kitchen Must Haves/Tall Utility Unit.jpg',
            'Drawer Internals': 'assets/16.5 Kitchen Must Haves/Drawer Internals.jpg',
            'Shutter Storages (Upper and Lower)': 'assets/16.5 Kitchen Must Haves/Shutter Storages.jpg'
          };
        }
        renderKitchenSingleTable(el, {
          title: kitData.title,
          detailItems: kitData.detailItems,
          imgMap: kitImgMap
        });
        return;
      }

      // Furniture — single-card layout for all 9 premium cards
      if (id === 'door' || id === 'bed' || id === 'headboard' || id === 'sidetable' ||
        id === 'study' || id === 'dresser' || id === 'wardrobe' || id === 'wardrobe-must' || id === 'tvunit') {
        var furnData = listData[id];
        var imgMap = {};
        if (id === 'door') {
          imgMap = {
            'Door Skins': 'assets/6.Door Finishes/Door Skins.jpg',
            'Flute Panel Doors': 'assets/6.Door Finishes/Flute Panel Doors.jpg',
            'Veneer Doors': 'assets/6.Door Finishes/Veneer Doors.jpg',
            'Laminate Doors': 'assets/6.Door Finishes/Laminate Doors.jpg',
            'Metal Doors (SS/Brass/MS)': 'assets/6.Door Finishes/Metal Doors.jpg',
            'PU Painted Doors': 'assets/6.Door Finishes/PU Painted Doors.jpg',
            'Glass Doors (Clear/Fluted/Tinted/Smoked)': 'assets/6.Door Finishes/Glass Doors.jpg'
          };
        } else if (id === 'bed') {
          imgMap = {
            'LAMINATE FINISH': 'assets/5.Bed Finishes/Laminte Finish.jpg',
            'VENEER FINISH': 'assets/5.Bed Finishes/Veneer Finish.jpg',
            'PU PAINT FINISH': 'assets/5.Bed Finishes/Pu Paint Finish.jpg',
            'SOLID WOOD FINISH (TEAK / SHEESHAM WOOD)': 'assets/5.Bed Finishes/Solid Wood Finish.jpg',
            'UPHOLSTERED FINISH (FABRIC / LEATHER)': 'assets/5.Bed Finishes/Upholstered Bed.jpg',
            'METAL FINISH (MS / SS FRAME)': 'assets/5.Bed Finishes/Metal Finish.jpg',
            'PRE-LAM PARTICLE BOARD FINISH': 'assets/5.Bed Finishes/Pre Lam Particle Finish.jpg',
            'ACRYLIC FINISH': 'assets/5.Bed Finishes/Acrylic bed.jpg',
            'RATTAN CANE FINISH': 'assets/5.Bed Finishes/Cane Finish.jpg',
            'BAMBOO FINISH': 'assets/5.Bed Finishes/Bamboo Finish.jpg'
          };
        } else if (id === 'headboard') {
          imgMap = {
            'FABRIC UPHOLSTERED': 'assets/7.Headboard Finishes/Fabric Finish.jpg',
            'LEATHERITE': 'assets/7.Headboard Finishes/Leatherite Finish.jpg',
            'RATTAN CANE': 'assets/7.Headboard Finishes/Rattan Cane.jpg',
            'CHARCOAL PANEL': 'assets/7.Headboard Finishes/Charcoal Panel.jpg',
            'ACRYLIC': 'assets/7.Headboard Finishes/Acrylic Finish.jpg',
            'CNC CUT / JAALI DESIGN': 'assets/7.Headboard Finishes/CNC Cut Design.jpg',
            'PU PAINT FINISH': 'assets/7.Headboard Finishes/PU Paint Finish.jpg',
            'VENEER FINISH': 'assets/7.Headboard Finishes/Veneer Finish.jpg'
          };
        } else if (id === 'sidetable') {
          imgMap = {
            'LAMINATE FINISH': 'assets/8.Side Table Finishes/Laminate Finish.jpg',
            'VENEER FINISH': 'assets/8.Side Table Finishes/Veneer Finish.jpg',
            'PU PAINT FINISH': 'assets/8.Side Table Finishes/PU Paint Finish.jpg',
            'SOLID WOOD TABLE (TEAK / SHEESHAM WOOD)': 'assets/8.Side Table Finishes/Solid Wood Table.jpg',
            'FABRIC FINISH': 'assets/8.Side Table Finishes/Fabric Finish.jpg',
            'METAL FINISH (MS / SS FRAME)': 'assets/8.Side Table Finishes/Metal Finish.jpg',
            'PRE-LAM PARTICLE FINISH': 'assets/8.Side Table Finishes/Pre Lam Finish.jpg',
            'ACRYLIC FINISH': 'assets/8.Side Table Finishes/Acrylic Finish.jpg',
            'MIRROR FINISH': 'assets/8.Side Table Finishes/Mirror Finish.jpg',
            'FLUTED PANEL FINISH': 'assets/8.Side Table Finishes/Fluted Panel.jpg',
            'LEATHERITE FINISH': 'assets/8.Side Table Finishes/Leatherite Finish.jpg',
            'TERRAZZO FINISH': 'assets/8.Side Table Finishes/Terrazzo Finish.jpg',
            'CORIAN FINISH': 'assets/8.Side Table Finishes/Corian Finish.jpg',
            'METAL INLAY / BRASS': 'assets/8.Side Table Finishes/Metal Inlsy Finish.jpg',
            'MARBLE FINISH': 'assets/8.Side Table Finishes/Marble Finish.jpg'
          };
        } else if (id === 'study') {
          imgMap = {
            'Laminate Finish': 'assets/9.Study Table Finishes/Laminate Finish.jpg',
            'Pre-Laminated Board': 'assets/9.Study Table Finishes/Pre laminted Board.jpg',
            'Veneer Finish': 'assets/9.Study Table Finishes/Veneer Finish.jpg',
            'PU Paint': 'assets/9.Study Table Finishes/PU Paint Finish.jpg',
            'Solid Wood': 'assets/9.Study Table Finishes/Solid Wood Finish.jpg',
            'Metal Finish': 'assets/9.Study Table Finishes/Metal Finish.jpg',
            'Acrylic': 'assets/9.Study Table Finishes/Acrylic Finish.jpg',
            'Leatherette Finish': 'assets/9.Study Table Finishes/Leatherite Finish.jpg'
          };
        } else if (id === 'dresser') {
          imgMap = {
            'Laminate Finish': 'assets/10.Dresser Table Finishes/Laminate Finish.jpg',
            'Pre-Laminated Board': 'assets/10.Dresser Table Finishes/Pre Laminated Finish.jpg',
            'Veneer Finish': 'assets/10.Dresser Table Finishes/Veneer Finish.jpg',
            'PU Paint Finish': 'assets/10.Dresser Table Finishes/PU Paint Finish.jpg',
            'Mirror Finish': 'assets/10.Dresser Table Finishes/Mirror Finish.jpg',
            'Marble Finish': 'assets/10.Dresser Table Finishes/Marble Finish.jpg',
            'Leatherette Finish': 'assets/10.Dresser Table Finishes/Leatherite Finish.jpg',
            'Fluted Panel Finish': 'assets/10.Dresser Table Finishes/Flute Panel Finish.jpg',
            'Rattan Cane Finish': 'assets/10.Dresser Table Finishes/Rattan Cane Finish.jpg'
          };
        } else if (id === 'wardrobe') {
          imgMap = {
            'Fluted Glass': 'assets/11.Wardrobe Shutter Finishes/Fluted Glass.jpg',
            'PU Paint': 'assets/11.Wardrobe Shutter Finishes/PU Paint Finish.jpg',
            'Rattan Cane': 'assets/11.Wardrobe Shutter Finishes/Rattan Cane.jpg',
            'Leather / Leatherette': 'assets/11.Wardrobe Shutter Finishes/Leatherite.jpg',
            'Acrylic Matte': 'assets/11.Wardrobe Shutter Finishes/Acrylic Matte.jpg',
            'Wallpaper': 'assets/11.Wardrobe Shutter Finishes/Wallpaper.jpg',
            'Metallic Laminate': 'assets/11.Wardrobe Shutter Finishes/Metallic Laminate.jpg',
            'Back-Painted Glass': 'assets/11.Wardrobe Shutter Finishes/Back Painted Glass.jpg',
            'Veneer': 'assets/11.Wardrobe Shutter Finishes/Veneer.jpg',
            'Fluted Panel (MDF/WPC/Wood)': 'assets/11.Wardrobe Shutter Finishes/Fluted Panel.jpg',
            'Fabric Panels': 'assets/11.Wardrobe Shutter Finishes/Fabric Panel Finish.jpg'
          };
        } else if (id === 'wardrobe-must') {
          imgMap = {
            'Shoe Revolving Rack': 'assets/12.5 Must Wardrobe Haves/Shoe Revolving Rack.jpg',
            'Hidden Watch Pull Down': 'assets/12.5 Must Wardrobe Haves/Hidden Wall Pull Down.jpg',
            'Fingerprint Lock': 'assets/12.5 Must Wardrobe Haves/Finger Print Lock.jpg',
            'Drawer Organisers': 'assets/12.5 Must Wardrobe Haves/Drawer Organisers.jpg',
            'Seamless Handles': 'assets/12.5 Must Wardrobe Haves/Seamless Handles.jpg'
          };
        } else if (id === 'tvunit') {
          imgMap = {
            'LAMINATE FINISH': 'assets/13. TV Unit Finishes/Laminate Finish.jpg',
            'VENEER FINISH': 'assets/13. TV Unit Finishes/Veneer Finish.jpg',
            'PU PAINT FINISH': 'assets/13. TV Unit Finishes/PU Paint Finish.jpg',
            'ACRYLIC FINISH': 'assets/13. TV Unit Finishes/Acrylic Finish.jpg',
            'GLASS FINISH (BACK-PAINTED / FLUTED / TINTED)': 'assets/13. TV Unit Finishes/Glass Finish.png',
            'NATURAL STONE CLADDING (SLATE / SANDSTONE / STACK STONE)': 'assets/13. TV Unit Finishes/Natural Stone Cladding.jpg',
            'MARBLE CLADDING': 'assets/13. TV Unit Finishes/Marble Cladding.jpg',
            'GRANITE CLADDING': 'assets/13. TV Unit Finishes/Granite Finish.jpg',
            'CHARCOAL PANELS': 'assets/13. TV Unit Finishes/Charcoal Panel.jpg',
            'WPC PANELS (WOOD PLASTIC COMPOSITE)': 'assets/13. TV Unit Finishes/WPC Panel.jpg',
            'FLUTED / GROOVED PANELS': 'assets/13. TV Unit Finishes/Fluted Panel.jpg',
            'METAL ACCENTS (SS / BRASS / MS)': 'assets/13. TV Unit Finishes/Metal Accents.jpg',
            'WALLPAPER FINISH': 'assets/13. TV Unit Finishes/Wallpaper Finish.jpg',
            'TEXTURED PAINT FINISH': 'assets/13. TV Unit Finishes/Textured Paint Finish.jpg',
            'MIRROR FINISH (CLEAR / BRONZE / SMOKED)': 'assets/13. TV Unit Finishes/Mirror Finish.jpg',
            'LEATHER / UPHOLSTERED PANELS': 'assets/13. TV Unit Finishes/Leathertite Finish.jpg',
            'CNC CUT PANELS': 'assets/13. TV Unit Finishes/CNC Cut Panels.jpg',
            'CORIAN': 'assets/13. TV Unit Finishes/Corian Finish.jpg',
            'CONCRETE FINISH': 'assets/13. TV Unit Finishes/Concrete Finish.png',
            'WALL MOULDING + PAINT': 'assets/13. TV Unit Finishes/Wall Moulding.jpg',
            '3D WALL PANELS (PVC / GYPSUM)': 'assets/13. TV Unit Finishes/3D Wall Panel.jpg',
            'TILE CLADDING (VITRIFIED)': 'assets/13. TV Unit Finishes/Tile Cladding.jpg',
            'BACKLIT PANELS': 'assets/13. TV Unit Finishes/Backlit Panel.jpg',
            'STONE VENEER (FLEXIBLE STONE)': 'assets/13. TV Unit Finishes/Stone Veneer Finish.jpg'
          };
        }
        // Convert pipe-delimited items to rich detailItems if needed
        var rawItems = furnData.detailItems || furnData.items || [];
        var detailItems = [];
        if (rawItems.length && typeof rawItems[0] === 'string') {
          for (var si = 0; si < rawItems.length; si++) {
            var p = rawItems[si].split('||');
            detailItems.push({
              title: p[0] || '',
              rows: [
                ['Raw Material Cost', p[1] || ''],
                ['Thickness Required', p[2] || ''],
                ['Installation Process', p[3] || ''],
                ['Maintenance', p[4] || ''],
                { label: '\u2713 Pros', value: p[5] || '', cls: 'pros' },
                { label: '\u2715 Cons', value: p[6] || '', cls: 'cons' },
                ['Best Places to Use', p[7] || '']
              ],
              image: p[9] || ''
            });
          }
        } else {
          detailItems = rawItems;
        }
        // Insert Material as the first row for wardrobe-must cards
        if (id === 'wardrobe-must') {
          for (var wmi = 0; wmi < detailItems.length; wmi++) {
            var wp = furnData.items[wmi].split('||');
            if (wp.length > 8 && wp[8]) {
              detailItems[wmi].rows.unshift(['Material', wp[8]]);
            }
          }
        }
        renderFurnitureSingleTable(el, {
          title: furnData.title,
          section: id,
          detailItems: detailItems,
          imgMap: imgMap
        });
        return;
      }

      // Designer Veneer premium routing
      if (id === 'designer-veneer') {
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: {
            'Sucupira Veneer': 'assets/34.Designer Veneer/1.Sucupira Veneer.jpg',
            'Wenge Veneer': 'assets/34.Designer Veneer/2.Wenge Veneer.jpg',
            'Ebony Veneer': 'assets/34.Designer Veneer/3.Ebony Veneer.jpg',
            'Zebrano Veneer': 'assets/34.Designer Veneer/4.Zebrano Veneer.jpg',
            'Burl Veneer': 'assets/34.Designer Veneer/5.Burl Veneer.jpg'
          },
          wrapperClass: 'designer-veneer-wrap'
        });
        return;
      }

      // Wood Types premium routing
      if (id === 'wood-types') {
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: {
            'Teak Wood': 'assets/35.Wood/1.Teak Wood.jpg',
            'Sheesham Wood': 'assets/35.Wood/2.Sheesham Wood.jpg',
            'Oak Wood': 'assets/35.Wood/3.Oak Wood.jpg',
            'Walnut Wood': 'assets/35.Wood/4.Walnut Wood.jpg',
            'Pine Wood': 'assets/35.Wood/5. Pine Wood.jpg',
            'Ash Wood': 'assets/35.Wood/6.Ash Wood.jpg'
          }
        });
        return;
      }

      // Hardware premium routing
      if (id === 'hardware') {
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: {
            'Soft Close Hinge': 'assets/37. Hardware/1.Soft Close Hinge.jpg',
            'Telescopic Channel': 'assets/37. Hardware/2.Telescopic Channel.jpg',
            'Tandem Box System': 'assets/37. Hardware/3.Tandem Box System.jpg',
            'Gola Profile': 'assets/37. Hardware/4.Gola Profile.jpg',
            'Profile Handle': 'assets/37. Hardware/5.Profile Handle.jpg',
            'Cabinet Handle': 'assets/37. Hardware/6.Cabinet Handle.jpg',
            'Door Hinge': 'assets/37. Hardware/7.Door Hinge.jpg',
            'Door Handle': 'assets/37. Hardware/8.Door Handle.jpg',
            'Mortise Lock': 'assets/37. Hardware/9.Mortise Lock.jpg',
            'Digital Door Lock': 'assets/37. Hardware/10.Digital Door Lock.jpg',
            'Concealed Door Closer': 'assets/37. Hardware/11.Concelaed Door Closer.jpg',
            'Door Stopper': 'assets/37. Hardware/12.Door Stopper.jpg',
            'Tower Bolt': 'assets/37. Hardware/13.Tower Bolt.jpg',
            'Magnetic Door Catcher': 'assets/37. Hardware/14.Magnetic Door Catcher.jpg',
            'Floor Spring': 'assets/37. Hardware/15.Floor Spring.jpg',
            'Patch Fitting': 'assets/37. Hardware/16.Patch Fitting.jpg',
            'Spider Fitting': 'assets/37. Hardware/17.Spider Fitting.jpg',
            'Shower Hinge': 'assets/37. Hardware/18.Shower Hinge.jpg',
            'Glass Connector': 'assets/37. Hardware/19.Glass Connector.jpg',
            'Curtain Track': 'assets/37. Hardware/20.Curtain Track.jpg',
            'Curtain Rod': 'assets/37. Hardware/21.Curtain Rod.jpg',
            'Sliding Door System': 'assets/37. Hardware/22.Sliding Door System.jpg'
          }
        });
        return;
      }

      // Sanitary Fittings premium routing
      if (id === 'sanitary') {
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: {
            'Floor Mounted WC': 'assets/41. Sanitary Fittings/1.Floor Mounted WC.jpg',
            'Wall Hung WC': 'assets/41. Sanitary Fittings/2.Wall Hung WC.jpg',
            'Countertop Wash Basin': 'assets/41. Sanitary Fittings/3.Countertop Wash Basin.jpg',
            'Wall Hung Wash Basin': 'assets/41. Sanitary Fittings/4.Wall Hung Wash Basin.jpg',
            'Full Pedestal Basin': 'assets/41. Sanitary Fittings/5.Full Pedestal Basin.jpg',
            'Under Counter Basin': 'assets/41. Sanitary Fittings/6.Under Counter Basin.jpg',
            'Basin Mixer Faucet': 'assets/41. Sanitary Fittings/7.Basin Mixer Faucet.jpg',
            'Tall Body Basin Mixer': 'assets/41. Sanitary Fittings/8.Tall Body Basin Mixer.jpg',
            'Wall Mounted Faucet': 'assets/41. Sanitary Fittings/9.Wall Mounted Faucet.jpg',
            'Health Faucet': 'assets/41. Sanitary Fittings/10.Health Faucet.jpg',
            'Wall Mounted Shower Head': 'assets/41. Sanitary Fittings/11.Wall Mounted Shower Head.jpg',
            'Overhead Rain Shower': 'assets/41. Sanitary Fittings/12.Overhead Rain Shower.jpg',
            'Ceiling Mounted Rain Shower': 'assets/41. Sanitary Fittings/13.Ceiling Mounted Rain Shower.jpg',
            'Hand Shower Set': 'assets/41. Sanitary Fittings/14.Hand Shower Set.jpg',
            'Exposed Shower Mixer': 'assets/41. Sanitary Fittings/15.Exposed Shower Mixer.jpg',
            'Thermostatic Shower Mixer': 'assets/41. Sanitary Fittings/16.Thermostatic Shower Mixer.jpg',
            'Shower Panel': 'assets/41. Sanitary Fittings/17.Shower Panel.jpg',
            'Body Jets': 'assets/41. Sanitary Fittings/18.Body Jets.jpg',
            'Waterfall Shower': 'assets/41. Sanitary Fittings/19.Waterfall Shower.jpg',
            'Steam Shower System': 'assets/41. Sanitary Fittings/20.Steam Shower System.jpg',
            'Digital Shower Control': 'assets/41. Sanitary Fittings/21.Digital Shower Control.jpg',
            'Freestanding Bathtub': 'assets/41. Sanitary Fittings/22.Freestanding Bathtub.jpg',
            'Built-In Bathtub': 'assets/41. Sanitary Fittings/23.Built-In Bathtub.jpg',
            'Urinal': 'assets/41. Sanitary Fittings/24.Urinal.jpg',
            'Sensor Faucet': 'assets/41. Sanitary Fittings/25.Sensor Faucet.jpg',
            'Flush Plate': 'assets/41. Sanitary Fittings/26.Flush Plate.jpg',
            'Floor Drain / Nahani Trap': 'assets/41. Sanitary Fittings/27.Floor Drain Nahani Trap.jpg',
            'Bottle Trap': 'assets/41. Sanitary Fittings/28.Bottle Trap. Perfect for basins where every element i___.jpg'
          }
        });
        return;
      }

      // Lights premium routing
      if (id === 'lights') {
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: {
            'LED Downlight (Recessed Light)': 'assets/38.Lights/1.LED Downlight.jpg',
            'COB Spotlight': 'assets/38.Lights/2.COB Spotlight.jpg',
            'Track Light': 'assets/38.Lights/3.Track Light.jpg',
            'LED Strip Light': 'assets/38.Lights/4.LED Strip Light.jpg',
            'Pendant Light': 'assets/38.Lights/5.Pendant Light.jpg',
            'Chandelier': 'assets/38.Lights/6.Chandelier.jpg',
            'Wall Sconce': 'assets/38.Lights/7.Wall Sconce.jpg',
            'Surface Mounted Downlight': 'assets/38.Lights/8.Surface Mounted Downlight.jpg',
            'Linear Light': 'assets/38.Lights/9.Concealed Linear Light.jpg',
            'Magnetic Track Lighting': 'assets/38.Lights/10.Magnetic Track Lighting.jpg',
            'Wall Washer Light': 'assets/38.Lights/11.Wall Washer Light.jpg',
            'Picture Light': 'assets/38.Lights/12.Picture Light.jpg',
            'Mirror Light': 'assets/38.Lights/13.Mirror Light.jpg',
            'Floor Lamp': 'assets/38.Lights/14.Floor Lamp.jpg',
            'Table Lamp': 'assets/38.Lights/15.Table Lamp.jpg',
            'Step Light': 'assets/38.Lights/16.Step Light.jpg'
          }
        });
        return;
      }

      // Switch Board premium routing
      if (id === 'switches') {
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: {
            'Basic Modular Switch Board': 'assets/39.Switch Board/1.Basic Modular Switch Board.jpg',
            'Premium Modular Switch Board': 'assets/39.Switch Board/2.Premium Modular Switch Board.jpg',
            'Touch Switch Board': 'assets/39.Switch Board/3.Touch Switch Board.jpg',
            'Wi-Fi Smart Switch Board': 'assets/39.Switch Board/4.Wi-Fi Smart Switch Board.jpg',
            'USB Charging Switch Board': 'assets/39.Switch Board/5.USB Charging Switch Board.jpg',
            'Pop-Up Socket Box': 'assets/39.Switch Board/6.Pop-Up Socket Box.jpg',
            'Floor Socket Box': 'assets/39.Switch Board/7.Floor Socket Box.jpg',
            'Weatherproof Switch Board (IP Rated)': 'assets/39.Switch Board/8.Weatherproof Switch Board.jpg',
            'Dimmer Switch Board': 'assets/39.Switch Board/9.Dimmer.jpg',
            'Motion Sensor Switch Board': 'assets/39.Switch Board/10.Motion Sensor Foot Light.jpg'
          }
        });
        return;
      }

      // Automation premium routing
      if (id === 'automation') {
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: {
            'Smart Lighting Automation': 'assets/40.Automation/1.Smart Lighting Automation.jpg',
            'Smart Switch Automation': 'assets/40.Automation/2.Smart Switch Automation.jpg',
            'Curtain & Blind Automation': 'assets/40.Automation/3.Curtain & Blind Automation.jpg',
            'Smart Home Hub / Controller': 'assets/40.Automation/4.Smart Home Hub Controller.jpg',
            'Voice Control Integration': 'assets/40.Automation/5.Voice Control Integration.jpg',
            'Motion Sensor Automation': 'assets/40.Automation/6.Motion Sensor Automation.jpg',
            'Smart HVAC / AC Automation': 'assets/40.Automation/7.Smart AC Automation.jpg',
            'Smart Thermostat': 'assets/40.Automation/8.Smart Thermostat.jpg',
            'Smart Door Lock System': 'assets/40.Automation/9.Smart Door Lock System.jpg'
          }
        });
        return;
      }

      // Laminates Finishes premium routing
      if (id === 'laminates-finish') {
        var lamFinishImgMap = {
          'Solid Color Laminate': 'assets/33. Laminate Finishes/Solid Colour Laminate.jpg',
          'Wood Grain Laminate': 'assets/33. Laminate Finishes/Wood Grain Laminate.jpg',
          'Marble Finish Laminate': 'assets/33. Laminate Finishes/Marble Finish Laminate.jpg',
          'Fabric Finish Laminate': 'assets/33. Laminate Finishes/Fabric Finish Laminate.jpg',
          'Metallic Finish Laminate': 'assets/33. Laminate Finishes/Metallic Finish Laminate.jpg',
          'Digital Printed Laminate': 'assets/33. Laminate Finishes/Digital Printed Laminate.jpg',
          'Cane Finish Laminate': 'assets/33. Laminate Finishes/Cane Finish Laminate.jpg',
          'Stone Finish Laminate': 'assets/33. Laminate Finishes/Stone Finish Laminate.jpg'
        };
        renderDataDrivenSection(el, {
          title: listData[id].title,
          section: id,
          tableItems: listData[id].tableItems,
          detailItems: listData[id].detailItems,
          imgMap: lamFinishImgMap,
          wrapperClass: 'laminate-finish-section'
        });
        return;
      }

      // Pre-populate explicit thumbnails for flooring
      if (id === 'flooring') {
        rowThumb['flooring:0'] = 'assets/30.Flooring/1. WPC.jpg';
        rowThumb['flooring:1'] = 'assets/30.Flooring/2.SPC Flooring.jpg';
        rowThumb['flooring:2'] = 'assets/30.Flooring/3.PVC Flooring.jpg';
        rowThumb['flooring:3'] = 'assets/30.Flooring/4.Laminate wood Flooring.jpg';
        rowThumb['flooring:4'] = 'assets/30.Flooring/5.Enginereed Wood Flooring.jpg';
        rowThumb['flooring:5'] = 'assets/30.Flooring/6.Solid Wood Flooring.jpg';
        rowThumb['flooring:6'] = 'assets/30.Flooring/7.Italian Marble Flooring.jpg';
        rowThumb['flooring:7'] = 'assets/30.Flooring/8.Indian Marble Flooring.jpg';
        rowThumb['flooring:8'] = 'assets/30.Flooring/9.Granite Flooring.jpg';
        rowThumb['flooring:9'] = 'assets/30.Flooring/10.Kota Stone flooring.jpg';
        rowThumb['flooring:10'] = 'assets/30.Flooring/11.Slate Stone Flooring.jpg';
        rowThumb['flooring:11'] = 'assets/30.Flooring/12.Limestone Flooring.jpg';
        rowThumb['flooring:12'] = 'assets/30.Flooring/13.Sandstone Flooring.jpg';
        rowThumb['flooring:13'] = 'assets/30.Flooring/14.Terrazzo Flooring.jpg';
        rowThumb['flooring:14'] = 'assets/30.Flooring/15.Cement IPS Flooring.jpg';
        rowThumb['flooring:15'] = 'assets/30.Flooring/16.Microcement Flooring.jpg';
        rowThumb['flooring:16'] = 'assets/30.Flooring/17.Epoxy Flooring.jpg';
        rowThumb['flooring:17'] = 'assets/30.Flooring/17.Ceramic Tiles.jpg';
        rowThumb['flooring:18'] = 'assets/30.Flooring/18.Vitrified Tiles.jpg';
        rowThumb['flooring:19'] = 'assets/30.Flooring/19.Porcelain Tiles.jpg';
        rowThumb['flooring:20'] = 'assets/30.Flooring/20.Bamboo Flooring.jpg';
        rowThumb['flooring:21'] = 'assets/30.Flooring/21.Cork Flooring.jpg';
        rowThumb['flooring:22'] = 'assets/30.Flooring/22.Concrete Polished Flooring.jpg';
        rowThumb['flooring:23'] = 'assets/30.Flooring/23.Metal Inlay flooring.jpg';
        rowThumb['flooring:24'] = 'assets/30.Flooring/24.Carpet Tiles.jpg';
        rowThumb['flooring:25'] = 'assets/30.Flooring/25.Rubber Gym Tiles.jpg';
        rowThumb['flooring:26'] = 'assets/30.Flooring/26.Artificial Turf.jpg';
      }
      // Pre-populate explicit thumbnails for ceiling
      if (id === 'ceiling') {
        rowThumb['ceiling:0'] = 'assets/31. False Ceiling/1.POP Ceiling.jpg';
        rowThumb['ceiling:1'] = 'assets/31. False Ceiling/2.Gypsum Board.jpg';
        rowThumb['ceiling:2'] = 'assets/31. False Ceiling/3.Calcium Silicate.jpg';
        rowThumb['ceiling:3'] = 'assets/31. False Ceiling/4.PVC Panels.jpg';
        rowThumb['ceiling:4'] = 'assets/31. False Ceiling/5.Aluminium GI.jpg';
        rowThumb['ceiling:5'] = 'assets/31. False Ceiling/6.Mineral.jpg';
        rowThumb['ceiling:6'] = 'assets/31. False Ceiling/7.Wooden Panels.jpg';
        rowThumb['ceiling:7'] = 'assets/31. False Ceiling/8.WPC.jpg';
        rowThumb['ceiling:8'] = 'assets/31. False Ceiling/9.Acoustic Panels.jpg';
        rowThumb['ceiling:9'] = 'assets/31. False Ceiling/10.Glass ceiling.jpg';
        rowThumb['ceiling:10'] = 'assets/31. False Ceiling/11.Stretch Ceiling.jpg';
        rowThumb['ceiling:11'] = 'assets/31. False Ceiling/12.Veneer ceiling.jpg';
        rowThumb['ceiling:12'] = 'assets/31. False Ceiling/13.Metal Baffle.jpg';
        rowThumb['ceiling:13'] = 'assets/31. False Ceiling/14.Clay Plaster.jpg';
        rowThumb['ceiling:14'] = 'assets/31. False Ceiling/15.Exposed Concrete.jpg';
        rowThumb['ceiling:15'] = 'assets/31. False Ceiling/16.Texture Paint.jpg';
        rowThumb['ceiling:16'] = 'assets/31. False Ceiling/17.Venetian Plaster.jpg';
        rowThumb['ceiling:17'] = 'assets/31. False Ceiling/18.Lime Wash.jpg';
        rowThumb['ceiling:18'] = 'assets/31. False Ceiling/19.Lime Plaster.jpg';
      }
      // Pre-populate explicit thumbnails for wall
      if (id === 'wall') {
        rowThumb['wall:0'] = 'assets/32.Wall/1.Texture Paint.jpg';
        rowThumb['wall:1'] = 'assets/32.Wall/2.PU Paint.jpg';
        rowThumb['wall:2'] = 'assets/32.Wall/3.Duco Paint.jpg';
        rowThumb['wall:3'] = 'assets/32.Wall/4.Emulsion Paint.jpg';
        rowThumb['wall:4'] = 'assets/32.Wall/5.Royale Paint.jpg';
        rowThumb['wall:5'] = 'assets/32.Wall/6.Satin Paint.jpg';
        rowThumb['wall:6'] = 'assets/32.Wall/7.Matt Paint.jpg';
        rowThumb['wall:7'] = 'assets/32.Wall/8.Metallic Paint.jpg';
        rowThumb['wall:8'] = 'assets/32.Wall/9.Stucco Finish.jpg';
        rowThumb['wall:9'] = 'assets/32.Wall/10.Concrete Finish Paint.jpg';
        rowThumb['wall:10'] = 'assets/32.Wall/11.Limewash Paint.jpg';
        rowThumb['wall:11'] = 'assets/32.Wall/12.Lime Plaster.jpg';
        rowThumb['wall:12'] = 'assets/32.Wall/13.Clay Plaster.jpg';
        rowThumb['wall:13'] = 'assets/32.Wall/14.Veneer Paneling.jpg';
        rowThumb['wall:14'] = 'assets/32.Wall/15.HDMR Paneling.jpg';
        rowThumb['wall:15'] = 'assets/32.Wall/16.Laminate Wall Paneling.jpg';
        rowThumb['wall:16'] = 'assets/32.Wall/17.MDF Jali Panels.jpg';
        rowThumb['wall:17'] = 'assets/32.Wall/18.CNC Cut Panels.jpg';
        rowThumb['wall:18'] = 'assets/32.Wall/19.Metal Wall Panels.jpg';
        rowThumb['wall:19'] = 'assets/32.Wall/20.PVC Wall Panels.jpg';
        rowThumb['wall:20'] = 'assets/32.Wall/21.WPC Panels.jpg';
        rowThumb['wall:21'] = 'assets/32.Wall/22.Decorative Wall Tiles.jpg';
        rowThumb['wall:22'] = 'assets/32.Wall/23.Marble Wall Cladding.jpg';
        rowThumb['wall:23'] = 'assets/32.Wall/24.Granite Wall Cladding.jpg';
        rowThumb['wall:24'] = 'assets/32.Wall/25.Slate stone.jpg';
        rowThumb['wall:25'] = 'assets/32.Wall/26.Quartzite Wall Cladding.jpg';
        rowThumb['wall:27'] = 'assets/32.Wall/27.Fabric Wall Panels.jpg';
        rowThumb['wall:28'] = 'assets/32.Wall/28.Acoustic Panels.jpg';
        rowThumb['wall:29'] = 'assets/32.Wall/29.Venetian Plaster.jpg';
        rowThumb['wall:30'] = 'assets/32.Wall/30.Microcement.jpg';
        rowThumb['wall:31'] = 'assets/32.Wall/31.Fluted Panels.jpg';
        rowThumb['wall:32'] = 'assets/32.Wall/32.Charcoal Panels.jpg';
        rowThumb['wall:33'] = 'assets/32.Wall/33.HPL Wall Cladding.jpg';
        rowThumb['wall:34'] = 'assets/32.Wall/34.Stone Veneer Panels.jpg';
        rowThumb['wall:35'] = 'assets/32.Wall/35.3D Wall Panels.jpg';
        rowThumb['wall:36'] = 'assets/32.Wall/36.Upholstered Panels.jpg';
        rowThumb['wall:37'] = 'assets/32.Wall/37.Liquid Metal Finish.jpg';
        rowThumb['wall:38'] = 'assets/32.Wall/38.Wallpaper.jpg';
      }

      if (tableData[id]) {
        const d = tableData[id];
        const isRoomFinishesTable = ['flooring', 'wall', 'ceiling', 'overview'].indexOf(id) >= 0;
        const tableWrapClass = isRoomFinishesTable ? 'room-finishes-wrap' : 'table-wrap table-responsive custom-table';
        const tableClass = isRoomFinishesTable ? 'room-finishes-table' : 'table custom-table-inner detail-tbl';
        el.innerHTML = `
        <div class="sec-head">
          <span class="sec-title">${d.title}</span>
          <span class="sec-count">${d.rows.length} materials</span>
        </div>
        ${imgRow(id)}
        <div class="${tableWrapClass}"><table class="${tableClass}" data-id="${id}">
          <thead><tr><th style="width:50px">Photo</th>${d.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
          <tbody>${d.rows.map((r, ri) => `<tr>
            ${thumbTD(id, ri, r[2] || r[1] || '')}
            ${isRoomFinishesTable ? (
            id === 'overview' ? [
            `<td class="t-name">${r[0]}</td>`,
            `<td class="t-price">${r[1]}</td>`,
            `<td class="t-brand">${r[2]}</td>`
          ].join('') : [
            `<td><span class="badge">${r[0]}</span></td>`,
            `<td class="t-name">${r[2]}</td>`,
            `<td class="t-price">${r[4]}</td>`,
            `<td>${r[3]}</td>`,
            `<td>${r[6]}</td>`,
            `<td class="t-brand">${r[5]}</td>`
          ]) : r.map((cell, i) => {
            if (i === 0) return `<td><span class="badge">${cell}</span></td>`;
            if (i === 1) return `<td class="t-cat">${cell}</td>`;
            if (i === 2) return `<td class="t-name">${cell}</td>`;
            if (i === 4) return `<td class="t-price">${cell}</td>`;
            if (i === 5) return `<td class="t-brand">${cell}</td>`;
            return `<td>${cell}</td>`;
          }).join('')}
          </tr>`).join('')}</tbody>
        </table></div>`;
      } else if (listData[id]) {
        const d = listData[id];
        const isFurniture = ['study', 'dresser', 'wardrobe', 'wardrobe-must', 'tvunit', 'limewash', 'limeplaster', 'venetian', 'microcement', 'clay', 'metallic'].indexOf(id) >= 0;
        const needThumb = ['study', 'dresser', 'tvunit', 'wardrobe', 'wardrobe-must', 'exp-look', 'limewash', 'limeplaster', 'venetian', 'microcement', 'clay', 'metallic'].indexOf(id) >= 0;

        var stGridHtml = '';
        if (id === 'sidetable') {
          stGridHtml = '<div class="st-grid-row">';
          for (var g = 0; g < 4; g++) {
            var gsrc = rowThumb['sidetable_grid:' + g];
            if (gsrc) stGridHtml += '<img class="st-grid-img" src="' + gsrc + '" alt="Side Table Finishes" loading="lazy" onclick="lbOpen(this.src,\'Side Table Finishes\')">';
          }
          stGridHtml += '</div>';
        }


        var thCols = (needThumb ? '<th style="width:50px">&#x1F4F7;</th>' : '') + '<th style="width:36px">#</th><th>Material / Finish</th>';
        if (isFurniture) thCols += '<th>Cost</th><th>Thickness</th><th>Pros</th><th>Cons</th><th>Best Use</th>';

        var rows = d.items.map(function (it, i) {
          var parts = it.split('||');
          var name = parts[0] || it;
          var cost = parts[1] || '';
          var thick = parts[2] || '';
          var install = parts[3] || '';
          var maint = parts[4] || '';
          var pros = parts[5] || '';
          var cons = parts[6] || '';
          var bestuse = parts[7] || '';
          var hasParts = parts.length > 1;
          var tr = '<tr>';
          if (needThumb) tr += thumbTD(id, i, name);
          tr += '<td><span class="list-num">' + String(i + 1).padStart(2, '0') + '</span></td>';
          tr += '<td class="td-name">' + name;
          if (hasParts) {
            if (!isFurniture) {
              tr += '<div class="item-meta">' + (cost ? '<span class="meta-cost">' + cost + '</span>' : '') + (thick ? ' <span class="meta-lbl">Thickness:</span> ' + thick : '') + '</div>';
              tr += '<div class="item-detail">' + (install ? '<div><b>Install:</b> ' + install + '</div>' : '') + (maint ? '<div><b>Maintenance:</b> ' + maint + '</div>' : '') + (pros ? '<div><b>Pros:</b> ' + pros + '</div>' : '') + (cons ? '<div><b>Cons:</b> ' + cons + '</div>' : '') + (bestuse ? '<div><b>Best Use:</b> ' + bestuse + '</div>' : '') + '</div>';
            } else {
              if (install || maint) tr += '<div class="item-detail" style="font-size:11px;color:#666;margin-top:4px">' + (install ? '<b>Install:</b> ' + install + '<br>' : '') + (maint ? '<b>Maintenance:</b> ' + maint : '') + '</div>';
            }
          }
          tr += '</td>';
          if (isFurniture) {
            tr += '<td class="td-cost">' + cost + '</td>';
            tr += '<td style="font-size:11px;color:#555">' + thick + '</td>';
            tr += '<td class="td-pros">' + pros + '</td>';
            tr += '<td class="td-cons">' + cons + '</td>';
            tr += '<td class="td-use">' + bestuse + '</td>';
          }
          tr += '</tr>';
          return tr;
        }).join('');

        el.innerHTML = '<div class="sec-head"><span class="sec-title">' + d.title + '</span><span class="sec-count">' + d.items.length + ' finishes</span></div>'
          + (id === 'sidetable' || id === 'dresser' ? '' : imgRow(id)) + stGridHtml
          + '<div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner ' + (isFurniture ? 'detail-tbl' : '') + '"><thead><tr>' + thCols + '</tr></thead><tbody>' + rows + '</tbody></table></div>';
      } else if (compareData[id]) {
        const d = compareData[id];
        el.innerHTML = `
        <div class="sec-head"><span class="sec-title">${d.title}</span></div>
        ${imgRow(id)}
        <div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner compare-table">
          <thead><tr>${d.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
          <tbody>${d.rows.map(r => `<tr>${r.map(c => `<td>${c.replace(/\n/g, '<br>')}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>`;
      } else {
        el.innerHTML = `<div class="no-results"><h3>Coming Soon</h3><p>This section is being updated.</p></div>`;
      }
    }

    // -- Render a simple comparison table --
    function renderSimpleTable(el, title, tableD) {
      el.innerHTML = `
      <div class="sec-head">
        <span class="sec-title">${title}</span>
        <span class="sec-count">${tableD.rows.length} types</span>
      </div>
      <div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner">
        <thead><tr>${tableD.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
        <tbody>${tableD.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>`;
    }

    // -- Render a merged category: table on top + list below --
    function renderMerged(el, title, tableD, listD, tableId) {
      el.innerHTML = `
      <div class="sec-head">
        <span class="sec-title">${title}</span>
        <span class="sec-count">${tableD.rows.length} types</span>
      </div>
      ${typeof tableId === 'string' ? '' : tableId}
      <div class="table-wrap" style="margin-bottom:28px"><table>
        <thead><tr><th style="width:50px">Photo</th>${tableD.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
        <tbody>${tableD.rows.map((r, ri) => `<tr>
          ${thumbTD(tableId, ri, r[2] || r[1] || '')}
          ${r.map((cell, i) => {
        if (i === 0) return `<td><span class="badge">${cell}</span></td>`;
        if (i === 1) return `<td class="t-cat">${cell}</td>`;
        if (i === 2) return `<td class="t-name">${cell}</td>`;
        if (i === 4) return `<td class="t-price">${cell}</td>`;
        if (i === 5) return `<td class="t-brand">${cell}</td>`;
        return `<td>${cell}</td>`;
      }).join('')}
        </tr>`).join('')}</tbody>
      </table></div>
      <div class="sec-head" style="margin-top:8px">
        <span class="sec-title" style="font-size:20px">${title} – Detailed Guide</span>
      </div>
      <div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner">
        <thead><tr><th>#</th><th>Material / Details</th></tr></thead>
        <tbody>${listD.items.map((it, i) => `<tr>
          <td><span class="list-num">${String(i + 1).padStart(2, '0')}</span></td>
          <td class="t-name">${it}</td>
        </tr>`).join('')}</tbody>
      </table></div>`;
    }

    // -- Render a merged category: two lists combined --
    function renderMergedLists(el, title, listA, listB, imgs) {
      const combined = [...listA.items, ...listB.items];
      el.innerHTML = `
      <div class="sec-head">
        <span class="sec-title">${title}</span>
        <span class="sec-count">${combined.length} types</span>
      </div>
      ${typeof tableId === 'string' ? '' : tableId}
      <div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner">
        <thead><tr><th>#</th><th>Type / Finish</th></tr></thead>
        <tbody>${combined.map((it, i) => `<tr>
          <td><span class="list-num">${String(i + 1).padStart(2, '0')}</span></td>
          <td class="t-name">${it}</td>
        </tr>`).join('')}</tbody>
      </table></div>`;
    }

    // -- Render Laminates page with detailed tables only --


    // -- Render Colour Combination grid (image + title cards) --
    function renderColorComboGrid(el, id, images) {
      var d = listData[id];
      if (!d) return;
      var items = d.items || [];
      var title = d.title;
      var html = '<div class="sec-head"><span class="sec-title">' + title + '</span><span class="sec-count">' + items.length + ' combinations</span></div>';
      html += '<div class="color-combo-grid">';
      for (var i = 0; i < items.length; i++) {
        var name = items[i];
        var num = String(i + 1).padStart(2, '0');
        var imgSrc = (images && images[i]) || 'assets/1.Cover Images/coming soon.jpg';
        html += '<div class="color-combo-card">';
        html += '<div class="color-combo-img-wrap">';
        html += '<img src="' + imgSrc + '" alt="' + name.replace(/'/g, '') + '" loading="lazy" onclick="colorComboZoomOpen(this.src,\'' + name.replace(/'/g, '') + '\')">';
        html += '<div class="color-combo-overlay"></div>';
        html += '</div>';
        html += '<div class="color-combo-title">';
        html += '<span class="color-combo-srno">' + num + '</span>';
        html += name;
        html += '</div>';
        html += '</div>';
      }
      html += '</div>';
      html += '<div class="color-combo-lightbox" id="colorComboLightbox" onclick="colorComboZoomClose()">';
      html += '<span class="color-combo-lb-close">&times;</span>';
      html += '<img id="colorComboLbImg" src="" alt="">';
      html += '<div class="color-combo-lb-cap" id="colorComboLbCap"></div>';
      html += '</div>';
      el.innerHTML = html;
    }

    /* -- Render Furniture figma grid cards -- */
    function renderFurnitureFigmaGrid(el, id) {
      var d = listData[id];
      if (!d) return;
      var items = d.items || [];
      var title = d.title;
      var html = '<div class="furniture-premium"><div class="sec-head"><span class="sec-title">' + title + '</span><span class="sec-count">' + items.length + ' finishes</span></div>';
      html += '<div class="furniture-figma-grid">';
      for (var i = 0; i < items.length; i++) {
        var parts = items[i].split('||');
        var name = parts[0] || items[i];
        var cost = parts[1] || '';
        var thick = parts[2] || '';
        var install = parts[3] || '';
        var maint = parts[4] || '';
        var pros = parts[5] || '';
        var cons = parts[6] || '';
        var bestuse = parts[7] || '';
        html += '<div class="furniture-figma-card">';
        html += '<div class="furniture-figma-img-wrap">';
        html += '<img src="assets/1.Cover Images/coming soon.jpg" alt="' + name.replace(/'/g, '') + '" loading="lazy" onclick="furnitureFigmaZoom(this.src,\'' + name.replace(/'/g, '') + '\')">';
        html += '<div class="furniture-figma-overlay"></div>';
        html += '</div>';
        html += '<div class="furniture-figma-title">' + name + '</div>';
        html += '<div class="furniture-figma-details">';
        if (cost) html += '<div class="furniture-figma-row"><span class="furniture-figma-label">Cost</span><span class="furniture-figma-value">' + cost + '</span></div>';
        if (thick) html += '<div class="furniture-figma-row"><span class="furniture-figma-label">Thickness</span><span class="furniture-figma-value">' + thick + '</span></div>';
        if (install) html += '<div class="furniture-figma-row"><span class="furniture-figma-label">Install</span><span class="furniture-figma-value">' + install + '</span></div>';
        if (maint) html += '<div class="furniture-figma-row"><span class="furniture-figma-label">Maintenance</span><span class="furniture-figma-value">' + maint + '</span></div>';
        if (pros) html += '<div class="furniture-figma-row"><span class="furniture-figma-label">Pros</span><span class="furniture-figma-value pros">' + pros + '</span></div>';
        if (cons) html += '<div class="furniture-figma-row"><span class="furniture-figma-label">Cons</span><span class="furniture-figma-value cons">' + cons + '</span></div>';
        if (bestuse) html += '<div class="furniture-figma-row"><span class="furniture-figma-label">Best Use</span><span class="furniture-figma-value">' + bestuse + '</span></div>';
        html += '</div></div>';
      }
      html += '</div>';
      html += '<div class="figma-lightbox" id="furnitureFigmaLightbox" onclick="furnitureFigmaZoomClose()">';
      html += '<span class="figma-lb-close">&times;</span>';
      html += '<img id="furnitureFigmaLbImg" src="" alt="">';
      html += '<div class="figma-lb-cap" id="furnitureFigmaLbCap"></div>';
      html += '</div></div>';
      el.innerHTML = html;
    }

    /* -- Render Kitchen figma grid cards -- */
    function renderKitchenFigmaGrid(el, id) {
      var d = listData[id];
      if (!d) return;
      var items = d.detailItems || [];
      if (!items.length) items = d.items || [];
      var title = d.title;
      var count = items.length;
      var html = '<div class="furniture-premium"><div class="sec-head"><span class="sec-title">' + title + '</span><span class="sec-count">' + count + ' options</span></div>';
      html += '<div class="kitchen-figma-grid">';
      for (var i = 0; i < items.length; i++) {
        var det = items[i];
        var name = det.title || (typeof det === 'string' ? det.split('||')[0] : ('Option ' + (i + 1)));
        html += '<div class="kitchen-figma-card">';
        html += '<div class="kitchen-figma-img-wrap">';
        html += '<img src="assets/1.Cover Images/coming soon.jpg" alt="' + name.replace(/'/g, '') + '" loading="lazy" onclick="kitchenFigmaZoom(this.src,\'' + name.replace(/'/g, '') + '\')">';
        html += '<div class="kitchen-figma-overlay"></div>';
        html += '</div>';
        html += '<div class="kitchen-figma-title">' + name + '</div>';
        html += '<div class="kitchen-figma-details">';
        var rows = det.rows || [];
        for (var ri = 0; ri < rows.length; ri++) {
          var r = rows[ri];
          var label, value, cls;
          if (Array.isArray(r)) { label = r[0]; value = r[1]; }
          else { label = r.label; value = r.value; cls = r.cls; }
          var valClass = cls ? ' class="' + cls + '"' : '';
          html += '<div class="kitchen-figma-row"><span class="kitchen-figma-label">' + label + '</span><span class="kitchen-figma-value"' + valClass + '>' + value + '</span></div>';
        }
        html += '</div></div>';
      }
      html += '</div>';
      html += '<div class="figma-lightbox" id="kitchenFigmaLightbox" onclick="kitchenFigmaZoomClose()">';
      html += '<span class="figma-lb-close">&times;</span>';
      html += '<img id="kitchenFigmaLbImg" src="" alt="">';
      html += '<div class="figma-lb-cap" id="kitchenFigmaLbCap"></div>';
      html += '</div></div>';
      el.innerHTML = html;
    }

    function openDynamicCard(card) {
      document.getElementById('homeView').style.display = 'none';
      document.getElementById('searchView').style.display = 'none';
      document.getElementById('detailView').style.display = 'block';
      document.getElementById('heroBanner').style.display = 'none';
      window.scrollTo(0, 0);

      const el = document.getElementById('detailContent');

      if (card.template === 'top10') {
        renderTop10New(el, { data: card, isAdmin: true });
        return;
      }

      if (card.template === 'table') {
        const cols = card.columns.split(',');
        const rows = card.rows.split('\n');
        el.innerHTML = `
        <div class="sec-head">
          <span class="sec-title">${card.name}</span>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                ${cols.map(col => `<th>${col}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => {
          const cells = row.split(',');
          return `<tr>
                  ${cells.map(cell => `<td>${cell}</td>`).join('')}
                </tr>`;
        }).join('')}
            </tbody>
          </table>
        </div>`;
        return;
      }

      el.innerHTML = `
      <div class="sec-head">
        <span class="sec-title">${card.name}</span>
      </div>
      <div class="detail-card">
        <div class="detail-card-head">
          <h3>${card.name}</h3>
        </div>
        <div class="detail-card-body">
          <div class="d-row">
            <div class="d-label">MATERIAL</div>
            <div class="d-value">${card.material || '-'}</div>
          </div>
          <div class="d-row">
            <div class="d-label">THICKNESS</div>
            <div class="d-value">${card.thickness || '-'}</div>
          </div>
          <div class="d-row">
            <div class="d-label">BRANDS</div>
            <div class="d-value">${card.brands || '-'}</div>
          </div>
          <div class="d-row">
            <div class="d-label">PROS</div>
            <div class="d-value">${card.pros || '-'}</div>
          </div>
          <div class="d-row">
            <div class="d-label">CONS</div>
            <div class="d-value">${card.cons || '-'}</div>
          </div>
        </div>
      </div>`;
    }

    function goHome() {
      document.getElementById('homeView').style.display = 'block';
      document.getElementById('detailView').style.display = 'none';
      document.getElementById('searchView').style.display = 'none';
      document.getElementById('heroBanner').style.display = 'block';
      document.getElementById('searchInput').value = '';
      window.scrollTo(0, 0);
    }

    function filterCats(tag, btn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      goHome();
      renderCats(tag);
    }

    function openComingSoon(name) {
      const el = document.getElementById('detailContent');
      document.getElementById('homeView').style.display = 'none';
      document.getElementById('searchView').style.display = 'none';
      document.getElementById('detailView').style.display = 'block';
      document.getElementById('heroBanner').style.display = 'none';
      window.scrollTo(0, 0);
      el.innerHTML = `
      <div class="sec-head">
        <span class="sec-title">${name}</span>
      </div>
      <div style="text-align:center;padding:80px 20px;background:#f8f9fa;border-radius:12px;margin:40px 0;">
        <div style="font-size:48px;margin-bottom:16px;">🔜</div>
        <div style="font-size:24px;font-weight:600;color:#333;margin-bottom:8px;">Coming Soon</div>
        <div style="color:#666;">This section is being updated. Check back soon!</div>
      </div>`;
    }

    function handleSearch(q) {
      if (!q.trim()) { goHome(); return; }
      document.getElementById('homeView').style.display = 'none';
      document.getElementById('detailView').style.display = 'none';
      document.getElementById('searchView').style.display = 'block';
      document.getElementById('heroBanner').style.display = 'none';

      const qL = q.toLowerCase();
      const hits = [];

      Object.values(tableData).forEach(d => d.rows.forEach(row => {
        if (row.some(c => String(c).toLowerCase().includes(qL)))
          hits.push({ type: 'table', title: d.title, cols: d.cols, row });
      }));
      Object.values(listData).forEach(d => {
        var searchItems = d.items || (d.tableItems || []).concat(d.detailItems || []);
        searchItems.forEach(function (item) {
          if (typeof item === 'string') {
            if (item.toLowerCase().includes(qL))
              hits.push({ type: 'list', title: d.title, item: item });
          } else if (item && item.title) {
            var matched = item.title.toLowerCase().includes(qL) || item.rows.some(function (r) { return (r.value || r[1] || '').toLowerCase().includes(qL); });
            if (matched)
              hits.push({ type: 'list', title: d.title, item: item.title + ' \u2013 ' + (item.rows[0] ? item.rows[0].value : '') });
          }
        });
      });

      document.getElementById('searchMeta').textContent = `${hits.length} result${hits.length !== 1 ? 's' : ''} for "${q}"`;

      if (!hits.length) {
        document.getElementById('searchContent').innerHTML = `<div class="no-results"><h3>No results found</h3><p>Try a different material name, brand, or finish type.</p></div>`;
        return;
      }

      const grouped = {};
      hits.forEach(h => { if (!grouped[h.title]) grouped[h.title] = []; grouped[h.title].push(h); });

      document.getElementById('searchContent').innerHTML = Object.entries(grouped).map(([title, items]) => `
      <div class="material-section" style="margin-bottom:36px">
        <div class="sec-head"><span class="sec-title">${title}</span><span class="sec-count">${items.length} match${items.length !== 1 ? 'es' : ''}</span></div>
        <div class="table-wrap table-responsive custom-table"><table class="table custom-table-inner">
          ${items[0].type === 'table' ? `<thead><tr>${items[0].cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>` : ''}
          <tbody>${items.map(it => it.type === 'table'
        ? `<tr>${it.row.map((c, i) => i === 2 ? `<td class="t-name">${c}</td>` : i === 4 ? `<td class="t-price">${c}</td>` : `<td>${c}</td>`).join('')}</tr>`
        : `<tr><td class="t-name">${it.item}</td></tr>`
      ).join('')}</tbody>
        </table></div>
      </div>`).join('');
    }
    function runCounterAnimation() {
    const counters = document.querySelectorAll('.count-up');
    if (counters.length > 0) {
      const animateCounters = () => {
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          const hasPlus = counter.innerText.includes('+');
          let count = 0;
          let startTime = null;
          const duration = 2000; // 2 seconds for full animation

          const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out quadratic for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 2);
            count = target * easeProgress;

            counter.innerText = Math.floor(count) + (hasPlus ? '+' : '');

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target + (hasPlus ? '+' : '');
            }
          };

          requestAnimationFrame(updateCount);
        });
      };

      // Run animation after a short delay for better visual effect
      setTimeout(animateCounters, 800);
    }
}

    /* ================================================================
       FURNITURE SINGLE TABLE — renders one premium card per item
       (door, bed, headboard, sidetable)
       ================================================================ */
    function renderFurnitureSingleTable(el, config) {
      var items = config.detailItems || [];
      var imgMap = config.imgMap || {};
      var section = config.section || '';

      function getImg(name, item) { return (item && item.image) || imgMap[name] || ''; }

      var html = '<div class="furniture-single-table">';
      html += '<div class="furniture-section-header">';
      html += '<div class="furniture-section-title">' + config.title + '</div>';
      html += '<div class="furniture-section-count">' + items.length + ' Materials</div>';
      html += '</div>';

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var name = item.title;
        var imgSrc = getImg(name, item);
        if (imgSrc) console.log('[furniture-image] ' + section + ' / ' + name + ' -> ' + imgSrc);
        html += '<div class="furniture-card">';
        html += '<div class="furniture-card-img"><div class="spec-image-label">Image</div><img src="' + imgSrc + '" alt="' + name + '" loading="lazy" onclick="furnitureOpenZoom(this.src)" onerror="this.style.display=\'none\'"></div>';
        html += '<div class="furniture-card-detail">';
        html += '<div class="furniture-card-title">' + name + '</div>';
        html += '<div class="furniture-rows">';
        for (var ri = 0; ri < item.rows.length; ri++) {
          var r = item.rows[ri];
          var label, value, cls;
          if (Array.isArray(r)) { label = r[0]; value = r[1]; }
          else { label = r.label; value = r.value; cls = r.cls; }
          var valClass = cls ? ' class="' + cls + '"' : '';
          html += '<div class="furniture-row"><span class="furniture-label">' + label + '</span><span class="furniture-value"' + valClass + '>' + value + '</span></div>';
        }
        html += '</div></div></div>';
      }

      html += '</div>';
      html += '<div class="furniture-lb" id="furnitureLb" onclick="furnitureCloseZoom()">';
      html += '<img id="furnitureLbImg" src="" alt="zoom">';
      html += '</div>';
      el.innerHTML = html;
      window.scrollTo(0, 0);
    }

    /* ================================================================
       KITCHEN SINGLE TABLE — renders one premium card per item
       (kitchen-shutter, kitchen-must)
       ================================================================ */
    function renderKitchenSingleTable(el, config) {
      var items = config.detailItems || [];
      var imgMap = config.imgMap || {};

      function getImg(name) { return imgMap[name] || ''; }

      var html = '<div class="kitchen-single-table">';
      html += '<div class="kitchen-section-header">';
      html += '<div class="kitchen-section-title">' + config.title + '</div>';
      html += '<div class="kitchen-section-count">' + items.length + ' Materials</div>';
      html += '</div>';

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var name = item.title;
        var imgSrc = getImg(name);
        html += '<div class="kitchen-card">';
        html += '<div class="kitchen-card-img"><div class="spec-image-label">Image</div><img src="' + imgSrc + '" alt="' + name + '" loading="lazy" onclick="kitchenOpenZoom(this.src)" onerror="this.style.display=\'none\'"></div>';
        html += '<div class="kitchen-card-detail">';
        html += '<div class="kitchen-card-title">' + name + '</div>';
        html += '<div class="kitchen-rows">';
        for (var ri = 0; ri < item.rows.length; ri++) {
          var r = item.rows[ri];
          var label, value, cls;
          if (Array.isArray(r)) { label = r[0]; value = r[1]; }
          else { label = r.label; value = r.value; cls = r.cls; }
          var valClass = cls ? ' class="' + cls + '"' : '';
          html += '<div class="kitchen-row"><span class="kitchen-label">' + label + '</span><span class="kitchen-value"' + valClass + '>' + value + '</span></div>';
        }
        html += '</div></div></div>';
      }

      html += '</div>';
      html += '<div class="kitchen-lb" id="kitchenLb" onclick="kitchenCloseZoom()">';
      html += '<img id="kitchenLbImg" src="" alt="zoom">';
      html += '</div>';
      el.innerHTML = html;
      window.scrollTo(0, 0);
    }

    /* ================================================================
       NEW "Materials That Look Expensive" render function (independent)
       ================================================================ */
    function renderNewExpLook(el) {
      var html = `
      <div class="exp-look-new">
        <div class="section">
          <div class="section-header">
            <div class="section-title">
              Materials That Look <span>₹50L+</span> But Cost Under <span>₹50K</span>
            </div>
            <div class="top-label">3 Materials</div>
          </div>
          <div class="table-wrapper">
            <table>
              <colgroup>
                <col class="col-image">
                <col class="col-sno">
                <col class="col-material">
                <col class="col-cost">
                <col class="col-thk">
                <col class="col-places">
                <col class="col-brands">
              </colgroup>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>#</th>
                  <th>Material</th>
                  <th>Cost (Sq.Ft)</th>
                  <th>Thk<br><span style="text-transform:none;letter-spacing:0.5px;white-space:nowrap">(mm)</span></th>
                  <th>Best Places to Use</th>
                  <th>Brands</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="img-cell">
                    <img src="assets/2.Materials%20that%20look%20expensive/Textured%20Decorative%20%26%20Venetian%20Plaster%20Paint.jpg" alt="Venetian Plaster" loading="lazy" onclick="expNewZoom(this.src)">
                  </td>
                  <td class="sno-cell">1</td>
                  <td class="material-cell">Venetian Plaster Paint</td>
                  <td class="cost-cell">₹180 – ₹350</td>
                  <td class="thk-cell">1–3</td>
                  <td class="places-cell">Living room and bedroom accent walls, hotel lobbies, luxury bathrooms, foyer, reception</td>
                  <td class="brands-cell">Vasari India</td>
                </tr>
                <tr>
                  <td class="img-cell">
                    <img src="assets/2.Materials%20that%20look%20expensive/Marble-Finish%20Tiles.jpg" alt="Marble Finish Tiles" loading="lazy" onclick="expNewZoom(this.src)">
                  </td>
                  <td class="sno-cell">2</td>
                  <td class="material-cell">Marble-Finish Tiles</td>
                  <td class="cost-cell">₹90+</td>
                  <td class="thk-cell">8–10</td>
                  <td class="places-cell">Living room floors, bathroom walls, kitchen backsplash</td>
                  <td class="brands-cell">Kajaria, Somany, Nitco</td>
                </tr>
                <tr>
                  <td class="img-cell">
                    <img src="assets/2.Materials%20that%20look%20expensive/Premium%20Finish%20Laminates.jpg" alt="Premium Finish Laminates" loading="lazy" onclick="expNewZoom(this.src)">
                  </td>
                  <td class="sno-cell">3</td>
                  <td class="material-cell">Premium Laminate Finish</td>
                  <td class="cost-cell">₹200+</td>
                  <td class="thk-cell">0.8–1.5</td>
                  <td class="places-cell">TV units, wardrobes, kitchen cabinets, accent panels</td>
                  <td class="brands-cell">Royale Touche Luxury Laminates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="section detail-section">
          <div class="detail-section-header">
            <div class="detail-section-title">Material Detail Specification</div>
            <div class="detail-section-count">3 Materials</div>
          </div>

          <div class="spec-card">
            <div class="spec-image-col">
              <div class="spec-image-label">Image</div>
              <img src="assets/2.Materials%20that%20look%20expensive/Textured%20Decorative%20%26%20Venetian%20Plaster%20Paint.jpg" alt="Textured Decorative &amp; Venetian Plaster Paint" loading="lazy" onclick="expNewZoom(this.src)">
            </div>
            <div class="spec-table-col">
              <div class="spec-title-bar">
                <h2>Venetian Plaster Paint</h2>
              </div>
              <div class="spec-rows">
                <div class="spec-row">
                  <div class="spec-label">Description</div>
                  <div class="spec-value">Luxurious textured marble-like wall finish</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Raw Material Cost</div>
                  <div class="spec-value">₹180 – ₹350 / sq.ft</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Thickness Required</div>
                  <div class="spec-value">1–3 mm finished texture coat on prepared wall.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Installation Process</div>
                  <div class="spec-value">Prep wall (repair/primer) → apply base coat → apply texture/Venetian layers → seal with protective finish.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Maintenance</div>
                  <div class="spec-value">Wipe dust lightly, reseal every few years to preserve sheen.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">✓ Pros</div>
                  <div class="spec-value"><span class="pros">1. Creates luxurious depth like stone or polished plaster, elevating feature walls.<br>2. Can be customized with colour, sheen, and vein patterns to mimic high-end finishes.</span></div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">✕ Cons</div>
                  <div class="spec-value"><span class="cons">1. Requires skilled applicator for premium finish.<br>2. Not ideal for high-moisture areas without proper sealing.</span></div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Best Places to Use</div>
                  <div class="spec-value">Living room and bedroom accent walls, hotel lobbies, luxury bathrooms, foyer, reception</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Recommended Brands</div>
                  <div class="spec-value">Vasari India</div>
                </div>
              </div>
            </div>
          </div>

          <div class="spec-card">
            <div class="spec-image-col">
              <div class="spec-image-label">Image</div>
              <img src="assets/2.Materials%20that%20look%20expensive/Marble-Finish%20Tiles.jpg" alt="Marble-Finish Tiles" loading="lazy" onclick="expNewZoom(this.src)">
            </div>
            <div class="spec-table-col">
              <div class="spec-title-bar">
                <h2>Marble-Finish Tiles</h2>
              </div>
              <div class="spec-rows">
                <div class="spec-row">
                  <div class="spec-label">Description</div>
                  <div class="spec-value">Elegant marble-look durable floor tiles</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Raw Material Cost</div>
                  <div class="spec-value">₹90 / sq.ft onwards</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Thickness Required</div>
                  <div class="spec-value">8–10 mm tile thickness.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Installation Process</div>
                  <div class="spec-value">Lay tiles on pre-prepared screed with adhesive → grout joints → seal if matte finish.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Maintenance</div>
                  <div class="spec-value">Mop with mild detergent; avoid harsh acids on polished surfaces.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">✓ Pros</div>
                  <div class="spec-value"><span class="pros">1. Realistic marble aesthetic at a fraction of stone cost and no upkeep of real stone.<br>2. Durable for floors/walls and available in many vein styles.</span></div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">✕ Cons</div>
                  <div class="spec-value"><span class="cons">1. Can feel cold without rugs or soft materials.<br>2. Grout lines still visible unless large format used.</span></div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Best Places to Use</div>
                  <div class="spec-value">Living room floors, bathroom walls, kitchen backsplash.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Recommended Brands</div>
                  <div class="spec-value">Kajaria, Somany, Nitco</div>
                </div>
              </div>
            </div>
          </div>

          <div class="spec-card">
            <div class="spec-image-col">
              <div class="spec-image-label">Image</div>
              <img src="assets/2.Materials%20that%20look%20expensive/Premium%20Finish%20Laminates.jpg" alt="Premium Finish Laminates" loading="lazy" onclick="expNewZoom(this.src)">
            </div>
            <div class="spec-table-col">
              <div class="spec-title-bar">
                <h2>Premium Laminate Finish</h2>
              </div>
              <div class="spec-rows">
                <div class="spec-row">
                  <div class="spec-label">Description</div>
                  <div class="spec-value">Sleek, durable surface finish that enhances aesthetics, easy maintenance and long-lasting performance.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Raw Material Cost</div>
                  <div class="spec-value">₹200 / sq.ft onwards for high-finish decorative laminates</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Thickness Required</div>
                  <div class="spec-value">0.8 mm – 1.5 mm</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Installation Process</div>
                  <div class="spec-value">Laminate sheets are bonded to substrates (ply/MDF) with adhesive; edges banded for finish.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Maintenance</div>
                  <div class="spec-value">Wipe with a soft damp cloth; avoid abrasive cleaners.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">✓ Pros</div>
                  <div class="spec-value"><span class="pros">1. Wide range of textures — stone, wood, gloss, matte.<br>2. Durable, scratch-resistant surfaces with easy cleaning.</span></div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">✕ Cons</div>
                  <div class="spec-value"><span class="cons">1. Looks less rich than real wood or lacquer if viewed closely.<br>2. Thin laminates can peel if bonded poorly or exposed to moisture.</span></div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Best Places to Use</div>
                  <div class="spec-value">TV units, wardrobes, kitchen cabinets, accent panels.</div>
                </div>
                <div class="spec-row">
                  <div class="spec-label">Recommended Brands</div>
                  <div class="spec-value">Royale Touche Luxury Laminates</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="exp-lb" id="expNewLightbox" onclick="this.classList.remove('active')">
          <img id="expNewLightboxImg" src="" alt="zoom">
        </div>
      </div>`;

      el.innerHTML = html;
      // Scroll top after rendering
      window.scrollTo(0, 0);
    }

    function renderTop10New(el, opts) {
      var data = opts && opts.data;
      var isAdmin = opts && opts.isAdmin;
      var tableItems = [];
      var detailItems = [];

      if (isAdmin && data && data.top10Data && data.top10Columns) {
        var cols = data.top10Columns;
        var raw = data.top10Data;
        for (var ai = 0; ai < raw.length; ai++) {
          var entry = raw[ai];
          var imageUrl = entry.image || '';
          var title = entry.title || '';
          var fields = entry.fields || {};
          tableItems.push({
            name: title, image: imageUrl, isAdmin: true,
            cost: fields[cols[1]] || '', thick: fields[cols[2]] || '',
            bestuse: fields[cols[7]] || '', brands: fields[cols[8]] || ''
          });
          detailItems.push({
            name: title, image: imageUrl, isAdmin: true,
            desc: entry.desc || entry.description || '',
            cost: fields[cols[1]] || '', thick: fields[cols[2]] || '',
            install: fields[cols[3]] || '', maint: fields[cols[4]] || '',
            pros: fields[cols[5]] || '', cons: fields[cols[6]] || '',
            bestuse: fields[cols[7]] || '', brands: fields[cols[8]] || ''
          });
        }
      } else if (data) {
        var hasExplicitTable = !!data.tableItems;
        var tableSrc = data.tableItems || data.items || [];
        var detailSrc = data.detailItems || data.items || [];
        for (var ti = 0; ti < tableSrc.length; ti++) {
          var tp = tableSrc[ti].split('||');
          tableItems.push({
            name: tp[0] || '', cost: tp[1] || '', thick: tp[2] || '',
            bestuse: hasExplicitTable ? (tp[3] || '') : (tp[7] || ''),
            brands: hasExplicitTable ? (tp[4] || '') : (tp[8] || ''),
            image: '', isAdmin: false
          });
        }
        for (var di = 0; di < detailSrc.length; di++) {
          var dp = detailSrc[di].split('||');
          detailItems.push({
            name: dp[0] || '', desc: dp[1] || '', cost: dp[2] || '', thick: dp[3] || '',
            install: dp[4] || '', maint: dp[5] || '', pros: dp[6] || '',
            cons: dp[7] || '', bestuse: dp[8] || '', brands: dp[9] || '',
            image: '', isAdmin: false
          });
        }
      }

      var top10ImgMap = {
        'Liquid Metallic Ombre': 'assets/3. Top 10 Materials/Liquid Metallic Ombre.jpg',
        'Alabaster Lights': 'assets/3. Top 10 Materials/Alabaster Lights.jpg',
        'Microcement': 'assets/3. Top 10 Materials/Microcement.jpg',
        'Artistic Acoustic Panels': 'assets/3. Top 10 Materials/Artistic Acoustic Panels.jpg',
        'Textured Lime Plaster': 'assets/3. Top 10 Materials/Textured Lime Plaster.jpg',
        '3D Artwork': 'assets/3. Top 10 Materials/3D ARTWORK.jpg',
        'Optical Fibre Fabric': 'assets/3. Top 10 Materials/OPTICAL FIBRE FABRIC (LUMINOUS TEXTILE).jpg',
        'Venetian Plaster': 'assets/3. Top 10 Materials/VENETIAN PLASTER (POLISHED PLASTER FINISH).jpg',
        'Flexible MDF Curves': 'assets/3. Top 10 Materials/FLEXIBLE MDF CURVES.jpg',
        'Wall Acoustic Fluted Panels': 'assets/3. Top 10 Materials/SOUND PROOF WALL ACCOUSTIC FLUTED PANELS.jpg'
      };
      function top10Img(name) { return top10ImgMap[name] || ''; }

      var html = '<div class="top10-new">';

      // Top Summary Table
      html += '<div class="section">';
      html += '<div class="section-header">';
      html += '<div class="section-title">';
      html += 'Top 10 <span>Materials</span> 2026';
      html += '</div>';
      html += '<div class="top-label">' + tableItems.length + ' Materials</div>';
      html += '</div>';
      html += '<div class="table-wrapper">';
      html += '<table>';
      html += '<colgroup>';
      html += '<col class="col-image">';
      html += '<col class="col-sno">';
      html += '<col class="col-material">';
      html += '<col class="col-cost">';
      html += '<col class="col-thk">';
      html += '<col class="col-places">';
      html += '<col class="col-brands">';
      html += '</colgroup>';
      html += '<thead>';
      html += '<tr>';
      html += '<th>Image</th>';
      html += '<th>#</th>';
      html += '<th>Material</th>';
      html += '<th>Cost (Sq.Ft)</th>';
      html += '<th>Thk<br><span style="text-transform:none;letter-spacing:0.5px;white-space:nowrap">(mm)</span></th>';
      html += '<th>Best Places to Use</th>';
      html += '<th>Brands</th>';
      html += '</tr>';
      html += '</thead>';
      html += '<tbody>';

      for (var si = 0; si < tableItems.length; si++) {
        var it = tableItems[si];
        var imgSrc = it.image || top10Img(it.name);
        html += '<tr>';
        html += '<td class="img-cell">';
        html += '<img src="' + imgSrc + '" alt="' + it.name + '" loading="lazy" onclick="top10Zoom(this.src)" onerror="this.style.display=\'none\'">';
        html += '</td>';
        html += '<td class="sno-cell">' + (si + 1) + '</td>';
        html += '<td class="material-cell">' + it.name + '</td>';
        html += '<td class="cost-cell">' + it.cost + '</td>';
        html += '<td class="thk-cell">' + it.thick + '</td>';
        html += '<td class="places-cell">' + it.bestuse + '</td>';
        html += '<td class="brands-cell">' + it.brands + '</td>';
        html += '</tr>';
      }

      html += '</tbody>';
      html += '</table>';
      html += '</div>';
      html += '</div>';

      // Detail Specification Section
      html += '<div class="section detail-section">';
      html += '<div class="detail-section-header">';
      html += '<div class="detail-section-title">Material Detail Specification</div>';
      html += '<div class="detail-section-count">' + detailItems.length + ' Materials</div>';
      html += '</div>';

      for (var di = 0; di < detailItems.length; di++) {
        var ci = detailItems[di];
        var detImg = ci.image || top10Img(ci.name);

        html += '<div class="spec-card">';
        html += '<div class="spec-image-col">';
        html += '<div class="spec-image-label">Image</div>';
        html += '<img src="' + detImg + '" alt="' + ci.name + '" loading="lazy" onclick="top10Zoom(this.src)" onerror="this.style.display=\'none\'">';
        html += '</div>';
        html += '<div class="spec-table-col">';
        html += '<div class="spec-title-bar">';
        html += '<h2>' + ci.name + '</h2>';
        html += '</div>';
        html += '<div class="spec-rows">';
        html += '<div class="spec-row"><div class="spec-label">Description</div><div class="spec-value">' + ci.desc + '</div></div>';
        html += '<div class="spec-row"><div class="spec-label">Raw Material Cost</div><div class="spec-value">' + ci.cost + '</div></div>';
        html += '<div class="spec-row"><div class="spec-label">Thickness Required</div><div class="spec-value">' + ci.thick + '</div></div>';
        html += '<div class="spec-row"><div class="spec-label">Installation Process</div><div class="spec-value">' + ci.install + '</div></div>';
        html += '<div class="spec-row"><div class="spec-label">Maintenance</div><div class="spec-value">' + ci.maint + '</div></div>';
        html += '<div class="spec-row"><div class="spec-label">\u2713 Pros</div><div class="spec-value"><span class="pros">' + ci.pros + '</span></div></div>';
        html += '<div class="spec-row"><div class="spec-label">\u2715 Cons</div><div class="spec-value"><span class="cons">' + ci.cons + '</span></div></div>';
        html += '<div class="spec-row"><div class="spec-label">Best Places to Use</div><div class="spec-value">' + ci.bestuse + '</div></div>';
        html += '<div class="spec-row"><div class="spec-label">Recommended Brands</div><div class="spec-value">' + ci.brands + '</div></div>';
        html += '</div></div></div>';
      }

      html += '</div>';

      // Lightbox
      html += '<div class="top10-lb" id="top10Lightbox" onclick="this.classList.remove(\'active\')">';
      html += '<img id="top10LightboxImg" src="" alt="zoom">';
      html += '</div>';
      html += '</div>';

      el.innerHTML = html;
      window.scrollTo(0, 0);
    }

    function renderDataDrivenSection(el, config) {
      var hasExplicitTable = !!config.tableItems;
      var tableSrc = config.tableItems || config.items || [];
      var detailSrc = config.detailItems || config.items || [];
      var imgMap = config.imgMap || {};
      var section = config.section || '';
      var count = config.count || (tableSrc.length + ' Materials');
      function getImg(name) { return imgMap[name] || getImagePath(section, name); }
      var tableRaw = [];
      for (var ti = 0; ti < tableSrc.length; ti++) {
        var tp = tableSrc[ti].split('||');
        tableRaw.push({
          name: tp[0] || '', cost: tp[1] || '', thick: tp[2] || '',
          bestuse: hasExplicitTable ? (tp[3] || '') : (tp[7] || ''),
          brands: hasExplicitTable ? (tp[4] || '') : (tp[8] || '')
        });
      }
      var isDetailObject = detailSrc.length > 0 && typeof detailSrc[0] === 'object';
      var detailItems = [];
      if (isDetailObject) {
        detailItems = detailSrc;
      } else {
        for (var dgi = 0; dgi < detailSrc.length; dgi++) {
          var dp = detailSrc[dgi].split('||');
          detailItems.push({
            name: dp[0] || '', cost: dp[1] || '', thick: dp[2] || '',
            install: dp[3] || '', maint: dp[4] || '', pros: dp[5] || '',
            cons: dp[6] || '', bestuse: dp[7] || '', brands: dp[8] || ''
          });
        }
      }
      var wrapClass = config.wrapperClass || '';
      var html = '<div class="exp-look-new' + (wrapClass ? ' ' + wrapClass : '') + '">';
      html += '<div class="section">';
      html += '<div class="section-header">';
      html += '<div class="section-title">' + config.title + '</div>';
      html += '<div class="top-label">' + count + '</div>';
      html += '</div>';
      html += '<div class="table-wrapper"><table>';
      html += '<colgroup><col class="col-image"><col class="col-sno"><col class="col-material"><col class="col-cost"><col class="col-thk"><col class="col-places"><col class="col-brands"></colgroup>';
      html += '<thead><tr><th>Image</th><th>#</th><th>Material</th><th>Cost (Sq.Ft)</th><th>Thk<br><span style="text-transform:none;letter-spacing:0.5px;white-space:nowrap">(mm)</span></th><th>Best Places to Use</th><th>Brands</th></tr></thead><tbody>';
      for (var si = 0; si < tableRaw.length; si++) {
        var it = tableRaw[si];
        var imgSrc = getImg(it.name);
        html += '<tr>';
        html += '<td class="img-cell"><img src="' + imgSrc + '" alt="' + it.name + '" loading="lazy" onclick="expNewZoom(this.src)" onerror="this.style.display=\'none\'"></td>';
        html += '<td class="sno-cell">' + (si + 1) + '</td>';
        html += '<td class="material-cell">' + it.name + '</td>';
        html += '<td class="cost-cell">' + it.cost + '</td>';
        html += '<td class="thk-cell">' + it.thick + '</td>';
        html += '<td class="places-cell">' + it.bestuse + '</td>';
        html += '<td class="brands-cell">' + it.brands + '</td>';
        html += '</tr>';
      }
      html += '</tbody></table></div></div>';
      html += '<div class="section detail-section">';
      html += '<div class="detail-section-header">';
      html += '<div class="detail-section-title">Material Detail Specification</div>';
      html += '<div class="detail-section-count">' + detailItems.length + ' Materials</div>';
      html += '</div>';
      for (var di = 0; di < detailItems.length; di++) {
        var detItem = detailItems[di];
        var name = isDetailObject ? detItem.title : detItem.name;
        var detImg = getImg(name);
        html += '<div class="spec-card">';
        html += '<div class="spec-image-col"><div class="spec-image-label">Image</div><img src="' + detImg + '" alt="' + name + '" loading="lazy" onclick="expNewZoom(this.src)" onerror="this.style.display=\'none\'"></div>';
        html += '<div class="spec-table-col">';
        html += '<div class="spec-title-bar"><h2>' + name + '</h2></div>';
        html += '<div class="spec-rows">';
        if (isDetailObject) {
          for (var ri = 0; ri < detItem.rows.length; ri++) {
            var r = detItem.rows[ri];
            var label, value, cls;
            if (Array.isArray(r)) { label = r[0]; value = r[1]; }
            else { label = r.label; value = r.value; cls = r.cls; }
            html += '<div class="spec-row"><div class="spec-label">' + label + '</div><div class="spec-value">' + (cls ? '<span class="' + cls + '">' + value + '</span>' : value) + '</div></div>';
          }
        } else {
          html += '<div class="spec-row"><div class="spec-label">Raw Material Cost</div><div class="spec-value">' + detItem.cost + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">Thickness Required</div><div class="spec-value">' + detItem.thick + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">Installation Process</div><div class="spec-value">' + detItem.install + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">Maintenance</div><div class="spec-value">' + detItem.maint + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">Best Places to Use</div><div class="spec-value">' + detItem.bestuse + '</div></div>';
          html += '<div class="spec-row"><div class="spec-label">\u2713 Pros</div><div class="spec-value"><span class="pros">' + detItem.pros + '</span></div></div>';
          html += '<div class="spec-row"><div class="spec-label">\u2715 Cons</div><div class="spec-value"><span class="cons">' + detItem.cons + '</span></div></div>';
          html += '<div class="spec-row"><div class="spec-label">Recommended Brands</div><div class="spec-value">' + detItem.brands + '</div></div>';
        }
        html += '</div></div></div>';
      }
      html += '</div>';
      html += '<div class="exp-lb" id="expNewLightbox" onclick="this.classList.remove(\'active\')">';
      html += '<img id="expNewLightboxImg" src="" alt="zoom">';
      html += '</div>';
      html += '</div>';
      el.innerHTML = html;
      window.scrollTo(0, 0);
    }

    function top10Zoom(src) {
      var lb = document.getElementById('top10Lightbox');
      var img = document.getElementById('top10LightboxImg');
      if (lb && img) {
        img.src = src;
        lb.classList.add('active');
      }
    }

    function expNewZoom(src) {
      var lb = document.getElementById('expNewLightbox');
      var img = document.getElementById('expNewLightboxImg');
      if (lb && img) {
        img.src = src;
        lb.classList.add('active');
      }
    }
    function furnitureOpenZoom(src) {
      var lb = document.getElementById('furnitureLb');
      var img = document.getElementById('furnitureLbImg');
      if (lb && img) {
        img.src = src;
        lb.classList.add('active');
      }
    }
    function furnitureCloseZoom() {
      var lb = document.getElementById('furnitureLb');
      if (lb) lb.classList.remove('active');
    }
    function kitchenOpenZoom(src) {
      var lb = document.getElementById('kitchenLb');
      var img = document.getElementById('kitchenLbImg');
      if (lb && img) {
        img.src = src;
        lb.classList.add('active');
      }
    }
    function kitchenCloseZoom() {
      var lb = document.getElementById('kitchenLb');
      if (lb) lb.classList.remove('active');
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.exp-lb.active, .spec-lb.active, .top10-lb.active, .furniture-lb.active, .kitchen-lb.active').forEach(function (el) {
          el.classList.remove('active');
        });
      }
    });

window.initMaterialLibrary = async function() {
  await loadCategories();
  if (typeof runCounterAnimation === 'function') runCounterAnimation();
};
