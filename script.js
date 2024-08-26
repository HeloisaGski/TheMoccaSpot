document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const miniCart = document.getElementById('mini-cart');
    const cartClose = document.querySelector('.cart-close');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutButton = document.querySelector('.checkout-button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cart = [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    <button class="remove-item" data-index="${index}">×</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.dataset.productName;
            const productImg = productCard.dataset.productImg;
            const productPrice = parseFloat(productCard.dataset.price);

            cart.push({
                name: productName,
                img: productImg,
                price: productPrice
            });

            updateCart();
        });
    });

    cartIcon.addEventListener('click', () => {
        miniCart.style.display = miniCart.style.display === 'none' || miniCart.style.display === '' ? 'block' : 'none';
    });

    cartClose.addEventListener('click', () => {
        miniCart.style.display = 'none';
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const itemIndex = e.target.dataset.index;
            cart.splice(itemIndex, 1);
            updateCart();
        }
    });

    checkoutButton.addEventListener('click', () => {
        miniCart.style.display = 'none';
    });
});
