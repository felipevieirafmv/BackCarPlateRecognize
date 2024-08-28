import Carro from '../model/carro.js';
import Funcionario from '../model/funcionario.js';

export default class CarroController {

    static async getAllCarros(req, res) {
        try {
            const carros = await Carro.findAll();
            return res.status(200).send({ data: carros });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getCarrosByEdv(req, res) {
        const { funcId } = req.params;
        try {
            const carros = await Carro.findAll({ where: { FuncionarioID: funcId } });
            if (!carros) {
                return res.status(404).send({ message: "Carros não encontrados" });
            }
            return res.status(200).json(carros);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getCarrosByPlaca(req, res) {
        const { placa } = req.params;
        try {
            const carro = await Carro.findOne({ where: { Placa: placa } });
            if (!carro) {
                return res.status(404).send({ message: "Carro não encontrado" });
            }
            return res.status(200).json(carro);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getCarroById(req, res) {
        const { id } = req.params;
        try {
            const carro = await Carro.findByPk(id);
            if (!carro) {
                return res.status(404).send({ message: "Carro não encontrado" });
            }
            return res.status(200).json(carro);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        const { cor, placa, modelo, ano, edv } = req.body;
    
        if (!cor || !placa || !ano || !edv) {
            return res.status(400).send({ message: "Todos os campos são obrigatórios!" });
        }
    
        try {
            const funcionario = await Funcionario.findOne({
                where: {
                    edv: edv
                }
            });
    
            if (!funcionario) {
                return res.status(400).send({ message: "Funcionário não encontrado" });
            }
            console.log(funcionario.ID)
    
            const carro = {
                Cor: cor,
                Placa: placa,
                Modelo: modelo,
                Ano: ano,
                FuncionarioID: funcionario.ID
            };
    
            console.log("Dados do carro:", carro);
    
            const createdCarro = await Carro.create(carro);
    
            return res.status(201).send({ message: "Carro cadastrado com sucesso", body: createdCarro });
    
        } catch (error) {
            console.error("Erro ao criar carro: ", error);
            return res.status(500).send({ error: error.message });
        }
    } 

    static async updateCarro(req, res) {
        const { cor, placa, modelo, ano, funcionarioID } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "ID não especificado" });
        }

        try {
            const [updated] = await Carro.update(
                {
                    cor: cor,
                    placa: placa,
                    modelo: modelo,
                    ano: ano,
                    funcionarioID: funcionarioID
                },
                {
                    where: { id: id }
                }
            );

            if (updated) {
                const updatedCarro = await Carro.findByPk(id);
                return res.status(200).send({ message: "Carro atualizado com sucesso", body: updatedCarro });
            }

            return res.status(404).send({ message: "Carro não encontrado" });

        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "ID não informado" });
        }

        try {
            const deleted = await Carro.destroy({ where: { id: id } });

            if (!deleted) {
                return res.status(404).send({ message: "Carro não encontrado" });
            }

            return res.status(200).send({ message: "Carro deletado com sucesso" });

        } catch (error) {
            console.error("Erro ao deletar carro:", error);
            return res.status(500).send({ error: error.message });
        }
    }
}
