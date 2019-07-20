from flask import Flask, jsonify
from python.singleElim import *

app = Flask(__name__, static_folder="build/static", template_folder="build")

teams = [
			{
				'winner': '',
				'home': 'A',
				'away': 'B',
			},
			{
				'winner': '',
				'home': 'C',
				'away': 'D',
			},
			{
				'winner': '',
				'home': 0,
				'away': 1,
			}
		]

@app.route('/getMatches')
def main():
    return jsonify(single_elimination(teams))

if __name__ == '__main__':
    app.run(host='localhost', port=5000)