function specZoom(src) {
  document.getElementById('specLightboxImg').src = src;
  document.getElementById('specLightbox').classList.add('active');
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.exp-lb.active, .spec-lb.active').forEach(function(el) {
      el.classList.remove('active');
    });
  }
});

function toggleTheme() {
  document.documentElement.classList.toggle('dark-mode');
  var btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = document.documentElement.classList.contains('dark-mode') ? '☀️' : '🌙';
}
