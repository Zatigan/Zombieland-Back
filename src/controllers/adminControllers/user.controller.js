import {User} from "../../models/index.js";
import Joi from 'joi';
import argon2 from 'argon2';

export async function userPage(req, res){
  const users = await User.findAll({ order: [['id', 'ASC']] });
  const successMessage = req.query.success;
  res.render("users", {users, successMessage});
};

export async function getOneUser(req, res){
  const userId = Number.parseInt(req.params.id)
  const user = await User.findByPk(userId);
  res.render("user", {user});
};

export async function addUserPage(req, res){
  res.render("newUser");
};

/*export async function addUser(req, res) {
  try {
    const { firstname, lastname, email } = req.body;
    const userData = { firstname, lastname, email };

    await User.create(userData);
    res.redirect('/admin/users');
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error.message); 
    res.status(500).json({ error: error.message });
  }
}*/

export async function addUser(req, res) { 

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
  

// On vérifie qu'aucun champ n'est manquant / vide
if (!firstname || !lastname || !email || !password) {
  res.status(400).json(({ message: 'Tous les champs sont obligatoires'}));
  return; 
}
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
  await User.create(userData);
  
  // res.status(200).json(createUser)
  //delete createUser.password;
  
  
  return res.redirect('/admin/users?success=true');

  }

export async function delUser(req, res){
  const userId = req.params.id
  await User.destroy({ where: { id: userId } });
  res.status(201).redirect('/admin/users');
}

export async function updateUser(req, res){

const userId = Number.parseInt(req.params.id);  
const user = await User.findByPk(userId);

const {firstname, lastname, email} = req.body;
const userData = {firstname, lastname, email};

const updatedUser = await user.update(userData);
res.redirect('/admin/users?success=true');}

