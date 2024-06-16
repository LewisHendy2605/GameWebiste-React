import React, { useEffect, useRef } from "react";
import Asteroid from "./asteroid.js";
import Invaders from "./invaders.js";
import Ship from "./ship.js";
import Laser from "./laser.js";
import { eventEmitter } from "./EventEmitter.js";
import "./space-invader-styles.css";
import "./images/SpaceInvadersGreen.png";

export default function SpaceInvaders() {
  const gameElemRef = useRef(null);

  useEffect(() => {
    const gameElem = gameElemRef.current;
    const grid = gameElem.querySelector(".grid");
    const width = 15;
    let currentShooterIndex = 202;
    let invadersId; // Initialize invadersId variable

    createGameGrid(grid, width);

    // Create Game Objects
    const squares = Array.from(grid.querySelectorAll("div"));
    //const asteroid = new Asteroid(squares, currentShooterIndex);
    const invaders = new Invaders(squares, currentShooterIndex); // Create Invaders instance
    const ship = new Ship(squares);
    const laser = new Laser(squares, currentShooterIndex, invaders);

    // Ensure consistent shooter placement
    eventEmitter.on("changeShooterIndex", setShooterIndex);

    // Functions
    function setShooterIndex(shooterIndex) {
      currentShooterIndex = shooterIndex;
    }

    function createGameGrid(grid, width) {
      for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        square.id = i;
        grid.appendChild(square);
      }
    }

    // Clean up function
    return () => {
      // Clear any intervals or event listeners if necessary
      clearInterval(invadersId); // Clear the interval when component unmounts
    };
  }, []);

  return (
    <div className="game-div" ref={gameElemRef}>
      <h1 className="results">0</h1>
      <div className="grid"></div>
      <div className="controls">
        <button id="shootBtn">Shoot</button>
        <div className="move-controls">
          <button id="leftBtn">Left</button>
          <button id="rightBtn">Right</button>
        </div>
      </div>
    </div>
  );
}
