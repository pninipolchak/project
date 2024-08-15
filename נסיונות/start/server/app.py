from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/mydatabase'
mongo = PyMongo(app)

@app.route('/data', methods=['GET'])
def get_data():
    data = mongo.db.collection.find()
    output = []
    for d in data:
        output.append({'data': d['data']})
    return jsonify({'result': output})

@app.route('/data', methods=['POST'])
def add_data():
    new_data = {'data': request.json['data']}
    mongo.db.collection.insert_one(new_data)
    return jsonify({'message': 'Data added successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)
