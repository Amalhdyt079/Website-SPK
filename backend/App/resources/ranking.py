from flask_restful import Resource
from flask import request
from App.schemas.ranking import ranking_schema, rankings_schema 
from config import db
from App.models.ranking import Ranking 
from flask_jwt_extended import jwt_required

class RankingRoute(Resource):
    # @jwt_required()
    def get(self, identifier=None):
        if identifier is not None:
            ranking = Ranking.query.get(identifier)
            if not ranking:
                return {'message': 'Ranking not found'}, 404
            return ranking_schema.dump(ranking)
        else:
            rankings = Ranking.query.all()
            return rankings_schema.dump(rankings)
        
    
    def post(self):
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400
        
        try:
            data = ranking_schema.load(json_data)
        except Exception as e:
            return {'message': str(e)}, 400  # Handle validation errors

        ranking = Ranking(**data)

        db.session.add(ranking)
        db.session.commit()
        result = ranking_schema.dump(ranking)

        return {'status': 'Success', 'data': result}, 201
  

    def delete(self, identifier):
        ranking = Ranking.query.get(identifier)
        if not ranking:
            return {'message': 'Ranking not found'}, 404
        
        db.session.delete(ranking)
        db.session.commit()

        return {'message': 'Ranking deleted'}, 204
    
   
    def put(self, identifier):
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400
        
        ranking = Ranking.query.get(identifier)
        if not ranking:
            return {'message': 'Ranking not found'}, 404
        
        try:
            data = ranking_schema.load(json_data)
        except Exception as e:
            return {'message': str(e)}, 400  # Handle validation errors

        ranking.peringkat = data.get('peringkat', ranking.peringkat)
        ranking.jenis_wisata = data.get('jenis_wisata', ranking.jenis_wisata)

        db.session.commit()
        result = ranking_schema.dump(ranking)
        return {'status': 'Success', 'data': result}, 200  # Return 200 for successful update
    
   
    def patch(self, identifier):
        ranking = Ranking.query.get(identifier)
        if not ranking:
            return {'message': 'Ranking not found'}, 404
        
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400
        
        try:
            data = ranking_schema.load(json_data, partial=True)
        except Exception as e:
            return {'message': str(e)}, 400  # Handle validation errors

        for key, value in data.items():
            setattr(ranking, key, value)

        db.session.commit()
        result = ranking_schema.dump(ranking)
        return {'status': 'Success', 'data': result}, 200  # Return 200 for successful update