const Settings = {

    init(){
        this.load();
    },

    setFont(font){
        document.body.classList.remove(
            "font-default",
            "font-medieval",
            "font-typewriter"
        );
        document.body.classList.add(
            "font-" + font
        );
        localStorage.setItem(
            "rwag_font",
            font
        );
        document
        .querySelectorAll(".font-preview")
        .forEach(btn=>{
            btn.classList.remove("active");
        });
        document
        .getElementById(
            "font" +
            font.charAt(0).toUpperCase() +
            font.slice(1)
        )
        ?.classList.add("active");
    },
    
    setTheme(theme){
        document.body.classList.remove(
            "theme-dark",
            "theme-light",
            "theme-medieval"
        );

        document.body.classList.add(
            "theme-" + theme
        );

        localStorage.setItem(
            "rwag_theme",
            theme
        );

        this.updateThemeButtons();
    },

    updateThemeButtons(){
        document
            .querySelectorAll(".theme-preview")
            .forEach(btn=>{
                btn.classList.remove("active");
            });
        const theme =
            localStorage.getItem("rwag_theme")
            || "dark";
        document
            .getElementById(
                "theme" +
                theme.charAt(0).toUpperCase() +
                theme.slice(1)
            )
            ?.classList.add("active");
    },

    updateFontButtons(){
        document
            .querySelectorAll(".font-preview")
            .forEach(btn=>{
                btn.classList.remove("active");
            });
        const font =
            localStorage.getItem("rwag_font")
            || "default";
        document
            .getElementById(
                "font" +
                font.charAt(0).toUpperCase() +
                font.slice(1)
            )
            ?.classList.add("active");
    },
    
    load(){
        const theme =
            localStorage.getItem("rwag_theme")
            || "dark";

        document.body.className =
            "theme-" + theme;

        const font =
            localStorage.getItem("rwag_font")
            || "default";

        document.body.classList.add(
            "font-" + font
        );
    }
};

window.Settings = Settings;
