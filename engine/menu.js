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
        if(!p) return;
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
        if(!Engine.game){
            this.renderLauncherMenu();
        return;
        }
        
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

    renderLauncherMenu(){
        document.getElementById("menuPanel").innerHTML=`
        <div class="menu-title">
            ${icons.menu} Menu
        </div>
        <div class="menu-item" id="menuSettings">
            ${icons.nastaveni} Nastavení ${icons.vpred}
        </div>
        <hr>
        <div class="menu-item" id="menuAbout">
            ${icons.info} O aplikaci ${icons.vpred}
        </div>
        `;
        document.getElementById("menuSettings").onclick=(e)=>{
            e.stopPropagation();
            this.showSettings();
        };
        document.getElementById("menuAbout").onclick=(e)=>{
            e.stopPropagation();
            this.showAbout();
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
        <div class="theme-picker">
            <button
                id="themeDark"
                class="theme-preview dark">
                Aa
            </button>
            <button
                id="themeLight"
                class="theme-preview light">
                Aa
            </button>
            <button
                id="themeMedieval"
                class="theme-preview medieval">
                Aa
            </button>
        </div>
        <div class="menu-section">
            ${icons.font} Font
        </div>
        <div class="theme-picker">
            <button
                id="fontDefault"
                class="theme-preview font-preview font-default">
                Aa
            </button>
            <button
                id="fontMedieval"
                class="theme-preview font-preview font-medieval">
                Aa
            </button>
            <button
                id="fontTypewriter"
                class="theme-preview font-preview font-typewriter">
                Aa
            </button>
        </div>
        <div class="menu-section">
            Velikost písma
            <span id="fontSizeValue">16</span> px
        </div>
        <input
        id="fontSizeRange"
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
        
        document.getElementById("themeDark").onclick=()=>{
            Settings.setTheme("dark");
        };
        
        document.getElementById("themeLight").onclick=()=>{
            Settings.setTheme("light");
        };
        
        document.getElementById("themeMedieval").onclick=()=>{
            Settings.setTheme("medieval");
        };
        
        document.getElementById("menuBack").onclick = (e) => {
            e.stopPropagation();
            this.showMain();
            
        };
        Settings.updateThemeButtons();
        Settings.updateFontButtons();

        document.getElementById("fontDefault").onclick=()=>{
            Settings.setFont("default");
            Settings.updateFontButtons();
        };

        document.getElementById("fontMedieval").onclick=()=>{
            Settings.setFont("medieval");
            Settings.updateFontButtons();
        };

        document.getElementById("fontTypewriter").onclick=()=>{
            Settings.setFont("typewriter");
            Settings.updateFontButtons();
        };

        document.getElementById("fontSizeRange").oninput=(e)=>{
            Settings.setFontSize(
            e.target.value
            );
        };

        const slider=document.getElementById("fontSizeRange");
        const value=document.getElementById("fontSizeValue");

        slider.value =
            localStorage.getItem("rwag_font_size") || 16;

        value.innerText=slider.value;

        slider.oninput=(e)=>{
            Settings.setFontSize(e.target.value);
            value.innerText=e.target.value;
        };
    },

    updateFontButtons(){
        document
            .querySelectorAll(".font-preview")
            .forEach(btn=>{
                btn.classList.remove("active");
            });
        const font =
            localStorage.getItem("rwag_font")
            || "default";
        document
            .getElementById(
                "font" +
                font.charAt(0).toUpperCase() +
                font.slice(1)
            )
            ?.classList.add("active");
    },
    
    updateThemeButtons(){
        const currentTheme =
            localStorage.getItem("rwag_theme") || "dark";
        document
            .querySelectorAll(".theme-preview")
            .forEach(btn=>{
                 btn.classList.remove("active");
            });
        document
            .getElementById(
                "theme" +
                currentTheme.charAt(0).toUpperCase() +
                currentTheme.slice(1)
            )
            ?.classList.add("active");
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
    <div class="menu-description">
        ${role.description}
    </div>
    <div class="menu-section">
        ${icons.masky} Charakter
    </div>
    ${role.character.map(text=>`
        <div class="menu-description">
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
