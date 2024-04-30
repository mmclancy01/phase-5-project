from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask import Flask
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from config import db
from datetime import datetime


bcrypt = Bcrypt()

class User_Tee_time(db.Model, SerializerMixin):
    __tablename__ = 'users_tee_times'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tee_time_id = db.Column(db.Integer, db.ForeignKey('teetimes.id'))
    teetimes = db.relationship('Teetime', back_populates= 'users_tee_times')
    users = db.relationship('User', back_populates= 'users_tee_times')
    serialize_rules = ['-users.users_tee_times', '-tee_times']

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
    users_tee_times = db.relationship('User_Tee_time', back_populates= 'users')

    serialize_rules = ['-scores', '-users_tee_times']

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
    teetimes= db.relationship('Teetime', back_populates= 'courses')
    serialize_rules = ['-scores', '-teetimes']

    

class Score(db.Model, SerializerMixin):
    __tablename__ = 'scores'
    id = db.Column(db.Integer, primary_key=True)
    course = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    score = db.Column(db.Integer)

    users = db.relationship('User', back_populates= 'scores')
    courses = db.relationship('Course', back_populates= 'scores')

    serialize_rules = ['-users.scores', '-courses.scores']
    

class Teetime(db.Model, SerializerMixin):
    __tablename__ = 'teetimes'
    id = db.Column(db.Integer, primary_key=True)
    course = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    date= db.Column(db.Date, nullable=False)
    time= db.Column(db.Time, nullable=False)
    slots_available= db.Column(db.Integer, default= 4)
    courses = db.relationship('Course', back_populates= 'teetimes')
    users_tee_times = db.relationship('User_Tee_time', back_populates= 'teetimes')
    serialize_rules= ['-courses.teetimes', '-users_tee_times.teetimes']

