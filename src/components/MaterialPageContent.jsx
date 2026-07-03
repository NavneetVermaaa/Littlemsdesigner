export default function MaterialPageContent() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">☀️</button>

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
            <img src="assets/2.Materials%20that%20look%20expensive/Textured%20Decorative%20%26%20Venetian%20Plaster%20Paint.jpg" alt="Venetian Plaster" loading="lazy" onclick="specZoom(this.src)">
          </td>
          <td class="sno-cell">1</td>
          <td class="material-cell">Venetian Plaster Paint</td>
          <td class="cost-cell">₹180 – ₹350</td>
          <td class="thk-cell">1–3</td>
          <td class="places-cell">Living room and bedroom accent walls, hotel lobbies, foyer, reception</td>
          <td class="brands-cell">Vasari India</td>
        </tr>
        <tr>
          <td class="img-cell">
            <img src="assets/2.Materials%20that%20look%20expensive/Marble-Finish%20Tiles.jpg" alt="Marble Finish Tiles" loading="lazy" onclick="specZoom(this.src)">
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
            <img src="assets/2.Materials%20that%20look%20expensive/Premium%20Finish%20Laminates.jpg" alt="Premium Finish Laminates" loading="lazy" onclick="specZoom(this.src)">
          </td>
          <td class="sno-cell">3</td>
          <td class="material-cell">Premium Finish Laminates</td>
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

  <!-- CARD 1 -->
  <div class="spec-card">
    <div class="spec-image-col">
      <div class="spec-image-label">Image</div>
      <img src="assets/2.Materials%20that%20look%20expensive/Textured%20Decorative%20%26%20Venetian%20Plaster%20Paint.jpg" alt="Textured Decorative &amp; Venetian Plaster Paint" loading="lazy" onclick="specZoom(this.src)">
    </div>
    <div class="spec-table-col">
      <div class="spec-title-bar">
        <h2>Textured Decorative &amp; Venetian Plaster Paint</h2>
      </div>
      <div class="spec-rows">
        <div class="spec-row">
          <div class="spec-label">Description</div>
          <div class="spec-value">Luxurious textured marble-like wall finish</div>
        </div>
        <div class="spec-row">
          <div class="spec-label">Raw Material Cost</div>
          <div class="spec-value">₹80 / sq.ft onwards for textured coats; Venetian Plaster marble-look additives ~₹180 – ₹350 / sq.ft material-only.</div>
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
          <div class="spec-value">Wipe dust lightly; reseal every few years to preserve sheen.</div>
        </div>
        <div class="spec-row">
          <div class="spec-label">✓ Pros</div>
          <div class="spec-value"><span class="pros">Creates luxurious depth and dimension like stone or polished plaster, elevating feature walls. Can be customized with color, sheen, and vein patterns to mimic high-end finishes.</span></div>
        </div>
        <div class="spec-row">
          <div class="spec-label">✕ Cons</div>
          <div class="spec-value"><span class="cons">Requires skilled applicator for premium finish. DIY often looks uneven. Not ideal for high-moisture areas without proper sealing.</span></div>
        </div>
        <div class="spec-row">
          <div class="spec-label">Best Places to Use</div>
          <div class="spec-value">Living room feature wall, bedroom accent wall, foyer, hotel lobbies. Living room feature walls, bedroom accent walls, hotel lobbies, luxury bathrooms, reception areas.</div>
        </div>
        <div class="spec-row">
          <div class="spec-label">Recommended Brands</div>
          <div class="spec-value">Vasari India</div>
        </div>
      </div>
    </div>
  </div>

  <!-- CARD 2 -->
  <div class="spec-card">
    <div class="spec-image-col">
      <div class="spec-image-label">Image</div>
      <img src="assets/2.Materials%20that%20look%20expensive/Marble-Finish%20Tiles.jpg" alt="Marble-Finish Tiles" loading="lazy" onclick="specZoom(this.src)">
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
          <div class="spec-value">₹90 / sq.ft onwards for decent marble-look tiles.</div>
        </div>
        <div class="spec-row">
          <div class="spec-label">Thickness Required</div>
          <div class="spec-value">Typically 8–10 mm tile thickness.
            
          </div>
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
          <div class="spec-value"><span class="pros">Realistic marble aesthetic at a fraction of stone cost and no upkeep of real stone. Durable for floors/walls and available in many vein styles.</span></div>
        </div>
        <div class="spec-row">
          <div class="spec-label">✕ Cons</div>
          <div class="spec-value"><span class="cons">Can feel cold/echoey without rugs or soft materials. Grout lines still visible unless large format used.</span></div>
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

  <!-- CARD 3 -->
  <div class="spec-card">
    <div class="spec-image-col">
      <div class="spec-image-label">Image</div>
      <img src="assets/2.Materials%20that%20look%20expensive/Premium%20Finish%20Laminates.jpg" alt="Premium Finish Laminates" loading="lazy" onclick="specZoom(this.src)">
    </div>
    <div class="spec-table-col">
      <div class="spec-title-bar">
        <h2>Premium Finish Laminates</h2>
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
          <div class="spec-value">0.8 mm – 1.5 mm based on quality.</div>
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
          <div class="spec-value"><span class="pros">Wide range of textures—stone, wood, gloss, matte. Durable, scratch-resistant surfaces with easy cleaning.</span></div>
        </div>
        <div class="spec-row">
          <div class="spec-label">✕ Cons</div>
          <div class="spec-value"><span class="cons">Looks less rich than real wood or lacquer if viewed closely. Thin laminates can peel if bonded poorly or exposed to moisture.</span></div>
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
</div>

<div class="spec-lb" id="specLightbox" onclick="this.classList.remove('active')">
  <img id="specLightboxImg" src="" alt="zoom">
</div>` }} />
  );
}
