import { eventEmitter } from "./EventEmitter.js";
import Shipimg from "./images/Ship.png";

let currentShooterIndex = 202;
const grid_width = 15;

export default class Ship {
  constructor(
    shooterIndexState,
    squares,
    updateGameDivs,
    setShooterIndexState
  ) {
    this.game_grid_divs = squares;
    this.updateGameDivs = updateGameDivs;
    this.setShooterIndexState = setShooterIndexState;
    this.currentShooterIndex = shooterIndexState; // Initialize currentShooterIndex

    this.addShooter = this.addShooter.bind(this); // Bind methods
    this.moveShooterLeft = this.moveShooterLeft.bind(this);
    this.moveShooterRight = this.moveShooterRight.bind(this);
    this.setShooterIndex = this.setShooterIndex.bind(this);

    this.addShooter();
    document.addEventListener("keydown", this.moveShooter.bind(this));
    document
      .getElementById("leftBtn")
      .addEventListener("click", this.moveShooterLeft);
    document
      .getElementById("rightBtn")
      .addEventListener("click", this.moveShooterRight);
    eventEmitter.on("changeShooterIndex", this.setShooterIndex);
  }

  setShooterIndex(shooterIndex) {
    //this.currentShooterIndex = shooterIndex;
    this.setShooterIndexState(shooterIndex);
  }

  addShooter() {
    this.updateGameDivs(this.currentShooterIndex, "add", "shooter", Shipimg);
  }

  moveShooter(e) {
    this.removeShooter();
    switch (e.key) {
      case "ArrowLeft":
        if (this.currentShooterIndex % grid_width !== 0)
          this.currentShooterIndex -= 1;
        this.setShooterIndexState(this.currentShooterIndex);
        break;
      case "ArrowRight":
        if (this.currentShooterIndex % grid_width < grid_width - 1)
          this.currentShooterIndex += 1;
        this.setShooterIndexState(this.currentShooterIndex);
        break;
    }
    this.addShooter();
    eventEmitter.emit("changeShooterIndex", this.currentShooterIndex);
  }

  removeShooter() {
    this.updateGameDivs(this.currentShooterIndex, "remove", "shooter");
  }

  moveShooterLeft() {
    this.removeShooter();
    if (this.currentShooterIndex % grid_width !== 0) {
      this.currentShooterIndex -= 1;
      this.setShooterIndexState(this.currentShooterIndex);
    }
    this.addShooter();
    eventEmitter.emit("changeShooterIndex", this.currentShooterIndex);
  }

  moveShooterRight() {
    this.removeShooter();

    if (this.currentShooterIndex % grid_width < grid_width - 1) {
      this.currentShooterIndex += 1;
      this.setShooterIndexState(this.currentShooterIndex);
    }
    this.addShooter();
    eventEmitter.emit("changeShooterIndex", this.currentShooterIndex);
  }
}
