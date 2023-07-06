import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import logoSample from "../images/logoSample.jpg";
import "../styles/TopNavigationBar.scss";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav>
      <div className="top-nav-bar">
        <div className="logo">
          <Link to="/">
            <img src={logoSample} />
          </Link>
        </div>
        <ul>
          <li className="nav-item">
            <Link to="/">Create Itinerary</Link>
          </li>
          {isLoggedIn && user && (
            <>
              <li className="nav-item">
                <Link to="/my-itineraries">My Itineraries</Link>
              </li>
              <li className="nav-profile--pic">
                <Link to="/" onClick={handleLogout}>
                  <img
                    id="profile-pic"
                    src={user.profile_pic}
                    alt="Profile Pic"
                  />
                </Link>
                <div className="nav-welcome--user">Hi, {user.first_name}</div>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
