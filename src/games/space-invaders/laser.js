import { eventEmitter } from "./EventEmitter.js";
import React, { useEffect, useRef, useState } from "react";

const grid_width = 15;

export default class Laser {
  constructor(squares, shooterIndex, invaders, updateGameDivs) {
    this.game_grid_divs = squares;
    this.updateGameDivs = updateGameDivs;
    this.currentShooterIndex = shooterIndex;
    this.invaders = invaders;
    eventEmitter.on("changeShooterIndex", this.setShooterIndex.bind(this));

    document.addEventListener("keydown", this.shoot.bind(this));
    document
      .getElementById("shootBtn")
      .addEventListener("click", this.shoot.bind(this));
  }

  setShooterIndex(shooterIndex) {
    this.currentShooterIndex = shooterIndex;
  }

  shoot(e) {
    let laserId;
    let currentLaserIndex = this.currentShooterIndex;

    const moveLaser = () => {
      if (
        currentLaserIndex <= this.game_grid_divs.length &&
        currentLaserIndex > 0
      ) {
        //this.game_grid_divs[currentLaserIndex].classList.remove("laser");
        this.updateGameDivs(currentLaserIndex, "remove", "laser");
        // Move laser up
        currentLaserIndex -= grid_width;

        if (
          currentLaserIndex <= this.game_grid_divs.length &&
          currentLaserIndex > 0
        ) {
          //this.game_grid_divs[currentLaserIndex].classList.add("laser");
          this.updateGameDivs(currentLaserIndex, "add", "laser");

          if (
            this.game_grid_divs[currentLaserIndex].classList.contains("invader")
          ) {
            //this.game_grid_divs[currentLaserIndex].classList.remove("laser");
            //this.game_grid_divs[currentLaserIndex].classList.remove("invader");
            //this.game_grid_divs[currentLaserIndex].classList.add("boom");

            this.updateGameDivs(currentLaserIndex, "remove", "laser");
            this.updateGameDivs(currentLaserIndex, "remove", "invader");
            this.updateGameDivs(currentLaserIndex, "add", "boom");
            setTimeout(
              () => this.updateGameDivs(currentLaserIndex, "remove", "boom"),
              300
            );
            clearInterval(laserId);
            this.invaders.removeInvaderByIndex(currentLaserIndex);
          }
        }
      }
    };

    if (e.key === "ArrowUp" || e.type === "click") {
      laserId = setInterval(moveLaser, 100);
    }
  }
}
