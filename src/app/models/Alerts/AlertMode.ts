/**
 * The mode of the alert
 * 
 * @enum
 */
export enum AlertMode{
    /**
     * @summary For alerts to show just a text message
     */
    ALERTINFO = "ALERTINFO",

    /**
     * @summary For alerts to show a form to create a
     * new group
     */
    CREATEGROUP = "CREATEGROUP",

    /**
     * @summary For alerts to show a form to delete a
     * user account
     */
    DELETEACCOUNT = "DELETEACCOUNT",

    /**
     * @summary For alerts to show a form to delete a group
     */
    DELETEGROUP = "DELETEGROUP",

    /**
     * @summary For alerts to join in a group
     */
    JOINGROUP = "JOINGROUP",

    /**
     * @summary Alerts to set a password from a social sign
     */
    SOCIALPASSWORD = "SOCIALPASSWORD"
}