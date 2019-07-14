import { IconModel } from './IconModel';

/**
 * Class to save the characteristics of every icon
 * 
 * @class
 */
export class Icons{

    /**
     * Wizard icon
     * When an user is admin of the group
     * 
     * @static
     */
    static WIZARD:IconModel = {
        "base": "fas",
        "firstIcon": "fa-hat-wizard",
        "secondIcon": null,
        "firstColor": "#3D91ED",
        "secondColor": null
    };

    /**
     * Crown icon.
     * When an user is the maker of the group
     * 
     * @static
     */
    static CROWN: IconModel = {
        "base": "fas",
        "firstIcon": "fa-crown",
        "secondIcon": null,
        "firstColor": "#E7A81E",
        "secondColor": null
    };

    /**
     * Ball icon
     * For virtual groups
     * Green color
     * 
     * @static
     */
    static BALL: IconModel = {
        "base": "fas",
        "firstIcon": "fa-futbol",
        "secondIcon": null,
        "firstColor": "#006400",
        "secondColor": null
    };

    /**
     * Cross icon
     * For close alerts
     * Red color
     * 
     * @static
     */
    static CROSS: IconModel = {
        "base": "far",
        "firstIcon": "fa-times-circle",
        "secondIcon": null,
        "firstColor": "#C75050",
        "secondColor": null
    };

    /**
     * Key icon
     * For groups with password
     * Yellow-orange color
     * 
     * @static
     */
    static KEY: IconModel = {
        "base": "fas",
        "firstIcon": "fa-key",
        "secondIcon": null,
        "firstColor": "#FECA4E",
        "secondColor": null
    };

    /**
     * Icon of an eye open and a eye closed
     * swaping when clicks on it
     * For see the input passwords
     * Black & Blue color
     * 
     * @static
     */
    static EYE_OPEN_CLOSE: IconModel = {
        "base": "far",
        "firstIcon": "fa-eye",
        "secondIcon": "fa-eye-slash",
        "firstColor": "black",
        "secondColor": "#407dbf"
    };

    /**
     * Classic user icon
     * Black color
     * 
     * @static
     */
    static USER: IconModel = {
        "base": "fas",
        "firstIcon": "fa-user-alt",
        "secondIcon": null,
        "firstColor": "black",
        "secondColor": null
    };

    /**
     * Classic cog icon
     * Black color
     * 
     * @static
     */
    static COG: IconModel = {
        "base": "fas",
        "firstIcon": "fa-cog",
        "secondIcon": null,
        "firstColor": "black",
        "secondColor": null
    };

    /**
     * Icon of an "i"
     * Black color
     * 
     * @static
     */
    static INFO: IconModel = {
        "base": "fas",
        "firstIcon": "fa-info-circle",
        "secondIcon": null,
        "firstColor": "#228BD7",
        "secondColor": null
    };

    /**
     * Icon of a coin
     * Yellow color
     * 
     * @static
     */
    static COIN: IconModel = {
        "base": "fas",
        "firstIcon": "fa-coins",
        "secondIcon": null,
        "firstColor": "#DAA520",
        "secondColor": null
    };

    /**
     * Icon of a bell
     * Light grey color
     * 
     * @static
     */
    static BELL: IconModel = {
        "base": "fas",
        "firstIcon": "fa-bell",
        "secondIcon": null,
        "firstColor": "#696464",
        "secondColor": null
    };
}