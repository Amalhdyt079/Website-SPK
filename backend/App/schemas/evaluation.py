from config import ma
from App.models.evaluation import Evaluation

class EvaluationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Evaluation
        # load_instance = True  # Correct option to load instances
        include_fk = True  # Include foreign keys if needed

# Initialize schema instances
evaluation_schema = EvaluationSchema()
evaluations_schema = EvaluationSchema(many=True)