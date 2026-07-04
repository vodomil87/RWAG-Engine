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
    console.log("🚀 RWAG Engine starting...");

    await loadGame("nebakov");

    if (!Engine.currentScene) {
        console.error("❌ No starting scene loaded");
        showError("Start scene not found");
        return;
    }

    render();
}

async function loadGame(gameName) {
    try {
        console.log("📦 Loading game:", gameName);

        const response = await fetch(`games/${gameName}.json`);

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        Engine.game = await response.json();

        console.log("✅ Game loaded");

        Engine.currentScene = getScene(Engine.game.startScene);

        if (!Engine.currentScene) {
            console.error("❌ Scene not found:", Engine.game.startScene);
        }

    } catch (err) {
        console.error("❌ loadGame failed:", err);
        showError("Failed to load game JSON");
    }
}

function getScene(id) {
    if (!Engine.game || !Engine.game.scenes) return null;
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
        console.error("❌ Missing #game container");
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
    if (!scene.choices || scene.choices.length === 0) {
        root.innerHTML += "<br>❌ No choices";
        return;
    }

    scene.choices.forEach(choice => {

        const btn = document.createElement("button");
        btn.className = "choice";

        const icon = (typeof icons !== "undefined")
            ? (icons[choice.icon] || "")
            : "";

        const label = Array.isArray(choice.text)
            ? choice.text.join(" ")
            : choice.text;

        btn.innerText = `${icon} ${label}`;

        btn.disabled = !isChoiceEnabled(choice);

        btn.onclick = () => gotoScene(choice.goto);

        root.appendChild(btn);
    });
}

function isChoiceEnabled(choice) {
    return true;
}

function showError(msg) {
    const root = document.getElementById("game");
    if (root) {
        root.innerHTML = "❌ " + msg;
    }
}

start();
