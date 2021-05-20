'''' database models '''
from flask import Flask, request, flash, url_for, redirect, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///src/db.sqlite3'
app.config['SECRET_KEY'] = "random string"


db = SQLAlchemy(app)


class Senior(db.Model):
    ''' Senior Object '''

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(64), nullable=False)

    age = db.Column(db.Integer)

    phone_num = db.Column(db.Integer)

    is_male = db.Column(db.Boolean)

    
    
    lat = db.Column(db.Numeric(14,2))
    lng = db.Column(db.Numeric(14,2))


class User(db.Model):
    ''' Volunteer Object '''

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(100), unique=True, nullable=False)

    password = db.Column(db.String(160), nullable=False) # stores pbkdf2:sha512 hashed passwords

    name = db.Column(db.String(64), nullable=False)
    

db.create_all()
db.session.commit()


# senoirs = []

# for s in senoirs:
#     sen = Senior(name=s["name"], ....)
#     db.add(sen)

# db.session.commit()