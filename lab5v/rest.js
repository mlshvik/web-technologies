const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

let movies = [
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

// Виведення інформації
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Додавання фільму
app.post("/api/movies", (req, res) => {
  const { title, director, duration, rating } = req.body;

  if (title && director && duration > 0 && rating >= 1 && rating <= 10) {
    const newMovie = {
      title,
      duration: parseInt(duration),
      director,
      rating: parseFloat(rating),
      reviews: 0,
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
  } else {
    res
      .status(400)
      .json({ error: "Invalid data. Ensure all fields are correct." });
  }
});

app.put("/api/movies/:index", (req, res) => {
  const { title, director, duration, rating } = req.body;
  const index = parseInt(req.params.index);

  if (movies[index]) {
    if (title && director && duration > 0 && rating >= 1 && rating <= 10) {
      movies[index] = {
        title,
        duration: parseInt(duration),
        director,
        rating: parseFloat(rating),
        reviews: movies[index].reviews,
      };
      res.json(movies[index]);
    } else {
      res
        .status(400)
        .json({ error: "Invalid data. Ensure all fields are correct." });
    }
  } else {
    res.status(404).json({ error: "Movie not found." });
  }
});
// Видалення фільму
app.delete("/api/movies/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (movies[index]) {
    movies.splice(index, 1);
    res.status(200).json({ message: "Movie deleted successfully." });
  } else {
    res.status(404).json({ error: "Movie not found." });
  }
});

// Запуск серверу
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
