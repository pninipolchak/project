from flask import Flask, jsonify
# from flask.json import jsonify
from db_function import get_data, insert_data_history, insert_monthly_average,get_high_data,get_low_data,get_last_data


app = Flask(__name__)


@app.route('/get_data', methods=['GET'])
def get_rate():
    try:
        data = get_data()
        data_list = [{'date': item['date'], 'average': item['average']} for item in data]
        if len(data_list) != 0:
            return jsonify({'data': data_list})
        return jsonify({'no data': []})

    except Exception as e:
        raise Exception(f"Failed in server : {e}")

@app.route('/get_high_data', methods=['GET'])
def get_high_rate():
    try:
        data = get_high_data()
        date = data['date']
        if data: 
            return jsonify({'data': date})
        return jsonify({'no data': []})

    except Exception as e:
        raise Exception(f"Failed in server : {e}")
    

@app.route('/get_low_data', methods=['GET'])
def get_low_rate():
    try:
        data = get_low_data()
        date = data['date']
        if data: 
            return jsonify({'data': date})
        return jsonify({'no data': []})

    except Exception as e:
        raise Exception(f"Failed in server : {e}")
    

@app.route('/get_last_data', methods=['GET'])
def get_last_rate():
    try:
        data = get_last_data()
        data_list = [{'date': item['date'], 'average': item['average']} for item in data]
        if len(data_list) != 0:
            return jsonify({'data': data_list})
        return jsonify({'no data': []})

    except Exception as e:
        raise Exception(f"Failed in server : {e}")


if __name__ == '__main__':
    insert_data_history()
    insert_monthly_average()

    app.run(host="0.0.0.0", port=8000, debug=True)
