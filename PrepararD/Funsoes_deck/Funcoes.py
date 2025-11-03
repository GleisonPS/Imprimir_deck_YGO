import os
from django.conf import settings  # importa BASE_DIR
import urllib.request as request
from docx import Document
from docx.shared import Inches,Mm
from docx.enum.section import WD_ORIENT

def baixarImagem(id_card):
    url = "https://images.ygoprodeck.com/images/cards/"

    # Caminho relativo ao manage.py
    pasta = os.path.join(settings.BASE_DIR, "PrepararD", "Funsoes_deck", "Cards")

    # Cria a pasta se não existir
    if not os.path.exists(pasta):
        os.makedirs(pasta)

    caminho_arquivo = os.path.join(pasta, f"{id_card}.jpg")

    try:
        if not os.path.isfile(caminho_arquivo):
            request.urlretrieve(f"{url}{id_card}.jpg", caminho_arquivo)
            #print(f"Imagem salva em: {caminho_arquivo}")
    except Exception as ex:
        from django.contrib import messages
        messages.error(request, "Ocorreu um erro em baixar imagem!")

        
def LerCodsCard(CodCards):
    rejeitar = ['#created by', '#main', '#extra', '!side', '\n']
    for cod in CodCards:
        if cod in rejeitar:
            continue
        baixarImagem(cod)

#Adicionar a função que vai receber o Json e tratar ele
def tratar_json(json_data):
    # Exemplo de tratamento do JSON

    for item in json_data:
        try:
            id_card = item.get('id')
            if id_card:
                #print(f"Baixando imagem para o ID da carta: {id_card}")
                baixarImagem(id_card)
        except Exception as ex:
            from django.contrib import messages

            messages.error(request, "Ocorreu um erro em processar item!")
#            print(f"Erro ao processar item {item}: {ex}")
                
if __name__ == "__main__":
    import json

     # Muda para a pasta onde o script está
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
# Abre o arquivo JSON
    with open('Teste.json', 'r', encoding='utf-8') as arquivo:
        dados = json.load(arquivo)
    tratar_json(dados)

    '''

    # Muda para a pasta onde o script está
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    with open("Deck.ydk", "r", encoding="utf-8") as f:
        cod_cards = f.readlines()
    for i in range(len(cod_cards)):
        cod_cards[i] = cod_cards[i].strip()
    #print(cod_cards)
    
    LerCodsCard(cod_cards)
    id_card = 64276752  # Exemplo de ID de carta
    baixarImagem(id_card)
    
'''