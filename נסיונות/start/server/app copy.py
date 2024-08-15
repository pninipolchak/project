import pyodbc
import json


import os
from flask import Flask, request

connect_str="DRIVER={SQL Server};"\
            "SERVER=YOSSI-SHABAT;"\
            "DATABASE=pokemons"


app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    try: 
        file = request.files['file']
        if file:
            if not os.path.exists("../server"):
                os.mkdir("../server")
            file.save(os.path.join("../server", os.path.basename(file.filename) ))
            return f"File {file.filename} upload to server", 200

    except Exception as e:
        raise ValueError(e)

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=4000,debug=True)
# def ex1():
#     query = "select p_name from  [dbo].[Pokemons_tbl] where p_weight=(SELECT MAX (p_weight) AS p_weight FROM [dbo].[Pokemons_tbl]);"
#     cursor.execute(query)
#     print(cursor.fetchone())

# def ex2(type_of_pokemon):
#     query=f"SELECT p_name FROM Pokemons_tbl WHERE p_type LIKE '{type_of_pokemon}'"
#     cursor.execute(query)
#     data=cursor.fetchall()
#     return data

# def ex3(pokemon_name):
#     query = f"SELECT t_name FROM Trainers_tbl t JOIN TrainersForPokemons_tbl tp ON t.t_code = tp.codeTrainer  JOIN Pokemons_tbl p ON p.p_id =tp.codePokemon WHERE p_name = '{pokemon_name}'"
#     cursor.execute(query)
#     data = cursor.fetchall()
#     return data

# def ex4(trainer_name):
#     query = f"SELECT p_name FROM Trainers_tbl t JOIN TrainersForPokemons_tbl tp ON t.t_code = tp.codeTrainer  JOIN Pokemons_tbl p ON p.p_id =tp.codePokemon WHERE t_name = '{trainer_name}'"
#     cursor.execute(query)
#     data = cursor.fetchall()
#     return data



# with open('pok_data.json', 'r') as new_file:
#     dict=json.load(new_file)

with pyodbc.connect(connect_str) as connection:
    cursor=connection.cursor()

    # insert values to tables:
    # for p in dict:
    #     query1 = "INSERT INTO Pokemons_tbl VALUES(?,?,?,?,?)"
    #     cursor.execute(query1, (p['id'],p['name'],p['type'],p['height'],p['weight']))
    #     listTrainer = p['ownedBy']
    #     for t in listTrainer:
    #         query2 = "INSERT INTO Trainers_tbl VALUES(?,?)"
    #         cursor.execute(query2, (t['name'],t['town']))
    #         n=t['name']
    #         query3 = f"SELECT t_code FROM Trainers_tbl WHERE t_name LIKE ?"
    #         cursor.execute(query3,t['name'])
    #         t_code = cursor.fetchone()
    #         query4 = f"INSERT INTO TrainersForPokemons_tbl VALUES(?,?)"
    #         cursor.execute(query4, (t_code[0], p['id']))


    # ex1()
    # type_of_poke = input(
    #     "Enter a type to search! "
    #     "[grass, fire, water, bug, dragon, "
    #     "electric,fairy, fighting, ghost, ground,"
    #     " ice, normal, poison, psychic,rock]\n ")
    # found_poke_type = ex2(type_of_poke)
    # print(found_poke_type)

    # pokemon = input("Enter a pokemon's name\n")
    # print(ex3(pokemon))

    # trainer = input("Enter a trainer to search his pokemons\n")
    # print(ex4(trainer))

