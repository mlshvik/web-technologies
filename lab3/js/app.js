const movies = [
    { title: "Inception", duration: 148, director: "Christopher Nolan", rating: 8.8, reviews: 12000 },
    { title: "The Matrix", duration: 136, director: "The Wachowskis", rating: 8.7, reviews: 15000 },
    { title: "Interstellar", duration: 169, director: "Christopher Nolan", rating: 8.6, reviews: 13000 },
    { title: "The Godfather", duration: 175, director: "Francis Ford Coppola", rating: 9.2, reviews: 11000 },
    { title: "Pulp Fiction", duration: 154, director: "Quentin Tarantino", rating: 8.9, reviews: 9000 },
    { title: "The Dark Knight", duration: 152, director: "Christopher Nolan", rating: 9.0, reviews: 18000 },
    { title: "Fight Club", duration: 139, director: "David Fincher", rating: 8.8, reviews: 10000 },
    { title: "The Shawshank Redemption", duration: 142, director: "Frank Darabont", rating: 9.3, reviews: 21000 }
];

document.addEventListener("DOMContentLoaded", () => {
    displayMovies(movies);
    document.getElementById("sortRating").addEventListener("click", sortMoviesByRating);
    document.getElementById("sortDuration").addEventListener("click", sortMoviesByDuration);
    document.getElementById("searchButton").addEventListener("click", searchMovies);
    document.getElementById("ResetMovies").addEventListener("click", resetMovies);
    document.getElementById("calculateButton").addEventListener("click", calculateTotalDuration);
});

function displayMovies(movieArray) {
    const moviesList = document.getElementById("moviesList");
    moviesList.innerHTML = movieArray.map(movie => 
        `<li>${movie.title} by ${movie.director}, Duration: ${movie.duration} min, Rating: ${movie.rating} / 10</li>`
    ).join('');
}

function sortMoviesByRating() {
    const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
    displayMovies(sortedMovies);
}

function sortMoviesByDuration() {
    const sortedMovies = [...movies].sort((a, b) => a.duration - b.duration);
    displayMovies(sortedMovies);
}

function searchMovies() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(query) || 
        movie.director.toLowerCase().includes(query)
    );
    displayMovies(filteredMovies);
}

function calculateTotalDuration() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(query) || 
        movie.director.toLowerCase().includes(query)
    );
    
    if (filteredMovies.length > 0) {
        const totalDuration = filteredMovies.reduce((total, movie) => total + movie.duration, 0);
        document.getElementById("totalReviews").textContent = `${totalDuration} min`; 
    } else {
        document.getElementById("totalReviews").textContent = "0 min"; 
    }
}

function resetMovies() {
    document.getElementById("searchInput").value = '';
    displayMovies(movies); 
    document.getElementById("totalReviews").textContent = '';
}