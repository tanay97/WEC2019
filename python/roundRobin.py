import math
teams = ["A", "B", "C", "D", "E"]

def get_matches():
	matches = {}
	match_count = 1
	for i in range(len(teams)):
		for j in range(len(teams)):
			if j > i:
				match = {}
				match["home"] = teams[i]
				match["away"] = teams[j]
				match["winner"] = ""
				matches[str(match_count)] = match
				match_count += 1
	return matches
	

if __name__ == '__main__':

	print ("Round Robin Mode")

	current_match = 0
	matches = get_matches()
	print (matches)

