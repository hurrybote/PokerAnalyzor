export class Players {
    name: string;
    id: number;
    left_src: string;
    right_src: string;
    // このフラグが0の時left_srcの画像を変更
    // このフラグが1の時right_srcの画像を変更
    pic_flag: number;
}

export class Board {
    name: string;
    id: number;
    preflop_src: string[];
    turn_src: string;
    river_src: string;
}

export const PLAYERS: Players[] = [
    {id: 1, name: "ply1", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 2, name: "ply2", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 3, name: "ply3", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 4, name: "ply4", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 5, name: "ply5", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 6, name: "ply6", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 7, name: "ply7", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 8, name: "ply8", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: 9, name: "ply9", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0}
]

export const BOARD: Board = {
    name: "board", id: 0, preflop_src:[
        "assets/trump_space.png",
        "assets/trump_space.png",
        "assets/trump_space.png",
    ],
    turn_src: "assets/trump_space.png",
    river_src: "assets/trump_space.png"
}