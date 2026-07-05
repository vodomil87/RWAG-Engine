const Engine = {

    game: null,
    currentScene: null,

    player: {
        lat: null,
        lon: null
    },

    state: {
        reputation: 0,
        inventory: [],
        roles: [],
        flags: {}
    }

};


// ===================================
// START
// ===================================

async function start(gameName) {

    UI.init();

    console.log("🚀 start");

    await loadGame(gameName);

    console.log("🎬 startScene:", Engine.game?.startScene);

    if (!Engine.game) {
        console.error("❌ Game se nenačetla");
        return;
    }

    gotoScene(Engine.game.startScene);
}

// ===================================
// LOAD GAME
// ===================================

async function loadGame(gameName) {

    console.log("1. loadGame start");

    const url = `games/${gameName}.json`;

    console.log("2. URL:", url);

    const response = await fetch(url);

    console.log("3. response status:", response.status);

    const text = await response.text();
    console.log("4. raw response:", text);

    Engine.game = JSON.parse(text);

    console.log("5. game loaded");

}


// ===================================
// SCÉNY
// ===================================

function getScene(id) {

    return Engine.game.scenes.find(scene => scene.id === id);

}


function gotoScene(id) {

    const scene = getScene(id);

    if (!scene) {
        console.error("Scéna neexistuje:", id);
        return;
    }

    Engine.currentScene = scene;

    UI.renderScene(scene);

}
