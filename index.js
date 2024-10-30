import "dotenv/config";
import { rateLimit } from 'express-rate-limit';
import express from "express";
import cors from "cors";
import {router as apiRouter} from "./src/routers/apiRouter/index.js"
import {router as adminRouter} from "./src/routers/adminRouter/index.js"


const app = express();

// Desactiver le header x-powered-by Express
app.disable("x-powered-by");


app.use(cors("*"));

app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: "10kb"}));

//app.use(router);
//TODO faire la doc (1 demandée min "je crois")


// Configuration du router API
app.use("/api", apiRouter);

// Configuration du router Admin (pour plus tard)
app.use("/admin", adminRouter);

app.use("/", (req, res) => {
  res.send("<h1>Bienvenue sur l'API de ZombieLand</h1");
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});