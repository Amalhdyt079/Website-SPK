from flask_restful import Resource
from flask import request
from App.schemas.alternative import alternative_schema, alternatives_schema 
from config import db
from App.models.alternative import Alternative 
# from flask_jwt_extended import jwt_required

class AlternativeRoute(Resource):
    # @jwt_required()
    def get(self, identifier=None):
        if identifier is not None:
            alternative = Alternative.query.get(identifier)
            if not alternative:
                return {'message': 'Alternative not found'}, 404
            return alternative_schema.dump(alternative)
        else:
            alternatives = Alternative.query.all()
            return alternatives_schema.dump(alternatives)
        
    
    def post(self):
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400
        
        try:
            data = alternative_schema.load(json_data)
        except Exception as e:
            return {'message': str(e)}, 400  # Handle validation errors

        alternative = Alternative(**data)

        db.session.add(alternative)
        db.session.commit()
        result = alternative_schema.dump(alternative)

        return {'status': 'Success', 'data': result}, 201
  

    def delete(self, identifier):
        alternative = Alternative.query.get(identifier)
        if not alternative:
            return {'message': 'Alternative not found'}, 404
        
        db.session.delete(alternative)
        db.session.commit()

        return {'message': 'Alternative deleted'}, 204
    
   
    def put(self, identifier):
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400
        
        alternative = Alternative.query.get(identifier)
        if not alternative:
            return {'message': 'Alternative not found'}, 404
        
        try:
            data = alternative_schema.load(json_data)
        except Exception as e:
            return {'message': str(e)}, 400  # Handle validation errors

        alternative.nama = data.get('nama', alternative.nama)
        alternative.jenis_wisata = data.get('jenis_wisata', alternative.jenis_wisata)
        alternative.jarak = data.get('jarak', alternative.jarak)
        alternative.harga = data.get('harga', alternative.harga)
        alternative.rating = data.get('rating', alternative.rating)

        db.session.commit()
        result = alternative_schema.dump(alternative)
        return {'status': 'Success', 'data': result}, 200  # Return 200 for successful update
    
   
    def patch(self, identifier):
        alternative = Alternative.query.get(identifier)
        if not alternative:
            return {'message': 'Alternative not found'}, 404
        
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400
        
        try:
            data = alternative_schema.load(json_data, partial=True)
        except Exception as e:
            return {'message': str(e)}, 400  # Handle validation errors

        for key, value in data.items():
            setattr(alternative, key, value)

        db.session.commit()
        result = alternative_schema.dump(alternative)
        return {'status': 'Success', 'data': result}, 200  # Return 200 for successful update
    

    