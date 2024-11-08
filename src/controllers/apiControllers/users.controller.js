import { User } from "../../models/index.js";
import { Reservation } from "../../models/index.js";
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
  
  const userId = parseInt(req.user.id)
  if(isNaN(userId)) {
    return res.status(404).json({ error: `User not found. Please verify the provided id.`});
  }

  const user = await User.findByPk(userId);

  if(!userId) {
    return res.status(404).json({ error: "User not found. Please verify the provided id." });
  }
  
  const {firstname, lastname, email, profil_image, pseudo, adress, postal_code, country } = req.body; 

  const updateUser = await user.update({
    firstname: firstname || user.firstname,
    lastname: lastname || user.lastname,
    email: email || user.email,
    profil_image: profil_image || user.profil_image,
    pseudo: pseudo || user.pseudo,
    adress: adress || user.adress,
    postal_code: postal_code || user.postal_code,
    country: country || user.country,
  });

  res.json(updateUser);
}

export async function delProfile(req, res) {
  const user = await User.findByPk(parseInt(req.user.id));

  if (!user) {
    return res.status(404).json({ "error": "Utilisateur non trouvé" });
  }
  
  await user.destroy();
  res.status(204).end();
}
