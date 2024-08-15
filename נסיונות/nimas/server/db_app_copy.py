import requests
import json
import datetime
import calendar
import time
import os
from pymongo import MongoClient, collection
# from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
# from celery import app

load_dotenv()

db_name = os.getenv("DB_NAME")
collection_name = os.getenv("COLLECTION_NAME")


def main():
    try:
        client = connect_mongo()
        collection = create_collection_schema(client)
        insert_old_data(collection)
        # insert_new_data(collection)
        client.close()

    except Exception as e:
        raise ValueError(f"Failed : {e}")


def connect_mongo():
    try:
        # client = MongoClient("mongodb://0.0.0.0:27017")
        client = MongoClient(os.getenv("MONGO_HOST"),
                             int(os.getenv("MONGO_PORT")))
        return client

    except Exception as e:
        raise ValueError(f"Mongo not available : {e}")


def create_collection_schema(client: MongoClient):
    try:
        db = client[db_name]
        db.create_collection(collection_name, validator={
            "$jsonSchema": {
                "bsonType": "object",
                "required": ["date", "average"],
                "properties": {
                    "date": {
                        "bsonType": "string"
                    },
                    "average": {
                        "bsonType": "string"
                    }
                }
            }
        })
        collection = db[collection_name]
        return collection

    except Exception as e:
        raise ValueError(f"Create collection failed : {e}")


def insert_old_data(collection: collection):
    try:
        with open("db/cache.py", "r") as f:
            data = f.read()
            collection.insert_many(json.loads(data))

    except Exception as e:
        raise ValueError(f"Insert data failed : {e}")

# @app.shared_task
def insert_new_data(collection: collection):
    try:
        while True:
            print("wait")
            today = datetime.date.today()
            if today.day == calendar.monthrange(today.year, today.month):
                collection.insert_one(get_dollar_exchange_rate())
            time.sleep(3600)

    except Exception as e:
        raise ValueError(f"Insert data failed : {e}")


def get_dollar_exchange_rate():
    try:
        url = "https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/?c%5BDATA_TYPE%5D=OF00&c%5BBASE_CURRENCY%5D=USD&lastNObservations=1&format=sdmx-json&normalisefreq=M;mean&round=2"
        res = requests.get(url)
        stream_content = res.content.decode('utf-8')
        json_data = json.loads(stream_content)
        average_monthly = json_data['data']['dataSets'][0]['series']['0:0:0:0:0:0']['observations']['0'][0]
        current_date = get_date()
        new_data = {"date": current_date, "average": average_monthly}
        return new_data

    except ValueError as e:
        raise ValueError(f"Failed get data:  {e}")


def get_date():
    try:
        time = datetime.datetime.now()
        month = time.strftime('%B')
        year = time.year
        return month+str(year)

    except ValueError as e:
        raise ValueError(f"Failed get date:  {e}")


def get_history_dollar_rate():
        try:
            return list(connect_mongo()[db_name][collection_name].find({}))
        except ValueError as e:
            raise ValueError(f"Failed get data: {e}")

if __name__ == '__main__':
    main()
