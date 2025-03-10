import Controlador from "./controlador_imagen.js";
import config from "./supabase/keys.js";
const Modelo = {
    async insertarImagen(formData){

        const res = await axios({
            method: 'POST',
            url: "http://127.0.0.1:5000/insertar-imagen/",
            data: formData,
            headers: config
        });
        return res;

    }

}
export default Modelo;