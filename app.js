require("dotenv").config();

// Importation du module Express et création de l'application
const express = require("express");
const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Définition du port
const port = 5000;

// Configuration de dotenv pour charger les variables d'environnement depuis le fichier .env
require("dotenv").config();

// ----
// Définition d'une fonction de route pour l'accueil
const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
// Définition de la route "/" avec la fonction welcome
app.get("/", welcome);

// Définition d'une fonction de route pour l'accueil avec nom personnalisé
const welcomeName = (req, res) => {
  res.send(`Welcome ${req.params.name}`);
};
// Définition de la route "/users/:name" avec la fonction welcomeName
app.get("/users/:name", welcomeName);

//------------

// Importation des gestionnaires de routes pour les films depuis le fichier movieHandlers.js
const movieHandlers = require("./movieHandlers");


// -- Valider saisie 
const { validateMovie } = require("./validators.js");
const { validateUser  } = require("./validators.js");

// Définition des routes pour les opérations CRUD sur les films

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMoviesById);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);


const userHandlers = require("./userHandlers");
const { hashPassword, verifyPassword} = require("./auth.js");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
// app.post("/api/users", hashPassword, userHandlers.postUser);
app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUsers);

// const loginHandlers = require("./loginHandlers");
// app.post("/api/login", loginHandlers.postLogin);


//🗝️ ----------Authentification avec JWT ------
// const isItDwight = (req, res) => {
//   if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
//     res.send("Credentials are vPOOOT");
//   } else {
//     res.sendStatus(401);
//   }
// };
// app.post("/api/login", isItDwight);





//--
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
//🗝️ ----------Authentification avec JWT ------


//-----------

// Démarrage du serveur et écoute sur le port spécifié
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});