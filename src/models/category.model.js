import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Category extends Model {}

Category.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "category"
});