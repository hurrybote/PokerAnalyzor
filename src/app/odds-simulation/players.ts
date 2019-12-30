import {WinRatio} from './hand-pair';

export class Players {
    name: string;
    id: number;
    ratio: WinRatio;
    left: any;
    right: any;
    left_src: string;
    right_src: string;
    // このフラグが0の時left_srcの画像を変更
    // このフラグが1の時right_srcの画像を変更
    pic_flag: number;
}

export class Board {
    name: string;
    id: number;
    preflop: any[];
    turn: any;
    river: any;
    preflop_src: string[];
    turn_src: string;
    river_src: string;
}

export const PLAYERS: Players[] = [
    {id: 1, name: "ply1", ratio:{ply:"ply1-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 2, name: "ply2", ratio:{ply:"ply2-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 3, name: "ply3", ratio:{ply:"ply3-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 4, name: "ply4", ratio:{ply:"ply4-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 5, name: "ply5", ratio:{ply:"ply5-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 6, name: "ply6", ratio:{ply:"ply6-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 7, name: "ply7", ratio:{ply:"ply7-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 8, name: "ply8", ratio:{ply:"ply8-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 9, name: "ply9", ratio:{ply:"ply9-win", win:0}, left: {}, right: {}, left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0}
]

export const BOARD: Board = {
    name: "board", id: 0, preflop_src:[
        "assets/trump_space.png",
        "assets/trump_space.png",
        "assets/trump_space.png",
    ],
    preflop:[{},{},{}],
    turn: {},
    river: {},
    turn_src: "assets/trump_space.png",
    river_src: "assets/trump_space.png"
}