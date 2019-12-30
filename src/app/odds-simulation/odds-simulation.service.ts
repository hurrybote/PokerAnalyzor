import { Injectable } from '@angular/core';
import { HAND_PAIR, HandPair } from './hand-pair';
import { Players } from './players';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WinRatio } from './hand-pair';

@Injectable({
  providedIn: 'root'
})

export class OddsSimulationService {
  private max_ratio = this.get_max();
  private min_ratio = this.get_min();
  private preflop_flag = 0;

  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  public change_color_num(value, hand_pair): HandPair[]{
    // console.log(hand_pair);
    let new_value = this.map(value, 0, 100, this.max_ratio+1, this.min_ratio)
    for(let i=0; i <= hand_pair.length; i++){
      if (hand_pair[i]["p1"] >= new_value) {
        hand_pair[i]["color"] = 1;
      }else{
        hand_pair[i]["color"] = 0;
      }
    }
    return hand_pair;
  }

  get_max(): number{
    let temp = 0;
    // console.log(HAND_PAIR);
    for (let hand in HAND_PAIR){
      if(temp < HAND_PAIR[hand]["p1"]){
        temp = HAND_PAIR[hand]["p1"]
      }
    }
    return temp;
  
  }

  get_min(): number{
    let temp = 100;
    for (let hand in HAND_PAIR){
      if(temp > HAND_PAIR[hand]["p1"]){
        temp = HAND_PAIR[hand]["p1"]
      }
    }
    return temp;
  }

  map(value, fromMin, fromMax, toMin, toMax){
    let result = 0;

    result = (value <= fromMin)
      ? toMin : (value >= fromMax)
        ? toMax : (() => {

          let ratio = (toMax - toMin) / (fromMax - fromMin);
          return (value - fromMin) * ratio + toMin;

        })();

  return result;
  }

  get_pair(): HandPair[]{
    return HAND_PAIR;
  }

  delete_ply(players, value){
    let temp: Players[] = [];
    for(let i=0; i < value; i++){
      temp.push(players[i])
    }
    return temp;
  }

  change_src_for_img(players, card, selectedPlayer){
    card.src = card.src.replace("small_trump", "trump");
    // console.log(src);
    for(let i=0; i<players.length; i++){
      if(selectedPlayer.name === players[i].name && (players[i].left_src != card.src && card.src != players[i].right_src)){
        if(players[i].pic_flag === 0){
          players[i].left_src = card.src;
          players[i].left = {name:card.name, suit:card.suit}
          players[i].pic_flag = 1;
        }else{
          players[i].right_src = card.src;
          players[i].right = {name:card.name, suit:card.suit}
          players[i].pic_flag = 0;
        }
      }
    }
    return players;
  }

  change_src_for_board(board, card, click_flag){
    card.src = card.src.replace("small_trump", "trump");
    // console.log(this.preflop_flag);
    if(click_flag === 1){
      board.preflop_src[this.preflop_flag] = card.src;
      board.preflop[this.preflop_flag] = {name:card.name, suit:card.suit}
    }else if(click_flag === 2){
      board.turn_src = card.src;
      board.turn = {name:card.name, suit:card.suit}
    }else{
      board.river_src = card.src;
      board.turn = {name:card.name, suit:card.suit}
    }

    return board;
  }

  getArraySpliceNum(id){
    if(id === 1){
      return 0
    }else{
      return (id - (id-1))*2
    }
  }

