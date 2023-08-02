import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import estilos from "./PostGame.module.css";
import { postGame, getGenres } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function PostGame() {
  const dispatch = useDispatch();
 
  const genres = useSelector((state) => state.genres);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [errors, setErrors] = useState("");
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: "",
    genres: [],
  });

  const handleGenreChange = (event) => {
    const genreName = event.target.value;
    if (event.target.checked) {
      setGameData((prevGameData) => ({
        ...prevGameData,
        genres: [...prevGameData.genres, genreName],
      }));
    } else {
      setGameData((prevGameData) => ({
        ...prevGameData,
        genres: prevGameData.genres.filter(
          (nameGenre) => nameGenre !== genreName
        ),
      }));
    }
  };

  const handlePlatformChange = (event) => {
    const platform = event.target.value;
    if (event.target.checked) {
      setGameData((prevGameData) => ({
        ...prevGameData,
        platforms: [...prevGameData.platforms, platform],
      }));
    } else {
      setGameData((prevGameData) => ({
        ...prevGameData,
        platforms: prevGameData.platforms.filter(
          (selectedPlatform) => selectedPlatform !== platform
        ),
      }));
    }
  };
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setGameData((prevGameData) => ({
      ...prevGameData,
      [property]: value,
    }));
  };

  console.log(gameData.genres);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true; // Inicializar como verdadero

    if (gameData.name.trim() === "" || gameData.name.length < 2) {
      setErrors("Minimo se requieren 2 caracteres en el nombre");
      isValid = false; // Establecer como falso si hay un error
    }
    if (gameData.released === "") {
      setErrors("Se requiere fecha del  juego");
      isValid = false;
    }
    if (gameData.description.trim() === "") {
      setErrors("Una descripcion es requerida");
      isValid = false;
    }
    if (gameData.rating === 0) {
      setErrors("Debe ser rating mayor a 0");
      isValid = false;
    }
    if (gameData.background_image === "") {
      setErrors("Inserta una URL para la imagen");
      isValid = false;
    }
    if (gameData.platforms.length === 0) {
      setErrors("Una o más plataformas son requeridas");
      isValid = false;
    }
    if (gameData.genres.length === 0) {
      setErrors("Uno o mas generos son requeridos");
      isValid = false;
    }

    if (isValid) {
      dispatch(
        postGame(
          gameData.name,
          gameData.description,
          gameData.platforms,
          gameData.background_image,
          gameData.released,
          gameData.rating,
          gameData.genres
        )
      );
      setErrors("");
      setGameData({
        name: "",
        background_image: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: [],
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Juego creado exitosamente!',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/home");
    }
  };

  return (
    <div>
      <Nav />
      <div className={estilos.contenedor}>
        <form onSubmit={handleSubmit} className={estilos.formulario}>
          <h1>Crea Tu Videojuego</h1>

          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={gameData.name}
            onChange={handleChange}
          />

          <label htmlFor="description">Descripción</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={gameData.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="platforms">Plataformas</label>
          <div className={estilos.platformas}>
            {["Xbox", "PlayStation", "Nintendo Switch", "PC", "Mac"].map(
              (platform) => (
                <div key={platform}>
                  <input
                    type="checkbox"
                    id={platform}
                    name="platforms"
                    value={platform}
                    checked={gameData.platforms.includes(platform)}
                    onChange={handlePlatformChange}
                  />
                  <label className={estilos.checklabel} htmlFor={platform}>
                    {platform}
                  </label>
                </div>
              )
            )}
          </div>
          <label htmlFor="background_image">Imagen</label>
          <input
            type="text"
            id="background_image"
            name="background_image"
            value={gameData.background_image}
            onChange={handleChange}
          />

          <label htmlFor="released">Fecha</label>
          <input
            type="date"
            id="released"
            name="released"
            value={gameData.released}
            onChange={handleChange}
          />

          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={gameData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />

          <label htmlFor="genres">Género/s</label>
          <div className={estilos.check}>
            {genres.map((genre) => (
              <div key={genre.id}>
                <input
                  type="checkbox"
                  id={genre.id}
                  name="genres"
                  value={genre.name}
                  checked={gameData.genres.includes(String(genre.name))}
                  onChange={handleGenreChange}
                />
                <label className={estilos.checklabel} htmlFor={genre.id}>
                  {genre.name}
                </label>
              </div>
            ))}
          </div>
          {errors && <span style={{ color: "yellow" }}> {errors} </span>}
          <button type="submit" className={estilos.boton}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
