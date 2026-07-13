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
            UI.init();
            this.gotoScene(this.game.startScene);
            Status.render();
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
