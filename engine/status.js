const Status = {

    render() {

        const bar = document.getElementById("status");

        if (!bar) return;

        let rep = Engine.state.reputation;

        let icon;

        if (rep > 0) {

            icon = icons.rep_pos;

        } else if (rep < 0) {

            icon = icons.rep_neg;

        } else {

            icon = icons.rep_neu;

        }

        let text = rep > 0
            ? `+${rep}`
            : `${rep}`;

        bar.innerHTML = `
            <button id="menuButton">
                ${icons.menu}
            </button>

            <div class="status-right">
                ${icon} ${text}
            </div>
        `;

        Menu.init();

    }

};
