from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # importante!

# Create your views here.
def pagina_usuarios(request):
    return render(request, 'home.html')


def home(request):
    return render(request, 'resumo.html')


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
        return JsonResponse({'mensagem': 'Carrinho recebido com sucesso!'})
    
    return JsonResponse({'erro': 'Método não permitido'}, status=405)
