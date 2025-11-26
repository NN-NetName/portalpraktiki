import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-cols">
        
        {/* Колонка "Студентам" - Открытые ссылки */}
        <div>
          <h4>Студентам</h4>
          <ul>
            <li>
              <Link to="/practices" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Практики
              </Link>
            </li>
            <li>
              <Link to="/documents" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Документы
              </Link>
            </li>
            <li>
              <Link to="/organizations" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Организации
              </Link>
            </li>
            <li>
              <Link to="/templates" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Список шаблонов
              </Link>
            </li>
            <li>
              <Link to="/materials" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Полезные материалы
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Колонка "Работодателям" - Закрытые ссылки (ведут на вход) */}
        <div>
          <h4>Работодателям</h4>
          <ul>
            <li>
              <Link to="/login" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Найти студента
              </Link>
            </li>
            <li>
              <Link to="/login" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Добавить вакансию
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Колонка "Сотрудникам ВУЗа" - Закрытые ссылки */}
        <div>
          <h4>Сотрудникам ВУЗа</h4>
          <ul>
            <li>
              <Link to="/login" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Добавить документ
              </Link>
            </li>
            <li>
              <Link to="/login" style={{ color: "white", textDecoration: "none", opacity: 0.8 }}>
                Управление заявками
              </Link>
            </li>
          </ul>
        </div>

      </div>
      
      {/* Копирайт */}
      <div className="copyright">© 2025 Портал трудоустройства выпускников</div>
    </div>
  </footer>
);

export default Footer;