const RelatorioDAO = require("../daos/RelatorioDAO");

class RelatorioController {
    findmostsell(req,res){
        RelatorioDAO.findmostsell((err,produto) =>{
        if (err) return res.status(500).json({error:err.message});
        if (!produto) return res.status(404).json({message:"Nenhum produto vendido encontrado."})
        res.json({
            relatorios: "Produto mais vendido",
            dados: produto});
    });
    }
   
}
    

module.exports = new RelatorioController;