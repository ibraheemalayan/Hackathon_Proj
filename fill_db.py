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
    is_male = db.Column(db.Boolean)
    phone_num = db.Column(db.String(15))
    address = db.Column(db.String(64))
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

    password = db.Column(db.String(160), nullable=False)  # stores pbkdf2:sha512 hashed passwords

    name = db.Column(db.String(64), nullable=False)


db.create_all()
db.session.commit()

raw_pass = "123"
hashed_pass = generate_password_hash(raw_pass, method="pbkdf2:sha512:200000")

# u1 = User(id=123, name="john", email="c@b.com", password=hashed_pass)
<<<<<<< HEAD

# db.session.add(u1)
db.session.commit()
=======
#
# db.session.add(u1)
# db.session.commit()

xlsx_file = Path('Seniors.xlsx')
wb_obj = openpyxl.load_workbook(xlsx_file)

# Read the active sheet:
sheet = wb_obj.active
Seniors = []
for row in sheet.iter_rows():
    if row[0].value == "ID":
        continue
    tmp_senior = Senior(name=row[0].value, age=row[1].value, is_male=row[2].value,
                        phone_num=row[3].value,
                        address=row[4].value, emergency_contact_num=row[5].value,
                        doctor_num=row[6].value, notes=row[7].value,
                        checked_in_today=row[8].value, lat=row[9].value, lng=row[10].value,
                        img_path=row[11].value)
    Seniors.append(tmp_senior)
>>>>>>> ff103b03b0aa5c81c00a08ec3022bb872b2aee3d

sen = Senior(name="tom", age=33, is_male=True, phone_num="0547894561", address="some address", emergency_contact_num="0452565", doctor_num="+345354")

# senoirs = []

# for s in senoirs:
#     sen = Senior(name=s["name"], ....)
#     db.add(sen)

# db.session.commit()
