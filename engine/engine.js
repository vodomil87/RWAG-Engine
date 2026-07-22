const Engine = {
    game:null,
    currentScene:null,
    state:null,

    async start(scenarioId){
        this.state = this.defaultState();
        try{
            await this.loadGame(scenarioId);
            await this.loadRoles();
            await this.loadLegend();
            UI.init();
            Status.render();
            this.gotoScene(this.game.startScene);
            Menu.init();
        }catch(e){
            console.error(e);
            document.getElementById("game").innerHTML="❌ "+e.message;
        }
    },

    async loadGame(scenarioId){

        console.log(
            "LOAD GAME ID:",
            scenarioId
        );
    
        console.log(
            "AVAILABLE SCENARIOS:",
            Launcher.scenarios
        );
    
        const scenario =
            Launcher.scenarios.find(
                s=>s.id===scenarioId
            );
    
        if(!scenario){
            throw new Error(
                "Scénář nenalezen"
            );
        }
        const response =
            await fetch(
                scenario.file
            );
        if(!response.ok){
            throw new Error(
                "Nelze načíst scénář"
            );
        }
        this.game =
            await response.json();
        // základní cesta ke scénáři
        this.basePath =
            scenario.file.substring(
                0,
                scenario.file.lastIndexOf("/")
            ) + "/";
        console.log(
            "BASE PATH:",
            this.basePath
        );
    },
    
    async loadRoles(){
        const roles =
            await Roles.load(
                this.basePath + this.game.roleSet
            );
    
        this.state.roles = [...roles];
        
        console.log(
            "AVAILABLE ROLES:",
            this.state.roles
        );
    },

    async loadLegend(){
    
        if(!this.game.legend){
            console.log(
                "Scénář nemá legendu"
            );
            return;
        }
    
        const response =
            await fetch(
                this.basePath + this.game.legend
            );
    
        if(!response.ok){
            throw new Error(
                "Nelze načíst legendu"
            );
        }
    
        this.legend =
            await response.json();
    
        console.log(
            "LEGEND LOADED:",
            this.legend
        );
    },
    
    getScene(id){
        return this.game?.scenes?.find(s=>s.id===id) || null;
    },

    gotoScene(id){
        const scene=this.getScene(id);
        if(!scene) throw new Error("Scéna nenalezena: "+id);
        this.currentScene=scene;
        if(!scene._visited){
            scene._visited=true;
            if(window.Effects) Effects.apply(scene.effects);
        }
        UI.renderScene(scene);
    },

    addPlayer(name){
        if(!name){
            return false;
        }
        if(this.state.roles.length===0){
            return false;
        }
        const index =
            Math.floor(
                Math.random() *
                this.state.roles.length
            );
        const role =
            this.state.roles.splice(
                index,
                1
            )[0];
        this.state.players.push({
            name:name,
            role:role
        });
        console.log(
            "PLAYER:",
            this.state.players
        );
        console.log(
            "REMAINING ROLES:",
            this.state.roles
        );
        return true;
    },
    
    exitScenario(){
        this.game = null;
        this.legend = null;
        this.state = this.defaultState();
    
        document.getElementById("game").style.display="none";
        document.getElementById("launcher").style.display="block";
    
        Menu.page="main";
        Menu.close();
        Launcher.render();
    },

    defaultState(){
        return {
            reputation:0,
            inventory:[],
            roles:[],
            players:[],
            pendingPlayers:[],
            flags:{}
        };
    },
    
};

window.Engine=Engine;
