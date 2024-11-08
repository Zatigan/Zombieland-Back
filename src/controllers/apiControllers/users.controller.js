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

// export default myProfile;

export async function delProfile(req, res) {
  console.log('je passe là')
  const user = await User.findByPk(parseInt(req.user.id));

  if (!user) {
    return res.status(404).json({ "error": "Utilisateur non trouvé" });
  }
  
  await user.destroy();
  res.status(200);
}