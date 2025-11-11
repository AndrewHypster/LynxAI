import { SimpleBtn } from "@/components/btns";
import Image from "next/image";
import "./main.css";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          className="hero-logo"
          src="/imgs/lynxai-logo.png"
          width={100}
          height={100}
          alt="logo"
        />
        <p className="hero-desc">
          Інноваційні IT-рішення для вашого бізнесу
          <br />
          Ми пропонуємо найкращі послуги в сфері
          <br />
          штучного інтелекту та технологій
        </p>
        <div className="hero-btns">
          <SimpleBtn data-color="main" className="hero-btn violet">
            Послуги
          </SimpleBtn>
          <SimpleBtn data-border="gray" className="hero-btn gray">
            Команда
          </SimpleBtn>
        </div>
      </section>

      <section className="features">
        <h2 className="features-title bottom-grad">Чому LynxAI?</h2>
        <ul className="features-list">
          <li className="features-item">
            <b className="features-bold">🚀 Інноваційність</b>
            <p className="features-desc">
              Використовуємо найновіші технології та методи розробки для
              досягнення найкращих результатів.
            </p>
          </li>
          <li className="features-item">
            <b className="features-bold">👥 Професійна команда</b>
            <p className="features-desc">
              Наша команда складається з досвідчених фахівців у галузі IT та
              штучного інтелекту.
            </p>
          </li>
          <li className="features-item">
            <b className="features-bold">⚡ Швидкість</b>
            <p className="features-desc">
              Ми забезпечуємо швидку доставку проектів без компромісу щодо
              якості.
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}
