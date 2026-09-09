(function () {
  'use strict';
  var root = document.querySelector('.project-carousel');
  if (!root) return;
  var slides = Array.from(root.querySelectorAll('.project-slide'));
  var dots = Array.from(root.querySelectorAll('[data-slide]'));
  var toggle = root.querySelector('.carousel-toggle');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = 0;
  var paused = reducedMotion.matches;
  var hovered = false;
  var focused = false;
  var timer;

  function schedule() {
    window.clearTimeout(timer);
    if (!paused && !hovered && !focused && !document.hidden) {
      timer = window.setTimeout(function () { show(current + 1, false); }, 6500);
    }
  }

  function show(index, announce) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) { slide.hidden = i !== current; });
    dots.forEach(function (dot, i) {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    root.querySelector('.carousel-count').textContent =
      String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    if (announce) root.querySelector('.carousel-status').textContent = slides[current].getAttribute('aria-label');
    schedule();
  }

  function updateToggle() {
    toggle.setAttribute('data-paused', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Start automatic slideshow' : 'Pause automatic slideshow');
    schedule();
  }

  root.querySelector('.carousel-controls').hidden = false;
  root.querySelector('.carousel-side-nav').hidden = false;
  root.querySelector('.carousel-prev').addEventListener('click', function () { show(current - 1, true); });
  root.querySelector('.carousel-next').addEventListener('click', function () { show(current + 1, true); });
  dots.forEach(function (dot, i) { dot.addEventListener('click', function () { show(i, true); }); });
  toggle.addEventListener('click', function () { paused = !paused; updateToggle(); });
  root.addEventListener('mouseenter', function () { hovered = true; schedule(); });
  root.addEventListener('mouseleave', function () { hovered = false; schedule(); });
  root.addEventListener('focusin', function () { focused = true; schedule(); });
  root.addEventListener('focusout', function (event) {
    if (!root.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  root.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', function () {
    paused = reducedMotion.matches;
    updateToggle();
  });
  show(0, false);
  updateToggle();
}());
