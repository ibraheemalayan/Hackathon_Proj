''' initilazes database connection and configs and flask app '''

import json

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# init SQLAlchemy
db = SQLAlchemy()

# creates, inits, returns flask app object
def create_app():
    ''' Return Flask Application '''

    app = Flask(__name__)

    # load configs from configs.json
    config_file = open("configs.json",'r')

    app.config.update(**json.loads( config_file.read() ))

    config_file.close()

    db.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # blueprint for auth routes in our app
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from main import main as main_blueprint
    app.register_blueprint(main_blueprint)


    return app
