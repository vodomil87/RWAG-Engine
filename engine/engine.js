const Engine = {
    game:null,
    currentScene:null,
    state:{
        reputation:0,
        inventory:[],
        roles:[],
        flags:{}
    },

    async start(scenario){
        try{
            await this.loadGame(gameName);
            await this.loadRoles();
            UI.init();
            Status.render();
            this.gotoScene(this.game.startScene);
            Menu.init();
        }catch(e){
            console.error(e);
            document.getElementById("game").innerHTML="❌ "+e.message;
        }
    },

    async loadGame(gameName){
            const scenario =
            Launcher.scenarios.find(
                s=>s.id===gameName
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
        if(!this.game.roleSet){
            console.log(
                "Scénář nemá role"
            );
            return;
        }

        const roles =
            await Roles.load(
                this.basePath + this.game.roleSet
            );

        this.state.roles =
            Roles.assign(
                roles,
                1
            );
    
        console.log(
            "PLAYER ROLES:",
            this.state.roles
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

    exitScenario(){
        this.game = null;
        this.state = {};
        document.getElementById("game").style.display="none";
        document.getElementById("launcher").style.display="block";
        Menu.page="main";
        Menu.close();
        Launcher.render();
    }
};

window.Engine=Engine;
