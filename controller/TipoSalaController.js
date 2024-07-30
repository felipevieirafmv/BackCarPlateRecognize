import TipoSala from '../model/tipoSala.js';

export default class TipoSalaController {
    
    static async getAllTipoSala(req, res) {
        try{
            const tiposSala = await TipoSala.findAll();
            return res.status(200).send({ data: tiposSala })
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }

    static async getTipoSalaByID(req, res) {
        const { id } = req.params;
        try {
            const roomType = await TipoSala.findByPk(id);
            return res.status(200).json(roomType);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    static async create (req, res) {
        const { nome } = req.body;

        if(!nome)
            return res.status(400).send({ message: "Não tem como criar um tipo de sala sem um nome!" })

        try {
            const obj = 
            {
                Nome : nome
            }

            const createdTipoSala = await TipoSala.create(obj);

            return res.status(201).send({ message: "Tipo de sala cadastrado com sucesso", body: createdTipoSala })
    
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            return res.status(500).send({ error:error })
        }
    }

    static async updateTipoSala(req, res){
        const {nome} = req.body;

        const { id } = req.params;

        if(!nome)
            return
        
        if(!id)
            return res.status(400).send({ message: "Id não especificado" })
        
        const IDTipoSala = id

        try {
            const type = await TipoSala.update(
                {
                    Nome:nome
                },
                {
                    where:{
                        ID: IDTipoSala
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
            const deletedTipoSala = await TipoSala.destroy({ where: { ID: id } });
    
            if (!deletedTipoSala) {
                return res.status(404).send({ message: "Tipo de sala não encontrado" });
            }
    
            return res.status(200).send({ message: "Tipo de sala deletado com sucesso", body: deletedTipoSala });
        } catch (error) {
            console.error("Erro ao deletar tipo de sala:", error);
            return res.status(500).send({ error: "Erro interno ao deletar tipo de sala" });
        }
    }
    
}
