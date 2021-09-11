const fs = require("fs");

interface prodFill {
  nombre: string;
  precio: number;
  foto: string;
  descripcion: string;
  codigo: string;
  timestamp: any;
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
    let obj = {};
    this.data.map((product) => {
      if (product.id === id) obj = product;
    });

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

  stringifiar = (array: product[]) => JSON.stringify(array, null, 2); // Método para stringifiar el Array y evitar la repetición del código.

  saveList = async (nuevaLista: product[]) => {
    try {
      await fs.writeFile(this.archivo, nuevaLista); // Guardar archivo JSON.
    } catch (error) {
      console.log(error);
    }
  };

  updateById = async (id: number, newProduct: prodFill) => {
    await this.getAll();
    let lista = this.data;

    // Buscar qué posición en el Array de productos tiene el producto con el id buscado:

    const index = lista.findIndex((product) => product.id == id);

    let producto = lista[index];

    // Verificar primero si el producto con ese id existe.

    if (producto) {
      // Desestructuración de las propiedades del nuevo producto:

      const { nombre, precio, foto, codigo, descripcion, timestamp } = newProduct;

      // Actualizar los datos:

      producto.product.nombre = nombre;
      producto.product.precio = precio;
      producto.product.foto = foto;
      producto.product.codigo = codigo;
      producto.product.descripcion = descripcion;
      producto.product.timestamp = timestamp

      // Insertar el producto modificado en la lista:

      lista[index] = producto;

      await this.saveList(lista);

      return producto;
    } else {
      return null;
    }
  };
  async read() {
    let list: product[] = [];
    await this.getAll();
    this.data.map((obj) => {
      list.push(obj);
    });
    return list;
  }
}

module.exports = productsList;
