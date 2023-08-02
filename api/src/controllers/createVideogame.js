const { Videogame, Genres } = require("../db");

const createVideogame = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = req.body;
    if (
      !name ||
      !description ||
      !platforms ||
      !genres ||
      !released ||
      !rating
    ) {
      res.status(403).send("faltan datos");
    } else {
      const [gameNew, created] = await Videogame.findOrCreate({
        where: { name: name },
        defaults: {
          id,
          name,
          description,
          platforms,
          background_image,
          released,
          rating,
        },
      });

      if (created) {
        for (const genre of genres) {
          const genreFoundDb = await Genres.findOne({ where: { name: genre } });
          if (genreFoundDb) {
            await gameNew.addGenres(genreFoundDb);
          }
        }
        console.log(gameNew.genres);
        res.status(200).send("juego creado exitosamente");
      } else {
        res.status(200).send("el juego ya existe");
      }
    }
  } catch (error) {
    throw new Error("Error al crear videojuego" + error);
  }
};

module.exports = createVideogame;
