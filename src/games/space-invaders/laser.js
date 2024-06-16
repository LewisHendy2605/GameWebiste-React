import { eventEmitter } from "./EventEmitter.js";

const grid_width = 15;

export default class Laser {
  constructor(squares, shooterIndex, invaders) {
    this.game_grid_divs = squares;
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
      this.game_grid_divs[currentLaserIndex].classList.remove("laser");
      // Move laser up
      currentLaserIndex -= grid_width;
      this.game_grid_divs[currentLaserIndex].classList.add("laser");

      if (
        this.game_grid_divs[currentLaserIndex].classList.contains("invader")
      ) {
        this.game_grid_divs[currentLaserIndex].classList.remove("laser");
        this.game_grid_divs[currentLaserIndex].classList.remove("invader");
        this.game_grid_divs[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => this.game_grid_divs[currentLaserIndex].classList.remove("boom"),
          300
        );
        clearInterval(laserId);

        // HERE CHATGPT, ITS HERE
        this.invaders.removeInvaderByIndex(currentLaserIndex);
      }
    };

    if (e.key === "ArrowUp" || e.type === "click") {
      laserId = setInterval(moveLaser, 100);
    }
  }
}
