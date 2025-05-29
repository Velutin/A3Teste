const JogoDAO = require("../daos/JogoDAO");

class JogoController {
    index(req,res){
        JogoDAO.findall(req.query.categoria,(err,jogos) =>{
        if (err) return res.status(500).json({error:err.message});
        res.json(jogos);
    });
    }
    show(req,res) {
    const id = req.params.id;
    JogoDAO.findById(id, (err,jogo) =>{
        if(err) return res.status(500).json({error: err.message});
        if (jogo) {
            res.json(jogo);
        }else{
            res.status(404).json("Jogo não encontrado.");
        }
    });    
    }
    create(req,res) {
    const { nome, categoria, ano,fkEmpresa } = req.body;
    if (!nome || !categoria ||!ano ||!fkEmpresa){
        return res.status(400).json({error:"Campos nome,categoria, ano e empresa são obrigatorios"});
    }
    JogoDAO.create(nome,categoria,ano,fkEmpresa,(err,jogo)=>{
        if (err) return res.status(500).json({error: err.message});
        res.status(201).json(jogo);
    });        
    }
    update(req,res) {
    const {nome, categoria, ano} = req.body;
    const id = req.params.id;

    JogoDAO.update(id,nome,categoria,ano,(err,jogo)=>{
        if (err) return res.status(500).json({error:err.message});
        if (!jogo) return res.status(404).json({error:err.message});
        res.send(jogo);        
    });
    }
    delete(req,res) {
        
    const id = req.params.id;

    JogoDAO.delete(id,(err,jogo)=>{
        if(err) return res.status(500).json({error: err.message});
        if(!jogo) return res.status(404).json({error:err.message});
        res.json({message:" Jogo removido com sucesso"});
    });
    }
}
    

module.exports = new JogoController;