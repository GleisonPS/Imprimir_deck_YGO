from django.shortcuts import render
from django.urls import path
from django.http import JsonResponse

# Create your views here.
def pagina_usuarios(request):
    return render(request, 'home.html')

# API para retornar os dados em JSON
def listar_usuarios(request):
    usuarios = [
        {"id": 1, "nome": "Ana", "idade": 28},
        {"id": 2, "nome": "João", "idade": 34},
        {"id": 3, "nome": "Carlos", "idade": 22},
        {"id":4, "nome": "Maria", "idade": 30},
        {"id":5, "nome": "Pedro", "idade": 25},
        {"id":6, "nome": "Lucas", "idade": 29},
        {"id":7, "nome": "Fernanda", "idade": 31},
        {"id":8, "nome": "Juliana", "idade": 27},
        {"id":9, "nome": "Roberto", "idade": 35},
        {"id":10, "ah": "Tatiane", "idade": 26}
    ]
    return JsonResponse({"dados": usuarios})
