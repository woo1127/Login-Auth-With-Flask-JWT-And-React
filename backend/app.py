from datetime import timedelta
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'secret'
app.config['JWT_ACCESS_TOKEN_EXPIRY'] = timedelta(seconds=30)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)

from views import views
from auth import auth

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(views, url_prefix="/views")

@app.route('/')
def index():
    return jsonify(msg="Succefully run")

    
if __name__ == "__main__":
    app.run(debug=True)
