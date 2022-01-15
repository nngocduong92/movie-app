const API_KEY = "ac2b09232fa1dfd4e41ef0a31cfe77da";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

const main = document.getElementById("main");
const form = document.querySelector("form");
const search = document.getElementById("search");

async function fetchMovieList(url) {
    const response = await fetch(url);
    const { results } = await response.json();

    showMovies(results);
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

function showMovies(movies) {
    main.innerHTML = "";
    if (movies) {
        movies.forEach((movie) => {
            // const img = document.createElement('img');
            // img.src = IMG_PATH + movie.poster_path;

            // document.body.appendChild(img);
            const { poster_path, title, vote_average, overview } = movie;

            const movieEl = document.createElement("div");
            movieEl.classList.add("movie");
            movieEl.innerHTML = `
                <img
                    src="${IMG_PATH + poster_path}"
                    alt="${title}"
                />
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(
                        vote_average
                    )}">${vote_average}</span>
                </div>
                <div class="overview">
                <h3>Overview: </h3>
                        ${overview}
                </div>
            `;
            main.appendChild(movieEl);
        });
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        fetchMovieList(API_SEARCH + searchTerm);

        search.value = "";
    }
});

fetchMovieList(API_URL);
