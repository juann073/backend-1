import Express from "express";
import ProductManager from "./ProductManager.js";
const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Bienvenido");
});
app.get("/products", async (req, res) => {
  try {
    const products = ProductManager.getProduct();
    const limit = req.query.limit;
    if (limit) {
      return res.send(products.slice(0, limit));
    }
    console.log(limit);
    return res.send({status:"success", payload: products});
  } catch (error) {
    return res.send(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    console.log(req.params);
    const product = ProductManager.getProductbyId(Number(pid));
    if (!product) {
      return res.status(404).send({ error: "Product Not Found" });
    }
    return res.send({status:"success", payload: product});
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});
app.post("/products/add", async(req, res)=>{
  const add = ProductManager.addProduct("title", 125, "", "", "9", true, 45)
  if (!add) {
    return res.status(404).send({ error: "Product Not Add" });
  }
  return res.send({status:"success", message: "Product created"});
  
})
app.put("/products/:pid", async (req, res) => {
    try {
      const products = ProductManager.getProduct();
      const { pid } = req.params;
      const product = req.body
      const productUpdate = ProductManager.updateProduct(Number(pid));
      if (!productUpdate) {
        return res.status(404).send({ error: "Product Not Found" });
      }
      products[productUpdate] = product
      return res.send({status:"success", message: "Product update"});
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  });

app.delete("api/products/:pid", async(req, res) =>{
  try {
    const{pid} = req.params
    const productDelete = ProductManager.deleteProduct(pid)
    if (!productDelete) {
      return res.status(404).send({ error: "Product Not Found" });
    }
    return res.send({status:"success", message: "Product delete"})
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})  

app.listen(8080, () => {
  console.log("Server is runnning...");
});

export default app;
