import pytest
from mongomock import MongoClient


@pytest.fixture
def mongo_client():
    return MongoClient()


def test_mongo_operations(mongo_client):
    db = mongo_client['test_db_exchange_rate']
    collection = db['test_collection_dollar']
    collection.insert_one({'date': 'April2040','average':'4.23'})

    result = collection.find_one({'date': 'April2040','average':'4.23'})
    assert result is not None
    assert result['date'] == 'April2040'
