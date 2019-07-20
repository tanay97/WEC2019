from singleElim import *


def double_elimination(teams):
    matches =[]

    round = 1;
    valid_teams = teams
    n = len(valid_teams)
    idx = 0 if n%2 == 0 else 1
    valid_teams = teams[idx:]
    n = len(valid_teams)
    for i in range(int(len(valid_teams)/2)):
        matches.append({"home" : valid_teams[i], "away" : valid_teams[n -i -1], "round" : round})


    print (matches)







double_elimination(["a", "b" , "c" , "d" ,"e", "f", "g"])


