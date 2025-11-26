import React from "react";

// Компонент принимает:
// onSearch - функция, которая вызывается при вводе текста
// filters - массив объектов для создания выпадающих списков (Select)
// onFilterChange - функция при выборе фильтра
const FilterBar = ({ onSearch, filters = [], onFilterChange }) => {
  return (
    <div className="filter-bar" style={{ 
      background: "white", 
      padding: "20px", 
      borderRadius: "12px", 
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      marginBottom: "30px",
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      alignItems: "center"
    }}>
      
      {/* 🔍 Поле поиска */}
      <div style={{ flex: 1, minWidth: "250px" }}>
        <input
          type="text"
          placeholder="Поиск..."
          className="form-input" // Используем тот же стиль, что и в формах
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      {/* 🔽 Выпадающие фильтры */}
      {filters.map((filter) => (
        <select
          key={filter.name}
          className="form-input"
          style={{ width: "auto", minWidth: "150px", cursor: "pointer" }}
          onChange={(e) => onFilterChange(filter.name, e.target.value)}
        >
          <option value="">{filter.placeholder}</option>
          {filter.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default FilterBar;