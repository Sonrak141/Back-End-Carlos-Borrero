const fs = require("fs");
 const data1 = {
         title:'Escuadra',
         price: 123.45,
         thumbnail:'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
     }
     const data2 = {
      title:'Calculadora',
      price: 112,
      thumbnail:'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
  }
  const data3 = {
    title:'Termometro',
    price: 34,
    thumbnail:'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
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
    this.data.map((product)=>{
      if(this.id === id) obj = product;
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
    this.data.map((product)=>{
      if(product.id === id) objI = this.data.indexOf(product);
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
      if(error){
        console.log(error);
      }else{
        console.log(`${archivo} eliminado`)
      }
    })
  }
}

const prod = new Contenedor('archivo.txt')

const func = async ()=>{
  await prod.save(data1);
  await prod.save(data2);
  await prod.save(data3);
  await prod.deleteById(2);
  await prod.getById(3)
  await prod.deleteAll('archivo.txt')
  
}

func()
