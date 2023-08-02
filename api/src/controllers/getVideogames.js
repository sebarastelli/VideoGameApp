const axios = require("axios");
const { Videogame, Genres } = require("../db");

const getGameApi = async (req, res) => {
  try {
    const games = [];
    let URL = `https://api.rawg.io/api/games?key=59146cae7d314abd9adc0804727b45c5`;
    const requests = [];

    for (let i = 0; i < 5; i++) {
      requests.push(axios.get(URL));
      const response = await axios.get(URL);
      URL = response.data.next;
    }

    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      const currentPage = response.data;
      currentPage.results.forEach((g) => {
        games.push({
          id: g.id,
          name: g.name,
          platform: g.platforms.map((plat) => plat.platform.name),
          background_image: g.background_image,
          released: g.released,
          rating: g.rating,
          genres: g.genres.map((g) => g.name),
          created: false,
        });
      });
    });

    return games;
  } catch (error) {
    res.status(500).send("No se pudo obtener la lista de juegos");
  }
};
const getGameDB = async (req, res) => {
  try {
    const allGames = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const allDbGames = allGames.map((g) => {
      return {
        id: g.id,
        name: g.name,
        rating: g.rating,
        background_image: g.background_image,
        genres: g.Genres.map((genre) => genre.name),
        description: g.description,
        released: g.released,
        platforms: g.platforms,
        created: g.created,
      };
    });

    // return res.status(200).json(allDbGames);
    return allDbGames;
  } catch (error) {
    console.log(error.message);
  }
};

const getAllGames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbGames = await getGameDB();
      const apiGames = await getGameApi();
      const allGames = [...dbGames, ...apiGames];
      resolve(allGames);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { getAllGames, getGameDB };
