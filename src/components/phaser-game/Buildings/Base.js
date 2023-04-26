import Building from "../../phaser-grid/Building";
import { gameArea, tileSize } from "../gameConstants";

export const createBase = (scene) => {
  const gridX = Math.floor(gameArea.width / 2);
  const gridY = gameArea.height - 2;
  const posX = (gridX + gameArea.startX) * tileSize.width + tileSize.width / 2;
  const posY = gridY * tileSize.height + tileSize.height;

  const base = new Building(scene, gridX, gridY, posX, posY, "base", tileSize.width*3, tileSize.height*2);
  return base;
};

export default createBase;
