
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

document.addEventListener("DOMContentLoaded", () => {
    // Recupera carrinho salvo, se existir
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    atualizarCarrinho(); // Atualiza a interface
});
  
function toggleDropdown() {
  const dropdown = document.getElementById('dropdownCartas');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function adicionarAoCarrinho(carta) {
  const existente = carrinho.find(item => item.id === carta.id);

  if (existente) {
    if (existente.quantidade < 3) {
      existente.quantidade += 1;
    } else {
      alert('Máximo de 3 cópias permitido.');
    }
  } else {
    carrinho.push({ ...carta, quantidade: 1 });
  }

  atualizarCarrinho();
}

function alterarQuantidade(id, delta) {
  const carta = carrinho.find(item => item.id === id);
  if (!carta) return;

  carta.quantidade += delta;

  if (carta.quantidade < 1) {
    const index = carrinho.findIndex(item => item.id === id);
    carrinho.splice(index, 1);
  } else if (carta.quantidade > 3) {
    carta.quantidade = 3;
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    const dropdown = document.getElementById('dropdownCartas');
    dropdown.innerHTML = '';

    if (carrinho.length === 0) {
        dropdown.innerHTML = '<p style="text-align:center;">Nenhuma carta adicionada.</p>';
        return;
    }

    carrinho.forEach(carta => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src="${carta.imagem}" alt="${carta.nome}">
        <div>
            <strong>${carta.nome}</strong><br>
            Quantidade: 
            <button onclick="alterarQuantidade(${carta.id}, -1)">–</button> 
            ${carta.quantidade} 
            <button onclick="alterarQuantidade(${carta.id}, 1)">+</button>
        </div>
        `;
        dropdown.appendChild(div);
    });

    const btnEnviar = document.createElement('button');
    btnEnviar.innerText = 'Enviar Cartas';
    btnEnviar.className = 'enviar-btn';
    btnEnviar.onclick = enviarCartas;

    dropdown.appendChild(btnEnviar);
function enviarCartas() {
  fetch(newFunction(), {
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

  function newFunction() {
    return 'api/carrinho/';
  }
}

function buscarCartas() {
  const termo = document.getElementById('busca').value.trim();
  const container = document.getElementById('cards');

  if (termo.length < 3) {
    container.innerHTML = '<p>Digite pelo menos 3 letras para buscar.</p>';
    return;
  }

  fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(termo)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.data || data.data.length === 0) {
        container.innerHTML = '<p>Nenhuma carta encontrada.</p>';
        return;
      }

      container.innerHTML = '';
      data.data.forEach(carta => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <img src="${carta.card_images[0].image_url}" alt="${carta.name}">
          <h4>${carta.name}</h4>
          <button onclick="adicionarAoCarrinho({
            id: ${carta.id},
            nome: '${carta.name.replace(/'/g, "\\'")}',
            imagem: '${carta.card_images[0].image_url}'
          })">Adicionar</button>
        `;
        container.appendChild(div);
      });
    })
    .catch(() => {
      container.innerHTML = '<p>Erro ao buscar cartas.</p>';
    });
}

function enviarCartas() {
  fetch('/api/carrinho/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    },
    body: JSON.stringify({ cartas: carrinho })
  })
  .then(res => res.json())
  .then(data => {
    alert('Cartas enviadas com sucesso!');
    carrinho.length = 0;
    atualizarCarrinho();
  })
  .catch(err => {
    alert('Erro ao enviar cartas.');
    console.error(err);
  });
}

function getCSRFToken() {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, 10) === 'csrftoken=') {
        cookieValue = decodeURIComponent(cookie.substring(10));
        break;
      }
    }
  }
  return cookieValue;
}
}