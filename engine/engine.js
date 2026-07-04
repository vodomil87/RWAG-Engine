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

async function start() {
    await loadGame("nebakov");
    render();
}

async function loadGame(gameName) {
    try {
        const response = await fetch(`games/${gameName}.json`);

        if (!response.ok) {
            throw new Error("JSON load failed: " + response.status);
        }

        Engine.game = await response.json();

        Engine.currentScene = getScene(Engine.game.startScene);

        if (!Engine.currentScene) {
            console.error("❌ Start scene not found:", Engine.game.startScene);
        }

    } catch (err) {
        console.error("❌ loadGame error:", err);

        document.getElementById("game").innerHTML =
            "❌ Failed to load game data.";
    }
}

function getScene(id) {
    if (!Engine.game) return null;
    return Engine.game.scenes.find(scene => scene.id === id);
}

function gotoScene(id) {
    const scene = getScene(id);

    if (!scene) {
        console.error("❌ Scene not found:", id);
        return;
    }

    Engine.currentScene = scene;
    render();
}

function render() {
    const root = document.getElementById("game");

    if (!root) {
        console.error("❌ Missing #game container in HTML");
        return;
    }

    const scene = Engine.currentScene;

    if (!scene) {
        root.innerHTML = "❌ Scene not loaded";
        return;
    }

    root.innerHTML = "";

    // TEXT
    const textDiv = document.createElement("div");
    textDiv.className = "text";

    if (Array.isArray(scene.text)) {
        textDiv.innerHTML = scene.text.join("<br><br>");
    } else {
        textDiv.innerText = scene.text;
    }

    root.appendChild(textDiv);

    // CHOICES
    if (!scene.choices) {
        root.innerHTML += "<br>❌ No choices in scene";
        return;
    }

    scene.choices.forEach(choice => {

        const btn = document.createElement("button");
        btn.className = "choice";

        const icon = (
