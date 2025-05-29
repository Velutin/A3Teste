const express = require("express");
const ClienteController = require("./controllers/ClienteController");
const VendedorController = require("./controllers/VendedorController");
const ProdutoController = require("./controllers/ProdutoController");

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.listen(APP_PORT, () =>{
    console.log(`API de jogo em execução na porta ${APP_PORT}.`);
    console.log(`Acesse a url http://localhost:${APP_PORT}`);
});

app.get("/",(req,res) => res.send("API Version 1.1.0 on-line!"));


app.get("/Clientes",ClienteController.index);
app.get("/Clientes/:id",ClienteController.show);
app.post("/Clientes",ClienteController.create);
app.put("/Clientes/:id",ClienteController.update);
app.delete("/Clientes/:id",ClienteController.delete);

app.get("/Vendedor",VendedorController.index);
app.get("/Vendedor/:matricula",VendedorController.show);
app.post("/Vendedor",VendedorController.create);
app.put("/Vendedor/:matricula",VendedorController.update);
app.delete("/Vendedor/:matricula",VendedorController.delete);

app.get("/Produto",ProdutoController.index);
app.get("/Produto/:id",ProdutoController.show);
app.post("/Produto",ProdutoController.create);
app.put("/Produto/:id",ProdutoController.update);
app.delete("/Produto/:id",ProdutoController.delete);
