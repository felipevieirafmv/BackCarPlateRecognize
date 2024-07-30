import Endereco from "../model/endereco.js";
import Funcionario from "../model/funcionario.js";
import TipoFuncionario from "../model/tipoFuncionario.js";
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
            const endereco = await Endereco.findByPk(user.EnderecoID); // Use o EnderecoID do usuário
            return res.status(200).json({ user, endereco });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        console.log("chegou")
        const { nome, matricula, senha, endereco, tipoFuncionarioID } = req.body;

        console.log("chegou2")

        console.log(nome, matricula, senha, endereco, tipoFuncionarioID)
        if (!nome || !matricula || !senha || !endereco)
            return res.status(400).send({ message: "Não é possível criar um funcionário sem os dados necessários!" });

        const tipoFuncionario = await TipoFuncionario.findByPk(tipoFuncionarioID);

        if (!tipoFuncionario)
            return res.status(400).send({ message: "Tipo de funcionário não encontrado" });

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
                Matricula: matricula,
                Senha: hashedSenha,
                Salt: salt,
                EnderecoID: createEndereco.ID,
                TipoFuncionarioID: tipoFuncionarioID
            };
            const createdFuncionario = await Funcionario.create(funcionario);

            return res.status(201).send({ message: "Funcionário cadastrado com sucesso", body: createdFuncionario });

        } catch (error) {
            console.error("Erro ao criar funcionário: ", error);
            return res.status(500).send({ error: error.message });
        }
    }

    static async updateFuncionarioEndereco(req, res) {
        const { nome, matricula, senha, endereco } = req.body;
        const { id } = req.params;

        if (!nome || !matricula || !senha)
            return res.status(400).send({ message: "Não é possível atualizar o funcionário sem os dados necessários!" });

        if (!id)
            return res.status(400).send({ message: "ID não fornecido" });

        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedSenha = await bcrypt.hash(senha, salt);

            const user = await Funcionario.update(
                {
                    Nome: nome,
                    Matricula: matricula,
                    Senha: hashedSenha,
                    Salt: salt
                },
                {
                    where: {
                        ID: id
                    }
                }
            );

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
                        ID: id 
                    }
                }
            );

            return res.status(201).send({ message: "Usuário e Endereco Atualizados com sucesso", body: { user, enderecoAtualizado } });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async updateFuncionario(req, res) {
        const { nome, matricula, senha } = req.body;
        const { id } = req.params;

        if (!nome || !matricula || !senha)
            return res.status(400).send({ message: "Não é possível atualizar o funcionário sem os dados necessários!" });

        if (!id)
            return res.status(400).send({ message: "ID não fornecido" });

        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedSenha = await bcrypt.hash(senha, salt);

            const user = await Funcionario.update(
                {
                    Nome: nome,
                    Matricula: matricula,
                    Senha: hashedSenha,
                    Salt: salt
                },
                {
                    where: {
                        ID: id
                    }
                }
            );

            return res.status(201).send({ message: "Usuário Atualizado com sucesso", body: user });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async updateEndereco(req, res) {
        const { endereco } = req.body;
        const { id } = req.params;

        if (!endereco)
            return res.status(400).send({ message: "Endereço não fornecido" });

        if (!id)
            return res.status(400).send({ message: "ID não fornecido" });

        try {
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
                        ID: id
                    }
                }
            );

            return res.status(201).send({ message: "Endereço atualizado com sucesso", body: enderecoAtualizado });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!id)
            return res.status(400).send({ message: "ID não fornecido" });

        try {
            const p = await Funcionario.destroy({ where: { IDFuncionario: id } });
            return res.status(200).send({ message: "Funcionário Deletado com sucesso", body: p });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}
