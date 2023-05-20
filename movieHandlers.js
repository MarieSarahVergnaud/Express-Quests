const database = require("./database");


const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from movies where id = ?", [id])
    .then(([users]) => {
      if (users.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};

// const movies = [
//   {
//     id: 1,
//     title: "Citizen Kane",
//     director: "Orson Wells",
//     year: "1941",
//     colors: false,
//     duration: 120,
//   },
//   {
//     id: 2,
//     title: "The Godfather",
//     director: "Francis Ford Coppola",
//     year: "1972",
//     colors: true,
//     duration: 180,
//   },
//   {
//     id: 3,
//     title: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     year: "1994",
//     color: true,
//     duration: 180,
//   },
// ];

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

// const getUserById = (req, res) => {
//   const id = parseInt(req.params.id);

//   database
//     .query("select * from movies where id = ?", [id])
//     .then(([users]) => {
//       if (users[0] != null) {
//         res.json(users[0]);
//       }
//       else {
//         res.status(404).send("Not Found");
//       }
//     })
//     .catch((err) => {console.error(err);
//     res.status(500).send ("Error retrieving data from database");
// });
// };

// const postUser = (req, res) => {
// const {id,firstname, lastname, email, city, language} = req.body;

// database
// .query(
//   "INSERT INTO movies(id, firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?, ?)",
//   [id,firstname, lastname, email, city, language]
// )
// .then(([result]) => {
//   res.location(`/api/users/${result.insertId}`).sendStatus(201);
// })
// .catch((err) => {
//   console.error(err);
//   res.status(500).send("Error saving the movie");
// });
// };



module.exports = {
  // getUsers,
  // getUserById,
  // postUser,
  deleteUsers,
};