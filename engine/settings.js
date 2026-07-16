// délka vibrací v ms
const SETTINGS_VIBRATION_TIME = 150;

const Settings = {

    init(){
        this.load();
    },

    set(key, value){
        localStorage.setItem(
            "rwag_" + key,
            value
        );
    },

    get(key, defaultValue){
        const value =
            localStorage.getItem(
                "rwag_" + key
            );
        return value === null
            ? defaultValue
            : value;
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
        this.set("font", font);
        this.updateFontButtons();
    },
   
    setFontSize(size){
        document.documentElement.style
            .setProperty(
                "--game-font-size",
                size + "px"
            );
        this.set("font_size", size);
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
        this.set("theme", theme);
        this.updateThemeButtons();
    },

    updateThemeButtons(){
        document
            .querySelectorAll(".theme-preview")
            .forEach(btn=>{
                btn.classList.remove("active");
            });
            const theme =
            this.get(
                "theme",
                "dark"
            );
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
            this.get(
                "font",
                "default"
            );
        document
            .getElementById(
                "font" +
                font.charAt(0).toUpperCase() +
                font.slice(1)
            )
            ?.classList.add("active");
    },

    setSound(value){
        this.set("sound", value);
    },

    getSound(){
        return this.get(
            "sound",
            true
        ) !== "false";
    },

    setVibration(value){
        this.set(
            "vibration",
            value
        );
        if(
            value &&
            navigator.vibrate
        ){
            navigator.vibrate(SETTINGS_VIBRATION_TIME);
        }
    },

    getVibration(){
        return this.get(
            "vibration",
            true
        ) !== "false";
    },
    
    load(){
        const theme =
            this.get(
                "theme",
                "dark"
            );

        document.body.classList.remove(
            "theme-dark",
            "theme-light",
            "theme-medieval",
            "font-default",
            "font-medieval",
            "font-typewriter"
        );
       
        document.body.classList.add(
            "theme-" + theme
        );

        const font =
            this.get(
                "font",
                "default"
            );

        document.body.classList.add(
            "font-" + font
        );

        const size =
            this.get(
                "font_size",
                16
            );

        document.documentElement.style
            .setProperty(
                "--game-font-size",
                size + "px"
            );
        
        if(this.get("sound", null) === null){
            this.set("sound", true);
        }

        if(this.get("vibration", null) === null){
            this.set("vibration", true);
        }
    }
};

window.Settings = Settings;
