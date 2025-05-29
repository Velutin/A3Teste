    const sqlite3 = require("sqlite3").verbose();
    require("dotenv").config();

    class Database {
        _createTable(){

            const tbproduto = `
                CREATE TABLE IF NOT EXISTS produto (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                marca TEXT,
                peso INTEGER NOT NULL,
                preco REAL NOT NULL,
                estoque INTEGER  NOT NULL,
                disponivel_venda INTEGER DEFAULT 1
                );
            `;
             this.db.run(tbproduto,(err) => {
                if(err) console.error("Erro ao criar tabela: ", err.message);
                else {
                    console.log("Tabela 'produtos' verificada/criada.");
                }
            });   
            const tbVendedor = `
                CREATE TABLE IF NOT EXISTS vendedores (
                matricula INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                telefone TEXT NOT NULL,
                endereço TEXT NOT NULL,
                cpf TEXT NOT NULL UNIQUE
                );
            `;
            this.db.run(tbVendedor,(err) => {
                if(err) console.error("Erro ao criar tabela: ", err.message);
                else {
                    console.log("Tabela 'vendedores' verificada/criada.");
                }
            });   
            const tbCliente = `
                CREATE TABLE IF NOT EXISTS clientes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                telefone TEXT NOT NULL,
                endereço TEXT NOT NULL,
                cpf TEXT NOT NULL UNIQUE,
                valorgasto REAL DEFAULT 0
                );
            `;
            this.db.run(tbCliente,(err) => {
                if(err) console.error("Erro ao criar tabela: ", err.message);
                else {
                    console.log("Tabela 'clientes' verificada/criada.");
                }
            });            
        }
        _seed(){                                                
        }
        _connect(){
            this.db = new sqlite3.Database(process.env.DB_NAME,(err)=>{
                if (err){
                    console.error("Erro ao conectar no SQlite: ",err.message);
                }else{
                    console.log("Conectado ao SQLite.");
                    this._createTable();
                }
            })
        }

        constructor(){
            if(!Database.instance){
                this._connect();
                Database.instance = this;
            }
            return Database.instance;
        }

    }

    module.exports = new Database();
