export const isAdmin = (req, res, next) => {
  // Vérifier si l'utilisateur est connecté et a le rôle d'admin
  console.log(req.session);
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }

  // Si l'utilisateur n'est pas admin, renvoyer une erreur 403 (Forbidden)
  //res.status(403).json({ error: 'Accès refusé : vous devez être administrateur pour accéder à cette page.' });
  res.redirect("/admin/login");
};
