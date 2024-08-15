import requests
import json
from pymongo import MongoClient  
# import pymongo
from pymongo.errors import ConnectionFailure


def main():
    connect_mongo()
    
    
def connect_mongo():
    try:
        client = MongoClient("mongodb://172.0.0.3:27017")
        create_database(client)
        
    except ConnectionFailure as e:
        raise ConnectionFailure(f"Server not available : {e}") 
    

def create_database(client: MongoClient):
    try:
        db = client["exchange_rate"]
       
        db.create_collection("dollar", validator={
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
    except ConnectionFailure as e:
        raise ConnectionFailure(f"Create failed : {e}")   
    
def get_dollar_exchange_rate():
    try:
        url="https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/?c%5BDATA_TYPE%5D=OF00&c%5BBASE_CURRENCY%5D=USD&lastNObservations=1&format=sdmx-json&normalisefreq=M;mean&round=2"
        res= requests.get(url)
        stream_content = res.content.decode('utf-8')
        json_data = json.loads(stream_content)
        average_monthly=json_data['data']['dataSets'][0]['series']['0:0:0:0:0:0']['observations']['0'][0]
    
    except ValueError as e:
        raise ValueError(f"Could not get data:  {e}")


if __name__ == '__main__':
    main()

