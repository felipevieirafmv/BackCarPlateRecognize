import { DataTypes } from 'sequelize';
import sequelize from '../startup/db.js';
import Funcionario from './funcionario.js';

const Carro = sequelize.define('Carro', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Cor: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Placa: {
    type: DataTypes.STRING(7),
    allowNull: false,
  },
  Modelo: {
    type: DataTypes.STRING(100),
  },
  Ano: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  FuncionarioID: {
    type: DataTypes.INTEGER,
    references: {
      model: Funcionario,
      key: 'ID',
    },
  },
}, {
  tableName: 'Carro',
  timestamps: false,
});

Carro.belongsTo(Funcionario, { foreignKey: 'FuncionarioID' });

export default Carro;