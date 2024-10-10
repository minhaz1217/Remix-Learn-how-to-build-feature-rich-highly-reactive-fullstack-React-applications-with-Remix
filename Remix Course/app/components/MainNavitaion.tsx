import { Link, NavLink } from "@remix-run/react";

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/notes">My Notes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
