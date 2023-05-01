import express, { json } from 'express'
import ProductManager from "./productManager.js";

const myManager = new ProductManager('./src/products.json');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("example app listen port" + port);
});
//----------------------------------------------------------------------------------------------------------

app.get("/products", async (req, res) =>{
    try{
        const limit = req.query.limit
        const products =  await myManager.getProducts();
        console.log(products);
            if(limit){
                res.status(200).json(products.slice(0, limit));
            }else{
                res.status(200).json(products);
            }        
    }catch (error){
        res.status(500).json({message: 'error'})
    }
});

app.get("/products/:pid", async (req, res) =>{
    try{
        const id = parseInt(req.params.pid); 
        const product =  await myManager.getProductById(id);
            if(product){
                res.status(200).json(product);
            }else{
                res.status(404).send('the product with ID no exist');
            }
        }catch (error){
            res.status(500).json({message: 'error'})
        }
});