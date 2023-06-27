// CRUD
//   CREATE --> post
//   READ --->> get
//   UPADATE --> PUT
//   DELETe 

const database = require("./database");

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};



const getUsers = (req, res) => {
  const initialSql = "select id, firstname, lastname, email, city, language from users";
  const where = [];

  // Construction de la requête SQL en ajoutant des conditions WHERE dynamiquement
  const query = where.reduce(
    (sql, { column, operator }, index) =>
      `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
    initialSql
  );

  // Récupération des valeurs des conditions WHERE
  const values = where.map(({ value }) => value);

  // Exécution de la requête SQL avec les valeurs
  database
    .query(query, values)
    .then(([users]) => {
      // Envoi des utilisateurs récupérés en tant que réponse JSON
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      // Envoi d'une réponse d'erreur en cas de problème lors de la récupération des données de la base de données
      res.status(500).send("Error retrieving data from database");
    });
};
  
const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  database
    .query("select * from users where email = ?", [email])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];

        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};



  const updateUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const {firstname, lastname, email, city, language, hashedPassword } = req.body;
  
    database
      .query(
        "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?",
        [firstname, lastname, email, city, language, hashedPassword, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("🛸Error editing the users");
      });
  };

  module.exports = {
    postUser,
    getUsers,
    getUsersById,
    updateUsers,
    getUserByEmailWithPasswordAndPassToNext
  };