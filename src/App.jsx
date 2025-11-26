import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Импорт
import "./App.css";

// Компоненты
import Header from "./components/Header";
import Footer from "./components/Footer";

// Страницы
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PracticesPage from "./pages/PracticesPage";
import PracticeDetailsPage from "./pages/PracticeDetailsPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import DocumentsPage from "./pages/DocumentsPage";
import ProfilePage from "./pages/ProfilePage";

// Компонент Уведомления (внутри файла для простоты)
const ToastNotification = () => {
  const { toast } = useAuth();
  if (!toast) return null;

  return (
    <div style={{
      position: "fixed", bottom: "20px", right: "20px",
      background: toast.type === "error" ? "#ef4444" : "#10b981",
      color: "white", padding: "15px 25px", borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 9999,
      fontWeight: "bold", animation: "fadeIn 0.3s"
    }}>
      {toast.message}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/practices" element={<PracticesPage />} />
            {/* Новый маршрут: :id означает, что сюда подставится число */}
            <Route path="/practices/:id" element={<PracticeDetailsPage />} />
            
            <Route path="/templates" element={<DocumentsPage title="Шаблоны документов" type="download" />} />
            <Route path="/materials" element={<DocumentsPage title="Полезные материалы" type="read" />} />
            <Route path="/documents" element={<DocumentsPage title="Нормативные документы" type="download" />} />
            <Route path="/organizations" element={<OrganizationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          <Footer />
          {/* Уведомление висит поверх всего */}
          <ToastNotification />
        </div>
      </Router>
    </AuthProvider>
  );
}
