"use client";
import { useEffect, useState } from "react";
import Slider from "../../components/slider";
import "./style.css";
import Image from "next/image";
import Link from "next/link";
import { SimpleBtn } from "@/components/btns";
import db from "@/db.json";

const OurTeam = () => {
  const [colors, setColors] = useState([]);

  const team = db.team;

  useEffect(() => {
    setColors([...team.map(() => Math.floor(Math.random() * 360))]);
  }, []);

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
      <Link href={"/portfolio/" + item.name}>
        <SimpleBtn className="card-btn" data-color="main">
          Портфоліо
        </SimpleBtn>
      </Link>
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

      <Slider items={team} renderItem={CardStructure} navigation={true} />
    </section>
  );
};

export default OurTeam;
