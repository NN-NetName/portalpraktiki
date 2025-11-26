import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      {/* Верхняя белая полоса */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <Link 
            to="/" 
            style={{ display: "flex", alignItems: "center", gap: "15px", textDecoration: "none", color: "inherit" }}
          >
            <img 
              src={logo} 
              alt="Логотип СибАДИ" 
              style={{ height: "40px", width: "auto" }} 
            />
            <div style={{ fontWeight: "bold", lineHeight: "1.1", color: "#333", textAlign: "left" }}>
              ПОРТАЛ
              <br />
              ТРУДОУСТРОЙСТВА
              <br />
              ВЫПУСКНИКОВ
            </div>
          </Link>

          <div className="contact-info">
            <div className="contact-item">📞 +7 (123) 456-78-90</div>
            <div className="contact-item">✉️ operator@porttrud.ru</div>
            <div className="contact-item">📍 пр. Мира, 5, Омск</div>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="nav-bar">
        <div className="container nav-content">
          <nav className="nav-links">
            <Link to="/" className={isActive("/")}>ГЛАВНАЯ</Link>
            <Link to="/practices" className={isActive("/practices")}>ПРАКТИКИ</Link>
            <Link to="/templates" className={isActive("/templates")}>ШАБЛОНЫ</Link>
            <Link to="/materials" className={isActive("/materials")}>МАТЕРИАЛЫ</Link>
            <Link to="/documents" className={isActive("/documents")}>ДОКУМЕНТЫ</Link>
            <Link to="/organizations" className={isActive("/organizations")}>ОРГАНИЗАЦИИ</Link>
          </nav>

          <div className="auth-buttons">
            {user ? (
              // --- Если пользователь ВОШЕЛ ---
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link 
                  to="/profile" 
                  className="btn-pill" 
                  style={{ background: "#dbeafe", color: "#1e40af" }}
                >
                  👤 {user.name}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="btn-pill" 
                  style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "none", cursor: "pointer" }}
                >
                  ВЫЙТИ
                </button>
              </div>
            ) : (
              // --- Если пользователь НЕ вошел ---
              <div style={{ display: "flex", gap: "10px" }}>
                <Link to="/login" className="btn-pill">👤 ВОЙТИ</Link>
                <Link to="/register" className="btn-pill">📝 РЕГИСТРАЦИЯ</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
