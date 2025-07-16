from config import db

class Alternative(db.Model):
    __tablename__ = 'alternatives'

    id_alternatif = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(310), unique=True, nullable=False)
    jenis_wisata = db.Column(db.Text, nullable=True)
    jarak = db.Column(db.Float, nullable=True)  # Jarak in kilometers
    harga = db.Column(db.Integer, nullable=False)  # Harga in Rp
    rating = db.Column(db.Float, nullable=True)  # Rating, e.g., 1.0 to 5.0

    # Relasi dengan Evaluation
    evaluations = db.relationship("Evaluation", back_populates="alternative", lazy=True)

    def __init__(self, nama, jenis_wisata=None, jarak=None, harga=None, rating=None):
        self.nama = nama
        self.jenis_wisata = jenis_wisata
        self.jarak = jarak
        self.harga = harga
        self.rating = rating
