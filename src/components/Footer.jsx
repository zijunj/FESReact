import movieLogo from "../assets/movieLogo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer__row">
          <Link to="/" className="footer__logo">
            <img src={movieLogo} alt="MovieDb logo" className="footer__logo" />
          </Link>

          <p className="footer__copyright">
            © 2026 MovieDb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
