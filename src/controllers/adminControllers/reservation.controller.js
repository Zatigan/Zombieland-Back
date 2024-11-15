import { Reservation, User } from "../../models/index.js";

export async function reservationPage(req, res) {
  const reservations = await Reservation.findAll({
    include: "user"
  })
  //console.log(reservations);
  
  const successMessage = req.query.success;
  res.render("reservations", {reservations, successMessage})
};

export async function getOneReservation(req, res) {
  const reservationId = parseInt(req.params.id)
  //console.log(reservationId);
  const reservation = await Reservation.findByPk(reservationId, {
    include: "user"
  });
  res.render("reservations", {reservation}) 
}

