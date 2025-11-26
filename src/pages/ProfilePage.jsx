import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  // Достаем VACANCIES из контекста (чтобы видеть добавленные)
  const { user, userApplications, login, addVacancy, vacancies } = useAuth();
  
  const [activeTab, setActiveTab] = useState("applications");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  // Состояния модалки
  const [showVacancyModal, setShowVacancyModal] = useState(false);
  const [newVacancy, setNewVacancy] = useState({ title: "", salary: "", type: "Оплачиваемая", desc: "" });

  useEffect(() => {
    if (user) setEditForm({ name: user.name, email: user.email });
  }, [user]);

  if (!user) return <div className="container page-content">Загрузка...</div>;

  // --- ФИЛЬТРУЕМ ВАКАНСИИ ДЛЯ ТЕКУЩЕЙ КОМПАНИИ ---
  // Берем все вакансии сайта и оставляем только те, где company совпадает с именем юзера
  const companyVacancies = vacancies.filter(v => v.company === user.name);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Приглашение": return { background: "#dcfce7", color: "#166534" };
      case "Отказ": return { background: "#fee2e2", color: "#991b1b" };
      case "На рассмотрении": return { background: "#fef3c7", color: "#d97706" };
      default: return { background: "#f1f5f9", color: "#475569" };
    }
  };

  const handleSaveProfile = () => {
    login({ ...user, name: editForm.name, email: editForm.email });
    setIsEditing(false);
  };

  // --- КОМПОНЕНТЫ (Header, Card) оставляем те же, код ниже ---
  const ProfileHeader = ({ roleIcon, roleName, roleColor, borderColor, children }) => (
    <div style={{ background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderLeft: `6px solid ${borderColor}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "30px", width: "100%" }}>
        <div style={{ width: "100px", height: "100px", borderRadius: "50%", flexShrink: 0, background: roleColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", color: "white", fontWeight: "bold" }}>{roleIcon}</div>
        <div style={{ width: "100%" }}>
          {isEditing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
              <input type="text" className="form-input" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} placeholder="Ваше имя" />
              <input type="text" className="form-input" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} placeholder="Email" />
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                <button className="btn-outline" onClick={handleSaveProfile} style={{ padding: "8px 15px" }}>Сохранить</button>
                <button className="btn-outline" onClick={() => setIsEditing(false)} style={{ padding: "8px 15px" }}>Отмена</button>
              </div>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: "24px", marginBottom: "8px", color: "#1e293b" }}>{user.name}</h1>
              <p style={{ color: "#64748b", marginBottom: "15px" }}>{roleName} • {user.email}</p>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                 {user.role === 'student' && <span className="btn-pill" style={{ background: "#eff6ff", color: "#2563eb", cursor: "default", marginRight: "10px" }}>🔍 В поиске практики</span>}
                <button className="btn-outline" onClick={() => setIsEditing(true)} style={{ padding: "8px 20px", fontSize: "14px" }}>Редактировать</button>
                {children}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const ListItemCard = ({ title, subtitle, badgeText, badgeStyle }) => (
    <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div><h3 style={{ fontSize: "16px", marginBottom: "4px", color: "#1e293b" }}>{title}</h3><p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>{subtitle}</p></div>
      {badgeText && <span style={{ padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", background: badgeStyle.background, color: badgeStyle.color }}>{badgeText}</span>}
    </div>
  );

  const StatCard = ({ icon, title, value, subtext, color }) => (
    <div style={{ background: "white", padding: "30px", borderRadius: "12px", textAlign: "center", border: "1px solid #e2e8f0", cursor: "pointer", transition: "transform 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ fontSize: "30px", marginBottom: "10px" }}>{icon}</div><h3 style={{ fontSize: "16px", color: "#1e293b" }}>{title}</h3><p style={{ fontSize: "32px", fontWeight: "bold", color: color, margin: "10px 0" }}>{value}</p><p style={{ fontSize: "13px", color: "#64748b" }}>{subtext}</p>
    </div>
  );

  // --- СТУДЕНТ ---
  if (user.role === "student") {
    return (
      <div className="container page-content">
        <ProfileHeader roleIcon={user.name[0]} roleName="Студент 4 курса" roleColor="linear-gradient(135deg, #2563eb 0%, #1e40af 100%)" borderColor="#2563eb" />
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", borderBottom: "1px solid #e2e8f0" }}>
          <button onClick={() => setActiveTab("applications")} style={{ padding: "10px 0", background: "none", border: "none", borderBottom: activeTab === "applications" ? "2px solid #2563eb" : "2px solid transparent", color: activeTab === "applications" ? "#2563eb" : "#64748b", fontWeight: "bold", cursor: "pointer" }}>Мои отклики</button>
          <button onClick={() => setActiveTab("resume")} style={{ padding: "10px 0", background: "none", border: "none", borderBottom: activeTab === "resume" ? "2px solid #2563eb" : "2px solid transparent", color: activeTab === "resume" ? "#2563eb" : "#64748b", fontWeight: "bold", cursor: "pointer" }}>Мое резюме</button>
        </div>
        {activeTab === "applications" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {userApplications && userApplications.length > 0 ? userApplications.map((app) => (
                <ListItemCard key={app.id} title={app.position} subtitle={`${app.company} • Отправлено ${app.date}`} badgeText={app.status} badgeStyle={getStatusStyle(app.status)} />
              )) : <div style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>Вы еще не подавали заявок.</div>}
          </div>
        ) : (
          <div style={{ padding: "40px", textAlign: "center", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>📄</div><h3 style={{ marginBottom: "10px" }}>Резюме загружено</h3><p style={{ color: "#64748b", marginBottom: "20px" }}>Ivanov_Resume.pdf</p><button className="btn-primary" style={{ width: "auto" }}>Скачать</button>
          </div>
        )}
      </div>
    );
  }

  // --- КОМПАНИЯ ---
  if (user.role === "company") {
    return (
      <div className="container page-content">
        <ProfileHeader roleIcon="🏢" roleName="Работодатель" roleColor="linear-gradient(135deg, #1e3a8a 0%, #172554 100%)" borderColor="#1e3a8a" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>Активные вакансии</h2>
          <button className="btn-primary" onClick={() => setShowVacancyModal(true)} style={{ width: "auto", padding: "10px 20px", fontSize: "14px" }}>+ Добавить вакансию</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* ТЕПЕРЬ ТУТ companyVacancies, А НЕ myVacancies */}
          {companyVacancies.length > 0 ? (
            companyVacancies.map((vac) => (
              <ListItemCard 
                key={vac.id} 
                title={vac.title} 
                subtitle={`Опубликовано: Сегодня • ${vac.salary || "По договоренности"}`} 
                badgeText="0 откликов" // Пока заглушка, т.к. реального счетчика нет
                badgeStyle={{ background: "#f1f5f9", color: "#64748b" }} 
              />
            ))
          ) : (
            <div style={{textAlign: "center", padding: "20px", color: "#94a3b8"}}>У вас пока нет активных вакансий</div>
          )}
        </div>

        {showVacancyModal && (
           <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
             <div style={{ background: "white", padding: "30px", borderRadius: "16px", width: "500px" }}>
               <h3 style={{ marginBottom: "20px" }}>Новая вакансия</h3>
               <input type="text" className="form-input" placeholder="Название должности" value={newVacancy.title} onChange={e => setNewVacancy({...newVacancy, title: e.target.value})} style={{marginBottom: "15px"}} />
               <input type="text" className="form-input" placeholder="Зарплата" value={newVacancy.salary} onChange={e => setNewVacancy({...newVacancy, salary: e.target.value})} style={{marginBottom: "15px"}} />
               <select className="form-input" value={newVacancy.type} onChange={e => setNewVacancy({...newVacancy, type: e.target.value})} style={{marginBottom: "15px"}}>
                  <option>Оплачиваемая</option><option>Неоплачиваемая</option>
               </select>
               <textarea className="form-input" placeholder="Описание..." rows="4" value={newVacancy.desc} onChange={e => setNewVacancy({...newVacancy, desc: e.target.value})} style={{marginBottom: "20px"}} />
               <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn-primary" onClick={() => {
                      addVacancy({ ...newVacancy, company: user.name, city: "Омск" }); // Имя компании берем из профиля!
                      setShowVacancyModal(false);
                      setNewVacancy({ title: "", salary: "", type: "Оплачиваемая", desc: "" });
                  }}>Опубликовать</button>
                  <button className="btn-outline" onClick={() => setShowVacancyModal(false)}>Отмена</button>
               </div>
             </div>
           </div>
        )}
      </div>
    );
  }

  // --- СОТРУДНИК ---
  if (user.role === "employee") {
    return (
      <div className="container page-content">
        <ProfileHeader roleIcon="👩‍🏫" roleName="Сотрудник ВУЗа" roleColor="linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)" borderColor="#0ea5e9" />
        <h2>Панель управления</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
          <StatCard icon="📄" title="Новые документы" value="12" subtext="Требуют проверки" color="#0ea5e9" />
          <StatCard icon="✍️" title="Договоры" value="5" subtext="На подписании" color="#16a34a" />
          <StatCard icon="👥" title="Студенты" value="142" subtext="На практике" color="#475569" />
        </div>
      </div>
    );
  }
  return <div>Роль не определена</div>;
};
export default ProfilePage;
