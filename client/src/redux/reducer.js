import {
  CLEAN,
  CREATE_GAME,
  DATA_GAMES,
  FILTER,
  GET_GAMENAME,
  GET_GAMES,
  GET_GAME_DETAIL,
  GET_GENRES,
  ORDER,
  RATING,
} from "./actions";

const initialState = {
  games: [],
  genres: [],
  copiaGame: [],
  gameDetail: [],
  gamesCreated: [],
};

const rootReducer = (state = initialState, action) => {
  let allGamesOrder;
  let allGamesFiltered;
  let allGamesRating;
  let allGamesCreated;
  let allGamesApi;
  switch (action.type) {
    case GET_GAMES:
      return { ...state, games: action.payload, copiaGame: action.payload };
    case GET_GAME_DETAIL:
      return { ...state, gameDetail: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case GET_GAMENAME:
      return { ...state, games: action.payload };
    case ORDER:
      allGamesOrder = [...state.games];
      allGamesOrder.sort((a, b) => a.name.localeCompare(b.name));
      if (action.payload === "D") {
        allGamesOrder.reverse();
      }
      return { ...state, games: allGamesOrder };
    case FILTER:
      allGamesFiltered = state.copiaGame.filter((game) =>
        game.genres.includes(action.payload)
      );
      return { ...state, games: allGamesFiltered };
    case RATING:
      allGamesRating = [...state.games];
      allGamesRating.sort((a, b) => a.rating - b.rating);
      if (action.payload === "MA") {
        allGamesRating.reverse();
      }
      return { ...state, games: allGamesRating };
    case CREATE_GAME:
      return {
        ...state,
        gamesCreated: action.payload,
      };
    case CLEAN:
      return{
        ...state, gameDetail: action.payload
      }

    case DATA_GAMES:
      allGamesCreated = state.copiaGame.filter((game) => game.created);
      allGamesApi = state.copiaGame.filter((game) => !game.created);
      if (action.payload === "DB") {
        return { ...state, games: allGamesCreated };
      } else {
        return { ...state, games: allGamesApi };
      }
    default:
      return state;
  }
};

export default rootReducer;
