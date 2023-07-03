const database = require("./database");

// CRUD METHODE

//CREATE --> POST
//READ -->  GET
//UPDATE --> PUT
//DELETE --> DELETE

// Route Post
const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  // Insertion d'un nouveau film dans la base de données
  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      // Envoi d'un statut 201 (Created) et de l'emplacement (location) du nouveau film créé
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

// // Route Get
// const getMovies = (req, res) => {
//   // Récupération de tous les films depuis la base de données
//   database
//     .query("select * from movies")
//     .then(([movies]) => {
//       // Envoi des films en tant que réponse au format JSON
//       res.json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// };

// GET By id avec ajout dans le sql
const getMovies = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if (req.query.color != null) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);
  }

  // La variable `sql` contient la requête de base pour sélectionner tous les films de la table "movies".

  // On crée également un tableau vide `sqlValues` qui sera utilisé pour stocker les valeurs des paramètres de requête.

  if (req.query.color != null) {
    // On vérifie si le paramètre `color` est présent dans la requête (`req.query.color`).
    // Si c'est le cas, cela signifie que l'utilisateur souhaite filtrer les films par couleur.

    sql += " where color = ?";
    // On ajoute la condition `where color = ?` à la requête SQL en utilisant `+=` pour concaténer la condition à la requête de base.

    sqlValues.push(req.query.color);
    // On ajoute la valeur de `req.query.color` au tableau `sqlValues` en utilisant `push`.
  }

  // Une fois la requête SQL construite, elle aura la forme suivante :
  // "select * from movies" (si aucun filtre par couleur n'est spécifié)
  // ou "select * from movies where color = ?" (si un filtre par couleur est spécifié)

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      // On exécute la requête SQL en utilisant `database.query(sql, sqlValues)`.
      // Cela exécute la requête SQL avec les valeurs fournies, ce qui permet de récupérer les films correspondants depuis la base de données.

      res.json(movies);
      // On envoie les films en tant que réponse au format JSON à l'aide de `res.json()`.
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
      // En cas d'erreur lors de l'exécution de la requête SQL, on affiche l'erreur dans la console et on envoie une réponse avec le statut 500 (Internal Server Error) et un message d'erreur approprié.
    });
};



// Route Get By Id
const getMoviesById = (req, res) => {
  const id = req.params.id;

  // Récupération d'un film spécifique en fonction de son ID depuis la base de données
  database.query("SELECT * FROM movies WHERE id = ?", [id])
    .then(([result]) => {
      if (result.length) {
        // Si le film est trouvé, renvoyer le film en tant que réponse avec le statut 200 (OK)
        res.status(200).send(result);
      } else {
        // Si le film n'est pas trouvé, renvoyer une réponse avec le statut 404 (Not Found)
        res.status(404).json({ error: `The movie with the id ${req.params.id} doesn't exist` });
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving movies", err);
    });
};


// GET VIA QUERY STRING

const getMoviesbyColor = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if (req.query.color != null) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);
  }

  // Construction de la requête SQL en fonction des paramètres de requête
  // Si le paramètre "color" est présent dans la requête, une condition WHERE est ajoutée pour filtrer les films par couleur

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      // Exécution de la requête SQL avec les valeurs fournies
      // Récupération des résultats (films) retournés par la requête

      res.json(movies);
      // Envoi des films en tant que réponse au format JSON
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
      // En cas d'erreur, envoi d'une réponse avec le statut 500 (Internal Server Error) et un message d'erreur
    });
};


// ROUTE UPDATE - PUT
const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  // Mise à jour d'un film existant dans la base de données
  database
    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        // Si aucun film n'a été affecté par la mise à jour, renvoyer une réponse avec le statut 404 (Not Found)
        res.status(404).send("Not Found");
      } else {
        // Sinon, renvoyer une réponse avec le statut 204 (No Content) pour indiquer que la requête a été traitée avec succès
        res.status(204).send("Good!");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

// ROUTE DELETE
const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  // Suppression d'un film de la base de données en fonction de son ID
  database
    .query("delete from movies where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        // Si aucun film n'a été supprimé, renvoyer une réponse avec le statut 404 (Not Found)
        res.status(404).send("Not Found");
      } else {
        // Sinon, renvoyer une réponse avec le statut 204 (No Content) pour indiquer que la requête a été traitée avec succès
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};

module.exports = {
  postMovie,
  updateMovie,
  getMovies,
  getMoviesById,
  deleteMovie,
};