import React, { useEffect, useRef, useState } from "react";
import Asteroid from "./asteroid.js";
import Invaders from "./invaders.js";
import Ship from "./ship.js";
import Laser from "./laser.js";
import { eventEmitter } from "./EventEmitter.js";
import "./space-invader-styles.css";

export default function SpaceInvaders() {
  const gameElemRef = useRef(null);
  let [gameDivs, setGameDivs] = useState([]);
  let currentShooterIndex = 202;
  const [gameObjectsInitialized, setGameObjectsInitialized] = useState(false);
  const [shooterIndexState, setShooterIndexState] = useState(202);

  useEffect(() => {
    const gameElem = gameElemRef.current;
    const grid = gameElem.querySelector(".grid");
    const width = 15;
    let invadersId;

    createGameGrid(grid, width);

    // Create Game Objects
    const squares = Array.from(grid.querySelectorAll("div"));
    setGameDivs(squares);

    // Ensure consistent shooter placement
    eventEmitter.on("changeShooterIndex", setShooterIndex);
    // Clean up function
    return () => {
      // Clear any intervals or event listeners if necessary
      clearInterval(invadersId); // Clear the interval when component unmounts
    };
  }, []);

  useEffect(() => {
    if (!gameObjectsInitialized && gameDivs.length > 0) {
      //const asteroid = new Asteroid(squares, currentShooterIndex);
      //const currentShooterIndex = 202; // You may need to keep this consistent with your game state
      let invaders = new Invaders(
        gameDivs,
        shooterIndexState,
        updateGameDivs,
        setShooterIndexState
      );
      let ship = new Ship(
        shooterIndexState,
        gameDivs,
        updateGameDivs,
        setShooterIndexState
      );
      const laser = new Laser(
        gameDivs,
        currentShooterIndex,
        invaders,
        updateGameDivs
      );
      setGameObjectsInitialized(true);
    }
  }, [gameDivs, gameObjectsInitialized]);

  const updateGameDivs = (index, action, className, imgSrc = null) => {
    setGameDivs((prevGameDivs) => {
      const newGameDivs = [...prevGameDivs];
      const square = newGameDivs[index];

      if (action === "add") {
        square.classList.add(className);
        if (imgSrc && !square.querySelector("img")) {
          const img = document.createElement("img");
          img.src = imgSrc;
          img.id = className + "Img";
          img.style.width = "100%";
          img.style.height = "100%";
          square.appendChild(img);
        }
      } else if (action === "remove") {
        square.classList.remove(className);
        const img = square.querySelector("#" + className + "Img");
        if (img) {
          img.remove();
        }
      }

      return newGameDivs;
    });
  };

  // Functions
  const setShooterIndex = (shooterIndex) => {
    currentShooterIndex = shooterIndex;
  };

  const createGameGrid = (grid, width) => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.id = i;
      grid.appendChild(square);
    }
  };

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
