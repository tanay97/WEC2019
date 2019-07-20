from python.singleElim import *


def double_elimination(teams):
    matches =[]

    round = 1;
    valid_teams = teams

    n = len(valid_teams)
    idx = 0 if n%2 == 0 else 1
    byes = valid_teams[0:idx]
    valid_teams = teams[idx:]
    n = len(valid_teams)
    for i in range(int(len(valid_teams)/2)):
        matches.append({"home" : valid_teams[i], "away" : valid_teams[n -i -1], "round" : round, "winner" : ""})


    winners = byes
    losers = []
    for i in range(len(matches)):
        winners.append("winner_" + str(i))
        losers.append("loser_" + str(i))

    for k in single_elimination(winners, len(matches) ,2):
        matches.append(k)
    for k in single_elimination(losers, len(matches) , 2):
        matches.append(k)
    for m in matches:
        round = max(round, m["round"])
    matches.append({"home": len(matches) -1, "away":len(matches) -2, "round": round+1, "winner": ""})
    return matches






    #
    # print (matches)
    # print('\n')
    # print(winners)
    # print('\n')
    # print(losers)
    # print('\n')







double_elimination(["a", "b" , "c" , "d", 'e', 'f' ,'g','h','i'])


