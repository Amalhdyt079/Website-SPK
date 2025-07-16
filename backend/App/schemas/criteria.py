from config import ma
from App.models.criteria import Criteria

class CriteriaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Criteria
        load_distance = True

criteria_schema = CriteriaSchema()
criterias_schema = CriteriaSchema(many=True)
