const API_KEY = "YOUR_TMDB_API_KEY"; // Replace with your actual TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

// Helper function to create movie cards
function createMovieCard(title, posterPath, movieId) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <p><strong>${title}</strong></p>
    ${posterPath ? `<img src="https://image.tmdb.org/t/p/w200${posterPath}" alt="${title} poster">` : ""}
    <br>
    <button onclick="addToWatched('${title}', '${posterPath}')">Add to Watched</button>
  `;
  return card;
}

// Load Recent Movies (Popular)
function loadRecentMovies() {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("recentMovies");
      container.innerHTML = "";
      data.results.slice(0, 6).forEach(movie => {
        container.appendChild(createMovieCard(movie.title, movie.poster_path, movie.id));
      });
    });
}

// Load New Releases (Now Playing)
function loadNewMovies() {
  fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("newMovies");
      container.innerHTML = "";
      data.results.slice(0, 6).forEach(movie => {
        container.appendChild(createMovieCard(movie.title, movie.poster_path, movie.id));
      });
    });
}

// Load Recommendations (Top Rated)
function loadRecommendedMovies() {
  fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("recommendedMovies");
      container.innerHTML = "";
      data.results.slice(0, 6).forEach(movie => {
        container.appendChild(createMovieCard(movie.title, movie.poster_path, movie.id));
      });
    });
}

// Search Movies
function searchMovie() {
  const query = document.getElementById("searchBar").value;
  const resultsDiv = document.getElementById("results");

  fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      resultsDiv.innerHTML = "";
      if (data.results.length === 0) {
        resultsDiv.innerHTML = "<p>No movies found.</p>";
        return;
      }
      data.results.forEach(movie => {
        resultsDiv.appendChild(createMovieCard(movie.title, movie.poster_path, movie.id));
      });
    })
    .catch(error => {
      resultsDiv.innerHTML = "<p>Error fetching movies.</p>";
      console.error(error);
    });
}

// Watched Section
function addToWatched(title, posterPath) {
  const container = document.getElementById("watchedMovies");
  container.appendChild(createMovieCard(title, posterPath));
}

// Initialize sections on page load
window.onload = function() {
  loadRecentMovies();
  loadNewMovies();
  loadRecommendedMovies();
};