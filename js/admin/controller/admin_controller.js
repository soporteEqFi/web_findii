import Vista from "../view/admin_view.js";
import swalAlert from '../../components/sweet_alert/sweetAlert.js';
import ModeloTabla from "../../components/Tabla/Modelo/modelo_tabla.js";
import Menu from "../../components/menu/menu.js";

const Controlador = {

    async insertarDatos() {
        const { nombre_completo, tipo_documento, numero_documento, fecha_nacimiento, 
                numero_celular, correo_electronico, nivel_estudio, profesion, estado_civil,
                personas_a_cargo, direccion_residencia, tipo_vivienda, barrio, departamento,
                estrato, ciudad_gestion, actividad_economica, empresa_labora, fecha_vinculacion,
                direccion_empresa, telefono_empresa, tipo_contrato, cargo_actual, ingresos,
                valor_inmueble, cuota_inicial, porcentaje_financiar, total_egresos, total_activos,
                total_pasivos, tipo_credito, plazo_meses, segundo_titular, observacion } = Vista.enviarDatosFormulario()

        console.log('Nombre completo:', nombre_completo);
        console.log('Tipo documento:', tipo_documento); 
        console.log('Número documento:', numero_documento);
        console.log('Fecha nacimiento:', fecha_nacimiento);
        console.log('Número celular:', numero_celular);
        console.log('Correo:', correo_electronico);
        console.log('Nivel estudio:', nivel_estudio);
        console.log('Profesión:', profesion);
        console.log('Estado civil:', estado_civil);
        console.log('Personas a cargo:', personas_a_cargo);
        console.log('Dirección:', direccion_residencia);
        console.log('Tipo vivienda:', tipo_vivienda);
        console.log('Barrio:', barrio);
        console.log('Departamento:', departamento);
        console.log('Estrato:', estrato);
        console.log('Ciudad gestión:', ciudad_gestion);
        console.log('Actividad económica:', actividad_economica);
        console.log('Empresa:', empresa_labora);
        console.log('Fecha vinculación:', fecha_vinculacion);
        console.log('Dirección empresa:', direccion_empresa);
        console.log('Teléfono empresa:', telefono_empresa);
        console.log('Tipo contrato:', tipo_contrato);
        console.log('Cargo:', cargo_actual);
        console.log('Ingresos:', ingresos);
        console.log('Valor inmueble:', valor_inmueble);
        console.log('Cuota inicial:', cuota_inicial);
        console.log('% a financiar:', porcentaje_financiar);
        console.log('Total egresos:', total_egresos);
        console.log('Total activos:', total_activos);
        console.log('Total pasivos:', total_pasivos);
        console.log('Tipo crédito:', tipo_credito);
        console.log('Plazo meses:', plazo_meses);
        console.log('Segundo titular:', segundo_titular);
        console.log('Observación:', observacion);

                

        try {
            // const cedula = localStorage.getItem('cedula')
            // const datos_agente = await ModeloGeneral.traerDatosPersonalesAgente(cedula)

            // const nombreAgente = datos_agente.data.apodo;
            // const liderEquipo = datos_agente.data.lider_equipo;
            // const liderResponsable = datos_agente.data.lider_responsable;

            // const res = await ModeloVentas.insertarVenta(
            //     nombre_completo, tipo_documento, numero_documento, fecha_nacimiento,
            //     numero_celular, correo_electronico, nivel_estudio, profesion, estado_civil,
            //     personas_a_cargo, direccion_residencia, tipo_vivienda, barrio, departamento,
            //     estrato, ciudad_gestion, actividad_economica, empresa_labora, fecha_vinculacion,
            //     direccion_empresa, telefono_empresa, tipo_contrato, cargo_actual, ingresos,
            //     valor_inmueble, cuota_inicial, porcentaje_financiar, total_egresos, total_activos,
            //     total_pasivos, tipo_credito, plazo_meses, segundo_titular, observacion,
            //     cedula, liderEquipo, liderResponsable, nombreAgente
            // )

            // if (res.status == 200) {
            //     swalAlert.mostrarAlertaSatisfactorio("Se agregó el registro correctamente");
            //     Miscelaneas.recargarPagina(1000)
            // } else {
            //     swalAlert.mostrarMensajeError("Hubo un error al insertar el registro")
            // }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Error al insertar los datos")
        }
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
        // Controlador.estadisticasSemanaMesDiaActual();
        //Controlador.topMensual();
        //Controlador.topSemanal();
        Menu.opcionesMenu();
    }

}

export default Controlador