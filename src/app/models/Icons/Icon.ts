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
        "firstColor": "black",
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
        "firstColor": "black",
        "secondColor": null
    };

    /**
     * Paper icon
     * For offial groups
     * Blue color
     * 
     * @static
     */
    static PAPER: IconModel = {
        "base": "fas",
        "firstIcon": "fa-file-invoice",
        "secondIcon": null,
        "firstColor": "#00008B",
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
}