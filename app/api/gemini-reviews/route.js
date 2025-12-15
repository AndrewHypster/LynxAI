import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

import sendTelegramNotification from "../telegram-bot/route";

// Ініціалізація AI (робіть це поза межами POST, щоб уникнути повторного ініціалізації)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = "gemini-2.5-flash"; // Оптимальна модель для чату

const telegramTool = {
  functionDeclarations: [
    {
      name: "sendTelegramNotification",
      description:
        "Відправляє повідомлення менеджеру магазину, коли якись коментар є незадоволеним чи агресивним.",
      parameters: {
        type: "OBJECT",
        properties: {
          message: {
            type: "STRING",
            description:
              "Повідомлення для менеджера. Має містити всі дані товару та коментаря. Оформи гарно відповідь жирними буквати та відступами шоб було читабельно за допомогою маркдаун",
          },
          userReply: {
            type: "STRING",
            description: "Текст відповіді для покупця",
          },
        },
        required: ["message", "userReply"],
      },
    },
  ],
};

export async function POST(req) {
  try {
    const { product, comments } = await req.json(); // Отримуємо всю історію з фронтенду
    
    // Формування Системного Prompt
    const systemInstruction = `
    Ти обробляєш коментарі користувачів шо є під кожним товаром.

    Ось інформація про продукт. Використовуй лише ці дані товару
    <PRODUCT>
      <name>${product.name}</name>
      <features>${product.features}</features>
      <overview>${product.overview}</overview>
    </PRODUCT>
    
    Твоє завдання:
1. Проаналізувати кожен коментар окремо.
2. Якщо коментар позитивний (рейтинг 4–5 або позитивний тон):
   – Ввічливо подякуй користувачу.
   – Коротко підкресли користь продукту.
3. Якщо коментар негативний або нейтральний (рейтинг 1–3 або скарга):
   – Відповідай спокійно та ввічливо.
   – Обов'язково вибачся за незручності!
   – Повідом, що коментар буде передано відповідальному менеджеру.
   – Відправ коментар менеджеру в telegram зі всіма даними продукту та самого коментаря

Вимоги до відповіді:
- Відповідай коротко і по суті.
- Не вигадуй інформацію поза каталогом.
- Не використовуй технічні терміни.
- Тон: дружній та професійний.
- Формат відповіді — звичайний текст (без тегів).  `;

    // --- 4. ВИКЛИК GEMINI API ---

    // Зверніть увагу: ми використовуємо chat.sendMessage або generateContent
    // Запускаємо генерацію контенту, передаючи всю історію та системну інструкцію
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: comments,
      config: {
        systemInstruction: systemInstruction,
        tools: [telegramTool], // Передаємо інструмент сюди
      },
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];

      if (call.name === "sendTelegramNotification") {
        const { message, userReply } = call.args;

        // --- 4. ВИКЛИК ФАКТИЧНОГО ТЕЛЕГРАМ БОТА ---
        await sendTelegramNotification(message);

        return NextResponse.json({ text: userReply });
      }
    }

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
