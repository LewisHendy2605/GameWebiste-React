import React from "react";
import "./ApiPage.css";
import QuoteGenerator from "./QuoteGenerator";
import LocationComponenet from "./Location.js";

export default function ApiPage() {
  return (
    <div className="api-page">
      <QuoteGenerator />
      <LocationComponenet />
    </div>
  );
}
