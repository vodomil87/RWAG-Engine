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

    gotoScene(Engine.game.startScene);

}

async function loadGame(gameName) {
    const res = await fetch(`games/${gameName}.json`);
    Engine.game = await res.json();
}

function getScene(id) {
    return Engine.game.scenes.find(scene => scene.id === id);
}

function gotoScene(id) {
    Engine.currentScene = getScene(id);
    render();
}

function render() {

  const scene = Engine.currentScene;
  const root = document.getElementById("game");

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
    const label = choice.text;

    btn.innerText = `${icon} ${label}`;

    btn.disabled = !isChoiceEnabled(choice);

    btn.onclick = () => {
      gotoScene(choice.goto);
    };

    root.appendChild(btn);
  });
}

function isChoiceEnabled(choice) {

}

start();
