import { Component, OnInit, ViewChild } from '@angular/core';
import { HandPair, HAND_PAIR } from './hand-pair';
import { OddsSimulationService } from './odds-simulation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Players, PLAYERS } from './players';

@Component({
  selector: 'app-odds-simulation',
  templateUrl: './odds-simulation.component.html',
  styleUrls: ['./odds-simulation.component.scss']
})

export class OddsSimulationComponent implements OnInit {
  @ViewChild('pop', {static:false}) pop;
  public hand_pair: HandPair[] = HAND_PAIR;
  public plnum: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public players: Players[] = [PLAYERS[0]];

  constructor(
    public OddsService: OddsSimulationService,
    private modalService: NgbModal,

  ) {  }

  formatLabel(value: number) {
    return value + '%';
  }

  change_color(slider){
    this.hand_pair = this.OddsService.change_color_num(slider.value, this.hand_pair);
  }

  onClickPop(event){
    console.log(event)
    this.pop.nativeElement.click();
  }

  open_modal(content){
    // this.modalService.open(content, {windowClass: 'dark-modal'});
    this.modalService.open(content)
  }

  select_player_num(value){
    console.log(this.players);
    this.players = PLAYERS;
    console.log(this.players);
    for(let i=9; value < this.players.length; i--) this.players.pop();
  }

  add1(id){
    return id+"-1";
  }

  add2(id){
    return id+"-2";
  }

  // 選択されたトランプを保存して，画面に表示する
  pick_hand(){

  }

  ngOnInit() {
  }

  


  
}
