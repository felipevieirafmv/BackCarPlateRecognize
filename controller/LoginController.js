import Funcionario from '../model/funcionario.js';
import bcrypt from 'bcrypt';

export default class LoginController {

  static async login(req, res) {    
    const { edv, password } = req.body;

    if (!edv) {
      return res.status(422).json({ message: "O EDV é obrigatório" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória" });
    }

    try {
      const user = await Funcionario.findOne({ where: { EDV: edv } });

      if (!user) {
        return res.status(422).json({ message: "EDV e/ou senha inválidos" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.Senha);

      if (!isPasswordValid) {
        return res.status(422).json({ message: "EDV e/ou senha inválidos" });
      }

      return res.status(200).send({ message: "Usuário logado com sucesso" });
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      return res.status(500).send({ message: "Ocorreu um erro interno", data: error.message });
    }
  }
}
