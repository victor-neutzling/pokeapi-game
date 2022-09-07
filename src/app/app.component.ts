import { PokeapiService } from './services/pokeapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private poke: PokeapiService){}


  ngOnInit(): void {
    this.poke.getShape(1).subscribe((res:any) =>{
      console.log(res)
    })
  }



  title = 'pokeapi-guessing-game';
}
