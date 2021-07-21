from datetime import time
from time import sleep
import os
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, redirect, url_for, abort, \
    send_from_directory
import json

app = Flask(__name__)

cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAX_CONTENT_LENGTH'] = 2000000 * 1024 * 1024
app.config['UPLOAD_EXTENSIONS']  = ['.jpg', '.png', '.gif','.exe','.mp3', '.wav', '.m4a']
app.config['STATIC_PATH'] = 'static'


@app.errorhandler(413)
def too_large(e):
    return "File is too large", 413

@cross_origin()
@app.route('/')
def index():

    return render_template('index.html',track= {} )

@cross_origin()
@app.route('/get_data')
def get_status():
    
    status_file = open("status.json")
    status_data = status_file.read()
    status_file.close()

    status_data = json.loads(status_data)

    return status_data

@cross_origin()
@app.route('/post_data')
def post_status():

    status_file = open("status.json","w" )
    data = request.args
    status_data = json.dumps(data)
    status_file.write(status_data)

    status_file.close()

    return data

if __name__ == '__main__':
    app.run(debug=True)

    