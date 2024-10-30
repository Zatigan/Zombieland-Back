import { Attraction } from "./attraction.model.js";
import { Category } from "./category.model.js";
import { User } from "./user.model.js";
import { Reservation } from "./reservation.model.js";
import { sequelize } from "./sequelize-client.js";

User.hasMany(Reservation, {
  as: "reservations",
  foreignKey: {
    name: "user_id",
    allowNull: false
  },
});

Reservation.belongsTo(User, {
  as : "user",
  foreignKey: {
    name : "user_id",
    allowNull: false
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
const categories = await Category.findAll({ include: "attractions" });
    console.log(JSON.stringify(categories, null, 2));
export {User, Reservation, Attraction, Category, sequelize}