from config import ma
from App.models.ranking import Ranking

class RankingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Ranking
    # identifier = ma.fields.Int()
    # code = ma.fields.Str(required=True)
    # name = ma.fields.Str(required=True)
    # credits = ma.fields.Int(required=True)

ranking_schema = RankingSchema()
rankings_schema = RankingSchema(many=True)