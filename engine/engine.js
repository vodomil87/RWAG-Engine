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
    },


    // ===============================
    // START HRY
    // ===============================

    async start(gameName) {

    console.log("ENGINE START");

    try {

        await this.loadGame(gameName);

        console.log("GAME READY", this.game);

        const startScene = this.getScene(
            this.game.startScene
        );

        console.log("START SCENE", startScene);


            if (!startScene) {
               throw new Error(
                  "Start scéna nenalezena"
                );
            }

            this.currentScene = startScene;

console.log("CALL UI");

UI.init();

// Spustit efekty pouze při prvním vstupu
if (!this.currentScene._visited) {

    this.currentScene._visited = true;

    Effects.apply(this.currentScene.effects);

}

// Vykreslit scénu
UI.renderScene(this.currentScene);

// Aktualizovat horní lištu
Status.render();

        } catch(error) {

            console.error("ENGINE ERROR", error);

            document.getElementById("game").innerHTML =
                "❌ " + error.message;
        }
    },


    // ===============================
    // NAČTENÍ JSON
    // ==============================
    
async loadGame(gameName) {

    console.log(
        "LOADING GAME:",
        gameName
    );

    const response = await fetch(
        `games/${gameName}.json`
    );


    console.log(
        "JSON RESPONSE:",
        response.status
    );


    if (!response.ok) {

        throw new Error(
            "Nelze načíst hru"
        );
    }


    this.game = await response.json();

    console.log(
        "JSON DATA:",
        this.game
    );
},


    // ===============================
    // HLEDÁNÍ SCÉNY
    // ===============================

    getScene(id) {

        return this.game.scenes.find(
            scene => scene.id === id
        );
    },


    // ===============================
    // PŘECHOD NA SCÉNU
    // ===============================

    gotoScene(id) {


        const scene = this.getScene(id);


        if (!scene) {

            console.error(
                "Scéna nenalezena:",
                id
            );

            return;
        }

this.currentScene = scene;

// Spustit efekty pouze při prvním vstupu
if (!scene._visited) {

    scene._visited = true;

    Effects.apply(scene.effects);

}

// Překreslit scénu
UI.renderScene(this.currentScene);

// Překreslit stavový řádek
Status.render();
        
    }

};

window.Engine = Engine;
