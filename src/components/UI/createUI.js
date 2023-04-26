import { leftUI, rightUI, screenWidth, screenHeight, tileSize } from "../phaser-game/gameConstants";
import { createWall } from "../phaser-game/Buildings/Wall"

const rightUIWidthPixel = rightUI.width;
const rightUIHeightPixel = rightUI.height;
const leftUIWidthPixel = leftUI.width;
const leftUIHeightPixel = leftUI.height;

const createUIBackground = (scene, x, y, width, height, imageKey) => {
  const background = scene.add.image(x, y, imageKey);

  background.setDisplaySize(width, height);
  background.setOrigin(0, 0);
  background.setDepth(-1);
};

export const createLeftUI = (scene) => {
  // Create grass background for the left UI area
  createUIBackground(scene, 0, 0, leftUIWidthPixel, leftUIHeightPixel, "UI");

  // Add UI elements such as buttons, text, or other UI components to the left UI area
  // ...
};

export const createRightUI = (scene) => {
  // Create grass background for the right UI area
  createUIBackground(scene, screenWidth - rightUIWidthPixel, 0, rightUIWidthPixel, rightUIHeightPixel, "UI");

  // Add the list of buildings and their icons
  const buildings = [
    {
      name: "Wall",
      key: "wall",
      createFunction: createWall,
    },
    // Add other buildings here
  ];

  // Add the title "Buy Menu"
  const titleText = scene.add.text(screenWidth - rightUIWidthPixel / 2, 10, "Buy Menu", {
    fontSize: "24px",
    color: "#ffffff",
  });
  titleText.setOrigin(0.5);
  titleText.setDepth(1); // Make sure the text is above the background

  const buildingIconYSpacing = 50;
  buildings.forEach((building, index) => {
    const iconX = screenWidth - rightUIWidthPixel / 2;
    const iconY = 60 + index * buildingIconYSpacing;

    const icon = scene.add.sprite(iconX, iconY, building.key);
    icon.setDisplaySize(tileSize.width, tileSize.height);
    icon.setInteractive();
    icon.setDepth(1); // Make sure the icon is above the background

    icon.on("pointerdown", () => {
      // Store the selected building's creation function in the scene's data
      scene.data.set("selectedBuilding", building.createFunction);

      console.log(`Choose where to place the building: ${scene.data.get("selectedBuilding")}`);
    });
  });

  // Add UI elements such as buttons, text, or other UI components to the right UI area
  // ...
};
