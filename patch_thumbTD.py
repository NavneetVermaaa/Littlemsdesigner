import re

file_path = r"c:\Users\navne\Downloads\Ongoing\material-library-FINAL_7_4.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace thumbTD - the regex will match from the function start to its closing brace,
# including any orphaned duplicate code blocks
new_thumbTD = '''    function thumbTD(tid, idx, lbl) {
      var label = (lbl || '').replace(/'/g, '').trim();
      var folder = IMAGE_SETTINGS.FOLDER_MAP[tid];
      if (!folder) return `<td class="t-th"><div class="thumb-wrap"><img class="row-img" src="assets/1.Cover Images/coming soon.jpg" alt="${label}" loading="lazy"></div></td>`;

      var srcBase = `assets/${folder}/`;
      
      var safeLabel = label.replace(/[\\/\\\\:*?"<>|]/g, '-');
      var shortLabel = safeLabel.split(/\\s+[\\u2013\\u2014-]\\s+/)[0].trim();
      var coreLabel = shortLabel.replace(/\\s*\\([^)]*\\)\\s*$/, '').trim();

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
      img += ' onclick="event.stopPropagation();lbOpen(this.src,\\'' + escapedLabel + '\\')"';
      img += ' onerror="var a=(this.getAttribute(\\'data-attempt\\')|0)+1;this.setAttribute(\\'data-attempt\\',a);';
      img += 'var c=[\\'' + chain.join('\\',\\'') + '\\'];';
      img += 'if(a<c.length){this.src=c[a]}else{this.onerror=null;this.src=\\'assets/1.Cover Images/coming soon.jpg\\'}"';
      img += ' data-attempt="0">';
      return '<td class="t-th"><div class="thumb-wrap">' + img + '</div></td>';
    }'''

content = re.sub(r"    function thumbTD\(tid, idx, lbl\) \{.*?    \}", new_thumbTD, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done! thumbTD patched and orphaned code removed.")
