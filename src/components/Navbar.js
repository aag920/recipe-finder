import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav>
      <Link className="nav-logo" to="/">
        Home
      </Link>

      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
