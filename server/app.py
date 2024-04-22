#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify
from datetime import datetime
# from flask_restful import Resource
# from flask_migrate import Migrate
# from flask_cors import CORS
# import os
# Local imports
from config import app, db
# Add your model imports
from models import User, Course, Score, User

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.get('/courses')
def get_courses():
    courses = Course.query.all()
    return [c.to_dict() for c in courses], 200

@app.get('/users')
def get_users():
    users = User.query.all()
    return [u.to_dict() for u in users], 200

@app.get('/scores')
def get_scores():
    scores = Score.query.all()
    return [s.to_dict() for s in scores], 200