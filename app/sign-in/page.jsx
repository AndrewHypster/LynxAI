"use client";
import { Suspense, useState } from "react";
import { GoogleButton } from "@/components/GoogleButton";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./style.css";
import Image from "next/image";
import { SimpleBtn } from "@/components/btns";

function SignInContent() {
  const router = useRouter();
  const [passShow, setPassShow] = useState(false);
  const defaultCallbackUrl = "/profile";

  // --- Credentials login ---
  const handleSubmit = async () => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // робимо redirect false, щоб спочатку отримати сесію
    });

    if (res?.error) {
      console.error("Помилка входу:", res.error);
      return;
    }

    // Отримуємо сесію після логіну
    const session = await getSession();
    if (session?.user.role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/profile");
    }
  };

  // --- Google login ---
  const handleGoogleSignIn = async () => {
    // Викликаємо Google login з redirect true
    await signIn("google", { redirect: true, callbackUrl: defaultCallbackUrl });
    // Після повернення на сторінку, useEffect або окремий useSession буде робити редірект за роллю
    // Тут ми не можемо отримати res, бо браузер редіректить на Google
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
            <a
              className="inpt-shov-btn"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPassShow(!passShow);
              }}
            >
              {passShow ? "Сховати" : "Показати"}
            </a>
          </div>
        </div>

        <SimpleBtn className="signin-btn" type="submit" data-color="main">
          Увійти
        </SimpleBtn>

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
