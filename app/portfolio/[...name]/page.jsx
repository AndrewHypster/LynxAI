"use client";
import { useParams } from "next/navigation";

export default function Portfolio() {
  const params = useParams();
  const rawName = params.name?.[0] || "";
  const name = decodeURIComponent(rawName);

  return <h1>Портфоліо: {name}</h1>;
}
