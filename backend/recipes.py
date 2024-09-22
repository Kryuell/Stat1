from flask_restx import Namespace,Resource,fields
from models import Recipe
from flask_jwt_extended import jwt_required
from flask import request,jsonify


recipe_ns=Namespace('recipe',description="A namespace for Recipes.")

recipe_model = recipe_ns.model(
    "Recipe",
    {
        "id" :fields.Integer(),
        "title":fields.String(),
        "description":fields.String(),
        "full_name":fields.String(),
        "cin": fields.String(),
        "phone_number": fields.String(),
        "email": fields.String(),
        "age": fields.Integer(),
        "gender": fields.String(),
        "state": fields.String(),
        "city": fields.String(),
        "address": fields.String(),
        "marital_status": fields.String(),
        "nbr_of_children": fields.Integer(),
        "occupation": fields.String(),
        "salary": fields.Float()

    }
)





@recipe_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return{"message":"Hello world"}
    
   
   
@recipe_ns.route('/recipes')
class RecipesResource(Resource) :
    
    @recipe_ns.marshal_list_with(recipe_model)
    def get(self):                              
        """"Get all recipes"""
        
        recipes=Recipe.query.all()    
        
        return recipes
    
    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.expect(recipe_model)
    @jwt_required()
    def post(self):
        """"Create a new recipe"""
        data=request.get_json()
        
        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description'),
            full_name=data.get('full name'),
            cin=data.get('cin'),
            phone_number=data.get('phone_number'),
            email=data.get('email'),
            age=data.get('age'),
            gender=data.get('gender'),
            state=data.get('state'),
            city=data.get('city'),
            address=data.get('address'),
            marital_status=data.get('marital_status'),
            nbr_of_children=data.get('nbr_of_children', 0),  # Default to 0 if not provided
            occupation=data.get('occupation'),
            salary=data.get('salary')
        )
        
        new_recipe.save()
        
        return new_recipe,201
        
    
    
@recipe_ns.route('/recipe/<int:id>')
class RecipeResource(Resource):
    @recipe_ns.marshal_with(recipe_model)
    def get(self,id):
        """"Get a recipe by id"""
        recipe=Recipe.query.get_or_404(id)
        
        return recipe
    
    
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def put(self,id):
        """Update a recipe"""
        
        recipe_to_update=Recipe.query.get_or_404(id)
        
        data=request.get_json()
        
        recipe_to_update.update(data.get('title'),data.get('description'))
        
        return recipe_to_update
        
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def delete(self,id):
        """"Delete a recipe by id"""
        recipe_to_delete=Recipe.query.get_or_404(id)
        
        recipe_to_delete.delete()
        
        return recipe_to_delete