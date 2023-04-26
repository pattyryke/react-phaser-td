export const screenWidth = 1280;
export const screenHeight = 720;

export const tileSize = {
  width: 32,
  height: 18,
};

export const grid = {
  width: 40,
  height: 40,
};

export const gameArea = {
  width: 21,
  height: 40,
  startX: 9,
  endX: 30,
  startY: 0,
  endY: 40,
};

export const base = {
  width: 3,
  height: 2,
  x: gameArea.startX + Math.floor(gameArea.width / 2) - 1,
  y: gameArea.height - 2,
};

export const portal = {
  width: 3,
  height: 1,
  x: gameArea.startX + Math.floor(gameArea.width / 2) - 1,
  y: 0,
};

export const rightUI = {
  width: (grid.width - gameArea.endX)*tileSize.width,
  height: screenHeight,
};

export const leftUI = {
  width: (gameArea.startX)*tileSize.width,
  height: screenHeight,
};