import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient) { }

  getLayers(){
    return new Promise((resolve, reject)=>{
      this.httpClient.get('/api/mapbox/get-layer').subscribe(
        (data) => { resolve(data)},
        (error) => { reject(error)}
      );
    });
  }

  addLayer(data){
    return new Promise((resolve, reject)=>{
      this.httpClient.post('/api/mapbox/add-layer', data).subscribe(
        (result) => { resolve(result); },
        (error) => { reject(error); }
      );
    });
  }
}
