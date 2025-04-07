from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # importante!

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

def teste(request):
    return render(request, 'lista.html')

# views.py


@csrf_exempt  # isso desativa o CSRF (pra testes; depois podemos melhorar)
def receber_carrinho(request):
    if request.method == 'POST':
        import json
        dados = json.loads(request.body)
        print("Cartas recebidas:", dados)
        return JsonResponse({'mensagem': 'Carrinho recebido com sucesso!'})
    
    return JsonResponse({'erro': 'Método não permitido'}, status=405)
