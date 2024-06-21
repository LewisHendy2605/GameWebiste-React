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
        const firstConversation = responseJSON[0];
        const conversationText = firstConversation
          .map((quoteObj) => `${quoteObj.character}: ${quoteObj.quote}`)
          .join(" ");

        console.log("Response:", conversationText[0]);
        //setQuote(conversationText);
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
      <p>{quote}</p>
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
}
