const Menu={
open:false,
init(){
 const b=document.getElementById("menuButton");
 if(b) b.onclick=()=>this.toggle();
},
toggle(){
 this.open=!this.open;
 const p=document.getElementById("menuPanel");
 p.classList.toggle("menu-open",this.open);
 if(this.open)this.render();
},
render(){
 document.getElementById("menuPanel").innerHTML=`
<h3>${icons.svitek} ${Engine.game?.scenarioName||"Scénář"}</h3>
<div>${icons.role} Role</div>
<div>${icons.svitek} Úkoly</div>
<div>${icons.batoh} Inventář</div>
<div>${icons.knihy} Pravidla</div>
<div>${icons.graf} Statistiky</div>
<hr>
<div>${icons.nastaveni} Nastavení</div>
<div>${icons.info} O aplikaci</div>`;
}};
window.Menu=Menu;
