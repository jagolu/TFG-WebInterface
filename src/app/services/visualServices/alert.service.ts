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
    let msg;

    switch(type){
      case AlertType.LOSTCONNECTIONERROR:{
        msg = ["Se ha perdido la conexión con el servidor.", "Por favor, revisa tu conexión a internet."];
        break;
      }
      case AlertType.SERVERERROR:{
        msg = ["Ha habido interno del servidor, vuelva a intentarlo más tarde."];
        break;
      }
      case AlertType.VALIDATINGUSERERROR:{
        msg = ["Ha habido un error validando los datos, vuelva a intentarlo más tarde."];
        break;
      }
      case AlertType.EMAILTAKENERROR:{
        msg = ["El email con el que intenta registrarse ya está registrado"];
        break;
      }
      case AlertType.VERIFICATIONSENT:{
        msg = ["Su registro se ha casi completado, solo es necesario un paso más.", "Verifique su correo mediante el enlace que se le ha enviado al mismo."];
        break;
      }
      case AlertType.SOCIALERROR:{
        msg = ["Ha habido un error con la red social con la que intentabas iniciar sesión",  "Vuelva a intentarlo más tarde."];
        break;
      }
      case AlertType.WRONGEMAILORPASSWORD:{
        msg = ["El correo o contraseña introducidos no son correctos.", "Vuelva a intentarlo"];
        break;
      }
      case AlertType.NOTVALIDATEDYET:{
        msg = ["El correo no se ha validado aun, revise su correo."];
        break;
      }
      case AlertType.CANTDELETEACCOUNT:{
        msg = ["No se pudo eliminar tu cuenta de usuario.", "Vuelva a intentarlo más tarde."];
        break;
      }
      case AlertType.DELETEDACCOUNT:{
        msg = ["Sentimos que te vayas.", "Ojalá vuelvas pronto."];
        break;
      }
      case AlertType.SESSIONEXPIRED:{
        msg = ["Tu sesión ha expirado.", "Vuelva a registrarte"];
        break;
      }
      case AlertType.LIMITATIONCREATEGROUP:{
        msg = ["No puedes crear más grupos de este tipo.", "Si deseas crear más grupos dirigete a la tienda."];
        break;
      }
      case AlertType.INCORRECTOLDPASSWORD:{
        msg = ["La contraseña es incorrecta"];
        break;
      }
      case AlertType.PASSWORDCHANGED:{
        msg = ["Tu contraseña ha cambiado"];
        break;
      }
      case AlertType.SUCCESFULLBUY:{
        msg = ["Tu compra se ha realizado con exito."];
        break;
      }
      case AlertType.ERRORBUY:{
        msg = ["Hubo un error en tu compra. IMPLEMNTAR QUE PASA AQUI."];
        break;
      }
      default:{
        msg = [ "" ];
        break;
      }
    }
    return msg;
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