const { Router } = require('express');
const getPrimerosQuince = require("../controllers/getPrimerosQuince");
const getVideogameById = require("../controllers/getVideogameById");
const createVideogame = require('../controllers/createVideogame');
const getGenres = require('../controllers/getGenres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/videogames", getPrimerosQuince);

router.get("/videogames/:idVideogame", getVideogameById);

router.post("/videogames", createVideogame);

router.get("/genres", getGenres);


module.exports = router;
