const page = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const patternHeight = Number.parseFloat(getComputedStyle(page).getPropertyValue('--pattern-height'));
let scheduled = false;

function updateBackground() {
  scheduled = false;
  const distance = reducedMotion.matches ? 0 : (Math.max(0, window.scrollY) * 0.32) % patternHeight;
  page.style.setProperty('--background-y', `-${distance.toFixed(1)}px`);
}

function scheduleBackground() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(updateBackground);
}

window.addEventListener('scroll', scheduleBackground, { passive: true });
reducedMotion.addEventListener('change', scheduleBackground);
updateBackground();
