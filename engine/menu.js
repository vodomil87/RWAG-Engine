const Menu = {
    page:"main",
    open:false,
    addingPlayer:false,
    rolesPage:"list",
    selectedRole:null,
    init(){
        const panel = document.getElementById("menuButton");
        if(panel){
            panel.onclick = (e)=>{
                e.stopPropagation();
            };
        }

        document.addEventListener(
            "click",
            (e)=>{
                const panel=document.getElementById("menuButton");
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
            ${icons.hraci} Hráči a role ${icons.vpred}
        </div>
        <div class="menu-item">${icons.svitek} Úkoly ${icons.zabrana}</div>
        <div class="menu-item">${icons.batoh} Inventář ${icons.zabrana}</div>
        <div class="menu-item" id="menuLegend">
            ${icons.knihy} Přehled pravidel ${icons.vpred}
        </div>
        <div class="menu-item">${icons.graf} Statistiky ${icons.zabrana}</div>
        <div class="menu-item">${icons.disketa} Uložit / Načíst pozici ${icons.zabrana}</div>
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
        this.bindMenuTitle();
    },

    renderLauncherMenu(){
        document.getElementById("menuPanel").innerHTML=`
        <div class="menu-title">
            ${icons.hamburger} Menu
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
        this.bindMenuTitle();
    },

    bindMenuTitle(){
        const title =
            document.querySelector(".menu-title");
        if(!title){
            return;
        }
        title.onclick = (e)=>{
            e.stopPropagation();
            this.close();
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
            <span id="fontSizeValue"></span> px
        </div>
            <div class="slider-wrapper">
                <input
                id="fontSizeRange"
                type="range"
                min="10"
                max="30"
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
        <div class="menu-section">
            ${icons.tv} Další možnosti zobrazení
        </div>
            <div class="checkbox-row settings-section">
                <input 
                    type="checkbox" 
                    id="choice_confirm"
                    ${Settings.getChoiceConfirm() ? "checked" : ""}
                />
                
                <label for="choice_confirm">
                    Vyžadovat potvrzení o rozhodnutí
                </label>
            </div>
            <div class="checkbox-row settings-section">
                <input 
                    type="checkbox" 
                    id="quests_done_show"
                    ${Settings.getQuestsDoneShow() ? "checked" : ""}
                />
                
                <label for="quests_done_show">
                    Zobrazit splněné úkoly
                </label>
            </div>
        <hr>
        <div class="menu-item" id="menuBack">
            ${icons.zpet} Zpět do menu
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

        document
        .getElementById("choice_confirm")
        .onclick=(e)=>{
            Settings.setChoiceConfirm(
                e.target.checked
            );
        };
                
        document
        .getElementById("quests_done_show")
        .onclick=(e)=>{
            Settings.setQuestsDoneShow(
                e.target.checked
            );
        };
        
        updateToggles();
        this.bindMenuTitle();
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
                <div class="menu-item" id="menuMain">
                    ${icons.zpet} Zpět do menu
                </div>
            `;
            document.getElementById("menuMain").onclick=()=>{
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
            <div class="legend-section">
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
            <div class="menu-item" id="menuMain">
                ${icons.zpet} Zpět do menu
            </div>
        `;
    
        document.getElementById("menuPanel").innerHTML=html;
    
        document.getElementById("menuMain").onclick=(e)=>{
            e.stopPropagation();
            this.showMain();
        };
        this.bindMenuTitle();
    },
    
    renderAbout(){
        document.getElementById("menuPanel").innerHTML=`
        <div class="menu-title">
            ${icons.info} O aplikaci
        </div>
        <p>
        RWAG Engine
        <br>
        Verze 0.3
        </p>
        <hr>
        <div class="menu-item" id="menuMain">
            ${icons.zpet} Zpět do menu
        </div>
        `;
        document.getElementById("menuMain").onclick = (e) => {
            e.stopPropagation();
            this.showMain();
        };
        this.bindMenuTitle();
    },

    renderRoles(){
        if(this.rolesPage==="detail"){
            this.renderRoleDetail();
            return;
        }
        if(this.rolesPage==="editor"){
            this.renderAssignedPlayersEditor();
            return;
        }
        const hasRoles =
            Engine.state.players &&
            Engine.state.players.some(
                p=>p.role
            );
        if(hasRoles){
            this.renderAssignedRoles();
        }else{
            this.renderPlayersEditor();
        }
        this.bindMenuTitle();
    },

    renderPlayersEditor(){
        const panel=document.getElementById("menuPanel");
        panel.innerHTML=`
        <div class="menu-title">
            ${icons.hraci}
            Správa hráčů
        </div>
        <div class="players-table">
            <div class="players-header">
                <div>Jméno</div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div id="playersList"></div>
        </div>
        <div id="playersAdd"></div>
        <hr>
        <div class="menu-item" id="menuMain">
            ${icons.zpet} Zpět do menu
        </div>
        `;
        this.renderPlayers();
        document.getElementById("menuMain").onclick=(e)=>{
            e.stopPropagation();
            this.showMain();
        };
        this.bindMenuTitle();
    },

    renderAssignedPlayersEditor(){
        const panel=document.getElementById("menuPanel");
            panel.innerHTML=`
        <div class="menu-title">
            ${icons.hraci}
            Správa hráčů a rolí
        </div>
            <div class="players-table">
                <div class="players-header">
                    <div>Jméno</div>
                    <div></div>
                    <div>Role</div>
                    <div></div>
                </div>
                <div id="assignedPlayersList"></div>
            </div>
        <div id="assignedPlayersAdd"></div>
        <hr>
        <div class="menu-item" id="menuBack">
            ${icons.zpet} Zpět na seznam hráčů
        </div>
        `;
        const list=document.getElementById("assignedPlayersList");
            Engine.state.players.forEach((player,index)=>{
        const row=document.createElement("div");
            row.className="player-row-editor";
            row.innerHTML=`        
        <div>
            <input 
            class="playerEditName"
            data-index="${index}"
            value="${player.name || ""}">
        </div>
        <div class="player-confirm-cell">
            <button
                class="confirmNameChange"
                data-index="${index}">
                ${icons.fajfka}
            </button>
        </div>
        <div>
            ${player.role?.name || "(není přidělená)"}
        </div>
        <div class="player-confirm-cell">
            <button
                class="confirmCancelPlayer"
                data-index="${index}">
                ${icons.krizek}
            </button>
        </div>
        `;
        list.appendChild(row);
        });

        const add=document.getElementById("assignedPlayersAdd");
        add.innerHTML="";
        
        const hasUnassignedPlayers =
            Engine.state.players.some(
                p =>
                    p.role == null &&
                    typeof p.name === "string" &&
                    p.name.trim() !== ""
            );
        
        // tlačítko +
        if(Engine.state.players.length < (Engine.game.players_max || 8)){
            add.innerHTML += `
                <button
                    id="addAssignedPlayer"
                    class="icon-button">
                    ${icons.plus}
                </button>
            `;
        }
        
        // tlačítko přidělit role
        add.innerHTML += `
            <button
                id="assignNewRolesButton"
                class="primary-button"
                ${hasUnassignedPlayers ? "" : "disabled"}>
                ${icons.kostka}
                Přidělit role novým hráčům
            </button>
        `;
        
        // onclick +
        const addPlayerBtn =
            document.getElementById("addAssignedPlayer");
        
        if(addPlayerBtn){
            addPlayerBtn.onclick=()=>{
                Engine.state.players.push({
                    name:"",
                    role:null,
                    confirmed:false,
                    newPlayer:true
                });
        
                this.renderAssignedPlayersEditor();
            };
        }
        
        // onclick role
        const assignBtn =
            document.getElementById("assignNewRolesButton");
        
        if(assignBtn){
            assignBtn.onclick=()=>{
                this.assignRolesToNewPlayers();
            };
        }
                
        document.getElementById("menuBack").onclick=()=>{
            const hasUnassignedPlayers =
                Engine.state.players.some(
                    p => !p.role
                );
            if(hasUnassignedPlayers){
                this.confirm(
                    "Někteří hráči zatím nemají přidělenou roli. Opravdu chcete opustit editor?",
                    ()=>{
                        this.rolesPage = "list";
                        this.renderRoles();
                    },
                    ()=>{
                        this.rolesPage = "editor";
                        this.renderRoles();
                    }
                );
                return;
            }
        
            this.rolesPage = "list";
            this.renderRoles();
        };

        document.querySelectorAll(".confirmNameChange")
        .forEach(button=>{
            button.onclick = ()=>{
                const index = button.dataset.index;
                
                const player = Engine.state.players[index];
                const input = document.querySelector(
                    `.playerEditName[data-index="${index}"]`
                );
                const newName = input.value.trim();
                if(!newName){
                    alert("Zadej jméno hráče");
                    return;
                }
                if(player.newPlayer){
                    this.savePlayerName(index,newName);
                    return;
                }
                const oldName = player.name;
                this.confirm(
                    `Skutečně chcete přejmenovat hráče <b>${oldName}</b> na <b>${newName}</b>?`,
                    
                    ()=>{
                        this.savePlayerName(index, newName);
                    },
                    ()=>{
                        this.rolesPage = "editor";
                        this.renderRoles();
                    }
                );
            };
        });

        document.querySelectorAll(".confirmCancelPlayer")
        .forEach(button=>{
            button.onclick = ()=>{
                const index = button.dataset.index;
                const player = Engine.state.players[index];

                const assignedPlayers =
                    Engine.state.players.filter(
                        p => p.role
                    ).length;
            
                const min =
                    Engine.game.players_min || 1;
            
                if(player.role && assignedPlayers <= min){
                    alert(
                        `Není dosažen minimálně počet hráčů nebo někteří z hráčů nemají přidělenou roli. Minimální počet hráčů s rolemi je ${min}.`
                    );
                    return;
                }
                
                if(player.newPlayer){
                    this.deletePlayer(index);
                    return;
                }
                
                const name = player.name;
                this.confirm(
                    `Skutečně chcete odstranit hráče <b>${name}</b>?`,
                    ()=>{
                        this.deletePlayer(index);
                    },
                    ()=>{
                        this.rolesPage = "editor";
                        this.renderRoles();
                    }
                );
            };
        });
        this.bindMenuTitle();
    },

    savePlayerName(index,newName){
        const player =
            Engine.state.players[index];
        player.name = newName;
        player.newPlayer = false;
        this.openPlayersEditor();
    },
    
    deletePlayer(index){
        Engine.state.players.splice(index,1);
        this.rolesPage = "editor";
        this.renderRoles();
    },
    
    renderAssignedRoles(){
        const panel =
            document.getElementById("menuPanel");
        const players =
            Engine.state.players || [];
        let html = `
            <div class="menu-title">
                ${icons.hraci}
                Hráči a jejich role
            </div>
            <div class="players-table">
                <div class="players-header">
                    <div>Jméno</div>
                    <div></div>
                    <div>Role</div>
                    <div>Info</div>
                </div>
                `;
                players.forEach((player,index)=>{
                    html += `
                        <div class="player-row-editor">
                            <div class="player-name-cell">
                                ${player.name}
                            </div>
                            <div></div>
                            <div class="player-role-cell">
                                ${player.role?.name || "(není přidělená)"}
                            </div>
                            <div class="player-confirm-cell">
                                <button
                                    class="roleInfo"
                                    data-role="${player.role?.id || ""}">
                                    ${icons.otaznik}
                                </button>
                            </div>
                        </div>
                    `;
                });
                    html += `
            </div>
                <button 
                    id="editPlayersButton"
                    class="primary-button">
                    ${icons.nastaveni}
                    Upravit hráče
                </button>
                <hr>
                <div class="menu-item" id="menuMain">
                    ${icons.zpet} Zpět do menu
                </div>
            `;
        panel.innerHTML = html;
        console.log(
            "EDIT BUTTON:",
            document.getElementById("editPlayersButton")
        );
        
        document.querySelectorAll(".roleInfo")
        .forEach(button=>{
            button.onclick=(e)=>{
                e.stopPropagation();
                const roleId =
                    button.dataset.role;
                console.log(
                    "DETAIL ROLE:",
                    roleId
                );
                this.selectedRole =
                    Engine.game.roles.find(
                        r=>r.id===roleId
                    );
                this.rolesPage="detail";
                this.renderRoles();
            };
        });
        
        document.getElementById("editPlayersButton").onclick=(e)=>{
            e.stopPropagation();
            console.log("KLIK NA UPRAVIT HRÁČE");
            this.rolesPage = "editor";
            this.renderRoles();
        };

        document.getElementById("menuMain").onclick=(e)=>{
            e.stopPropagation();
            this.showMain();
        };
        this.bindMenuTitle();
    },
        
    renderPlayers(){
        const list=document.getElementById("playersList");
        list.innerHTML="";
        
        const players=Engine.state.players || [];
        
        // Hotoví hráči
        players.forEach((player,index)=>{
            const row=document.createElement("div");
            row.className="player-row";
            row.innerHTML=`
                <div class="player-name-cell">
                    <input 
                        class="playerEditName"
                        data-index="${index}"
                        value="${player.name}">
                </div>
                <div class="player-role-cell">
                    ${player.role?.name || "-"}
                </div>
            `;
            list.appendChild(row);
        });
    
        // Rozpracovaní hráči
        Engine.state.pendingPlayers.forEach((player,index)=>{
            const row=document.createElement("div");
            row.className="player-row";
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
                        ? ""
                        : `
                            <button
                                class="confirmName"
                                data-index="${index}">
                                ${icons.fajfka}
                            </button>
                        `
                    }
                </div>
                <div class="player-role-cell">
                    <button
                        class="cancelPlayer"
                        data-type="pending"
                        data-index="${index}">
                        ${icons.krizek}
                    </button>
                </div>
            `;
            list.appendChild(row);
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
                console.log(
                    "PENDING:",
                    Engine.state.pendingPlayers
                );
                this.renderRoles();
            };
        });

        document.querySelectorAll(".cancelPlayer")
        .forEach(button=>{
            button.onclick=()=>{
                const type = button.dataset.type;
                const index = Number(button.dataset.index);
                if(type === "player"){
                    Engine.state.players.splice(index,1);
                }else{
                    Engine.state.pendingPlayers.splice(index,1);
                }
                this.renderRoles();
            };
        });
        
        // Plus dole
        const add = document.getElementById("playersAdd");
        const max = Engine.game.players_max || 8;
        const min = Engine.game.players_min || 1;
        const totalRows =
            players.length +
            Engine.state.pendingPlayers.length;
        const confirmedPending =
            Engine.state.pendingPlayers.filter(
                p =>
                    p.confirmed &&
                    p.name.trim() !== ""
            ).length;
        const totalPlayers =
            players.length + confirmedPending;
        const canAssign =
            totalPlayers >= min;
        
        add.innerHTML = "";
        
        // tlačítko +
        if(totalRows < max){
            add.innerHTML += `
                <button id="addPlayer" class="icon-button">
                    ${icons.plus}
                </button>
            `;
        }
        
        // tlačítko potvrdit
        add.innerHTML += `
            <button
                id="confirmPlayers" class="primary-button"
                ${canAssign ? "" : "disabled"}>
                ${icons.kostka}
                Potvrdit a přidělit role
            </button>
        `;

        const addBtn = document.getElementById("addPlayer");
        if(addBtn){
            addBtn.onclick = () => this.addPlayerForm();
        }
        
        document.getElementById("confirmPlayers").onclick = () => {
            this.confirm(
                "Nyní dojde k náhodnému přiřazení rolí jednotlivým hráčům. Přejete si pokračovat?",
                ()=>{
                    this.assignRoles();
                },
                ()=>{
                    this.showRoles();
                },
                ()=>{
                    this.renderRoles();
                }
            );
        };
        this.bindMenuTitle();
    },

    assignRolesToNewPlayers(){
        const roles =
            Engine.game.roles || [];
        const usedRoles =
            Engine.state.players
            .map(p=>p.role?.id)
            .filter(Boolean);
    
        Engine.state.players
        .filter(
            p =>
                !p.role &&
                p.name.trim() !== ""
        )
        .forEach(player=>{
            const available =
                roles.filter(
                    r =>
                    !usedRoles.includes(r.id)
                );
    
            if(available.length===0){
                return;
            }
    
            const role =
                available[
                    Math.floor(
                        Math.random() *
                        available.length
                    )
                ];
    
            player.role = role;
            usedRoles.push(role.id);
        });
    
        this.openPlayersEditor();
    },
    
    renderRoleDetail(){
        const role = this.selectedRole;
        if(!role){
            this.renderAssignedRoles();
            return;
        }

        document.getElementById("menuPanel").innerHTML=`
            <div class="menu-title">
                ${icons.role}
                ${role.name}
            </div>
            <div class="menu-description">
                ${role.character?.join("<br><br>") || ""}
            </div>
            <div class="menu-section">
                ${icons[role.advantages?.[0]?.icon] || icons.plus}
                Výhoda
            </div>
            <div class="menu-description">
                ${
                    role.advantages
                        ?.map(a=>a.text)
                        .join("<br><br>")
                    || ""
                }
            </div>
            <div class="menu-section">
                ${icons[role.disadvantages?.[0]?.icon] || icons.minus}
                Nevýhoda
            </div>
            <div class="menu-description">
                ${
                    role.disadvantages
                        ?.map(d=>d.text)
                        .join("<br><br>")
                    || ""
                }
            </div>
            <hr>
            <div class="menu-item" id="menuBack">
                ${icons.zpet} Zpět na seznam hráčů
            </div>
            <div class="menu-item" id="menuMain">
                ${icons.zpet} Zpět do menu
            </div>
        `;

        document.getElementById("menuBack").onclick=()=>{
            this.rolesPage="list";
            this.renderRoles();
        };
        
        document.getElementById("menuMain").onclick=()=>{
            this.showMain();
        };
        this.bindMenuTitle();
    },
    
    assignRoles(){
        const confirmed =
            Engine.state.pendingPlayers.filter(
                p=>p.confirmed
            );
        Engine.state.players = confirmed;
        Engine.state.pendingPlayers = [];
        // vytvoří kopii seznamu rolí
        const roles = [...Engine.game.roles];
        // náhodně je rozdá hráčům
        Engine.state.players.forEach(player=>{
            const index =
                Math.floor(
                    Math.random()*roles.length
                );
            player.role = roles[index];
            roles.splice(index,1);
        });
        this.playersMode="assigned";
        this.renderRoles();
    },
    
    addPlayerForm(){
        Engine.state.pendingPlayers.push({
            name:"",
            confirmed:false,
        });
        this.renderRoles();
    },

    showMain(){
        this.page="main";
        this.render();
    },
    
    showRoles(){
        this.page="roles";
        this.render();
    },

    confirm(text, yesCallback, noCallback){
        this.confirmYes = null;
        this.confirmNo = null;
        this.page = "confirm";
        this.confirmText = text;
        this.confirmYes = yesCallback;
        this.confirmNo = noCallback;
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
                    if(this.confirmNo){
                this.confirmNo();
            }else{
                this.showMain();
            }
        };
        this.bindMenuTitle();
    },

    openPlayersList(){
        this.page="roles";
        this.rolesPage="list";
        this.render();
    },
    
    openPlayersEditor(){
        this.page="roles";
        this.rolesPage="editor";
        this.render();
    }
    
};

window.Menu=Menu;
