import itertools
import pandas as pd
import sqlite3

def get_ply_card(player):
    ply = []
    for p in player:
        left = p["left_src"].split("/")[2].replace(".png", "")
        right = p["right_src"].split("/")[2].replace(".png", "")
        tmp = [left, right]
        ply.append(tmp)
    return ply


def get_board_card(board):
    bd = []
    for b in board["preflop_src"]:
        if("trump_space.png" not in b):
            bd.append(b.split("/")[2].replace(".png", ""))
    if("trump_space.png" not in board["turn_src"]):
        bd.append(board["turn_src"].split("/")[2].replace(".png", ""))
    if("trump_space.png" not in board["river_src"]):
        bd.append(board["river_src"].split("/")[2].replace(".png", ""))

    return bd


def get_cardlist(dbname, table_name):
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()

    sql_get_cardlist = 'select name, suit from {}'.format(table_name)

    cardlist = pd.read_sql(sql_get_cardlist, conn)

    return cardlist


def add_avail(ply, board, cardlist_df):
    ply = sum(ply, [])
    avail_card = [*ply, *board]
    # print(avail_card)
    avail = []
    for n, s in zip(cardlist_df["name"], cardlist_df["suit"]):
        if("{}{}".format(n, s) in avail_card):
            avail.append(1)
        else:
            avail.append(0)
    cardlist_df["avail"] = avail
    return cardlist_df


def create_comb(ply, board):
    dbname = "poker.db"
    table_name = "cardlist"

    cardlist_df = get_cardlist(dbname, table_name)
    cardlist_df = add_avail(ply, board, cardlist_df)
    cardlist_df = cardlist_df[cardlist_df["avail"] != 1]
    
    card = [str(n)+s for n,s in zip(cardlist_df["name"],cardlist_df["suit"])]
    if(len(board) != 5):
        card_comb = list(itertools.combinations(card, 5-len(board)))
    # print(cardlist_df)

    # モンテカルロを使って展開 *()でタプルを展開できる
    # 乱数で呼び出す配列の要素を決定する
    
    

    return card_comb


def calcu_ratio(json):
    ply = get_ply_card(json["player"])
    board = get_board_card(json["board"])
    
    comb = create_comb(ply, board)
    print(len(comb))
    # print(ply)
    # print(board)

    return json