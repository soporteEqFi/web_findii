import config from "../../supabase/keys.js";


const Modelo = {

    async mostrarDatos() {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/select-data/",
            headers: config.headers,
        });
        return res
    },

    async traerDatosPersonales(cedula) {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/data-user/" + cedula,
            headers: config.headers,
        });
        return res
    },

}
export default Modelo;
