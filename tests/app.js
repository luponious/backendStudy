import ProductManager from './productManager.js';

const dataFilePath = 'productsData.json'; // Ruta al DB
const pm = new ProductManager({ dataFilePath }); // Instancia de ProductManager
const initialProducts = pm.getProducts(); // get productos iniciales 
console.log('Productos iniciales:', initialProducts);

try {
    const newProduct = pm.addProduct({    // Agregar un nuevo producto
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25,
    });
    console.log('Producto agregado exitosamente:', newProduct);
} catch (error) {
    console.error('Error al agregar el producto:', error.message);
}

const productsAfterAdd = pm.getProducts(); // obtiene productos después de agregar uno
console.log('Productos después de agregar:', productsAfterAdd);

try {
    //intenta obtener el producto por ID
    const productId = productsAfterAdd[0].id; // Se asume que el primer producto tiene un ID válido
    const foundProduct = pm.getProductById(productId);
    console.log('Producto encontrado:', foundProduct);
} catch (error) {
    console.error('Error al obtener el producto por ID:', error.message);
}

try {
    // Actualizar un producto (por ejemplo, cambiar el precio)
    const productToUpdate = productsAfterAdd[0]; // Se asume que hay al menos un producto
    const updatedProduct = pm.updateProduct(productToUpdate.id, { price: 250 });
    console.log('Producto actualizado:', updatedProduct);
} catch (error) {
    console.error('Error al actualizar el producto:', error.message);
}

try {
    // Eliminar un producto (ej el último producto agregado)
    const productToDelete = productsAfterAdd[productsAfterAdd.length - 1];
    pm.deleteProduct(productToDelete.id);
    console.log('Producto eliminado.');
} catch (error) {
    console.error('Error al eliminar el producto:', error.message);
}
