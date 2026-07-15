const Settings = {

    init(){
        this.load();
    },
    
    setTheme(theme){
        document.body.className =
            "theme-" + theme;
        localStorage.setItem(
            "rwag_theme",
            theme
        );
    },

    load(){
        const theme =
            localStorage.getItem("rwag_theme")
            || "dark";
        document.body.className =
            "theme-" + theme;
    }
};

window.Settings = Settings;
