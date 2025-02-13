import ModeloTabla from "./Modelo/modelo_tabla.js";

const Tabla = {

    async filtrarTabla() {
        const { columnaBuscar, textoBuscar } = Vista.filtrarTabla()
        const res = await ModeloTabla.filtrarTabla(columnaBuscar, textoBuscar)
        Vista.mostrarTodasLasVentas(res);
        Vista.mostrarFiltrosActivos(columnaBuscar, textoBuscar);
    },

    async datosPorFecha() {
        const { fecha } = Vista.tomarFecha();
        const fechaFormateada = General.formatearFechaParaEnvio(fecha);

        const fechaVacia = fechaFormateada.length;

        if (fechaVacia === 0) {
            Vista.mostrarTodasLasVentas();
        }

        const res = await ModeloTabla.mostrarVentasPorFecha(fechaFormateada);
        Vista.mostrarTodasLasVentas(res);
        Vista.mostrarFiltrosActivos('fecha', fechaFormateada)
    },

    async datosPorIntervalo() { 

        const { fechaInicio, fechaFinal } = Vista.buscarPorIntervalo()
        const fechaFormateadaInicio = General.formatearFechaParaEnvio(fechaInicio);
        const fechaFormateadaFinal = General.formatearFechaParaEnvio(fechaFinal)
        const res = await ModeloTabla.mostrarPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal);

        Vista.mostrarTodasLasVentas(res)

        // Simplemente para mostrar las fechas seleccionadas en string
        const intervaloFecha = `${fechaFormateadaInicio} - ${fechaFormateadaFinal} `
        Vista.mostrarFiltrosActivos('fechas', intervaloFecha)
    },

    vaciarCamposFiltros(){
        document.getElementById('buscarPorFecha').value = "";
        document.getElementById('textoBuscar').value = "";
        document.getElementById('start_date').value = "";
        document.getElementById('end_date').value = "";

    }
}

export default Tabla;