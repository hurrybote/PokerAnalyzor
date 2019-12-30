import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { HandPair, HAND_PAIR } from './hand-pair';
import { OddsSimulationService } from './odds-simulation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Players, PLAYERS, Board, BOARD } from './players';
import { SmallCard, SMALL_CARD } from './card';
import { WinRatio, WIN_RATIO } from './hand-pair';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-odds-simulation',
  templateUrl: './odds-simulation.component.html',
  styleUrls: ['./odds-simulation.component.scss']
})

export class OddsSimulationComponent implements OnInit {
  @ViewChild('pop', {static:false}) pop;
  public hand_pair: HandPair[] = HAND_PAIR;
  public plnum: number[] = [2, 3, 4, 5, 6, 7, 8, 9];
  public players: Players[] = [PLAYERS[0],PLAYERS[1]];
  public cardList: SmallCard[] = SMALL_CARD;
  public board: Board = BOARD;
  public selectedPlayer: Players;
  public selectedBoard: number[] = new Array();
  public selectedCard: number[] = new Array();
  public ratio: Promise<WinRatio[]>;
  // playerがクリックされている場合はfalse，boardであればtrue
  public click_flag = 0;
  public win_ratio_flag = 0;
  public player_number = 2;

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

  onClickPop(pl, f){
    if(f === 0){
      // playerの場合はclick_flagを0に
      this.click_flag = f;
      this.selectedPlayer = pl;
      // console.log(this.selectedPlayer);
      this.pop.nativeElement.click();
    }else{
      // boardの場合はclick_flagを1,2,3に
      this.click_flag = f;
      // this.selectedBoard = pl;
      // console.log(this.selectedBoard);
      this.pop.nativeElement.click();
    }
    
  }

  clear_all(){
    this.selectedBoard = new Array();
    this.click_flag = 0;
    this.win_ratio_flag = 0;
    this.players = this.OddsService.clear_src_for_player(this.players);
    this.board = this.OddsService.clear_src_for_board(this.board);
    this.hand_pair = HAND_PAIR;
    this.selectedCard = new Array();
    this.cardList = this.OddsService.on_off_display(this.selectedCard, this.selectedBoard, this.cardList);
  }

  calculate_ratio(){
    // console.log("計算！");
    this.OddsService.calculate_ratio(this.players, this.board)
    .then((res)=>{
      this.ratio = res;
      for(let i=0;i<this.players.length;i++){
        this.players[i]["ratio"] = this.ratio[i];
      }
      this.win_ratio_flag = 1;
    });
  }

  open_modal(content){
    this.modalService.open(content)
  }

  // プレイヤー数の変更
  select_player_num(value){
    this.player_number = value;
    this.players = this.OddsService.delete_ply(PLAYERS, value);
    // すべての表示カードをリセットする
  }

  onClickCardImg(card){
    // console.log(this.players.length);
    // セレクトされているカードの配列作成
    if(this.click_flag == 0){
      this.selectedCard = this.OddsService.selectedcard_push_del(this.players, card, this.selectedPlayer, this.selectedCard);
      // セレクトされているカードを非表示し，それ以外を表示する
      this.cardList = this.OddsService.on_off_display(this.selectedCard, this.selectedBoard, this.cardList);
      this.players = this.OddsService.change_src_for_img(this.players, card, this.selectedPlayer);
      // console.log(this.players);
    }else{
      this.selectedBoard = this.OddsService.selectedboard_push_del(this.board, card, this.click_flag, this.selectedBoard);
      this.cardList = this.OddsService.on_off_display(this.selectedCard, this.selectedBoard, this.cardList);
      this.board = this.OddsService.change_src_for_board(this.board, card, this.click_flag);
      // console.log(this.board);
      if(this.click_flag == 1){
        this.OddsService.add_preflop_flag();
      }
      // console.log(this.board.preflop_src);
    }
    
    // console.log(this.selectedCard);
  }

  ngOnInit() {
  }
  
}
