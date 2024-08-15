from flask import Flask
from flask.json import jsonify
from db_function import get_data, insert_data_history, insert_monthly_average


app = Flask(__name__)


@app.route('/get_data', methods=['GET'])
def get_rate():
    try:
        data = get_data()
        data_list = [{f"{item['date']}:{item['average']}"} for item in data]

        if len(data_list) != 0:
            return jsonify({'data': data_list}), 200
        return jsonify({'no data': []}), 200

    except Exception as e:
        raise Exception(f"Failed in server {e}")


if __name__ == '__main__':
    insert_data_history()
    insert_monthly_average()

    app.run(host="0.0.0.0", port=3500, debug=True)
