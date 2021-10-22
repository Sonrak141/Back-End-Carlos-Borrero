import generateProd from '../utils/product.util.js'

export async function createProducts (){
    let cantidad = 10;
    const prods = [];
    for (let i = 0; i < cantidad; i++){
        const prod ={
            id: i + 1,
            ...generateProd()
        }
        prods.push(prod);
    }
    console.log(prods);
    return prods;
}
