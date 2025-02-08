import Vista from "../view/admin_view.js";
import Modelo from "../model/admin_model.js";
import ModeloVentas from "../../ventas/Modelo/modelo_ventas.js";
import swalAlert from '../../components/sweet_alert/sweetAlert.js';
import ModeloTabla from "../../components/Tabla/Modelo/modelo_tabla.js";
// import Miscelaneas from "../../otros/miscelaneas.js";
import Menu from "../../components/menu/menu.js";

const Controlador = {

    async mostrarTodasLasVentas() {
        try {
            swalAlert.mostrarPantallaDeCarga("Actualizando tabla...")
            const response = await ModeloVentas.traerTodasLasVentas();
            if (response.status == 200) {
                Vista.mostrarTodasLasVentas(response);
                Swal.close();
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas")
            }
        } catch (error) {
            console.log(error)
            Swal.close();
        }
    },

    async estadisticasSemanaMesDiaActual() {
        const response_dia_actual = await ModeloVentas.ventasDiaActual();
        const response_mes_actual = await ModeloVentas.ventasMesActual();
        const ventas_mes_actual = response_mes_actual.data["ventas_mes_actual"].length
        const ventas_dia_actual = response_dia_actual.data["ventas_dia_actual"].length



/*
        if (response_dia_actual.data['venta_dia_status'] == "error") {
            var cant_ventas_dia_actual = 0
        } else {
            var cant_ventas_dia_actual = response_dia_actual.data['cant_ventas_dia_actual']
        }
*/
        Vista.datosEstadisticos(ventas_mes_actual, ventas_dia_actual);
        
    },

    async eliminarVenta() {
        try {
            const id = Vista.eliminarVenta();
            const cedulaUsuario = localStorage.getItem('cedula')
            const res = await ModeloVentas.eliminarVenta(id.trim(), cedulaUsuario);

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se eliminó el registro de la venta correctamente");
                Miscelaneas.recargarPagina(1000);
            } else {
                swalAlert.mostrarMensajeError("Error al eliminar la venta");
            }
        } catch (error) {
            console.log(error);
        }
    },

    async descargarVentas() {
        try {
            const res = await ModeloVentas.descargarCSV();
            const blob = new Blob([res.data], { type: "text/csv" });

            // Crear un enlace temporal y simular un clic para descargar el archivo
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "ventas_realizadas.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error al descargar el archivo CSV:", error);
        }
    },

    async descargarDatosPorIntervalo() {
        try {
            const { fechaInicio, fechaFinal } = Vista.buscarPorIntervalo()
            const fechaFormateadaInicio = Miscelaneas.formatearFechaParaEnvio(fechaInicio);
            const fechaFormateadaFinal = Miscelaneas.formatearFechaParaEnvio(fechaFinal)
            const res = await ModeloVentas.descargarVentasPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal);

            console.log(res)
            const blob = new Blob([res.data], { type: "text/csv" });

            // Crear un enlace temporal y simular un clic para descargar el archivo
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "ventas_realizadas.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

    },

    async topMensual() {
        const res = await ModeloVentas.ventasMesActual()
        Vista.topAgentesMes(res)
        Vista.topLideresMes(res)
    },

    async topSemanal() {
        const res = await ModeloVentas.ventaAgenteSemanaActual()
        Vista.topAgentesSemana(res)
    },

    async filtrarTabla() {
        try {
            swalAlert.mostrarPantallaDeCarga("Filtrando tabla...")
            const { columnaBuscar, textoBuscar } = Vista.filtrarTabla()
            const res = await ModeloTabla.filtrarTabla(columnaBuscar, textoBuscar)
            Vista.mostrarTodasLasVentas(res);
            Vista.mostrarFiltrosActivos(columnaBuscar, textoBuscar);
            Swal.close();

        } catch (error) {
            console.log(error)
            Swal.close(); // Este cierra el Swal de carga para abrir el de error
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

    },

    async datosPorFecha() {
        try {
            swalAlert.mostrarPantallaDeCarga("Filtrando tabla...")
            const { fecha } = Vista.tomarFecha();
            const fechaFormateada = Miscelaneas.formatearFechaParaEnvio(fecha);

            const fechaVacia = fechaFormateada.length;

            if (fechaVacia === 0) {
                Vista.mostrarTodasLasVentas();
            }

            const res = await ModeloTabla.mostrarVentasPorFecha(fechaFormateada);
            Vista.mostrarTodasLasVentas(res);
            Vista.mostrarFiltrosActivos('fecha', fechaFormateada)
            Swal.close();
        } catch (error) {
            console.log(error)
            Swal.close(); // Este cierra el Swal de carga para abrir el de error
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

    },

    async datosPorIntervalo() {
        try {
            swalAlert.mostrarPantallaDeCarga("Filtrando tabla...")
            const { fechaInicio, fechaFinal } = Vista.buscarPorIntervalo()
            const fechaFormateadaInicio = Miscelaneas.formatearFechaParaEnvio(fechaInicio);
            const fechaFormateadaFinal = Miscelaneas.formatearFechaParaEnvio(fechaFinal)
            const res = await ModeloTabla.mostrarPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal);
            Vista.mostrarTodasLasVentas(res)

            // Simplemente para mostrar las fechas seleccionadas en string
            const intervaloFecha = `${fechaFormateadaInicio} - ${fechaFormateadaFinal} `
            Vista.mostrarFiltrosActivos('fechas', intervaloFecha)
            Swal.close();

        } catch (error) {
            console.log(error)
            Swal.close();
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

    },

    async editarventa() {
        try {
            const valores = Vista.editarVenta();
            const cedulaUsuario = localStorage.getItem('cedula')
            const res = await ModeloVentas.actualizarDatosVenta(valores, cedulaUsuario);

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se actualizo el registro de la venta correctamente");
                Miscelaneas.recargarPagina(1000);
            } else {
                swalAlert.mostrarMensajeError("Error al actualizar la venta")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
        }
    },

    iniciar() {
        Controlador.mostrarTodasLasVentas();
        // Controlador.estadisticasSemanaMesDiaActual();
        //Controlador.topMensual();
        //Controlador.topSemanal();
        Menu.opcionesMenu();
    }

}

export default Controlador