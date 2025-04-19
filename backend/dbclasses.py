from mongoengine import Document, StringField, IntField, ListField, BooleanField, DateTimeField, ReferenceField, EmbeddedDocument, EmbeddedDocumentField

class User(Document):
    userID = StringField(required=True, unique=True)
    password = StringField(required=True)
    points = IntField(default=0)

class Problem(Document):
    problemID = StringField(required=True, unique=True)
    question = StringField()
    test_cases = ListField(StringField())
    reward = IntField()
    difficulty = StringField()
    completed = BooleanField(default=False)

class Pet(Document):
    petID = StringField(required=True, unique=True)
    userID = ReferenceField(User)
    status = StringField()
    age = IntField()
    lastFed = DateTimeField()



