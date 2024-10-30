Installer "email-validator" pour filtrer les adresses mails poubelles ?
Installer JOI pour configurer les conditions relatives au mot de passe au minimum

Dans odomac s13, Enzo utilise JOI, log in etc

La doc de JOI semble très cool [https://joi.dev/api/?v=17.13.3], je m'en inspire pour les critères :)


Pour gérer l’identification dans un projet de site web avec un front-end en React et un back-end en Express (avec EJS comme moteur de rendu pour certaines pages si besoin), voici les étapes générales

# 1. Configuration Initiale du Projet
    - Back-End : Crée un projet Node.js/Express, configure les routes, connecte-toi à une base de données (par exemple PostgreSQL ou MongoDB) pour stocker les utilisateurs.

    - Front-End : Initialise un projet React avec des pages de connexion et d’inscription, configure les composants et les états nécessaires.

# 2. Installation des Outils d'Authentification
    - bcrypt/Argon2 : Pour hacher les mots de passe avant de les stocker.
    - jsonwebtoken : Pour créer des tokens JWT pour l'authentification.
    - dotenv : Pour gérer les variables d’environnement, comme la clé secrète JWT.
    - CORS : Pour permettre au front-end en React d’effectuer des requêtes vers l'API Express si le front   et le back sont sur des serveurs différents.

# 3. Création des Routes d’Inscription et de Connexion sur le Back-End

  ## Route d’inscription (/register) :
    1- Valider les données envoyées (nom, email, mot de passe).
    2- Vérifier si l’utilisateur existe déjà en base de données.
    3- Hacher le mot de passe avec bcrypt et stocker l’utilisateur en base.

  ## Route de connexion (/login) :
    1- Vérifier l’email et le mot de passe de l’utilisateur.
    2- Si l'utilisateur est valide, générer un token JWT avec son id comme payload.
    3- Renvoyer ce token au front-end pour l’authentification.

# 4. Gestion des Tokens d'Accès avec JWT
    - Génération du Token : Dans la route de connexion, crée un token JWT 
    - Stockage du Token : Le token peut être stocké dans le localStorage ou un cookie HTTP-only côté front-end.

# 5. Création d’un Middleware de Vérification du Token sur le Back-End
    - Implémente un middleware pour vérifier le token d’accès sur les routes protégées :

Exemple :
```js
const isLoggedIn = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = decoded; // Attache l'ID utilisateur extrait du token
        next();
    });
};
```
    - Applique ce middleware aux routes que seuls les utilisateurs connectés doivent accéder.

# 6. Gestion de l’Authentification sur le Front-End avec React

    - Stockage du Token : Une fois le token reçu après connexion, stocke-le dans localStorage ou un cookie sécurisé.
    - Envoi du Token dans les Requêtes : Pour les routes protégées, ajoute le token dans les en-têtes d’autorisation :
    - Vérification de l'Authentification : Sur les pages nécessitant une connexion, vérifie la présence du token dans le localStorage. Si le token est expiré ou absent, redirige l’utilisateur vers la page de connexion.

# 7. Mise en Place d’une Route me pour Obtenir les Infos Utilisateur

    - Back-End : Crée une route /me pour envoyer les informations de l’utilisateur basé sur le token, en utilisant le middleware isLoggedIn :
    - Front-End : Lors du chargement de la page, utilise cette route pour récupérer les informations utilisateur et les stocker dans le contexte ou le state de React.

# 8. Gestion de la Déconnexion
    - Supprimer le Token : Crée un bouton de déconnexion qui supprime le token du localStorage ou du cookie.
    - Redirection vers la Page de Connexion : Après suppression du token, redirige l’utilisateur vers la page de connexion.

# 9. Optionnel : Utilisation d’EJS pour des Pages Serveur (si besoin)
    - Dans Express, utilise EJS pour rendre des pages qui ne nécessitent pas React, comme les emails de confirmation ou des pages d’information statiques, mais fais attention à la cohérence d'interface avec React.