import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class User extends Model {}

User.init ({
  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  profil_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  pseudo: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
  },
  adress: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  postal_code: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'user',
});
