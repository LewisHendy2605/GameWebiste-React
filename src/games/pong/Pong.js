import Ball from "./ball.js";
import Paddle from "./paddle.js";
import PongModeControls from "./PongModeControls.js";
import React, { Component } from "react";
import "./Pong.css";

export default class Pong extends Component {
  constructor() {
    super();
    this.state = {
      gameDiv: null,
      windowHeight: 0,
      windowWidth: 0,
      ball: null,
      playerPaddle: null,
      computerPaddle: null,
    };

    this.update = this.update.bind(this);

    // Listeners
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  componentDidMount() {
    this.gameDiv = document.getElementById("gameDivPong");
    this.windowHeight = this.gameDiv.clientHeight;
    this.windowWidth = this.gameDiv.clientWidth;

    this.ball = new Ball(
      document.getElementById("ball"),
      this.gameDiv,
      this.windowHeight
    );
    this.playerPaddle = new Paddle(
      document.getElementById("player-paddle"),
      this.gameDiv,
      this.windowHeight
    );
    this.computerPaddle = new Paddle(
      document.getElementById("computer-paddle"),
      this.gameDiv,
      this.windowHeight
    );
    this.mode_controls = new PongModeControls();
    this.mode_controls.startControls();

    this.playerScoreElem = document.getElementById("player-score");
    this.computerScoreElem = document.getElementById("computer-score");

    this.bodyRect = this.gameDiv.getBoundingClientRect();

    this.BODY_HEIGHT = this.bodyRect.height;
    this.BODY_WIDTH = this.bodyRect.width;

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("touchmove", this.handleTouchMove);

    window.requestAnimationFrame(this.update);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("touchmove", this.handleTouchMove);
  }

  handleMouseMove(e) {
    this.playerPaddle?.move(e);
  }

  handleTouchMove(e) {
    const touch = e.touches[0];
    const rect = this.gameDiv.getBoundingClientRect();
    const touchY = touch.clientY - rect.top; // Touch Y position relative to gameDiv top
    this.playerPaddle.position = (touchY / this.windowHeight) * 100;
  }

  update(time) {
    if (this.lastTime != null) {
      const delta = time - this.lastTime;

      if (this.ball && this.playerPaddle && this.computerPaddle) {
        this.ball.update(delta, [
          this.playerPaddle.rect(),
          this.computerPaddle.rect(),
        ]);
        this.computerPaddle.updateComputerPaddle(delta, this.ball.y);
        this.updateBackgroundColor(delta);

        if (this.isLose()) this.handleLose();
      }
    }

    this.lastTime = time;
    window.requestAnimationFrame(this.update);
  }

  isLose() {
    const center = this.ball.center;
    return center.x >= this.windowWidth || center.x <= 0;
  }

  handleLose() {
    const center = this.ball.center; // Get the center of the ball
    if (center.x >= this.windowWidth) {
      this.playerScoreElem.textContent =
        parseInt(this.playerScoreElem.textContent) + 1;
    } else if (center.x <= 0) {
      this.computerScoreElem.textContent =
        parseInt(this.computerScoreElem.textContent) + 1;
    }
    this.ball.reset();
    this.computerPaddle.reset();
  }

  updateBackgroundColor(delta) {
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
  }

  render() {
    return (
      <>
        <div className="game-container" id="gameContainer">
          <h2 className="game-name">Pong</h2>
          <div className="game-div-pong" id="gameDivPong">
            <div className="score">
              <div id="player-score">0</div>
              <div id="computer-score">0</div>
            </div>
            <div className="ball" id="ball"></div>
            <div className="paddle left" id="player-paddle"></div>
            <div className="paddle right" id="computer-paddle"></div>
          </div>
          <div className="game-mode-controls" id="game-mode-controls">
            <button
              className="game-mode-button colour-switch-mode"
              id="ColorModeSwitchBtn"
            >
              Color Switch Mode
              <span className="mode-on-off" id="ColorModeStatus">
                Off
              </span>
            </button>
            <button
              className="game-mode-button random-speed-mode"
              id="RandomSpeedModeBtn"
            >
              Random Speed Mode
              <span className="mode-on-off" id="RandSpeedModeStatus">
                Off
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }
}
