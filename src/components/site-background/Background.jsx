import PhaserComponent from "../phaser-game/PhaserComponent";
import "./Background.css";
import React from "react";


export function Background() {

    return (
        <div className="site-background">
            <div id="game-container">
                <PhaserComponent />
            </div>
        </div>
    );
}
export default Background