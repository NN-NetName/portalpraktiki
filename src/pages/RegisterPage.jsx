import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [role, setRole] = useState("student"); // 'student', 'employee', 'company'

  // Функция для рендера уникальных полей
  const renderUniqueFields = () => {
    switch (role) {
      case "student":
        return (
          <div className="form-group">
            <label>Номер зачетной книжки</label>
            <input
              type="text"
              className="form-input"
              placeholder="pib-22e1-24"
            />
          </div>
        );
      case "employee":
        return (
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="name@sibadi.org"
            />
          </div>
        );
      case "company":
        return (
          <div className="form-group">
            <label>ИНН Организации</label>
            <input
              type="text"
              className="form-input"
              placeholder="10 или 12 цифр"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container auth-container">
      <div className="auth-card" style={{ maxWidth: "450px" }}>
        <h2>Регистрация</h2>
        {/* Переключатель ролей */}
        <div className="role-tabs">
          <button
            className={`role-tab ${role === "student" ? "active" : ""}`}
            onClick={() => setRole("student")}
          >
            Студент
          </button>
          <button
            className={`role-tab ${role === "employee" ? "active" : ""}`}
            onClick={() => setRole("employee")}
          >
            Сотрудник
          </button>
          <button
            className={`role-tab ${role === "company" ? "active" : ""}`}
            onClick={() => setRole("company")}
          >
            Организация
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {renderUniqueFields()}
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
            />
          </div>
          <div className="form-group">
            <label>Подтверждение пароля</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary">
            Зарегистрироваться
          </button>
        </form>
        <div className="auth-links">
          <p>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;