// Socket comunica con servidor
const socket = io();


socket.on('showCarts', data => {
    container.innerHTML = ``

    data.forEach(cart => {
        container.innerHTML += '<ul>';
        cart.products.forEach(product => {
            container.innerHTML += `
                <li>Product ID: ${product.id}</li>
                <li>Quantity: ${product.quantity}</li>
                <!-- Aquí puedes agregar más detalles del producto -->
            `;
        });
        container.innerHTML += `<li>Cart ID: ${cart._id}</li></ul>`;
    });
});




