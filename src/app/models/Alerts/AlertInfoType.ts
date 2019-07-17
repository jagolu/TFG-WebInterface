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
     * @summary When a user tries to access to a functionality
     * not available to its role
     */
    NOTVALIDROLE = "NOTVALIDROLE",
  
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
     * @summary Error message, when a user tries to log with
     * a social media but he never did the signUp form
     */
    NOTSOCIALSIGNYET = "NOTSOCIALSIGNYET",
  
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
    LIMITATIONSPECIFICCREATEGROUP = "LIMITATIONSPECIFICCREATEGROUP",

    /**
     * @summary Error message when the user tries to create a new group
     * but he can't create any more group of any type. Should buy
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
    SUCCESFULLJOINGROUP = "SUCCESFULLJOINGROUP",

    /**
     * @summary Error message, when someone tries to join in a group but
     * he is joined in his maximun number of groups
     */
    MAXGROUPJOINREACHED = "MAXGROUPJOINREACHED",

    /**
     * @summary Success message, when someone creates a new group succesfully
     */
    SUCCESFULLCREATEDGROUP = "SUCCESFULLCREATEDGROUP",

    /**
     * @summary Error message, when a user tries to remember a password in a 
     * email which doesn't exist
     */
    EMAILDONTEXIST = "EMAILDONTEXIST",

    /**
     * @summary Error message, when a user tries to remember a password in a 
     * more than once in a day
     */
    CANTCHANGEPASSTODAY = "CANTCHANGEPASSTODAY",

    /**
     * @summary success message, when a user tries a remember a password, this 
     * message says that the user has an email
     */
    SUCCESSPASSWORDEMAIL = "SUCCESSPASSWORDEMAIL",

    /**
     * @summary success message, when a removes a group
     */
    SUCCESFULLGROUPREMOVED = "SUCCESFULLGROUPREMOVED",

    /**
     * @summary Success message, when a user leaves a group
     */
    SUCCESFULLGROUPLEAVE = "SUCCESFULLGROUPLEAVE",

    /**
     * @summary Success message, when a user launchs a football bet
     */
    SUCCESFULLFOOTBALLBET = "SUCCESFULLFOOTBALLBET",

    /**
     * @summary Info message when a user tries to launch
     * a bet which min bet is higher that his actual coins
     */
    BETHIGHERTHANYOURCOINS = "BETHIGHERTHANYOURCOINS",

    /**
     * @summary Error message when a user tries to do
     * a football bet but this one is already cancelled
     */
    BETCANCELLED = "BETCANCELLED",

    /**
     * @summary Error message when a user tries to do
     * a football bet but this one is already ended
     */
    BETENDED = "BETENDED",

    /**
     * @summary Error message when a user tries to do
     * a football bet but the time to bet is passed
     */
    BETLASTBETPASSED = "BETLASTBETPASSED",

    /**
     * @summary Success message when a user do 
     * succesfully a user football bet
     */
    SUCCESFULLDOFOOTBALLBET = "SUCCESFULLDOFOOTBALLBET",

    /**
     * @summary Error message when a user tries to cancel
     * a user football bet bet the football bet is cancelled
     */
    CANCELBETCANCELLED = "CANCELBETCANCELLED",

    /**
     * @summary Error message when a user tries to cancel
     * a user football bet but the football bet is already ended
     */
    CANCELBETENDED = "CANCELBETENDED",

    /**
     * @summary Error message when a user tries to cancel
     * a user football bet but the time to bet in the football 
     * bet is passed
     */
    CANCELBETLASTBETPASSED = "CANCELBETLASTBETPASSED",

    /**
     * @summary Success message when a user cancels 
     * succesfully a user football bet
     */
    SUCCESFULLCANCELFOOTBALLBET = "SUCCESFULLCANCELFOOTBALLBET",

    /**
     * @summary Error message when an user tries to log in the app
     * but he is banned
     */
    YOUREBANNED = "YOUREBANNED",

    /**
     * @summary Error message when an user tries to do a 
     * group request, but the group is banned
     */
    GROUPBANNED = "GROUPBANNED",

    /**
     * @summary Success message when a user creates a
     * direct message conversation
     */
    DMCREATED = "DMCREATED",

    /**
     * @summary Success message when an admin bans
     * a user
     */
    USERSUCCESFULLYBANNED = "USERSUCCESFULLYBANNED",

    /**
     * @summary Success message when an admin UNbans
     * a user
     */
    USERSUCCESFULLYUNBANNED = "USERSUCCESFULLYUNBANNED",

    /**
     * @summary Success message when an admin bans 
     * a group
     */
    GROUPSUCCESFULLYBANNED = "GROUPSUCCESFULLYBANNED",

    /**
     * @summary Success message when an admin UNbans 
     * a group
     */
    GROUPSUCCESFULLYUNBANNED = "GROUPSUCCESFULLYUNBANNED"
  }