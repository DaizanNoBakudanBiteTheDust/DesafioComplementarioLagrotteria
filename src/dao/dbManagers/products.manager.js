import {
    productsModel
} from "./models/products.models.js";

export default class Products {
    constructor() {
        console.log("db trabajando")
    }

    getAll = async () => {

        const products = await productsModel.find().lean();
        return products;
    }

    save = async (product) => {

        const existingProduct = await productsModel.findOne({
            code: product.code
        });

        if (existingProduct) {
           console.log("producto existe con ese codigo");
            };
        
        // se agrega el producto

        const result = await productsModel.create(product);

        return result;
    }

}