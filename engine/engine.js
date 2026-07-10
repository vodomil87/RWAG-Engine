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

            UI.renderScene(
                this.currentScene
            );

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


        UI.renderScene(scene);
    }

};
