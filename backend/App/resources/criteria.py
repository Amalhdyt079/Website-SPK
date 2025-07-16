from flask_restful import Resource # type: ignore
from flask import request
from App.schemas.criteria import criteria_schema, criterias_schema 
from config import db
from App.models.criteria import Criteria 
from flask_jwt_extended import jwt_required

class CriteriaRoute(Resource):
    # @jwt_required()
    def get(self, identifier=None):
        if identifier is not None:
            criteria = Criteria.query.get(identifier)
            return criteria_schema.dump(criteria)
        else:
            criterias = Criteria.query.all()
            return criterias_schema.dump(criterias)
        
    def post(self):
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400
        
        data = criteria_schema.load(json_data)
        criteria = Criteria(**data)

        db.session.add(criteria)
        db.session.commit()
        result = criteria_schema.dump(criteria)

        return {'status': 'Success', 'data' : result}, 201
    
    def put(self):
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: No data'}, 400
        
        for item in json_data:
            criteria = Criteria.query.get(item['id_kriteria'])
            if criteria:
                criteria.bobot = item['bobot']
        
        db.session.commit()
        return {'status': 'Success', 'message': 'Data updated successfully'}, 200
    
    # def delete(self, identifier):
    #     criteria = Criteria.query.get(identifier)
    #     db.session.delete(criteria)
    #     db.session.commit()

    #     return {'message': 'Criteria deleted'}, 204
    
    # def put(self, identifier):
    #     json_data = request.get_json()
    #     if not json_data:
    #         return {'message': 'Error: no data'}, 400
        
    #     data = criteria_schema.load(json_data)
    #     criteria = Criteria.query.get(identifier)
    #     criteria.kriteria = data['kriteria']
    #     criteria.bobot = data['bobot']
    #     criteria.atribut = data['atribut']


    #     db.session.commit()
    #     result = criteria_schema.dump(criteria)
    #     return {'status': 'Success', 'data' : result}, 204
    
    # def patch(self, identifier):
    #     criteria = Criteria.query.get(identifier)
    #     if not criteria:
    #         return {'message': 'Criteria not found'}, 404
        
    #     json_data = request.get_json()
    #     if not json_data:
    #         return {'message': 'Error: no data'}, 400
        
    #     data = criteria_schema.load(json_data, partial=True)
    #     for key, value in data.items():
    #         setattr(criteria, key, value)

    #     db.session.commit()
    #     result = criteria_schema.dump(criteria)
    #     return {'status': 'Success', 'data' : result}, 204

    