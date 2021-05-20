'''' database models '''
from pathlib import Path

import openpyxl
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

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
    address = db.Column(db.String(64))
    emergency_contact_num = db.Column(db.String(15))
    doctor_num = db.Column(db.String(15))
    notes = db.Column(db.String(64))
    checked_in_today = db.Column(db.Boolean)
    lat = db.Column(db.Numeric(10, 8))
    lng = db.Column(db.Numeric(10, 8))
    img_path = db.Column(db.String)

    gaurdian_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class User(db.Model):
    ''' Volunteer Object '''

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(100), unique=True, nullable=False)

    password = db.Column(db.String(160), nullable=False) # stores pbkdf2:sha512 hashed passwords

    name = db.Column(db.String(64), nullable=False)

    seniors = db.relationship( 'Senior',
     backref='User', lazy='dynamic', cascade="all,delete,delete-orphan")
    


db.create_all()
db.session.commit()

raw_pass = "123"
hashed_pass = generate_password_hash(raw_pass, method="pbkdf2:sha512:200000")

u1 = User(id=100, name="Nathan", email="user_jr@senior_buddy.org", password=hashed_pass)

db.session.add(u1)

raw_pass = "123"
hashed_pass = generate_password_hash(raw_pass, method="pbkdf2:sha512:200000")

u2 = User(id=101, name="Elias", email="user_tel@senior_buddy.org", password=hashed_pass)

db.session.add(u2)


db.session.commit()

xlsx_file = Path('Seniors.xlsx')
wb_obj = openpyxl.load_workbook(xlsx_file)

# Read the active sheet:
sheet = wb_obj.active
for row in sheet.iter_rows():
    if row[0].value == "ID":
        continue
   
    is_male = bool(str(row[3].value) == "Male")
    checked_in_today = True if row[9].value == "Yes" else False
    gid = 100 if float(row[11].value) > 35 else 101
    tmp_senior = Senior(id=int(row[0].value), name=row[1].value, age=int(row[2].value), is_male=is_male,
                        phone_num=row[4].value,
                        address=row[5].value, emergency_contact_num=row[6].value,
                        doctor_num=row[7].value, notes=row[8].value,
                        checked_in_today=checked_in_today, lat=float(row[10].value), lng=float(row[11].value),
                        img_path=row[12].value, gaurdian_id=gid)
    db.session.add(tmp_senior)


db.session.commit()
