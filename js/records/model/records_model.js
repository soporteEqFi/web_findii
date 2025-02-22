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

    async traerDatosPersonales(cedula) { //quitar esta función
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/get-user-info/" + cedula,
            headers: config.headers,
        });
        return res
    },

    async insertData(data) {  

        console.log(data)
        
        const data_to_send = {
            nombre_completo: data.nombre_completo,
            tipo_documento: data.tipo_documento,
            numero_documento: data.numero_documento,
            fecha_nacimiento: data.fecha_nacimiento,
            numero_celular: data.numero_celular,
            correo_electronico: data.correo_electronico,
            nivel_estudio: data.nivel_estudio,
            profesion: data.profesion,
            estado_civil: data.estado_civil,
            personas_a_cargo: data.personas_a_cargo,
            direccion_residencia: data.direccion_residencia,
            tipo_vivienda: data.tipo_vivienda,
            barrio: data.barrio,
            departamento: data.departamento,
            estrato: data.estrato,
            ciudad_gestion: data.ciudad_gestion,
            actividad_economica: data.actividad_economica,
            empresa_labora: data.empresa_labora,
            fecha_vinculacion: data.fecha_vinculacion,
            direccion_empresa: data.direccion_empresa,
            telefono_empresa: data.telefono_empresa,
            tipo_contrato: data.tipo_contrato,
            cargo_actual: data.cargo_actual,
            ingresos: data.ingresos,
            valor_inmueble: data.valor_inmueble,
            cuota_inicial: data.cuota_inicial,
            porcentaje_financiar: data.porcentaje_financiar,
            total_egresos: data.total_egresos,
            total_activos: data.total_activos,
            total_pasivos: data.total_pasivos,
            tipo_credito: data.tipo_credito,
            plazo_meses: data.plazo_meses,
            segundo_titular: data.segundo_titular,
            observacion: data.observacion,
            banco: data.banco,
            asesor_usuario: data.asesor
        };

        

        console.log(data_to_send)
        const res = axios({
            method: "POST",
            url: "http://127.0.0.1:5000/add-record/",
            headers: config.headers,
            data: data
        });
        return res
    },


}
export default Modelo;
