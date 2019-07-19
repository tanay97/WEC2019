import math
def single_elimination(teams):

    valid_teams = teams
    match_index = 1
    while (len(valid_teams) > 1):
        n = len(valid_teams)
        k = int(math.log2(n))
        num_byes = n-pow(2,k)


        byes = valid_teams[0:num_byes]
        players = valid_teams[num_byes:]
        matches= {}

        for i in range(int(len(players)/2)):
            matches[match_index] = [ players[i], players[len(players) -i -1]]
            print("Match " + str(match_index) + " : " + players[i] + " Vs. " + players[len(players) -i -1])
            match_index = match_index + 1

        for bye in byes:
            print(bye + " gets a bye")
        valid_teams = byes
        for match in matches.keys():
            valid_teams.append("winner of match " + str(match) )






while True :
    
    

single_elimination(['1', '2','3','4','5', '6', '7','8','9'])


