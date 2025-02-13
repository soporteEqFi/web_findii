import config from "../../supabase/keys.js";
import Miscelaneas from "../../otros/miscelaneas.js";

const Modelo = {

    async traerDatosPersonalesAgente(cedula) {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5700/mostrar-datos-personales/" + cedula,
            headers: config.headers,
        });
        return res
    },

}
export default Modelo;
