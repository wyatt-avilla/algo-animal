from dbclasses import User, Problem, Pet, Archive

mongo_uri = "mongodb+srv://ryanokimoto2003:YkERBrxtMCaYiz0D@project 0.mongodb.net/tomagotchiDB?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
print(client.list_database_names())

db = client.tomagotchiDB
users = db.users
problems = db.problems
pets = db.pets
archives = db.archives