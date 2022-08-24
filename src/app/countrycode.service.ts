/*Service for calling country codes */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat/observable';
import { Countrycode } from './countrycode';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class Cservice
{
private apiServerUrl = environment.apiBaseUrl;
/*Http Client for Api call*/
constructor(private http: HttpClient){}
/* getting response form spring api */
public getcountrycodes(): Observable<Countrycode[]> {
    return this.http.get<Countrycode[]>(`${this.apiServerUrl}/countries`);
  }
}