(() => {
  const page = document.documentElement;
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'elektroreanimator-theme';
  let preference;
  let button;

  try {
    preference = localStorage.getItem(storageKey);
  } catch {
    // The switch still works for the current page when storage is unavailable.
  }
  if (preference !== 'dark' && preference !== 'light') preference = undefined;

  function applyTheme() {
    const theme = preference ?? (systemTheme.matches ? 'dark' : 'light');
    page.dataset.theme = theme;
    button?.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  applyTheme();
  systemTheme.addEventListener('change', applyTheme);
  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('.theme-toggle');
    if (!button) return;

    applyTheme();
    button.hidden = false;
    button.addEventListener('click', () => {
      preference = page.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // Keep the current selection even if it cannot be saved.
      }
    });
  });
})();
