import math


def single_elimination(teams, starting_index = 0, round = 1):
    out_match = []

    valid_teams = teams
    match_index = starting_index

    while (len(valid_teams) > 1):
        n = len(valid_teams)
        num_byes = 0 if n % 2 == 0 else 1


        byes = valid_teams[0:num_byes]
        players = valid_teams[num_byes:]
        matches= {}

        for i in range(int(len(players)/2)):
            matches[match_index] = [ players[i], players[len(players) -i -1]]
            out_match.append({"home" :  players[i],  "away" : players[len(players) -i -1], "round": round, "winner": ""})
            #print("Match " + str(match_index) + " : " + players[i] + " Vs. " + players[len(players) -i -1])
            match_index = match_index + 1

        valid_teams = byes
        for match in matches.keys():
            valid_teams.append(match)
        round  = round +1
    #print(out_match)
    return out_match


# def single_elimination(teams, starting_index):
#     out_match = []
#
#     valid_teams = teams
#     match_index = starting_index
#     round = 1
#     while (len(valid_teams) > 1):
#         n = len(valid_teams)
#         num_byes = 0 if n % 2 == 0 else 1
#
#         byes = valid_teams[0:num_byes]
#         players = valid_teams[num_byes:]
#         matches = {}
#
#         for i in range(int(len(players) / 2)):
#             matches[match_index] = [players[i], players[len(players) - i - 1]]
#             out_match.append({"home": players[i], "away": players[len(players) - i - 1], "round": round, "winner": ""})
#             # print("Match " + str(match_index) + " : " + players[i] + " Vs. " + players[len(players) -i -1])
#             match_index = match_index + 1
#
#         valid_teams = byes
#         for match in matches.keys():
#             valid_teams.append(match)
#         round = round + 1
#     # print(out_match)
#     return out_match



# def get_rankings(matches = {}):
#     rounds = 0
#     matches = 0
#     ranks = []
#     for match in matches.keys():
#         rounds = max(rounds, matches[match]["round"])
#         matches  = max(matches, match)
#
#     ranks.append()




#single_elimination(["penis", "penis2", "penis3" , "penis4", "penis5"])





# print_first_round(teams, matches)
# print(matches)
# print("When a match is done enter result as # winner_name")

# single_elimination(teams)
