"use client";
import { Suspense, useState } from "react";
import { GoogleButton } from "@/components/GoogleButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./style.css";
import Image from "next/image";
import Link from "next/link";
import { SimpleBtn } from "@/components/btns";

function SignInContent() {
  const router = useRouter();
  const [passShow, usePassShow] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res && !res.error) {
      router.push("./profile");
    } else {
      console.log(res);
    }
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
              type={passShow?'text': "password"}
              name="password"
              id="password"
              autoComplete="current-password"
              required
            />
            <Link className="inpt-shov-btn" href='' onClick={()=>usePassShow(!passShow)}>{passShow?'Сховати':'Показати'}</Link>
          </div>
        </div>

        <SimpleBtn className="signin-btn" type="submit" data-color='main'>
          Увійти
        </SimpleBtn>
        <GoogleButton />
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
