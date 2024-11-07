// Factorisation des try/catch
export function controllerWrapper(mdw) {
  return async (req, res, next) => {
    try {
      await mdw(req, res, next);
    } catch (error) {
      console.error(error); // Toujours logger l'erreur pour se débug en cas de pépin avec la BDD
      res.status(500).json({ error: "Unexpected server error. Please try again later." });
    }
  };
}