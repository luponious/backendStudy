import { readFile, writeFile } from 'fs/promises';

class ProductManager {
  constructor({ dataFilePath }) {
    this.dataFilePath = dataFilePath;
    this.products = this.readProductsFromFile().catch(() => []); // Catch erros en  caso de que el achivo no exita.
  }

  async readProductsFromFile() {
    try {
      const data = await readFile(this.dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async writeProductsToFile() {
    try {
      await writeFile(this.dataFilePath, JSON.stringify(await this.products, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing data to file:', error);
    }
  }

  async newID() {
    const currentProducts = await this.products;
    return currentProducts.length ? Math.max(...currentProducts.map((product) => product.id)) + 1 : 1;
  }

  async addProduct(productData) {
    const { code } = productData;
    const currentProducts = await this.products;

    if (currentProducts.some((product) => product.code === code)) {
      throw new Error('Ya existe un producto con el mismo código.');
    }

    const id = await this.newID();
    const newProduct = { id, ...productData };
    currentProducts.push(newProduct);
    this.writeProductsToFile();
    return newProduct;
  }

  async getProducts() {
    return await this.products;
  }

  async getProductById(id) {
    const currentProducts = await this.products;
    const product = currentProducts.find((product) => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado.');
    }

    return product;
  }

  async updateProduct(id, updatedFields) {
    const currentProducts = await this.products;
    const productIndex = currentProducts.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado.');
    }

    currentProducts[productIndex] = { ...currentProducts[productIndex], ...updatedFields };
    this.writeProductsToFile();
    return currentProducts[productIndex];
  }

  async deleteProduct(id) {
    const currentProducts = await this.products;
    const initialLength = currentProducts.length;
    const updatedProducts = currentProducts.filter((product) => product.id !== id);

    if (updatedProducts.length === initialLength) {
      throw new Error('Producto no encontrado.');
    }

    this.products = updatedProducts;
    this.writeProductsToFile();
  }
}

export default ProductManager;
