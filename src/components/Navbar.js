import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ token, setToken }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <nav>
      <Link className="nav-logo" to="/">
        Home
      </Link>

      <div className="nav-links">
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}
