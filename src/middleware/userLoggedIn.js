import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const userLoggedIn = async (req, res, next) => {

  // récupère le token d’authentification depuis les en-têtes de la requête.
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès refusé, token manquant ou invalide" });
  }

  const token = tokenHeader.split(" ")[1];
  // const tokenWithoutBearer = token ? token.slice(7) : null; //*On supprime
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // jwt.verify : Cette méthode vérifie que le token est valide en utilisant la clé secrète
    // process.env.JWT_SECRET => Si le token est valide, il renvoie les données décodées, autrement une exception est levée.
    // decoded => contient les informations stockées dans le token (comme l’ID de l’utilisateur) si la vérification réussit.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Recherche de l’utilisateur : Utilise l’ID extrait du token pour trouver l’utilisateur dans la base de données.
    const user = await User.findByPk(decoded.id);

    // Si aucun utilisateur correspondant à l’ID n'est trouvé, la requête échoue avec un code 401 (Unauthorized).
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }  

    // Ajout de l'utilisateur : Si l’utilisateur est trouvé et que le token est valide, 
    // l’objet user est attaché à req.user, ce qui permet aux routes ou middlewares suivants d’y accéder.
    req.user = user;
    next();


} catch (error) {
    // If an error occurs, we respond with a 500 status code
    return res.status(500).json({ message: error.message });
}

}


export default userLoggedIn;


