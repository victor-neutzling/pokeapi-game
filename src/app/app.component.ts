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
  name = ""
  nameArr : string[] = [];
  tries = 3;
  losses = this.getLosses()
  wins = this.getWins()
  commaRegex = new RegExp(",","g");

  public nameForm = this.fb.group({
    inp: ['',Validators.required]
  })

  constructor(private poke: PokeapiService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.poke.getPkmn(1).subscribe((res: any) => {
      this.poke.getPkmnByName(res.results[(Math.floor(Math.random()*152))+1].name).subscribe((res: any) => {
        this.imgurl = res.sprites.front_default;
        this.name = res.name
        this.nameArr = res.name.split("");
      });
    });
  }

  onSubmit(){
    let changed = true
    if(this.nameForm.valid){
      if(this.nameForm.get('inp')?.value == this.name){
        let wins = 0
          if(localStorage.getItem("wins")){
            wins = parseInt(localStorage.getItem("wins") as string)
          }
          for(let i=0;i<this.nameArr.length;i++){
            (document.getElementById(i.toString()) as HTMLElement).textContent = this.nameArr[i]
          }
          this.nameForm.get('inp')?.disable()
          localStorage.setItem("wins",(wins+1).toString())
      }else{
        if(this.tries > 0){
          this.tries--;
          while(changed){
            let id = Math.floor(Math.random() * this.nameArr.length);
            if((document.getElementById(id.toString()) as HTMLElement).textContent == '_'){
              (document.getElementById(id.toString()) as HTMLElement).textContent = this.nameArr[id];
              changed = false
            }
          }
        }else{
          let losses = 0
          if(localStorage.getItem("losses")){
            losses = parseInt(localStorage.getItem("losses") as string)
          }

          localStorage.setItem("losses",(losses+1).toString())
          alert('you lost')
          window.location.reload();

        }
      }
    }else{
      alert('write a name on the textbox')
    }
  }

  getLosses(){
    if(localStorage.getItem("losses")){
      return parseInt(localStorage.getItem("losses") as string)
    }
    return 0
  }
  getWins(){
    if(localStorage.getItem("wins")){
      return parseInt(localStorage.getItem("wins") as string)
    }
    return 0
  }
  reload(){
    window.location.reload()
  }

  title = 'pokeapi-guessing-game';
}
