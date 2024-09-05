// component/NavBar.js

import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => {
                        return isActive ? "active-link" : "";
                    }}>Forecast</NavLink>
                </li>
                <li>
                    <NavLink to="/graph">Graph</NavLink>
                </li>
                <li>
                    <NavLink to="/table">Table</NavLink>
                </li>
                <li>
                    <NavLink to="/matrix">Matrix</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
