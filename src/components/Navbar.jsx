import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cards">Cards</Link>
        </li>
        <li>
          <Link to="/random-hero">Random Hero</Link>
        </li>
        <li>
          <Link to="/my-collection">My Collection</Link>
        </li>
        <li>
          <Link to="/my-stats">My Stats</Link>
        </li>
      </ul>
    </nav>
  );
}