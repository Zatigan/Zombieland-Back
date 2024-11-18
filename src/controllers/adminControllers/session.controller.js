import { User } from "../../models/user.model.js";
import argon2 from "argon2";

export const sessionController = {
  index: (req, res) => {
    res.render('login', { error: null });
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Recherche de l'utilisateur dans la base de données par email
      const user = await User.findOne({ where: { email } });
      console.log('user :>> ', user);
      if (!user) {
        return res.render('login', { error: "Utilisateur ou mot de passe incorrect." }); /* Invalid user or password. */
      }

      // Vérification du mot de passe
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.render('login', { error: "Utilisateur ou mot de passe incorrect." }); /* Invalid user or password. */
      }
        

      console.log("Rôle de l'utilisateur :", user.role);

      // Vérification du rôle admin
      if (user.role !== 'admin') {
        return res.render('login', { error: "Accès refusé. Vous devez être administrateur pour accéder au back-office." }); /* Access denied. You must be an admin to access back-office. */
      }

      // Création de la session
      req.session.user = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role
      };

      // Redirection vers la page d'accueil admin
      res.redirect('/admin');
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Erreur serveur'); /* Server error */
    }
  },

  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.status(500).send("Impossible de se déconnecter"); /* Disconnection impossible */
      }
      res.redirect('/admin/login');
    });
  },
};
