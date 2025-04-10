import { NavLink } from 'react-router-dom';
import './Navbar.css'

export function Navbar(){
    return(
        <div className="Navbar">
            <div className="nav-logo">Logo</div>
            <div className="nav-list">
                <NavLink className="nav-link" to='/home'>Home</NavLink>
            </div>
        </div>
    );
}