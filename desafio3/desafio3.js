const express = require('express');
const app = express();
const fs = require("fs");


const data1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
}
const data2 = {
    title: 'Calculadora',
    price: 112,
    thumbnail: 'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
}
const data3 = {
    title: 'Termometro',
    price: 34,
    thumbnail: 'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
}

class Contenedor {
    constructor(archivo) {
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

    async getById(id) {
        await this.getAll();
        let obj = []
        this.data.map((product) => {
            if (this.id === id) obj = product;
        });
        console.log(obj);
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
    async deleteAll(archivo) {
        fs.promises.unlink(`./${archivo}`, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`${archivo} eliminado`)
            }
        })
    }

    async read () {
        let list = []
        await this.getAll();
        this.data.map((obj) => {
            list.push(obj)
        })
        return list
        
    }

}

const prod = new Contenedor('productos.txt')
let view = [];
prod.read().then(
    data => data.map((obj) =>{
        view.push(obj)
        app.get('/', (req, res, next) => {
    
            res.send(view)
        })
    })
    
);





let visitas = 0
app.get('/visitas', (req, res, next) => {
    visitas++
    res.send(`Cantidad de Visitas: ${visitas}`)
})
app.get('/fyh', (req, res, next) => {
    let date = new Date().toLocaleString("es-CO")
    res.send(`La hora es ${date}`)
})
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log('Servidor corriendo con express')
})