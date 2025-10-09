from .Funsoes_deck import Funcoes  # Importa a função para tratar o JSON
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # importante!

# Create your views here.
def pagina_usuarios(request):
    return render(request, 'home.html')


def home(request):
    return render(request, 'home.html')


def BuscarCards(request):
    return render(request, 'BuscaCards.html')

def deck(request):
    return render(request, 'deck.html')
# views.py


@csrf_exempt  # isso desativa o CSRF (pra testes; depois podemos melhorar)
def receber_carrinho(request):
    print("Recebendo carrinho...")
    if request.method == 'POST':
        import json
        dados = json.loads(request.body)
        print("Cartas recebidas:", dados)
        # Aqui você pode adicionar a lógica para tratar os dados recebidos
        Funcoes.tratar_json(dados)  # Chama a função para tratar o JSON
        return JsonResponse({'mensagem': 'Carrinho recebido com sucesso!'})
    
    return JsonResponse({'erro': 'Método não permitido'}, status=405)
