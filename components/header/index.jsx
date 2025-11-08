"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SimpleBtn } from "../btns";
import "./style.css";

export default function Header() {
  const session = useSession();
  const pathname = usePathname();
  console.log(pathname);

  return (
    <header className="header">
      <Link href={pathname === "/" ? "#" : "/"} className="header-logo">
        <Image
          className="header-logo-img"
          src="/imgs/lynxai-logo.png"
          width={100}
          height={100}
          alt="logo"
        />
        <span className="header-logo-text">LynxAI</span>
      </Link>

      <nav className="header-nav">
        <Link className="header-link" href="#">
          Про нас
        </Link>
        <Link className="header-link" href="#">
          Команда
        </Link>
        <Link className="header-link" href="#">
          Послуги
        </Link>
      </nav>

      {session.data ? (
        <SimpleBtn
          clas="header-btn"
          data-color="main"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Вихід
        </SimpleBtn>
      ) : (
        <SimpleBtn
          className="header-btn"
          data-color="main"
          onClick={() => signIn()}
        >
          Вхід
        </SimpleBtn>
      )}
    </header>
  );
}
