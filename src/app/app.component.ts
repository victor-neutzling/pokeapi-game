import { PokeapiService } from './services/pokeapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private poke: PokeapiService) {}
  imgurl = '';
  name = ''

  ngOnInit(): void {
    this.poke.getPkmn(1).subscribe((res: any) => {
      this.poke.getPkmnByName(res.results[(Math.floor(Math.random()*152))+1].name).subscribe((res: any) => {
        this.imgurl = res.sprites.front_default;
        this.name = res.name
      });
    });
  }


  title = 'pokeapi-guessing-game';
}
