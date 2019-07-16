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
    SOCIALPASSWORD = "SOCIALPASSWORD",

    /**
     * @summary Alerts to do a football bet
     */
    FOOTBALLBET = "FOOTBALLBET",

    /**
     * @summary Alerts to cancel a user football bet
     */
    CANCELUSERFOOTBALLBET = "CANCELUSERFOOTBALLBET",

    /**
     * @summary Alerts to see the groups of an user and
     * their info
     */
    SEEUSERGROUPS_ADMIN = "SEEUSERGROUPS_ADMIN",

    /**
     * @summary Alerts to see the members of a group and
     * their info
     */
    SEEGROUPMEMBERS_ADMIN = "SEEGROUPMEMBERS_ADMIN",

    /**
     * @summary Alerts when the admin of a group want
     * to cancell a user bet
     */
    CANCELFOOTBALLBET = "CANCELFOOTBALLBET"
}