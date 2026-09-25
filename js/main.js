const produtos = [
    // CONSOLES (Baseados nos links fornecidos)
    {
        id: 1,
        nome: "Console Xbox Series X 1TB",
        categoria: "consoles",
        preco: 4499.00,
        imagem: "https://assets.xboxservices.com/assets/f0/8a/f08a157d-419a-41e9-913a-c85e2f7ea06b.png?n=XBX_A-BuyBoxBG-D.png",
        descricao: "O Xbox mais rápido e poderoso de todos os tempos, com SSD de 1TB e jogos em 4K nativo."
    },
    {
        id: 2,
        nome: "Console Xbox Series S 512GB",
        categoria: "consoles",
        preco: 2699.00,
        imagem: "https://assets.xboxservices.com/assets/7a/ee/7aee69ef-b003-4f16-b1a1-f7615951d716.png?n=XSS_A-BuyBoxBG-D.png",
        descricao: "Desempenho de próxima geração no menor Xbox de todos os tempos. Totalmente digital."
    },
    {
        id: 3,
        nome: "Console PlayStation 3 Super Slim",
        categoria: "consoles",
        preco: 899.00,
        imagem: "https://m.media-amazon.com/images/I/61I4qH7BItL._AC_SL1200_.jpg",
        descricao: "Modelo clássico PlayStation 3 Super Slim com 250GB de armazenamento."
    },

    // OUTROS PRODUTOS DO CATÁLOGO
    {
        id: 4,
        nome: "Smartphone Galaxy S23 Ultra",
        categoria: "celulares",
        preco: 4999.00,
        imagem: "https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SL1500_.jpg",
        descricao: "Câmera de 200MP, S Pen integrada e processador Snapdragon potente."
    },
    {
        id: 5,
        nome: "Notebook Gamer Lenovo Legion 5",
        categoria: "notebooks",
        preco: 5999.00,
        imagem: "https://m.media-amazon.com/images/I/61NfT3V3XqL._AC_SL1000_.jpg",
        descricao: "Notebook gamer de alto desempenho com placa de vídeo RTX dedicada."
    },
    {
        id: 6,
        nome: "Smart TV Samsung 55\" Crystal 4K",
        categoria: "tvs",
        preco: 2899.00,
        imagem: "https://m.media-amazon.com/images/I/71R2f-t4w0L._AC_SL1500_.jpg",
        descricao: "Painel Dynamic Crystal Color com design ultra fino e comandos de voz."
    }
];

let carrinho = [];
let cupomAtivo = false;
const DESCONTO_PERCENTUAL = 0.15; // 15% OFF

