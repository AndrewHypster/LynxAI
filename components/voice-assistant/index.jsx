"use client";
import Image from "next/image";
import "./style.css";
import { useEffect, useState } from "react";
import { useOverlay } from "../overlay";
import ReactMarkdown from "react-markdown";

const VoiceAssistant = () => {
  const [isOpen, setOpen] = useState(false);
  const { showOverlay, hideOverlay } = useOverlay();
  const [chat, setChat] = useState([]);
  const [aiMessage, setAiMessage] = useState('')

  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  let recognition;

  // Chrome Web Speech API
  if (typeof window !== "undefined") {
    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "uk-UA"; // Мова розпізнавання
      recognition.continuous = false; // Після фрази зупиняється
      recognition.interimResults = false;
    }
  }

  const startRecording = () => {
    if (!recognition) {
      alert("Ваш браузер не підтримує розпізнавання голосу");
      return;
    }

    recognition.start();
    setIsRecording(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
  };

 const speak = (text) => {
   if (!window.speechSynthesis) return;
   const utter = new SpeechSynthesisUtterance(text);
   utter.lang = "uk-UA";
   utter.pitch = 1;
   utter.rate = 1;
   utter.volume = 1;

   const voices = window.speechSynthesis.getVoices();
   const ukVoice = voices.find(
     (v) => v.lang.startsWith("uk") || v.name.toLowerCase().includes("uk")
   );
   if (ukVoice) {
     utter.voice = ukVoice;
   }

   window.speechSynthesis.cancel(); // зупиняємо попередні озвучки
   window.speechSynthesis.speak(utter);
 };

  useEffect(() => {
    if (isOpen) {
      showOverlay();
      startRecording();
    }
    hideOverlay();
  }, [isOpen]);

  useEffect(() => {
    if(isRecording) startRecording()
  }, [isRecording]);

  useEffect(() => {
    const f = async () => {
      if (!text.trim()) return;

      const newUserMessage = {
        role: "user",
        content: text,
      };
      const updateChat = [...chat, newUserMessage];
      setChat(updateChat);
      setText(""); // очищаємо поле після відправки

      try {
        const response = await fetch("/api/gemini-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ history: updateChat }),
        });

        if (!response.ok) throw new Error("Помилка від AI консультанта");

        const data = await response.json();
        const aiResponse = { role: "assistant", content: data.text };

        // 1. Оновлюємо чат
        setChat((prev) => [...prev, aiResponse]);

        // 2. Озвучуємо
        speechSynthesis.cancel();
        speak(aiResponse.content.replace(/\*/g, ""));
        setAiMessage(aiResponse.content);
        setIsRecording(true)
      } catch (err) {
        console.error(err);
      }
    };
    f();
  }, [text]);

  return (
    <button
      className={isOpen ? "vassistant" : "vassistant-btn"}
      style={isRecording ? { border: "4px solid red" } : {}}
      onClick={() => setOpen(!isOpen)}
    >
      <Image
        src="/imgs/lynxai-logo.png"
        width={50}
        height={50}
        alt="run voice assistant"
      />
      <ReactMarkdown>{aiMessage}</ReactMarkdown>
    </button>
  );
};

export default VoiceAssistant;
