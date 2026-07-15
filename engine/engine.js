const Engine = {
    game:null,
    currentScene:null,
    state:{
        reputation:0,
        inventory:[],
        roles:[],
        flags:{}
    },

    async start(gameName){
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
        const response=await fetch(`games/${gameName}.json`);
        if(!response.ok) throw new Error("Nelze načíst scénář");
        this.game=await response.json();
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
                this.game.roleSet
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
    }
};

window.Engine=Engine;
