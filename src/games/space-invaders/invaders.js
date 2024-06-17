import { eventEmitter } from "./EventEmitter.js";
import SpaceInvadersGreen from "./images/SpaceInvadersGreen.png";

const gridWidth = 15;
const resultDisplay = document.getElementsByClassName("results")[0];

export default class Invaders {
  constructor(squares, shooterIndex, updateGameDivs, setShooterIndexState) {
    this.alienInvaders = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39,
    ];
    this.invadersRemoved = [];
    this.gameGridDivs = squares;
    this.setShooterIndexState = setShooterIndexState;
    this.updateGameDivs = updateGameDivs;
    this.isGoingRight = true;
    this.direction = 1;
    this.currentShooterIndex = shooterIndex;
    this.invadersId = null; // Initialize invadersId property

    this.createInvaders();
  }

  createInvaders() {
    eventEmitter.on("changeShooterIndex", this.setShooterIndex.bind(this));
    eventEmitter.on("invaderShot", this.updateRemovedInvaders.bind(this));
    this.draw();
    this.invadersId = setInterval(this.moveInvaders.bind(this), 600); // Assigning interval ID to invadersId
  }

  setShooterIndex(shooterIndex) {
    this.currentShooterIndex = shooterIndex;
  }

  updateRemovedInvaders(newRemovedInvaders) {
    this.invadersRemoved = newRemovedInvaders;
  }

  removeInvaderByIndex(currentLaserIndex) {
    const alienRemoved = this.alienInvaders.indexOf(currentLaserIndex);
    this.invadersRemoved.push(alienRemoved);
  }

  draw() {
    for (let i = 0; i < this.alienInvaders.length; i++) {
      if (!this.invadersRemoved.includes(i)) {
        this.addInvaders(i);
      }
    }
  }

  addInvaders(i) {
    const invaderIndex = this.alienInvaders[i];
    this.updateGameDivs(invaderIndex, "add", "invader", SpaceInvadersGreen);
  }

  removeInvaders() {
    for (let i = 0; i < this.alienInvaders.length; i++) {
      const invaderIndex = this.alienInvaders[i];
      this.updateGameDivs(invaderIndex, "remove", "invader");
    }
  }

  moveInvaders() {
    //console.log("Shhoter index from invaders class" + this.currentShooterIndex);
    const leftEdge = this.alienInvaders[0] % gridWidth === 0;
    const rightEdge =
      this.alienInvaders[this.alienInvaders.length - 1] % gridWidth ===
      gridWidth - 1;

    this.removeInvaders();

    if (rightEdge && this.isGoingRight) {
      for (let i = 0; i < this.alienInvaders.length; i++) {
        this.alienInvaders[i] += gridWidth + 1;
        this.direction = -1;
        this.isGoingRight = false;
      }
    }

    if (leftEdge && !this.isGoingRight) {
      for (let i = 0; i < this.alienInvaders.length; i++) {
        this.alienInvaders[i] += gridWidth - 1;
        this.direction = 1;
        this.isGoingRight = true;
      }
    }

    for (let i = 0; i < this.alienInvaders.length; i++) {
      this.alienInvaders[i] += this.direction;
    }

    this.draw();

    if (
      this.gameGridDivs[this.currentShooterIndex].classList.contains("invader")
    ) {
      // Handle game over logic
      //resultDisplay.innerHTML = "GAME OVER";  // have to do with state
      clearInterval(this.invadersId);
    }
    if (this.invadersRemoved.length === this.alienInvaders.length) {
      // Handle win condition logic
      //.innerHTML = "YOU WIN";
      clearInterval(this.invadersId);
    }
  }
}
