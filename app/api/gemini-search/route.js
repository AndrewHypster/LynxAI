import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const shop = [
  {
    name: "Смартфони",
    slug: "smartfony",
    url: "/test-shop/smartfony",
    products: [
      {
        name: "Galaxy S23 Ultra",
        description:
          "Потужний процесор, неймовірна камера 200MP, стилус S Pen, великий екран.",
        url: "/test-shop/galaxy-s23-ultra",
      },
      {
        name: "iPhone 15 Pro",
        description:
          "Чіп A17 Bionic, титановий корпус, динамічний острів, професійна зйомка відео.",
        url: "/test-shop/iphone-15-pro",
      },
      {
        name: "Xiaomi 13T Pro",
        description:
          "Швидка зарядка 120W, великий AMOLED-дисплей, надійна батарея, гарна ціна.",
        url: "/test-shop/xiaomi-13t-pro",
      },
      {
        name: "Google Pixel 8",
        description:
          "Чистий Android, потужна обробка фото AI, компактний дизайн та автономність.",
        url: "/test-shop/google-pixel-8",
      },
      {
        name: "OnePlus 11",
        description:
          "Флагман із високою продуктивністю, елегантним дизайном та швидким інтерфейсом.",
        url: "/test-shop/oneplus-11",
      },
    ],
  },
  {
    name: "Ноутбуки",
    slug: "noutbuky",
    url: "/test-shop/noutbuky",
    products: [
      {
        name: "MacBook Pro M3",
        description:
          "Надзвичайна продуктивність чіпа M3 Max, чудова автономність, Liquid Retina екран.",
        url: "/test-shop/macbook-pro-m3",
      },
      {
        name: "Dell XPS 15",
        description:
          "Елегантний дизайн, потужна графіка RTX, ідеальний для роботи та творчості.",
        url: "/test-shop/dell-xps-15",
      },
      {
        name: "Lenovo Legion 5",
        description:
          "Потужний ігровий ноутбук, висока частота оновлення екрана, ефективне охолодження.",
        url: "/test-shop/lenovo-legion-5",
      },
      {
        name: "Asus ZenBook Duo",
        description:
          "Два сенсорні екрани для багатозадачності, тонкий корпус, професійна продуктивність.",
        url: "/test-shop/asus-zenbook-duo",
      },
      {
        name: "HP Spectre x360",
        description:
          "Трансформер 2-в-1, сенсорний OLED дисплей, тривалий час роботи від батареї.",
        url: "/test-shop/hp-spectre-x360",
      },
    ],
  },
  {
    name: "Планшети",
    slug: "planshety",
    url: "/test-shop/planshety",
    products: [
      {
        name: "iPad Pro M2",
        description:
          "Продуктивність рівня ноутбука, дисплей Liquid Retina XDR, підтримка Apple Pencil 2.",
        url: "/test-shop/ipad-pro-m2",
      },
      {
        name: "Samsung Tab S9",
        description:
          "Якісний AMOLED екран, стилус S Pen в комплекті, ідеальний для малювання.",
        url: "/test-shop/samsung-tab-s9",
      },
      {
        name: "Microsoft Surface Go 3",
        description:
          "Легкий та портативний, працює на Windows 11, ідеальний для студентів.",
        url: "/test-shop/microsoft-surface-go-3",
      },
      {
        name: "Lenovo Tab P11",
        description:
          "Доступний планшет з великим 2K дисплеєм та гарною автономністю роботи.",
        url: "/test-shop/lenovo-tab-p11",
      },
      {
        name: "Xiaomi Pad 6",
        description:
          "Високопродуктивний процесор, швидка зарядка, підходить для ігор та мультимедіа.",
        url: "/test-shop/xiaomi-pad-6",
      },
    ],
  },
  {
    name: "Навушники",
    slug: "navushnyky",
    url: "/test-shop/navushnyky",
    products: [
      {
        name: "Sony WH-1000XM5",
        description:
          "Найкраще шумозаглушення на ринку, преміальний звук, зручна посадка на вухах.",
        url: "/test-shop/sony-wh-1000xm5",
      },
      {
        name: "AirPods Pro 2",
        description:
          "Просторове аудіо, чіп H2, адаптивний режим прозорості, ідеально для Apple.",
        url: "/test-shop/airpods-pro-2",
      },
      {
        name: "Bose QuietComfort Ultra",
        description:
          "Фантастичний комфорт, сильне шумозаглушення, відмінна якість звуку для меломанів.",
        url: "/test-shop/bose-quietcomfort-ultra",
      },
      {
        name: "JBL Tune 510BT",
        description:
          "Бездротові накладні навушники, потужний бас, 40 годин роботи, доступна ціна.",
        url: "/test-shop/jbl-tune-510bt",
      },
      {
        name: "Sennheiser Momentum 4",
        description:
          "Чудовий Hi-Fi звук, до 60 годин роботи, зручний та стильний дизайн.",
        url: "/test-shop/sennheiser-momentum-4",
      },
    ],
  },
  {
    name: "Смарт-годинники",
    slug: "smart-godynnyky",
    url: "/test-shop/smart-godynnyky",
    products: [
      {
        name: "Apple Watch Series 9",
        description:
          "Новий жест Double Tap, яскравий дисплей, точний моніторинг здоров'я та активності.",
        url: "/test-shop/apple-watch-series-9",
      },
      {
        name: "Samsung Galaxy Watch 6",
        description:
          "Елегантний дизайн, детальний аналіз сну, біоімпедансний аналіз тіла (BIA).",
        url: "/test-shop/samsung-galaxy-watch-6",
      },
      {
        name: "Garmin Venu 3",
        description:
          "Довга автономність, детальна метрика фітнесу, моніторинг енергії Body Battery.",
        url: "/test-shop/garmin-venu-3",
      },
      {
        name: "Huawei Watch GT 4",
        description:
          "Стильний вигляд, точний GPS, тривалий час роботи, сумісність з Android/iOS.",
        url: "/test-shop/huawei-watch-gt-4",
      },
      {
        name: "Xiaomi Smart Band 8 Pro",
        description:
          "Великий AMOLED екран, легкий, більше 150 спортивних режимів, бюджетний фітнес-трекер.",
        url: "/test-shop/xiaomi-smart-band-8-pro",
      },
    ],
  },
  {
    name: "Монітори",
    slug: "monitory",
    url: "/test-shop/monitory",
    products: [
      {
        name: "Samsung Odyssey G9",
        description:
          "Вигнутий ультраширокий екран, 240 Гц, для повного занурення в ігри.",
        url: "/test-shop/samsung-odyssey-g9",
      },
      {
        name: "LG UltraGear 27GR95QE",
        description:
          "OLED-панель 240 Гц, блискавична реакція 0.03 мс, ідеально для кіберспорту.",
        url: "/test-shop/lg-ultragear-27gr95qe",
      },
      {
        name: "Dell UltraSharp U2723QE",
        description:
          "4K роздільна здатність, 100% sRGB, порт USB-C з Power Delivery, для професіоналів.",
        url: "/test-shop/dell-ultrasharp-u2723qe",
      },
      {
        name: "Asus ProArt PA32UCG",
        description:
          "Міні-LED підсвітка, 1600 ніт яскравості, ідеальний для HDR-контенту та дизайну.",
        url: "/test-shop/asus-proart-pa32ucg",
      },
      {
        name: "BenQ Mobiuz EX2710Q",
        description:
          "2K роздільна здатність, 144 Гц, технологія Eye-Care, відмінний баланс ціни та якості.",
        url: "/test-shop/benq-mobiuz-ex2710q",
      },
    ],
  },
  {
    name: "Фотокамери",
    slug: "fotokamery",
    url: "/test-shop/fotokamery",
    products: [
      {
        name: "Sony Alpha A7 IV",
        description:
          "Повнокадрова гібридна камера, 33 Мп, 4K 60p відео, для професіоналів і аматорів.",
        url: "/test-shop/sony-alpha-a7-iv",
      },
      {
        name: "Canon EOS R6 Mark II",
        description:
          "Швидкісна зйомка, відмінний автофокус, ідеальна для спорту та динамічних подій.",
        url: "/test-shop/canon-eos-r6-mark-ii",
      },
      {
        name: "Fujifilm X-T5",
        description:
          "Компактний дизайн, 40.2 Мп APS-C, чудова якість зображення, ретро-стиль.",
        url: "/test-shop/fujifilm-x-t5",
      },
      {
        name: "Nikon Z6 II",
        description:
          "Надійна конструкція, два процесори EXPEED 6, чудова робота при слабкому освітленні.",
        url: "/test-shop/nikon-z6-ii",
      },
      {
        name: "GoPro HERO 12 Black",
        description:
          "Екшн-камера, 5.3K відео, стабілізація HyperSmooth 6.0, водонепроникний корпус.",
        url: "/test-shop/gopro-hero-12-black",
      },
    ],
  },
  {
    name: "Аксесуари",
    slug: "aksesuary",
    url: "/test-shop/aksesuary",
    products: [
      {
        name: "Power Bank Baseus 30000 mAh",
        description:
          "Велика ємність, швидка зарядка 65W, ідеально для ноутбуків та смартфонів.",
        url: "/test-shop/power-bank-baseus",
      },
      {
        name: "Бездротова зарядка Belkin",
        description:
          "Швидка індукційна зарядка 15W, стильний дизайн, безпечна для всіх пристроїв.",
        url: "/test-shop/bezprovidna-zaryadka-belkin",
      },
      {
        name: "Mesh Wi-Fi System TP-Link",
        description:
          "Покриття Wi-Fi в усьому будинку, висока швидкість, простий процес налаштування.",
        url: "/test-shop/mesh-wi-fi-system-tp-link",
      },
      {
        name: "Механічна клавіатура Keychron",
        description:
          "Компактна 60%, гаряча заміна свитчів, RGB підсвітка, для друку та ігор.",
        url: "/test-shop/mechanichna-klaviatura-keychron",
      },
      {
        name: "Bluetooth-трекер Apple AirTag",
        description:
          "Легко знаходьте свої речі, захист від небажаного відстеження, працює з Apple.",
        url: "/test-shop/bluetooth-treker-apple-airtag",
      },
    ],
  },
];

