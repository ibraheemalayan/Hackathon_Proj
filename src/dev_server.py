from init import create_app

app = create_app()

# blueprint for static files APIs (replaced with apache in production)
from static_files import static as static_blueprint
app.register_blueprint(static_blueprint)

if __name__=="__main__":
    app.debug = True
    app.config['server_url']='http://localhost:5000'
    app.config['host']='localhost:5000'
    app.run('0.0.0.0', port=5000)
