# Little Ms Designer — Material Library
## COMPLETE EDITING & CONTENT MANAGEMENT MANUAL
---

This manual is written in a beginner-friendly, step-by-step format specifically designed for non-technical clients to update, edit, and expand the **Interior Designer's Material Library** application without breaking the website's layout, responsive behaviors, or styling.

> [!IMPORTANT]
> **Primary Rule for Editing:** Always make a backup copy of `index.html` (e.g., duplicate it and name it `index_backup.html`) before making any edits. If anything goes wrong, you can restore your backup in seconds.

---

## TABLE OF CONTENTS
1. [Safe Editing Practices & Tools](#1-safe-editing-practices--tools)
2. [Files Directory & Structural Overview](#2-files-directory--structural-overview)
3. [The Core Table Data Structures](#3-the-core-table-data-structures)
4. [Step-by-Step Guides for Common Tasks](#4-step-by-step-guides-for-common-tasks)
   * [How to Edit Table Content](#how-to-edit-table-content)
   * [How to Add a Row](#how-to-add-a-row)
   * [How to Delete a Row](#how-to-delete-a-row)
   * [How to Add a Column](#how-to-add-a-column)
   * [How to Delete a Column](#how-to-delete-a-column)
   * [How to Edit Table Header Names](#how-to-edit-table-header-names)
   * [How to Add a New Category Card / Duplicate Existing Cards](#how-to-add-a-new-category-card--duplicate-existing-cards)
5. [The Image Management System](#5-the-image-management-system)
   * [Where Images Are Stored](#where-images-are-stored)
   * [Naming Format & Extensions](#naming-format--extensions)
   * [Why Images Fail (and How to Fix Them)](#why-images-fail-and-how-to-fix-them)
   * [How the Lightbox / Fullscreen Popup Works](#how-the-lightbox--fullscreen-popup-works)
6. [CSS Styling & Responsiveness Guide](#6-css-styling--responsiveness-guide)
7. [Detailed Breakdown by Category (All 8 Modules)](#7-detailed-breakdown-by-category)
   * [Room Finishes](#room-finishes)
   * [Natural Finishes](#natural-finishes)
   * [Civil Materials](#civil-materials)
   * [Carpentry Materials](#carpentry-materials)
   * [Furniture](#furniture)
   * [Kitchen](#kitchen)
   * [Bathroom](#bathroom)
   * [Colour Combinations](#colour-combinations)
8. [Files That Should Never Be Touched](#8-files-that-should-never-be-touched)

---

## 1. SAFE EDITING PRACTICES & TOOLS
To edit the library's content, you only need a standard text editor. 

* **Recommended Editor:** Use **VS Code** (Visual Studio Code) or **Notepad++**. Do **not** use Microsoft Word or WordPad, as they inject hidden formatting codes that will break the website.
* **JSON Syntax Rules:** When editing lists or database structures (JSON/JavaScript objects), make sure:
  * Every item in a list (array) is separated by a comma (`,`).
  * The last item in a list **must not** have a comma after it.
  * All text values must be enclosed in straight quotes: `"text"` or `'text'`. Never use curly/smart quotes (`“` or `”`) copied from Word or email.

---

## 2. FILES DIRECTORY & STRUCTURAL OVERVIEW
The project is built as a single-page app containing all data, styles, and routing inside a main page, plus a support structure:

```
Ongoing - Dynamic/
├── index.html            <-- Main user application (contains 99% of styles & content)
├── categories.json       <-- Configures the cards displayed on the home page dashboard
├── cms-viewer.html       <-- Viewer tool for dynamic CMS data
├── cms-renderer.js       <-- Helper rendering engine for CMS templates
├── cms-bridge.js         <-- Interfaces local storage and CMS data templates
├── admin.html            <-- CMS admin dashboard (for staging content changes)
└── assets/               <-- Physical folder where all images and videos are stored
```

---

## 3. THE CORE TABLE DATA STRUCTURES
Inside [index.html](file:///c:/Users/navne/Documents/CODDING/Ongoing%20projects/Ongoing%20-%20Dynamic/index.html) (from line 6646 to 10008), the content is stored in four main JavaScript objects/variables:

### A. `tableData` (starts at line 6646)
Used for standard grid tables (e.g., Flooring Finishes).
* **Format:**
```javascript
const tableData = {
  category_id: {
    title: 'Display Title',
    cols: ['Header 1', 'Header 2', ...],
    rows: [
      [1, 'Category Value', 'Material Name', 'Thickness', 'Price', 'Brands', 'Where to Use'],
      ...
    ]
  }
};
```

### B. `listData` (starts at line 7068)
Used for complex panels containing a summary table at the top and a detailed "Material Detail Specification Card" for every row below it.
* **Format:** Items are stored as strings separated by double pipes (`||`):
```javascript
category_id: {
  title: 'Display Title',
  items: [
    'Material Name||Cost||Thickness||Installation Process||Maintenance||Pros||Cons||Best Places to Use||Recommended Brands',
    ...
  ]
}
```
* **Field Order Reference:**
  1. **Index 0:** Material Name (e.g., `Laminate Finish`)
  2. **Index 1:** Cost (e.g., `₹80 – ₹300 / sq.ft`)
  3. **Index 2:** Thickness (e.g., `16–18 mm`)
  4. **Index 3:** Installation Process (e.g., `Glue & press sheets`)
  5. **Index 4:** Maintenance (e.g., `Wipe with damp cloth`)
  6. **Index 5:** Pros (automatically styled green)
  7. **Index 6:** Cons (automatically styled red)
  8. **Index 7:** Best Places to Use (e.g., `Bedrooms`)
  9. **Index 8:** Recommended Brands (e.g., `Greenlam, Merino`)

### C. `detailData` (starts at line 6858)
Used for natural finishes (e.g., Limewash, Microcement) displaying text rows.
* **Format:**
```javascript
microcement: {
  title: 'Microcement', 
  props: [
    { l: 'Label Name (e.g., Cost)', v: 'Value Details (e.g., ₹180 - ₹450)' },
    ...
  ]
}
```

### D. `compareData` (starts at line 6968)
Used for side-by-side comparison tables.
* **Format:**
```javascript
'marble-vs-tiles': {
  title: 'Comparison: Marble vs Tiles',
  cols: ['Category', 'Marble', 'Tiles'],
  rows: [
    ['Durability', 'Very durable but porous', 'Highly durable and stain-proof'],
    ...
  ]
}
```

---

## 4. STEP-BY-STEP GUIDES FOR COMMON TASKS

### HOW TO EDIT TABLE CONTENT
1. Open [index.html](file:///c:/Users/navne/Documents/CODDING/Ongoing projects/Ongoing - Dynamic/index.html) in your text editor.
2. Locate the category ID block by searching (Ctrl+F) for the category name (e.g., `flooring:` or `sidetable:`).
3. Find the text you want to edit (e.g., changing a price or brand name).
4. Edit the text inside the quotes, making sure not to remove the single quotes (`'`) or double pipes (`||`).
5. Save the file.

---

### HOW TO ADD A ROW
Adding a row depends on which data structure the category uses.

#### Case A: If editing a Standard Table (`tableData` like Flooring, Wall, Ceiling)
1. Find the target category (e.g., `flooring` at line 6647).
2. Go to the end of the `rows` list.
3. Add a comma after the last row, then copy, paste, and edit the block:

##### Before:
```javascript
          [26, 'Rubber Flooring', 'Rubber Gym Tiles', '8–20 mm', '₹200 – ₹600 / sq.ft', 'Duraflor', 'Gyms'],
          [27, 'Turf Flooring', 'Artificial Turf', '10–20 mm pile', '₹120 – ₹350 / sq.ft', 'Field Turf', 'Balconies'] // Last row (no comma)
        ]
```

##### After:
```javascript
          [26, 'Rubber Flooring', 'Rubber Gym Tiles', '8–20 mm', '₹200 – ₹600 / sq.ft', 'Duraflor', 'Gyms'],
          [27, 'Turf Flooring', 'Artificial Turf', '10–20 mm pile', '₹120 – ₹350 / sq.ft', 'Field Turf', 'Balconies'], // Added comma here
          [28, 'New Category', 'My New Material', '12 mm', '₹150 / sq.ft', 'Brand X', 'Living Rooms'] // New row (no comma)
        ]
```
4. Save the file.

#### Case B: If editing a Detail/Specification Panel (`listData` like Furniture & Carpentry)
1. Locate the category inside `listData` (e.g., `study` at line 7818).
2. Go to the end of the `items` array, add a comma to the last string, and paste a new formatted line:

##### Before:
```javascript
        items: [
          'Laminate Finish||₹80 – ₹300||...',
          'Leatherette Finish||₹400 – ₹1200||...' // Last item (no comma)
        ]
```

##### After:
```javascript
        items: [
          'Laminate Finish||₹80 – ₹300||...',
          'Leatherette Finish||₹400 – ₹1200||...', // Added comma here
          'My New Finish||₹150 – ₹300||12 mm||Steps to install||Wipe clean||High strength||High cost||Offices||Brand Name' // New row (no comma)
        ]
```
3. Save the file.

> [!WARNING]
> Ensure you include all 8 double-pipes (`||`) in a `listData` row string. Leaving fields out will cause details to display in the wrong columns. If you have no data for a field, leave it blank but keep the pipes (e.g., `Name||Price||Thk|||||||Use`).

---

### HOW TO DELETE A ROW
1. Locate the row array or string inside `index.html`.
2. Select the entire row (including brackets or surrounding quote marks) and delete it.
3. Check the item before the deleted row:
   * If the deleted row was in the middle of the list, do nothing.
   * If the deleted row was the last item, make sure you **remove the trailing comma** from the new last item.
4. Save the file.

---

### HOW TO ADD A COLUMN
Columns are configured under the `cols` array of a category. Adding a column requires editing both the header definition and every row in that category.

#### Example: Adding a "Warranty" column to `flooring` table:
1. Locate `tableData.flooring` (line 6647).
2. In the `cols` array, add your new column title at the end:
```javascript
cols: ['#', 'Category', 'Material', 'Thickness', 'Price Range', 'Recommended Brands', 'Where to Use', 'Warranty'],
```
3. Update **every single row** inside `rows` to include a matching value at the end of its array:
```javascript
// Old row:
[1, 'Outdoor Flooring', 'WPC Deck Flooring', '20–25 mm', '₹350 – ₹900', 'Inovar', 'Balconies'],

// Updated row:
[1, 'Outdoor Flooring', 'WPC Deck Flooring', '20–25 mm', '₹350 – ₹900', 'Inovar', 'Balconies', '5 Years'],
```
4. Save the file.

---

### HOW TO DELETE A COLUMN
1. Locate the category in `tableData` or `listData`.
2. Delete the column name from the `cols` array.
3. Delete the corresponding index cell from **every row** in the array:
```javascript
// Before (Deleting 'Thickness' at Index 3):
[1, 'Outdoor Flooring', 'WPC Deck', '20–25 mm', '₹350 – ₹900', 'Inovar', 'Balconies'],

// After:
[1, 'Outdoor Flooring', 'WPC Deck', '₹350 – ₹900', 'Inovar', 'Balconies'],
```
4. Save the file.

---

### HOW TO EDIT TABLE HEADER NAMES
1. Find the `cols` array inside the target category (e.g., `tableData.flooring.cols` at line 6649).
2. Change the text inside the single quotes:
```javascript
// Before:
cols: ['#', 'Category', 'Material', 'Thickness', 'Price Range', 'Recommended Brands', 'Where to Use'],

// After (changing 'Material' to 'Finish Type'):
cols: ['#', 'Category', 'Finish Type', 'Thickness', 'Price Range', 'Recommended Brands', 'Where to Use'],
```
3. Save the file.

---

### HOW TO ADD A NEW CATEGORY CARD / DUPLICATE EXISTING CARDS
To add a new category card on the home screen:

1. Open [categories.json](file:///c:/Users/navne/Documents/CODDING/Ongoing%20projects/Ongoing%20-%20Dynamic/categories.json).
2. Add a new category configuration object at the bottom. Be sure to assign a unique `"id"` (e.g., `"my-custom-material"`) and choose one of the existing tags (`"trendy"`, `"natural"`, `"finishes"`, `"civil"`, `"carpentry"`, `"furniture"`, `"electrical"`, `"paint"`, `"kitchen"`, or `"bathroom"`):
```json
  {
    "id": "my-custom-material",
    "img": "assets/1.Cover Images/coming soon.jpg",
    "name": "My Custom Material",
    "desc": "A descriptive subtitle of the material details",
    "tag": "carpentry",
    "cnt": "5 materials"
  }
```
3. Open [index.html](file:///c:/Users/navne/Documents/CODDING/Ongoing%20projects/Ongoing%20-%20Dynamic/index.html).
4. Add the corresponding table or list data inside `tableData` or `listData` under your new ID (e.g. `my-custom-material`):
```javascript
const tableData = {
  ...
  'my-custom-material': {
    title: 'My Custom Material Guide',
    cols: ['#', 'Material', 'Price', 'Use Case'],
    rows: [
      [1, 'Standard Glossy', '₹150 / sq.ft', 'Living Rooms'],
      [2, 'Super Matte Premium', '₹300 / sq.ft', 'Kitchen Shutters']
    ]
  }
}
```
5. Map the category folder in the `FOLDER_MAP` (line 6484) inside [index.html](file:///c:/Users/navne/Documents/CODDING/Ongoing%20projects/Ongoing%20-%20Dynamic/index.html) so it knows where to look for images:
```javascript
IMAGE_SETTINGS.FOLDER_MAP: {
  ...
  "my-custom-material": "24. Laminates" // links folder "assets/24. Laminates"
}
```
6. Save both files.

---

## 5. THE IMAGE MANAGEMENT SYSTEM

### WHERE IMAGES ARE STORED
All images are located inside the `assets/` directory. Within assets, they are sorted into folders named according to their category:
* Cover images shown on the homepage grid are in: `assets/1.Cover Images/`
* Material thumbnails shown inside tables or specification cards are in category-specific folders (e.g., `assets/18. Marbles/`, `assets/19. Tiles/`, `assets/24. Laminates/`).

---

### NAMING FORMAT & EXTENSIONS
* **File Types:** The system only supports `.jpg`, `.jpeg`, and `.png` image formats.
* **Homepage Cover Images:** Must be named exactly as mapped inside the `IMAGE_SETTINGS.COVERS` object in `index.html` (line 6433).
* **Table Material Images:** The image filename must match the **Material/Finish name** exactly as typed in the data rows.
  * **Example:** If the material name in the row is `'WPC Deck Flooring'`, the image inside the mapped category folder must be named `WPC Deck Flooring.jpg` (or `.png`).
  * File names are case-sensitive on web servers. Ensure matching capitalization.

---

### WHY IMAGES FAIL (AND HOW TO FIX THEM)
If an image fails to load or shows a broken icon:
1. **Wrong Folder Mapping:** Check that the category ID is correctly mapped to its folder name under `IMAGE_SETTINGS.FOLDER_MAP` (line 6484).
2. **Mismatch in File Name:** Ensure the file name in your `assets` subfolder matches the material name in your code exactly, word-for-word, space-for-space (e.g. check for trailing spaces).
3. **Incorrect Extension:** Ensure the file extension matches. The system defaults to `.jpg` for automatic resolving. If your file is a `.png`, you must add an override in the javascript router.
4. **Javascript Image Map Override Missing:** If the category has a hardcoded `imgMap` override in the detail router (lines 10027–10345), you must edit the mapping there.
   * *Example:* If you added a new marble type in `italian-marbles`, go to line 10055 and append your new mapping:
     ```javascript
     'My New Marble': 'assets/18. Marbles/My New Marble.jpg'
     ```

---

### HOW THE LIGHTBOX / FULLSCREEN POPUP WORKS
1. When a user clicks a thumbnail, the `onclick` attribute triggers a zoom function (e.g., `expNewZoom()`, `furnitureOpenZoom()`, `kitchenOpenZoom()`, or `lbOpen()`).
2. The function clones the image URL into a hidden modal container (`<div>` elements like `#lmd-lb`, `#furnitureLb`, `#top10Lightbox`).
3. It adds the `.active` class to the lightbox wrapper, making it visible as a dark overlay.
4. Clicking anywhere on the screen or pressing the `Escape` key removes the `.active` class, closing the lightbox.

---

## 6. CSS STYLING & RESPONSIVENESS GUIDE

### WHICH CLASSES CONTROL WHICH TABLES
* `.room-finishes-table`: Controls Room Finishes (Flooring, Wall, Ceiling). Scoped to look compact and structured.
* `.detail-tbl`: Controls standard tables inside other categories.
* `.compare-table`: Controls comparison tables, styling alternative column backgrounds.
* `.exp-look-new table`: Controls the custom 7-column layout tables (Expensive Look, Top 10, etc.).

---

### MIN-WIDTH USAGE & OVERFLOW-X
To prevent tables from breaking on small mobile screens, the project uses horizontal scrolling containers:
* **Wrapper Class:** `.table-wrap`, `.table-responsive`, and `.exp-responsive` act as scrolling viewports.
* **Rule:** If the table's contents exceed the screen width, these containers display a horizontal scrollbar. The table's `min-width` (e.g. `min-width: 800px`) maintains row readability without compressing text into vertical squiggles.

---

### MOBILE BREAKPOINTS & FONT SCALING
The style system scales layout sizes dynamically at various screen widths:
* **`@media (min-width: 1200px)`**: Large desktop displays. (Large margins, standard font sizes 13px–15px).
* **`@media (max-width: 1199px) and (min-width: 1024px)`**: Small laptops & tablets.
* **`@media (max-width: 1023px) and (min-width: 768px)`**: Portrait tablets.
* **`@media (max-width: 767px) and (min-width: 600px)`**: Large mobile phones.
* **`@media (max-width: 599px) and (min-width: 480px)`**: Standard mobile devices.
* **`@media (max-width: 479px)`**: Extra-small mobile screens (fonts scale down to `7px`–`9px` inside tables to avoid scrolling).

---

### MOBILE TABLE AUTO-SCALING SCRIPT
A self-running JavaScript function called `fitTableMobile` (line 6355) runs in the background. It measures standard tables on mobile devices (width <= 768px) and uses CSS scaling (`transform: scaleX()`) to shrink tables slightly so they fit cleanly onto phone screens.

---

## 7. DETAILED BREAKDOWN BY CATEGORY

Here is the exact mapping of data, styling, and image assets for all 8 categories:

---

### ROOM FINISHES
Includes: *Flooring Finishes, Wall Finishes, False Ceiling Finishes*

* **Where Data Exists:** Inside the `tableData.flooring`, `tableData.wall`, and `tableData.ceiling` objects in [index.html](file:///c:/Users/navne/Documents/CODDING/Ongoing%20projects/Ongoing%20-%20Dynamic/index.html) (lines 6647–6749).
* **Where Images Are Stored:**
  * Flooring: `assets/17.Natural Materials/`
  * Wall: `assets/17.Natural Materials/`
  * Ceiling: `assets/3.False Ceiling Finishes/`
* **Where Table Structure Exists:** Generated dynamically in `index.html` inside `openDynamicCard` (line 10424). It builds a `<table>` structured with columns: `Photo`, `#`, `Category`, `Material`, `Thickness`, `Price Range`, `Recommended Brands`, and `Where to Use`.
* **CSS Responsiveness:** Handled by `.room-finishes-wrap` (line 2738) and `.room-finishes-table` (line 2764) media queries (lines 2909–3037).
* **CSS Fonts:** Controlled by `.room-finishes-table td` and `.room-finishes-table th`. Font family is `Inter` (sans-serif).
* **CSS Image Sizing:** Controlled by `.room-finishes-table .row-img` (line 2861), which sets thumbnails to `38px` × `38px` (desktop) and scales down to `30px` × `30px` (mobile).
* **CSS Modal Popup:** Uses the universal `#lmd-lb` lightbox modal (line 11527) and `lbOpen()` function.
* **CSS Category-Specific:** Rules starting with `.room-finishes-wrap` and `.room-finishes-table` apply only to these three categories.
* **CSS Never Edit:** Do not change properties inside the `@media (max-width: 380px)` block (lines 3001–3036) as this will break table scaling on small phones.

---

### NATURAL FINISHES
Includes: *Lime Wash, Lime Plaster, Venetian Plaster, Microcement, Clay Cladding, Liquid Metallic Ombres*

* **Where Data Exists:** Inside `detailData.limewash`, `detailData.limeplaster`, `detailData.venetian`, `detailData.microcement`, `detailData.clay`, and `detailData.metallic` in [index.html](file:///c:/Users/navne/Documents/CODDING/Ongoing%20projects/Ongoing%20-%20Dynamic/index.html) (lines 6861–6950).
* **Where Images Are Stored:** All files are located inside the folder: `assets/17.Natural Materials/`
* **Where Table Structure Exists:** Renders as a vertical specification sheet using `renderDataDrivenSection` (line 11379) and `renderNewExpLook` (line 10989).
* **CSS Responsiveness:** Controlled by the `.exp-look-new` wrapper classes (lines 3183–3600).
* **CSS Fonts:** Titles use `Montserrat` (serif-style weight), content rows use `Inter`.
* **CSS Image Sizing:** Set by `.exp-look-new .spec-image-col img` which fixes the detail view illustration at `100%` width within its flexible column wrapper.
* **CSS Modal Popup:** Handled by `#expNewLightbox` (line 11469) and the `expNewZoom()` handler.
* **CSS Category-Specific:** Rules nested inside `.exp-look-new` and `.spec-card` control these boards.
* **CSS Never Edit:** Do not edit the grid layout column rules under `.spec-card` (e.g. `.spec-image-col` and `.spec-table-col` flex values) as this will break the side-by-side card split layout.

---

### CIVIL MATERIALS
Includes: *Italian Marbles, Indian Marbles, Tiles, Granite, Quartz, Quartzite, Marble vs Tiles, Granite vs Quartz vs Quartzite*

* **Where Data Exists:** Inside `listData['italian-marbles']`, `listData['indian-marbles']`, `listData.tiles`, `listData.granite`, `listData.quartz`, and `listData.quartzite` objects (lines 7650–8250). Mappings are also inside `compareData['marble-vs-tiles']` and `compareData['compare-stone']` (lines 6983–7018).
* **Where Images Are Stored:**
  * Italian & Indian Marbles: `assets/18. Marbles/`
  * Tiles: `assets/19. Tiles/`
  * Granite: `assets/20. Granite/`
  * Quartz: `assets/21. Quartz/`
  * Quartzite: `assets/22.Quartzite/`
* **Where Table Structure Exists:** Controlled by `renderDataDrivenSection` (line 11379) which displays a summary table at the top followed by detailed description cards below.
* **CSS Responsiveness:** Managed by `.exp-responsive` classes (lines 3040–3175).
* **CSS Fonts:** Headers use `Outfit` / `Inter`. Values are styled in `.t-name`, `.t-price`, and `.t-brand`.
* **CSS Image Sizing:** Mapped via `img-cell` rules; images are `38px` wide inside summary tables, and fit to layout margins inside `spec-card` objects.
* **CSS Modal Popup:** Handled by `#expNewLightbox` modal container and triggered via `expNewZoom(this.src)`.
* **CSS Category-Specific:** Responsive class `.exp-responsive` applies specifically to these data tables.
* **CSS Never Edit:** Do not change font sizes inside `.exp-responsive td` or `.exp-responsive th` media queries (lines 3040–3175).

---

### CARPENTRY MATERIALS
Includes: *Laminates, Veneer, Designer Veneer, Plywood, Glass, Mirror, Wood, Laminates Finishes*

* **Where Data Exists:** Inside `listData.laminates`, `listData.veneer`, `listData['designer-veneer']`, `tableData['plywood-summary']`, `listData.glass`, `listData.mirror`, `listData['wood-types']`, and `listData['laminates-finish']` in [index.html](file:///c:/Users/navne/Documents/CODDING/Ongoing%20projects/Ongoing%20-%20Dynamic/index.html).
* **Where Images Are Stored:**
  * Laminates & Laminates Finishes: `assets/24. Laminates/` and `assets/24. Laminates/laminates finish/`
  * Veneer & Designer Veneer: `assets/25. Veneer/`
  * Plywood: `assets/35. Plywood/`
  * Glass & Mirror: `assets/23. Glass/`
  * Wood: `assets/36. Wood/`
* **Where Table Structure Exists:** Generated dynamically using `renderDataDrivenSection` (line 11379) or `renderMerged` (line 10534).
* **CSS Responsiveness:** Inherited from the `.exp-responsive` tables ruleset.
* **CSS Fonts:** Standard list font-families (`Inter`, `sans-serif`).
* **CSS Image Sizing:** Handled under the `.img-cell` and `.spec-image-col` rules.
* **CSS Modal Popup:** Opens via `expNewZoom()` showing fullscreen content.
* **CSS Category-Specific:** `.laminate-finish-section` has unique styles for rendering the laminates grids.
* **CSS Never Edit:** Do not modify `.laminate-finish-section` margins, as they keep laminates finishes grids aligned.

---

### FURNITURE
Includes: *Door Finishes, Bed Finishes, Headboard Finishes, Side Table Finishes, Study Table Finishes, Dresser Table Finishes, Wardrobe Shutter Finishes, 5 Wardrobe Must Haves, TV Unit Finishes*

* **Where Data Exists:** Mapped inside the `listData` object under the keys: `door`, `bed`, `headboard`, `sidetable`, `study`, `dresser`, `wardrobe`, `wardrobe-must`, and `tvunit` (lines 7631–7885).
* **Where Images Are Stored:**
  * Door: `assets/6.Door Finishes/`
  * Bed: `assets/5.Bed Finishes/`
  * Headboard: `assets/7.Headboard Finishes/`
  * Side Table: `assets/8.Side Table Finishes/`
  * Study Table: `assets/9.Study Table Finishes/`
  * Dresser Table: `assets/10.Dresser Table Finishes/`
  * Wardrobe Shutter: `assets/11.Wardrobe Shutter Finishes/`
  * Wardrobe Must Haves: `assets/12.5 Must Wardrobe Haves/`
  * TV Unit: `assets/13. TV Unit Finishes/`
* **Where Table Structure Exists:** Built as a grid of luxury cards. Renders dynamically via `renderFurnitureSingleTable` (line 10901).
* **CSS Responsiveness:** Governed by the `.furniture-single-table` and `.furniture-card` CSS rules. Media queries scale cards from a 3-column layout on desktops to 2-columns on tablets, and 1-column (full width) on mobile.
* **CSS Fonts:** Card titles are bold `Montserrat`, field values use standard `Inter`.
* **CSS Image Sizing:** Images inside `.furniture-card-img` are styled with `width: 100%` and `height: 220px` (with `object-fit: cover`) to stay consistent.
* **CSS Modal Popup:** Controlled by `#furnitureLb` lightbox container (line 10935) and managed by `furnitureOpenZoom()` and `furnitureCloseZoom()`.
* **CSS Category-Specific:** Scoped under the class `.furniture-single-table`.
* **CSS Never Edit:** Never edit `.furniture-card-img img { object-fit: cover; }` because changing this will stretch or distort photos.

---

### KITCHEN
Includes: *Kitchen Counter Top, Kitchen Shutter Finishes, 5 Kitchen Must Haves, Kitchen Colour Combinations*

* **Where Data Exists:** Mapped under `listData['kitchen-counter']`, `listData['kitchen-shutter']`, `listData['kitchen-must']`, and `listData['kitchen-colors-2']` (lines 7886–8041).
* **Where Images Are Stored:**
  * Kitchen Counter Tops: `assets/14. Kitchen Counter Tops/`
  * Kitchen Shutters: `assets/14. Kitchen Shutters/`
  * Kitchen Must Haves: `assets/16.5 Kitchen Must Haves/`
  * Kitchen Colors: `assets/26.Kitchen Colour Combinations/`
* **Where Table Structure Exists:** Renders as a grid of kitchen cards via the `renderKitchenSingleTable` function (line 10946).
* **CSS Responsiveness:** Handled by `.kitchen-single-table` classes, adapting to mobile viewports using flexible flexbox and CSS grids.
* **CSS Fonts:** Styled identically to the Furniture cards for project consistency.
* **CSS Image Sizing:** Controlled by `.kitchen-card-img img` keeping a fixed ratio.
* **CSS Modal Popup:** Handled by the dedicated `#kitchenLb` modal (line 10979) and `kitchenOpenZoom()`.
* **CSS Category-Specific:** CSS rules starting with `.kitchen-single-table` and `.kitchen-card` apply only to this category.
* **CSS Never Edit:** Do not edit the flex properties of `.kitchen-card` as it maintains cards alignment.

---

### BATHROOM
Includes: *Sanitary Fittings, Bathroom Colour Combinations*

* **Where Data Exists:** Mapped inside `categories.json` under `"id": "sanitary"` and `"id": "bathroom-colors-2"`. 
* **Where Images Are Stored:**
  * Bathroom Colors: `assets/29.Bathroom Colour Combinations/`
* **Where Table Structure Exists:** Sanitary fittings is a "Coming Soon" section. Bathroom colors renders via `renderColorComboGrid` (line 10589).
* **CSS Responsiveness:** Color combos render as a responsive grid, adapting from 3 columns (desktop) to 2 columns (tablet) and 1 column (mobile).
* **CSS Fonts:** Standard typography (`Inter`).
* **CSS Image Sizing:** Images inside `.color-combo-card` are cropped to a standard square layout using `aspect-ratio: 1 / 1`.
* **CSS Modal Popup:** Uses the `#colorComboLightbox` container (line 10612) and `colorComboZoomOpen()`.
* **CSS Category-Specific:** Controlled by `.color-combo-grid` and `.color-combo-card` styles.
* **CSS Never Edit:** Do not edit `.color-combo-img-wrap img { aspect-ratio: 1 / 1; }` as this preserves image alignment.

---

### COLOUR COMBINATIONS
Includes: *Kitchen Colors, Bathroom Colors, Bedroom Colors, Living Room Colors*

* **Where Data Exists:** Inside `listData` under keys `kitchen-colors`, `bathroom-colors`, `bedroom-colors`, and `living-colors`.
* **Where Images Are Stored:**
  * Kitchen Colors: `assets/26.Kitchen Colour Combinations/`
  * Bedroom Colors: `assets/27.Bedroom Colour Combinations/`
  * Living Room Colors: `assets/28. Living Room Colour Combinations/`
  * Bathroom Colors: `assets/29.Bathroom Colour Combinations/`
* **Where Table Structure Exists:** Renders as a card grid via `renderColorComboGrid` (line 10589).
* **CSS Responsiveness:** Automatically adapts using the responsive grid styles.
* **CSS Fonts:** Grid label texts are styled with `.color-combo-title`.
* **CSS Image Sizing:** Mapped to `.color-combo-img-wrap img` with a fixed ratio.
* **CSS Modal Popup:** Handled by `#colorComboLightbox` modal container (line 10612).
* **CSS Category-Specific:** Governed by `.color-combo-grid` classes.
* **CSS Never Edit:** Do not edit `object-fit: cover` on `.color-combo-card img` as this keeps preview photos aligned.

---

## 8. FILES THAT SHOULD NEVER BE TOUCHED

To avoid rendering errors, search failures, or site crashes, **never modify** the following files or sections:

1. **`cms-renderer.js`**: This file contains the template rendering algorithms. Making modifications to it may break the site's capability to read and output tables correctly.
2. **`cms-bridge.js`**: Manages data routing and admin bridges. Editing it will break the backend connection.
3. **`index.html` (Lines 6355 to 6393 — `fitTableMobile` Script)**: This is the table scaling engine that keeps tables readable on phones. Editing this code will break mobile responsiveness.
4. **`index.html` (Lines 6265 to 6345 — HTML Layout)**: This structure governs the search bar, header, tab selectors, and container views. Changing this markup will cause search or filters to fail.
5. **`index.html` (Lines 10811 to 10860 — `handleSearch` Script)**: This is the search function. Modifying this logic will break the search bar across the site.
6. **`index.html` (Lines 11527 to 11531 — Lightbox Markup)**: This is the core modal HTML markup. Modifying it will break image zoom popups.
