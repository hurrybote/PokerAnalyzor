from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from flask_cors import CORS
from module.calcu_win_ratio import calcu_ratio


app = Flask(__name__)
CORS(app)
upload_folder = './handlog'

@app.route('/')
def index():
    console.log("top")


@app.route('/calc', methods=['POST'])
def calc_win_ratio():
    if request.method == 'POST':
        print('get request from front')
        # print(request.json)
        ratio = calcu_ratio(request.json)
    # return Jsonify()
    return jsonify(ratio)


# uploadされたファイルをDBに保存
@app.route('/upload/<filename>', methods=['POST'])
def upload_file(filename):
    if request.method == 'POST':
        print(request.files.get('upfile'))
        upfile = request.files.get('upfile')
        if upfile:
            upfile.save(os.path.join(upload_folder, filename))
    return "OK"

if __name__ == '__main__':
    app.debug = True
    app.run(host="localhost", port="33565")
    app.config['UPLOAD_FOLDER'] = upload_folder
    # maxcontentsize
    # app.config['MAX_CONTENT_LENGTH'] = 16*1024*1024
