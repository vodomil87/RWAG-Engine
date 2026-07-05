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

async function start() {
    console.log("START ENGINE");

    await loadGame("nebakov");

    console.log("GAME AFTER LOAD:", Engine.game);

    if (!Engine.game) {
        document.getElementById("game").innerText =
            "❌ JSON se nenačetl";
        return;
    }

    render();
}

// ===================================
// LOAD GAME
// ===================================

async function loadGame(gameName) {
async function loadGame(gameName) {
    try {
        const url = `./games/${gameName}.json`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("JSON neexistuje: " + url);
        }

        Engine.game = await response.json();

        console.log("GAME LOADED:", Engine.game);

        Engine.currentScene = getScene(Engine.game.startScene);

        if (!Engine.currentScene) {
            throw new Error("START SCÉNA NEEXISTUJE: " + Engine.game.startScene);
        }

    } catch (err) {
        console.error("LOAD ERROR:", err);
        document.getElementById("game").innerText =
            "❌ Engine load error: " + err.message;
    }
}

// ===================================
// SCÉNY
// ===================================

function getScene(id) {
    if (!Engine.game) return null;

    return Engine.game.scenes.find(scene => scene.id === id) || null;
}

function gotoScene(id) {
    const scene = getScene(id);

    if (!scene) {
        console.error("SCÉNA NENALEZENA:", id);
        return;
    }

    Engine.currentScene = scene;
    render();
}
