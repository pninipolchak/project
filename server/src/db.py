import calendar
import time
import datetime
import json
import os
from pymongo import MongoClient
import pymongo
from const import DB


class DataProcessor:
    def __init__(self):
        self.db_name = DB.DB_NAME
        self.collection_name = DB.COLLECTION_NAME
        self.client = self.connect_mongo()
        self.collection = self.client[self.db_name][self.collection_name]


    def connect_mongo(self):
        try:
            return MongoClient(DB.ATLAS_URL)
        
        except Exception as e:
            raise ValueError(f"Mongo not available: {e}")


    def insert_history(self):
        try:
            with open("src/cache.py", "r") as f:
                data = f.read()
                self.collection.insert_many(json.loads(data))
                
        except Exception as e:
            raise ValueError(f"Insert history data failed: {e}")


    def insert_average(self, new_rate: json):
        try:
            # while True:
            #     today = datetime.date.today()
            #     if today.day == calendar.monthrange(today.year, today.month)[1]:
            #         self.collection.insert_one(new_rate)
            #     time.sleep(3600)
            self.collection.insert_one(new_rate)
        
        except Exception as e:
            raise ValueError(f"Insert new data failed: {e}")

    
    def get_history_dollar_rate(self):
        try:
            return self.collection.find({})
        
        except ValueError as e:
            raise ValueError(f"Failed get data: {e}")

    
    def get_higher_data(self):
        try:
            return self.collection.find_one({}, sort=[("average", pymongo.DESCENDING)])
        
        except ValueError as e:
            raise ValueError(f"Failed get data: {e}")
        
        
    def get_lower_data(self):
        try:
            return self.collection.find_one({}, sort=[("average", pymongo.ASCENDING)])
        
        except ValueError as e:
            raise ValueError(f"Failed get data: {e}")
        