import Image from "next/image";
import { SimpleBtn } from "@/components/btns";
import "./style.css";

const AboutUs = () => {
  return (
    <>
      <section className="about-history">
        <div>
          <h1 className="about-title">Про Lynx</h1>
          <p className="about-history-desc">
            LynxAI була заснована з метою надати інноваційні IT-рішення, які
            трансформують бізнес та створюють нову цінність для клієнтів.
            <br />
            <br />
            Ми спеціалізуємось на розробці рішень штучного інтелекту,
            веб-додатків та консультацій у галузі технологій.
            <br />
            <br />
            Наша команда складається з досвідчених фахівців, які мають глибокі
            знання в сучасних технологіях та методах розробки.
          </p>
        </div>
        <Image
          className="about-history-logo"
          src="/imgs/lynxai-logo.png"
          width={100}
          height={100}
          alt="logo"
        />
      </section>

      <section className="about-values">
        <h2 className="about-title">Наші цінності</h2>
        <ul className="about-list">
          <li className="about-item">
            <h3 className="about-item-title">Якість</h3>
            <p>
              Ми прагнемо найвищої якості у всіх аспектах нашої роботи, від
              розробки до підтримки.
            </p>
          </li>
          <li className="about-item">
            <h3 className="about-item-title">Інновація</h3>
            <p>
              Постійно вивчаємо нові технології та методи, щоб залишатися на
              передовій індустрії.
            </p>
          </li>
          <li className="about-item">
            <h3 className="about-item-title">Партнерство</h3>
            <p>
              Вважаємо себе партнерами наших клієнтів, а не просто
              постачальниками послуг.
            </p>
          </li>
        </ul>
      </section>

      <section className="about-start">
        <h2 className="about-title">Готові розпочати?</h2>
        <div className="about-btns">
          <SimpleBtn className="about-btn" data-color='main'>Переглянути послуги</SimpleBtn>
          <SimpleBtn className="about-btn">Познайомитися з командою</SimpleBtn>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
