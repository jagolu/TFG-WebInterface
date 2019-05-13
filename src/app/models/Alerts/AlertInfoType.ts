/**
 * The alert info codes
 * 
 * @enum
 */
export enum AlertInfoType{
    /**
     * @summary Request state 0 (Lost Connection)
     */
    LOSTCONNECTIONERROR = "LOSTCONNECTIONERROR",
  
    /**
     * @summary Request state 500 (Internal Server Error)
     */
    SERVERERROR = "SERVERERROR",
  
    /**
     * @summary Error validating the signUp or logIn form
     */
    VALIDATINGUSERERROR = "VALIDATINGUSERERROR",
  
    /**
     * @summary Error by trying to take an existing email
     */
    EMAILTAKENERROR = "EMAILTAKENERROR",
  
    /**
     * @summary Success message, received when the sign was ok
     */
    VERIFICATIONSENT = "VERIFICATIONSENT",
  
    /**
     * @summary Error with Facebook or Google
     */
    SOCIALERROR = "SOCIALERROR",
  
    /**
     * @summary The email or the password are incorrect
     */
    WRONGEMAILORPASSWORD = "WRONGEMAILORPASSWORD",
  
    /**
     * @summary Error when the user tries to log when an account that
     * isn't validated yet
     */
    NOTVALIDATEDYET = "NOTVALIDATEDYET",
  
    /**
     * @summary Error when the system tries to delete an user account
     */
    CANTDELETEACCOUNT = "CANTDELETEACCOUNT",
  
    /**
     * @summary Success message, the user account was deletec succesfully
     */
    DELETEDACCOUNT = "DELETEDACCOUNT",
  
    /**
     * @summary Error when the user token has expired
     */
    SESSIONEXPIRED = "SESSIONEXPIRED",
  
    /**
     * @summary Error when the user tries to create a new group and
     * he can't create more groups of these type
     */
    LIMITATIONCREATEGROUP = "LIMITATIONCREATEGROUP",
  
    /**
     * @summary Error in the field of "repeat password"
     */
    INCORRECTOLDPASSWORD = "INCORRECTOLDPASSWORD",
  
    /**
     * @summary Success message, when the user changes the password and it 
     * ended fine
     */
    PASSWORDCHANGED = "PASSWORDCHANGED",
  
    /**
     * @summary Success message, when a buy was fine.
     */
    SUCCESFULLBUY = "SUCCESFULLBUY",
  
    /**
     * @summary Error message, when something was wrong in a buy
     */
    ERRORBUY = "ERRORBUY",
  
    /**
     * @summary Success message, when someone buy a password to a
     * group and the buy was fine.
     */
    ENABLEDGROUPPASSWORD = "ENABLEDGROUPPASSWORD",

    /**
     * @summary Error message, when someone tries to join in a group
     * with an incorrect password
     */
    INCORRECTPASSWORDJOININGGROUP = "INCORRECTPASSWORDJOININGGROUP",

    /**
     * @summary Success message, when someone join in a group succesfully
     */
    SUCCESFULLJOINGROUP = "SUCCESFULLJOINGROUP"
  }