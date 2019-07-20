from flask import Flask, jsonify
from python.singleElim import *

app = Flask(__name__, static_folder="build/static", template_folder="build")

teams = ['penis', 'penis1', 'penis3', 'penis4']

@app.route('/getMatches')
def main():
    return jsonify(single_elimination(teams))

if __name__ == '__main__':
    app.run(host='localhost', port=5000)