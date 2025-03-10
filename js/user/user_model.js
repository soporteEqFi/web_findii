import config from "../supabase/keys.js";

const Model = {

    async getUserInfo(id) {
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/get-user-info/" + id,
            headers: config.headers,
        });
        return res
    },

    async get_agent_info(id) {
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/get-agent-info/" + id,
            headers: config.headers,
        });
        return res
    },

    async get_solicitante_info(id) {
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/get-solicitante-info/" + id,
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
            url: "https://equitisoporte.pythonanywhere.com/update-user/",
            data: data_agentes,
            headers: config.headers,
          });
          return res
    },
    async get_all_user(){
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/get-all-user/",
            headers: config.headers
        })
        return res

    },
    async create_user(datos){
        const data = {
            nombre: datos.nombre,
            cedula: datos.cedula,
            email: datos.correo,
            password: datos.contraseña,
            rol: datos.rol,
            empresa: datos.empresa
        }

        console.log(data)
        
        const res = axios({
            method: "POST",
            url: "https://equitisoporte.pythonanywhere.com/create-user/",
            data: data,
            headers: config.headers,
          });
          return res

    }
}
export default Model;
