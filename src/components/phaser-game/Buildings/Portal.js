import Building from "../../phaser-grid/Building";
import { gameArea, tileSize } from "../gameConstants";

export const createPortal = (scene) => {
  const gridX = Math.floor(gameArea.width / 2);
  const gridY = 0;
  const posX = (gridX + gameArea.startX) * tileSize.width + tileSize.width / 2;
  const posY = gridY * tileSize.height + tileSize.height ;

  const portal = new Building(scene, gridX, gridY, posX, posY, "portal", tileSize.width, tileSize.height*2);
  
  // Create portal animation
  scene.anims.create({
    key: "portal",
    frames: [
      { key: "portal1" },
      { key: "portal2" },
    ],
    frameRate: 6, // Adjust the frame rate to change the animation speed
    repeat: -1,
  });

  // Play the portal animation
  portal.sprite.play("portal");

  return portal;
};

export default createPortal;
