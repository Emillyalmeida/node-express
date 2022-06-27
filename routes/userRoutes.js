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
    .route("/users/:id")
    .get((req, res) => {
      const users = getUsers();
      res.send({ users });
    })
    .post((req, res) => {
      const users = getUsers();

      users.push(req.body);
      saveUsers(users);

      res.status(201).send("usuario criado com sucesso");
    })
    .put((req, res) => {
      const users = getUsers();

      saveUsers(
        users.map((user) => {
          if (user.id == req.params.id) {
            return {
              ...user,
              ...req.body,
            };
          }
          return user;
        })
      );
      res.status(201).send("o usuario foi atualizado");
    })
    .delete((req, res) => {
      const users = getUsers();

      const IsExistUser = users.some((user) => user.id == req.params.id);

      if (!IsExistUser) {
        return res.status(404).send("o usuario não existe");
      }

      saveUsers(users.filter((user) => user.id != req.params.id));
      res.status(201).send("o usuario foi deletado");
    });
};

module.exports = userRouters;
