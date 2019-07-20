from flask import Flask, jsonify, request
from python.singleElim import *
from python.roundRobin import *
from python.doubleElim import *

app = Flask(__name__, static_folder="build/static", template_folder="build")

teams = ['penis', 'penis1', 'penis3', 'penis4']

@app.route('/getSingleElimMatches')
def main():
    teams = request.args.get('teamList')
    return jsonify(single_elimination(teams.split(',')))

@app.route('/getRoundRobinMatches')
def robin():
    teams = request.args.get('teamList')
    return jsonify(round_robin(teams.split(',')))


@app.route('/getDoubleElimMatches')
def double():
    teams = request.args.get('teamList')
    return jsonify(double_elimination(teams.split(',')))

if __name__ == '__main__':
    app.run(host='localhost', port=5000)