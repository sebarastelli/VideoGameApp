import estilos from "./LandingPage.module.css"
import { Link} from "react-router-dom";

export default function LandingPage(){
    return(
        <div className={estilos.cuerpo} >
            <img src="https://fondosmil.com/fondo/3564.jpg" alt="fondolanding" />
            <Link to="/home" className={estilos.boton} >
                PLAY
            </Link>
        </div>
    )
}