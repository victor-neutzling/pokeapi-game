import { PokeapiService } from './services/pokeapi.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgurl = '';
  name = '';
  nameArr: string[] = [];
  tries = 3;
  losses = this.getLosses();
  wins = this.getWins();
  commaRegex = new RegExp(',', 'g');
  parsedIds: number[] = [];

  previousIds:  string[] = localStorage
    .getItem('previousIds')
    ?.split(',') as string[];

  public nameForm = this.fb.group({
    inp: ['', Validators.required],
  });

  constructor(private poke: PokeapiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    if(this.previousIds == undefined){
      this.previousIds = []
    }

    if(this.previousIds.length == 150){
      this.previousIds = []
    }

    let id = Math.floor(Math.random() * 152) + 1;
    if (this.previousIds != undefined) {
      this.parsedIds = this.previousIds.map((id) => {
        return parseInt(id);
      });

      let isEqual = true;
      while (isEqual) {
        isEqual = false;
        this.parsedIds.forEach((pkmn) => {
          if (pkmn == id) {
            console.log('here');
            id = Math.floor(Math.random() * 152) + 1;
            isEqual = true;
          }
        });
      }
    }
    if(this.previousIds != undefined){
      this.previousIds.push(id.toString());
    }else{
      this.previousIds = [id.toString()]
    }
    localStorage.setItem('previousIds', this.previousIds.toString());

    this.poke.getPkmn(1).subscribe((res: any) => {
      this.poke.getPkmnByName(res.results[id].name).subscribe((res: any) => {
        this.imgurl = res.sprites.front_default;
        this.name = res.name;
        this.nameArr = res.name.split('');
      });
    });
  }

  onSubmit() {
    let changed = true;
    if (this.nameForm.valid) {
      if (this.nameForm.get('inp')?.value?.toLowerCase() == this.name) {
        if (localStorage.getItem('wins')) {
          this.wins = parseInt(localStorage.getItem('wins') as string);
        }
        for (let i = 0; i < this.nameArr.length; i++) {
          (document.getElementById(i.toString()) as HTMLElement).textContent =
            this.nameArr[i];
        }
        this.nameForm.get('inp')?.disable();
        localStorage.setItem('wins', (this.wins + 1).toString());
        this.wins = parseInt(localStorage.getItem('wins') as string);
        (document.getElementById('next') as HTMLElement).style.display =
          'block';
      } else {
        if (this.tries > 1) {
          this.tries--;
          while (changed) {
            let id = Math.floor(Math.random() * this.nameArr.length);
            if (
              (document.getElementById(id.toString()) as HTMLElement)
                .textContent == '_'
            ) {
              (
                document.getElementById(id.toString()) as HTMLElement
              ).textContent = this.nameArr[id];
              changed = false;
            }
          }
        } else {
          let losses = 0;
          if (localStorage.getItem('losses')) {
            losses = parseInt(localStorage.getItem('losses') as string);
          }

          localStorage.setItem('losses', (losses + 1).toString());
          alert('you lost');
          this.tries = 0;
          for (let i = 0; i < this.nameArr.length; i++) {
            (document.getElementById(i.toString()) as HTMLElement).textContent =
              this.nameArr[i];
          }
          this.nameForm.get('inp')?.disable();
          (document.getElementById('next') as HTMLElement).style.display =
            'block';
          this.losses = parseInt(localStorage.getItem('losses') as string);
        }
      }
    } else {
      alert('write a name on the textbox');
    }
  }

  getLosses() {
    if (localStorage.getItem('losses')) {
      return parseInt(localStorage.getItem('losses') as string);
    }
    return 0;
  }
  getWins() {
    if (localStorage.getItem('wins')) {
      return parseInt(localStorage.getItem('wins') as string);
    }
    return 0;
  }
  reload() {
    window.location.reload();
  }

  title = 'pokeapi-guessing-game';
}
