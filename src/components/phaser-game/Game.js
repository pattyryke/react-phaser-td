import Tile from "../phaser-grid/Tile";
import { createBase } from "./Buildings/Base";
import { createPortal } from "./Buildings/Portal";
import { updatePath } from "../phaser-grid/createPath";
import { gameArea, tileSize } from "./gameConstants";

const createGameGrid = (scene, base, portal) => {
  const tilesHorizontally = gameArea.width;
  const tilesVertically = gameArea.height;
  const grid = [];

  for (let y = 0; y < tilesVertically; y++) {
    const row = [];

    for (let x = 0; x < tilesHorizontally; x++) {
      const posX = (gameArea.startX + x) * tileSize.width + tileSize.width / 2;
      const posY = y * tileSize.height + tileSize.height / 2;
      const tile = new Tile(scene, x, y, posX, posY, "emptyTile", tileSize.width, tileSize.height);
      row.push(tile);
    }

    grid.push(row);
  }

  // Set the base and portal tiles
  const baseX = Math.floor(gameArea.width / 2) - gameArea.startX;
  const baseY = gameArea.height - 2;
  grid[baseY][baseX] = base;

  const portalY = 0;
  grid[portalY][baseX] = portal;

  return grid;
};


class Game {
  constructor(scene) {
    this.scene = scene;

    // Create base and portal
    this.base = createBase(this.scene);
    this.portal = createPortal(this.scene);

    this.grid = createGameGrid(this.scene, this.base, this.portal);

    updatePath(this.grid, this.scene);
  }
}


export default Game;
