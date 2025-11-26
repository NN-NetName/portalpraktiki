import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

// Стартовые вакансии (теперь они живут здесь, чтобы быть общими)
const INITIAL_VACANCIES = [
  { id: 1, title: "Стажер Java-разработчик", company: "Сбербанк", city: "Омск", type: "Оплачиваемая", salary: "30 000 ₽", desc: "Ищем начинающего Java-разработчика в команду..." },
  { id: 2, title: "Инженер-проектировщик", company: "Мостовик", city: "Омск", type: "Неоплачиваемая", salary: "-", desc: "Проектирование мостовых сооружений..." },
  { id: 3, title: "Менеджер проектов", company: "Газпром Нефть", city: "Омск", type: "Оплачиваемая", salary: "45 000 ₽", desc: "Ведение проектов в сфере IT..." },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  
  // 1. Список всех вакансий на сайте
  const [vacancies, setVacancies] = useState(INITIAL_VACANCIES);

  // 2. Состояние для Уведомления (Toast)
  const [toast, setToast] = useState(null); // { message: "...", type: "success" | "error" }

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    showToast(`Добро пожаловать, ${userData.name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    showToast("Вы вышли из системы");
  };

  // Показать уведомление (исчезнет через 3 сек)
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const applyForPractice = (practice) => {
    const newApplication = {
      id: Date.now(),
      company: practice.company,
      position: practice.title,
      status: "На рассмотрении",
      date: new Date().toLocaleDateString()
    };
    setUserApplications([...userApplications, newApplication]);
    showToast("Заявка успешно отправлена!"); // <-- ТЕПЕРЬ ТУТ TOAST
  };

  // Функция добавления вакансии (для Компании)
  const addVacancy = (newVacancy) => {
    const vacancyWithId = { ...newVacancy, id: Date.now() };
    setVacancies([vacancyWithId, ...vacancies]); // Добавляем в начало списка
    showToast("Вакансии успешно опубликована!");
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, 
      userApplications, applyForPractice, 
      vacancies, addVacancy, // <-- Экспортируем работу с вакансиями
      toast, showToast // <-- Экспортируем уведомления
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
