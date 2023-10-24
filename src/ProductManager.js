import  Express  from "express"
import fs from 'fs'
const app = Express()
app.get('/productos', (req, res) => res.send(productManager))
app.listen(8080, ()=>{
    console.log('Server is runnning...');
})
class ProductManager {
    constructor() {
        this.products = []
    
    }
    getNextId = () => {
        const count = this.products.length
        const lastEvent = this.products[count - 1]
        if (count === 0) {
            return 1
        }
        return lastEvent.id + 1
    }
    getProduct = () => { return this.products }
    getProductbyId = (id) => {
        const productFound = this.products.find(product => product.id === id)
        if (!productFound) {
            console.error('ese objeto no existe');
        }
        return productFound
    }
    addProduct = (title, description, price, thumbnail, stock) => {
        const id = this.getNextId()
        const product = {
            id,
            title,
            price,
            description,
            thumbnail,
            stock
        }
        this.products.push(product)
    }
    updateProduct = async (id, title, description, price, thumbnail, stock) => {
        const update = {

            id,

            title,

            description,

            price,

            thumbnail,

            stock

        };
        const updatedProduct = { ...this.products[this.products.find(product => product.id === id)], ...update };

        this.products.find(product => product.id === id) = updatedProduct

        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    }
    deleteProduct = (id) => {
        const eliminar = this.products.filter(product => product.id !== id)
        if (id === eliminar) {
            console.log('Producto elimininado');
        } else
            return eliminar
    }


}

const productManager = new ProductManager()
productManager.addProduct('celular', 'lorem', 500, 'img.jpg', 10)
productManager.addProduct('pepitos', 'lorem', 500, 'img.jpg', 10)
productManager.addProduct('cacao', 'lorem', 500, 'img.jpg', 10)
productManager.addProduct('galletas', 'lorem', 500, 'img.jpg', 10)
productManager.addProduct('chupetines', 'lorem', 500, 'img.jpg', 10)
productManager.updateProduct()
console.log(productManager.getProduct());
console.log(productManager.getProductbyId());
console.log(productManager.updateProduct('loro', 'lorem', 500, 'img.jpg', 10));
console.log(productManager.updateProduct('carucha', 'lorem', 500, 'img.jpg', 10));
console.log(productManager.deleteProduct())

export default ProductManager


