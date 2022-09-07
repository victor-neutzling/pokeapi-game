import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http:HttpClient) { }

  public getPkmn(id:number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
  }
  public getPkmnByName(name:string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  }
}
