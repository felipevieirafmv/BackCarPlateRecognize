import multer from 'multer';
import Imagem from '../model/Imagem.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImagem = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    try {
        const novaImagem = await Imagem.create({ Foto: req.file.buffer });
        res.send('Imagem salva com sucesso!');
    } catch (err) {
        console.error('Erro ao salvar a imagem:', err);
        res.status(500).send('Erro ao salvar a imagem.');
    }
};

const getImagemByID = async (req, res) => {
    const { id } = req.params;

    try {
        const imagem = await Imagem.findByPk(id);
        if (!imagem) {
            return res.status(404).send('Nenhuma imagem encontrada.');
        }

        res.set('Content-Type', 'image/jpeg'); // Defina o tipo de conteúdo conforme o tipo de imagem
        res.send(imagem.Foto); // Envie a imagem como resposta
    } catch (err) {
        console.error('Erro ao buscar a imagem:', err);
        res.status(500).send('Erro ao buscar a imagem.');
    }
};

export { upload, uploadImagem, getImagemByID };