'use server'

import inventory from '../inventory.json'

interface Product {
	id: string;
	images: string[];
	price: number;
	description: string;
	name: string;
}

/**
 * Read files from the ./images/{productId}/* and treat each folder as a product with
 * photos in it. return a list of products and each photo as a photo of the product.
 * 
 */
export async function getProducts(): Promise<Product[]> {
	const products: Array<Product> = [];

	for (const product of inventory) {
		const data = {
			...product,
			images: product.images.map((file) => `/images/${product.id}/${file}`)
		} as Product
		products.push(data);
	}
	return products;
}