from config import db

class Ranking(db.Model):
    __tablename__ = 'rankings'

    id_ranking = db.Column(db.Integer, primary_key=True, autoincrement=True)
    jenis_wisata = db.Column(db.String(100), nullable=True)
    peringkat = db.Column(db.Integer, unique=True, nullable=True)  # Ensure this matches your use case

    def __init__(self, jenis_wisata=None, peringkat=None):
        self.jenis_wisata = jenis_wisata
        self.peringkat = peringkat

    def __repr__(self):
        return f"<Ranking(id_ranking={self.id_ranking}, jenis_wisata={self.jenis_wisata}, peringkat={self.peringkat})>"
