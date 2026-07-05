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

function render() {
    const scene = Engine.currentScene;

    const root = document.getElementById("game");

    if (!scene) {
        root.innerHTML = "❌ Scéna neexistuje";
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
    scene.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice";

        const icon = icons?.[choice.icon] || "";
        const label = Array.isArray(choice.text)
            ? choice.text.join(" ")
            : choice.text;

        btn.innerText = `${icon} ${label}`;

        btn.onclick = () => gotoScene(choice.goto);

        root.appendChild(btn);
    });
}

// ===================================
// START
// ===================================

async function start() {
    try {
        await loadGame("nebakov");
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

    // 👇 TADY
    console.log("START SCENE ID:", Engine.game.startScene);
    console.log("AVAILABLE SCENES:", Engine.game.scenes.map(s => s.id));

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
