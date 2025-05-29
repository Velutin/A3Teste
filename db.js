    const sqlite3 = require("sqlite3").verbose();
    require("dotenv").config();

    class Database {
        _createTable(){
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

            const tbEmpresa = `
                CREATE TABLE IF NOT EXISTS empresas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE
                );
            `;
            this.db.run(tbEmpresa,(err) => {
                if(err) console.error("Erro ao criar tabela: ", err.message);
                else {
                    console.log("Tabela 'empresas' verificada/criada.");
                    this._seed();
                }
            });
            const tbJogo = `
                CREATE TABLE IF NOT EXISTS jogos(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE,
                categoria TEXT NOT NULL,
                ano INTEGER NOT NULL,
                fk_empresa INTEGER NOT NULL,
                FOREIGN KEY(fk_empresa) REFERENCES empresas(id)
                );          
            `;
            this.db.run(tbJogo,(err) => {
                if (err) console.error("Erro ao criar a tabela: ",err.message);
                else console.log("Tabela 'jogos' verificada/criada.");
            });
        }
        _seed(){
            const query = "INSERT INTO empresas(nome) VALUES (?)";
            this.db.run(query,["Nintendo"],(err) => {
                if (err) console.error("Erro ao criar empresa: ", err.message);
                else console.log("Empresa criada.");
            });
            this.db.run(query,["Ubisoft"],(err) => {
                if (err) console.error("Erro ao criar empresa: ", err.message);
                else console.log("Empresa criada.");
            });
            this.db.run(query,["Dumativa"],(err) => {
                if (err) console.error("Erro ao criar empresa: ", err.message);
                else console.log("Empresa criada.");
            });
            this.db.run(query,["Bethesda"],(err) => {
                if (err) console.error("Erro ao criar empresa: ", err.message);
                else console.log("Empresa criada.");
            });
                                                
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
