import React from "react";
import "./Home.css";
import QuoteGenerator from "./QuoteGenerator";

export default function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <QuoteGenerator />
    </div>
  );
}
