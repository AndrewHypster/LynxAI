import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Ініціалізація AI (робіть це поза межами POST, щоб уникнути повторного ініціалізації)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = "gemini-2.5-flash"; // Оптимальна модель для чату

export async function POST(req) {
  try {
    const { userPrompt } = await req.json(); // Отримуємо всю історію з фронтенду

    // Формування Системного Prompt
    const systemInstruction = `
    Ти — експерт з маркетингу, твоя задача — на основі необроблених даних від користувача створити привабливий та повний опис товару, розділивши його на секції "Огляд" та "Технічні характеристики".
    Ось необроблений текст від користувача:
    <INPUT>
    ${userPrompt} 
    </INPUT>
    Поверни результат лише у форматі JSON з полями: "name", "overview" (детальний опис з маркдаун для стилізації тексту чи відступів), "features" (список характеристик з ключами name і value), "reviews" (відшуки з імям, оцінкою, коментарем на основі опису товару та характеристик. Мінімум 5 штук).`;

    // --- 4. ВИКЛИК GEMINI API ---

    // Зверніть увагу: ми використовуємо chat.sendMessage або generateContent
    // Запускаємо генерацію контенту, передаючи всю історію та системну інструкцію
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      config: {
        systemInstruction: systemInstruction,
      },
      contents: [{ parts: [{ text: userPrompt }] }],
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
