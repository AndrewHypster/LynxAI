'use client'
import { GoogleButton } from "@/components/GoogleButton";
import { SignInForm } from "../../components/sign-in-form";

export default async function Signin() {
  return (
    <div>
      <h1>Sign In</h1>
      <GoogleButton />
      <SignInForm />
    </div>
  );
}
