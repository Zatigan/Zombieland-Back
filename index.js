import "dotenv/config";

import { rateLimit } from 'express-rate-limit';
import express from "express";
import session from "express-session";
import cors from "cors";
import { router as  adminRouter } from "./src/routers/adminRouter/index.js";
import { router as apiRouter } from "./src/routers/apiRouter/index.js";
import path from "path";
import compression from "compression";


const app = express();

app.use(compression());

// Desactiver le header x-powered-by Express
app.disable("x-powered-by");

//déclarer le fichier static
const securedPathToAssets = path.join('public');
app.use(express.static(securedPathToAssets));
app.use(express.static('public'));

// Configuration de la session - placez-le avant les routes
// Attention a se documenter sur les attaques CSRF -> TP oriented
app.use(session({
  secret: process.env.SESSION_SECRET || 'votreSecretSession', // Remplacez par une variable d'environnement sécurisée
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000,} // Cookie valide pendant 1 jour
}));


app.set('view engine', 'ejs');

const securedPathToViews = path.join("src/views");
app.set('views', securedPathToViews);


app.use(cors({
  origin: [
    'http://localhost:4173',  
    'http://localhost:5173',  
  ],    
  credentials: true  
}));

app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per `window` (here, per minute)
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: "10kb"}));


app.get('/favicon.ico', (req, res) => res.status(204));


// Configuration du router API
app.use("/api", apiRouter);

// Configuration du router Admin (pour plus tard)
app.use("/admin", adminRouter);

//app.use(router);
//TODO faire la doc (1 demandée min "je crois")
app.use("/", (req, res) => {
  console.log('req.url', req.url);
  res.send("<h1>Bienvenue sur l'API de ZombieLand</h1>");
});

// 404 middleware for handling unexisting routes


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});