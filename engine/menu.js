const Menu = {
    page:"main",
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
        this.page="main";
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
        switch(this.page){
            case "settings":
                this.renderSettings();
                break;
            case "about":
                this.renderAbout();
                break;
            default:
                this.renderMain();
        }
    },

    renderMain(){
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
        <div class="menu-item"
            onclick="Menu.showSettings()">
            ${icons.nastaveni} Nastavení ▶
        </div>
        <hr>
        <div class="menu-item"
            onclick="Menu.showAbout()">
            ${icons.info} O aplikaci
        </div>
        `;
    },
    
    showSettings(){
        this.page="settings";
        this.render();
    },
    
    showAbout(){
        this.page="about";
        this.render();
    },

    renderSettings(){
        document.getElementById("menuPanel").innerHTML=`
        <div class="menu-title">
            ◀ Nastavení
        </div>
        <div class="menu-section">
            🌓 Barevné schéma
        </div>
        <div class="menu-buttons">
            <button>Černé</button>
            <button>Bílé</button>
            <button>Stylové</button>
        </div>
        <div class="menu-section">
            🆎 Font
        </div>
        <div class="menu-buttons">
            <button>Výchozí</button>
            <button>Stylový</button>
        </div>
        <div class="menu-section">
            Velikost písma
        </div>
        <input
        type="range"
        min="14"
        max="28"
        value="16"
        style="width:100%;">
        <div class="menu-section">
           🔔 Oznámení
        </div>
        <div class="menu-item">
            Zvuky
        </div>
        <div class="menu-item">
            Vibrace
        </div>
        <hr>
        <div
        class="menu-item"
        onclick="Menu.showMain()">
            ◀ Zpět
        </div>
        `;
    },

    renderAbout(){
        document.getElementById("menuPanel").innerHTML=`
        <div class="menu-title">
            ℹ️ O aplikaci
        </div>
        <p>
        RWAG Engine
        <br>
        Verze 0.2
        </p>
        <hr>
        <div
        class="menu-item"
        onclick="Menu.showMain()">
            ◀ Zpět
        </div>
        `;
    },

    showMain(){
        this.page="main";
        this.render();
    }
};

window.Menu=Menu;
