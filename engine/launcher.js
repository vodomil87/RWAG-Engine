console.log("launcher.js načten");

const Launcher = {

    scenarios: [],

    async init() {

        console.log("Launcher.init()");
        
        console.log("LAUNCHER INIT");

        const response = await fetch(
            "games/scenarios.json"
        );

        if (!response.ok) {

            throw new Error(
                "Nelze načíst seznam scénářů"
            );

        }

        this.scenarios = await response.json();

        this.render();

    },


    render() {

        const root = document.getElementById(
            "launcher"
        );

        if (!root) return;


        root.innerHTML = "";


        const title = document.createElement("h2");

        title.innerText =
            "Vyber scénář";

        root.appendChild(title);



        const select =
            document.createElement("select");


        this.scenarios.forEach(
            scenario => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    scenario.id;

                option.innerText =
                    scenario.name;

                select.appendChild(option);

            }
        );


        root.appendChild(select);



        const button =
            document.createElement(
                "button"
            );

        button.innerText =
            "▶ Spustit";


        button.onclick = () => {

            const id =
                select.value;

            this.startScenario(id);

        };


        root.appendChild(button);

    },


    startScenario(id) {

        console.log(
            "START SCENARIO:",
            id
        );


        document.getElementById(
            "launcher"
        ).style.display = "none";


        document.getElementById(
            "game"
        ).style.display = "block";


        Engine.start(id);

    }

};
