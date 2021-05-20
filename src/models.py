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
    is_male = db.Column(db.String(64))
    phone_num = db.Column(db.String(15))
    address = db.Column(db.String(64))
    emergency_contact_num = db.Column(db.String(15))
    doctor_num = db.Column(db.String(15))
    notes = db.Column(db.String(64))
    checked_in_today = db.Column(db.Boolean)
    lat = db.Column(db.Numeric(10, 8))
    lng = db.Column(db.Numeric(10, 8))
    img_path = db.Column(db.String)

    gaurdian_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def to_JSON(self):

        res = {
            "id":self.id,
            
            "age":self.age,
            "name":self.name,
            "gender": ("male" if self.is_male else "female"),
            "phone_num": self.phone_num,
            "address": self.address,
            "emergency_contact_num": self.emergency_contact_num,
            "doctor_num": self.doctor_num,
            "notes": self.notes,
            "checked_in_today": self.checked_in_today,
            "img_path": self.img_path,
            "lat":self.lat,
            "lng":self.lng,
            "gaurdian_id":self.gaurdian_id
        }




        return res



    


class User(UserMixin, db.Model):
    ''' Volunteer Object '''

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(100), unique=True, nullable=False)

    password = db.Column(db.String(160), nullable=False) # stores pbkdf2:sha512 hashed passwords

    name = db.Column(db.String(64), nullable=False)

    seniors = db.relationship( 'Senior',
     backref='User', lazy='dynamic', cascade="all,delete,delete-orphan")
    

