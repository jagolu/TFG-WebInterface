import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
/**
 * Basic class to the alert services
 * 
 * @class
 */
export class AlertService {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The lines text of the message to show
   * 
   * @access private
   * @var {HTMLElement[]} txtMessage
   */
  private txtMessage;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { 
    this.txtMessage = [
      (document.querySelector("#alertTextId1") as HTMLElement),
      (document.querySelector("#alertTextId2") as HTMLElement),
      (document.querySelector("#alertTextId3") as HTMLElement)
    ];
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Open the Alert with the message associated to the specific AlerType
   * 
   * @access public
   * @param {AlertType} type The type of the alert 
   */
  public openAlert(type:AlertType){
    let txt = this.getText(type);
    for(let line of this.txtMessage) line.style.display = "none"; 
    for(let i=0;i<txt.length;i++){
      this.txtMessage[i].textContent = txt[i];
      this.txtMessage[i].style.display = "block";
    }
    (document.querySelector("#alertButton") as HTMLElement).click();
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Get the message for an specific AlertType
   * 
   * @access private
   * @param {AlertType} type The alert type
   * @return {string} The text message for the alertType 
   */
  private getText(type:AlertType){
    if(type == AlertType.LOSTCONNECTIONERROR) {
      return ["Se ha perdido la conexión con el servidor.",
            "Por favor, revisa tu conexión a internet."]
    }
    else if(type == AlertType.SERVERERROR) {
      return ["Ha habido interno del servidor, vuelva a intentarlo más tarde."];
    }
    else if(type == AlertType.VALIDATINGUSERERROR) {
      return ["Ha habido un error validando los datos, vuelva a intentarlo más tarde."];
    }
    else if(type == AlertType.EMAILTAKENERROR) {
      return ["El email con el que intenta registrarse ya está registrado"];
    }
    else if(type == AlertType.VERIFICATIONSENT) {
      return ["Su registro se ha casi completado, solo es necesario un paso más.",
        "Verifique su correo mediante el enlace que se le ha enviado al mismo."];
    }
    else if(type == AlertType.SOCIALERROR){
      return [`Ha habido un error con la red social con la que intentabas iniciar sesión`, 
            `vuelva a intentarlo más tarde.`];
    }
    else if(type == AlertType.WRONGEMAILORPASSWORD){
      return ["El correo o contraseña introducidos no son correctos.",
          "Vuelva a intentarlo"];
    }
    else if(type == AlertType.NOTVALIDATEDYET){
      return ["El correo no se ha validado aun, revise su correo."];
    }
    else if(type == AlertType.CANTDELETEACCOUNT){
      return ["No se pudo eliminar tu cuenta de usuario.",
              "Vuelva a intentarlo más tarde."];
    }
    else if(type == AlertType.DELETEDACCOUNT){
      return ["Sentimos que te vayas.",
              "Ojalá vuelvas pronto."];
    }
    else if(type == AlertType.SESSIONEXPIRED){
      return ["Tu sesión ha expirado.",
              "Vuelva a registrarte"];
    }
    else if(type == AlertType.LIMITATIONCREATEGROUP){
      return ["No puedes crear más grupos de este tipo.",
              "Si deseas crear más grupos dirigete a la tienda."]
    }
    else if(type == AlertType.INCORRECTOLDPASSWORD){
      return ["La contraseña es incorrecta"];
    }
    else if(type == AlertType.PASSWORDCHANGED){
      return ["Tu contraseña ha cambiado"];
    }
    else if(type == AlertType.SUCCESFULLBUY){
      return ["Tu compra se ha realizado con exito."];
    }
    else if(type == AlertType.ERRORBUY){
      return ["Hubo un error en tu compra. IMPLEMNTAR QUE PASA AQUI."];
    }
  }
}


//
// ────────────────────────────────────────────────────────────
//   :::::: E N U M S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────
//

/**
 * The alert codes
 * 
 * @enum
 */
export enum AlertType{
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
  ERRORBUY = "ERRORBUY"
}