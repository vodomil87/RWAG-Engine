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
