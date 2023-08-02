const axios = require("axios");
const { getGameDB } = require("./getVideogames");

const getVideogameById = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    if (idVideogame.length < 7) {
      let URL = `https://api.rawg.io/api/games/${idVideogame}?key=59146cae7d314abd9adc0804727b45c5`;
      const gameFound = await axios.get(URL);
      const oneGame = {
        id: gameFound.data.id,
        name: gameFound.data.name,
        description: gameFound.data.description,
        platforms: gameFound.data.platforms.map((p) => p.platform.name),
        background_image: gameFound.data.background_image,
        genres: gameFound.data.genres.map((g) => g.name),
        rating: gameFound.data.rating,
        released: gameFound.data.released,
      };
      res.status(200).json(oneGame);
    } else {
      const gameDb = await getGameDB();
      const oneGameDb = gameDb.filter((game) => game.id === idVideogame);
      res.json(oneGameDb[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getVideogameById;
