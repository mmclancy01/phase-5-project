from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask import Flask
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from config import db

bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password = db.Column(db.String, nullable = False)
    age = db.Column(db.Integer)
    handicap = db.Column(db.Float)
    email = db.Column(db.String, unique=True)
    bio = db.Column(db.String)
    img = db.Column(db.String)
    scores = db.relationship('Score', back_populates= 'users')

    serialize_rules = ['-scores']

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, new_password):
        pass_hash = bcrypt.generate_password_hash(new_password.encode('utf-8'))
        self._password = pass_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))
    

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    length = db.Column(db.Integer)
    private = db.Column(db.Boolean, default=False, nullable=False)
    par = db.Column(db.Integer)
    slope = db.Column(db.Integer)
    rating = db.Column(db.Float)
    description = db.Column(db.String)
    img = db.Column(db.String)
    scores = db.relationship('Score', back_populates= 'courses')

    serialize_rules = ['-scores']

    

class Score(db.Model, SerializerMixin):
    __tablename__ = 'scores'
    id = db.Column(db.Integer, primary_key=True)
    course = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    score = db.Column(db.Integer)

    users = db.relationship('User', back_populates= 'scores')
    courses = db.relationship('Course', back_populates= 'scores')

    serialize_rules = ['-users.scores', '-courses.scores']