const express = require("express");
const JogoController = require("./controllers/JogoController");
const EmpresaController = require("./controllers/EmpresaController");
const ClienteController = require("./controllers/ClienteController");
const VendedorController = require("./controllers/VendedorController");

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.listen(APP_PORT, () =>{
    console.log(`API de jogo em execução na porta ${APP_PORT}.`);
    console.log(`Acesse a url http://localhost:${APP_PORT}`);
});

app.get("/",(req,res) => res.send("API Version 1.1.0 on-line!"));

app.get("/jogos",JogoController.index);

app.get("/clientes",ClienteController.index);
app.get("/clientes/:id",ClienteController.show);
app.post("/clientes",ClienteController.create);
app.put("/clientes/:id",ClienteController.update);
app.delete("/clientes/:id",ClienteController.delete);

app.get("/Vendedor",VendedorController.index);
app.get("/Vendedor/:matricula",VendedorController.show);
app.post("/Vendedor",VendedorController.create);
app.put("/Vendedor/:matricula",VendedorController.update);
app.delete("/Vendedor/:matricula",VendedorController.delete);

app.get("/jogos/:id",JogoController.show);

app.post("/jogos",JogoController.create);

app.put("/jogos/:id",JogoController.update);

app.delete("/jogos/:id",JogoController.delete);

app.get("/empresas",EmpresaController.index);
app.get("/empresas/:id",EmpresaController.show);
app.post("/empresas",EmpresaController.create);

app.put("/empresas/:id",EmpresaController.update);

app.delete("/empresas/:id",EmpresaController.delete);   