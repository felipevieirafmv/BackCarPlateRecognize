import TipoEquipamento from '../model/tipoEquipamento.js';

export default class TipoEquipamentoController {
    
    static async getAllTipoEquipamento(req, res) {
        try{
            const tiposEquipamento = await TipoEquipamento.findAll();
            return res.status(200).send({ data: tiposEquipamento })
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }

    static async getTipoEquipamentoByID(req, res) {
        const { id } = req.params;
        try {
            const equipType = await TipoEquipamento.findByPk(id);
            return res.status(200).json(equipType);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    static async create (req, res) {
        const { nome } = req.body;

        if(!nome)
            return res.status(400).send({ message: "Não tem como criar um tipo de equipamento sem um nome!" })

        try {
            const obj = 
            {
                Nome : nome
            }

            const createdTipoEquipamento = await TipoEquipamento.create(obj);

            return res.status(201).send({ message: "Tipo de equipamento cadastrado com sucesso", body: createdTipoEquipamento })
    
        } catch (error) {
            console.error("Erro ao criar tipo de equipamento: ", error);
            return res.status(500).send({ error:error })
        }
    }

    static async updateTipoEquipamento(req, res){
        const {nome} = req.body;

        const { id } = req.params;

        if(!nome)
            return
        
        if(!id)
            return res.status(400).send({ message: "Id não especificado" })
        
        const IDTipoEquipamento = id

        try {
            const type = await TipoEquipamento.update(
                {
                    Nome:nome
                },
                {
                    where:{
                        ID: IDTipoEquipamento
                    }
                }
            );
            console.log(type)
            return res.status(201).send({ message: "Tipo equipamento atualizado com sucesso!", body:type })
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
            const deletedTipoEquipamento = await TipoEquipamento.destroy({ where: { ID: id } });
    
            if (!deletedTipoEquipamento) {
                return res.status(404).send({ message: "Tipo de equipamento não encontrado" });
            }
    
            return res.status(200).send({ message: "Tipo de equipamento deletado com sucesso", body: deletedTipoEquipamento });
        } catch (error) {
            console.error("Erro ao deletar tipo de equipamento:", error);
            return res.status(500).send({ error: "Erro interno ao deletar tipo de equipamento" });
        }
    }
    
}
