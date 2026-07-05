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
    try {
        await loadGame("nebakov");

        if (!Engine.currentScene) {
            document.getElementById("game").innerText =
                "❌ Start scéna nenalezena";
            return;
        }

        render();
    } catch (e) {
        console.error(e);
        document.getElementById("game").innerText =
            "❌ Engine error: " + e.message;
    }
}

// ===================================
// LOAD GAME
// ===================================

async function loadGame(gameName) {
    const response = await fetch(`games/${gameName}.json`);

    if (!response.ok) {
        throw new Error("JSON se nenačetl");
    }

    Engine.game = await response.json();

    console.log("GAME LOADED", Engine.game);

    const startId = Engine.game.startScene;
    const scene = getScene(startId);

    if (!scene) {
        console.error("START SCÉNA NEEXISTUJE:", startId);
        return;
    }

    Engine.currentScene = scene;
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
