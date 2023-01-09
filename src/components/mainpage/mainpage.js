import './mainpage.css';
import pokeM from '../../imgs/pokeM.png';
import ig from '../../imgs/ig.png';
import whatsapp from '../../imgs/whatsapp.png';
import lin from '../../imgs/in.png';

const Mainpage = () => {
  
    return(
        <div className='background-mainpage'>
            <div className="description-mainpage mx-auto">
                <img src={pokeM} alt=""></img>
                <p>decripcion general de la pagina decripcion general de la pagina decripcion general de la pagina
                decripcion general de la pagina decripcion general de la pagina decripcion general de la pagina
                decripcion general de la pagina decripcion general de la pagina decripcion general de la pagina
                decripcion general de la pagina decripcion general de la pagina decripcion general de la pagina
                decripcion general de la pagina decripcion general de la pagina decripcion general de la pagina
                decripcion general de la pagina decripcion general de la pagina decripcion general de la pagina
                </p>
            </div>
            <div className="redes">
                <a href="https://www.instagram.com/agustinmolee/"><img src={ig} alt=""></img></a>
                <a href="https://www.linkedin.com/in/agust%C3%ADn-mol%C3%A9-barolo-b042141b1/"><img src={lin} alt=""></img></a>
                <a href="https://api.whatsapp.com/send?phone=%2B542612086541&text="><img src={whatsapp} alt=""></img></a>
            </div>
        </div>
    )
}


export default Mainpage;