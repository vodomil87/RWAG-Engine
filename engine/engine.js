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

        try {

            await this.loadGame(gameName);

            const startScene = this.getScene(
                this.game.startScene
            );

            if (!startScene) {
                throw new Error(
                    "Start scéna nenalezena"
                );
            }

            this.currentScene = startScene;

            UI.renderScene(
                this.currentScene
            );

        } catch(error) {

            console.error(error);

            document.getElementById("game").innerHTML =
                "❌ " + error.message;
        }
    },


    // ===============================
    // NAČTENÍ JSON
    // ===============================

    async loadGame(gameName) {

        const response = await fetch(
            `games/${gameName}.json`
        );


        if (!response.ok) {

            throw new Error(
                "Nelze načíst hru: " + gameName
            );
        }


        this.game = await response.json();

        console.log(
            "Načtena hra:",
            this.game.gameId
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
