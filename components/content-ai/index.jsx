import "./style.css";
import ReactMarkdown from "react-markdown";
import { SimpleBtn } from "../btns";
import { useEffect, useRef, useState } from "react";
import Slider from "../slider";
import Image from "next/image";

const AIContent = () => {
  const [result, setResult] = useState({
    ok: true,
    product: {
      name: "Подушка з твоїм принтом",
      overview:
        "Створіть неповторний акцент у вашому інтер'єрі або зробіть **незабутній подарунок** з нашою **подушкою з індивідуальним принтом!** Ми втілимо будь-яку вашу ідею, нанісши обраний малюнок або фотографію, перетворюючи звичайну подушку на **особистий витвір мистецтва**. Ця подушка не лише привертає погляди, але й дарує справжній комфорт. Завдяки **бавовняному наповнювачу**, вона є **гіпоалергенною** та забезпечує м'яку підтримку для **глибокого і здорового сну**. Її тканина (90% бавовна, 10% поліестер) поєднує приємні тактильні відчуття з високою зносостійкістю. **Поспішайте! До кінця місяця діє спеціальна знижка 25%** – ідеальна нагода створити щось особливе та вигідне.",
      features: [
        {
          name: "Розмір",
          value: "35х35 см",
        },
        {
          name: "Наповнювач",
          value: "Бавовна",
        },
        {
          name: "Склад тканини чохла",
          value: "90% Бавовна, 10% Поліестер",
        },
        {
          name: "Можливість індивідуального дизайну",
          value: "Так (будь-який ваш принт)",
        },
        {
          name: "Гіпоалергенність",
          value: "Так",
        },
      ],
      reviews: [
        {
          name: "Олена К.",
          rating: 5,
          comment:
            "Замовляла подушку для подруги з її улюбленим мемом. Якість друку чудова, кольори яскраві. Дуже м'яка і приємна на дотик. Подруга була в захваті від такого особистого подарунка! Однозначно рекомендую!",
        },
        {
          name: "Михайло П.",
          rating: 5,
          comment:
            "Шукав щось особливе для декору дитячої кімнати. Подушка 35х35 см з принтом сина виглядає просто чудово. Бавовняний наповнювач дійсно гіпоалергенний, дитина не чхає. Дуже задоволений покупкою.",
        },
        {
          name: "Анна С.",
          rating: 5,
          comment:
            "Замовила з фото нашого цуценяти, виглядає неймовірно! Якість тканини дуже приємна, і спати на ній одне задоволення. Вона достатньо м'яка, але добре тримає форму. До того ж, це було дуже вигідне придбання зі знижкою!",
        },
        {
          name: "Дмитро В.",
          rating: 5,
          comment:
            "Чудовий подарунок на день народження дружини. Вона давно мріяла про подушку з нашим спільним фото. Розмір ідеальний для дивана, а бавовна робить її дуже комфортною. Дружина у захваті!",
        },
        {
          name: "Софія Л.",
          rating: 5,
          comment:
            "Дуже порадувала гіпоалергенність наповнювача. Для мене це було ключовим критерієм. А можливість зробити власний дизайн — просто бомба! Сплю на ній щоночі, вона така м'яка і не викликає жодних алергічних реакцій. Однозначно 5 зірок.",
        },
      ],
    },
  });
  const userText = useRef(null);

  useEffect(() => console.log(result), [result]);

  const handleForm = async (event) => {
    event.preventDefault();

    if (userText.current && userText.current.value.length >= 50) {
      const userValue = userText.current.value;

      const resp = await fetch("/api/gemini-desc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: userValue,
        }),
      });
      const data = await resp.json();

      console.log(data);

      const simpleMarkdownToPlain = (mdText) => {
        if (!mdText) return "";
        // 1. Прибираємо початку markdown-блоку: ```json
        let cleaned = mdText.replace(/^\s*```json\s*/, "");
        // 2. Прибираємо кінець markdown-блоку: ```
        cleaned = cleaned.replace(/\s*```\s*$/, "");
        // Повертаємо очищений рядок JSON
        return cleaned.trim();
      };

      const aiResult = JSON.parse(simpleMarkdownToPlain(data.text));

      setResult({ ok: true, product: aiResult });
    } else {
      setResult({ ok: false });
    }
  };

  const imgs = [
    "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/g/a/galaxy_s10e_g970f_128gb_yellow_591467134579.jpg",
    "https://yellow.ua/media/catalog/product/cache/9/image/600x600/9df78eab33525d08d6e5fb8d27136e95/g/a/galaxy_s10e_g970f_128gb_yellow_591467116523.jpg",
    "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/g/e/gennhk6n91wt76gckhnu6r8nw4cmd0bd.jpg",
    "https://yellow.ua/media/catalog/product/cache/9/image/600x600/9df78eab33525d08d6e5fb8d27136e95/8/g/8ggrk6sfhd3rme75gv0g66a9vnd6gugu.jpg",
    "https://yellow.ua/media/catalog/product/cache/9/image/600x600/9df78eab33525d08d6e5fb8d27136e95/3/5/35hqn2yo39x5j4qbqcnrybdla7n5nuwu.jpg",
  ];

  const SliderImg = ({ item, cardRef }) => (
    <Image src={item} width={500} height={500} alt="" ref={cardRef}></Image>
  );

  const createReview = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const rating = event.target.rating.value;
    const comment = event.target.comment.value;

    const resp = await fetch("/api/gemini-reviews", {
      // Ваш API Route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: result.product,
        comments: [{
          name,
          rating,
          text: comment,
        }],
      }),
    });

    const aiResp = await resp.json()
    console.log(aiResp);
    
    

    const newReview = {
      name: "user",
      rating: Number(rating),
      comment,
    };

    setResult((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        reviews: [newReview, ...prev.product.reviews], // ✅ МАСИВ
      },
    }));
  };
  return result.ok ? (
    <div className="product">
      <section
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <div className="product-slider">
          <Slider
            items={imgs}
            renderItem={SliderImg}
            direction="horizontal"
            navigation={true}
          />
        </div>
        <div>
          <h1 className="product-title">{result.product.name}</h1>

          <div className="product-prices">
            <h3 className="product-price-title">Ціна</h3>
            <span className="product-price new">6000грн</span>
            <span className="product-price old">7000грн</span>
          </div>
          <SimpleBtn className="product-bye">Замовити</SimpleBtn>
        </div>
      </section>
      <section className="prodct-characteristics">
        <h2 className="prodct-characteristics-title">Характеристики</h2>
        <ul className="prodct-characteristics-list">
          {result.product.features.map((feature, k) => (
            <li className="prodct-characteristics-item" key={k}>
              <b>{feature.name}</b>
              <p>{feature.value}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="prodct-desc">
        <h2 className="prodct-desc-title">Опис</h2>
        <ReactMarkdown>{result.product.overview}</ReactMarkdown>
      </section>

      <section className="product-reviews">
        <h2 className="product-reviews-title">Відгуки</h2>
        <ul className="product-reviews-list">
          {result.product.reviews.map((review, k) => (
            <li className="product-reviews-item" key={k}>
              <div>
                <b className="product-reviews-name">{review.name}</b>
                <span className="product-reviews-rating">
                  Оцінка: {review.rating}
                </span>
              </div>
              <hr />
              <p className="product-reviews-text">{review.comment}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="product-create-review">
        <h2 className="product-reviews-title">Написати відгук</h2>
        <form onSubmit={createReview}>
          <input type="number" name="name" value="user" readOnly hidden />
          <input type="number" name="rating" placeholder="Оцінка" />
          <textarea name="comment" placeholder="Відгук"></textarea>
          <SimpleBtn>Надіслати</SimpleBtn>
        </form>
      </section>
    </div>
  ) : (
    <div className="aidesc-wrapper">
      <form className="aidesc-form" onSubmit={handleForm}>
        <textarea
          ref={userText}
          defaultValue={`Назва товару: Подушка з твоїм принтом\n\nХарактеристики: \nРозмір 35х35 см\nНаповнювач бавовна\nТканина 10 поліестр 90 бавовна\n\nКороткий опис: Зробимо подушку з вашим принтом. Протиелергенна, з функцією памяті та добре на ній спати. Чудовий подарок. Знижка 25% до кігця місяця. \n\nПобажаття: опис на 100слів, зацікав клієнта`}
          placeholder={`Назва товару: ...\n\nХарактеристики: ...\n\nКороткий опис: ...`}
        ></textarea>
        <SimpleBtn className="aidesc-btn" style={{ background: "var(--main)" }}>
          Submit
        </SimpleBtn>
      </form>
    </div>
  );
};

export default AIContent;
