const fs = require("fs");
// const data1 = {
//     id: 1,
//     product:{
//         title:'Escuadra',
//         price: 123.45,
//         thumbnail:'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
//     }
// }
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

  getById(id) {}
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (data) {
        this.data = JSON.parse(data);
        this.data.map((product) => {
          if (this.id < product.id) this.id = product.id;
        });
        console.log(this.data);
      }
    } catch (error) {
      return;
    }
  }
  deleteById(id) {}
  deleteAll() {}
}
