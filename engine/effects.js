const Effects = {

    apply(effects) {

        if (!effects) return;

        effects.forEach(effect => {

            switch (effect.type) {

                case "reputation":

                    Engine.state.reputation += effect.value;

                    if (window.Status) {
                        Status.render();
                    }

                    break;

            }

        });

    }

};

window.Effects = Effects;
