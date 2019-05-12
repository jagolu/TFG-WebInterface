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
    DELETEACCOUNT = "DELETEACCOUNT"
}