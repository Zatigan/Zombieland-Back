import { Attraction } from "./attraction.model.js";
import { Category } from "./category.model.js";
import { User } from "./user.model.js";
import { Reservation } from "./reservation.model.js";
import { sequelize } from "./sequelize-client.js";

User.hasMany(Reservation, {
  as: "reservations",
  foreignKey: {
    name: "user_id",
    allowNull: true
  },
});

Reservation.belongsTo(User, {
  as : "user",
  foreignKey: {
    name : "user_id",
    allowNull: true
  }
})

Attraction.belongsToMany(Category,{
through: "attraction_category",
as: "categories",
foreignKey: "attraction_id"
});

Category.belongsToMany(Attraction,{
  through: "attraction_category",
  as: "attractions",
  foreignKey: "category_id"
})

export {User, Reservation, Attraction, Category, sequelize}