import React, { Component } from "react";
import Phaser from "phaser";
import { createLeftUI, createRightUI } from "../UI/createUI";
import { gameConfig } from "./gameConfig";
import Game from "./Game";
import { updatePath } from "../phaser-grid/createPath";


class PhaserComponent extends Component {
  componentDidMount() {
    const game = new Phaser.Game(gameConfig);

    function preload() {
      // Load your assets here
      this.load.image('emptyTile', 'assets/emptyTile.jpg');
      this.load.image('UI', '/assets/UI.png');

      this.load.image('base', 'assets/Base1.png');
      this.load.image('wall', 'assets/Wall.png');
      this.load.image('grass', 'assets/Grass.jpg');
      this.load.image('portal1', 'assets/Portal1.png');
      this.load.image('portal2', 'assets/Portal2.png');
      this.load.image('towerHeavy', 'assets/TowerHeavy.png');
      this.load.image('towerLight', 'assets/TowerLight.png');
      this.load.image('towerSiege', 'assets/TowerSiege.png');
    }

    function create() {
      // Create the game instance
      this.gameInstance = new Game(this);

  
      // Create left and right UI
      createLeftUI(this);
      createRightUI(this);

      // Initialize pathUpdateTimer
      this.pathUpdateTimer = 0;

      // Initialize Shift key
      this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

    function update(time, delta) {
      if(this.gameInstance) {
        this.pathUpdateTimer += delta;
        if(this.pathUpdateTimer > 1000) {
          updatePath(this.gameInstance.grid, this);
          this.pathUpdateTimer = 0;
        }
      }
    }
    
    const mainScene = new Phaser.Scene("main");
    mainScene.preload = preload;
    mainScene.create = create;
    mainScene.update = update;
    game.scene.add("main", mainScene, true);

    this.game = game;
  }

  componentWillUnmount() {
    this.game.destroy(true);
  }

  render() {
    return <div id="phaser-example" />;
  }
}

export default PhaserComponent;