import React, { useState, useMemo } from "react";
import FilterBar from "../components/FilterBar";

const DocumentsPage = ({ title, type }) => {
  // Mock Data
  const MOCK_DOCS = useMemo(() => [
    { id: 1, title: "Заявление на практику", format: "DOCX", size: "1.2 MB", date: "Вчера", url: "#" },
    { id: 2, title: "Договор о сотрудничестве", format: "PDF", size: "2.5 MB", date: "Неделю назад", url: "#" },
    { id: 3, title: "Отчет по практике (Шаблон)", format: "DOCX", size: "0.8 MB", date: "Месяц назад", url: "#" },
    { id: 4, title: "Инструкция по ТБ", format: "PDF", size: "5.0 MB", date: "Сегодня", url: "#" },
    { id: 5, title: "Характеристика студента", format: "DOCX", size: "1.0 MB", date: "Вчера", url: "#" },
  ], []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ format: "" });

  const filteredDocs = useMemo(() => {
    return MOCK_DOCS.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFormat = filters.format ? doc.format === filters.format : true;
      return matchesSearch && matchesFormat;
    });
  }, [searchQuery, filters, MOCK_DOCS]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Функция открытия файла
  const handleOpen = (url) => {
    // В реальном проекте здесь была бы ссылка на файл
    // window.open(url, "_blank"); 
    console.log("Opening file:", url);
  };

  return (
    <div className="container page-content">
      <h2 style={{ marginBottom: "20px" }}>{title}</h2>

      <FilterBar 
        onSearch={setSearchQuery}
        onFilterChange={handleFilterChange}
        filters={[
          { name: "format", placeholder: "Все форматы", options: ["PDF", "DOCX"] }
        ]}
      />

      <div className="documents-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {filteredDocs.length > 0 ? (
          filteredDocs.map((item) => (
            <div key={item.id} className="practice-card" style={{ alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{ 
                  width: "40px", height: "40px", 
                  background: item.format === "PDF" ? "#fee2e2" : "#e0e7ff", 
                  color: item.format === "PDF" ? "#dc2626" : "#2563eb",
                  borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", fontWeight: "bold"
                }}>
                  {item.format}
                </div>
                
                <div>
                  <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>{item.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                    {item.size} • {item.date}
                  </p>
                </div>
              </div>

              {/* Кнопка доступна ВСЕМ (без проверок авторизации) */}
              <button 
                className="btn-outline"
                onClick={() => handleOpen(item.url)}
              >
                {type === "download" ? "Скачать" : "Открыть"}
              </button>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#94a3b8", padding: "20px" }}>Документы не найдены</div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
