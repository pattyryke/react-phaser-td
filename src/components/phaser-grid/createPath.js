import Phaser from "phaser";
import { gameArea, tileSize } from "../phaser-game/gameConstants";

export const drawPath = (path, scene) => {
  console.log("Drawing path:", path); // Add this line

  path.forEach((tile) => {
    const { gridX, gridY } = tile;
    const posX = (gridX + gameArea.startX) * tileSize.width + tileSize.width / 2;
    const posY = gridY * tileSize.height + tileSize.height / 2;

    const pathRect = scene.add.rectangle(posX, posY, tileSize.width, tileSize.height, 0x00ff00, 0.1);
    pathRect.setDepth(100);
    pathRect.name = "pathTile";
    pathRect.isPath = true;
  });
};

export const clearPath = (scene) => {
  scene.children.each((child) => {
    if (child.isPath === true) {
      console.log("Destroying", child.type);
      child.destroy();
    }
  });
};

export const updatePath = (grid, scene) => {
  //console.log("Updating path...");

  clearPath(scene);

  const newPath = createPath(grid);
  //console.log("New path:", newPath); // Add this line
  if (newPath) {
    drawPath(newPath, scene);
  }
};



export const createPath = (grid) => {

  const baseX = Math.floor(gameArea.width / 2)

  const portalTile = grid[0][baseX];
  const baseTile = grid[gameArea.height - 2][baseX];

  // Dijkstra's algorithm implementation
  const visited = new Set();
  const queue = [{ tile: portalTile, distance: 0 }];

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift();
    const { tile, distance } = current;
  
    //console.log("Current tile:", tile, "Distance:", distance); // Add this line
  
    if (visited.has(tile)) continue;
  
    visited.add(tile);
  
    if (tile === baseTile) {
      return reconstructPath(tile);
    }
  
    const neighbors = getNeighbors(grid, tile);
  
    //console.log("Neighbors:", neighbors); // Add this line
  
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const newDistance = distance + 1;
        queue.push({ tile: neighbor, distance: newDistance });
        neighbor.previous = tile;
      }
    }
  }

  return null;
};

const reconstructPath = (tile) => {
  const path = [];

  while (tile.previous) {
    path.unshift(tile);
    tile = tile.previous;
  }

  return path;
};

const getNeighbors = (grid, tile) => {
  const neighbors = [];
  const { gridX, gridY } = tile; // Change this line

  const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 1, dy: 0 }, // Right
    { dx: 0, dy: 1 }, // Down
    { dx: -1, dy: 0 }, // Left
  ];

  for (const { dx, dy } of directions) {
    const newX = gridX + dx;
    const newY = gridY + dy;

    if (
      newX >= 0 &&
      newX < gameArea.width &&
      newY >= 0 &&
      newY < gameArea.height &&
      grid[newY][newX].content === null
    ) {
      neighbors.push(grid[newY][newX]);
    }
  }

  return neighbors;
};


