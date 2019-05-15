import { Component } from '@angular/core';
import { AlertInfoType } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-info-alert',
  templateUrl: './info-alert.component.html',
  styles: []
})
/**
 * Class to fill the alert with an info message
 * 
 * @class
 */
export class InfoAlertComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The first line of the message
   * 
   * @access public
   * @var {string} msg1
   */
  public msg1:string;

  /**
   * The second line of the message
   * 
   * @access public
   * @var {string} msg2
   */
  public msg2:string;

  /**
   * The third line of the message
   * 
   * @access public
   * @var {string} msg3
   */
  public msg3:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} _alertS To get the info of the alert 
   */
  constructor(private _alertS:AlertService) {
    this._alertS.alertType.subscribe(
      type=>{
        let txt = this.getText(type);
        this.msg1 = txt[0];
        this.msg2 = txt[1];
        this.msg3 = txt[2];
      }
    ); 
  }
  

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Get the message for an specific alert info type
   * 
   * @access private
   * @param {AlertInfoType} type The type of the alert-info 
   */
  private getText(type:AlertInfoType){
    let msg;

    switch(type){
      case AlertInfoType.LOSTCONNECTIONERROR:{
        msg = [
          "Se ha perdido la conexión con el servidor.", 
          "Por favor, revisa tu conexión a internet.", 
          ""
        ];
        break;
      }
      case AlertInfoType.SERVERERROR:{
        msg = [
          "Ha habido interno del servidor, vuelva a intentarlo más tarde.", 
          "", ""
        ];
        break;
      }
      case AlertInfoType.VALIDATINGUSERERROR:{
        msg = [
          "Ha habido un error validando los datos, vuelva a intentarlo más tarde.", 
          "", ""
        ];
        break;
      }
      case AlertInfoType.EMAILTAKENERROR:{
        msg = [
          "El email con el que intenta registrarse ya está registrado", 
          "", ""
        ];
        break;
      }
      case AlertInfoType.VERIFICATIONSENT:{
        msg = [
          "Su registro se ha casi completado, solo es necesario un paso más.", 
          "Verifique su correo mediante el enlace que se le ha enviado al mismo.",
          ""
        ];
        break;
      }
      case AlertInfoType.SOCIALERROR:{
        msg = [
          "Ha habido un error con la red social con la que intentabas iniciar sesión",  
          "Vuelva a intentarlo más tarde.", 
          ""
        ];
        break;
      }
      case AlertInfoType.WRONGEMAILORPASSWORD:{
        msg = [
          "El correo o contraseña introducidos no son correctos.", 
          "Vuelva a intentarlo",
          ""
        ];
        break;
      }
      case AlertInfoType.NOTVALIDATEDYET:{
        msg = [
          "El correo no se ha validado aun, revise su correo.",
          "", ""
        ];
        break;
      }
      case AlertInfoType.CANTDELETEACCOUNT:{
        msg = [
          "No se pudo eliminar tu cuenta de usuario.", 
          "Vuelva a intentarlo más tarde.", 
          ""
        ];
        break;
      }
      case AlertInfoType.DELETEDACCOUNT:{
        msg = [
          "Sentimos que te vayas.", 
          "Ojalá vuelvas pronto.",
          ""
        ];
        break;
      }
      case AlertInfoType.SESSIONEXPIRED:{
        msg = [
          "Tu sesión ha expirado.", 
          "Vuelva a registrarte", 
          ""
        ];
        break;
      }
      case AlertInfoType.LIMITATIONSPECIFICCREATEGROUP:{
        msg = [
          "No puedes crear más grupos de este tipo.", 
          "Si deseas crear más grupos de este tipo dirigete a la tienda.", 
          ""
        ];
        break;
      }
      case AlertInfoType.LIMITATIONCREATEGROUP:{
        msg = [
          "No puedes crear más grupos de ningún tipo.", 
          "Si deseas crear más grupos dirigete a la tienda.", 
          ""
        ];
        break;
      }
      case AlertInfoType.INCORRECTOLDPASSWORD:{
        msg = [
          "La contraseña es incorrecta", 
          "", ""
        ];
        break;
      }
      case AlertInfoType.PASSWORDCHANGED:{
        msg = [
          "Tu contraseña ha cambiado", 
          "", ""
        ];
        break;
      }
      case AlertInfoType.SUCCESFULLBUY:{
        msg = [
          "Tu compra se ha realizado con exito.", 
          "", ""
        ];
        break;
      }
      case AlertInfoType.ERRORBUY:{
        msg = [
          "Hubo un error en tu compra.",
          "IMPLEMNTAR QUE PASA AQUI.",
          ""
        ];
        break;
      }
      case AlertInfoType.ENABLEDGROUPPASSWORD:{
        msg = [
          "Ya puedes poner una contraseña al grupo.", 
          "Dirigete tu o el administrador del grupo a la sección de información del grupo para escribir la nueva contraseña.",
          ""
        ];
        break;
      }
      case AlertInfoType.INCORRECTPASSWORDJOININGGROUP:{
        msg = [
          "La contraseña que has introducido para unirte al grupo es incorrecta.",
          "", ""
        ];
        break;
      }
      case AlertInfoType.SUCCESFULLJOINGROUP:{
        msg = [
          "Enhorabuena, ya formas parte del grupo",
          "Disfruta y sé respetuoso",
          ""
        ];
        break;
      }
      case AlertInfoType.SUCCESFULLCREATEDGROUP:{
        msg = [
          "Enhorabuena, has creado tu propio grupo.",
          "Disfrutalo!",
          ""
        ];
        break;
      }
      case AlertInfoType.MAXGROUPJOINREACHED:{
        msg = [
          "No puedes unirte al grupo. Has alcanzado el máximo número de grupos a los que puedes añadirte.",
          "Salte de alguno de ellos o compra más espacios de grupo a los que unirte.",
          ""
        ];
        break;
      }
      default:{
        msg = [ "", "", "" ];
        break;
      }
    }
    return msg;
  }
}
