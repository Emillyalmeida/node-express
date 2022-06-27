const fs = require("fs");
const { join } = require("path");

const filePaths = join(__dirname, "users.json");

const getUsers = () => {
  const data = fs.existsSync(filePaths) ? fs.readFileSync(filePaths) : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) =>
  fs.writeFileSync(filePaths, JSON.stringify(users, null, "\t"));

const userRouters = (app) => {
  app
    .route("/users")
    .get((req, res) => {
      const users = getUsers();
      res.send({ users });
    })
    .post((req, res) => {
      const users = getUsers();

      users.push(req.body);
      saveUsers(users);

      res.status(201).send("usuario criado com sucesso");
    });
};

module.exports = userRouters;