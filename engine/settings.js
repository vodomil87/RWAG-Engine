const Settings = {
    setTheme(theme){
        document.body.className = "theme-" + theme;
        localStorage.setItem(
            "rwag_theme",
            theme
        );
        console.log(
            "THEME SET:",
            theme
        );
    },

    load(){
        const theme =
            localStorage.getItem(
                "rwag_theme"
            )
            || "dark";
        document.body.className =
            "theme-" + theme;
        console.log(
            "THEME LOADED:",
            theme
        );
    }
};

window.Settings = Settings;