  selectedcard_push_del(players, card, selectedPlayer, selectedCard){
    card.src = card.src.replace("small_trump", "trump");
    // console.log();
    for(let i=0; i<players.length; i++){
      if(selectedPlayer.name === players[i].name && (players[i].left_src != card.src && card.src != players[i].right_src)){
        if(players[i].pic_flag === 0){
          // すでに選択されていたカードがあれば，それをselectedリストから外す
          let array_splice_num = this.getArraySpliceNum(players[i].id);
          // console.log(array_splice_num);
          if(players[i].left_src != "assets/trump_space.png"){
            // console.log(selectedCard);
            // 配列の削除
            selectedCard.splice(array_splice_num, 1, card.id);
          }else{
            selectedCard.splice(array_splice_num, 0, card.id);
          }
        }else{
          let array_splice_num = this.getArraySpliceNum(players[i].id)
          // console.log(array_splice_num+1);
          if(players[i].right_src != "assets/trump_space.png"){
            selectedCard.splice(array_splice_num+1, 1, card.id);
          }
          else{
            selectedCard.splice(array_splice_num+1, 0, card.id);
          }
        }
      }
    }
    // console.log(selectedCard);
    return selectedCard;
  }

  add_preflop_flag(){
    // console.log(flag);
    if(this.preflop_flag > 1){
      this.preflop_flag = 0;
    }else{
      this.preflop_flag += 1;
    }
  }

  selectedboard_push_del(board, card, board_flag, selectedBoard){
    card.src = card.src.replace("small_trump", "trump");
    // console.log(this.preflop_flag);
    // boardフラグが1の場合フロップ
    // 2の場合ターン
    // 3の場合リバー
    if(board_flag === 1){
      if(board.preflop_src[this.preflop_flag] != "assets/trump_space.png"){
        selectedBoard.splice(this.preflop_flag, 1, card.id);
      }else{
        selectedBoard.splice(this.preflop_flag, 0, card.id);
        // console.log(this.preflop_flag);
      }
    }else if(board_flag === 2){
      if(board.turn_src != "assets/trump_space.png"){
        selectedBoard.splice(3, 1, card.id);
      }else{
        selectedBoard.splice(3, 0, card.id);
      }
    }else{
      // try,catchでフロップが選択されていない状態でターンとリバーを選択された際にエラーを出す
      if(board.river_src != "assets/trump_space.png"){
        selectedBoard.splice(4, 1, card.id);
      }else{
        selectedBoard.splice(4, 0, card.id);
      }
    }
    // console.log(selectedBoard);

    return selectedBoard;
  }

  on_off_display(selectedCard, selectedBoard, cardList){
    for(let i=0; i<52; i++){
      // console.log(selectedCard.indexOf(cardList[i]["id"]));
      if(selectedCard.some((value) => {
        return cardList[i]["id"] === value;
      })){
        cardList[i]["display"]=1;
        cardList[i]["src"] = cardList[i]["src"].replace("small_trump", "trump");
      }else if(selectedBoard.some((value) => {
        // console.log(selectedBoard);
        return cardList[i]["id"] === value;
      })){
        cardList[i]["display"]=1;
        cardList[i]["src"] = cardList[i]["src"].replace("small_trump", "trump");
      }else{
        cardList[i]["display"]=0;
        // console.log(cardList[i]["src"].indexOf("small_trump"))
        if(cardList[i]["src"].indexOf("small_trump") === -1){
          cardList[i]["src"] = cardList[i]["src"].replace("trump", "small_trump");  
        }
      }
    }
    // console.log(cardList);
    return cardList;
  }

  public clear_src_for_board(board){
    board["preflop_src"] = ["assets/trump_space.png", "assets/trump_space.png", "assets/trump_space.png"]
    board["preflop"] = [{},{},{}];
    board["turn"] = {};
    board["river"] = {};
    board["turn_src"] = "assets/trump_space.png";
    board["river_src"] = "assets/trump_space.png"
    return board;
  }

  public clear_src_for_player(players){

    for(let i=0; i<players.length;i++){
      players[i].left_src = "assets/trump_space.png";
      players[i].left = {};
      players[i].right_src = "assets/trump_space.png";
      players[i].right = {};
    }

    return players;
  }

  public calculate_ratio(player, board):Promise<any>{
    // console.log(player);
    // console.log(board);

    let card_dict = {
      player: player, board: board
    }

    return this.http.post(
      'http://localhost:33565/calc',
      card_dict,
      {
        headers: this.httpOptions, responseType:'json'
      })
      .toPromise()
      .then((res) => {
        console.log(res);
        return res;
      })
  }

}
