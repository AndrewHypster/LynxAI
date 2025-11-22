// app/(admin)/layout.tsx
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Адмін Панель</h1>
        {/* Компонент для виходу або інформація про користувача */}
      </header>

      <div className="admin-content-wrapper">
        <aside className="admin-sidebar">
          {/* Навігаційний компонент (посилання на сторінки адмінки) */}
          <nav>навішація</nav>
        </aside>

        <main className="admin-main">
          {/* ⭐️ Тут відображатимуться всі дочірні сторінки (page.tsx) ⭐️ */}
          {children}
        </main>
      </div>

      {/* Можливо, footer */}
    </div>
  );
}
