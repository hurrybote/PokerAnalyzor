import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HAND_PAIR, HandPair } from './hand-pair';

@Component({
  selector: 'app-odds-simulation',
  templateUrl: './odds-simulation.component.html',
  styleUrls: ['./odds-simulation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OddsSimulationComponent implements OnInit {
  private hand_pair: HandPair[] = HAND_PAIR;

  constructor() { }

  ngOnInit() {
  }

  formatLabel(value: number) {
    for(let i=0; i <= this.hand_pair.length; i++){
      if (this.hand_pair[i]["p1"] >= 100-value) {
        this.hand_pair[i]["p1"] = 1;
      }else{
        this.hand_pair[i]["p1"] = 0;
      }
    }
    return value + '%';
  }


  
}
