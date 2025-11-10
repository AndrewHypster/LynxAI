import Image from "next/image";
import "./style.css";

const AboutUs = () => {
  return (
    <section className="about-history">
      <div>
        <h1 className="about-title">Про Lynx</h1>
        <p className="about-history-desc">
          LynxAI була заснована з метою надати інноваційні IT-рішення, які
          трансформують бізнес та створюють нову цінність для клієнтів.
          <br />
          <br />
          Ми спеціалізуємось на розробці рішень штучного інтелекту, веб-додатків
          та консультацій у галузі технологій.
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
  );
};

export default AboutUs;
