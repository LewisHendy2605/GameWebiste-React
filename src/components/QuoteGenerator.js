import React, { useState } from "react";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("null");

  const getQuote = async () => {
    const quoteResponse = await fetch(
      "https://trailerparkboysapi-76279286324b.herokuapp.com/quotes"
    );

    if (quoteResponse.ok) {
      const responseJSON = await quoteResponse.json();
      // Check if response is not empty and is an array of arrays
      if (responseJSON.length > 0 && Array.isArray(responseJSON[0])) {
        // Get the first conversation and join the quotes into a single string
        const randNum = Math.floor(
          Math.random() * (responseJSON.length - 0 + 1) + 0
        );
        const firstConversation = responseJSON[randNum];
        const conversationText = firstConversation
          .map((quoteObj) => `${quoteObj.character}: ${quoteObj.quote}`)
          .join("<br>");

        //console.log("Response:", conversationText);
        setQuote(conversationText);
      } else {
        console.log("No quotes available");
        setQuote("No quotes available");
      }
    } else {
      console.log("Error");
    }
  };

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{ __html: quote }}
        style={{ fontSize: "20px" }}
      ></p>
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
}
