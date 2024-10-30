import "dotenv/config";

import { rateLimit } from 'express-rate-limit';
import express from "express";
import cors from "cors";
import { router as  adminRouter } from "./src/routers/adminRouter/index.js";
import { router as apiRouter } from "./src/routers/apiRouter/index.js";


const app = express();
app.use(cors("*"));

app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per `window` (here, per minute)
}));

app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: "10kb"}));

app.use("/api", apiRouter);
app.use ("/admin", adminRouter);

app.use("/", (req, res) => {
  res.send("<h1>Bienvenue sur l'API de ZombieLand</h1");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});