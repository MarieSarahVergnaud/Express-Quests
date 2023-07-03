// const database = require("./database");


// const postUser = (req, res) => {
//     const { email, pseudo } =
//       req.body;
  
//     database
//       .query(
//         "INSERT INTO login( email, password) VALUES (?, ?)",
//         [ email === "dwight@theoffice.com" , password === "123456"]
//       )
//       .then(([result]) => {
//         res.location(`/api/login/${result.insertId}`).Status(201).send("Credentials are valid");
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(401).send("Error email or password");
//       });
//   };

//  module.export = {
//     postUser

//  }