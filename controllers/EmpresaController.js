const EmpresaDAO = require("../daos/EmpresaDAO");

class EmpresaController{

    index(req,res) {
    EmpresaDAO.findAll(req.query.nome, (err,empresas) =>{
        if(err) return res.status(500).json({error: err.message});
        res.json(empresas);
    });
}
    show(req,res){
    const id = req.params.id;
    EmpresaDAO.findById(id, (err,empresa)=>{
        if (err) return res.status(500).json({error:err.message});
        if (empresa){
            res.json(empresa);
        } else {
            res.status(404).json("Empresa não encontrada");
        }
    });
}
    create(req,res){
    const nome = req.body.nome;
    if (!nome) return res.status(400).json({error:"Campo nome é obrigatorio."});
    EmpresaDAO.create(nome,(err,empresa)=>{
        if (err) return res.status(500).json({error:err.message});
        res.status(201).json(empresa);
    });
}
    update(req,res) {

    const nome = req.body.nome;
    const id = req.params.id;

    EmpresaDAO.update(id,nome,(err,empresa)=>{
        if (err) return res.status(500).json({error:err.message});
        if(!empresa) return res.status(404).json({error:err.message});
        res.json(empresa);
    });
}
    delete(req,res) {
    const id = req.params.id;

    EmpresaDAO.delete(id,(err,empresa)=>{

        if(err) return res.status(500).json({error:err.message});
        if(!empresa) return res.status(404).json({error:err.message});
        res.json({message: "Empresa removida com sucesso."});
    });
}
}

module.exports = new EmpresaController