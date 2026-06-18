const API_KEY = 'eaf17d8e';

const API_URL_SEARCH = `https://omdbapi.com/?apikey=${API_KEY}&s=space`; // URL для поиска фильмов с ключевым словом "space"

getMovies(API_URL_SEARCH);

async function getMovies(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }
        
        const respData = await response.json();
        
        if (respData.Response === "True") {
            showMovies(respData.Search); 
        } else {
            console.error("Ошибка API:", respData.Error);
        }
    } catch (error) {
        console.error("Не удалось получить данные:", error);
    }
}

function showMovies(movies) {
    const moviesEl = document.querySelector('.movies');
    if (!moviesEl) return; 
    
    moviesEl.innerHTML = ''; 
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co';

        movieEl.innerHTML = `
            <div class="movie__cover-inner">
                <img src="${posterUrl}" class="movie__cover" alt="${movie.Title}" />
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.Title}</div>
                <div class="movie__year">${movie.Year}</div>
            </div>
        `;
        
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.querySelector('.header__search');
        if (searchInput && searchInput.value.trim() !== '') {
            const searchUrl = `https://omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchInput.value.trim())}`;
            getMovies(searchUrl);
            searchInput.value = ''; // Очищаем поле поиска после отправки (опционально)
        }
    }); // <-- Здесь была ошибка. Добавлены закрывающая скобка и точка с запятой.
}
