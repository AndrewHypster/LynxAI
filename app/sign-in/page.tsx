import { GoogleButton } from "@/components/GoogleButton";
import { SignInForm } from "../sign-in-form/page";

export default async function Signin() {
  return (
    <div>
      <h1>Sign In</h1>
      <GoogleButton />
      <SignInForm />
    </div>
  );
}
