'''' database models '''
from flask import Flask
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
    is_male = db.Column(db.String(64))
    phone_num = db.Column(db.String(15))
    addess = db.Column(db.String(64))
    emergency_contact_num = db.Column(db.String(15))
    doctor_num = db.Column(db.String(15))
    notes = db.Column(db.String(64))
    checked_in_today = db.Column(db.Boolean)
    lat = db.Column(db.Numeric(10, 8))
    lng = db.Column(db.Numeric(10, 8))
    img_path = db.Column(db.String)


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