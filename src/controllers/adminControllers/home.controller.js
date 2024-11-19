import { Attraction, Reservation, User } from "../../models/index.js";

export async function displayHomePage(req, res, next) {
  try {
    
    const [attractions, reservations, users] = await Promise.all([
      Attraction.findAll({ include: "categories", order: [["id", "DESC"]], limit: 3 }),
      Reservation.findAll({
        include: [
          {
            model: User,
            as: "user", 
            attributes: ["email"], 
          },
        ],
        order: [["id", "DESC"]],
        limit: 3,
      }),
      User.findAll({ order: [["id", "DESC"]], limit: 3 }),
    ]);

    
    const successMessage = req.query.success;

    
    res.render("home", { attractions, reservations, users, successMessage });
  } catch (error) {
    
    next(error);
  }
}
