import datetime
import json
import os
import requests
from db import DataProcessor

data_processor=DataProcessor()

def insert_data():
    data_processor.insert_data_history()
def insert_new():
    data_processor.insert_monthly_average(get_dollar_exchange_rate())
def get_data():
    return data_processor.get_history_dollar_rate()

def get_dollar_exchange_rate():
    try:
        url =os.getenv("URL_DOLAR_RATE")
        res = requests.get(url)
        stream_content = res.content.decode('utf-8')
        json_data = json.loads(stream_content)
        average_monthly = json_data['data']['dataSets'][0]['series']['0:0:0:0:0:0']['observations']['0'][0]
        current_date = get_date()
        new_data = {"date": current_date, "average": average_monthly}
        return new_data
    except ValueError as e:
        raise ValueError(f"Failed get data: {e}")

def get_date():
    try:
        time = datetime.datetime.now()
        month = time.strftime('%B')
        year = time.year
        return month + str(year)
    except ValueError as e:
        raise ValueError(f"Failed get date: {e}")