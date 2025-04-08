from django.urls import path
from .views import *

urlpatterns = [
    #path('', pagina_usuarios, name='pagina_usuarios'),  # Página HTML
    #path('api/usuarios/', listar_usuarios, name='listar_usuarios'),  # API JSON
    path('', teste, name='teste'),  # Página HTML

    path('BuscaCard/', BuscarCards, name='BuscarCards'),  # Página HTML
    path('api/carrinho/', receber_carrinho, name='receber_carrinho'),
]