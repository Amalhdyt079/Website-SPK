from flask_restful import Resource
from flask import request
from App.schemas.evaluation import evaluation_schema, evaluations_schema 
from config import db
from App.models.evaluation import Evaluation 
from flask import current_app
from App.models.alternative import Alternative 

class EvaluationRoute(Resource):
    # @jwt_required()
    def get(self, identifier=None):
        if identifier is not None:
            evaluation = Evaluation.query.get(identifier)
            return evaluation_schema.dump(evaluation)
        else:
            evaluation = Evaluation.query.all()
            return evaluations_schema.dump(evaluation)
        

    # @jwt_required()
    def post(self):
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400

        try:
            # Load the data using marshmallow schema with the current app context
            with current_app.app_context():
                data = evaluation_schema.load(json_data) 
        except Exception as e:
            return {'message': f"Error in loading data: {str(e)}"}, 400

        try:
            # Create the Evaluation instance using the loaded data
            evaluation = Evaluation(**data)
        except Exception as e:
            return {'message': f"Error creating Evaluation: {str(e)}"}, 400

        db.session.add(evaluation)
        db.session.commit()
        with current_app.app_context(): 
            result = evaluation_schema.dump(evaluation) 
        return {'status': 'Success', 'data': result}, 201

    # @jwt_required()
    def delete(self, identifier):
        evaluation = Evaluation.query.get(identifier)
        if not evaluation:
            return {'message': 'Evaluation not found'}, 404

        db.session.delete(evaluation)
        db.session.commit()

        return {'message': 'Evaluation deleted'}, 204

    # @jwt_required()
    def put(self, identifier):
        json_data = request.get_json()
        if not json_data:
            return {'message': 'Error: no data'}, 400

        evaluation = Evaluation.query.get(identifier)
        if not evaluation:
            return {'message': 'Evaluation not found'}, 404

        try:
            data = evaluation_schema.load(json_data) 
        except Exception as e:
            return {'message': str(e)}, 400
        
        evaluation.id_alternatif = data.get('id_alternatif', evaluation.id_alternatif)
        evaluation.id_kriteria = data.get('id_kriteria', evaluation.id_kriteria)
        evaluation.value = data.get('value', evaluation.value)

        db.session.commit()
        result = evaluation_schema.dump(evaluation) 
        return {'status': 'Success', 'data': result}, 200
    # @jwt_required()
    def patch(self, identifier):
        evaluation = Evaluation.query.filter_by(id_kriteria=identifier).all()
        # print(identifier)
        if not evaluation:
            return {'message': 'Evaluation not found'}, 404

        json_data = request.get_json()
        # print(json_data)
        # return
        if not json_data:
            return {'message': 'Error: no data'}, 400

        for j in ['Wisata Alam', 'Wisata Sejarah', 'Wisata Budaya']:
            alt = Alternative.query.filter_by(jenis_wisata=j).all()
            ev = list(filter(lambda e: e.id_alternatif in map(lambda a: a.id_alternatif, alt), evaluation))
            for e in ev:
                e.value = json_data.get(j, 1)

        db.session.commit()
        return {'status': 'Success'}, 200