const db = require("../db").db

class RelatorioDAO{

    static findmostsell(callback){

        const query =`
        SELECT
            p.id AS id_do_produto,
            p.nome AS nome_do_produto,
            p.marca AS marca_do_produto,
            SUM(ped.quantidade) AS quantidade_total_vendida
        FROM
            pedidos ped
        JOIN
            produto p ON ped.fk_id_produto = p.id
        GROUP BY
            p.id, p.nome, p.marca
        ORDER BY
            quantidade_total_vendida DESC
        LIMIT 1;
        `;
        db.get(query,[],(err,row) => {
            if(err){
                console.error("Erro no DAO ao buscar produto mais vendido:",err.message);
                return callback(err, null);
            }
            callback(null,row);
        })
    }

}

module.exports = RelatorioDAO;
