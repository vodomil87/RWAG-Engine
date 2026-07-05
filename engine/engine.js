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
            throw new Error(`HTTP ${response.status}`);
        }

        Engine.game = await response.json();

console.log("Start:", Engine.game.startScene);

console.log(
    "Scény:",
    Engine.game.scenes.map(s => s.id)
);

Engine.currentScene = getScene(Engine.game.startScene);

console.log("Načtená scéna:", Engine.currentScene);
        
        console.log(Engine.game);
        console.log(Engine.game.startScene);
        console.log(Engine.game.scenes);

        Engine.currentScene = getScene(Engine.game.startScene);
        } catch (err) {
        console.error("❌ LOAD GAME ERROR:", err);

        document.getElementById("game").innerHTML =
            `<div style="color:red;font-family:Arial">
                ❌ Engine se nenačetl<br><br>
                ${err.message}
            </div>`;
    }
}

function getScene(id) {
    console.log("Hledám scénu:", id);
    return Engine.game.scenes.find(scene => scene.id === id);
}

function gotoScene(id) {
    Engine.currentScene = getScene(id);
    render();
}

function render() {
    const scene = Engine.currentScene;
    const root = document.getElementById("game");

    if (!scene) {
        root.innerHTML = "❌ Scéna nenalezena";
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

        btn.disabled = !isChoiceEnabled(choice);

        btn.onclick = () => {
            gotoScene(choice.goto);
        };

        root.appendChild(btn);
    });
}

function isChoiceEnabled(choice) {
    return true; // zatím jednoduché
}

start();
