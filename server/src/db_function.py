import datetime
import json
import os
import requests
from db import DataProcessor
from const import DolarRates

data_processor=DataProcessor()

def insert_data_history():
    data_processor.insert_history()

def insert_monthly_average():
    data_processor.insert_average(get_dollar_exchange_rate())

def get_data():
    return data_processor.get_history_dollar_rate()

def get_high_data():
    return data_processor.get_higher_data()

def get_low_data():
    return data_processor.get_lower_data()

def get_last_data():
    return data_processor.get_last_data()

def get_dollar_exchange_rate():
    try:
        # url =DolarRates.URL
        # res = requests.get(url)
        # stream_content = res.content.decode('utf-8')
        # json_data = json.loads(stream_content)
        # average_monthly = json_data['data']['dataSets'][0]['series']['0:0:0:0:0:0']['observations']['0'][0]
        current_date = get_date()
        # new_data = {"date": current_date, "average": average_monthly}
        # return new_data
        return {"date": current_date, "average": 0.00}

    except Exception as e:
        raise ValueError(f"Failed get dollar exchange rate: {e}")

def get_date():
    try:
        time = datetime.datetime.now()
        month = time.strftime('%B')
        year = time.year
        return month + str(year)
        
    except Exception as e:
        raise ValueError(f"Failed get date: {e}")