function formatarPreco(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/* RENDERIZAR PRODUTOS NA VITRINE */
function renderizarProdutos(lista) {
    const grid = document.getElementById("product-grid");
    const count = document.getElementById("product-count");
    
    if (!grid) return;
    
    grid.innerHTML = "";
    if (count) count.innerText = lista.length;

    lista.forEach(produto => {
        const precoComDesconto = produto.preco * (1 - DESCONTO_PERCENTUAL);
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <div class="product-image">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <span class="discount-badge">-15% OFF</span>
            </div>
            <div class="product-info">
                <span class="product-category">${produto.categoria}</span>
                <h3 class="product-title">${produto.nome}</h3>
                <div class="product-price-box">
                    <span class="price-original">${formatarPreco(produto.preco)}</span>
                    <span class="price-discount">${formatarPreco(precoComDesconto)}</span>
                </div>
                <div class="product-buttons">
                    <button class="btn btn-outline" onclick="verDetalhes(${produto.id})">Detalhes</button>
                    <button class="btn btn-primary" onclick="adicionarCarrinho(${produto.id})">Comprar</button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* FILTRAR POR CATEGORIA */
function filtrarProdutos(categoria) {
    if (categoria === "todos") {
        renderizarProdutos(produtos);
        return;
    }
    const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
    renderizarProdutos(produtosFiltrados);
}

/* DETALHES NO MODAL */
function verDetalhes(id) {
    const produto = produtos.find(p => p.id === id);
    const modal = document.getElementById("modal");
    const conteudo = document.getElementById("modal-content");
    const precoComDesconto = produto.preco * (1 - DESCONTO_PERCENTUAL);

    conteudo.innerHTML = `
        <div style="text-align:center">
            <div style="height:180px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem;">
                <img src="${produto.imagem}" alt="${produto.nome}" style="max-height:100%; max-width:100%; object-fit:contain;">
            </div>
            <h2>${produto.nome}</h2>
            <p style="color:#666; margin:1rem 0; font-size:0.9rem;">${produto.descricao}</p>
            <div style="margin-bottom:1.5rem;">
                <span class="price-original">${formatarPreco(produto.preco)}</span>
                <span class="price-discount">${formatarPreco(precoComDesconto)}</span>
            </div>
            <button class="btn btn-primary" onclick="adicionarCarrinho(${produto.id}); fecharModal()">
                Adicionar ao Carrinho
            </button>
        </div>
    `;

    modal.style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

/* FUNÇÕES DO CARRINHO E DESCONTO */
function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
    abrirCarrinho();
}

function aplicarCupomDireto(codigo) {
    if (codigo === "PRIMEIRA15") {
        cupomAtivo = true;
        alert("Cupão PRIMEIRA15 ativado! 15% de desconto aplicado ao carrinho.");
        atualizarCarrinho();
        abrirCarrinho();
    }
}

function aplicarCupomInput() {
    const campo = document.getElementById("coupon-code");
    const codigo = campo.value.trim().toUpperCase();

    if (codigo === "PRIMEIRA15") {
        cupomAtivo = true;
        alert("Cupão aplicado com sucesso!");
        atualizarCarrinho();
    } else {
        alert("Cupão inválido.");
    }
}

function atualizarCarrinho() {
    const contador = document.getElementById("cart-count");
    if (contador) contador.innerText = carrinho.length;
    mostrarCarrinho();
}

function mostrarCarrinho() {
    const container = document.getElementById("cart-items");
    if (!container) return;
    
    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#888; padding:2rem 0;'>Seu carrinho está vazio.</p>";
        document.getElementById("cart-subtotal").innerText = "R$ 0,00";
        document.getElementById("cart-total").innerText = "R$ 0,00";
        document.getElementById("discount-row").style.display = "none";
        return;
    }

    let subtotal = 0;

    carrinho.forEach((produto, index) => {
        subtotal += produto.preco;

        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong><br>
                <small>${formatarPreco(produto.preco)}</small>
            </div>
            <button class="btn btn-outline" style="padding:4px 8px; font-size:0.7rem;" onclick="removerCarrinho(${index})">Remover</button>
        `;
        container.appendChild(item);
    });

    let desconto = cupomAtivo ? subtotal * DESCONTO_PERCENTUAL : 0;
    let total = subtotal - desconto;

    document.getElementById("cart-subtotal").innerText = formatarPreco(subtotal);
    
    if (cupomAtivo) {
        document.getElementById("discount-row").style.display = "flex";
        document.getElementById("cart-discount").innerText = `- ${formatarPreco(desconto)}`;
    } else {
        document.getElementById("discount-row").style.display = "none";
    }

    document.getElementById("cart-total").innerText = formatarPreco(total);
}

function removerCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("cart-modal").style.display = "flex";
    mostrarCarrinho();
}

function fecharCarrinho() {
    document.getElementById("cart-modal").style.display = "none";
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    alert("Obrigado pela compra! Esta é uma demonstração.");
    carrinho = [];
    cupomAtivo = false;
    atualizarCarrinho();
    fecharCarrinho();
}

function enviarMensagem(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    alert("Obrigado, " + nome + "! Sua mensagem foi enviada.");
    event.target.reset();
}

/* EVENT LISTENERS */
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos(produtos);

    const botoes = document.querySelectorAll(".filter-btn");
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            botoes.forEach(b => b.classList.remove("active"));
            botao.classList.add("active");
            const categoria = botao.dataset.category;
            filtrarProdutos(categoria);
        });
    });
});