"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";

const Slider = ({ items = [], renderItem: RenderItem }) => {
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  // 📏 функція для розрахунку кількості карток на слайд
  const calculateSlides = () => {
    if (!sliderRef.current || !cardRef.current) return;

    const sliderWidth = sliderRef.current.offsetWidth;
    const cardWidth = cardRef.current.offsetWidth;
    if (cardWidth === 0) return;

    const numCards = Math.max(1, Math.floor(sliderWidth / cardWidth));

    const grouped = [];
    for (let i = 0; i < items.length; i += numCards) {
      grouped.push(items.slice(i, i + numCards));
    }
    setSlides(grouped);
  };

  // 🧩 ініціалізація після першого рендеру
  useEffect(() => {
    calculateSlides();
    window.addEventListener("resize", calculateSlides);
    return () => window.removeEventListener("resize", calculateSlides);
  }, [items]);

  // 🕵️‍♂️ прихований вимірювач
  useEffect(() => {
    const timer = setTimeout(() => calculateSlides(), 100); // невелика затримка для DOM
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* прихована картка для вимірювання */}
      <div style={{ visibility: "hidden", position: "absolute" }}>
        <div ref={cardRef}>
          <RenderItem item={items[0]} />
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        ref={sliderRef}
        modules={[Navigation]} // 🧭 додаємо модуль
        navigation={true}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            {slide.map((item, j) => (
              <RenderItem key={j} item={item} />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
