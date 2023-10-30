// Socket comunica con servidor
const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let messagesLog = document.getElementById('messageLog');

Swal.fire({
    title: 'Identifícate',
    input: 'text',
    text: 'Ingresa al Chat',
    inputValidator: (value) => {
        if (!value) {
            return 'Necesitas escribir un nombre';
        }
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then((result) => {
    if (result.isConfirmed) {
        user = result.value;
        socket.emit('authenticated', user);
    }
});

chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter'){
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatBox.value });
            chatBox.value = '';
    }}

    
})

//AGREGAR
const agregarForm = document.getElementById('agregarForm');

agregarForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevoProducto = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value), 
        status: document.getElementById('status').value,
        thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        stock: parseInt(document.getElementById('stock').value), 
        category: document.getElementById('category').value
    };

    // Enviar el nuevo producto al servidor a través de sockets
    socket.emit('agregarProducto', nuevoProducto);

    // Limpiar los campos de entrada
    agregarForm.reset();
});


//ELIMINAR
const eliminarForm = document.getElementById('eliminarForm');
const productIdInput = document.getElementById('productId');

eliminarForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productId = productIdInput.value;

    // Enviar el ID del producto al servidor a través de sockets
    socket.emit('eliminarProducto', productId);

    // Limpiar el campo de entrada
    productIdInput.value = '';
});

//acá pondré los productos que me pasa el cliente
const container = document.getElementById('container');

socket.on('showProducts', data => {
    container.innerHTML = ``

    data.forEach(product => {
        container.innerHTML += `
            <ul>
                <li>titulo: ${product.titulo}</li> 
                <li>descripcion: ${product.descripcion}</li>
                <li>code: ${product.code}</li>
                <li>precio: ${product.precio}</li>
                <li>thumbnail: ${product.status}</li>
                <li>stock: ${product.stock}</li>
                <li>category: ${product.category}</li>
                <li>id: ${product._id}</li>
            </ul>
        `
    })
})

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

socket.on('showChats', data => {
    let messages = '';

    data.forEach(message => {
        messages += `<div id="messageLog">
            <ul>
                ${message.user} dice: ${message.message}
            </ul>
        </div>`;
    });

    // Agrega los nuevos mensajes al área de chat
    messagesLog.innerHTML = messages;
    

})




