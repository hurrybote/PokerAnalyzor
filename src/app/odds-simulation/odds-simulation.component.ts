import { Component, OnInit } from '@angular/core';
import { HandPair, HAND_PAIR } from './hand-pair';
import { OddsSimulationService } from './odds-simulation.service';

@Component({
  selector: 'app-odds-simulation',
  templateUrl: './odds-simulation.component.html',
  styleUrls: ['./odds-simulation.component.scss']
})

export class OddsSimulationComponent implements OnInit {
  public hand_pair: HandPair[] = HAND_PAIR;

  constructor(
    public OddsService: OddsSimulationService
  ) {  }

  formatLabel(value: number) {
    return value + '%';
  }

  change_color(slider){
    this.hand_pair = this.OddsService.change_color_num(slider.value, this.hand_pair);
  }

  ngOnInit() {
  }

  


  
}
