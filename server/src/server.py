from flask import Flask, jsonify
# from flask.json import jsonify
from db_function import get_data, insert_data_history, insert_monthly_average


app = Flask(__name__)


@app.route('/get_data', methods=['GET'])
def get_rate():
    try:
        data = get_data()
        data_list = [{'date': item['date'], 'average': item['average']} for item in data]        # data_list = [{f"date:{item['date']},'average':{item['average']}"} for item in data]
        print(data_list)
        if len(data_list) != 0:
            # print(data_list)
            # return {"data_list":data_list}
            return jsonify({'data': data_list})
        return jsonify({'no data': []})

    except Exception as e:
        raise Exception(f"Failed in server : {e}")


if __name__ == '__main__':
    insert_data_history()
    insert_monthly_average()

    app.run(host="0.0.0.0", port=8000, debug=True)
