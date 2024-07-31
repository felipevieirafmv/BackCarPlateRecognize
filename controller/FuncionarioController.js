import Endereco from "../model/endereco.js";
import Funcionario from "../model/funcionario.js";
import bcrypt from 'bcrypt';

export default class FuncionarioController {

    static async getAllFuncionario(req, res) {
        try {
            const people = await Funcionario.findAll();
            return res.status(200).send({ data: people });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getFuncionarioById(req, res) {
        const { id } = req.params;
        try {
            const user = await Funcionario.findByPk(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getFuncionarioEnderecoById(req, res) {
        const { id } = req.params;
        try {
            const user = await Funcionario.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }
            const endereco = await Endereco.findByPk(user.EnderecoID);
            return res.status(200).json({ user, endereco });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        const { nome, edv, senha, endereco, adm } = req.body;  // Adicionado 'adm'
    
        if (!nome || !edv || !senha || !endereco || adm === undefined) {
            return res.status(400).send({ message: "Todos os campos são obrigatórios!" });
        }
    
        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedSenha = await bcrypt.hash(senha, salt);
    
            const endereco_func = {
                Cep: endereco.cep,
                Cidade: endereco.cidade,
                Bairro: endereco.bairro,
                Rua: endereco.rua,
                Complemento: endereco.complemento,
                Uf: endereco.uf
            };
    
            const createEndereco = await Endereco.create(endereco_func);
    
            const funcionario = {
                Nome: nome,
                EDV: edv,
                Senha: hashedSenha,
                Salt: salt,
                EnderecoID: createEndereco.ID,
                Adm: adm  // Adicionado
            };
            const createdFuncionario = await Funcionario.create(funcionario);
    
            return res.status(201).send({ message: "Funcionário cadastrado com sucesso", body: createdFuncionario });
    
        } catch (error) {
            console.error("Erro ao criar funcionário: ", error);
            return res.status(500).send({ error: error.message });
        }
    }
    
    static async updateFuncionarioEndereco(req, res) {
        const { nome, edv, senha, endereco } = req.body;
        const { id } = req.params;

        if (!nome || !edv || !senha || !endereco) {
            return res.status(400).send({ message: "Todos os campos são obrigatórios!" });
        }

        if (!id) {
            return res.status(400).send({ message: "ID não fornecido" });
        }

        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedSenha = await bcrypt.hash(senha, salt);

            await Funcionario.update(
                {
                    Nome: nome,
                    EDV: edv,
                    Senha: hashedSenha,
                    Salt: salt
                },
                {
                    where: {
                        ID: id
                    }
                }
            );

            await Endereco.update({
                Cep: endereco.cep,
                Cidade: endereco.cidade,
                Bairro: endereco.bairro,
                Rua: endereco.rua,
                Complemento: endereco.complemento,
                Uf: endereco.uf
            },
                {
                    where: {
                        ID: (await Funcionario.findByPk(id)).EnderecoID
                    }
                }
            );

            return res.status(200).send({ message: "Usuário e endereço atualizados com sucesso" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async updateFuncionario(req, res) {
        const { nome, edv, senha, adm } = req.body;  // Adicionado 'adm'
        const { id } = req.params;
    
        if (!nome || !edv || !senha || adm === undefined) {
            return res.status(400).send({ message: "Todos os campos são obrigatórios!" });
        }
    
        if (!id) {
            return res.status(400).send({ message: "ID não fornecido" });
        }
    
        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedSenha = await bcrypt.hash(senha, salt);
    
            const user = await Funcionario.update(
                {
                    Nome: nome,
                    EDV: edv,
                    Senha: hashedSenha,
                    Salt: salt,
                    Adm: adm  // Adicionado
                },
                {
                    where: {
                        ID: id
                    }
                }
            );
    
            return res.status(200).send({ message: "Funcionário atualizado com sucesso", body: user });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    

    static async updateEndereco(req, res) {
        const { endereco } = req.body;
        const { id } = req.params;

        if (!endereco) {
            return res.status(400).send({ message: "Endereço não fornecido" });
        }

        if (!id) {
            return res.status(400).send({ message: "ID não fornecido" });
        }

        try {
            const funcionario = await Funcionario.findByPk(id);
            if (!funcionario) {
                return res.status(404).send({ message: "Funcionário não encontrado" });
            }

            const enderecoAtualizado = await Endereco.update({
                Cep: endereco.cep,
                Cidade: endereco.cidade,
                Bairro: endereco.bairro,
                Rua: endereco.rua,
                Complemento: endereco.complemento,
                Uf: endereco.uf
            },
                {
                    where: {
                        ID: funcionario.EnderecoID
                    }
                }
            );

            return res.status(200).send({ message: "Endereço atualizado com sucesso", body: enderecoAtualizado });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "ID não fornecido" });
        }

        try {
            const funcionario = await Funcionario.findByPk(id);
            if (!funcionario) {
                return res.status(404).send({ message: "Funcionário não encontrado" });
            }

            await Funcionario.destroy({ where: { ID: id } });
            await Endereco.destroy({ where: { ID: funcionario.EnderecoID } });


            return res.status(200).send({ message: "Funcionário e endereço deletados com sucesso" });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}
