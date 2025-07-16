from flask_restful import Api # type: ignore
from App.resources.criteria import CriteriaRoute
from App.resources.alternative import AlternativeRoute
from App.resources.ranking import RankingRoute
from App.resources.evaluation import EvaluationRoute

def config_routes(app):
    api = Api()
    api.add_resource(CriteriaRoute, '/criterias', '/criterias/<int:identifier>',
                     methods=['GET', 'POST', 'PUT', 'PATCH'])
    api.add_resource(AlternativeRoute, '/alternatives', '/alternatives/<int:identifier>',
                     methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
    api.add_resource(RankingRoute , '/rankings', '/rankings/<int:identifier>',
                     methods=['GET', 'POST', 'PUT', 'PATCH'])
    api.add_resource(EvaluationRoute , '/evaluations', '/evaluations/<int:identifier>',
                     methods=['GET', 'POST', 'PUT', 'PATCH'])
    api.init_app(app)