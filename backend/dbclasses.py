from mongoengine import Document, StringField, IntField, ListField, BooleanField, DateTimeField, ReferenceField, EmbeddedDocument, EmbeddedDocumentField

class User(Document):
    points = IntField(default=0)
    auth0_id = StringField(required=True, unique=True)
    koala = BooleanField(default=False)
    cat = BooleanField(default=False)
    food = IntField(default=0)
    petStatus = IntField(default=5)
    petBirth = DateTimeField()
    lastFed = DateTimeField()

class Problem(Document):
    problemID = StringField(required=True, unique=True)
    question = StringField()
    test_cases = ListField(StringField())
    reward = IntField()
    difficulty = StringField()
    completed = BooleanField(default=False)