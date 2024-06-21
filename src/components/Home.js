import React from "react";
import "./Home.css";
import QuoteGenerator from "./QuoteGenerator";
import LocationComponenet from "./Location.js";

export default function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <LocationComponenet />
    </div>
  );
}
