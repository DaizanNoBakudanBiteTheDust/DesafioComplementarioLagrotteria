import {
        Router
} from 'express';
// import cartManager from '../../dao/fileManagers/cartManager.js';
import {
        cartsFilePath
} from '../../utils.js';
import Carts from '../../dao/dbManagers/cart.manager.js';

// MANAGER ANTIGUO const manager = new cartManager(cartsFilePath); 

const manager = new Carts(); // por ahora usaremos este

const router = Router();


// traer todos los productos

router.get('/', async (req, res) => {

        const cart = await manager.getAll();
        res.send({
                cart
        })

});


router.get('/:cid', async (req, res) => {
        const {cid} = req.params;

         //carrito por ID

         const cart = await manager.getProductById(cid);
     
       res.send(cart);
});

//postea carrito

router.post('/', async (req, res) => {
        const carts = await manager.getAll();
        // Productos que haremos con Postman
        const cart = req.body;

        // Obtener un array con todos los "id" existentes 
        const existingIds = carts.map(p => p._id);

        if (!cart.products) {
                // Error del cliente
                return res.status(400).send({
                        status: 'error',
                        error: 'incomplete values'
                });
        }

        await manager.save(cart);

        // status success
        return res.send({
                status: 'success',
                message: 'product created',
                cart
        })
});



// postea los productos


router.post('/:cid/products/:pid', async (req, res) => {

        // utilizo params de carrito y producto
        const {cid} = req.params;
        const pid = parseInt(req.params.pid); // Convierte pid a número

        //carrito por ID

        const cart = await manager.getProductById(cid);

        if (!cart) {
                return res.status(404).json({
                        error: 'Carrito no encontrado'
                });
        }

        // Verifica si el carro está vacío
    if (!cart.products || cart.products.length === 0) {
        cart.products = []; // Inicializa cart.products como un arreglo vacío
    }

    const lastProductId = cart.products.length > 0 ? cart.products[cart.products.length - 1].id : 0;
    const newProductId = lastProductId + 1;

    const existingProduct = cart.products.find(product => product.id === pid);

        if (existingProduct) {
                // Si el producto ya existe, incrementa la cantidad
               existingProduct.quantity += 1;
        } else {

        // Crea el objeto del producto con el nuevo ID y cantidad inicial de 1
        const addedProduct = {
                id: newProductId, // Establece el ID del producto
                quantity: 1
            };

        // Agrega el producto al arreglo "products" del carrito
        cart.products.push(addedProduct);
        
         }

        // Actualiza el carrito con los cambios
        await manager.update(cid, cart);

        await manager.save(cart);

        // status success
        return res.json({
                status: 'success',
                message: 'product added',
                cart
        })

});


export default router;