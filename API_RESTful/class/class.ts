const fs = require('fs');

interface prodFill {
    title: string;
    price: number;
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

class productsList {
    constructor(archivo: string) {
        this.archivo = archivo;
        this.id = 0;
        this.data = [];
    }



    async save(obj: prodFill) {
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
        let obj = {}
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

    async deleteById(id: number) {
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
    async read() {
        let list: product[] = []
        await this.getAll();
        this.data.map((obj) => {
            list.push(obj)
        })
        return list

    }

    
    
}

module.exports = productsList;