import time
import math

def check_car_number(car_number):
    if len(car_number) != 6:
        return False
    elif len(car_number) == 6:
        iteration = 1
        for letter in car_number:
            if 0 < iteration < 4 and letter.isdigit():
                iteration += 1
            elif 3 < iteration < 6 and type(letter) == str:
                iteration += 1
            elif iteration == 6 and type(letter) == str:
                return True
    

while True:
    car_number = input("Enter your car number: ")
    if check_car_number(car_number) == True:
        break
    elif check_car_number(car_number) == False:
        print("NB! The car number must be in the following format: 123ABC\n")


print("Car number successfully entered!\n")
parking_started = time.time()


while True:
    owner_action = input("Type 'TIME' to see how long the car has been parked or 'END' to stop parking: ")

    if owner_action == "TIME":
        print(f"The car {car_number} has been parked for {math.ceil(time.time() - parking_started)} seconds.\n")
    elif owner_action == "END":
        print(f"{car_number} parked for a total of {math.ceil(time.time() - parking_started)} seconds.\n")
        break
    else:
        print("Wrong input!\n")
        continue




#print("Until next time:)")