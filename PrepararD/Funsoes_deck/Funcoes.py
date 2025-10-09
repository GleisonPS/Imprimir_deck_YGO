import os
import urllib.request as request
from docx import Document
from docx.shared import Inches,Mm
from docx.enum.section import WD_ORIENT

def baixarImagem(id_card):
    url = "https://images.ygoprodeck.com/images/cards/"
    pasta = "Cards"

   # Verifica se a pasta existe, caso contrário, cria
    if not os.path.exists(pasta):
        os.makedirs(pasta)

    try:
        if not os.path.isfile(f"{pasta}/{id_card}.jpg"):
            request.urlretrieve(f"{url}{id_card}.jpg", f"{pasta}/{id_card}.jpg")
    except Exception as ex:
        print(f"Erro ao baixar a imagem: {ex}")

def LerCodsCard(CodCards):
    rejeitar = ['#created by', '#main', '#extra', '!side', '\n']
    for cod in CodCards:
        if cod in rejeitar:
            continue
        baixarImagem(cod)


if __name__ == "__main__":
    

    # Muda para a pasta onde o script está
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    with open("Deck.ydk", "r", encoding="utf-8") as f:
        cod_cards = f.readlines()
    for i in range(len(cod_cards)):
        cod_cards[i] = cod_cards[i].strip()
    #print(cod_cards)
    
    LerCodsCard(cod_cards)
    '''id_card = 64276752  # Exemplo de ID de carta
    baixarImagem(id_card)
    '''
