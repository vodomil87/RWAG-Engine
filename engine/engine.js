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
    
    await loadGame(gameName);

    gotoScene(Engine.game.startScene);

}


// ===================================
// LOAD GAME
// ===================================

async function loadGame(gameName) {

    const response = await fetch(`games/${gameName}.json`);

    if (!response.ok) {
        throw new Error(`Nepodařilo se načíst hru "${gameName}"`);
    }

    Engine.game = await response.json();

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
