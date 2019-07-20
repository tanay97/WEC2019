import math

def round_robin(teams):
	matches = []
	match_count = 1
	for i in range(len(teams)):
		for j in range(len(teams)):
			if j > i:
				match = {}
				match["home"] = teams[i]
				match["away"] = teams[j]
				match["winner"] = ""
				matches.append(match)
				match_count += 1
	print(matches)
	return matches
	

