import Controlador from "./controlador_imagen.js";
const Vista ={
    insertarImagen(){
        const imagen = document.getElementById('imagen').files[0];
        const nombre = document.getElementById('nombre').value

        return{
            imagen,
            nombre
        }

    }
}
export default Vista;

const btnEnviar = document.getElementById('btnPrueba');
btnEnviar.onclick = function(){
    Controlador.insertarImagen()

}
