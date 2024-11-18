import Joi from "joi";
import { User } from "../../models/index.js";
import * as argon2 from "argon2";
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';

function sanitizeInput(input) {
  return sanitizeHtml(input, {
    allowedTags: [], // Aucune balise HTML n'est autorisée
    allowedAttributes: {}, // Aucune attribut HTML n'est autorisé
    disallowedTagsMode: 'discard' // Supprime toute balise HTML présente
  });
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
    
    confirmedPassword: Joi.string()
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
  const { firstname, lastname, email, password, confirmedPassword } = req.body;
  

// On vérifie qu'aucun champ n'est manquant / vide
if (!firstname || !lastname || !email || !password || !confirmedPassword || password !== confirmedPassword) {
  res.status(400).json(({ message: 'Tous les champs sont obligatoires'}));
  return; 
}
// Todo vérifier si les données existe => si pas de données res.status(400)

// Nettoyage des entrées utilisateur pour éviter les injections XSS
const sanitizedFirstname = sanitizeInput(firstname); // Sanitization du prénom
const sanitizedLastname = sanitizeInput(lastname);   // Sanitization du nom
const sanitizedEmail = sanitizeInput(email);         // Sanitization de l'email
  
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
    firstname: sanitizedFirstname,
    lastname: sanitizedLastname,
    email: sanitizedEmail,
    password: hashedPassword
  };
  
  // Création du user
  await User.create(userData);
  
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
      return res.status(400).json({ message: "Email and password are required" });
    }

    const sanitizedEmail = sanitizeInput(email);
  
    // Recherche si l'utilisateur existe
    const user = await User.findOne({ where: { email: sanitizedEmail }});
    console.log('user', user);
    // Message d'erreur si on trouve l'utilisateur
    if (!user) {
      return res.status(404).json({ message: "User not found"})
    }
  
    // ON veut COMPARER "password" avec le "user.password" de la BDD ==> argon2
    const hashPassword = user.password;
    
  
     // Si le mdp ne matchent pas : message d'erreur et STOP
     const isMatching = await argon2.verify(hashPassword, password);
     console.log(isMatching)
     if (!isMatching) {
       return res.status(400).json({ message: "Incorrect email address or password." });
     }
     const userSafe = {...user.dataValues};
     const key = "password";
     delete userSafe[key];

     // Nettoyage des champs utilisateur pour éviter les injections XSS dans la réponse
  userSafe.firstname = sanitizeInput(userSafe.firstname); // Sanitization du prénom
  userSafe.lastname = sanitizeInput(userSafe.lastname);   // Sanitization du nom
     // Génération du Token d’Accès
     // Si l'utilisateur est authentifié avec succès, un token d'accès JWT est généré, contenant l'ID de l'utilisateur. 
     // La clé secrète (stockée dans process.env.JWT_SECRET) signe le token.
     const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });
  
  return res.json({ accessToken, user : userSafe });
  
  }



