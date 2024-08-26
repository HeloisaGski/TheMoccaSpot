document.addEventListener('DOMContentLoaded', function () {
    // Função para adicionar produto ao carrinho
    function addProductToCart(name, img, price) {
        const cartItems = document.querySelector('#cart-items');
        const cartTotal = document.querySelector('#cart-total');
        const cart = document.querySelector('#miniCart');

        // Verifica se o item já existe no carrinho
        let existingItem = Array.from(cartItems.children).find(item => item.querySelector('h4').textContent === name);
        
        if (existingItem) {
            // Se o item já existe, aumenta a quantidade e o preço
            let quantityElement = existingItem.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent) + 1;
            quantityElement.textContent = quantity;

            let priceElement = existingItem.querySelector('.price');
            let itemPrice = parseFloat(priceElement.dataset.price) * quantity;
            priceElement.textContent = `R$ ${itemPrice.toFixed(2)}`;
        } else {
            // Se o item não existe, cria um novo item do carrinho
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${img}" alt="${name}">
                <div class="product-info">
                    <h4>${name}</h4>
                    <p class="price" data-price="${price}">R$ ${price.toFixed(2)}</p>
                    <span class="quantity">1</span>
                </div>
                <button class="remove-item" onclick="removeProductFromCart(this)">X</button>
            `;
            cartItems.appendChild(cartItem);
        }

        // Atualiza o total do carrinho
        updateCartTotal();
        
        // Exibe o carrinho
        cart.style.display = 'block';
    }

    // Função para atualizar o total do carrinho
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('#cart-items .cart-item');
        const cartTotal = document.querySelector('#cart-total');

        let total = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('.price').dataset.price);
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });

        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // Função para remover um produto do carrinho
    window.removeProductFromCart = function(button) {
        const cartItem = button.closest('.cart-item');
        cartItem.remove();
        updateCartTotal();
    }

    // Seleciona todos os botões de adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Adiciona um evento de clique para cada botão
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Obtém o produto associado ao botão clicado
            const productCard = this.closest('.product-card');
            const productName = productCard.getAttribute('data-product-name');
            const productImg = productCard.getAttribute('data-product-img');
            const productPrice = parseFloat(productCard.getAttribute('data-price'));

            // Adiciona o produto ao carrinho
            addProductToCart(productName, productImg, productPrice);
        });
    });

    // Seletores
    const cartIcon = document.getElementById('cart-icon');
    const miniCart = document.getElementById('miniCart');

    // Função para abrir e fechar o mini-carrinho
    cartIcon.addEventListener('click', () => {
        miniCart.style.display = miniCart.style.display === 'block' ? 'none' : 'block';
    });

    // Adiciona evento para o botão de fechar o carrinho
    document.querySelector('.close-cart').addEventListener('click', function () {
        miniCart.style.display = 'none';
    });
});
