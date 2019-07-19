import math
args = ["A", "B", "C", "D", "E"]


def main():
	rounds = []
	round_count = 1
	get_round(args)


def get_round(teams):
	num_of_matches = int(math.log(len(teams), 2))
	print num_of_matches

if __name__ == '__main__':
	main()