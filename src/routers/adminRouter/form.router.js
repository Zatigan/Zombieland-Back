import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin.js";
import { sessionController } from "../../controllers/adminControllers/session.controller.js";

export const router = Router();

// Page de connexion
router.get("/login", sessionController.index);

// Authentification de l'utilisateur
router.post("/login", sessionController.login);

// Page d'accueil admin (protégée)
router.get("/", isAdmin, (req, res) => {
  res.render("home");
});

// Déconnexion
router.get("/logout", sessionController.logout);
