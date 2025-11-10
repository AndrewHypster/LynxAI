"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SimpleBtn } from "../btns";
import "./style.css";
import { useOverlay } from "../overlay";
import { useState } from "react";

export default function Header() {
  const session = useSession();
  const pathname = usePathname();
  const { showOverlay, hideOverlay } = useOverlay()
  const [ side, useSide] = useState(false)

  return (
    <>
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
          <Link className="header-link" href="/about-us">
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
            className="header-btn"
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

        <button
          onClick={() => {
            showOverlay();
            useSide(true);
          }}
          className="header-burger"
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
      </header>

      <aside className={`sidebar ${side ? "open" : "close"}`}>
        <button
          onClick={() => {
            hideOverlay();
            useSide(false);
          }}
          className="sidebar-close"
        >
          <div></div>
          <div></div>
        </button>
        <div className="header-logo sidebar-logo">
          <Image
            className="header-logo-img"
            src="/imgs/lynxai-logo.png"
            width={100}
            height={100}
            alt="logo"
          />
          <span className="header-logo-text">LynxAI</span>
        </div>
        <div className="sidebar-links">
          <Link href="/about-us" className="sidebar-link">
            Про нас
          </Link>
          <Link href="#" className="sidebar-link">
            Команда
          </Link>
          <Link href="#" className="sidebar-link">
            Послуги
          </Link>
        </div>
        {session.data ? (
          <SimpleBtn
            className="sidebar-sign"
            data-color="main"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Вихід
          </SimpleBtn>
        ) : (
          <SimpleBtn
            className="sidebar-sign"
            data-color="main"
            onClick={() => signIn()}
          >
            Вхід
          </SimpleBtn>
        )}
      </aside>
    </>
  );
}
