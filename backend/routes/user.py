@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.json
    user = {
        "userID": data['userID'],
        "password": data['password'],
        "points": 0
    }
    users.insert_one(user)
    return jsonify({"message": "User created successfully"}), 201
