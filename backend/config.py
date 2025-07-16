from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow # type: ignore

db = SQLAlchemy()
ma = Marshmallow()

def config_database(app):
    conn_str = '{DBMS}://{user}:{password}@{host}/{database}'
    app.config['SQLALCHEMY_DATABASE_URI'] = conn_str.format(
        DBMS = 'mariadb+mariadbconnector',
        user = 'root',
        password = '',
        host = 'localhost',
        database = 'pjbl'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

    db.init_app(app)
    with app.app_context():
       db.create_all()