# Zombieland-back

## Description

Zombieland est une application web et mobile dédiée au parc d'attractions éponyme
Elle permet:
- De consulter les différents services et attractions disponibles au sein du parc
- De créer un compte utilisateur et effectuer une réservation en ligne
- Aux administrateurs de gérer les attractions, utilisateurs et réservations

## Fonctionnalités principales

### Utilisateurs
- Consulter la liste des attractions.
- Créer un compte utilisateur
- Modifier les informations de son profil
- Effectuer une ou plusieurs réservations

### Administrateurs
- Gérer les attractions (consultation, ajout, modification, suppression)
- Gérer les utilisateurs (consultation, ajout, modification, suppression)
- Gérer les réservations des utilisateurs



## Installation

### Prérequis
- Node.js (V20 recommandée)
- PostgreSQL (V15 recommandée)
  
  ### Etapes
  1. Cloner le dépôt: 
      git clone <clé_SSH_du_repository>
      cd <nom_du_dossier>

  2. Installer les dépendances du projet
      npm install

  3. Configuration du fichier .env pour la connexion à la base de données (voir dans .env.example)
  4. Créer la base de données
- sudo -i -u postgres psql
- CREATE USER <nom_utilisateur> WITH PASSWORD '<mot_de_passe>';
- CREATE DATABASE <nom_de_la_base> WITH OWNER <nom_utilisateur>;
- npm run db:reset

  5. Lancement de l'application (Front & Back)
- npm run dev
- Front: http://localhost:5173
- Back: http://localhost:3000
- Back-office: http://localhost:3000/admin

## Documentation API

 | Methode | Endpoint                     | Fonction                                                            |
 |:-------:|:----------------------------:|:-------------------------------------------------------------------:|
 | GET     |  /attractions                |  Récupère la liste de toutes les attractions                        |
 | GET     |  /attractions/random         |  Récupère trois attractions au hasard                               |
 | GET     |  /attractions/:id            |  Récupère une seule attraction                                      | 
 | GET     |  /attractions/category/:id   |  Récupère une attraction selon sa catégorie                         |
 |         |                              |                                                                     |
 | GET     |  /attractions/categories     |   Récupère toutes les catégories                                    |
 |         |                              |                                                                     |
 | GET     |  /reservation                |  Permet d'afficher la page de réservation                           |
 | POST    |  /reservation                |  Permet à l'utilisateur d'effectuer une réservation                 |
 |         |                              |                                                                     |
 | GET     |  /profile                    |  Permet à l'utilisateur de consulter sa page de profil              |
 | GET     |  /profile/reservation        |  Permet à l'utilisateur d'afficher la liste de ses réservations     |
 | PATCH   |  /profile/update             |  Permet à l'utilisateur de modifier ses informations personnelles   | 
 | PATCH   |  /profile/reservation/update |  Permet à l'utilisateur de modifier ses réservations                |
 | DELETE  |  /profile/delete             |  Permet à l'utilisateur de supprimer son profil (compte)            |
 | DELETE  |  /profile/reservation/del    |  Permet à l'utilisateur de supprimer une réservation                |
 |         |                              |                                                                     |
 | POST    |  /signup                     |  Permet à l'utilisateur de créer un compte                          |
 | POST    |  /login                      |  Permet à l'utilisateur de se connecter à l'application             |


## Technologies utilisées
### Front-end
- Frameworks et outils: React, Vite, SCSS, TypeScript
- Librairies principales:
    * Axios
    * Leaflet (cartographie)
    * React-Leaflet
    * React-Datepicker
    * React-Toastify
    * React-Responsive-Carousel

### Back-end
- Frameworks et ourils: Node.js, Express, Sequelize, PostgresSQL
- Librairies principales:
    * Argon2
    * JWT
    * Joi
    * Cors, Dotenv, Express-session

 

    

