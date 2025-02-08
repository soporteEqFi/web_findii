import sweetAlert from "./components/sweet_alert/sweetAlert.js";
import Vista from "./imagen.js";
import Modelo from "./modelo_imagen.js";
const Controlador ={

    async insertarImagen(){
        const datos = Vista.insertarImagen();

        const formData =  new FormData();
        formData.append('imagen',datos.imagen)
        formData.append('nombre',datos.nombre )
        try{
            const res = await Modelo.insertarImagen(formData);
            sweetAlert.mostrarAlertaSatisfactorio("TODO BIEN")

        }catch(error){
            sweetAlert.mostrarMensajeError(error)
            console.error(error)
        }
    }
}
export default Controlador;