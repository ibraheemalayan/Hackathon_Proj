''' APIs for css, js, img, and font files '''
# This file must not be copied to production

import os
from pathlib import Path
from flask import send_from_directory, make_response, Blueprint, abort

static = Blueprint('static', __name__)

CACHE_HEADERS = 0 # TODO setup cache headers

# TODO use apache directory for static files
# (much faster, less saftey)

@static.route('/static/<string:static_dir>/<string:static_file>')
def get_css(static_dir, static_file):
    ''' API for static files '''

    static_file = static_file.replace('.min.', '.')

    if static_dir in ["css", "js", "fonts", "img"]:

        path = Path(os.path.join( 'dev_static', static_dir, static_file))
        if not path.exists():
            abort(404)

        return send_from_directory( os.path.join( 'dev_static', static_dir) , static_file)

    else:
        abort(404)

@static.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join('static', 'img'),
                               'favicon.svg', mimetype='image/svg+xml')

@static.route('/robots.txt')
def robots():
    return send_from_directory('.', 'robots.txt')