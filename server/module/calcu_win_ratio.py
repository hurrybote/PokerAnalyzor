import itertools
import pandas as pd
import sqlite3
from random import randrange
from collections import Counter

def get_ply_card(player):
    ply = []
    for p in player:
        left = p["left"]
        right = p["right"]
        tmp = [left, right]
        ply.append(tmp)
    return ply


def get_board_card(board):
    bd = []
    for b, p in zip(board["preflop_src"], board["preflop"]):
        if("trump_space.png" not in b):
            bd.append(p)
    if("trump_space.png" not in board["turn_src"]):
        bd.append(board["turn"])
    if("trump_space.png" not in board["river_src"]):
        bd.append(board["river"])

    return bd


def get_cardlist(dbname, table_name):
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()

    sql_get_cardlist = 'select name, suit from {}'.format(table_name)

    cardlist = pd.read_sql(sql_get_cardlist, conn)

    return cardlist

# ハンドやボードに出ているカードにフラグを立てる
def add_avail(ply, board, cardlist_df):
    # ply = sum(ply, [])
    # print(ply)
    avail_card = [*ply, *board]
    # print(avail_card)
    avail = []
    for n, s in zip(cardlist_df["name"], cardlist_df["suit"]):
        if({"name":n, "suit":s} in avail_card):
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
    # print(cardlist_df)
    cardlist_df = cardlist_df[cardlist_df["avail"] != 1]
    
    card = [{"name":n, "suit":s} for n,s in zip(cardlist_df["name"],cardlist_df["suit"])]
    card_comb = []
    if(len(board) != 5):
        comb = list(itertools.combinations(card, 5-len(board)))
        for c in comb:
            card_comb.append([*board, *c])
    else:
        card_comb = list(itertools.combinations(board, 5))
    # print(card_comb)

    return card_comb


def calcu_comb_len(comb):
    if(len(comb) < 10000):
        return 1
    elif(10000 <= len(comb) <100000):
        return 10
    elif(100000 <= len(comb) < 1000000):
        return 100
    elif(1000000 <= len(comb) < 10000000):
        return 1000


# issue: Aハイの時が考慮できていない可能性あり
def high(cards):
    # print(cards)
    name_list = [c["name"] for c in cards ]
    if(1 in name_list):
        return {"count":1, "high":1}
    else:
        high = max(name_list)
        return {"count":1, "high":high}


def pair(cards):
    pair = 0
    comb = list(itertools.combinations(cards, 2))
    high = None
    # print(comb)
    for c in comb:
        if(c[0]["name"] == c[1]["name"]):
            if(pair < 2):
                pair += 1
            # ここの処理関数化できそう
            if(high != None and high < c[0]["name"] and high != 1):
                high = c[0]["name"]
            elif(c[0]["name"]==1):
                high = c[0]["name"]
            elif(high==None):
                high = c[0]["name"]
    if(pair == 0):
        return {"count":0, "high":0}
    else:
        return {"count":pair, "high":high}

def three(cards):
    three = 0
    # print(len(cards))
    comb = list(itertools.combinations(cards, 3))
    high = None
    for c in comb:
        if(c[0]["name"] == c[1]["name"] == c[2]["name"]):
            three = 1
            if(high != None and high < c[0]["name"] and high != 1):
                high = c[0]["name"]
            elif(c[0]["name"]==1):
                high = c[0]["name"]
            elif(high==None):
                high = c[0]["name"]
    if(three == 0):
        return {"count":0, "high":0}
    else:
        return {"count":three, "high":high}


def straight(cards):
    comb = list(itertools.combinations(cards, 5))
    for c in comb:
        straight = 0
        high = None
        tmp = sorted(c, key=lambda x:x["name"])
        # 10,11,12,13だった時にAを考慮する
        for i,t in enumerate(tmp[0:4]):
            if(tmp[i]["name"]+1 == tmp[i+1]["name"]):
                straight += 1
                high = tmp[i+1]["name"]
            elif(straight==2 and tmp[i]["name"]+1==13 and tmp[0]["name"]==1):
                straight += 1
                high = tmp[0]["name"]     
                
        if(straight == 3):
            return {"count":1, "high":high}
    return {"count":0, "high":0}
    

def flush(cards):
    comb = list(itertools.combinations(cards, 5))
    for c in comb:
        flush = 0
        high = None
        tmp = sorted(c, key=lambda x:x["name"])
        for i,t in enumerate(tmp[0:4]):
            if(tmp[i]["suit"] == tmp[i+1]["suit"]):
                flush += 1
                if(tmp[0]["name"] == 1):
                    high = tmp[0]["name"]
                elif(high!=None and tmp[0]["name"] != 1 and high < tmp[i+1]["name"]):
                    high = tmp[i+1]["name"]
                elif(high==None):
                    high = tmp[i+1]["name"]

        if(flush == 3):
            return {"count":1, "high":high}
    return {"count":0, "high":0}


def fullhouse(cards):
    fh = 0
    comb = list(itertools.combinations(cards, 5))
    high = None
    for com in comb:
        counter_list = [c["name"] for c in com]
        counter = Counter(counter_list)
        if(len(counter.most_common())==2):
            if(counter.most_common()[0][1]==3 and counter.most_common()[1][1]==2):
                fh = 1
                if(high!=None and high < counter.most_common()[0][0]):
                    high = counter.most_common()[0][0]
                elif(high==None):
                    high = counter.most_common()[0][0]

    if(fh==1):
        return {"count":1, "high":high}
    else:
        return {"count":0, "hight":0}


def four(cards):
    four = 0
    comb = list(itertools.combinations(cards, 4))
    high = None
    for c in comb:
        if(c[0]["name"] == c[1]["name"] == c[2]["name"] == c[3]["name"]):
            four = 1
            high = c[0]["name"]
    if(four == 1):
        return {"count":four, "high":high}
    else:
        return {"count":0, "high":0}

