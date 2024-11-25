const movies = [
  {
    title: "Inception",
    duration: 148,
    director: "Christopher Nolan",
    rating: 8.8,
    reviews: 12000,
  },
  {
    title: "The Matrix",
    duration: 136,
    director: "The Wachowskis",
    rating: 8.7,
    reviews: 15000,
  },
  {
    title: "Interstellar",
    duration: 169,
    director: "Christopher Nolan",
    rating: 8.6,
    reviews: 13000,
  },
  {
    title: "The Godfather",
    duration: 175,
    director: "Francis Ford Coppola",
    rating: 9.2,
    reviews: 11000,
  },
  {
    title: "Pulp Fiction",
    duration: 154,
    director: "Quentin Tarantino",
    rating: 8.9,
    reviews: 9000,
  },
  {
    title: "The Dark Knight",
    duration: 152,
    director: "Christopher Nolan",
    rating: 9.0,
    reviews: 18000,
  },
  {
    title: "Fight Club",
    duration: 139,
    director: "David Fincher",
    rating: 8.8,
    reviews: 10000,
  },
  {
    title: "The Shawshank Redemption",
    duration: 142,
    director: "Frank Darabont",
    rating: 9.3,
    reviews: 21000,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  displayMovies(movies);
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
});

function displayMovies(movieArray) {
  const moviesList = document.getElementById("moviesList");
  moviesList.innerHTML = movieArray
    .map(
      (movie, index) =>
        `<li>${movie.title} by ${movie.director}, Duration: ${movie.duration} min, Rating: ${movie.rating} / 10
        <button onclick="openEditMoviePopup(${index})">Edit Movie</button></li>`
    )
    .join("");
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
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query)
  );
  displayMovies(filteredMovies);
}

function calculateTotalDuration() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query)
  );

  if (filteredMovies.length > 0) {
    const totalDuration = filteredMovies.reduce(
      (total, movie) => total + movie.duration,
      0
    );
    document.getElementById(
      "totalReviews"
    ).textContent = `${totalDuration} min`;
  } else {
    document.getElementById("totalReviews").textContent = "0 min";
  }
}

function resetMovies() {
  document.getElementById("searchInput").value = "";
  displayMovies(movies);
  document.getElementById("totalReviews").textContent = "";
}

// Додавання нового фільму
document
  .getElementById("addMovieButton")
  .addEventListener("click", openAddMoviePopup);

function openAddMoviePopup() {
  const popupBackground = document.createElement("div");
  popupBackground.id = "popupBackground";

  const popupWindow = document.createElement("div");
  popupWindow.id = "popupWindow";

  popupWindow.innerHTML = `
          <h2>Add New Movie</h2>
          <form id="addMovieForm" novalidate>
              <label for="newTitle">Title:</label>
              <input type="text" id="newTitle" placeholder="Enter movie title" required>
              <label for="newDirector">Director:</label>
              <input type="text" id="newDirector" placeholder="Enter director name" required>
              <label for="newDuration">Duration:</label>
              <input type="number" id="newDuration" placeholder="Enter movie duration" required>
              <label for="newRating">Rating:</label>
              <input type="number" step="0.1" id="newRating" placeholder="Enter movie rating" required>
              <button id="addNewMovieButton">Add Movie</button>
              <button id="cancelButton">Cancel</button>
          </form>
      `;

  popupBackground.appendChild(popupWindow);
  document.body.appendChild(popupBackground);

  document
    .getElementById("addNewMovieButton")
    .addEventListener("click", (event) => {
      event.preventDefault();
      addNewMovie();
    });
  document
    .getElementById("cancelButton")
    .addEventListener("click", closeAddMoviePopup);
}

function closeAddMoviePopup() {
  const popupBackground = document.getElementById("popupBackground");
  if (popupBackground) {
    document.body.removeChild(popupBackground);
  }
}

function addNewMovie() {
  const title = document.getElementById("newTitle").value.trim();
  const director = document.getElementById("newDirector").value.trim();
  const duration = parseInt(
    document.getElementById("newDuration").value.trim()
  );
  const rating = parseFloat(document.getElementById("newRating").value.trim());

  if (
    title &&
    director &&
    !isNaN(duration) &&
    duration > 0 &&
    !isNaN(rating) &&
    rating >= 1 &&
    rating <= 10
  ) {
    movies.push({
      title,
      duration,
      director,
      rating,
      reviews: 0,
    });

    displayMovies(movies);

    closeAddMoviePopup();
  } else {
    alert(
      "Fill in all fields correctly. Duration must be more than 0 and rating must be between 1 and 10."
    );
  }
}

// Оновлення фільму

function openEditMoviePopup(index) {
  const movie = movies[index];

  const popupBackground = document.createElement("div");
  popupBackground.id = "popupBackground";

  const popupWindow = document.createElement("div");
  popupWindow.id = "popupWindow";

  popupWindow.innerHTML = `
        <h2>Edit Movie</h2>
        <label>Title: <input type="text" id="editTitle" value="${movie.title}" required></label><br>
        <label>Director: <input type="text" id="editDirector" value="${movie.director}" required></label><br>
        <label>Duration: <input type="number" id="editDuration" value="${movie.duration}" required></label><br>
        <label>Rating: <input type="number" step="0.1" id="editRating" value="${movie.rating}" required></label><br>
        <button id="editMovieButton">Edit Movie</button>
        <button id="cancelButton">Cancel</button>
    `;

  popupBackground.appendChild(popupWindow);
  document.body.appendChild(popupBackground);

  document
    .getElementById("editMovieButton")
    .addEventListener("click", () => updateMovie(index));
  document
    .getElementById("cancelButton")
    .addEventListener("click", closeEditMoviePopup);
}

function closeEditMoviePopup() {
  const popupBackground = document.getElementById("popupBackground");
  if (popupBackground) {
    document.body.removeChild(popupBackground);
  }
}

function updateMovie(index) {
  const title = document.getElementById("editTitle").value.trim();
  const director = document.getElementById("editDirector").value.trim();
  const duration = parseInt(
    document.getElementById("editDuration").value.trim()
  );
  const rating = parseFloat(document.getElementById("editRating").value.trim());

  if (
    title &&
    director &&
    !isNaN(duration) &&
    duration > 0 &&
    !isNaN(rating) &&
    rating >= 1 &&
    rating <= 10
  ) {
    movies[index].title = title;
    movies[index].director = director;
    movies[index].duration = duration;
    movies[index].rating = rating;

    displayMovies(movies);

    closeEditMoviePopup();
  } else {
    alert(
      "Fill in all fields correctly. Duration must be more than 0 and rating must be between 1 and 10."
    );
  }
}
