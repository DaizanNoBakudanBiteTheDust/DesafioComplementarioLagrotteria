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

         const cart = await manager.getProductById(cartId);
     
       res.send(cart);
});


// postea los productos


router.post('/:cid/products/:pid', async (req, res) => {

        const carts = await manager.getAll();

        // utilizo params de carrito y producto
        const {cid} = req.params;
        const {pid}= req.params

        //carrito por ID

        const cart = await manager.getProductById(cid);

        if (!cart) {
                return res.status(404).json({
                        error: 'Carrito no encontrado'
                });
        }

        // verifica si el carro esta vacio

        if (!cart.products || cart.products.length === 0) {
                console.log("carro vacio");
        }

        const existingProduct = cart.products.find(product => product.id === productId);

        if (existingProduct) {
                // Si el producto ya existe, incrementa la cantidad
                existingProduct.quantity += 1;
        } else {
                // Si el producto no existe, obtén el último ID de producto
                const lastProductId = cart.products.length > 0 ? cart.products[cart.products.length - 1].id : 0;

                // Incrementa el último ID en 1 para obtener el nuevo ID único
                const newProductId = lastProductId + 1;

                // Crea el objeto del producto con el nuevo ID y cantidad inicial de 1
                const addedProduct = {
                        id: newProductId,
                        quantity: 1
                };

                // Agrega el producto al arreglo "products" del carrito
                cart.products.push(addedProduct);
        }

        // Actualiza el carrito con los cambios
        await manager.updateProduct(cartId, cart);

        await manager.addProducts(cart);

        // status success
        return res.send({
                status: 'success',
                message: 'product added',
                cart
        })

});


export default router;