const { application } = require("express");
const express = require("express");
const app = express();
const port = 3333;

app.listen(port, () => console.log(`a api esta rodando na porta ${port}`));

app.get("/", (req, res) => res.send("my first hello world with express"));
