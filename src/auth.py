''' all authentication APIs '''
from urllib.parse import quote
from functools import wraps
from flask import Blueprint, render_template, redirect, url_for, request, abort, flash
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import  check_password_hash, generate_password_hash
from is_safe_url import is_safe_url

from messages import (LOGIN_FAILED_MESSAGE, PASSWORD_RESET_SUCCESS_MESSAGE,
                   PASSWORD_RESET_NO_MATCH_MESSAGE, PASSWORD_RESET_WRONG_OLD_MESSAGE)
from models import User
from init import db

auth = Blueprint('auth', __name__)

# Helping methods

def is_int(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False

def hash_password(raw):
    ''' Recives raw password as parameter and returns hashed password '''
    return generate_password_hash(raw, method="pbkdf2:sha512:200000")

# End helping methods

@auth.route('/login')
def login():
    ''' returns login page '''

    next = request.args.get('next')

    redirect_uri = None

    if next:
        redirect_uri = quote(next, safe='')

    return render_template('login.html', next=redirect_uri)

@auth.route('/login', methods=['POST'])
def login_post():
    ''' accepts login forms submit '''


    email_or_id = request.form.get('email_or_id')
    password = request.form.get('password')
    remember = bool(request.form.get('remember'))

    user = None

    email = email_or_id
    user = User.query.filter_by(email=email).first()

    # check if user actually exists
    if not user:

        flash(LOGIN_FAILED_MESSAGE)
        return redirect(url_for('auth.login'))

    # take the user supplied password, hash it, and compare it to the hashed password in database
    if not check_password_hash(user.password, password):
        # if password is wrong, reload the page with a message, and record the incident
        flash(LOGIN_FAILED_MESSAGE)
        return redirect(url_for('auth.login'))


    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)

    dest_url = url_for('main.index')

    # redirect user to the passed redirect url, if no url passed redirect to profile page
    return redirect(dest_url)

@auth.route('/logout')
def logout():
    ''' log out users '''
    if current_user.is_authenticated:
        logout_user()
    return redirect(url_for('main.index'))


@auth.route('/reset_password')
@login_required
def reset_password_page():
    ''' reset password page '''
    return render_template('reset_password.html')


@auth.route('/reset_password', methods=['POST'])
@login_required
def reset_password():
    ''' Reset password from user-end ( requires old password ) admin can't change his password from this API '''

    # TODO Apply 2FA

    old_password = request.form.get('old_password')
    new_password = request.form.get('new_password')
    confirm_new_password = request.form.get('confirm_new_password')

    # check if old password is correct
    if not check_password_hash(current_user.password, old_password):
        flash(PASSWORD_RESET_WRONG_OLD_MESSAGE)
        return redirect(url_for('auth.reset_password_page'))

    # check if new password and confirm password fields match
    if new_password != confirm_new_password:
        flash(PASSWORD_RESET_NO_MATCH_MESSAGE)
        return redirect(url_for('auth.reset_password_page'))

    current_user.password = hash_password(new_password)

    record_pass_reset(db, current_user.id, by_admin=False)

    # commit changes to database
    db.session.commit()

    # log user out to redirect him to log in page
    logout_user()

    # redirect to login page with a message that password changed
    flash(PASSWORD_RESET_SUCCESS_MESSAGE)
    return redirect(url_for('auth.login'))

# ADMIN APIs #################################

# Admin login decorater
def admin_only(func):
    ''' decoater to check if user is authenticated and admin, else return 404 '''
    @wraps(func)
    def check_if_admin(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_admin:
            abort(404)
        return func(*args, **kwargs)
    return check_if_admin


