import { createProducts } from "../services/product.service.js";

export async function createProduct (req, res, next){
    try {
        let productos = await createProducts
        res.status(200).json({prods: productos})
    } catch (error) {
        next(error)
    }
}