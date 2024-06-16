import { eventEmitter } from "./EventEmitter.js";

const gridWidth = 15; // Assuming this is defined somewhere for grid calculations

export default class Invaders {
  constructor(squares, shooterIndex) {
    this.alienInvaders = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39,
    ];
    this.invadersRemoved = [];
    this.gameGridDivs = squares; // Storing squares as a property for use in methods
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
    const square = this.gameGridDivs[this.alienInvaders[i]];
    square.classList.add("invader");

    // Check if the image is already appended
    if (!square.querySelector("img")) {
      const img = document.createElement("img");
      // src/games/space-invaders//images/SpaceInvadersGreen.png
      //games/space-invaders/space-invaders.js
      img.src = "/images/SpaceInvadersGreen.png";
      img.alt = "InvaderImg"; // Adding alt text for accessibility
      img.id = "invaderImg";
      img.style.width = "100%"; // Ensures the image fits the square
      img.style.height = "100%"; // Ensures the image fits the square
      square.appendChild(img);
    }
  }

  removeInvaders() {
    for (let i = 0; i < this.alienInvaders.length; i++) {
      this.gameGridDivs[this.alienInvaders[i]].classList.remove("invader");
      const img =
        this.gameGridDivs[this.alienInvaders[i]].querySelector("#invaderImg");
      if (img) {
        img.remove(); // This removes the img element from the DOM
      }
    }
  }

  moveInvaders() {
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
      clearInterval(this.invadersId); // Clear interval on game over
    }
    if (this.invadersRemoved.length === this.alienInvaders.length) {
      // Handle win condition logic
      clearInterval(this.invadersId); // Clear interval on win
    }
  }
}
