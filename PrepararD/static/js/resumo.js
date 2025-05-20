let carrinho

document.addEventListener("DOMContentLoaded", () => {
  carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const container = document.getElementById('resumo-cartas');
  
    if (carrinho.length === 0) {
      container.innerHTML = '<p>Nenhuma carta selecionada.</p>';
      return;
    }
  
    carrinho.forEach(carta => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <img src="${carta.imagem}" alt="${carta.nome}" width="80">
        <strong>${carta.nome}</strong> - Quantidade: ${carta.quantidade}
      `;
      container.appendChild(div);
    });
  });
  