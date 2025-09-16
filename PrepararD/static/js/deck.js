document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("deck-container");
  const limparBtn = document.getElementById("limpar-deck");
  const deckCount = document.getElementById("deck-count");
  let carrinho = JSON.parse(localStorage.getItem("cart-item")) || [];

  function atualizarDeck() {
    container.innerHTML = "";
    let totalCartas = 0;

    if (carrinho.length === 0) {
      container.innerHTML = '<p style="color:white;">Nenhuma carta adicionada ao deck.</p>';
      deckCount.textContent = "0 cartas";
      return;
    }

    carrinho.forEach(carta => {
      totalCartas += carta.quantidade;

      for (let i = 0; i < carta.quantidade; i++) {
        const div = document.createElement("div");
        div.className = "deck-card";

        div.innerHTML = `
          <img src="${carta.imagem}" alt="${carta.nome}">
          <p style="font-size:12px; text-align:center;">${carta.nome}</p>
          <button class="remover-btn">Remover</button>
        `;

        div.querySelector(".remover-btn").addEventListener("click", () => {
          removerCarta(carta.nome);
        });

        container.appendChild(div);
      }
    });

    deckCount.textContent = `${totalCartas} carta${totalCartas > 1 ? "s" : ""}`;
  }

  function removerCarta(nome) {
    let item = carrinho.find(c => c.nome === nome);
    if (item) {
      item.quantidade -= 1;
      if (item.quantidade <= 0) {
        carrinho = carrinho.filter(c => c.nome !== nome);
      }
      localStorage.setItem("cart-item", JSON.stringify(carrinho));
      atualizarDeck();
    }
  }

  limparBtn.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja esvaziar o deck inteiro?")) {
      carrinho = [];
      localStorage.setItem("cart-item", JSON.stringify(carrinho));
      atualizarDeck();
    }
  });

  atualizarDeck();
});
