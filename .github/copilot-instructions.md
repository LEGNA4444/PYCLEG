# PYCLEG — Copilot Instructions

**Project**: Portfolio personal de LEGNAR (sitio estático con portfolio de proyectos)  
**Tech Stack**: HTML5, CSS3, Vanilla JavaScript (ES6+), GitHub Pages  
**Language**: Español (HTML comments, variable names en español)

---

## Architecture & Data Flow

### Single-Page Portfolio Structure
- **Root files**:
  - `index.html` — Página principal (índice de proyectos, buscador, navegación)
  - `404.html` — Página de error (GitHub Pages 404 handler)
  - `README.md` — Minimal description

- **`/rg/` folder** — Assets & utilities (por "recursos globales"):
  - `estilos.css` — Hoja de estilos única (dark-mode support)
  - `script-global.js` — Lógica global (dark mode toggle + search system)
  - `contacto.html` — Página de contacto (simple, sin formulario)

### Data Flow for Projects
**Projects array** in `script-global.js` (lines 67–71):
```javascript
const projects = [
  { title: 'NALP', url: 'https://LEGNA4444.github.io./PYCLEG/404.html', tags: ['nalp', 'proyecto'] },
  { title: 'INFY5', url: 'https://LEGNA4444.github.io/PYCLEG/404.html', tags: ['infy5', 'proyecto'] }
];
```
- Edit this array to update project list; search filter uses `title` + `tags` for real-time matching.
- No backend/database — all data is static JSON in client-side code.

---

## Key Patterns & Conventions

### 1. Dark Mode Implementation
**Pattern**: Toggle class on `<body>`, persist preference in localStorage, respect system preference.

- **Entry point**: Button `id="toggle-dark"` in HTML triggers `setDarkMode(enabled)` in `script-global.js`.
- **Storage key**: `'darkMode'` (stored as `'1'` for on, `'0'` for off).
- **Initialization logic** (lines 23–37):
  1. Read saved preference from localStorage (try/catch for incognito).
  2. If not saved, check system preference with `window.matchMedia('(prefers-color-scheme: dark)')`.
  3. Apply via `document.body.classList.toggle('dark-mode', enabled)`.
- **CSS convention**: All dark-mode overrides use `body.dark-mode` selector (see `estilos.css` lines 76–100).
- **Keyboard shortcut**: Press "D" to toggle (except when focus is in input/textarea).

### 2. Search System
**Pattern**: Client-side real-time filtering with instant visual feedback.

- **Data source**: `projects` array with `{ title, url, tags }` objects.
- **Search triggers**:
  - Input event: filter + render results in real-time.
  - Enter key: navigate to first matching result.
  - Click outside: close results dropdown.
- **Render function** (lines 82–88): Maps projects to `<a class="sr-item">` elements; shows "No se encontraron proyectos" if empty.
- **Filter logic** (lines 90–94): Case-insensitive match on title or any tag.

### 3. CSS — Minimal & Scoped
- **Philosophy**: Only include CSS actually used in HTML (`id` and `class` selectors).
- **Layout**: Centered layout with 70% width containers (header, footer, menu).
- **Color scheme**:
  - Light: `rgb(187, 190, 218)` background, black text.
  - Dark: `#3c3c3c` background, `#c7c7c7` text.
- **Transitions**: `300ms ease` for theme changes; `150ms` for button/input interactions.
- **Responsive**: Uses `<meta name="viewport">` but no media queries yet (mobile-first mindset, add breakpoints if needed).

### 4. Accessibility & UX
- **HTML semantics**: `<header>`, `<main>`, `<footer>`, `role="main"`, `aria-labelledby` where applicable.
- **Focus management**: Button hover states, input focus colors (`#292929` background, `#00fff2` text).
- **WCAG contrast**: Checked for dark/light modes; button text remains readable.
- **Keyboard navigation**: Links, buttons, inputs all tabbable; search works with Enter.

---

## Development Workflows

### Adding a New Project
1. **Edit `rg/script-global.js`** (lines 67–71):
   ```javascript
   { title: 'ProjectName', url: 'https://...', tags: ['tag1', 'tag2'] }
   ```
2. **Update related links** in `index.html` if needed (e.g., "Proyectos Destacados" menu).
3. **Test search**: Open browser DevTools, search for project by title or tag.

### Updating Styles
- **Location**: `rg/estilos.css`
- **Convention**: Group by component (body, header/footer, menu, search, dark-mode overrides).
- **Test dark mode**: Press "D" in browser; ensure contrast remains adequate.
- **No extra CSS**: If selector is not used in HTML, delete it (keep CSS minimal).

### Changing theme colors
- Edit `body` background-color (light mode) and `body.dark-mode` (dark mode) in `estilos.css`.
- Update button, link, and input colors in corresponding sections.
- Test both modes in browser before commit.

### 404 Page Handling
- `404.html` reuses `script-global.js` and `estilos.css`.
- GitHub Pages serves it automatically for missing routes (must be in repo root).
- Ensure HTTP response status is 404 (GitHub Pages handles this if file exists).

---

## File & Naming Conventions

- **HTML files**: Spanish-friendly comments (`<!-- comentario -->`), lang="es".
- **CSS classes**: Kebab-case (`.menu-desplegable`, `.sr-item`), IDs are single words or camelCase (`#toggle-dark`, `#search`).
- **JavaScript variables**: camelCase (searchInput, toggleBtn, darkMode), localStorage key `'darkMode'`.
- **File paths**: Relative URLs where possible (e.g., `/rg/estilos.css`); GitHub Pages uses absolute paths (https://LEGNA4444.github.io/PYCLEG/...).
- **Comments**: Span short explanations (1–2 lines) or multi-line blocks for features (search system, dark mode init).

---

## Testing & Debugging Checklist

- [ ] **Dark mode**: Toggle with button, refresh page (preference persists), press "D" (toggle works).
- [ ] **Search**: Type in input, results appear in real-time, press Enter (navigates), click result (navigates), click outside (closes dropdown).
- [ ] **Responsive**: Open DevTools mobile view (375px, 768px, 1024px).
- [ ] **Accessibility**: Tab through page, all buttons/links are keyboard-accessible; check color contrast with WebAIM.
- [ ] **GitHub Pages**: Push to main, wait 1–2 min, verify site loads at https://LEGNA4444.github.io/PYCLEG/.
- [ ] **404 handling**: Visit non-existent route (e.g., `/fake.html`); 404.html should load with search working.

---

## Common Tasks

| Task | Files | Notes |
|------|-------|-------|
| Add/update project | `rg/script-global.js` (projects array) | Add title, URL, tags |
| Change theme colors | `rg/estilos.css` | Update `body`, `body.dark-mode`, button colors |
| Fix link/URL | `index.html`, `rg/contacto.html` | Use absolute URLs for GitHub Pages |
| Add new page | Create `.html` in root or `/rg/` | Import `script-global.js` and `estilos.css` |
| Modify search behavior | `rg/script-global.js` (lines 67–130) | Edit `findMatches()`, `render()`, or project data |

---

## Known Issues & Improvements

- **Projects list is hardcoded**: Consider loading from JSON file if portfolio grows (> 10 projects).
- **No mobile-specific breakpoints**: Add media queries for screens < 768px if needed.
- **Form removed**: `contacto.html` shows email only; add mailto link or form later if needed.
- **localStorage fallback**: Works in incognito (preference not saved), but no visual feedback to user.
