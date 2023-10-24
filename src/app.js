import Express from "express"
import ProductManager from "./ProductManager"
const app = Express()

app.get('/', (request,response) => {
    response.send('Bienvenido')
})

app.listen(8080, ()=>{
    console.log('Server is runnning...');
})

export default app