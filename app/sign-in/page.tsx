"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GoogleButton } from "@/components/GoogleButton";
import { SignInForm } from "@/components/sign-in-form";

function SignInContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref"); // наприклад ?ref=telegram

  return (
    <div>
      <h1>Sign In</h1>
      {ref && <p>Redirect from: {ref}</p>}
      <GoogleButton />
      <SignInForm />
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
