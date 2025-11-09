"use client";
import { Suspense } from "react";
import { GoogleButton } from "@/components/GoogleButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./style.css";

function SignInContent() {
  const router = useRouter();
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
      <h1 className="signin-title">Sign In</h1>
      <GoogleButton />
      <form className="signin-form" onSubmit={handleSubmit}>
        <input className="signin-inpt" type="email" name="email" required />
        <input
          className="signin-inpt"
          type="password"
          name="password"
          required
        />
        <button className="signin-btn" type="submit">
          Ввійти
        </button>
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
