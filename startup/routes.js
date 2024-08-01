import express from "express";
import FuncionarioController from "../controller/FuncionarioController.js";
import CarroController from "../controller/CarroController.js"; 
import LoginController from "../controller/LoginController.js";

const routes = express.Router();

// Funcionario
routes.post("/api/funcionario/", FuncionarioController.create);
routes.get("/api/funcionario/", FuncionarioController.getAllFuncionario);
routes.get("/api/funcionario/:id", FuncionarioController.getFuncionarioById);
routes.get("/api/funcionario/:id", FuncionarioController.getFuncionarioByEdv);
routes.put("/api/funcionario/:id", FuncionarioController.updateFuncionario);
routes.delete("/api/funcionario/:id", FuncionarioController.delete);

// Carro
routes.post("/api/carro/", CarroController.create); 
routes.get("/api/carro/", CarroController.getAllCarros); 
routes.get("/api/carro/:id", CarroController.getCarroById);
routes.put("/api/carro/:id", CarroController.updateCarro); 
routes.delete("/api/carro/:id", CarroController.delete); 

// Login

routes.post("/api/login/", LoginController.login)


export { routes as default };
