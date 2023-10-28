class Product {
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  ultimoID = 0;  

  constructor({ products = [] }) {
    this.products = products; // Ini lista de productos vacía
  }

  newID() {  // ID único increm > ultimoID
    this.ultimoID++;
    return this.ultimoID;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (this.products.some((product) => product.code === code)) {
      throw new Error("Ya existe un producto con el mismo código.");
    }

    const id = this.newID(); // nuevo ID.
    const newProduct = new Product({ id, title, description, price, thumbnail, code, stock });
    this.products.push(newProduct); // > nuevo producto a la lista.
    return newProduct; // > producto agregado.
  }

  getProducts() {
    return this.products; // > lista de productos.
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product; // > producto p/ ID.
  }
}

const pm = new ProductManager({}); // instancia d ProductManager.
console.log("Productos iniciales:", pm.getProducts());

try {
  const newProduct = pm.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  console.log("Producto agregado exitosamente:", newProduct);
} catch (error) {
  console.error("Error al agregar el producto:", error.message);
}

console.log("Productos después de agregar:", pm.getProducts());

try {
  pm.addProduct({
    title: "producto repetido",
    description: "Este es un producto repetido",
    price: 300,
    thumbnail: "Otra imagen",
    code: "abc123", // Código repetido
    stock: 10,
  });
  console.log("Producto agregado exitosamente.");
} catch (error) {
  console.error("Error al agregar el producto:", error.message);
}

try {
  const productId = pm.getProducts()[0].id;
  const foundProduct = pm.getProductById(productId);
  console.log("Producto encontrado:", foundProduct);
} catch (error) {
  console.error("Error al obtener el producto por ID:", error.message);
}
