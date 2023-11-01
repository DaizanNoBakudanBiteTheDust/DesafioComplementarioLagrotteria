// Socket comunica con servidor
const socket = io();


socket.on('showCarts', data => {
    container.innerHTML = ``

    data.forEach(cart => {
        container.innerHTML += `
            <ul>
                <li>products: [${cart.products}]</li> 
                <li>id: ${cart._id}</li>
            </ul>
        `
    })
})




