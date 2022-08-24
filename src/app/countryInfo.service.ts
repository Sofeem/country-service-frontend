/*Service for calling country infomation */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs-compat/observable';
import { environment } from 'src/environments/environment';
import { Countryinfo } from './CountryInfo';


@Injectable({providedIn: 'root'})
export class CIservice
{
private apiServerUrl = environment.apiBaseUrl;

/*Http Client for Api call*/
constructor(private http: HttpClient){}

/* getting response form spring api */
public getcountryInfo(name): Observable<Countryinfo> {
    return this.http.get<Countryinfo>(`${this.apiServerUrl}/countries`+'/'+name);
  }
}