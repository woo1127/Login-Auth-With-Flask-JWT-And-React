from flask_jwt_extended import jwt_required, current_user
from flask import jsonify, Blueprint


views = Blueprint("views", __name__)


@views.route('/profile')
@jwt_required()
def profile():
    return jsonify({
        "name": current_user.username,
        "msg": "Login Successfully"
    })