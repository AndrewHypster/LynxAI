"use client";

import "./style.css";
import { useParams } from "next/navigation";
import Chat from "../../../components/chat-ai";
import SearchAI from "../../../components/search-ai";
import AIContent from "../../../components/content-ai";

const SomeService = () => {
  const params = useParams();

  return (
    <div className="service">
      {params.service == "chat-ai" ? (
        <div className="service-chat">
          <Chat />
        </div>
      ) : params.service == "search-ai" ? (
        <div className="service-search">
          <h1 className="service-title">Магазин електроніки</h1>
          <SearchAI />
        </div>
      ) : params.service == "content-ai" ? (
        <AIContent />
      ) : (
        ""
      )}
    </div>
  );
};

export default SomeService;
