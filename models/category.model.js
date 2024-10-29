import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client";

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