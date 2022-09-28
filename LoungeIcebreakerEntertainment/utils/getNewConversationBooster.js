const iceBreakers = require("../../../icebreakers.json");

export const getNewConversationBooster = (booster, setBooster, e, isTyped = false) => {

    if (e && !isTyped) {
        e.stopPropagation();
    }

    if (booster && setBooster) {
        let { position, clicks } = booster;
        let { icebreakers } = iceBreakers;

        if (position === icebreakers.length) {
            setBooster({
                booster: icebreakers[0],
                position: 1,
                clicks: clicks + 1,
            });
        } else {
            setBooster({
                booster: icebreakers[position],
                position: position + 1,
                clicks: clicks + 1,
            });
        }
    }

};