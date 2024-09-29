import fs from "fs/promises";
import path from "path";
import existingProducts from '../inventory.json'

export async function takeInventory() {
	const folders = await fs.readdir(path.join(__dirname, '../public/images'));
	// treat each folder in images as a product that contains images
	const products: Array<{ id: string, images: string[] }> = []
	for (const productId of folders) {
		const images = await fs.readdir(path.join(__dirname, '../public/images', productId));
		products.push({
			id: productId,
			images
		})
	}
	const mergedProducts = products.map((product) => {
		const existingProduct = existingProducts.find((p) => p.id === product.id);
		return {
			...existingProduct,
			...product,
			images: product.images ?? existingProduct?.images
		}
	})
	await fs.writeFile(path.join(__dirname, '../inventory.json'), JSON.stringify(mergedProducts, null, 2));
}

(async () => {
	await takeInventory();
})();