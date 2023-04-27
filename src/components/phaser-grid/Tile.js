import { gameArea, tileSize } from "../phaser-game/gameConstants";

class Tile {
  constructor(scene, gridX, gridY, key, content) {
    this.scene = scene;
    this.gridX = gridX;
    this.gridY = gridY;
    this.width = tileSize.width;
    this.height = tileSize.height;
    this.content = content || null;

    // Calculate x and y based on gridX, gridY, and game area offsets
    this.x = (gridX + gameArea.startX) * tileSize.width;
    this.y = gridY * tileSize.height;

    this.sprite = this.scene.add.sprite(this.x + this.width / 2, this.y + this.height / 2, key);
    this.sprite.setDisplaySize(this.width, this.height);

    this.sprite.setInteractive();
    this.sprite.on("pointerdown", () => {
      // Get the selected building creation function from the scene's data
      const createSelectedBuilding = this.scene.data.get("selectedBuilding");
      console.log(`This tiles coordinates: ${this.gridX}, ${this.gridY}`);
      if (createSelectedBuilding) {
        console.log(`Creating building at gridX: ${this.gridX}, gridY: ${this.gridY}`);
        const building = createSelectedBuilding(this.scene, this.gridX, this.gridY);
        
        // Update the content of the Tile with the created building
        this.content = building;
        
        // Check if the Shift key is not being held down
        if (!this.scene.shiftKey.isDown) {
          // Remove the selected building function to avoid placing multiple buildings
          this.scene.data.set("selectedBuilding", null);
        }
      }
    });    
  }

  isOccupied() {
    return this.content !== null;
  }
}

export default Tile;
