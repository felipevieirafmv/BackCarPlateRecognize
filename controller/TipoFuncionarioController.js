import TipoFuncionario from '../model/tipoFuncionario.js';

export default class TipoFuncionarioController {
    
    static async getAllTipoFuncionario(req, res) {
        try{
            const tiposFuncionario= await TipoFuncionario.findAll();
            return res.status(200).send({ data: tiposFuncionario })
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }

    static async getTipoFuncionarioByID(req, res) {
        const { id } = req.params;
        try {
            const roomType = await TipoFuncionario.findByPk(id);
            return res.status(200).json(roomType);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    static async create (req, res) {
        const { nome } = req.body;

        if(!nome)
            return res.status(400).send({ message: "Não tem como criar um tipo de funcionário sem um nome!" })

        try {
            const obj = 
            {
                Nome : nome
            }

            const createdTipoFuncionario = await TipoFuncionario.create(obj);

            return res.status(201).send({ message: "Tipo de funcionário cadastrado com sucesso", body: createdTipoFuncionario })
    
        } catch (error) {
            console.error("Erro ao criar tipo funcionário: ", error);
            return res.status(500).send({ error:error })
        }
    }

    static async updateTipoFuncionario(req, res){
        const {nome} = req.body;

        const { id } = req.params;

        if(!nome)
            return
        
        if(!id)
            return res.status(400).send({ message: "Id não especificado" })
        
        const IDTipoFuncionario = id

        try {
            const type = await TipoFuncionario.update(
                {
                    Nome:nome
                },
                {
                    where:{
                        ID: IDTipoFuncionario
                    }
                }
            );
            console.log(type)
            return res.status(201).send({ message: "Tipo funcionário atualizado com sucesso!", body:type })
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
            const deletedTipoFuncionario = await TipoFuncionario.destroy({ where: { ID: id } });
    
            if (!deletedTipoFuncionario) {
                return res.status(404).send({ message: "Tipo de funcionário não encontrado" });
            }
    
            return res.status(200).send({ message: "Tipo de funcionário deletado com sucesso", body: deletedTipoFuncionario });
        } catch (error) {
            console.error("Erro ao deletar tipo de funcionário:", error);
            return res.status(500).send({ error: "Erro interno ao deletar tipo de funcionário" });
        }
    }
    
}
