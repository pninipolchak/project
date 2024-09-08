from flask import Flask, jsonify
from db_function import get_data, insert_data_history, insert_monthly_average,get_high_data,get_low_data
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/get_data', methods=['GET'])
def get_rate():
    try:
        data = get_data()
        data_list = [{'date': item['date'], 'average': item['average']} for item in data]
        if len(data_list) != 0:
            return jsonify({'list': data_list})
        return jsonify({'no data': []})

    except Exception as e:
        raise Exception(f"Failed in get data : {e}")


@app.route('/get_max_data', methods=['GET'])
def get_high_rate():
    try:
        data = get_high_data()
        date = data['date']
        if data: 
            return jsonify({'date': date})
        return jsonify({'no data': []})

    except Exception as e:
        raise Exception(f"Failed in get max data : {e}")
    

@app.route('/get_min_data', methods=['GET'])
def get_low_rate():
    try:
        data = get_low_data()
        date = data['date']
        if data: 
            return jsonify({'date': date})
        return jsonify({'no data': []})

    except Exception as e:
        raise Exception(f"Failed in get min data : {e}")
    

if __name__ == '__main__':
    insert_data_history()
    insert_monthly_average()

    app.run(host="0.0.0.0", port=8000)
