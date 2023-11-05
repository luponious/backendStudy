import { readFileSync, writeFileSync } from 'fs';

class ProductManager {
  constructor({ dataFilePath }) {
    this.dataFilePath = dataFilePath;
    this.products = this.readProductsFromFile() || [];
  }

  readProductsFromFile() {
    try {
      const data = readFileSync(this.dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  writeProductsToFile() {
    writeFileSync(this.dataFilePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  newID() {
    return this.products.length ? Math.max(...this.products.map((product) => product.id)) + 1 : 1;
  }

  addProduct(productData) {
    const { code } = productData;
    if (this.products.some((product) => product.code === code)) {
      throw new Error('Ya existe un producto con el mismo código.');
    }

    const id = this.newID();
    const newProduct = { id, ...productData };
    this.products.push(newProduct);
    this.writeProductsToFile();
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error('Producto no encontrado.');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado.');
    }

    this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
    this.writeProductsToFile();
    return this.products[productIndex];
  }

  deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);
    if (this.products.length === initialLength) {
      throw new Error('Producto no encontrado.');
    }

    this.writeProductsToFile();
  }
}

export default ProductManager;
