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


def current_cars():
    print(f"Currently we have {len(cars)} cars parking. They are: {cars}")
    print(f"Cars with their starting times: {cars_with_start_time}")


def actions_input(owner_action, car_number):
    if owner_action == "time":
        print(f"The car {car_number} has been parked for {math.ceil(time.time() - cars_with_start_time[car_number])} seconds.\n")
    elif owner_action == "end":
        print(f"{car_number} parked for a total of {math.ceil(time.time() - cars_with_start_time[car_number])} seconds.\n")
        del cars_with_start_time[car_number]
        cars.remove(car_number)
    else:
        print("Wrong input!\n")


def getting_owner_action(car_number):
        if car_number in cars:
            print("Type 'Time' to see how long the car has been parked for")
            print("Type 'End' to stop parking")
            owner_action = input("Select action: ")
            owner_action = owner_action.lower()
            return owner_action
        elif car_number not in cars:
            cars.append(car_number)
            cars_with_start_time[car_number] = time.time()
            print(f"Car {car_number} parked!\n")
            return None


cars = []
cars_with_start_time = {}


while True:
    car_number = input("Enter your car number: ")
    if check_car_number(car_number):
        owner_action = getting_owner_action(car_number)
        if owner_action == "time" or owner_action == "end":
            actions_input(owner_action, car_number)
        elif owner_action == None:
            continue
    else:
        print("NB! The car number must be in the following format: 123ABC\n")
        continue

