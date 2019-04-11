import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { LoadingService } from '../visualServices/loading.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends RestService{

  constructor(http: HttpClient, loading: LoadingService) { 
    super(http, loading);
  }
}
