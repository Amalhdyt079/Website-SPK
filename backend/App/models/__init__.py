from App.models.criteria import Criteria
from App.models.alternative import Alternative
from App.models.evaluation import Evaluation
from config import db

# Tambahkan relasi di sini
Criteria.evaluations = db.relationship("Evaluation", backref="criteria", lazy=True)
Alternative.evaluations = db.relationship("Evaluation", backref="alternative", lazy=True)
