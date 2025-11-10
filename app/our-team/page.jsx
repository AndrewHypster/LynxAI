"use client";
import { useEffect, useState } from "react";
import Slider from "../../components/slider";
import "./style.css";
import Image from "next/image";

const OurTeam = () => {
  const [colors, setColors] = useState([]);

  const sliderItems = [
    {
      img: "/imgs/team/Patric.png",
      name: "Patrik Star",
      direction: "Створення AI ботів",
      skills: ["OpenAI", "Python", "React", "Figma"],
    },
    {
      img: "/imgs/team/Patric.png",
      name: "Robert Mont",
      direction: "Підключення AI до баз даних",
      skills: ["OpenAI", "PhP", "GitHub", "Mongo DB"],
    },
    {
      img: "/imgs/team/Patric.png",
      name: "Sendi Rosin",
      direction: "Веб розробка",
      skills: ["Next.js", "Redux-Toolkit", "API", "Figma"],
    },
    {
      img: "/imgs/team/Patric.png",
      name: "Patrik Star",
      direction: "Створення AI ботів",
      skills: ["OpenAI", "Python", "React", "Figma"],
    },
    {
      img: "/imgs/team/Patric.png",
      name: "Robert Mont",
      direction: "Підключення AI до баз даних",
      skills: ["OpenAI", "PhP", "GitHub", "Mongo DB"],
    },
    {
      img: "/imgs/team/Patric.png",
      name: "Sendi Rosin",
      direction: "Веб розробка",
      skills: ["Next.js", "Redux-Toolkit", "API", "Figma"],
    },
  ];

  useEffect(() => {
    setColors([...sliderItems.map(() => Math.floor(Math.random() * 360))]);
  }, []);

  // 🔹 Компонент, який описує структуру однієї картки
  const CardStructure = ({ item, cardRef }) => (
    <div className="card" ref={cardRef}>
      <Image
        className="card-img"
        src={item.img}
        width={100}
        height={100}
        alt={item.name + " img"}
      />
      <div className="card-text">
        <h3 className="card-name">{item.name}</h3>
        <p className="card-direction">{item.direction}</p>
        <ul className="card-skills">
          {item.skills.map((skill, i) => (
            <li
              className="card-skill"
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
    </div>
  );

  return (
    <section className="team">
      <div className="team-top">
        <h1 className="team-title">Наша команда</h1>
        <p className="team-desc">
          Познайомтеся з нашою професійною командою, яка складається з
          <br />
          досвідчених фахівців у галузі IT та штучного інтелекту.
        </p>
      </div>

      {/* 🔹 Передаємо items і структуру */}
      <Slider items={sliderItems} renderItem={CardStructure} />
    </section>
  );
};

export default OurTeam;
