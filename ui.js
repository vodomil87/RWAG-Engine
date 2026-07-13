const UI={
    root:null,

    init(){
        this.root=document.getElementById("game");
    },

    renderScene(scene){
        this.root.innerHTML="";
        if(scene.image) this.root.appendChild(this.createSceneImage(scene.image));
        this.renderText(scene);
        this.renderChoices(scene);
        Status.render();
    },

    renderText(scene){
        const d=document.createElement("div");
        d.className="text";
        d.innerHTML=Array.isArray(scene.text)?scene.text.join("<br><br>"):scene.text;
        this.root.appendChild(d);
    },

    renderChoices(scene){
        (scene.choices||[]).forEach(c=>{
            const b=document.createElement("button");
            b.className="choice";
            b.innerText=`${icons[c.icon]||""} ${c.text}`;
            b.onclick=()=>Engine.gotoScene(c.goto);
            this.root.appendChild(b);
        });
    },

    createSceneImage(name){
        const img=document.createElement("img");
        img.src="images/"+name;
        img.className="scene-image";
        return img;
    }
};
window.UI=UI;
