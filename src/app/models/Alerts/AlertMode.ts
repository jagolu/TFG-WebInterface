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
     * @summary For alerts to join in a group
     */
    JOINGROUP = "JOINGROUP",

    /**
     * @summary Alerts to create a new bet in a virtual group
     */
    CREATEVIRTUALBET = "CREATEVIRTUALBET",

    /**
     * @summary Alerts to create a new bet in a official group
     */
    CREATEOFFICIALBET = "CREATEOFFICIALBET"
}