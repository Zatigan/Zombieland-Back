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

// Vérification de la validité de la date
const currentDate = new Date();
const reservationDate = new Date(date);

if (reservationDate < currentDate) {
  return res.render("reservation", {
    reservation,
    errorMessageTest: "La date de réservation doit être dans le futur.",
  });
}

const cost = ticket*60

await reservation.update({
  ref_number: ref_number || reservation.ref_number,
  date: date || reservation.date,
  ticket: ticket || reservation.ticket,
  total_price: cost,
});

res.redirect('/admin/reservations?success=true')
}

export async function deleteReservation(req, res) {
  const reservationId = req.params.id
  await Reservation.destroy({ where: { id: reservationId }});

  res.status(201).redirect('/admin/reservations?success=true')
}

export async function addReservationPage(req, res) {
  res.render("newReservation")
}

export async function addReservation(req, res) {

  const { email, ref_number, date, ticket, total_price } = req.body;
  
  // On vérifie qu'aucun champ obligatoire n'est manquant / vide
  if (!email || !date || !ticket) {
    res.status(400).json(({ message: 'Merci de remplir tous les champs obligatoires'}));
    return; 
  }

  // Vérification de la validité de la date
  const currentDate = new Date();
  const reservationDate = new Date(date);

  if (reservationDate < currentDate) {
    return res.render("newReservation", {
      errorMessage: "La date de réservation doit être dans le futur.",
    });
  }


  // On recherche un utilisateur
  const user = await User.findOne({ where: { email }})

  if (!user) {
    return res.status(404).send("Utilisateur non trouvé");
  }
  const cost = ticket*60

  // Recherche la dernière réservation créée pour récupérer le numéro de référence le plus élevé
  const lastRefReservation = await Reservation.findOne({
    order: [['ref_number', 'DESC']],
    attributes: ['ref_number'],
  });

  const newRefNumber = lastRefReservation.ref_number +1;

  const reservationData= {
    user_id: user.id,
    ref_number: newRefNumber,
    date,
    ticket,
    total_price: cost
  }

  await Reservation.create(reservationData)
  res.redirect('/admin/reservations?success=true')
}