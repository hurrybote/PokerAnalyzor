import { Injectable } from '@angular/core';
import { HAND_PAIR, HandPair } from './hand-pair';
import { Players } from './players';

@Injectable({
  providedIn: 'root'
})
export class OddsSimulationService {
  private max_ratio = this.get_max();
  private min_ratio = this.get_min();

  constructor() { }

  public change_color_num(value, hand_pair): HandPair[]{
    // console.log(value);
    // console.log(hand_pair);
    // console.log(this.max_ratio);
    // console.log(this.min_ratio);
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
}
