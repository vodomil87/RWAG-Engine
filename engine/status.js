const Status={
render(){
 const bar=document.getElementById("status");
 if(!bar) return;
 const r=Engine.state.reputation;
 const icon=r>0?icons.rep_pos:r<0?icons.rep_neg:icons.rep_neu;
 bar.innerHTML=`
 <button id="menuButton">${icons.menu}</button>
 <span>${icon} ${r>0?"+":""}${r}</span>`;
 Menu.init();
}};
window.Status=Status;
