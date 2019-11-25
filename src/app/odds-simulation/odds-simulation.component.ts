import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HAND_PAIR } from './hand-pair';

@Component({
  selector: 'app-odds-simulation',
  templateUrl: './odds-simulation.component.html',
  styleUrls: ['./odds-simulation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OddsSimulationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  formatLabel(value: number) {
    return value + '%'
  }

  public hand_pair = HAND_PAIR;
}
