
## ログの整形とDBへの格納
def formating_log():
    # フロントからアップロードされたファイルの名前を加工
    filename = "HH20191119 Budrosa IV - 50-100 - プレイマネー ノーリミット ホールデム.txt"
    filename_date, filename_table, filename_num, filename_blind = split_filename(filename)
    # print(filename_date, filename_table, filename_num, filename_blind)

    with open("../../../poker/handlog/hurrybote/{}".format(filename), "r") as f:
        handlog_lines = f.readlines()
        handlogs = sep_handlog()
        print(handlog_lines[0])


def split_filename(filename):
    filename_spl = filename.split(" ")
    return filename_spl[0], filename_spl[1], filename_spl[2], filename_spl[4]


def sep_handlog(handlog_lines):
    for log in handlog_lines:
        if(bool(re.match(r'#\d{10,16}', log))):

    return


if __name__ == '__main__':
    formating_log()