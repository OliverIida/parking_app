import time
import math
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

planes = []
planes_with_start_time = {}


def check_plane_number(plane_number):
    if len(plane_number) != 6:
        return False
    if not plane_number[:3].isdigit():
        return False
    if not plane_number[3:].isalpha():
        return False
    return True


def actions_input(owner_action, plane_number):
    if owner_action == "time":
        return f"The plane {plane_number} has been parked for {math.ceil(time.time() - planes_with_start_time[plane_number])} seconds.\n"
    elif owner_action == "end":
        parked_time = math.ceil(time.time() - planes_with_start_time[plane_number])
        del planes_with_start_time[plane_number]
        planes.remove(plane_number)
        return f"{plane_number} parked for a total of {parked_time} seconds.\n"
    else:
        return "Wrong input!\n"


@app.route('/park', methods=['POST'])
def park_plane():
    data = request.get_json()
    plane_number = data.get('plane_number', '').upper()
    
    if not check_plane_number(plane_number):
        return jsonify({
            'message': "NB! The plane number must be in the following format: 123ABC\n",
            'status': 'error'
        }), 200
    
    # Check if plane already exists
    if plane_number in planes:
        return jsonify({
            'message': "Type 'Time' to see how long the plane has been parked for\nType 'End' to stop parking",
            'status': 'exists',
            'plane_number': plane_number
        }), 200
    
    # Check if parking lot is full
    if len(planes) >= 8:
        return jsonify({
            'message': "Parking lot is full! Maximum capacity is 8 planes.\n",
            'status': 'error'
        }), 200
    
    # Park the plane
    planes.append(plane_number)
    planes_with_start_time[plane_number] = time.time()
    return jsonify({
        'message': f"Plane {plane_number} parked!\n",
        'status': 'parked'
    }), 200


@app.route('/action', methods=['POST'])
def handle_action():
    data = request.get_json()
    owner_action = data.get('action', '').lower()
    plane_number = data.get('plane_number', '').upper()
    
    if plane_number not in planes:
        return jsonify({
            'message': "Plane not found!",
            'status': 'error'
        }), 200
    
    message = actions_input(owner_action, plane_number)
    return jsonify({
        'message': message,
        'status': 'success',
        'ended': owner_action == 'end'
    }), 200


@app.route('/planes', methods=['GET'])
def get_planes():
    return jsonify({
        'planes': planes
    }), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)

