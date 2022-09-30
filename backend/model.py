from app import db
from werkzeug.security import generate_password_hash


class User(db.Model):
    ids = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)


# user1 = User(username="John", password=generate_password_hash("john1234", method='sha256'))
# user2 = User(username="June", password=generate_password_hash("june1234", method='sha256'))

# db.create_all()
# db.session.add(user1)
# db.session.add(user2)
# db.session.commit()