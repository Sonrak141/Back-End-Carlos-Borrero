class Usuario{
    constructor(nombre, apellido,){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas= [];
    }

     getFullName() {
         console.log(`Mi nombre es ${this.nombre} ${this.apellido}`)
     }

     addMascota(mascota) {
         this.mascotas.push(mascota)
         
     }

     countMascotas (){
         console.log(this.mascotas.length)
     }

     addLibro (nombreLibro, autorLibro){
         this.libros.push({
             'nombre': nombreLibro,
             'autor': autorLibro
         })
         
     }

     getLibros (){
         let nombresLibros = []
         this.libros.forEach(
             libro => nombresLibros.push(libro.nombre)
         )
         console.log(nombresLibros)
     }

     

     
};

const usuarioNuevo = new Usuario('Carlos', 'Borrero')
console.log(usuarioNuevo)
usuarioNuevo.getFullName()
usuarioNuevo.addMascota("Perro")
usuarioNuevo.addMascota("Gato")
usuarioNuevo.countMascotas();
usuarioNuevo.addLibro('LightWell', 'Carolina')
usuarioNuevo.addLibro('Cien años de Soledad', 'Gabriel Garcia')
usuarioNuevo.getLibros()
const usu = new Usuario('Jose', 'Borrero')
console.log(usu)
usu.getFullName()