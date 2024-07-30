import TipoSala from '../model/tipoSala.js';
import Sala from '../model/sala.js';

export default class SalaController {
    
    static async getAllSala(req, res) {
        try{
            const salas = await Sala.findAll();
            return res.status(200).send({ data: salas })
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }

    static async getSalaByID(req, res) {
        const { id } = req.params;
        try {
            const roomType = await Sala.findByPk(id);
            return res.status(200).json(roomType);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    static async create (req, res) {
        const { nome, andar, tipoSala } = req.body;

        if(!nome || !andar || !tipoSala)
            return res.status(400).send({ message: "Não tem como criar uma sala sem os dados!" })

        const tipoSalaID = await TipoSala.findByPk(tipoSala)
        if(!tipoSalaID)
            return res.status(400).send({ message: "id do tipo sala não encontrado" })

        try {
            const obj = 
            {
                Nome : nome,
                Andar : andar,
                TipoSalaID : tipoSalaID.ID
            }

            const createdSala = await Sala.create(obj);

            return res.status(201).send({ message: "Sala cadastrada com sucesso", body: createdSala })
    
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            return res.status(500).send({ error:error })
        }
    }

    static async updateSala(req, res){
        let {nome, andar, tipoSala} = req.body;

        const { id } = req.params;
        
        if(!id)
            return res.status(400).send({ message: "Id não especificado" })
        
        const sala = await Sala.findByPk(id)
        if(!sala)
            return res.status(400).send({ message: "Sala não encontrada." })
            
        if(!nome)
            nome = sala.Nome
        if(!andar)
            andar = sala.Andar
        if(!tipoSala)
            tipoSala = sala.TipoSalaID

        const tipoSalaID = await TipoSala.findByPk(tipoSala)
        if(!tipoSalaID)
            return res.status(400).send({ message: "id do tipo sala não encontrado" })

        try {
            const type = await Sala.update(
                {
                    Nome:nome,
                    Andar:andar,
                    TipoSalaID: tipoSalaID.ID
                },
                {
                    where:{
                        ID: sala.ID
                    }
                }
            );
            console.log(type)
            return res.status(201).send({ message: "Tipo sala atualizado com sucesso!", body:type })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).send({ message: "ID não informado" });
        }
    
        try {
            const deletedSala = await Sala.destroy({ where: { ID: id } });
    
            if (!deletedSala) {
                return res.status(404).send({ message: "Sala não encontrada" });
            }
    
            return res.status(200).send({ message: "Sala deletada com sucesso", body: deletedSala });
        } catch (error) {
            console.error("Erro ao deletar sala:", error);
            return res.status(500).send({ error: "Erro interno ao deletar sala" });
        }
    }
    
}
