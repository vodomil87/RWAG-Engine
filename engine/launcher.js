console.log("launcher.js načten");

const Launcher = {
    scenarios: [],
    async init() {
        Settings.load();
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
        Status.render();
        Menu.init();
        this.render();
    },

    render() {
        const root = document.getElementById(
            "launcher"
        );
        if(!root) return;
        root.innerHTML="";
        const title=document.createElement("h2");
        title.innerText="Vyber scénář";
        
        root.appendChild(title);

        const container=document.createElement(
        "div"
        );
        container.className="scenario-list";
        this.scenarios.forEach(
            scenario=>{
                const status =
                    ScenarioStatus.get(
                        scenario.status
                    );
                const card=document.createElement(
                    "div"
                );
                card.className="scenario-card";
                card.innerHTML=`
                <div class="scenario-image">
                    <img src="${scenario.image}">
                </div>
                <div class="scenario-info">
                    <div class="scenario-title">
                        ${scenario.name}
                    </div>
                    <div class="scenario-description">
                        ${scenario.description}
                    </div>
                </div>
                <div class="scenario-details">
                    <div class="scenario-detail">
                        <span class="scenario-icon">
                            ${icons.pin}
                        </span>
                        <span>
                             ${scenario.location}
                        </span>
                    </div>
                    <div class="scenario-detail">
                        <span class="scenario-icon">
                            ${icons.stopky}
                        </span>
                        <span>
                            ${scenario.time}
                        </span>
                    </div>
                    <div class="scenario-detail">
                        <span class="scenario-icon">
                            ${icons.hraci}
                        </span>
                        <span>
                            ${scenario.players}
                        </span>
                    </div>
                    <div class="scenario-detail">
                        <span class="scenario-icon">
                            ${status.icon}
                        </span>
                        <span>
                            ${status.text}
                        </span>
                    </div>
                </div>
                `;
                card.onclick=()=>{
                    this.startScenario(
                        scenario.id
                    );
                };
                container.appendChild(card);
            }
        );
        root.appendChild(container);
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
