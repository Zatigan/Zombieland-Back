import "dotenv/config";
import { rateLimit } from 'express-rate-limit';
import express from "express";
import cors from "cors";
import { router } from "./src/routers/router.js";

const app = express();
app.use(cors("*"));

app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: "10kb"}));

app.use(router);

app.use("/", (req, res) => {
  res.send("<h1>Bienvenue sur l'API de ZombieLand</h1");
  
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});