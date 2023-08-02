/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import estilos from "./SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { getGameByName } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSearch = () => {
    dispatch(getGameByName(name));
  };
  console.log(name);
  return (
    <div className={estilos.container}>
      <input
        className={estilos.input}
        type="text"
        placeholder="Buscar"
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
      />
      <button className={estilos.btn} onClick={handleSearch}>
        <AiOutlineSearch className={estilos.i} />
      </button>
    </div>
  );
}
