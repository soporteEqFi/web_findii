import config from "../supabase/keys.js";

const Model = {

    async getUserInfo(id) {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/get-user-info/" + id,
            headers: config.headers,
        });
        return res
    },

    async get_agent_info(id) {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/get-agent-info/" + id,
            headers: config.headers,
        });
        return res
    },

    async get_solicitante_info(id) {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/get-solicitante-info/" + id,
            headers: config.headers,
        });
        return res
    },

    async update_user(datos, idAgente){
        const data_agentes ={
            nombre: datos.nombre,
            cedula: datos.cedula,
            rol: datos.rol,
            empresa: datos.empresa,
            id: idAgente
        }
        const res = axios({
            method: "PUT",
            url: "http://127.0.0.1:5000/update-user/",
            data: data_agentes,
            headers: config.headers,
          });
          return res
    }
}
export default Model;
