import Building from "../../phaser-grid/Building";
import { tileSize, gameArea } from "../gameConstants";

export const createWall = (scene, gridX, gridY) => {
  const posX = (gridX + gameArea.startX) * tileSize.width + tileSize.width / 2;
  const posY = gridY * tileSize.height + tileSize.height / 2;
  
  const wall = new Building(scene, gridX, gridY, posX, posY, "wall", tileSize.width, tileSize.height);
  
  return wall;
};

export default createWall;
