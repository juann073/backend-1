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
  addProduct = (title, description, price, thumbnail, code, status, stock) => {
    this.sinkDB();
    const id = this.getNextId();
    const product = {
      id,
      title,
      price,
      description,
      thumbnail,
      code,
      status,
      stock,
    };
    if (this.products.some((product) => product.code === code)) {
      return "Code already exists.";
    }
    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return product;
  };
  updateProduct = async (product) => {
    try {
      const existFile = fs.existsSync(this.path);
      if (!existFile) {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
      } else {
        const data = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(data);
      }
      const { id } = product;

      if (!id) return "invalid ID";

      let productToUpdate = this.products.find((p) => p.id === id);

      if (!productToUpdate) return "Not Found.";

      let newArray = this.products.filter((p) => p.id !== id);

      // let verifyCode = this.products.find((p) => p.code === code);

      // if (verifyCode) return "El code ya existe";

      let productUpdate = { ...productToUpdate, ...product };

      newArray.push(productUpdate);

      this.products = newArray;

      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      return productUpdate;
    } catch (error) {
      console.log(error);
      return "error";
    }
  };
  deleteProduct = (id) => {
    const nuevoArray = this.products.filter((product) => product.id !== id);
    if (!nuevoArray) {
      return "la puta madre"
    }
    fs.writeFileSync(this.path, JSON.stringify(this.products));

    return nuevoArray
  };
}
const manager = new ProductManager("./DB.json")
console.log(manager.addProduct("title", 125, "", "", "1", true, 45));
console.log(manager.addProduct("title", 125, "", "", "2",true, 45));
console.log(manager.addProduct("title", 125, "", "", "3",true, 45));
console.log(manager.addProduct("title", 125, "", "", "4",true, 45));

export default manager;
