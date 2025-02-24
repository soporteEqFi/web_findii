import config from "../../../supabase/keys.js"

const ModeloTabla = {
    
    async mostrarVentasPorFecha(fechaFormateada) {

        const datos_enviar = {
            fecha_venta: fechaFormateada
        }
        console.log(datos_enviar)
        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:5000/datos-por-fecha/",
            headers: config.headers,
            data: datos_enviar

        });
        return res
    },

    async mostrarPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal) {

        const datosEnviar = {
            fecha_inicial: fechaFormateadaInicio,
            fecha_final: fechaFormateadaFinal
        }

        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:5000/mostrar-por-intervalo/",
            headers: config.headers,
            data: datosEnviar
        })
        return res
    },

    async mostrarPorIntervaloTeamLeader(liderEquipo, fechaFormateadaInicio, fechaFormateadaFinal){
   
        const datosEnviar ={
          lider_equipo: liderEquipo,
          fecha_inicial: fechaFormateadaInicio,
          fecha_final: fechaFormateadaFinal
        }
    
        const res = await axios({
          method: "POST",
          url: "http://127.0.0.1:5000/mostrar-por-intervalo-leader/",
          headers: config.headers,
          data: datosEnviar
        })
        return res
      },

    async filtrarTabla(columnaBuscarValor, textoBuscar) {

        const datosEnviar = {
            columna_buscar: columnaBuscarValor,
            texto_buscar: textoBuscar
        }

        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:5000/filtrar-tabla/",
            headers: config.headers,
            data: datosEnviar
        })

        return res
    },

    async filtrarTablaTeamLeader(columnaBuscarValor, textoBuscar, liderEquipo) {

        const datosEnviar = {
            columna_buscar: columnaBuscarValor,
            texto_buscar: textoBuscar,
            lider_equipo: liderEquipo
        }

        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:5700/filtrar-tabla-leader/",
            headers: config.headers,
            data: datosEnviar
        })
        return res
    },

}

export default ModeloTabla;