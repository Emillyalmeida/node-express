const express = require("express");
const bodyParser = require("body-parser");

const userRouters = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 3333;

userRouters(app);

app.listen(port, () => console.log(`a api esta rodando na porta ${port}`));

app.get("/", (req, res) => res.send("my first hello world with express"));
