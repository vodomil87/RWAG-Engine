const UI = {

    root: null,

    init() {

        console.log("UI init");

        this.root = document.getElementById("game");

        if (!this.root) {
            console.error("❌ #game element nenalezen!");
        }
    },

    renderScene(scene) {

        if (!this.root) {
            console.error("UI root není připraven");
            return;
        }

        this.root.innerHTML = "";

        if (scene.image) {
            this.root.appendChild(
                this.createSceneImage(scene.image)
            );
        }

        this.renderText(scene);
        this.renderChoices(scene);
        Status.render();
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

            const icon = icons?.[choice.icon] || "";
            const text = Array.isArray(choice.text)
                ? choice.text.join(" ")
                : choice.text;

            btn.innerText = `${icon} ${text}`;

            btn.onclick = () => {
                Engine.gotoScene(choice.goto);
            };

            this.root.appendChild(btn);
        });
    },

    createSceneImage(imageName) {

        const img = document.createElement("img");

        img.src = `images/${imageName}`;
        img.className = "scene-image";

        img.onerror = () => {
            console.error("Obrázek nenalezen:", img.src);
    };

    return img;
    }
};
