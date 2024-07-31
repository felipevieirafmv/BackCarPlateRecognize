import { DataTypes } from 'sequelize';
import sequelize from '../startup/db.js';

const Endereco = sequelize.define('Endereco', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Cep: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Cidade: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Bairro: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Rua: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Complemento: {
    type: DataTypes.STRING(100),
  },
  Uf: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
}, {
  tableName: 'Endereco',
  timestamps: false,
});

export default Endereco;