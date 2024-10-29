import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client"

export class Reservation extends Model {}

Reservation.init({
  ref_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  ticket: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  total_price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
},{
  sequelize,
  tableName: "reservation"
});
