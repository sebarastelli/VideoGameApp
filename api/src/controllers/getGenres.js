const axios = require("axios");
const { Genres } = require("../db");

const getGenres = async (req, res) => {
  try {
    let URL = `https://api.rawg.io/api/genres?key=59146cae7d314abd9adc0804727b45c5`;
    const genresApi = await axios.get(URL);

    const genres = genresApi.data.results.map((g) => g.name);
    genres.forEach((e) => {
      Genres.findOrCreate({ where: { name: e } });
    });

    const allGenres = await Genres.findAll();
    res.status(200).json(allGenres);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getGenres;
