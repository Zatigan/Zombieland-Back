import { User } from "../../models/index.js";
import { Reservation, sequelize } from "../../models/index.js";
import sanitizeHtml from "sanitize-html";
import Joi from "joi";

//* ====================== Validation Schemas ======================

const userSchema = Joi.object({
  firstname: Joi.string().max(50).required(), 
  lastname: Joi.string().max(50).required(), 
  email: Joi.string().email().max(100).required(), 
  password: Joi.string().min(12).max(255).required(), 
  profil_image: Joi.string().uri().max(255).optional(), 
  pseudo: Joi.string().max(50).optional(), 
  adress: Joi.string().max(50).optional(), 
  postal_code: Joi.string().max(20).optional(),
  city: Joi.string().max(50).optional(), 
  role: Joi.string().valid('member', 'admin').default('member').optional(), 
});




//* ====================== Functions à mettre plus tard dans l'adminControllers ======================

export async function getAllUsers(req,res) {
  const users = await User.findAll()

  res.json(users)
}

export async function getOneUser(req,res) {
  const userId = req.params.id;

  const user = await User.findByPk(userId);

  res.json(user);
}

//* ====================== Fin des functions à bouger plus tard ======================


export async function myProfile(req, res) {
      // Récupération des informations de l’utilisateur connecté à partir de son ID.
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      user.firstname = sanitizeHtml(user.firstname);
      user.lastname = sanitizeHtml(user.lastname);
      
     /*  user.profilePicture = user.profilePicture
          ? ImageService.getImageUrl(req, user.profilePicture)
          : null; */         
      res.json(user);
  };

export async function reservationByProfile(req, res) {
  const userReservation = await Reservation.findAll({
    where: {
      user_id: req.user.id,
    },
  });          
    res.json(userReservation);
}

export async function updateUser(req, res) {
  
  const userId = Number.parseInt(req.user.id,)
  if(isNaN(userId)) {
    return res.status(404).json({ error: `User not found. Please verify the provided id.`});
  }

  const user = await User.findByPk(userId);

  if(!userId) {
    return res.status(404).json({ error: "User not found. Please verify the provided id." });
  }
  
  const {firstname, lastname, email, profil_image, pseudo, adress, postal_code, city } = req.body; 

  const updateUser = await user.update({
    firstname: sanitizeHtml(firstname || user.firstname),
    lastname: sanitizeHtml(lastname || user.lastname),
    email: sanitizeHtml(email || user.email),
    profil_image: profil_image || user.profil_image,
    pseudo: sanitizeHtml(pseudo || user.pseudo),
    adress: sanitizeHtml(adress || user.adress),
    postal_code: sanitizeHtml(postal_code || user.postal_code),
    city: sanitizeHtml(city || user.city),
  });

  
  res.json(updateUser);
}

export async function delProfile(req, res) {
  const userId = req.user.id
  const user = await User.findByPk(Number.parseInt(userId));

  if (!user) {
    return res.status(404).json({ "error": "Utilisateur non trouvé" });
  }
  
  await user.destroy();
  res.status(200).json({ message: "Profil supprimé avec succès." });
}

export async function delReservationByProfile(req, res) {
  console.log('Requête DELETE reçue sur /profile/reservation/del');
  const {reservationId}  = req.body;
  console.log("ID de la réservation à supprimer :", reservationId);

  const userReservation = await Reservation.findByPk(reservationId);


  if (!userReservation) {
    return res.status(404).json({ "error": "Réservation non trouvée" });
  }

await userReservation.destroy();
res.status(200).json({ message: "Réservation supprimée avec succès" });
} 

export async function updateReservationByProfile(req, res) {

// recup l'id de la réservation et la réservation concernée

const {reservationId, date, ticket, price }  = req.body;
const userReservation = await Reservation.findByPk(reservationId);

if (!userReservation) {
  return res.status(404).json({ "error": "Réservation non trouvée" });
}


 // Vérifie que les champs 'date' et 'ticket' sont bien présents
 if (!date) {
  return res.status(400).json({ error: "La date est requise pour la réservation." });
}
if (!ticket || ticket <= 0) {
  return res.status(400).json({ error: "Le nombre de billets doit être supérieur à zéro." });
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
      error: `Il ne reste que ${ticketsAvailable} billets disponibles pour cette date.` 
    });
  }


  const updateReservation = await userReservation.update({
    date: date || userReservation.date,
    ticket: ticket || userReservation.ticket,
    total_price: price || userReservation.price
  })
  res.json(updateReservation);
}