import time
import math

def check_car_number(car_number):
    if len(car_number) != 6:
        return False
    if not car_number[:3].isdigit():
        return False
    if not car_number[3:].isalpha():
        return False
    return True
    
cars = []

while True:
    car_number = input("Enter your car number: ")
    if check_car_number(car_number) == True:
        print("Car number successfully entered!\n")
        cars.append(car_number)
        break
    elif check_car_number(car_number) == False:
        print("NB! The car number must be in the following format: 123ABC\n")

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


print(cars)

#print("Until next time:)")