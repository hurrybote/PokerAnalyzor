const card_name_list = [
    "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ac",
    "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks", "As",
    "2d", "3d", "4d", "5d", "6d", "7d", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ac",
    "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ac"
]

export class SmallCard{
    id: number;
    name: string;
    suit: string;
    src: string;
    display: number;
}

export const SMALL_CARD: SmallCard[] = [
    {id: 0, name: "1", suit: "c", src: "assets/small_trump/1c.png", display: 0},
    {id: 1, name: "2", suit: "c", src: "assets/small_trump/2c.png", display: 0},
    {id: 2, name: "3", suit: "c", src: "assets/small_trump/3c.png", display: 0},
    {id: 3, name: "4", suit: "c", src: "assets/small_trump/4c.png", display: 0},
    {id: 4, name: "5", suit: "c", src: "assets/small_trump/5c.png", display: 0},
    {id: 5, name: "6", suit: "c", src: "assets/small_trump/6c.png", display: 0},
    {id: 6, name: "7", suit: "c", src: "assets/small_trump/7c.png", display: 0},
    {id: 7, name: "8", suit: "c", src: "assets/small_trump/8c.png", display: 0},
    {id: 8, name: "9", suit: "c", src: "assets/small_trump/9c.png", display: 0},
    {id: 9, name: "10", suit: "c", src: "assets/small_trump/10c.png", display: 0},
    {id: 10, name: "11", suit: "c", src: "assets/small_trump/11c.png", display: 0},
    {id: 11, name: "12", suit: "c", src: "assets/small_trump/12c.png", display: 0},
    {id: 12, name: "13", suit: "c", src: "assets/small_trump/13c.png", display: 0},
    {id: 13, name: "1", suit: "s", src: "assets/small_trump/1s.png", display: 0},
    {id: 14, name: "2", suit: "s", src: "assets/small_trump/2s.png", display: 0},
    {id: 15, name: "3", suit: "s", src: "assets/small_trump/3s.png", display: 0},
    {id: 16, name: "4", suit: "s", src: "assets/small_trump/4s.png", display: 0},
    {id: 17, name: "5", suit: "s", src: "assets/small_trump/5s.png", display: 0},
    {id: 18, name: "6", suit: "s", src: "assets/small_trump/6s.png", display: 0},
    {id: 19, name: "7", suit: "s", src: "assets/small_trump/7s.png", display: 0},
    {id: 20, name: "8", suit: "s", src: "assets/small_trump/8s.png", display: 0},
    {id: 21, name: "9", suit: "s", src: "assets/small_trump/9s.png", display: 0},
    {id: 22, name: "10", suit: "s", src: "assets/small_trump/10s.png", display: 0},
    {id: 23, name: "11", suit: "s", src: "assets/small_trump/11s.png", display: 0},
    {id: 24, name: "12", suit: "s", src: "assets/small_trump/12s.png", display: 0},
    {id: 25, name: "13", suit: "s", src: "assets/small_trump/13s.png", display: 0},
    {id: 26, name: "1", suit: "h", src: "assets/small_trump/1h.png", display: 0},
    {id: 27, name: "2", suit: "h", src: "assets/small_trump/2h.png", display: 0},
    {id: 28, name: "3", suit: "h", src: "assets/small_trump/3h.png", display: 0},
    {id: 29, name: "4", suit: "h", src: "assets/small_trump/4h.png", display: 0},
    {id: 30, name: "5", suit: "h", src: "assets/small_trump/5h.png", display: 0},
    {id: 31, name: "6", suit: "h", src: "assets/small_trump/6h.png", display: 0},
    {id: 32, name: "7", suit: "h", src: "assets/small_trump/7h.png", display: 0},
    {id: 33, name: "8", suit: "h", src: "assets/small_trump/8h.png", display: 0},
    {id: 34, name: "9", suit: "h", src: "assets/small_trump/9h.png", display: 0},
    {id: 35, name: "10", suit: "h", src: "assets/small_trump/10h.png", display: 0},
    {id: 36, name: "11", suit: "h", src: "assets/small_trump/11h.png", display: 0},
    {id: 37, name: "12", suit: "h", src: "assets/small_trump/12h.png", display: 0},
    {id: 38, name: "13", suit: "h", src: "assets/small_trump/13h.png", display: 0},
    {id: 39, name: "1", suit: "d", src: "assets/small_trump/1d.png", display: 0},
    {id: 40, name: "2", suit: "d", src: "assets/small_trump/2d.png", display: 0},
    {id: 41, name: "3", suit: "d", src: "assets/small_trump/3d.png", display: 0},
    {id: 42, name: "4", suit: "d", src: "assets/small_trump/4d.png", display: 0},
    {id: 43, name: "5", suit: "d", src: "assets/small_trump/5d.png", display: 0},
    {id: 44, name: "6", suit: "d", src: "assets/small_trump/6d.png", display: 0},
    {id: 45, name: "7", suit: "d", src: "assets/small_trump/7d.png", display: 0},
    {id: 46, name: "8", suit: "d", src: "assets/small_trump/8d.png", display: 0},
    {id: 47, name: "9", suit: "d", src: "assets/small_trump/9d.png", display: 0},
    {id: 48, name: "10", suit: "d", src: "assets/small_trump/10d.png", display: 0},
    {id: 49, name: "11", suit: "d", src: "assets/small_trump/11d.png", display: 0},
    {id: 50, name: "12", suit: "d", src: "assets/small_trump/12d.png", display: 0},
    {id: 51, name: "13", suit: "d", src: "assets/small_trump/13d.png", display: 0}
]
    