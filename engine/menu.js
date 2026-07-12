const Menu = {

    open: false,

    init() {

        const button = document.getElementById("menuButton");

        if (!button) return;

        button.onclick = () => {

            this.toggle();

        };

    },

    toggle() {

        this.open = !this.open;

        const panel = document.getElementById("menuPanel");

        if (!panel) return;

        panel.style.display = this.open
            ? "block"
            : "none";

    }

};

panel.innerHTML = `
<b>${Engine.game.scenarioName}</b>
<hr>

${icons.role} Role

<br>

${Engine.state.reputation > 0 ? icons.rep_pos :
Engine.state.reputation < 0 ? icons.rep_neg :
icons.rep_neu}
 Reputace

<br>

${icons.batoh} Inventář

<br>

${icons.svitek} Úkoly

<br>

${icons.knihy} Přehled pravidel

<br>

${icons.graf} Statistiky

<br>

${icons.disketa} Uložit / Načíst

<br>

${icons.dvere} Ukončit scénář
`;
