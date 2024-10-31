import { Reservation, sequelize } from "../../models/index.js"

export async function getReservationPage(req, res) {

  //récupérer toutes les réservations date + nombre de ticket
  //addition du nombre de tickets par date
  const availability = await Reservation.findAll({
    attributes: ['date',
      [sequelize.fn('SUM', sequelize.col('ticket')), 'tickets_reserved']
    ],
    group: ['date'],
    raw: true
  })

  // Mapper sur les dates et dédire le nombre de tickets réservés au max de place
  const dateAvailability = availability.map((available)=> ({
    date: available.date,
    available: (100 - available.tickets_reserved),
  }));

  res.json(dateAvailability);
}

export async function addReservation(req, res) {

 // On récupère les champs dont on va se servir
const { date, ticket, price } = req.body;

const lastRefReservation = await Reservation.findOne({
  order: [['ref_number', 'DESC']],
  attributes: ['ref_number'],
});

const newRefNumber = lastRefReservation.ref_number +1;

const reservationData = {
  ref_number: newRefNumber,
  date,
  ticket,
  total_price: price
}

console.log(reservationData)
const createReservation = await Reservation.create(reservationData)

  res.json(createReservation);
}

