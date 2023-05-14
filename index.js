require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

// Ma route characters
app.get("/characters", async (req, res) => {
  try {
    // let name = "";
    // if (req.query.name) {
    //   name = req.query.name;
    // }
    //console.log(req.query.name);

    // Je crée une variable name qui vaut :
    // - req.query.name si il existe
    // - "" sinon
    // (revient au même que faire ce qu'il y a au dessus)
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    // J'interroge le backend du reacteur en envoyant la clef API et les différents query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    // Je renvoie le data au front
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ma route character
app.get("/character/:characterId", async (req, res) => {
  try {
    // J'interroge le backend du reacteur en envoyant la clef API et les différents query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    // Je renvoie le data au front
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ma route pour récupérer les comics liés au character
app.get("/comic/:comicId", async (req, res) => {
  try {
    // J'interroge le backend du reacteur en envoyant la clef API et les différents query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    // Je renvoie le data au front
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
