const UI = {

    root: null,

    init() {
        this.root = document.getElementById("game");
    },

    renderScene(scene) {

        this.root.innerHTML = "";

        this.renderText(scene);
        this.renderChoices(scene);

    },

    renderText(scene) {

        const div = document.createElement("div");
        div.className = "text";

        if (Array.isArray(scene.text)) {
            div.innerHTML = scene.text.join("<br><br>");
        } else {
            div.innerText = scene.text;
        }

        this.root.appendChild(div);
    },

    renderChoices(scene) {

        if (!scene.choices) return;

        scene.choices.forEach(choice => {

            const btn = document.createElement("button");
            btn.className = "choice";

            const icon = choice.icon || "";
            const text = Array.isArray(choice.text)
                ? choice.text.join(" ")
                : choice.text;

            btn.innerText = `${icon} ${text}`;

            btn.onclick = () => {
                Engine.gotoScene(choice.goto);
            };

            this.root.appendChild(btn);
        });
    }
};
