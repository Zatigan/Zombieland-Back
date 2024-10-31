import Joi from "joi";
import { User } from "../../models/index.js";
import * as argon2 from "argon2";

export async function getAllUsers(req,res) {
  const users = await User.findAll()

  res.json(users)
}

export async function getOneUser(req,res) {
  const userId = req.params.id;

  const user = await User.findByPk(userId);

  res.json(user);
}

export async function createUser(req, res) { 

const userSchema = Joi.object({ 
  firstname: Joi.string().required().min(3).max(50),
  
  lastname: Joi.string()
  .required()
  .min(1)
  .max(50),
  
  email: Joi.string().email().required()   /*email validator ?*/,
  //{ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'io']} }

  password: Joi.string()
  .min(12)
  .max(255)
  .pattern(new RegExp('(?=.*[a-z])')) // Au moins une minuscule
  .pattern(new RegExp('(?=.*[A-Z])')) // Au moins une majuscule
  .pattern(new RegExp('(?=.*[0-9])')) // Au moins un chiffre
  .required(), 
  //profil_image: Joi.string().optional()
})

const { error } = userSchema.validate(req.body)
if (error) {
  return res.status(400).json({ error: error.message });
}

// On récupère les champs dont on va se servir
const { firstname, lastname, email, password } = req.body;

// Todo vérifier si les données existe => si pas de données res.status(400)

const userExists = await User.findOne({ where: { email } });

// Si un utilisateur existe déjà, on renvoie un code 409 (Conflict) 
// et un message indiquant que l’utilisateur existe déjà.
if (userExists) {
    return res.status(409).json({ message: 'An account is already associated to this email adress' });
}

 // hacher le mot de passe avant de le stocker.
 const hashedPassword = await argon2.hash(password);

//On stocke les données dans userData
const userData = {
  firstname,
  lastname,
  email,
  password: hashedPassword
};

// Création du user

const createUser = await User.create(userData);

// res.status(200).json(createUser)
//delete createUser.password;

return res.status(201).json({
  message: 'User created. Please login to get your access token.',
});

}

export async function loginUser(req, res) {
  
  // On recupère les données email et password dans le body
  const {email, password} = req.body;

  // Vérifier si les champs son présent
  if (!email || !password) {
    return res.status(400).json({ massage: "Email and password are required" });
  }

  // Recherche si l'utilisateur existe
  const user = await User.findOne({ where: { email }});

  // Message d'erreur si on trouve l'utilisateur
  if (!user) {
    return res.status(404).json({ message: "User not found"})
  }

  // ON veut COMPARER "password" avec le "user.password" de la BDD ==> argon2
  const hashPassword = user.password;
  const rawPassword = password;

   // Si les deux mdp NE matchent PAS : message d'erreur et STOP
   const isMatching = await argon2.verify(hashPassword, rawPassword);
   if (!isMatching) {
     return res.status(400).render("login", { errorMessage: "L'email ou le mot de passe renseigné est incorrect." });
   }

}
 
