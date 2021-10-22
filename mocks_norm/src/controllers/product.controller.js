import { createProducts } from "../services/product.service.js";

export async function createProduct (req, res, next){
    try {
        let prods = await createProducts()
        console.log(prods)
        res.status(200).json(prods)
    } catch (error) {
        next(error)
    }
}