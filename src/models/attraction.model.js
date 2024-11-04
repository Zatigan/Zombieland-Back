import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Attraction extends Model {}

Attraction.init ({
  name:{
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image:{
    type: DataTypes.STRING(50),
  },
  description_short:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description_long: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  opening_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  closing_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  disable_access: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  weather_hazard: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  height_restriction: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  health_hazard: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
  caroussel1:{
    type: DataTypes.STRING(50),
  },
  caroussel2:{
    type: DataTypes.STRING(50),
  },
  caroussel3:{
    type: DataTypes.STRING(50),
  },
}, {
  sequelize,
  tableName: "attraction",
});