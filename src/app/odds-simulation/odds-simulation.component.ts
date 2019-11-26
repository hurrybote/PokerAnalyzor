import { Component, OnInit } from '@angular/core';
import { HAND_PAIR, HandPair } from './hand-pair';

@Component({
  selector: 'app-odds-simulation',
  templateUrl: './odds-simulation.component.html',
  styleUrls: ['./odds-simulation.component.scss']
})

export class OddsSimulationComponent implements OnInit {
  public hand_pair: HandPair[] = HAND_PAIR;
  
  constructor() { }

  formatLabel(value: number) {
    console.log(this.hand_pair);
    console.log(HAND_PAIR);
    for(let i=0; i <= Object.keys(this.hand_pair).length; i++){
      if (this.hand_pair[i]["p1"] >= 100-value) {
        this.hand_pair[i]["p1"] = 1;
      }else{
        this.hand_pair[i]["p1"] = 0;
      }
    }
    return value + '%';
  }

  ngOnInit() {
  }

  


  
}
