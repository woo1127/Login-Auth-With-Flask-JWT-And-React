from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from app import jwt
from model import User


auth = Blueprint("auth", __name__)


@jwt.user_lookup_loader
def db_to_json(_jwt_header, jwt_data):
    identity = jwt_data["sub"]

    return User.query.filter_by(ids=identity).one_or_none()


@auth.route('/token', methods=['POST'])
def token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).one_or_none()

    if not user or not check_password_hash(user.password, password):
        return jsonify(error_msg="Invalid Username or Password"), 401

    access = create_access_token(identity=user.ids)
    refresh = create_refresh_token(identity=user.ids)

    return jsonify({
        "access": access,
        "refresh": refresh
    })


@auth.route('/token/refresh')
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()

    access = create_access_token(identity=identity)

    return jsonify({"access": access})


@auth.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify(msg="Successfully Logout")
