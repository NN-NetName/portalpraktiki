import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PracticeDetailsPage = () => {
  const { id } = useParams(); // Получаем ID из адресной строки
  const navigate = useNavigate();
  const { vacancies, user, applyForPractice, userApplications } = useAuth();

  // Ищем вакансию по ID
  const practice = vacancies.find(p => p.id === parseInt(id));

  if (!practice) return <div className="container page-content">Вакансия не найдена 😔</div>;

  const isApplied = userApplications && userApplications.some(app => app.position === practice.title);

  const handleApply = () => {
    if (!user) {
       navigate("/login");
       return;
    }
    applyForPractice(practice);
  };

  return (
    <div className="container page-content">
      <button onClick={() => navigate(-1)} className="btn-outline" style={{marginBottom: "20px"}}>
        ← Назад к списку
      </button>

      <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        <span style={{ background: "#eff6ff", color: "#2563eb", padding: "5px 10px", borderRadius: "6px", fontSize: "14px", fontWeight: "bold" }}>
          {practice.type}
        </span>
        
        <h1 style={{ fontSize: "32px", marginTop: "15px", marginBottom: "10px" }}>{practice.title}</h1>
        <h3 style={{ color: "#64748b", marginBottom: "30px" }}>{practice.company} • {practice.city}</h3>

        <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "20px 0", marginBottom: "30px" }}>
          <h4 style={{ marginBottom: "10px" }}>Описание</h4>
          <p style={{ lineHeight: "1.6", color: "#334155" }}>
            {practice.desc || "Подробное описание условий стажировки, требований к кандидату и задач, которые предстоит выполнять..."}
          </p>
          
          <h4 style={{ marginBottom: "10px", marginTop: "20px" }}>Зарплата / Стипендия</h4>
          <p style={{ fontWeight: "bold", color: "#16a34a" }}>{practice.salary || "Не указана"}</p>
        </div>

        <button 
          className={isApplied ? "btn-outline" : "btn-primary"} 
          onClick={() => !isApplied && handleApply()}
          style={{ padding: "15px 40px", fontSize: "18px" }}
        >
          {isApplied ? "✅ Вы уже откликнулись" : "Подать заявку"}
        </button>
      </div>
    </div>
  );
};

export default PracticeDetailsPage;
