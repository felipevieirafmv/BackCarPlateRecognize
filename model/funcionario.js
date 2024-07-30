import { DataTypes } from 'sequelize';
import sequelize from '../startup/db.js';

const Funcionario = sequelize.define('Funcionario', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nome: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  EDV: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  Senha: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Salt: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  Adm: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

// Definindo relacionamentos
// Funcionario.belongsTo(Endereco, { foreignKey: 'EnderecoID' });
// Funcionario.belongsTo(TipoFuncionario, { foreignKey: 'TipoFuncionarioID' });

export default Funcionario;