import './navigations.css';
import { Link } from 'react-router-dom';

const Navigation = (props) => {

    const showOptions = props.userData

    return (
        <div className='Navbar'>
            <ul>
                <li><Link to="/"><p>Home</p></Link></li>
                <li><Link to="/Allcards"><p>All Cards</p></Link></li>
                {showOptions ? <li><Link to="/Mycards"><p>My Cards</p></Link></li> : null}
                {showOptions ? <li><Link to="/ObtainCards"><p>Get cards</p></Link></li> : null}
                {showOptions ? <Link to="/Out"><button id="signOut">Sign Out</button></Link> : <li id="S"><Link to="/Users"><p>Sign In/Log in</p></Link></li>}
            </ul>
        </div>
    )
}

export default Navigation;
