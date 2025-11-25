"use client";
import { Suspense, useState } from "react";
import { GoogleButton } from "@/components/GoogleButton";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import "./style.css";
import Image from "next/image";
// ❗️ Прибрано непотрібний Link
import { SimpleBtn } from "@/components/btns";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ⭐️ ВИПРАВЛЕНО: Правильне оголошення useState ⭐️
  const [passShow, setPassShow] = useState(false);

  // Отримуємо цільовий URL: або з параметрів, або за замовчуванням '/profile'
  const defaultCallbackUrl = searchParams.get("callbackUrl") || "/profile";

  // --- Обробка входу через Credentials (Форма) ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),

      // Дозволяємо NextAuth перенаправити відповідно до логіки в auth.ts
      redirect: true,
      callbackUrl: defaultCallbackUrl,
    });

    // Цей блок виконається, лише якщо redirect: false (для відстеження помилок)
    // Оскільки ми використовуємо redirect: true, тут можна залишити лише обробку помилки
    if (res && res.error) {
      console.error("Помилка входу:", res.error);
      // Тут можна показати сповіщення користувачеві про неправильний логін/пароль
    }
    
  };

  // --- Обробка входу через Google ---
  const handleGoogleSignIn = () => {
    // Викликаємо signIn з провайдером 'google'
    signIn("google", {
      redirect: true,
      callbackUrl: defaultCallbackUrl,
    });
  };

  return (
    <div className="signin">
      <div className="signin-top">
        <Image src="/imgs/lynxai-logo.png" width="50" height={50} alt="logo" />
        <h1 className="signin-title">LynxAI</h1>
      </div>

      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="signin-item">
          <label htmlFor="email">Логін</label>
          <div className="input-box">
            <input
              className="signin-inpt"
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
            />
          </div>
        </div>
        <div className="signin-item">
          <label htmlFor="password">Пароль</label>
          <div className="input-box">
            <input
              className="signin-inpt"
              type={passShow ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="current-password"
              required
            />
            {/* ⭐️ ВИПРАВЛЕНО: Використовуємо setPassShow та e.preventDefault() ⭐️ */}
            <a
              className="inpt-shov-btn"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Запобігаємо переходу
                setPassShow(!passShow); // Правильний сеттер
              }}
            >
              {passShow ? "Сховати" : "Показати"}
            </a>
          </div>
        </div>

        <SimpleBtn className="signin-btn" type="submit" data-color="main">
          Увійти
        </SimpleBtn>

        {/* ⭐️ Оновлено: Передаємо обробник для Google ⭐️ */}
        {/* Припускаємо, що GoogleButton використовує переданий onClick */}
        <GoogleButton onClick={handleGoogleSignIn} />
      </form>
    </div>
  );
}

export default function Signin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
