const express = require("express");
const ClienteController = require("./controllers/ClienteController");
const VendedorController = require("./controllers/VendedorController");
const ProdutoController = require("./controllers/ProdutoController");
const PedidoController = require("./controllers/PedidoController");
const RelatorioController = require("./controllers/RelatorioController");

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.listen(APP_PORT, () =>{
    console.log(`API de jogo em execução na porta ${APP_PORT}.`);
    console.log(`Acesse a url http://localhost:${APP_PORT}`);
});

app.get("/",(req,res) => res.send("Tudo rodando certinho"));

app.get("/relatorios/mais_vendido",RelatorioController.getMaisVendido);
app.get("/relatorios/cliente/total/:id",RelatorioController.getComprasPorCliente);
app.get("/relatorios/cliente/media/:id",RelatorioController.getCustoMedioPorCliente);
app.get("/relatorios/produto_estoque_baixo",RelatorioController.getEstoqueBaixo)

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

app.get("/Pedido",PedidoController.index);
app.get("/Pedido/:id",PedidoController.show);
app.post("/Pedido",PedidoController.create);
app.put("/Pedido/:id",PedidoController.update);
app.delete("/Pedido/:id",PedidoController.delete);
