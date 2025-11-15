// script-global.js
// Lógica para modo oscuro con persistencia en localStorage

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('toggle-dark');
  const storageKey = 'darkMode';

  if (!toggleBtn) return; // si no hay botón, salir sin errores

  // Función que aplica o quita la clase 'dark-mode' y actualiza el texto del botón
  function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', !!enabled);
    try {
      localStorage.setItem(storageKey, enabled ? '1' : '0');
    } catch (e) {
      // Si localStorage no está disponible (modo incógnito extremo), no romperá la página
      console.warn('localStorage no disponible:', e);
    }
    toggleBtn.textContent = enabled ? 'Modo Claro' : 'Modo Oscuro';
  }

  // Leer preferencia guardada, si existe
  let saved = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch (e) {
    // ignorar
  }

  if (saved === null) {
    // Si no hay preferencia guardada, usar la preferencia del sistema si está disponible
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  } else {
    setDarkMode(saved === '1');
  }

  // Toggle cuando el usuario hace click
  toggleBtn.addEventListener('click', function () {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(!isDark);
  });

  // Opcional: permitir activar/desactivar con la tecla "D" (accesibilidad simple)
  document.addEventListener('keydown', function (e) {
    // Ignorar cuando el foco está en un input/textarea
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'd' || e.key === 'D') {
      const isDark = document.body.classList.contains('dark-mode');
      setDarkMode(!isDark);
    }
  });
});
