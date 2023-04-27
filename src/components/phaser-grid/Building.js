import Phaser from "phaser";
import BuildingMenu from "../UI/BuildingMenu";

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

    this.sprite.on("pointerdown", () => {
      if (this.menu) {
        this.menu.destroy();
        this.menu = null;
      } else {
        this.menu = new BuildingMenu(this.scene, this.posX, this.posY, this);
        this.menu.setDepth(1000); // Make sure the menu is above other game objects
      }
    });
  }

  isOccupied() {
    return true;
  }
}

export default Building;
