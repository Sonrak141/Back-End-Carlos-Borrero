
const { db } = require('../db.js');

export async function createProduct (data: any){
	try {
		await db('productos').insert(data);
		return
	} catch (error: any) {
		throw new Error(error)
	}
}

export async function getProducts () {
	try {
		const products = await db('productos').select()
		return products
	} catch (error: any) {
		throw new Error(error)
	}
}

export async function deleteProduct (prodID: number){
	try {
		await db('productos').delete().where('id', prodID)
		return
	} catch (error: any) {
		throw new Error(error)
	}
}

export async function updateProduct (prodID: number, data: any){
	try {
		await db('productos').update(data).where('id', prodID)
		return
	} catch (error: any) {
		throw new Error(error)
	}
}