import express from "express";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
import cors from "cors"; 

const app = express();

app.use(cors()); 

app.use(express.json());
app.use(routes);

db.sync(() => console.log(`Banco de dados conectado`));

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));