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

        const panel = document.getElementById("menuPanel");
        if(panel){
            panel.onclick = (e)=>{
                e.stopPropagation();
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
            case "roles":
                this.renderRoles();
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
        <div class="menu-item" id="menuRoles">
            ${icons.role} Role ${icons.vpred}
        </div>
        <div class="menu-item">${icons.svitek} Úkoly</div>
        <div class="menu-item">${icons.batoh} Inventář</div>
        <div class="menu-item">${icons.knihy} Přehled pravidel</div>
        <div class="menu-item">${icons.graf} Statistiky</div>
        <div class="menu-item">${icons.disketa} Uložit / Načíst pozici</div>
        <div class="menu-item">${icons.dvere} Ukončit scénář</div>
        <hr>
        <div class="menu-item" id="menuSettings">
            ${icons.nastaveni} Nastavení ${icons.vpred}
        </div>
        <hr>
        <div class="menu-item" id="menuAbout">
            ${icons.info} O aplikaci ${icons.vpred}
        </div>
        `;
        document.getElementById("menuSettings").onclick = (e) => {
            e.stopPropagation();
            this.showSettings();
        };
        document.getElementById("menuAbout").onclick = (e) => {
            e.stopPropagation();
            this.showAbout();
        };
        document.getElementById("menuRoles").onclick=(e)=>{
            e.stopPropagation();
            this.showRoles();
        };
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
            ${icons.nastaveni} Nastavení
        </div>
        <div class="menu-section">
            ${icons.den_noc} Barevné schéma
        </div>
        <div class="menu-buttons">
            <button>Černé</button>
            <button>Bílé</button>
            <button>Stylové</button>
        </div>
        <div class="menu-section">
            ${icons.font} Font
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
           ${icons.zvonek} Oznámení
        </div>
        <div class="menu-item">
            Zvuky
        </div>
        <div class="menu-item">
            Vibrace
        </div>
        <hr>
        <div class="menu-item" id="menuBack">
            ${icons.zpet} Zpět
        </div>
        `;
        document.getElementById("menuBack").onclick = (e) => {
            e.stopPropagation();
            this.showMain();
        };
    },

    renderAbout(){
        document.getElementById("menuPanel").innerHTML=`
        <div class="menu-title">
            ${icons.info} O aplikaci
        </div>
        <p>
        RWAG Engine
        <br>
        Verze 0.2
        </p>
        <hr>
        <div class="menu-item" id="menuBack">
           ${icons.zpet} Zpět
        </div>
        `;
        document.getElementById("menuBack").onclick = (e) => {
            e.stopPropagation();
        this.showMain();
        };
    },

    renderRoles(){
    const role = Engine.state.roles?.[0];
    if(!role){
        document.getElementById("menuPanel").innerHTML=`
        <div class="menu-title">
            ${icons.role} Role
        </div>
        <p>
            Žádná role není přidělena.
        </p>
        <hr>
        <div class="menu-item" id="menuBack">
            ${icons.zpet} Zpět
        </div>
        `;
        document.getElementById("menuBack").onclick=(e)=>{
            e.stopPropagation();
            this.showMain();
        };
        return;
    }

    document.getElementById("menuPanel").innerHTML=`
    <div class="menu-title">
        ${icons.role} ${role.name}
    </div>
    <div style="opacity:.7;margin-bottom:15px;">
        ${role.description}
    </div>
    <div class="menu-section">
        ${icons.masky} Charakter
    </div>
    ${role.character.map(text=>`
        <div style="margin-bottom:8px;">
            ${text}
        </div>
    `).join("")}
    <div class="menu-section">
        ${icons.plus} Výhoda
    </div>
    <div>
        ${role.advantages[0].text}
    </div>
    <div class="menu-section">
        ${icons.minus} Nevýhoda
    </div>
    <div>
        ${role.disadvantages[0].text}
    </div>
    <hr>
    <div class="menu-item" id="menuBack">
        ${icons.zpet} Zpět
    </div>
    `;

    document.getElementById("menuBack").onclick=(e)=>{
        e.stopPropagation();
        this.showMain();
        };
    },
    
    showMain(){
        this.page="main";
        this.render();
    },
    
    showRoles(){
        this.page="roles";
        this.render();
    }
};

window.Menu=Menu;
