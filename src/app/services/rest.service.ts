import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL } from 'src/environments/secret';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {
  
  private __baseURL : string = URL.baseURL;

  constructor(private __http:HttpClient, private __loading:LoadingService) { }
  
  /**
   * Do a http Post Request
   * @param body Body of the request
   * @param path Subpath of the request
   * @return Observable
   */
  protected postRequest(body:any, path:string){
    if(!path.includes("Refresh") )this.__loading.startLoading();
    return this.__http.post(this.__baseURL+path, body, {
      headers: this.basicHeaders()
    });
  }

  /**
   * Do a Http Get Request
   * @param path Path of the request
   * @param params Url params of the request
   * @return Observable
   */
  protected getRequest(path:string, params?:paramValue[]){
    this.__loading.startLoading();
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

  /**
   * Parse params to HttpParams
   * @param params Params to parse
   * @return HttpParams 
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
   * @return Basic headers
   */
  private basicHeaders(){
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
  }
}

/**
 * Interface to URL params
 */
interface paramValue{
  param:string;
  value:string;
}