const Settings = {
    theme: localStorage.getItem("theme") || "dark",
    init(){
        document.body.className = "theme-" + this.theme;
    },
    setTheme(theme){
        this.theme = theme;
        document.body.className = "theme-" + theme;
        localStorage.setItem(
            "theme",
            theme
        );
    }
};

window.Settings = Settings;
