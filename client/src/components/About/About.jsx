import Nav from "../Nav/Nav"
import estilos from "./About.module.css"

export default function About(){
    return(
        <div >
            <Nav />
            <div className={estilos.contenedor}>      
            <div className={estilos.contenido} ><h3 >Proyecto creado para bootcamp de SoyHenry por Sebastián Rastelli.</h3></div>
            </div>   
        </div>
    )
}