import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidCountService {
  
  constructor(private http:HttpClient) { }
  api:any='https://api.covid19india.org'
  header:HttpHeaders = new HttpHeaders();
 

  getTotalCases(){
    this.header.set('Access-Control-Allow-Origin', '*');
     return this.http.get("/data.json",{headers:this.header})
  }

  getStateCases(){
    return this.http.get("v2/state_district_wise.json",{headers:this.header})
  }

}
