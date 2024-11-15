import { Reservation, User } from "../../models/index.js";

export async function reservationPage(req, res) {
  const reservations = await Reservation.findAll({
    include: [
      {model: User,
      as: "user"}],
      order: [['id', 'ASC']]
});
  console.log(reservations);
  
  const successMessage = req.query.success;
  res.render("reservations", {reservations, successMessage})
};

export async function getOneReservation(req, res) {
  const reservationId = parseInt(req.params.id)
  //console.log(reservationId);
  const reservation = await Reservation.findByPk(reservationId)

  res.render("reservation", {reservation}) 
}

export async function updateReservation(req, res) {
  const reservationId = parseInt(req.params.id)
  console.log(reservationId);
  const reservation = await Reservation.findByPk(reservationId)

const { ref_number, date, ticket, total_price }= req.body
const cost = ticket*60


await reservation.update({
  ref_number: ref_number || reservation.ref_number,
  date: date || reservation.date,
  ticket: ticket || reservation.ticket,
  total_price: cost,
});

res.redirect('/admin/reservations?success=true')
}