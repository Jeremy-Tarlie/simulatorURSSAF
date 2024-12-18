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

app.post("/api/simulator", async (req, res) => {
  const simulationParams = req.body;

  console.log(simulationParams)

  try {
    const response = await axios.post(
      `https://mon-entreprise.urssaf.fr/api/v1/evaluate`,
      simulationParams
    );

    res.json(response.data);
  } catch (err) {
    console.error("Erreur lors de l'appel à l'API externe :", err.message);
    res.status(err.response?.status || 500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
