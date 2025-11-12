'use client'
import { useState, useEffect, useRef } from "react";
import './style.css'

// Компонент кастомного курсора
const CustomCursor = () => {
  // Стан для відстеження позиції курсора
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Стан для відстеження, чи курсор знаходиться над інтерактивним елементом
  const [isHovered, setIsHovered] = useState(false);

  // Реф для прямого доступу до DOM-елемента курсора
  const cursorRef = useRef(null);

  useEffect(() => {
    // 1. Обробник руху миші
    const handleMouseMove = (e) => {
      // Оновлюємо стан позиції
      setPosition({ x: e.clientX, y: e.clientY });

      // Використовуємо Ref для прямої маніпуляції transform
      // Це часто забезпечує кращу продуктивність, ніж setState для кожного руху
      if (cursorRef.current) {
        const scale = isHovered ? 2 : 1;
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${scale})`;
      }
    };

    // 2. Обробник наведення на інтерактивні елементи
    const handleHover = (event) => {
      const isInteractive = event.target.closest("a, button, .link-grad");
      // Оновлюємо стан hovered, щоб змінити вигляд курсора
      setIsHovered(!!isInteractive);
    };

    // Додаємо слухачі подій до всього документа
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseout", handleHover);

    // Функція очищення (cleanup) при демонтажі компонента
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseout", handleHover);
    };
  }, [isHovered]); // Залежність isHovered потрібна для оновлення scale в handleMouseMove

  // Рендеримо курсор
  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? "hovered" : ""}`}
    />
  );
};

export default CustomCursor;