# issue:これだとhighカード以外での比較がtieになってしまうので
# ハンドを強い順から比較してどのプレイヤーが勝利しているかを計算した方がよい
def check_hand(player, board_cards):
    # print(player)
    # print("-"*10)
    # print(board_cards)
    # player_win = [0 for i in player]
    temp = [[*i, *board_cards] for i in player]
    # ここ将来的にクラス化
    ply_hands = [{
        "highc":{
            "count":0,
            "high":0
        },
        "pair":{
            "count":0,
            "high":0
        },
        "three":{
            "count":0,
            "high":0
        },
        "straight":{
            "count":0,
            "high":0
        },
        "flush":{
            "count":0,
            "high":0
        },
        "fullhouse":{
            "count":0,
            "high":0
        },
        "four":{
            "count":0,
            "high":0
        },
        "straightflush":{
            "count":0,
            "high":0
        },
        "royal":{
            "count":0,
            "high":0
        },
    } for i in player]
    for hands, t in zip(ply_hands, temp):
        hands["highc"] = high(t)
        hands["pair"] = pair(t)
        hands["three"] = three(t)
        hands["straight"] = straight(t)
        hands["flush"] = flush(t)
        hands["fullhouse"] = fullhouse(t)
        hands["four"] = four(t)
        # ここから下はstraightとflushのフラグがどちらもある場合のみ
        if(hands["straight"]["count"]==1 and hands["flush"]["count"]==1 and hands["straight"]["high"]!=1):
            hands["straightflush"] = {
                "count": 1,
                "high": hands["straight"]["high"]
            }
        elif(hands["straight"]["count"]==1 and hands["flush"]["count"]==1 and hands["straight"]["high"]==1):
            hands["royal"] = {
                "count":1,
                "high":hands["straight"]["high"]
            }
    # print(ply_hands[1]["straight"])
    # playerの勝利している方に+1を加算
    return ply_hands

def check_high(win, hand, ply_num):
    if(win["high"] == hand["high"]):
        win["player"]=100
        win["count"]=0
        win["high"]=0
    elif(win["high"] < hand["high"] and win["high"]!=1):
        win["player"] = ply_num
        win["high"] = hand["high"]
        win["count"] = hand["count"]

    return win

def calcu_win(play_hands, win_ratio):
    key_list = ["royal", "straightflush", "four", "fullhouse", "flush", "straight", "three", "pair", "highc"]
    win = {
        "player":100,
        "count":0,
        "high":0
    }
    # 役の高い順から比較
    # 誰かのcountが1で他が0なら勝利　トータルとその役に+1
    # どちらのcountも同じならhighカードで比較
    for key in key_list:
        for i, n in enumerate(play_hands):
            # pairの時だけカウントを見る
            if(key != "pair"):
                if(n[key]["count"] > 0):
                    if(win["player"]!=100):
                        # highカードの比較
                        win = check_high(win, n[key], i)
                    else:
                        win["player"] = i
                        win["high"] = n[key]["high"]
                        win["count"] = n[key]["count"]
            elif(key == "pair"):
                if(win["count"] == n[key]["count"]):
                    if(win["player"]!=100):
                        # highカードの比較
                        win = check_high(win, n[key], i)
                    else:
                        win["player"] = i
                        win["high"] = n[key]["high"]
                        win["count"] = n[key]["count"]
                elif(win["count"] < n[key]["count"]):
                    win["player"] = i
                    win["high"] = n[key]["high"]
                    win["count"] = n[key]["count"]

        if(win["player"]!=100 and key!="pair"):
            win_ratio[win["player"]][key] += 1
            win_ratio[win["player"]]["total"] += 1
            break
        elif(win["player"]!=100 and key=="pair" and win["count"] == 2):
            win_ratio[win["player"]]["twopair"] += 1
            win_ratio[win["player"]]["total"] += 1
        elif(win["player"]!=100 and key == "pair" and win["count"] == 1):
            win_ratio[win["player"]]["pair"] += 1
            win_ratio[win["player"]]["total"] += 1

    return win_ratio

def calculate_win(comb, player):
    # player = [0 for i in range(len(player))]
    # モンテカルロシミュレーションの勝率計算(あんまり正確ではないから今後の課題)
    # 乱数で呼び出す配列の要素を決定する
    comb_len = calcu_comb_len(comb)
    win_ratio = [{
        "highc":0,
        "pair":0,
        "twopair":0,
        "three":0,
        "straight":0,
        "flush":0,
        "fullhouse":0,
        "four":0,
        "straightflush":0,
        "royal":0,
        "total":0
        } for i in player]
    # print(player)
    for i in range(int(len(comb)/comb_len)):
        num = randrange(0, len(comb))
        board_cards = [*comb[num]]
        # boardとplyのハンドから5枚を取り出し，役の比較
        play_hands = check_hand(player, board_cards)
        # print(board_cards)
        win_ratio = calcu_win(play_hands, win_ratio)
    
    return win_ratio


def calcu_ratio(json):
    ply = get_ply_card(json["player"])
    board = get_board_card(json["board"])
    json_data = [{
        "ply":"ply{}-win".format(i+1),
        "win":0
    }for i,p in enumerate(ply)]
    # print(ply)
    # print("-"*10)
    # print(board)
    board_comb = create_comb(ply, board)
    # print(comb)

    win = calculate_win(board_comb, ply)
    
    for i,w in enumerate(win):
        json_data[i]["win"] = w["total"]/(len(board_comb)/calcu_comb_len(board_comb))
    # print(ply)
    print(json_data)

    return json_data