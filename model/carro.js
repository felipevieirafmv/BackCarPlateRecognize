import { DataTypes } from 'sequelize';
import sequelize from '../startup/db.js';
import Funcionario from './funcionario.js';

const Carro = sequelize.define('Carro', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Modelo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Placa: {
    type: DataTypes.STRING(7),
    allowNull: false,
  },
  Cor: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Ano: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  }
});

// Definindo relacionamentos
Funcionario.belongsTo(Funcionario, { foreignKey: 'FuncionarioID' });

export default Funcionario;
