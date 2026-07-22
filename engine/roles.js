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
    },

    assign(roles, count=1){

        console.log(
            "ASSIGN ROLES",
            count
        );

        const shuffled =
            [...roles]
            .sort(
                ()=>Math.random()-0.5
            );

        return shuffled.slice(
            0,
            count
        );
    }
};

window.Roles=Roles;
