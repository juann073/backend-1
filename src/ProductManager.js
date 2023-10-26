import fs from "fs";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  getNextId = () => {
    this.sinkDB();
    const count = this.products.length;
    const lastEvent = this.products[count - 1];
    if (count === 0) {
      return 1;
    }
    return lastEvent.id + 1;
  };
  sinkDB = () => {
    const file = fs.existsSync(this.path);
    if (file) {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
    } else {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
  };
  getProduct = () => {
    this.sinkDB();
    return this.products;
  };
  getProductbyId = (id) => {
    this.sinkDB();
    const productFound = this.products.find((product) => product.id === id);
    return productFound;
  };
  addProduct = (title, description, price, thumbnail, code, stock) => {
    this.sinkDB();
    const id = this.getNextId();
    const product = {
      id,
      title,
      price,
      description,
      thumbnail,
      code,
      stock,
    };
    if (this.products.some((product) => product.code === code)) {
      return "Code already exists.";
    }
    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return product;
  };
  updateProduct = async (
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) => {
    try {
      const existFile = fs.existsSync(this.path);
      if (!existFile) {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
      } else {
        const data = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(data);
      }
      const { id } = product;
      if (!id) {
        return "invalis ID";
      }
      let productUpdate = this.products.find((p) => p.id === id);
      if (!productUpdate) {
        return "Not Found.";
      }
      let newArray = this.products.filter((p) => p.id !== id);
      let verifyCode = this.products.find((p) => p.code !== code);
      if (verifyCode) {
        return "El code ya existe";
      }
      productUpdate = { productUpdate, ...product };
      newArray.push(productUpdate);
      this.products = newArray;
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      return productUpdate
    } catch (error) {
      return "error";
    }
  };
  deleteProduct = (id) => {
    this.sinkDB();
    const nuevoArray = this.products.filter((product) => product.id !== id);
    this.products = nuevoArray;
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return "Eliminado correctamente";
  };
}

const manager = new ProductManager("./DB.json");
//manager.addProduct('celular', 'lorem', 500, 'img.jpg', 10)
// manager.addProduct('pepitos', 'lorem', 500, 'img.jpg', 10)
// // productManager.addProduct('cacao', 'lorem', 500, 'img.jpg', 10)
// // productManager.addProduct('galletas', 'lorem', 500, 'img.jpg', 10)
// // productManager.addProduct('chupetines', 'lorem', 500, 'img.jpg', 10)
manager.updateProduct(1, 'chupetines', 'lorem', 500, 'img.jpg', 10)
// console.log(manager.getProduct());
// // console.log(productManager.getProductbyId());
// // console.log(productManager.updateProduct('loro', 'lorem', 500, 'img.jpg', 10));
// // console.log(productManager.updateProduct('carucha', 'lorem', 500, 'img.jpg', 10));
// // console.log(productManager.deleteProduct())

export default manager;
