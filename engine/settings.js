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
        
        document
            .querySelectorAll(".theme-preview")
            .forEach(btn=>{
                btn.classList.remove("active");
            });
        
        document
            .getElementById(
                "theme" +
                theme.charAt(0).toUpperCase() +
                theme.slice(1)
            )
            ?.classList.add("active");
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
