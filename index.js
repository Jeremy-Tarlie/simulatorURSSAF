import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import simulatorRoute from "./routes/simulatorRoute.js";
import covidRoute from "./routes/covidRoute.js";

dotenv.config();

const app = express();

const corsOptions = {
  methods: ["POST", "GET"],
  origin: "http://localhost:4200", 
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/simulator", simulatorRoute);
app.use("/api/covid", covidRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});