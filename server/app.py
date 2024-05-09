#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify, make_response
from datetime import datetime
from werkzeug.utils import secure_filename
# from flask_restful import Resource
# from flask_migrate import Migrate
# from flask_cors import CORS
import os
# Local imports
from config import app, db
# Add your model imports
from models import User, Course, Score, User, Teetime, User_Tee_time

UPLOAD_FOLDER = '/path/to/upload/folder'  # Specify the folder where you want to store uploaded files
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # Specify the allowed file extensions

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

@app.route('/user/<int:id>', methods= ['GET', 'PATCH', 'DELETE'])
def user_by_id(id):
    userobj = User.query.filter(User.id == id).first()

    if userobj is None:
        return {'error': 'user not found'}, 404
    
    if request.method == 'GET':
        return userobj.to_dict(), 200
    
    elif request.method == 'DELETE':
        # delete dog from the db
        db.session.delete(userobj)
        db.session.commit()
        return {}, 204


    elif request.method == 'PATCH':
        json_data = request.get_json()
        for field in json_data:
            value = json_data[field]
            setattr(userobj, field, value)

        if 'img' in request.files:
            img_file = request.files['img']
            if img_file.filename != '':
                filename = secure_filename(img_file.filename)
                if '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
                    img_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    userobj.img = filename


        db.session.add(userobj)
        db.session.commit()

        return userobj.to_dict(), 200

@app.get('/scores')
def get_scores():
    scores = Score.query.all()
    return [s.to_dict() for s in scores], 200

@app.post("/scores")
def post_scores():
    json_data = request.get_json()

    try:
        new = Score(
            course = json_data.get('course'),
            user = json_data.get('user'),
            score = json_data.get('score'),
            
        )
    except ValueError as e:
        return {"errors": ["validation errors"]}, 400
    
    db.session.add(new)
    db.session.commit()

    return new.to_dict(), 201

@app.get('/teetimes')
def get_tee_times():
    tee = Teetime.query.all()
    return [t.to_dict() for t in tee], 200

@app.get('/teetimes/<int:id>')
def get_t(id):
    t = Teetime.query.filter(Teetime.id == id).first()
    if not t:
        return {"error": "Tee Time not found"}, 404
    else: 
        return t.to_dict(), 200
    
@app.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()

    # check that user exists
    user = User.query.filter(User.username == json_data.get('username')).first()
    if not user:
        return {'error': 'user not found'}, 404
    
    # check the user's password
    if not user.authenticate(json_data.get('password')):
        return {'error': 'login failed'}, 401
    
    # store a cookie in the browser
    session['user_id'] = user.id
    print(f"SESSION AFTER SUCCESSFUL LOGIN: {session}")
    # return a response
    return user.to_dict(), 200

@app.route('/check_session', methods=['GET'])
def check_session():
    # get user id from the browser cookies
    print(f"SESSION RETRIEVAL DURING CHECK SESH: {session}")
    user_id = session.get('user_id')
    print(f"RETRIEVED USER ID FROM SESSION: {user_id}")
    # query the db to make sure that user id is valid
    user = User.query.filter(User.id == user_id).first()

    # if the user isn't valid, send error
    if not user:
        return {'error': 'unauthorized'}, 401
    else:
        return user.to_dict(), 200

@app.post("/utt")
def post_utt():
    json_data = request.get_json()

    try:
        new = User_Tee_time(
            user_id = json_data.get('user_id'),
            tee_time_id = json_data.get('tee_time_id'),
            
        )
    except ValueError as e:
        return {"errors": ["validation errors"]}, 400
    
    db.session.add(new)
    db.session.commit()

    return new.to_dict(), 201

@app.get('/utt')
def get_teetimes():
    utt = User_Tee_time.query.all()
    return [t.to_dict() for t in utt], 200


@app.route('/utt/<int:id>', methods=['DELETE'])
def delete_utt(id):
    utt = User_Tee_time.query.get(id)

    # Check if the workout exists
    if utt:
        User_Tee_time.query.filter(User_Tee_time.id == id).delete()
        # Delete the workout object
        db.session.delete(utt)
        db.session.commit()
        return jsonify({"message": "Workout deleted successfully"}), 204
    else:
        # If the workout does not exist, return a 404 Not Found status
        return jsonify({"error": "Workout not found"}), 404


@app.route('/signup', methods=['POST'])
def signup():
    # get the json data
    json_data = request.get_json()

    user = User.query.filter(User.username == json_data.get('username')).first()
    if user:
        return {'error': 'user already exists'}, 400

    # create a new user
    new_user = User(
        username=json_data.get('username'),
        password=json_data.get('_password'),
        bio=json_data.get('bio'),
        age=json_data.get('age'),
        email=json_data.get('email'),
        firstname=json_data.get('firstname'),
        lastname=json_data.get('lastname'),
        handicap=json_data.get('handicap'),
        img=json_data.get('img'),
    )

    # add to db
    db.session.add(new_user)
    db.session.commit()

    return new_user.to_dict(), 201