import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http:HttpClient) { }

  public getShape(id:number){
    return this.http.get(`https:/pokeapi.co/api/v2/pokemon-shape/${id}/`)
  }
}
