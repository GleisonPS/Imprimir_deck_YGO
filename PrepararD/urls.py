from django.urls import path
from .views import *

urlpatterns = [
    path('home', home, name='home'),  # Página HTML

    path('BuscaCard/', BuscarCards, name='BuscaCard'),  # Página HTML
    path('api/carrinho/', receber_carrinho, name='receber_carrinho'),

    path('deck/', deck, name='deck'),  # Página Deck
]