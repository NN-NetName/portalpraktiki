import React, { useState, useMemo } from "react";
import FilterBar from "../components/FilterBar";

// Mock Data
const COMPANIES = [
  { id: 1, name: "ПАО «Газпром»", industry: "Энергетика", vacancies: 5, city: "Омск", desc: "Крупнейшая энергетическая компания..." },
  { id: 2, name: "Сбербанк", industry: "Финтех", vacancies: 12, city: "Москва", desc: "Технологический гигант и банк..." },
  { id: 3, name: "Яндекс", industry: "IT", vacancies: 8, city: "Москва", desc: "Поисковая система и IT-сервисы..." },
  { id: 4, name: "Мостовик", industry: "Строительство", vacancies: 2, city: "Омск", desc: "Проектирование и строительство мостов..." },
  { id: 5, name: "Омский НПЗ", industry: "Энергетика", vacancies: 7, city: "Омск", desc: "Нефтеперерабатывающий завод..." },
  { id: 6, name: "Effective", industry: "IT", vacancies: 3, city: "Омск", desc: "Разработка программного обеспечения..." },
];

const OrganizationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ industry: "", city: "" });
  
  // Состояние для выбранной компании (чтобы показать модалку)
  const [selectedCompany, setSelectedCompany] = useState(null);

  const filteredCompanies = useMemo(() => {
    return COMPANIES.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = filters.industry ? company.industry === filters.industry : true;
      const matchesCity = filters.city ? company.city === filters.city : true;
      return matchesSearch && matchesIndustry && matchesCity;
    });
  }, [searchQuery, filters]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container page-content">
      <h2 style={{ marginBottom: "20px" }}>Организации-партнеры</h2>

      <FilterBar 
        onSearch={setSearchQuery}
        onFilterChange={handleFilterChange}
        filters={[
          { name: "industry", placeholder: "Все отрасли", options: ["IT", "Энергетика", "Строительство", "Финтех"] },
          { name: "city", placeholder: "Все города", options: ["Омск", "Москва"] }
        ]}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {filteredCompanies.map((company) => (
          <div key={company.id} className="practice-card" style={{ alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ width: "50px", height: "50px", background: "#f1f5f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#64748b" }}>
                {company.name[0]}
              </div>
              <div>
                <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>{company.name}</h3>
                <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
                  {company.industry} • {company.city} • <strong>{company.vacancies} вакансий</strong>
                </p>
              </div>
            </div>
            {/* КЛИК ОТКРЫВАЕТ МОДАЛКУ */}
            <button className="btn-outline" onClick={() => setSelectedCompany(company)}>Подробнее</button>
          </div>
        ))}
      </div>

      {/* МОДАЛЬНОЕ ОКНО О КОМПАНИИ */}
      {selectedCompany && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "16px", width: "500px", position: "relative" }}>
            <button onClick={() => setSelectedCompany(null)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>✕</button>
            
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
              <div style={{ width: "70px", height: "70px", background: "#2563eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "30px", fontWeight: "bold" }}>
                {selectedCompany.name[0]}
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{selectedCompany.name}</h2>
                <p style={{ color: "#64748b", margin: 0 }}>{selectedCompany.industry}</p>
              </div>
            </div>

            <p style={{ lineHeight: "1.6", color: "#334155", marginBottom: "20px" }}>
              {selectedCompany.desc}
            </p>

            <div style={{ background: "#f8fafc", padding: "15px", borderRadius: "8px" }}>
              <p style={{ margin: 0, fontSize: "14px" }}>📍 <strong>Адрес:</strong> {selectedCompany.city}, ул. Ленина, 1</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>📞 <strong>Телефон:</strong> +7 (999) 000-00-00</p>
            </div>

            <button className="btn-primary" onClick={() => setSelectedCompany(null)} style={{ width: "100%", marginTop: "20px" }}>Закрыть</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrganizationsPage;
