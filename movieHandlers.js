const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving movies from database");
    });
};
const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([movies]) => {
      if (movies [0] != null) {
        res.json(movies[0]).res.status(200);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Not Found");
    });
};





const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};


// const getUsers = (req, res) => {
//   database
//     .query("select * from users")
//     .then(([users]) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// };

// const getUsersById = (req, res) => {
//   const id = parseInt(req.params.id);

//   database
//     .query("select * from users where id = ?", [id])
//     .then(([users]) => {
//       if (users [0] != null) {
//         res.json(users[0]).res.status(200);
//       } else {
//         res.status(404).send("Not Found");
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(400).send("Not Found");
//     });
// };







module.exports = {
  // getUsers,
  // getUsersById,
  getMovies,
  getMovieById,
  postMovie,
};