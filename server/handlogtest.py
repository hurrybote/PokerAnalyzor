import re

## ログの整形とDBへの格納
def formating_log():
    # フロントからアップロードされたファイルの名前を加工
    filename = "HH20191118 Nephthys IV - 50-100 - プレイマネー ノーリミット ホールデム.txt"
    filename_date, filename_table, filename_num, filename_blind = split_filename(filename)
    # print(filename_date, filename_table, filename_num, filename_blind)

    with open("handlog/{}".format(filename), "r", encoding="utf-8") as f:
        handlog_lines = f.readlines()
        handlogs = sep_handlog(handlog_lines)
        print(handlogs[0])


def split_filename(filename):
    filename_spl = filename.split(" ")
    return filename_spl[0], filename_spl[1], filename_spl[2], filename_spl[4]


def sep_handlog(handlog_lines):
    tmp = []
    handlogs = []
    for log in handlog_lines:
        log = log.replace("\n", "")
        log = log.replace("\ufeff", "")
        if(log == ''):
            continue

        if(bool(re.search(r'#[0-9]{10,16}', log)) and len(tmp)>0):
            handlogs.append(tmp)
            tmp = []
        tmp.append(log)
    handlogs.append(tmp)
    return handlogs

class game():
    def __init__(self, handlogs):
        pass
    
    def pick_seatinfo():
        pass

    def pick_tableinfo():
        pass

    def pick_flopinfo():
        pass

    def pick_turninfo():
        pass

    def pick_riverinfo():
        pass

    def pick_showdowninfo():
        pass


class player():
    def __init__(self, ):
        pass
    



if __name__ == '__main__':
    formating_log()