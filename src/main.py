''' All APIs that doesn't require authentications '''
from json import dumps
from flask import Blueprint, render_template, request, make_response, current_app, redirect
from flask_login import login_required, current_user
from init import db

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

    js = {
        "current_lat": 31.776483825268162, 
        "current_lng": 35.19800187676346
    }

    if current_user.id == 101:
        js["current_lat"] = 32.011159
        js["current_lng"] = 34.791764

    path_sens = Senior.query.filter_by(gaurdian_id=current_user.id, checked_in_today=False).limit(3)

    url = "https://www.google.com/maps/dir/" + str(js["current_lat"]) + "," + str(js["current_lng"]) + "/"

    for p in path_sens:
        url += str(p.lat) + "," + str(p.lng) +"/"
    
    url += "@" +str(path_sens[0].lat) + "," + str(path_sens[0].lng) +",15z"

    return render_template( "map.html", user=current_user, path_sens=path_sens, url=url)


@main.route('/green_point/<int:id>')
def green(id):
    sen = Senior.query.filter_by(id=id).one()

    sen.checked_in_today = True

    db.session.commit()

    return redirect('/profile')



@main.route('/json/list_seniors')
@login_required
def list_sens_json():
    ''' list_sens '''

    sens = Senior.query.filter_by(gaurdian_id=current_user.id)

    print("\nGid {}\n".format(current_user.id))

    sen_list = []

    for s in sens:
        sen_list.append(s.to_JSON())

    js = {
        "sen_list": sen_list,
        "current_lat": 31.776483825268162, 
        "current_lng": 35.19800187676346
    }

    if current_user.id == 101:
        js["current_lat"] = 32.011159
        js["current_lng"] = 34.791764

    
    res = dumps(js, default=str)

    response = make_response(res, 200)
    response.headers['Content-Type'] = 'application/json'

    return response