import Equipamento from "../model/equipamento";
import Imagem from "../model/Imagem";
import TipoEquipamento from "../model/tipoEquipamento";

export default class EquipamentoController
{
    static async create (req, res) {
        const { nome, quantidade, descricao, tipoEquipamentoID, imagemID } = req.body;

        if(!nome || !quantidade || !descricao || !tipoEquipamentoID || !imagemID)
            return res.status(400).send({ message: "Não tem como criar um equipamento sem os dados!" })

        const tipoEquipamento = await TipoEquipamento.findByPk(tipoEquipamentoID)
        if(!tipoEquipamento)
            return res.status(400).send({ message: "Tipo do equipamento não encontrado" })

        const imagem = await Imagem.findByPk(imagemID)
        if(!imagem)
            return res.status(400).send({ message: "Imagem não encontrada"})

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
}