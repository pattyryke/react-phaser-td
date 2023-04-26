import Phaser from "phaser";

class Building extends Phaser.GameObjects.GameObject {
  constructor(scene, gridX, gridY, posX, posY, texture, width, height) {
    super(scene, "Building");

    this.gridX = gridX;
    this.gridY = gridY;
    this.posX = posX;
    this.posY = posY;

    this.sprite = scene.add.sprite(posX, posY, texture);
    this.sprite.setDisplaySize(width, height);
    this.sprite.setDepth(1);

    this.setInteractive();
  }

  setInteractive() {
    this.sprite.setInteractive({ useHandCursor: true });
  }

  isOccupied() {
    return true;
  }
}

export default Building;
