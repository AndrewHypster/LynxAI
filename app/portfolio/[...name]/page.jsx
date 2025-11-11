"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import db from "@/db.json";
import Image from "next/image";
import Slider from "../../../components/slider";
import Link from "next/link";
import { SimpleBtn } from "@/components/btns";
import "./style.css";

export default function Portfolio() {
  const params = useParams();
  const rawName = params.name?.[0] || "";
  const name = decodeURIComponent(rawName);

  const [exist, setExist] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(Math.floor(Math.random() * 360));
    }
    setColors(arr);
    console.log(arr);
  }, []);

  useEffect(() => {
    async function fetchPortfolio() {
      const portfolio = await db.team.find((human) => name === human.name);

      if (portfolio) {
        setPortfolio(portfolio);
        setExist(true);
      } else setExist(false);
    }

    fetchPortfolio();
  }, [name]);

  const ProgectStructure = ({ item, cardRef }) => (
    <div className="card" ref={cardRef}>
      <Image
        className="card-img"
        src={item.imgs[0]}
        width={100}
        height={100}
        alt={item.name + " img"}
      />
      <div className="card-text">
        <h3 className="card-name">{item.name}</h3>
        <p className="card-desc">{item.desc}</p>
        <ul className="card-technology">
          {item.technology.map((tec, i) => (
            <li
              className="card-tec"
              style={{
                background: `hsl(${colors[i]}, 50%, 40%)`,
              }}
              key={i}
            >
              {tec}
            </li>
          ))}
        </ul>
      </div>
      <Link href={item.link}>
        <SimpleBtn className="card-btn" data-color="main">
          Дивитися
        </SimpleBtn>
      </Link>
    </div>
  );

  return exist === null ? (
    <h1>Загрузка</h1>
  ) : exist === false ? (
    <h1>404</h1>
  ) : (
    <section className="portfolio">
      <div className="portfolio-info">
        <Image
          className="portfolio-img"
          src={portfolio.img}
          width={100}
          height={100}
          alt={portfolio.name + " img"}
        />
        <div>
          <h1 className="portfolio-name">{portfolio.name}</h1>
          <span className="portfolio-direction">{portfolio.direction}</span>

          <h3 className="portfolio-skills-title">Навички:</h3>
          <ul className="portfolio-skills">
            {portfolio.skills.map((skill, i) => (
              <li
                className="portfolio-skill"
                style={{
                  background: `hsl(${colors[i]}, 50%, 40%)`,
                }}
                key={i}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <p className="portfolio-desc">
          <h3 className="portfolio-desc-title">Про мене</h3>
          {portfolio.description}
        </p>
      </div>

      <div className="portfolio-progects">
        <h2 className="portfolio-progects-title">Проекти</h2>
        <Slider
          items={portfolio.progects}
          renderItem={ProgectStructure}
          direction="vertical"
          autoplay={{
            delay: 5000, // 30 секунд
            disableOnInteraction: false, // не зупиняти при взаємодії
          }}
        />
      </div>
    </section>
  );
}
