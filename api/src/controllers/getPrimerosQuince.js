const { getAllGames } = require("./getVideogames");

const getPrimerosQuince = async (req, res) => {
  try {
    const { name } = req.query;
    const games = await getAllGames();
    if (name) {
      const gameFound = games
        .filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 15);
      return res.status(200).json(gameFound);
    } else {
      return res.status(200).json(games);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener los primeros 15 juegos" });
  }
};

module.exports = getPrimerosQuince;
