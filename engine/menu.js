console.log("MENU INIT");

const Menu = {

    open: false,

    init() {

        const button =
            document.getElementById(
                "menuButton"
            );

        if (!button) return;

        button.onclick = () => {

            this.toggle();

        };

    },

    toggle() {

        this.open = !this.open;

        if (this.open) {

            this.renderMain();

        }

        const panel =
            document.getElementById(
                "menuPanel"
            );

        panel.classList.toggle(
            "menu-open",
            this.open
        );

    },

    renderMain() {

        const panel =
            document.getElementById(
                "menuPanel"
            );

        if (!panel) return;

        const scenarioName =
            Engine.game?.scenarioName ||
            "Scénář";

        panel.innerHTML = `

<div class="menu-title">
📔 ${scenarioName}
</div>

<div class="menu-item">
${icons.role} Role
</div>

<div class="menu-item">
${icons.svitek} Úkoly
</div>

<div class="menu-item">
${icons.batoh} Inventář
</div>

<div class="menu-item">
${icons.knihy} Přehled pravidel
</div>

<div class="menu-item">
${icons.graf} Statistiky
</div>

<div class="menu-item">
${icons.disketa} Uložit / Načíst pozici
</div>

<div class="menu-item">
${icons.dvere} Ukončit scénář
</div>

<hr>

<div
    class="menu-item"
    id="settingsButton"
>
${icons.nastaveni} Nastavení ▶
</div>

<div class="menu-item">
${icons.info} O aplikaci
</div>

`;

        document
            .getElementById(
                "settingsButton"
            )
            .onclick = () => {

                this.renderSettings();

            };

    },

    renderSettings() {

        const panel =
            document.getElementById(
                "menuPanel"
            );

        panel.innerHTML = `

<div
    class="menu-item"
    id="backButton"
>
◀ Zpět
</div>

<hr>

<div class="menu-title">
${icons.nastaveni}
Nastavení
</div>

<div class="menu-section">
${icons.den_noc}
Barevné schéma
</div>

<div class="menu-buttons">

<button>Černé</button>

<button>Bílé</button>

<button>Pergamen</button>

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
max="30"
value="18"
style="width:100%"
>

<div class="menu-section">
${icons.zvonek}
Oznámení
</div>

<div class="menu-buttons">

<button>Zvuky ON</button>

<button>Vibrace ON</button>

</div>

`;

        document
            .getElementById(
                "backButton"
            )
            .onclick = () => {

                this.renderMain();

            };

    }

};

window.Menu = Menu;
