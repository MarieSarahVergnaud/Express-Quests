require("dotenv").config();
const express = require("express");// Importation du module Express et création de l'application
const app = express();



app.use(express.json());// Middleware pour parser le corps des requêtes en JSON

const port = 5000;// Définition du port

require("dotenv").config(); // Configuration de dotenv pour charger les variables d'environnement depuis le fichier .env


const welcome = (req, res) => {  // Définition d'une fonction de route pour l'accueil
  res.send("Welcome to my favourite movie list");
};
app.get("/", welcome);// Définition de la route "/" avec la fonction welcome

const welcomeName = (req, res) => {
  res.send(`Welcome ${req.params.name}`);
};
app.get("/users/:name", welcomeName);

//------------

// Importation des gestionnaires de routes pour les films depuis le fichier movieHandlers.js
const movieHandlers = require("./movieHandlers");


// -- Valider saisie 
const { validateMovie } = require("./validators.js");
const { hashPassword, verifyPassword, verifyToken} = require("./auth.js");


// ----------------------- ROUTES -------------------------------------------
// the public routes
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMoviesById);

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);// /!\ login should be a public route


// then the routes to protect -------------------------------------------------

app.use(verifyToken); // AUTHENTIFICATION WALL: verifyToken is activated for each route after this line

app.post("/api/movies", verifyToken, movieHandlers.postMovie); //validateMovie,
app.put("/api/movies/:id",verifyToken, movieHandlers.updateMovie);
app.delete("/api/movies/:id",verifyToken, movieHandlers.deleteMovie);




// ---------------------------------------------------------------------------
const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
// app.post("/api/users", hashPassword, userHandlers.postUser);
app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUsers);





//-----------

// Démarrage du serveur et écoute sur le port spécifié
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});