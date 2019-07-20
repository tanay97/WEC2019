from singleElim import *


if __name__ == '__main__':
    print("\nInput seed teams, enter \"done\" when done")

    teams = []
    while True :
        x =  input()
        if x == 'done':
            break
        else :
            teams.append(x)

    print("\nSingle Elimination: se")
    print("Double Elimination: de")
    print("Round Robin: rr\n")
    
    text = input("Which game mode would you like?: ")
    if text == "se":
        single_elimination(teams)
        

