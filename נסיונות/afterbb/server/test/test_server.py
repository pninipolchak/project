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




# import pytest
# from mongomock import MongoClient
# import pytest_mock as mocker
# import os
# from src.server import app




# @pytest.fixture
# def client():
#     app.config['TESTING'] = True
#     with app.test_client() as client:
#         yield client

# @pytest.fixture
# def mock_mongo():
#     # mongo=MongoClient("localhost",27017)
#     with mocker.patch('pymongo.MongoClient', MongoClient):
#         yield 

# def test_get_data(client,mock_mongo):
#     try:
#         response = client.get("http://0.0.0.0:4000/get_data")
#         data=response.json()
         
#         # assert len(data)!=0
#         assert response.status_code == 200
        
#     except Exception as e:
#         raise ValueError(e)

# # import pytest
# # import mongomock
# # import pytest_mock as mocker
# # from app import create_app


# # @pytest.fixture()
# # def app(mocker, mock_database_client):  # noqa: F811
# #     """Return app connected to mock database"""  
# #     mock_mongo = mocker.patch("app.mongo._get_mongo_client")
# #     # the internal _get_mongo_client function is modified below to return the pre-configured
# #     # mongomock.MongoClient, instead of trying to initialize and return a pymongo.MongoClient
# #     # the MongoDB object will be initialized with the mongomock.MongoClient, when create_app
# #     # is called below.
# #     mock_mongo.return_value = mock_database_client

# #     app = create_app()
# #     app.config["TESTING"] = True

# #     # other setup can go here

# #     yield app

# #     # clean up / reset resources here


# # @pytest.fixture()
# # def database_item():
# #     """Mock db item"""
# #     item = {"foo": "bar"}

# #     return item


# # @pytest.fixture()
# # def mock_database_client(database_item):
# #     """
# #     Populated mock db
    
# #     This mock client will repleace the real pymongo client
# #     when running the tests.
# #     """
# #     client = mongomock.MongoClient()
# #     # Insert one example object:
# #     client["foo"]["bar"].insert_one(database_item)

# #     return client
