import pandas as pd
import sqlite3


def put_data_db(trump_df, table_name, conn):
    trump_df.to_sql(table_name, conn, if_exists='replace')


def create_card_table(dbname, table_name):
    create_table = 'create table IF NOT EXISTS {} (id int, name text, suit text)'.format(table_name)

    cur.execute(create_table)
    conn.commit()


if __name__ == '__main__':
    dbname = 'poker.db'
    table_name = 'cardlist'

    conn = sqlite3.connect(dbname)
    cur = conn.cursor()

    suit = ["s", "c", "d", "h"]
    trump = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    create_card_table(dbname, table_name)

    trump_card = []
    trump_suit = []
    id_num = 0

    for s in suit:
        for t in trump:
            trump_suit.append(s)
            trump_card.append(t)

    trump_df = pd.DataFrame({'name':trump_card, 'suit':trump_suit})

    put_data_db(trump_df, table_name, conn)
    
    cur.close()
    conn.close()