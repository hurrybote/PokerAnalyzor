from flask import Flask, render_template, request, redirect, url_for
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
upload_folder = './handlog'

@app.route('/')
def index():
    console.log("top")

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
    app.run(host="localhost", port="8808")
    app.config['UPLOAD_FOLDER'] = upload_folder
    # maxcontentsize
    # app.config['MAX_CONTENT_LENGTH'] = 16*1024*1024
