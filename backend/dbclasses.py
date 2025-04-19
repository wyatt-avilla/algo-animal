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

class Pet(Document):
    petID = StringField(required=True, unique=True)
    userID = ReferenceField(User)
    status = StringField()
    age = IntField()
    lastFed = DateTimeField()

class CompletedProblem(EmbeddedDocument):
    problemID = ReferenceField(Problem)
    rewarded = BooleanField()
    question = StringField()

class Archive(Document):
    archiveID = StringField(required=True, unique=True)
    userID = ReferenceField(User)
    completed = ListField(EmbeddedDocumentField(CompletedProblem))
    