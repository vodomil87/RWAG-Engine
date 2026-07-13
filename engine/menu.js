const Menu = {
    open:false,
    init(){
        const b=document.getElementById("menuButton");
        if(b){
            b.onclick=(e)=>{
                e.stopPropagation();
                this.toggle();
            };
        }

        document.addEventListener(
            "click",
            (e)=>{
                const panel=document.getElementById("menuPanel");
                if(
                    this.open &&
                    panel &&
                    !panel.contains(e.target) &&
                    e.target.id !== "menuButton"
                ){
                    this.close();
                }
            }
        );
    },

    toggle(){
        this.open=!this.open;
        const p=document.getElementById("menuPanel");
        p.classList.toggle(
            "menu-open",
            this.open
        );
        if(this.open){
            this.render();
        }
    },

    close(){
        this.open=false;
        const p=document.getElementById("menuPanel");
        if(p){
            p.classList.remove("menu-open");
        }
    },


    render(){
        document.getElementById("menuPanel").innerHTML=`
        <div class="menu-title">
        ${icons.svitek} ${Engine.game?.scenarioName || "Scénář"}
        </div>
        <div class="menu-item">${icons.role} Role</div>
        <div class="menu-item">${icons.svitek} Úkoly</div>
        <div class="menu-item">${icons.batoh} Inventář</div>
        <div class="menu-item">${icons.knihy} Přehled pravidel</div>
        <div class="menu-item">${icons.graf} Statistiky</div>
        <div class="menu-item">${icons.disketa} Uložit / Načíst pozici</div>
        <div class="menu-item">${icons.dvere} Ukončit scénář</div>
        <hr>
        <div class="menu-item">${icons.nastaveni} Nastavení</div>
        <hr>
        <div class="menu-item">${icons.info} O aplikaci</div>
        `;
    }
};

window.Menu=Menu;
