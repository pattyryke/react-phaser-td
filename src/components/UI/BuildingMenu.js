import Phaser from "phaser";

class BuildingMenu extends Phaser.GameObjects.Container {
  constructor(scene, x, y, building) {
    super(scene, x, y);

    this.building = building;

    const background = scene.add.rectangle(0, 0, 100, 50, 0x000000, 0.8);
    background.setOrigin(0);

    const removeButton = scene.add.text(5, 5, "Remove", { fontSize: '12px', color: '#ffffff' }).setInteractive({ useHandCursor: true });
    removeButton.on('pointerdown', () => {
      this.building.destroy();
      this.destroy();
    });

    const cancelButton = scene.add.text(55, 5, "Cancel", { fontSize: '12px', color: '#ffffff' }).setInteractive({ useHandCursor: true });
    cancelButton.on('pointerdown', () => {
      this.destroy();
    });

    this.add(background);
    this.add(removeButton);
    this.add(cancelButton);

    scene.add.existing(this);
  }
}

export default BuildingMenu;
