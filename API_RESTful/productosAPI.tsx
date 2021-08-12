const fs = require('fs');
const express = require('express');

interface prodFill{
    title: string;
    pricec: number;
    thumbnail: string
}

interface product {
    id: number;
    product: prodFill;
}

interface productsList {
    archivo: string;
    id: number;
    data: product[];
}

const app = express();
class productsList{
    constructor(archivo: string){
        this.archivo = archivo;
        this.id = 0;
        this.data = [];
    }
    
    async save(obj) {
        await this.getAll();
        this.id++;
        this.data.push({
          id: this.id,
          product: obj,
        });
        try {
          await fs.promises.writeFile(this.archivo, JSON.stringify(this.data));
        } catch (error) {
          console.log(error);
        }
      }

      async getById(id: number) {
        await this.getAll();
        let obj= {}
        this.data.map((product) => {
            if (product.id === id) obj = product;
        });
        console.log(obj);
        return obj;
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, "utf-8");
            if (data) {
                this.data = JSON.parse(data);
                this.data.map((product) => {
                    if (this.id < product.id) this.id = product.id;
                });
                
            }
            
        } catch (error) {
            return;
        }
    }

    async deleteById(id) {
        await this.getAll();
        let objI = 0;
        this.data.map((product) => {
            if (product.id === id) objI = this.data.indexOf(product);
        });
        this.data.splice(objI, 1);
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.data));
        } catch (error) {
            console.log(error);
        }

    }
    // async deleteAll(archivo) {
    //     fs.promises.unlink(`./${archivo}`, (error) => {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log(`${archivo} eliminado`)
    //         }
    //     })
    // }
    async read () {
        let list = []
        await this.getAll();
        this.data.map((obj) => {
            list.push(obj)
        })
        return list
        
    }
}

const data1 = {
    title:'Escuadra',
    price: 123.45,
    thumbnail:'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
}
const prod = new productsList('./API_RESTful/productos.txt');

app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo</h1>')
})

const PORT = 8082;
const server = app.listen(PORT, () => {
    console.log('Servidor productos Api corriendo')
})