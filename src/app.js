import express from 'express';
import ProductManager from './productManager';

//****************************************************************************/
//rutas
//todos los prod: localhost:8080/products
// prod by id: ''         '' /ID
//****************************************************************************/



const app = express();
const port = 8080;

const productManager = new ProductManager({ dataFilePath: './productsData.json' });

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(Number(pid)); // Asegúra de convertir pid a número
        res.json({ product });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
