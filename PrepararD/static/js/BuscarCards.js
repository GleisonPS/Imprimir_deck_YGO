let carrinho = JSON.parse(localStorage.getItem('cart-item')) || [];

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.split('=')[1]);
        break;
      }
    }
  }
  return cookieValue;
}

function atualizarCarrinho() {
  const container = document.getElementById('lista-carrinho');
  if (!container) return;

  container.innerHTML = '';

  if (carrinho.length === 0) {
    container.innerHTML = '<p style="color: #fffbe6;">Nenhuma carta adicionada.</p>';
    return;
  }

  carrinho.forEach(carta => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'carrinho-item';
    itemDiv.style.display = 'flex';
    itemDiv.style.justifyContent = 'space-between';
    itemDiv.style.alignItems = 'center';
    itemDiv.style.marginBottom = '5px';
    itemDiv.style.gap = '10px';

    itemDiv.innerHTML = `
      <span style="color: white;">${carta.nome} x${carta.quantidade}</span>
      <div>
        <button onclick="alterarQtd('${carta.nome}', -1)">➖</button>
        <button onclick="alterarQtd('${carta.nome}', 1)">➕</button>
      </div>
    `;

    container.appendChild(itemDiv);
  });

  const btn = document.createElement('button');
  btn.className = 'botao';
  btn.innerText = 'Enviar Cartas';
  btn.onclick = enviarCartas;
  container.appendChild(btn);
}

function alterarQtd(nome,img=null, delta) {
  const item = carrinho.find(c => c.nome === nome);

  if (!item && delta > 0) {
    carrinho.push({ nome: nome, quantidade: 1, imagem: img });
  } else if (item) {
    item.quantidade += delta;
    if (item.quantidade <= 0) {
      carrinho = carrinho.filter(c => c.nome !== nome);
    } else if (item.quantidade > 3) {
      item.quantidade = 3;
    }
  }

  localStorage.setItem('cart-item', JSON.stringify(carrinho));
  atualizarCarrinho();
  buscarCartas(); // Atualiza a exibição
}

function enviarCartas() {
  fetch('/api/carrinho/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: JSON.stringify(carrinho),
  })
    .then(res => res.json())
    .then(data => alert('Cartas enviadas com sucesso!'))
    .catch(() => alert('Erro ao enviar cartas.'));
}

function buscarCartas() {
  const termo = document.getElementById('input-busca').value.trim();
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  if (termo.length < 3) return;

  fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${termo}`)
    .then(res => res.json())
    .then(data => {
      const cards = data.data;
      cards.forEach(card => {
        const nome = card.name;
        const imagem = card.card_images[0].image_url;
        const desc = card.desc;

        const item = carrinho.find(c => c.nome === nome);
        const quantidade = item ? item.quantidade : 0;

        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <img src="${imagem}" alt="${nome}">
          <h3>${nome}</h3>
          
          <div class="Descricao_card">
            <p>${desc}</p>
          </div>
          <div class="botoes">
            <button onclick="alterarQtd('${nome}','${imagem}', -1)">➖</button>
            <span style="margin: 0 10px;">${quantidade}</span>
            <button onclick="alterarQtd('${nome}','${imagem}', 1)">➕</button>
          </div>
        `;




        container.appendChild(div);
      });
    })
    .catch(() => {
      container.innerHTML = '<p style="color: red;">Erro ao buscar cartas.</p>';
    });
}

function verificarCarrinhoSalvo() {
  if (carrinho.length > 0) {
    atualizarCarrinho();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarCarrinho();
  verificarCarrinhoSalvo();

  const input = document.getElementById('input-busca');
  if (input) {
    console.log("Input de busca encontrado.");
    input.addEventListener('input', () => {
      console.log("Buscando cartas...");
      buscarCartas();
    });
  } else {
    console.warn("Campo de busca não encontrado!");
  }
});

