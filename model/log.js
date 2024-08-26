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
  HoraEntrada: {
    type: DataTypes.DATE,
    allowNull: false
  },
  HoraSaida: {
    type: DataTypes.DATE,
    allowNull: false
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