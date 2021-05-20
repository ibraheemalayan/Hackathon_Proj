''' All APIs that doesn't require authentications '''
from json import dumps
from flask import Blueprint, render_template, request, make_response, current_app
from flask_login import login_required, current_user

from models import Senior


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

    return render_template( "map.html")

@main.route('/list_seniors')
@login_required
def list_sens():
    ''' list_sens '''

    all_seniors = dumps(Senior.query.all(), default=str)

    return render_template( "list.html" , sens=all_seniors)

@main.route('/json/list_seniors')
@login_required
def list_sens_json():
    ''' list_sens '''

    sens = Senior.query.filter_by(gaurdian_id=current_user.id)

    print("\nGid {}\n".format(current_user.id))

    sen_list = []

    for s in sens:
        sen_list.append(s.to_JSON())

    res = dumps({"sen_list":sen_list}, default=str)

    response = make_response(res, 200)
    response.headers['Content-Type'] = 'application/json'

    return response