import { promises as fs } from "fs";
import  SyncFs  from "fs";


class ProductManager {
    
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    static id = 0;

    writeProducts = async (data) => {
        await fs.writeFile(this.path, JSON.stringify(data,null,2));
    }

    
    existProduct = async (id) => {
        let answer = await this.getProducts();
        let filter = answer.find((product) => product.id === id);
        return filter;
    }

    addProduct = async (title, description, price, image, code, stock) => {
        if (!title || !description || !price || !image || !code || !stock){
            console.log("At least one piece of data is missing");
        }else{
            this.products = await this.getProducts();
            let lastId=0;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id > lastId) {
                lastId = this.products[i].id;
                }
            }
            ProductManager.id = lastId++;
            if (this.products.some((element) => element.code === code)){
                console.log("error, duplicate code");
            }else{
                ProductManager.id++;
                let newproduct = {
                title,
                description,
                price,
                image,
                code,
                stock,
                id: ProductManager.id
                };
                this.products.push(newproduct);
                await this.writeProducts(this.products);
            }
        }
    }

    getProducts = async () => {
        if (!SyncFs.existsSync(this.path)) {
            console.log([]);
        } else {
            let answer = await fs.readFile(this.path, "utf8");
            return JSON.parse(answer);
        }
    }


    getProductById = async (id) => {
        let answer = await this.getProducts();
        let filter = answer.find((product) => product.id === id);
        if (!filter) {
            console.log("Product not found");
        } else {
            return filter;
        }
    }


    deleteProduct = async (id) => {
        this.products = await this.getProducts();
        let productToDelete = this.products.find((product) => product.id === id);
        if (!productToDelete) {
            console.log("Product not found, can't delete.");
        } else {
            let productFilter = this.products.filter(products => products.id !== id);
            await this.writeProducts(productFilter);
        }
    }


    updateProduct = async (id, updateData) => {
        this.products = await this.getProducts();
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            if (!this.products.some((element) => element.code === updateData.code)){
                this.products[productIndex] = { ...this.products[productIndex], ...updateData };
                await this.writeProducts(this.products);
                console.log(`Product with id ${id} Successfully updated.`);
            }else{
                console.log(`Duplicate Product cant write code ${updateData.code}.`);
            }
        } else {
            console.log(`Product not found with id ${id}.`);
        }
    }
}

export default ProductManager;

// ------------------------------------------------------testing------------------------------------------------------------------------------------
//const productos = new ProductManager("productos.json");
//console.log(await productos.getProducts());
//productos.addProduct("gorra","gorra nike","200","c:/gorra.jpg","abc1344","100"); 
//productos.addProduct("gorra","gorra nike","200","c:/gorra.jpg","abc1297","100"); 
//productos.addProduct("gorra","gorra nike","200","c:/gorra.jpg","abc125","100"); 
//console.log(await productos.getProducts());
//productos.deleteProduct(1);
//console.log(await productos.getProductById(2));
//productos.updateProduct(2, {name: 'cac44a', price: 1099, stock: 56, code: 8787});no