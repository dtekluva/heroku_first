from datetime import time
from time import sleep
import os
from flask import Flask, render_template, request, redirect, url_for, abort, \
    send_from_directory
from werkzeug.utils import secure_filename


app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 2000000 * 1024 * 1024
app.config['UPLOAD_EXTENSIONS']  = ['.jpg', '.png', '.gif','.exe','.mp3', '.wav', '.m4a']
app.config['STATIC_PATH'] = 'static'


@app.errorhandler(413)
def too_large(e):
    return "File is too large", 413

@app.route('/')
def index():

    return render_template('index.html',track= {} )

if __name__ == '__main__':
    app.run(debug=True)

    