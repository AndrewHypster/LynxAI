'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

const GoogleButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || '/profile'

  return (
    <button
      className="googleBtn"
      onClick={() => signIn("google", { callbackUrl })}
    >
      <Image src="/imgs/icons/google.svg" width="50" height="50" alt="google" />
      <p className="googleBtn-txt">Sign in with Google</p>
    </button>
  );
}

export {GoogleButton}