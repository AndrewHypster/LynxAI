"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SimpleBtn } from "../btns";
import "./style.css";
import { useOverlay } from "../overlay";
import { useEffect, useState } from "react";

export default function Header() {
  const session = useSession();
  const pathname = usePathname();
  const { showOverlay, hideOverlay } = useOverlay();
  const [side, useSide] = useState(false);

  useEffect(() =>
  console.log(session, 'session1'), [session]
  )
  return (
    <>
      <div className="header-wrapper">
        <header className="header">
          <Link
            href={pathname === "/" ? "#html" : "/"}
            className="header-logo link-grad"
          >
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
            <Link className="header-link link-grad" href="/about-us">
              Про нас
            </Link>
            <Link className="header-link link-grad" href="/our-team">
              Команда
            </Link>
            <Link className="header-link link-grad" href="/services">
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

        <div className="wave-container">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              fill="url(#gradient)"
              fillOpacity="1"
              d="M0,50 L1440,50 L1440,0 L0,0 Z"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--blue-accent)">
                  <animate
                    attributeName="stop-color"
                    values="var(--blue-accent); var(--green-main); var(--blue-accent)"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="var(--violet-accent)">
                  <animate
                    attributeName="stop-color"
                    values="var(--violet-accent); var(--violet-main); var(--violet-accent)"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="var(--yellow-main)">
                  <animate
                    attributeName="stop-color"
                    values="var(--yellow-main); var(--orange-main); var(--yellow-main)"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <aside className={`sidebar ${side ? "open bottom-grad" : "close"}`}>
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
          <Link
            href="/about-us"
            className="sidebar-link link-grad"
            onClick={() => {
              hideOverlay();
              useSide(false);
            }}
          >
            Про нас
          </Link>
          <Link
            href="/our-team"
            className="sidebar-link link-grad"
            onClick={() => {
              hideOverlay();
              useSide(false);
            }}
          >
            Команда
          </Link>
          <Link
            href="/services"
            className="sidebar-link link-grad"
            onClick={() => {
              hideOverlay();
              useSide(false);
            }}
          >
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
