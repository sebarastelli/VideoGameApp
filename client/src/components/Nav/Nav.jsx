import SearchBar from "../SearchBar/SearchBar";
import estilos from "./Nav.module.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { getGameByName } from "../../redux/actions";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function Nav({setCurrentPage}) {
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(getGameByName(""));
    setCurrentPage(1)
  };

  return (
    <div className={estilos.nav}>
      <h1>GamesApp</h1>

      <Link to="/home" className={estilos.botoncasa} onClick={handleSearch}>
        <AiOutlineHome className={estilos.icon} />
      </Link>
      <SearchBar />
    </div>
  );
}
