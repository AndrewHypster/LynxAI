"use client";

import { useEffect, useRef, useState } from "react";
import "./style.css";

const SearchAI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef(null);
  const SEARCH_DELAY_MS = 1000;

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchResults, setSearchResults] = useState(null); // знайдені пропозиції до запиту клієнта

  const search = async (inpt) => {
    // Не виконуємо запит, якщо поле пусте
    if (!inpt) return;

    try {
      console.log(`>>> Виконую API-запит для: ${inpt}`);
      setLoading(true);
      const response = await fetch("/api/gemini-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search: inpt,
        }),
      });

      if (!response.ok) {
        // Логуємо статус помилки для діагностики
        setError(true);
        throw new Error(
          `Помилка від AI консультанта (Статус: ${response.status})`
        );
      }

      const data = await response.json();
      console.log(data);

      // Логіка для парсингу відповіді AI (зберігаємо вашу логіку)
      const aiResponse = JSON.parse(data.text);

      console.log("Відповідь пошуку (JSON):", aiResponse);
      setLoading(false);
      setError(false);
      setSearchResults(aiResponse);
    } catch (error) {
      setError(true);

      console.error("Помилка під час спілкування з API:", error);
    }
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setSearchTerm(newQuery);

    // 1. Очищаємо попередній таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 2. Встановлюємо поріг для пошуку (наприклад, 3 символи)
    if (newQuery.length < 3) {
      console.log("Запит занадто короткий. Очікуємо 3+ символи.");
      setSearchResults(null);
      return;
    }

    // 3. Встановлюємо новий таймер для Debounce
    timeoutRef.current = setTimeout(() => {
      search(newQuery);
    }, SEARCH_DELAY_MS);
  };

  // Очищення таймера при демонтажі компонента (важливо!)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="search-wrap">
      {/* 👈 ДОДАНО onSubmit для запобігання перезавантаженню сторінки */}
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="search-inpt"
          value={searchTerm} // Контрольований компонент
          onChange={handleChange}
          placeholder="Введіть запит (від 3 символів)..."
        />
      </form>
      <ul className={`search-results ${searchResults ? "valid" : ""}`}>
        {isLoading ? (
          <p>Почекайте ...</p>
        ) : isError ? (
          <p>Помилка, спробуйте шераз</p>
        ) : searchResults?.length === 0 ? (
          <p>Товар не знайдено</p>
        ) : (
          searchResults?.map((res, i) => (
            <li className="search-result" key={i}>
              <a href={res.url}>{res.name}</a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchAI;
