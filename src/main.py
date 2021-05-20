''' All APIs that doesn't require authentications '''
from json import dumps
from flask import Blueprint, render_template, request, make_response, current_app
from flask_login import login_required, current_user


main = Blueprint('main', __name__)

# ########## public pages views ##########

# homepage
@main.route('/')
def index():
    ''' Homepage '''
    return render_template('index.html', user=current_user)

# ########## private views ##########

@main.route('/profile')
@login_required
def profile():
    ''' Profile '''

    return render_template( "profile.html")