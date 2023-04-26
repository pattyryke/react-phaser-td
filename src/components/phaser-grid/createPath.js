import { gameArea, tileSize } from "../phaser-game/gameConstants";

export const drawPath = (path, scene) => {
  path.forEach((tile) => {
    const { x, y } = tile;
    const posX = x * tileSize.width + tileSize.width / 2;
    const posY = y * tileSize.height + tileSize.height / 2;

    const pathRect = scene.add.rectangle(posX, posY, tileSize.width, tileSize.height, 0x00ff00, 0.5);
    pathRect.setDepth(10); // Make sure the path is above other game objects
  });
};
export const clearPath = (scene) => {
  scene.children.each((child) => {
    if (child.type === "rectangle" && child.fillColor === 0x00ff00) {
      child.destroy();
    }
  });
};
export const updatePath = (grid, scene) => {
  clearPath(scene);

  const newPath = createPath(grid);
  if (newPath) {
    drawPath(newPath, scene);
  }
};

export const createPath = (grid) => {
  const portalTile = grid[0][Math.floor(gameArea.width / 2) - gameArea.startX];
  const baseTile = grid[gameArea.height - 2][Math.floor(gameArea.width / 2) - gameArea.startX];

  // Dijkstra's algorithm implementation
  const visited = new Set();
  const queue = [{ tile: portalTile, distance: 0 }];

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift();
    const { tile, distance } = current;

    if (visited.has(tile)) continue;

    visited.add(tile);

    if (tile === baseTile) {
      return reconstructPath(tile);
    }

    const neighbors = getNeighbors(grid, tile);

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
  const { x, y } = tile;

  const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 1, dy: 0 }, // Right
    { dx: 0, dy: 1 }, // Down
    { dx: -1, dy: 0 }, // Left
  ];

  for (const { dx, dy } of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (
      newX >= 0 &&
      newX < gameArea.width &&
      newY >= 0 &&
      newY < gameArea.height &&
      !grid[newY][newX].isOccupied()
    ) {
      neighbors.push(grid[newY][newX]);
    }
  }

  return neighbors;
};
