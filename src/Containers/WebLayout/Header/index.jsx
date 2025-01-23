import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../stores/Auth/actions"; // Ensure you have the logout action properly set up
import "./style.scss";

const settings = [
  { name: "Profile", route: "/account/profile" },
  { name: "News Preference", route: "/account/newsfeed" },
];

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state?.AuthReducer);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleNavMenu = () => setIsNavOpen(!isNavOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="toolbar">
          <div className="logo">
            <img src="/assets/innos.jpg" alt="Logo" className="logo-image" />
            <Link to="/" className="logo-text">
              Innos News
            </Link>
          </div>

          {!isAuthenticated ? (
            <div className="auth-links">
              <Link to="/login" className="auth-link">
                Login
              </Link>
              <Link to="/register" className="auth-link">
                Register
              </Link>
            </div>
          ) : (
            <div className="user-menu">
              <div className="user-avatar" onClick={toggleUserMenu}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <ul className={`user-dropdown ${isUserMenuOpen ? "active" : ""}`}>
                {settings.map((setting) => (
                  <li key={setting.name}>
                    <Link
                      to={setting.route}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {setting.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
