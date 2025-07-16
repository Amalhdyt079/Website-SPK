from config import ma
from App.models.alternative import Alternative

class AlternativeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Alternative
        load_distance = True

alternative_schema = AlternativeSchema()
alternatives_schema = AlternativeSchema(many=True)
