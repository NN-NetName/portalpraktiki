import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Состояния для модального окна
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotRole, setForgotRole] = useState("student"); // 'student', 'company', 'employee'
  const [resetSent, setResetSent] = useState(false); // Показать ли сообщение "Письмо отправлено"

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginInput = e.target[0].value.trim();

    let detectedRole = "student";
    let userName = "Иван Иванов";

    if (/^\d+$/.test(loginInput)) {
      detectedRole = "company";
      userName = "ООО «Мостовик»";
    } else if (loginInput.includes("@")) {
      detectedRole = "employee";
      userName = "Петрова Анна Сергеевна";
    }

    setTimeout(() => {
      login({ name: userName, email: loginInput, role: detectedRole });
      setIsLoading(false);
      navigate("/profile");
    }, 1000);
  };

  // Функция сброса пароля (фейковая)
  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetSent(true);
  };

  return (
    <div className="container auth-container">
      <div className="auth-card">
        <h2>Вход в систему</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин</label>
            <input type="text" className="form-input" placeholder="Зачетка / Email / ИНН" required />
            <div className="input-hint">Студенты: Номер зачетки | Сотрудники: Email | Компании: ИНН</div>
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" className="form-input" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary" disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1 }}>
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className="auth-links">
          <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
          <p style={{ marginTop: "10px" }}>
            {/* Кнопка открывает модалку */}
            <button 
              onClick={() => { setShowForgotModal(true); setResetSent(false); }}
              style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: "bold"}}
            >
              Забыли пароль?
            </button>
          </p>
        </div>
      </div>

      {/* --- МОДАЛЬНОЕ ОКНО ВОССТАНОВЛЕНИЯ ПАРОЛЯ --- */}
      {showForgotModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "16px", width: "400px", position: "relative" }}>
            
            {/* Кнопка закрытия (крестик) */}
            <button 
              onClick={() => setShowForgotModal(false)}
              style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" }}
            >
              ✕
            </button>

            <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Восстановление пароля</h3>

            {/* Переключатель ролей */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>
              <button onClick={() => { setForgotRole("student"); setResetSent(false); }} style={{ flex: 1, padding: "5px", border: "none", background: "none", borderBottom: forgotRole === "student" ? "2px solid #2563eb" : "none", color: forgotRole === "student" ? "#2563eb" : "#64748b", cursor: "pointer" }}>Студент</button>
              <button onClick={() => { setForgotRole("company"); setResetSent(false); }} style={{ flex: 1, padding: "5px", border: "none", background: "none", borderBottom: forgotRole === "company" ? "2px solid #2563eb" : "none", color: forgotRole === "company" ? "#2563eb" : "#64748b", cursor: "pointer" }}>Компания</button>
              <button onClick={() => { setForgotRole("employee"); setResetSent(false); }} style={{ flex: 1, padding: "5px", border: "none", background: "none", borderBottom: forgotRole === "employee" ? "2px solid #2563eb" : "none", color: forgotRole === "employee" ? "#2563eb" : "#64748b", cursor: "pointer" }}>Сотрудник</button>
            </div>

            {/* Контент в зависимости от роли */}
            {forgotRole === "student" && (
              <div style={{ textAlign: "center", color: "#475569" }}>
                <p style={{ marginBottom: "15px" }}>Для сброса пароля обратитесь в деканат вашего факультета с студенческим билетом.</p>
                <div style={{ background: "#f1f5f9", padding: "10px", borderRadius: "8px", fontSize: "14px" }}>
                  📍 пр. Мира, 5, каб. 1.124<br/>📞 +7 (3812) 65-03-22
                </div>
              </div>
            )}

            {forgotRole === "company" && (
              <div style={{ textAlign: "center", color: "#475569" }}>
                <p style={{ marginBottom: "15px" }}>Для восстановления доступа организации необходимо отправить официальный запрос на почту администратора.</p>
                <a href="mailto:admin@sibadi.org" className="btn-outline" style={{ display: "block", textDecoration: "none" }}>
                  Написать письмо (admin@sibadi.org)
                </a>
              </div>
            )}

            {forgotRole === "employee" && (
              <div>
                {!resetSent ? (
                  <form onSubmit={handleResetPassword}>
                    <p style={{ marginBottom: "15px", fontSize: "14px", color: "#475569" }}>Введите ваш корпоративный email (@sibadi.org)</p>
                    <input type="email" className="form-input" placeholder="name@sibadi.org" required style={{ marginBottom: "15px" }} />
                    <button type="submit" className="btn-primary">Сбросить пароль</button>
                  </form>
                ) : (
                  <div style={{ textAlign: "center", color: "#166534", background: "#dcfce7", padding: "15px", borderRadius: "8px" }}>
                    ✅ Инструкция отправлена!<br/>Проверьте вашу почту.
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;
