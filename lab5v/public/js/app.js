function openAddMoviePopup() {
  document.getElementById("addMovieModal").style.display = "block";
}

function closeAddMoviePopup() {
  document.getElementById("addMovieModal").style.display = "none";
}

async function openEditMoviePopup(index) {
  const response = await fetch("/api/movies");
  const movies = await response.json();
  const movie = movies[index];

  document.getElementById("editTitle").value = movie.title;
  document.getElementById("editDirector").value = movie.director;
  document.getElementById("editDuration").value = movie.duration;
  document.getElementById("editRating").value = movie.rating;

  document.getElementById("editMovieButton").onclick = () => updateMovie(index);
  document.getElementById("editMovieModal").style.display = "block";
}

function closeEditMoviePopup() {
  document.getElementById("editMovieModal").style.display = "none";
}

async function addNewMovie() {
  const title = document.getElementById("newTitle").value.trim();
  const director = document.getElementById("newDirector").value.trim();
  const duration = parseInt(
    document.getElementById("newDuration").value.trim()
  );
  const rating = parseFloat(document.getElementById("newRating").value.trim());

  if (validateMovieData(title, director, duration, rating)) {
    const response = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, director, duration, rating }),
    });

    if (response.ok) {
      fetchMovies();
      closeAddMoviePopup();
    } else {
      alert("Error adding movie.");
    }
  }
}

// Видалення фільму
async function deleteMovie(index) {
  const confirmDelete = confirm("Are you sure you want to delete this movie?");
  if (confirmDelete) {
    const response = await fetch(`/api/movies/${index}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchMovies();
    } else {
      alert("Error deleting movie.");
    }
  }
}

function displayMovies(movieArray) {
  const moviesList = document.getElementById("moviesList");
  moviesList.innerHTML = movieArray
    .map(
      (movie, index) =>
        `<li>
            ${movie.title} by ${movie.director}, Duration: ${movie.duration} min, Rating: ${movie.rating} / 10
            <br /><br />
            <button class="edit-btn" onclick="openEditMoviePopup(${index})">Edit Movie</button>
            <button class="delete-btn" onclick="deleteMovie(${index})">Delete Movie</button>
          </li>`
    )
    .join("");
}

async function updateMovie(index) {
  const title = document.getElementById("editTitle").value.trim();
  const director = document.getElementById("editDirector").value.trim();
  const duration = parseInt(
    document.getElementById("editDuration").value.trim()
  );
  const rating = parseFloat(document.getElementById("editRating").value.trim());

  if (validateMovieData(title, director, duration, rating)) {
    const response = await fetch(`/api/movies/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, director, duration, rating }),
    });

    if (response.ok) {
      fetchMovies();
      closeEditMoviePopup();
    } else {
      alert("Error updating movie.");
    }
  }
}
function validateMovieData(title, director, duration, rating) {
  if (title.length === 0 || title.length > 100) {
    alert("Title must be between 1 and 100 characters.");
    return false;
  }

  if (director.length === 0 || director.length > 100) {
    alert("Director's name must be between 1 and 100 characters.");
    return false;
  }

  if (isNaN(duration) || duration <= 0) {
    alert("Duration must be a positive number.");
    return false;
  }

  if (isNaN(rating) || rating < 1 || rating > 10) {
    alert("Rating must be between 1 and 10.");
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
  document
    .getElementById("sortRating")
    .addEventListener("click", sortMoviesByRating);
  document
    .getElementById("sortDuration")
    .addEventListener("click", sortMoviesByDuration);
  document
    .getElementById("searchButton")
    .addEventListener("click", searchMovies);
  document.getElementById("ResetMovies").addEventListener("click", resetMovies);
  document
    .getElementById("calculateButton")
    .addEventListener("click", calculateTotalDuration);
  document
    .getElementById("addNewMovieButton")
    .addEventListener("click", (event) => {
      event.preventDefault();
      addNewMovie();
    });
});

async function fetchMovies() {
  const response = await fetch("/api/movies");
  const movies = await response.json();
  displayMovies(movies);
}

async function sortMoviesByRating() {
  const response = await fetch("/api/movies");
  const movies = await response.json();
  const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
  displayMovies(sortedMovies);
}

async function sortMoviesByDuration() {
  const response = await fetch("/api/movies");
  const movies = await response.json();
  const sortedMovies = [...movies].sort((a, b) => a.duration - b.duration);
  displayMovies(sortedMovies);
}

async function searchMovies() {
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  const response = await fetch("/api/movies");
  const movies = await response.json();
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query)
  );
  displayMovies(filteredMovies);
}

async function calculateTotalDuration() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const response = await fetch("/api/movies");
  const movies = await response.json();
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query)
  );

  const totalDuration = filteredMovies.reduce(
    (total, movie) => total + movie.duration,
    0
  );
  document.getElementById("totalReviews").textContent = `${totalDuration} min`;
}

function resetMovies() {
  document.getElementById("searchInput").value = "";
  fetchMovies();
  document.getElementById("totalReviews").textContent = "";
}

document
  .getElementById("addMovieButton")
  .addEventListener("click", openAddMoviePopup);
