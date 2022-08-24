import { Component, OnInit } from '@angular/core';
import {Countrycode} from './countrycode';
import {Cservice} from './countrycode.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Loader } from '@googlemaps/js-api-loader';
import { CIservice } from './countryInfo.service';
import { Countryinfo } from './CountryInfo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = ('country-service')
  public countrycodes: Countrycode[] | undefined;
  public countryinfos: Countryinfo | undefined;
  toDisplay = false;
  map: any;
 
  constructor(private countrycodeService:  Cservice,private countryInfoService:  CIservice ){}
  
  /*Initial Setup of web app*/
  ngOnInit() {
    this.getCountryCodes();

    /*Load Google Map Instance*/
    let loader = new Loader({

      apiKey: 'AIzaSyB9WtukPUrWcfg7fyookqUHvDifOeiVB1s'  /* google Map Key *(Replace your Key here)  )*/
    })
    loader.load().then(() => {
      console.log('loaded gmaps')
      
   /*Setup google Map on following */    
   const myLatlng = new google.maps.LatLng(25.363882,31.044922);
   this.map = new google.maps.Map(document.getElementById("map"), {
   zoom: 3,
   center: myLatlng,
 })
});
}
  
  /* GET API Call: Method to extract countries codes (country name, country code) data from developed backend of country service*/
  public getCountryCodes(): void {
    this.countrycodeService.getcountrycodes().subscribe(
      (response: Countrycode[]) => {
        this.countrycodes = response;
        console.log(this.countrycodes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

   /*Extract the country name clicked by user*/ 
   onClick = (event: { currentTarget: any; }) => {
    var target = event.currentTarget;
    var idAttr = target.attributes.id;    
    var value = idAttr.nodeValue;
    this.getcountryInfo(value);

  }

/* GET API Call: Method to extract country info (country name, country code, capital, population, Flag url ) data from developed backend of country service*/
public getcountryInfo(name: string) {

    this.countryInfoService.getcountryInfo(name).subscribe(
      (response: Countryinfo) => {
        this.countryinfos = response;
        console.log(this.countryinfos);
        this.getCoordinatesfromAPI(this.countryinfos);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
}

/* Metho to extract  External Api call for Extracing the Coordinates (Lat, log) to show in the google map. */
public  async getCoordinatesfromAPI(cs: Countryinfo){
let name = cs.name
let obj;
let lat;
let lon;
 
/*Extract the lat and lon of the country clikced by user*/
var val = 'https://api.geoapify.com/v1/geocode/search?text='+name+'&type=country&format=json&apiKey=9c10018c2dd74ca0850e8bb328eed3db';    /* api.geoapify.com Key *(Replace your Key here)  )*/
var url = val.toString();
const response  = fetch(url)
obj = await (await response).json()
lat = obj.results[0].lat;
lon = obj.results[0].lon
let latlon = {lat:lat,lng:lon}

/*Setting the marker on the google maps*/
 var marker = new google.maps.Marker({
  position: latlon,
  draggable:false,
  title:"Country: " +name+"\n"+ "Iso2 Code: " + cs.country_code + "\n"+"Capital: " + cs.capital+"\n"+"Population: " + cs.population+"\n"+"flagurl : "+cs.flag_img_uri});
  marker.setMap(this.map);
   
  
return obj;
}

}



