import Joi from "joi";
import { User } from "../../models/index.js";
import * as argon2 from "argon2";
import jwt from 'jsonwebtoken';
import cryptoRandomString from "crypto-random-string";
import { render } from "ejs";


export async function createUser(req, res) { 

  const userSchema = Joi.object({ 
    firstname: Joi.string().required().min(3).max(50),
    
    lastname: Joi.string()
    .required()
    .min(1)
    .max(50),
    
    email: Joi.string().email().required()   /* ajout d'email validator pour vérifier les mails soumis ?*/,
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
  
  return res.status(201).json({
    message: 'User created. Please login to get your access token.',
  });
  
  };
  
export async function loginUser(req, res) {
    
    // On recupère les données email et password dans le body
    const {email, password} = req.body;
  
    // Vérifier si les champs son présent
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    // Recherche si l'utilisateur existe
    const user = await User.findOne({ where: { email }});
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
     // Génération du Token d’Accès
     // Si l'utilisateur est authentifié avec succès, un token d'accès JWT est généré, contenant l'ID de l'utilisateur. 
     // La clé secrète (stockée dans process.env.JWT_SECRET) signe le token.
     const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });
  
  return res.json({ accessToken, user : userSafe });
  
  };

export async function forgottenPassword (req, res) {

  if(req.method !== 'POST') {
    return;
  }

  //* Sécurité en définissant la nature des champs qui vont être soumis par l'utilisateur
  const userSchema = Joi.object({ 
     /*firstname: Joi.string().required().min(3).max(50),
    
    lastname: Joi.string()
    .required()
    .min(1)
    .max(50), */
  
    email: Joi.string().email().required()
  });
  
  //* Tout passe à la moulinette de Joi
  const { error } = userSchema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const {email} = req.body;
  //* Vérification qu'aucun champ n'est manquant
  if (/*!firstname || !lastname ||*/ !email) {
    res.status(400).json(({ message: 'Tous les champs sont obligatoires'}));
    return; 
  }

  //* Récuperation des infos dans le req.body 
  // const {firstname, lastname, email}: {firstname: string, lastname: string, email: string} = req.body; ==> la ligne ci-dessous correspond à du TS qui permet d'annoncer le type de chacune des variables destructurées
 /*  const {/*firstname, lastname, email} = req.body; */

  //* Recherche en BDD l'utilisateur en question qui a toutes ses infos
  const user = await User.findOne({
    where: {/* firstname: firstname, lastname: lastname,  */email: email}
  });
  
  //* Si jamais l'utilisateur n'existe pas, erreur
  if (/* user == null || */ !user) {
    return res.status(422).json({message: "Cet utilisateur n'existe pas"});
  };

  //* Création d'un élément de réinitialisation (= "jeton" de sécurité)
  const randomString = cryptoRandomString({length:64, type:'alphanumeric'});

  //* Enregistrement de la randomString au champ password_reset_token dans la bdd
  user.password_reset_token = randomString;
  await user.save();

  //* Hachage de l'adresse mail (peut-être que je devrai hasher le mail de req.body...)
  const hashedMail = await argon2.hash(user.email);

  //* App_url à définir dans le .env
  const url = `${process.env.APP_URL}/reset-password?signature=${randomString}&mail=${hashedMail}`;
  console.log(url)

  try {
  //   const html = render(
  //     ForgotPasswordEmail({
  //       params: {
  //         firstname: User.firstname,
  //         lastname: User.lastname,
  //         email: User.email,
  //         url: url,
  //       },
  //     })
  //   );

  // //* Envoi de l'email à l'utilisateur
  // await sendEmail(req.body.email, "Reset Password", html);
  return res.json({
    status: 200,
    url, 
    message: "Email successfully sent. Please check your email.",
  });

  } catch (error) {

    console.log("the error is", error);
    return res.json({
      status: 500,
      message: "Something went wrong, please try again!",
    });
  }
};

export async function resetPassword (req, res) {
  const {token, newPassword} = req.body;
  console.log('token ::>' , token);

  const user = await User.findOne({ where : { password_reset_token : token }});

  if(!user) return res.status(400).json({message: 'Token invalide'});

  const hashedPassword = await argon2.hash(newPassword);
  user.password = hashedPassword;
  user.password_reset_token = null;
  user.save();

  res.status(200).json({message:'Mot de passe réinitialisé avec succès!'});
}