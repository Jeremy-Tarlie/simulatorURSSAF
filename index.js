const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

const corsOptions = {
  methods: ["POST", "GET"],
  origin: "http://localhost:4200", 
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/simulator", require("./routes/simulatorRoute"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