// Ініціалізація AI (робіть це поза межами POST, щоб уникнути повторного ініціалізації)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = "gemini-2.5-flash"; // Оптимальна модель для чату

// Функція для отримання даних (використовуємо імпортований shop)
const getProductData = () => {
  // Тут ви можете додати логіку фільтрації, якщо каталог великий
  return shop;
};


export async function POST(req) {
  try {
    const { search } = await req.json(); // Отримуємо всю історію з фронтенду

    // --- 1. ПІДГОТОВКА ДАНИХ ТА ПРОМПТА ---

    // Отримуємо всі товари
    const productData = getProductData();
    // Краще відправляти дані як JSON-рядок, щоб AI міг їх легко обробити
    const productsString = JSON.stringify(productData, null, 2);

    // Формування Системного Prompt
    const systemInstruction = `Користувач вводе в форму пошуку товарів то шо хоче купити, а ти з каталогу:\n\n<CATALOG>${productsString}</CATALOG>\n\n маєш дати назви продуктів чи категорій які підходать та силку на них. Користувач може вводити з помилками. Поверни лише чистий масив без markdown-блоків, пояснень чи додаткових символів.`;

    // --- 4. ВИКЛИК GEMINI API ---

    // Зверніть увагу: ми використовуємо chat.sendMessage або generateContent
    // Запускаємо генерацію контенту, передаючи всю історію та системну інструкцію
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: search,
      config: {
        systemInstruction: systemInstruction
      },
    });

    const aiResponseText = response.text;

    // --- 5. ВІДПОВІДЬ ФРОНТЕНДУ ---
    return NextResponse.json({
      text: aiResponseText,
    });
  } catch (error) {
    console.error("Помилка під час обробки запиту:", error);
    // Повертаємо помилку 500
    return NextResponse.json(
      { error: "Внутрішня помилка сервера. Не вдалося зв'язатися з AI." },
      { status: 500 }
    );
  }
}
