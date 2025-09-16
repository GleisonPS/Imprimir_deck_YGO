# 🃏 Imprimir_deck_YGO

Projeto desenvolvido em **Django** que permite buscar cartas de Yu-Gi-Oh! através da [API YGOPRODeck](https://ygoprodeck.com/api-guide/), montar um deck de até 3 cópias por carta e visualizar as cartas selecionadas em uma página separada.

---

## 🚀 Funcionalidades

- 🔍 **Busca de cartas** pelo nome utilizando a API YGOPRODeck.  
- ➕ **Adicionar cartas ao deck** sem recarregar a página (via AJAX).  
- 📄 **Limite de 3 cópias** por carta no deck, conforme regra oficial.  
- 📑 **Visualização do deck** em uma página dedicada.  
- 🎨 **Interface estilizada** com CSS inspirado no tema Yu-Gi-Oh!  

---


## 🛠️ Tecnologias Utilizadas

- [Python 3](https://www.python.org/)  
- [Django](https://www.djangoproject.com/)  
- [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)  
- [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)  
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)  
- [API YGOPRODeck](https://ygoprodeck.com/api-guide/)  

---

## ⚙️ Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/GleisonPS/Imprimir_deck_YGO.git
   cd Imprimir_deck_YGO
   ```

2. Crie e ative um ambiente virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate      # Windows
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Execute as migrações:
   ```bash
   python manage.py migrate
   ```

5. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```

6. Acesse no navegador:
   ```
   http://127.0.0.1:8000/
   ```

---

## 🎮 Uso

- Acesse a página **Home** para introdução.  
- Vá até **Buscar Cartas** para pesquisar cartas pelo nome.  
- Clique em **Adicionar** para enviar cartas ao deck (máx. 3 cópias).  
- Consulte a página **Meu Deck** para visualizar todas as cartas escolhidas.  

---

## 📌 Melhorias Futuras

- [ ] Exportar deck em PDF com as imagem para impressão.  
- [ ] Sistema de login para salvar decks por usuário.  
- [ ] Opção de importar/exportar decks no formato `.ydk`.  

---

## 👨‍💻 Autor

Projeto desenvolvido por **Gleison Pereira Santiago** 🎴  