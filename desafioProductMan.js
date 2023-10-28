class Product { //class pprod
    constructor({ id, title, description, price, thumbnail, code, stock }) { //propiedades
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}


class ProductManager {
    ultimoID = 0

    constructor({ products = [] }) { //producto arr vacia
        this.products = products
    }

    newID() {
        this.ultimoID++
        return this.ultimoID
    }
    addProduct(id, title, description, price, thumbnail, code, stock) { //+producto

        if (this.products.includes(e => e.code === code)) throw new Error("esta potatoe ya existe")

        const newProduct = new Product(id, title, description, price, thumbnail, code, stock)
        this.products.push(newProduct)
        return newProduct + "producto agregado"
    }

    getProducts() {         //get
        return console.log(this.products)
    }

    getProductById(id) {         //getid
        const productoBuscado = this.products.find(e => e.id === id)
        if (!productoBuscado) {
            throw new Error('esta potatoe non existe')         //error - not found
        }
        return console.log(`good potatoe!!!`
        )
    }
}



const pm = new ProductManager([])
pm.getProducts()

pm.addProduct({
    id: pm.newID(),
    title: 'Potatoes!',
    description: 'Este es un potatoe de prueba',
    price: 200,
    thumbnail: 'https://www.shutterstock.com/pt/image-photo/new-potato-isolated-on-white-background-1910558641',
    code: 'banano123',
    stock: 25
})

pm.getProducts()


pm.getProductById(1)