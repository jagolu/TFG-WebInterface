import { LoadingService } from 'src/app/services/visualServices/loading.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL } from 'src/environments/secret';

/**
 * Class to define the basic request
 * 
 * @class 
 */
export class Rest {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The base url of the API Request
   * 
   * @access private
   * @readonly
   * @var {string} __baseURL
   */
  private readonly __baseURL : string = URL.baseURL;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} __http 
   * @param {LoadingService} __loading 
   */
  constructor(private __http:HttpClient, private __loading:LoadingService) { }
  

  //
  // ────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R O T E C T E D   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do a http Post Request
   * 
   * @access protected
   * @param {Object} body Body of the request
   * @param {string} path Subpath of the request
   * @param {boolean} [notStartLoad] A filter to start the loading animation or not
   * @return {Observable} The result of the request
   */
  public postRequest(body:any, path:string, notStartLoad?:boolean){
    if(!notStartLoad) this.__loading.startLoading();
    return this.__http.post(this.__baseURL+path, body, {
      headers: this.basicHeaders()
    });
  }

  /**
   * Do a Http Get Request
   * 
   * @access protected
   * @param {string} path Path of the request
   * @param {ParamValue[]} params Url params of the request
   * @param {boolean} [notStartLoad] A filter to start the loading animation or not
   * @return {Observable} The result of the request
   */
  public getRequest(path:string ,params?:paramValue[], notStartLoad?:boolean){
    if(!notStartLoad) this.__loading.startLoading();
    let options = params ? 
      {
        params: this.params(params),
        headers:this.basicHeaders()
      } : 
      {
        headers:this.basicHeaders()
      };

    return this.__http.get(this.__baseURL+path,options);
  }

  
  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Parse params to HttpParams
   * 
   * @access private
   * @param {paramValue[]} params Params to parse
   * @return {HttpParams} The parsed params
   */
  private params(params:paramValue[]):HttpParams{
    let urlParams : HttpParams = new HttpParams();
    params.forEach(param => {
      urlParams = urlParams.append(param.param, param.value);
    });
    return urlParams;
  }

  /**
   * Get Basic Headers
   * 
   * @access private
   * @return {HttpHeaders} The basic params for a basic request
   */
  private basicHeaders(){
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
  }
}


//
// ──────────────────────────────────────────────────────────────────────
//   :::::: I N T E R F A C E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
//

/**
 * The URL params
 * 
 * @interface
 */
interface paramValue{
  /**
   * The name of the param
   * 
   * @var {string} param 
   */
  param:string;

  /**
   * The value of the param
   * 
   * @var {string} value
   */
  value:string;
}