const Roles = {

    async load(roleSet){
        console.log(
            "LOAD ROLES:",
            roleSet
        );

        const response = await fetch(
            roleSet
        );

        if(!response.ok){
            throw new Error(
                "Nelze načíst role: " + roleSet
            );
        }

        const data =
            await response.json();

        console.log(
            "ROLES LOADED:",
            data
        );

        return data.roles;
    }
};

window.Roles=Roles;
