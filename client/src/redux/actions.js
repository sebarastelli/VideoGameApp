import axios from "axios";
export const GET_GAMES = "GET_GAMES";
export const GET_GAME_DETAIL = "GET_GAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_GAMENAME = "GET_GAMENAME";
export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const RATING = "RATING";
export const CREATE_GAME = "CREATE_GAME";
export const DATA_GAMES = "DATA_GAMES";
export const CLEAN = "CLEAN"

export const getGames = () => {
  return async (dispatch) => {
    try {
      const URL = "http://localhost:3001/videogames";
      const { data } = await axios.get(URL);
      dispatch({ type: "GET_GAMES", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGameDetail = (id) => {
  return async (dispatch) => {
    try {
      const URL = "http://localhost:3001/videogames";
      const { data } = await axios.get(`${URL}/${id}`);
      dispatch({ type: `GET_GAME_DETAIL`, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const URL = "http://localhost:3001/genres";
      const { data } = await axios.get(URL);
      dispatch({ type: "GET_GENRES", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGameByName = (name) => {
  return async (dispatch) => {
    try {
      const URL = "http://localhost:3001/videogames";
      const { data } = await axios.get(`${URL}?name=${name}`);
      dispatch({ type: "GET_GAMENAME", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postGame = (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres,
  created
) => {
  return async (dispatch) => {
    try {
      const URL = "http://localhost:3001/videogames";
      const gameData = {
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        genres,
        created,
      };
      const { data } = await axios.post(URL, gameData);
      dispatch({ type: "CREATE_GAME", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterGames = (genres) => {
  return { type: "FILTER", payload: genres };
};

export const orderGames = (orden) => {
  return { type: "ORDER", payload: orden };
};

export const ratingGames = (orden) => {
  return { type: "RATING", payload: orden };
};

export const dataGames = (tipo) => {
  return { type: "DATA_GAMES", payload: tipo };
};

export const cleanDetail = ()=> {
  return {type: "CLEAN", payload: []}
}