
class Tile {
  constructor(scene, gridX, gridY, x, y, key, width, height) {
    this.scene = scene;
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = this.scene.add.sprite(x, y, key);
    this.sprite.setDisplaySize(width, height);

    this.sprite.setInteractive();
    this.sprite.on("pointerdown", () => {
      // Get the selected building creation function from the scene's data
      const createSelectedBuilding = this.scene.data.get("selectedBuilding");
      console.log(`This tiles coordinates: ${this.gridX}, ${this.gridY}`);
      if (createSelectedBuilding) {
        console.log(`Creating building at gridX: ${this.gridX}, gridY: ${this.gridY}`);
        createSelectedBuilding(this.scene, this.gridX, this.gridY);
        // Remove the selected building function to avoid placing multiple buildings
        this.scene.data.set("selectedBuilding", null);
      }
    });
  }
}

export default Tile;
