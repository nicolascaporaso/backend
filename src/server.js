import express from 'express'
import {apiRouter} from "./routes/api.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log("example app listen port " + "http://localhost:"+port+"/api/products");
});

app.use("/api", apiRouter)













/*
app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await myManager.getProducts();
        if (limit) {
            res.status(200).json(products.slice(0, limit));
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ message: 'error' })
    }
});

app.get("/products/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await myManager.getProductById(id);
        if (product) {
            res.status(200).json(product);
        }
    } catch (error) {
        if (error.message === "Product not found") {
            res.status(404).json({ message: "Product not found" })
        } else {
            console.log(error);
            res.status(500).json({ message: 'error' })
        }
    }
});

app.post("/products", async (req, res) => {
    const newProduct = req.body;
    try {
        const product = await myManager.addProduct(newProduct);
        return res.status(201).json(product);
    } catch (error) {
        if (error.message === "duplicate code") {
            res.status(409).json({ message: "error, duplicate code" })
        }
        else if (error.message === "ID is being sent") {
            res.status(409).json({ message: "problems with ID" })

        }
        else if (error.message === "data is missing") {
            res.status(404).json({ message: "At least one piece of data is missing" })

        } else {
            console.log(error);
            res.status(500).json({ message: 'error desconocido' })
        }
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const newProduct = req.body;
        if (newProduct.id) {
            return res.status(400).json({ error: "data incorrect, se intenta modificar id", });
        }
        const id = req.params.id;
        const product = await myManager.updateProduct(id, newProduct);
        return res.status(201).json({ mesage: "complete update ok" });
    } catch (error) {
        if (error.message === "Duplicate code product") {
            res.status(409).json({ message: "error, duplicate code" })
        }
        else if (error.message === "Product not found with id") {
            res.status(404).json({ message: "error, product no found" })

        } else {
            console.log(error);
            res.status(500).json({ message: 'error desconocido' })
        }
    }

});

app.delete("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await myManager.deleteProduct(id);
        return res.status(200).json({ message: 'producto borrado' })
    } catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({ message: "Product not found, can't delete." })
        } else {
            return res.status(500).json({ message: 'error interno' });
        }
    }
});

//-------------------------------------------------------------------------------------------
app.post("/carts", async (req, res) => {
    try {
        const product = await cartManager.createCart();
        return res.status(201).json({ mesage: "complete cart creation" });
    } catch (error) {
        if (error.message === "error, reading or writting file") {
            res.status(409).json({ message: "cant create cart" })
        }
        else {
            console.log(error);
            res.status(500).json({ message: 'error desconocido' })
        }
    }
});

app.get("/carts", async (req, res) => {
    try {
        const limit = req.query.limit
        const carts = await cartManager.getCarts();
        if (limit) {
            res.status(200).json(carts.slice(0, limit));
        } else {
            res.status(200).json(carts);
        }
    } catch (error) {
        res.status(500).json({ message: 'error' })
    }
});

app.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        await cartManager.addProductToCart(cId, pId);
        return res.status(201).json({ message: "product added to cart" });
    } catch (error) {
        if (error.message === "Cart not found") {
            res.status(404).json({ message: "cart not found" });
        } else {
            console.log(error);
            res.status(500).json({ message: "unknown error" });
        }
    }
});

*/
