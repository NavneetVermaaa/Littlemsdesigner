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
