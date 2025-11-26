import React, { useState, useMemo } from "react";
import FilterBar from "../components/FilterBar";
import { useNavigate, Link } from "react-router-dom"; // Добавил Link для перехода
import { useAuth } from "../context/AuthContext"; // <--- ПОДКЛЮЧИЛИ КОНТЕКСТ

const PracticesPage = () => {
  const navigate = useNavigate();
  
  // 1. БЕРЕМ ВАКАНСИИ ИЗ ОБЩЕГО ХРАНИЛИЩА (вместо локального MOCK_PRACTICES)
  // Теперь, когда ты добавляешь вакансию в профиле, она попадает в `vacancies` и отображается здесь!
  const { vacancies, user, applyForPractice, userApplications } = useAuth();

  // 2. Состояния для поиска и фильтров
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ city: "", type: "" });

  // 3. Логика фильтрации
  const filteredPractices = useMemo(() => {
    // Если вакансии еще не загрузились (на всякий случай), вернем пустой массив
    if (!vacancies) return [];

    return vacancies.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = filters.city ? item.city === filters.city : true;
      const matchesType = filters.type ? item.type === filters.type : true;
      return matchesSearch && matchesCity && matchesType;
    });
  }, [searchQuery, filters, vacancies]); // <-- Добавили vacancies в зависимости

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const isApplied = (title) => {
     if (!user || !userApplications) return false;
     return userApplications.some(app => app.position === title);
  };

  const handleApplyClick = (practice) => {
    if (!user) {
       navigate("/login");
       return;
    }
    applyForPractice(practice);
  };

  return (
    <div className="container page-content">
      <h2 style={{ marginBottom: "20px" }}>Список практик</h2>

      {/* 4. Фильтры */}
      <FilterBar 
        onSearch={setSearchQuery}
        onFilterChange={handleFilterChange}
        filters={[
          { name: "city", placeholder: "Все города", options: ["Омск", "Москва", "Удаленно"] },
          { name: "type", placeholder: "Тип практики", options: ["Оплачиваемая", "Неоплачиваемая"] }
        ]}
      />

      {/* 5. Список */}
      <div className="practices-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {filteredPractices.length > 0 ? (
          filteredPractices.map((practice) => {
            const applied = isApplied(practice.title);
            
            return (
              <div key={practice.id} className="practice-card">
                <div>
                  {/* Сделаем название кликабельным (ведет на детальную страницу) */}
                  <Link to={`/practices/${practice.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "5px", cursor: "pointer" }}>
                        {practice.title}
                    </h3>
                  </Link>
                  
                  <p style={{ color: "#64748b", margin: 0 }}>
                    <strong>{practice.company}</strong> • {practice.city}
                  </p>
                  <span style={{ 
                    display: "inline-block", 
                    background: practice.type === "Оплачиваемая" ? "#dcfce7" : "#f1f5f9",
                    color: practice.type === "Оплачиваемая" ? "#166534" : "#64748b",
                    fontSize: "12px", padding: "4px 8px", borderRadius: "4px", marginTop: "8px" 
                  }}>
                    {practice.type}
                  </span>
                </div>
                
                <div style={{ display: "flex", gap: "10px" }}>
                   {/* Кнопка Подробнее */}
                   <Link 
                     to={`/practices/${practice.id}`} 
                     className="btn-outline"
                     style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                   >
                     Подробнее
                   </Link>

                   {/* Кнопка Подать заявку */}
                   <button 
                     className="btn-outline" 
                     onClick={() => !applied && handleApplyClick(practice)}
                     style={{
                       opacity: applied ? 0.5 : 1,
                       cursor: applied ? "default" : "pointer"
                     }}
                   >
                     {applied ? "Заявка подана" : "Подать заявку"}
                   </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
            По вашему запросу ничего не найдено 😔
          </div>
        )}

      </div>
    </div>
  );
};

export default PracticesPage;
