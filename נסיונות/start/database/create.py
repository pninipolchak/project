import pymongo

# Establish a connection to the MongoDB server
client = pymongo.MongoClient("mongodb://localhost:27017/")

# Access the database
db = client["your_database_name"]

# Create a collection with field definitions
db.create_collection("Dollar", validator={
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["name", "value"],
        "properties": {
            "name": {
                "bsonType": "string"
            },
            "value": {
                "bsonType": "int"
            }
        }
    }
})

# Close the connection
client.close()
