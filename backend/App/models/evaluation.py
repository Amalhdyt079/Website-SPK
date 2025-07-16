from config import db

class Evaluation(db.Model):
    __tablename__ = 'evaluations'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_alternatif = db.Column(db.Integer, db.ForeignKey('alternatives.id_alternatif'), nullable=False)
    id_kriteria = db.Column(db.Integer, db.ForeignKey('criterias.id_kriteria'), nullable=False)
    value = db.Column(db.Float, nullable=False)
