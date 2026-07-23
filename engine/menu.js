const Menu = {
    page:"main",
    open:false,
    addingPlayer:false,
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
        console.log("PAGE =", this.page);
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
            case "legend":
                this.renderLegend();
                break;
            case "confirm":
                this.renderConfirm();
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
        
        <div class="menu-item" id="menuLegend">
            ${icons.knihy} Přehled pravidel ${icons.vpred}
        </div>
        
        <div class="menu-item">${icons.graf} Statistiky</div>
        
        <div class="menu-item">${icons.disketa} Uložit / Načíst pozici</div>
        
        <div class="menu-item" id="menuExit">
            ${icons.dvere} Ukončit scénář
        </div>
        
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
        document.getElementById("menuLegend").onclick=(e)=>{
            e.stopPropagation();
            this.showLegend();
        };
        document.getElementById("menuExit").onclick=(e)=>{
            e.stopPropagation();
            this.confirm(
                "Opravdu chceš ukončit scénář?",
                ()=>{
                    Engine.exitScenario();
                }
            );
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

    showLegend(){
        this.page="legend";
        this.render();
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
                class="font-preview font-default">
                Aa
            </button>
            <button
                id="fontMedieval"
                class="font-preview font-medieval">
                Aa
            </button>
            <button
                id="fontTypewriter"
                class="font-preview font-typewriter">
                Aa
            </button>
        </div>
        <div class="menu-section">
            ${icons.up_down} Velikost písma:
            <span id="fontSizeValue">16</span> px
        </div>
        <div class="slider-wrapper">
            <input
            id="fontSizeRange"
            type="range"
            min="10"
            max="24"
            value="16">
        </div>
        <div class="menu-section">
           ${icons.zvonek} Oznámení
        </div>
        <div class="setting-row settings-section">
            <span>${icons.repro_nic} Zvuky</span>
            <button 
                id="soundToggle"
                class="toggle-button">
            </button>
        </div>
        <div class="setting-row settings-section">
            <span>${icons.vibrace} Vibrace</span>
            <button 
                id="vibrationToggle"
                class="toggle-button">
            </button>
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
        };

        document.getElementById("fontMedieval").onclick=()=>{
            Settings.setFont("medieval");
        };

        document.getElementById("fontTypewriter").onclick=()=>{
            Settings.setFont("typewriter");
        };

        const slider=document.getElementById("fontSizeRange");
        const value=document.getElementById("fontSizeValue");

        slider.value =
            Settings.get("font_size",16);

        value.innerText=slider.value;

        slider.oninput=(e)=>{
            Settings.setFontSize(e.target.value);
            value.innerText=e.target.value;
        };

        const updateToggles = ()=>{
            const sound =
                Settings.getSound();
            const vibration =
                Settings.getVibration();
    
            document
                .getElementById("soundToggle")
                .classList.toggle(
                    "on",
                    sound
                );

            document
                .getElementById("soundToggle")
                .innerHTML = sound ? "ON" : "OFF";

            document
                .getElementById("vibrationToggle")
                .classList.toggle(
                    "on",
                    vibration
                );

            document
                .getElementById("vibrationToggle")
                .innerHTML = vibration ? "ON" : "OFF";
        };

        document
        .getElementById("soundToggle")
        .onclick=()=>{
            Settings.setSound(
                !Settings.getSound()
            );
            updateToggles();
        };

        document
        .getElementById("vibrationToggle")
        .onclick=()=>{
            Settings.setVibration(
                !Settings.getVibration()
            );
            
            updateToggles();
        };
        
        updateToggles();
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

    renderLegend(){
        const legend = Engine.legend;
        if(!legend){
            document.getElementById("menuPanel").innerHTML=`
                <div class="menu-title">
                    ${icons.knihy} Přehled pravidel
                </div>
                <p>
                Legenda není dostupná.
                </p>
                <hr>
                <div class="menu-item" id="menuBack">
                    ${icons.zpet} Zpět
                </div>
            `;
            document.getElementById("menuBack").onclick=()=>{
                this.showMain();
            };
            return;
        }
    
        let html=`
            <div class="menu-title">
                ${icons.knihy} ${legend[0].title}
            </div>
        `;
        legend.slice(1).forEach(section=>{
            html+=`
            <div class="menu-section">
                ${section.subtitle}
            </div>
            `;
            section.items.forEach(item=>{
                html+=`
                <div class="legend-row">
                    <span class="scenario-icon">
                        ${icons[item.icon]}
                    </span>
    
                    <span>
                        ${item.text}
                    </span>
                </div>
                `;
            });
        });
    
        html+=`
            <hr>
            <div class="menu-item" id="menuBack">
                ${icons.zpet} Zpět
            </div>
        `;
    
        document.getElementById("menuPanel").innerHTML=html;
    
        document.getElementById("menuBack").onclick=(e)=>{
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
        const panel=document.getElementById("menuPanel");
        const players =
            Engine.state.players || [];
        panel.innerHTML=`
        <div class="menu-title">
            ${icons.role}
            Správa hráčů a jejich rolí
        </div>
        <div class="players-table">
            <div class="players-header">
                <div>Jméno</div>
                <div>Role</div>
            </div>
            <div id="playersList"></div>
        </div>
        <div id="playersAdd"></div>
        <hr>
        <div class="menu-item" id="menuBack">
            ${icons.zpet} Zpět
        </div>
        `;
    
        this.renderPlayers();
    
        document.getElementById("menuBack").onclick=(e)=>{
            e.stopPropagation();
            this.showMain();
        };
    },

    renderPlayers(){
        const list=document.getElementById("playersList");
        list.innerHTML="";
        const players=Engine.state.players || [];
        // Hotoví hráči
        players.forEach(player=>{
            const row=document.createElement("div");
            row.className="player-row";
            row.innerHTML=`
                <div class="player-name">
                    ${player.name}
                </div>
                <div class="player-role">
                    ${player.role?.name || "-"}
                </div>
            `;
            list.appendChild(row);
        });
    
        // Rozpracovaní hráči
        Engine.state.pendingPlayers.forEach((player,index)=>{
            const row=document.createElement("div");
            row.className="player-row";
            if(!player.confirmed){
            row.innerHTML=`
                <div class="player-name-cell">
                    ${
                        player.confirmed
                        ?
                        `<span>${player.name}</span>`
                        :
                        `
                        <input
                            class="playerNameInput"
                            data-index="${index}"
                            placeholder="Jméno hráče"
                            value="${player.name}">
                        `
                    }
                </div>
                <div class="player-confirm-cell">
                    ${
                        player.confirmed
                        ?
                        ""
                        :
                        `
                        <button class="confirmName" data-index="${index}">
                            ${icons.fajfka}
                        </button>
                        `
                    }
                </div>
                <div class="player-role-cell">
                    <button 
                        class="assignRole"
                        data-index="${index}"
                        ${player.confirmed ? "" : "disabled"}>
                        ${icons.kostka}
                    </button>
                </div>
            `;
            }else{
            row.innerHTML=`
                <div>
                    ${player.name}
                </div>
                <div>
                    <button 
                        class="assignRole"
                        data-index="${index}">
                        ${icons.kostka}
                    </button>
                </div>
            `;
            }
            list.appendChild(row);
        });

        document
        .querySelectorAll(".confirmPlayer")
        .forEach(button=>{
            button.onclick=()=>{
                const index=button.dataset.index;
                const input=document.querySelector(
                    `.playerNameInput[data-index="${index}"]`
                );
                if(!input.value.trim()){
                    alert("Zadej jméno hráče");
                    return;
                }
                Engine.state.pendingPlayers[index].name=
                    input.value.trim();
                Engine.state.pendingPlayers[index].confirmed=true;
                this.renderPlayers();
            };
        });

        document.querySelectorAll(".confirmPlayerName")
        .forEach(button=>{
            button.onclick=()=>{
                const index =
                    button.dataset.index;
                const input =
                    document.querySelector(
                        `.playerNameInput[data-index="${index}"]`
                    );
                if(!input.value.trim()){
                    alert("Zadej jméno hráče");
                    return;
                }
                Engine.state.pendingPlayers[index].name =
                    input.value.trim();
                this.renderRoles();
            };
        });
        
        // Aktivace kostek
        document.querySelectorAll(".assignRole")
        .forEach(button=>{
            button.onclick=()=>{
                const index=button.dataset.index;
                const input=document.querySelector(
                    `.playerNameInput[data-index="${index}"]`
                );
                if(!input.value.trim()){
                    alert("Zadej jméno hráče");
                    return;
                }
                Engine.addPlayer(
                    Engine.state.pendingPlayers[index].name
                );
                Engine.state.pendingPlayers.splice(
                    index,
                    1
                );
                this.renderPlayers();
            };
        });

        document.querySelectorAll(".confirmName")
        .forEach(button=>{
            button.onclick=()=>{
                const index =
                    button.dataset.index;
                const input =
                    document.querySelector(
                        `.playerNameInput[data-index="${index}"]`
                    );
                if(!input.value.trim()){
                    alert("Zadej jméno hráče");
                    return;
                }
                Engine.state.pendingPlayers[index].name =
                    input.value.trim();
                Engine.state.pendingPlayers[index].confirmed =
                    true;
                this.renderRoles();
            };
        });
        
        document.querySelectorAll(".confirmPlayer")
        .forEach(button=>{
            button.onclick=()=>{
                const index =
                    button.dataset.index;
                const input =
                    document.querySelector(
                        `.playerNameInput[data-index="${index}"]`
                    );
                if(!input.value.trim()){
                    alert("Zadej jméno hráče");
                    return;
                }
                Engine.state.pendingPlayers[index].name =
                    input.value.trim();
                Engine.state.pendingPlayers[index].confirmed =
                    true;
                this.renderRoles();
            };
        });
        
        // Plus dole
        const add=document.getElementById("playersAdd");
        add.innerHTML="";
        const max=Engine.game.players_max || 8;
        if(
            players.length +
            Engine.state.pendingPlayers.length
            < max
        ){
            add.innerHTML=`
                <button id="addPlayer">
                    ${icons.plus}
                </button>
            `;
            document.getElementById("addPlayer").onclick=()=>{
                this.addPlayerForm();
            };
        }
    },
    
    addPlayerForm(){
        Engine.state.pendingPlayers.push({
            name:"",
            confirmed:false,
            role:null
        });
        this.renderRoles();
    },

    createPlayer(){
        const name =
            document.getElementById(
                "playerName"
            ).value.trim();
        if(!name){
            return;
        }
        if(
            Engine.addPlayer(name)
        ){
            this.addingPlayer=false;
            this.renderRoles();
        }
    },
    
    showMain(){
        this.page="main";
        this.render();
    },
    
    showRoles(){
        this.page="roles";
        this.render();
    },

    confirm(text, yesCallback){
        console.log("CONFIRM:", text);
        this.page = "confirm";
        this.confirmText = text;
        this.confirmYes = yesCallback;
        this.render();
    },

    renderConfirm(){
        console.log("RENDER CONFIRM:", this.confirmText);
        document.getElementById("menuPanel").innerHTML=`
            <div class="menu-title">
                ${icons.otaznik} Potvrzení
            </div>
            <div class="menu-description">
                ${this.confirmText}
            </div>
            <hr>
            <div class="menu-item" id="confirmYes">
                ${icons.fajfka} Ano
            </div>
            <div class="menu-item" id="confirmNo">
                ${icons.krizek} Ne
            </div>
        `;
        document.getElementById("confirmYes").onclick=(e)=>{
            e.stopPropagation();
            if(this.confirmYes){
                this.confirmYes();
            }
        };
        document.getElementById("confirmNo").onclick=(e)=>{
            e.stopPropagation();
            this.showMain();
        };
    }
};

window.Menu=Menu;
