import './navigations.css';
import {Link} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useContext } from 'react';
import UserContext from '../../usercontext/usercontext';


const Navigation = (props) => {
    const {setUserInfo} = useContext(UserContext);
    const showOptions = props.userData
    const auth = getAuth();
  
const out = () => {
    signOut(auth).then(() => {
        setUserInfo(null);
      }).catch((error) => {
        console.log(error);
      });
}

    return (
        <div className='Navbar'>
            <ul>
                <li><Link to="/"><p>Inicio</p></Link></li>
                <li><Link to="/Allcards"><p>All Cards</p></Link></li>
                {showOptions ? <li><Link to="/Mycards"><p>My Cards</p></Link></li> : null}
                {showOptions ? <li><Link to="/ObtainCards"><p>Obtener cartas</p></Link></li> : null}
                {showOptions ? <button id="signOut" onClick={() => out()}>Sign Out</button> : <li id="S"><Link to="/Users"><p>Sign In/Log in</p></Link></li> }
            </ul>
        </div>
    )
}

export default Navigation;