import express from "express";
import TipoSalaController from "../controller/TipoSalaController.js"
import TipoEquipamentoController from "../controller/TipoEquipamentoController.js"
import { upload, uploadImagem, getImagemByID  } from '../controller/ImagemController.js';
import SalaController from "../controller/SalaController.js";
import TipoFuncionarioController from "../controller/TipoFuncionarioController.js";
import FuncionarioController from "../controller/FuncionarioController.js";

const routes = express.Router();

// TipoSala
routes.post("/api/tipoSala/", TipoSalaController.create)
routes.get("/api/tipoSala/", TipoSalaController.getAllTipoSala)
routes.get("/api/tipoSala/:id", TipoSalaController.getTipoSalaByID)
routes.put("/api/tipoSala/:id", TipoSalaController.updateTipoSala)
routes.delete("/api/tipoSala/:id", TipoSalaController.delete)

// TipoEquipamento
routes.post("/api/tipoEquipamento/", TipoEquipamentoController.create)
routes.get("/api/tipoEquipamento/", TipoEquipamentoController.getAllTipoEquipamento)
routes.get("/api/tipoEquipamento/:id", TipoEquipamentoController.getTipoEquipamentoByID)
routes.put("/api/tipoEquipamento/:id", TipoEquipamentoController.updateTipoEquipamento)
routes.delete("/api/tipoEquipamento/:id", TipoEquipamentoController.delete)

// TipoFuncionario
routes.post("/api/tipoFuncionario/", TipoFuncionarioController.create)
routes.get("/api/tipoFuncionario/", TipoFuncionarioController.getAllTipoFuncionario)
routes.get("/api/tipoFuncionario/:id", TipoFuncionarioController.getTipoFuncionarioByID)
routes.put("/api/tipoFuncionario/:id", TipoFuncionarioController.updateTipoFuncionario)
routes.delete("/api/tipoFuncionario/:id", TipoFuncionarioController.delete)

// Funcionario
routes.post("/api/funcionario/", FuncionarioController.create)
routes.get("/api/funcionario/", FuncionarioController.getAllFuncionario)
routes.get("/api/funcionario/:id", FuncionarioController.getFuncionarioById)
routes.put("/api/funcionario/:id", FuncionarioController.updateFuncionario)
routes.delete("/api/funcionario/:id", FuncionarioController.delete)

//Imagem
routes.post('/api/imagem/', upload.single('foto'), uploadImagem);
routes.get('/api/imagem/:id', getImagemByID);

// Sala
routes.post("/api/sala/", SalaController.create)
routes.get("/api/sala/", SalaController.getAllSala)
routes.get("/api/sala/:id", SalaController.getSalaByID)
routes.put("/api/sala/:id", SalaController.updateSala)
routes.delete("/api/sala/:id", SalaController.delete)




export { routes as default };