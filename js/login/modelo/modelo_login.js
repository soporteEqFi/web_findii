import config from "../../supabase/keys.js";

const Modelo = {

    inicioLogin(email, password){
        
        const datosInicio={
            email:  email,
            password: password
        }

        const res = axios ({
            method: 'POST',
            url:'http://127.0.0.1:5600/iniciar-sesion/',
            headers: config.headers,
            data: datosInicio,


        })
        return res
    }
}
export default Modelo;