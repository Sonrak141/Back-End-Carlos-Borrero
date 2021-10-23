import express from 'express';
import { createProduct } from '../controllers/product.controller.js';

const productos = express.Router()

productos.post('/', createProduct)

export default productos
