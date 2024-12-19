import axios from "axios";

async function simulator(req, res) {
  const simulationParams = req.body;

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
}

module.exports = simulator;
