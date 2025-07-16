from config import db

class Criteria(db.Model):
    __tablename__ = 'criterias'

    id_kriteria = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kriteria = db.Column(db.String(100), unique=True, nullable=False)
    bobot = db.Column(db.Float, nullable=False)
    atribut = db.Column(db.String(10), nullable=False)
