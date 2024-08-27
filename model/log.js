import { DataTypes } from 'sequelize';
import sequelize from '../startup/db.js';
import Funcionario from './funcionario.js';
import Carro from './carro.js';

const Log = sequelize.define('Log', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  DiaEntrada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  HoraEntrada: {
    type: DataTypes.TIME,
    allowNull: false
  },
  DiaSaida: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  HoraSaida: {
    type: DataTypes.TIME,
    allowNull: true
  },
  FuncionarioID: {
    type: DataTypes.INTEGER,
    references: {
      model: Funcionario,
      key: 'ID',
    },
  },
  CarroID: {
    type: DataTypes.INTEGER,
    references: {
      model: Carro,
      key: 'ID',
    },
  },
}, {
  tableName: 'Log',
  timestamps: false,
});

Log.belongsTo(Funcionario, { foreignKey: 'FuncionarioID' });
Log.belongsTo(Carro, { foreignKey: 'CarroID' });

export default Log;