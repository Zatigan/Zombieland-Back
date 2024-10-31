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