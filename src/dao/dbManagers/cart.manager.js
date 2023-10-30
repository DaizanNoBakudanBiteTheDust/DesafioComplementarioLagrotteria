import { cartsModel } from "./models/carts.models.js";

export default class Carts {
    constructor(){
        console.log("db trabajando")
    }

    getAll = async () => {

        const carts = await cartsModel.find().lean();
        return carts;
    }

    save = async (cart) => {
        const result = await cartsModel.create(cart);
        return result;
    }

    update = async (id, cart) => {
        const result = await cartsModel.updateOne({_id : id}, cart);
        return result;
    }

    update = async (id, cart) => {
        const result = await cartsModel.deleteOne({_id : id}, cart);
        return result;
    }

    getProductById = async (idProduct) => {

        const products = await cartsModel.find().lean();

        const indexProduct = products.findIndex(product => product._id === idProduct);

        if (indexProduct === -1) {
            return console.log('Producto no encontrado');

        } else {
            return products[indexProduct]
        }


    }
}
