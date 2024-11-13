import pytest
from mongomock import MongoClient
from src.server import app


@pytest.fixture
def mongo_client():
    return MongoClient()


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_get_data(client,mongo_client):
    try:
        response = client.get("http://0.0.0.0:4000/get_data")
        data=response.json
        assert 'data' in data   
        assert response.status_code == 200
        
    except Exception as e:
        raise ValueError(e)
