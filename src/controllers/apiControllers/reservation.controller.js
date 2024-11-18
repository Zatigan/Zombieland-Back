import { Reservation, sequelize } from "../../models/index.js"

// Fonction pour récupérer la page de réservation avec la disponibilité par date
export async function getReservationPage(req, res) {

  // Récupère toutes les réservations avec la date et le nombre de tickets réservés pour chaque date
  // Additionne le nombre de tickets par date pour obtenir un total par jour
  const availability = await Reservation.findAll({
    attributes: ['date',
      [sequelize.fn('SUM', sequelize.col('ticket')), 'tickets_reserved']
    ],
    group: ['date'],
    raw: true // Retourne les résultats sous forme d'objet brut, sans métadonnées Sequelize
  })

  // Mappe sur chaque date et calcule le nombre de tickets disponibles
  // en soustrayant le nombre de tickets réservés du nombre maximum (ici, 100)
  const dateAvailability = availability.map((available)=> ({
    date: available.date,
    available: (100 - available.tickets_reserved),
  }));

  res.json(dateAvailability);
}

// Fonction pour ajouter une nouvelle réservation
export async function addReservation(req, res) {

// Récupère les champs nécessaires du corps de la requête
const { date, ticket, price, user_id } = req.body;

 // Vérifie que les champs 'date' et 'ticket' sont bien présents
 if (!date) {
  return res.status(400).json({ error: "La date est requise pour la réservation." }); /* A date is required. */
}
if (!ticket || ticket <= 0) {
  return res.status(400).json({ error: "Le nombre de billets doit être supérieur à zéro." }); /* Ticket quantity must be over 0. */
}

 // Récupère le nombre total de billets déjà réservés pour la date spécifiée
 const dateAvailability = await Reservation.findOne({
  attributes: [
    'date',
    [sequelize.fn('SUM', sequelize.col('ticket')), 'tickets_reserved']
  ],
  where: { date },
  group: ['date'],
  raw: true,
});

const ticketsReserved = dateAvailability ? parseInt(dateAvailability.tickets_reserved): 0;
const ticketsAvailable = 100 - ticketsReserved;

if (ticket > ticketsAvailable)
  {
    return res.status(400).json({ 
      error: `Il ne reste que ${ticketsAvailable} billets disponibles pour cette date.`  /* Only ${ticketsAvailable} tickets left for that date. */
    });
  }
// Recherche la dernière réservation créée pour récupérer le numéro de référence le plus élevé
const lastRefReservation = await Reservation.findOne({
  order: [['ref_number', 'DESC']],
  attributes: ['ref_number'],
});

// Génère un nouveau numéro de référence en ajoutant 1 au dernier numéro trouvé
const newRefNumber = lastRefReservation.ref_number +1;

// Prépare les données de la nouvelle réservation avec les informations fournies
const reservationData = {
  ref_number: newRefNumber,
  date,
  ticket,
  total_price: price,
  user_id
}

const createReservation = await Reservation.create(reservationData)

  res.json(createReservation);
}

