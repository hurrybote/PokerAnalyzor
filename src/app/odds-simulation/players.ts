

export class Players {
    id: string;
    left_src: string;
    right_src: string;
    // このフラグが0の時left_srcの画像を変更
    // このフラグが1の時right_srcの画像を変更
    pic_flag: number;
}

export const PLAYERS: Players[] = [
    {id: "ply1", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: "ply2", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: "ply3", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: "ply4", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: "ply5", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: "ply6", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: "ply7", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: "ply8", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0},
    {id: "ply9", left_src: "assets/trump_space.png", right_src: "assets/trump_space.png", pic_flag: 0}
]