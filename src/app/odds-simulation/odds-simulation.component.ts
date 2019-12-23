import { Component, OnInit, ViewChild } from '@angular/core';
import { HandPair, HAND_PAIR } from './hand-pair';
import { OddsSimulationService } from './odds-simulation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Players, PLAYERS, Board, BOARD } from './players';
import { SmallCard, SMALL_CARD } from './card';

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
  public dirList: string[] = new Array();
  public cardList: SmallCard[] = SMALL_CARD;
  public board: Board = BOARD;
  public selectedPlayer: Players;
  public selectedCard: number[] = new Array();

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

  onClickPop(pl){
    this.selectedPlayer = pl;
    console.log(this.selectedPlayer);
    this.pop.nativeElement.click();
  }

  open_modal(content){
    // this.modalService.open(content, {windowClass: 'dark-modal'});
    this.modalService.open(content)
  }

  select_player_num(value){
    this.players = this.OddsService.delete_ply(PLAYERS, value);
    // console.log(this.players);
    // console.log(this.players.length); 
  }

  onClickCardImg(card){
    // console.log(card)
    // セレクトされているカードの配列作成
    this.selectedCard = this.OddsService.selectedcard_push_del(this.players, card, this.selectedPlayer, this.selectedCard);
    // console.log(this.selectedCard);
    // セレクトされているカードを非表示し，それ以外を表示する
    // this.cardList[card.id]["display"]=1;
    this.cardList = this.OddsService.on_off_display(this.selectedCard, this.cardList);

    this.players = this.OddsService.change_src_for_img(this.players, card.src, this.selectedPlayer);
    // console.log(card);
  }

  // checkSelected(id){
  //   // if(this.selectedCard.indexOf(id) > 0){
  //   //   return true
  //   // }else{
  //   //   return false;
  //   // }
  //   console.log(id);
  // }

  ngOnInit() {
  }

  


  
}
