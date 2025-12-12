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
  const defaultCallbackUrl = "/profile";

  // --- Обробка входу через Credentials (Форма) ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: defaultCallbackUrl,
    });

    if (res?.error) {
      console.error("Помилка входу:", res.error);
      return;
    }

    if (res?.ok) {
      const sessionRes = await getSession(); // отримуємо сесію після логіну
      if (sessionRes?.user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
    }
  };

  // --- Обробка входу через Google ---
  const handleGoogleSignIn = async () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated") {
        router.push(session.user.role === "admin" ? "/dashboard" : "/profile");
      }
    }, [status, session, router]);

    return null;
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
