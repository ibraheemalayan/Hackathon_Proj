from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash

from setup_db import User, db

raw_pass_1 = "123"
hashed_pass_1 = generate_password_hash(raw_pass_1, method="pbkdf2:sha512:200000")

u1 = User(id=744361437, name="Ibraheem", email="ibraheem@ibraheemalyan.dev", password=hashed_pass_1, is_admin=True)

# raw_pass_2 = "SecurePassword2"
# hashed_pass_2 = generate_password_hash(raw_pass_2, method="pbkdf2:sha512:200000")

# u2 = User(id=2, name="Test User", email="test@example.com", password=hashed_pass_2)

raw_pass_3 = "SecurePassword3"
hashed_pass_3 = generate_password_hash(raw_pass_3, method="pbkdf2:sha512:200000")

u3 = User(id=3, name="Demo User", email="demo@demo.com", password=hashed_pass_3)

db.session.add(u1)
# db.session.add(u2)
# db.session.add(u3)
db.session.commit()
