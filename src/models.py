'''' database models '''
from enum import IntEnum
from datetime import datetime
from typing import AsyncGenerator
from flask_login import UserMixin
from init import db

class Senior(db.Model):
    ''' Senior Object '''

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(64), nullable=False)

    age = db.Column(db.Integer)

    phone_num = db.Column(db.Integer)

    is_male = db.Column(db.Boolean)
    
    lat = db.Column(db.Numeric(14,2))
    lng = db.Column(db.Numeric(14,2))


class User(UserMixin, db.Model):
    ''' Volunteer Object '''

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(100), unique=True, nullable=False)

    password = db.Column(db.String(160), nullable=False) # stores pbkdf2:sha512 hashed passwords

    name = db.Column(db.String(64), nullable=False)
    

