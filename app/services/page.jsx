"use client";
import Link from "next/link";
import "./style.css";

const OurServices = () => {
  return (
    <div className="services">
      <h1 className="services-title bottom-grad">Наші сервіси</h1>
      <ul className="services-list">
        <Link href="/services/chat-ai">
          <li className="services-item">
            <h3 className="services-item-title">AI консультант на сайті</h3>
            <p className="services-item-desc">
              Чат з AI консультантом, що визначить який товар потрібний клієнту,
              візьме його дані та відправить замовлення вам на пошту чи
              телеграм.
            </p>
          </li>
        </Link>
        <Link href="/services/search-ai">
          <li className="services-item">
            <h3 className="services-item-title">AI пошук товару на сайті</h3>
            <p className="services-item-desc">
              На головній сторінці сайту буде пошук. Користувач буде вводити
              назву, опис, речення, а AI обробить це та знайде товари за описом.
            </p>
          </li>
        </Link>
        <Link href="/services/content-ai">
          <li className="services-item">
            <h3 className="services-item-title">Генерація контенту</h3>
            <p className="services-item-desc">
              Даєте картинку, ціну, характеристики, короткий опис. AI згенерує
              заголовок, опис, коментарі для цього товару та вставе в шаблон
              вашої сторінки.
            </p>
          </li>
        </Link>
        <Link href="#">
          <li className="services-item">
            <h3 className="services-item-title">SEO від AI</h3>
            <p className="services-item-desc">
              Одне з головного в SEO це заголовок сторінки, опис та мета теги.
              AI візьме вашу сторінку, сторінки конкурентів та створе опис який
              буде кращим за інші. Таким чином ваш сайт буде одним з перших в
              пошуку.
            </p>
          </li>
        </Link>
        <Link href="#">
          <li className="services-item">
            <h3 className="services-item-title">Розумна форма замовлень</h3>
            <p className="services-item-desc">
              AI автоматично заповнює поля, підказує адресу, перевіряє дані, дає
              підказки для заповнень, пропонує додаткові товари
            </p>
          </li>
        </Link>
        <Link href="#">
          <li className="services-item">
            <h3 className="services-item-title">AI модерація відгуків</h3>
            <p className="services-item-desc">
              Користувачі лишають відгук. AI бачить хороші пише від імені
              адміністратора подяку. Якшо поганий - пише зустрічні питання чи
              вибачення і надсилає коментар вам в телеграм бот чи на пошту.
            </p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default OurServices;
