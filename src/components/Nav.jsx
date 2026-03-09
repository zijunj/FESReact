import { Link } from "react-router-dom";
import movieLogo from "../assets/movieLogo.png";

function Nav({ variant = "default" }) {
  return (
    <nav>
      <div className="container">
        <div className={`row nav__row ${variant}`}>
          <div className={`navbar-left ${variant}`}>
            <Link to="/">
              <img src={movieLogo} alt="MovieDb logo" className="movieLogo" />
            </Link>
            <Link to="/">
              <h3>MovieDb</h3>
            </Link>
          </div>

          <div className={`navbar-right ${variant}`}>
            <Link to="/">Home</Link>
            <Link to="/movies">Find Your Movie</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
