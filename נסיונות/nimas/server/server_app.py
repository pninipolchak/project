from flask import Flask
from function_db import get_data,insert_data,insert_new


app = Flask(__name__)

@app.route('/get_data', methods=['GET'])
def get_rate():
    try:
        data = get_data()
        list=[item for item in data]
        if len(list)!= 0:
            return f"list:{list}",200
        return "no data:{list}",200 
       
    except Exception as e:
        raise Exception(f"Failed in server {e}")


if __name__ == '__main__':
    insert_data()
    insert_new()

    app.run(host="0.0.0.0", port=4000)
