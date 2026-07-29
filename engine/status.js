const Status={
render(){
 const bar=document.getElementById("status");
 if(!bar) return;
 if(!Engine.game){
    bar.innerHTML = `
        <div class="menu-title">id="menuButton">${icons.hamburger} Menu</div>
    `;
    Menu.init();
    return;
}
 const r=Engine.state.reputation;
 const icon=r>0?icons.rep_pos:r<0?icons.rep_neg:icons.rep_neu;
 bar.innerHTML=`
 
<div class="menu-title">id="menuButton">${icons.hamburger} Menu</div>

<span>
${icon} ${r>0?"+":""}${r}
</span>

`;

if(window.Menu){
    Menu.init();
}
}};
window.Status=Status;


const ScenarioStatus = {
    available:{
        icon:icons.puntik_zeleny,
        text:"K dispozici!"
    },
    preparing:{
        icon:icons.puntik_cerveny,
        text:"Připravujeme..."
    },
    beta:{
        icon:icons.puntik_zluty,
        text:"Probíhá testování."
    },
    get(status){
        return this[status] || {
            icon:"",
            text:status
        };
    }
};

window.ScenarioStatus = ScenarioStatus;
