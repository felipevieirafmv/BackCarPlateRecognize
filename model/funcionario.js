import { DataTypes } from 'sequelize';
import sequelize from '../startup/db.js';
import Endereco from './endereco.js';

const Funcionario = sequelize.define('Funcionario', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nome: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  EDV: {
    type: DataTypes.CHAR(8),
    allowNull: false,
  },
  Senha: {
    type: DataTypes.TEXT,
  },
  Salt: {
    type: DataTypes.STRING(200),
  },
  Adm: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  EnderecoID: {
    type: DataTypes.INTEGER,
    references: {
      model: Endereco,
      key: 'ID',
    },
  },
}, {
  tableName: 'Funcionario',
  timestamps: false,
});

Funcionario.belongsTo(Endereco, { foreignKey: 'EnderecoID' });


export default Funcionario;