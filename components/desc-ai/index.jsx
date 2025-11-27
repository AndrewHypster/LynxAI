import "./style.css";
import ReactMarkdown from "react-markdown";
import { SimpleBtn } from "../btns";
import { useRef, useState } from "react";

const AIDescriptin = () => {
  const [result, setResult] = useState("");
  const userText = useRef(null);

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

      const simpleMarkdownToPlain = (mdText) => {
        if (!mdText) return "";
        // 1. Прибираємо початку markdown-блоку: ```json
        let cleaned = mdText.replace(/^\s*```json\s*/, "");
        // 2. Прибираємо кінець markdown-блоку: ```
        cleaned = cleaned.replace(/\s*```\s*$/, "");
        // 3. (Опціонально) Прибираємо інші символи Markdown, як раніше
        cleaned = cleaned.replace(/\*\*|__|\*|_/g, "");
        cleaned = cleaned.replace(/<[^>]*>/g, "");
        // Повертаємо очищений рядок JSON
        return cleaned.trim();
      };

      const aiResult = JSON.parse(simpleMarkdownToPlain(data.text));

      setResult(
        <ReactMarkdown>{`
  **Назва:**
  ${aiResult.name}


  **Характеристики:**
  ${aiResult.features.map((f) => `* - ${f}`).join("\n")}


  **Опис:** ${aiResult.overview}
`}</ReactMarkdown>
      );
    } else {
      setResult("Опис має бути не меншим 50 символів");
    }
  };

  return (
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

      <p className="aidesc-output">{result}</p>
    </div>
  );
};

export default AIDescriptin;
