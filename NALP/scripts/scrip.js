// Script principal para NALP: búsqueda, filtrado y navegación de ítems
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
    const searchInput = document.getElementById('buscar-entrada');
    const searchButton = document.getElementById('buscar-but');
    const itemList = document.getElementById('items-de-la-lista');
    const items = Array.from(itemList.getElementsByTagName('li'));
    // Botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';
    // --- Parte 1: Gestión del historial de búsqueda en localStorage ---
    let searchFrequencies = JSON.parse(localStorage.getItem('searchFrequencies')) || {};
    // Actualiza la frecuencia de búsqueda de cada término
    function updateSearchFrequency(term) {
        if (term) {
            searchFrequencies[term] = (searchFrequencies[term] || 0) + 1;
            localStorage.setItem('searchFrequencies', JSON.stringify(searchFrequencies));
            // console.log('Frecuencias actualizadas en localStorage:', searchFrequencies);
        }
    }
    // --- Parte 2: Función principal de búsqueda y ordenamiento (MODIFICADA LA LÓGICA DE FILTRADO) ---
    // Realiza la búsqueda y filtrado de ítems
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            items.forEach(item => item.classList.add('hide'));
            return;
        }
        updateSearchFrequency(searchTerm);

        let filteredItems = items.filter(item => {
            const itemText = item.textContent.toLowerCase();
            // Obtener todos los tipos del ítem como un array (ej. ["musica", "mp4"])
            const itemTypes = (item.getAttribute('data-type') || '').split(' ');

            // Coincidencia de texto y tipo
            const textMatches = itemText.includes(searchTerm);
            const typeMatches = (activeFilter === 'all' || itemTypes.includes(activeFilter));
            return textMatches && typeMatches;
        });
        // Ordena por frecuencia de búsqueda (menos buscados arriba)
        filteredItems.sort((a, b) => {
            const aText = a.textContent.toLowerCase();
            const bText = b.textContent.toLowerCase();
            const aFreq = searchFrequencies[aText] || 0;
            const bFreq = searchFrequencies[bText] || 0;
            return aFreq - bFreq;
        });
        // --- Parte 3: Actualizar la vista de la lista en el DOM ---
    // Oculta todos los ítems antes de mostrar los filtrados
    items.forEach(item => item.classList.add('hide'));

        filteredItems.forEach(item => {
            itemList.appendChild(item);
            item.classList.remove('hide');
        });
    }
    // --- Partes 4 y 5: navegación y filtros ---
    // Navegación al hacer clic en un ítem
    items.forEach(item => {
        item.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            } else {
                console.warn('El ítem no tiene un atributo data-url definido:', this);
            }
        });
    });
    // Filtros por tipo
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            performSearch();
        });
    });
    // Eventos de búsqueda
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', performSearch);
    // Oculta todos los ítems al inicio
    items.forEach(item => item.classList.add('hide'));
});
