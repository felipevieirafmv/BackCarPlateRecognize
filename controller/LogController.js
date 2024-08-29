import Carro from '../model/carro.js';
import Funcionario from '../model/funcionario.js';
import Log from '../model/log.js';
import { Op } from 'sequelize';

export default class LogController {
    static async searchLogByDate(req, res){
        const dateToSearch = req.body.date;
        const carToSearch = req.body.car;
        try {
            const log = await Log.findAll(
                {
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { DiaEntrada: dateToSearch },
                                    { DiaSaida: dateToSearch }
                                ]
                            },
                            { CarroID: carToSearch }
                        ]
                    }
                }
            );
            if (!log) {
                return res.status(404).send({ message: "Carro não encontrado" });
            }
            return res.status(200).json(log);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

        // try {
        //     const funcionario = await Funcionario.findOne({
        //         where: {
        //             edv: 12345678
        //         }
        //     });

        //     const carro2 = await Carro.findOne({
        //         where: {
        //             placa: 1234567
        //         }
        //     })
    
        //     if (!funcionario || !carro2) {
        //         return res.status(400).send({ message: "Deu ruim" });
        //     }

        //     const log = {
        //         DiaEntrada: new Date().toLocaleDateString('fr-CA'),
        //         HoraEntrada: new Date().toLocaleTimeString('pt-BR'),
        //         DiaSaida: new Date().toLocaleDateString('fr-CA'),
        //         HoraSaida: new Date().toLocaleTimeString('pt-BR'),
        //         FuncionarioID: funcionario.ID,
        //         CarroID: carro2.ID
        //     };
    
        //     const createdLog = await Log.create(log);
    
        //     return res.status(201).send({ message: "Carro cadastrado com sucesso", body: createdLog });
    
        // } catch (error) {
        //     console.error("Erro ao criar carro: ", error);
        //     return res.status(500).send({ error: error.message });
        // }
    }

    static async getByCar(req, res){
        const { id } = req.params

        try {
            const logs = await Log.findAll({ where: { CarroID: id } });
            if (!logs) {
                return res.status(404).send({ message: "Carro não encontrado" });
            }
            return res.status(200).json(logs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}