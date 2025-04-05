from django.urls import path
from .views import listar_usuarios, pagina_usuarios

urlpatterns = [
    path('', pagina_usuarios, name='pagina_usuarios'),  # Página HTML
    path('api/usuarios/', listar_usuarios, name='listar_usuarios'),  # API JSON
]