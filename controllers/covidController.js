import axios from "axios";

export async function covidData(req, res) {
  try {
    const response = await axios.get(
      `https://disease.sh/v3/covid-19/countries`
    );

    const covidData = response.data;
    res.json(covidData);
  } catch (err) {
    console.error("Erreur lors de l'appel à l'API externe :", err.message);
    res.status(err.response?.status || 500).send(err.message);
  }
}