import ModeloTabla from "./Modelo/modelo_tabla.js";
import swalAlert from '../../components/sweet_alert/sweetAlert.js';
import Vista from "../../records/view/records_view.js";
import Miscelaneas from "../../utils/miscelaneas.js";

const Tabla = {

    async filtrarTabla() {

        try {
            swalAlert.mensajeDeCarga("Filtrando tabla...")
            const { columnaBuscar, textoBuscar } = Vista.filtrarTabla()
            const response = await ModeloTabla.filtrarTabla(columnaBuscar, textoBuscar)
            // console.log(response.data["error"])

            if (response.status == 204) {
                swalAlert.mostrarMensajeError("No se encontraron resultados. Verifica los datos ingresados")
                return;
            }

            // if (response.status !== 200) {
            //     swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas");
            //     return;
            // }
            
            // Extraer registros asegurando que sean arrays
            const registros = response.data.registros || {};
            const solicitantes = registros.SOLICITANTES ?? [];
            const activity = registros.ACTIVIDAD_ECONOMICA ?? [];
            const financial = registros.INFORMACION_FINANCIERA ?? [];
            const location = registros.UBICACION ?? [];
            const product = registros.PRODUCTO_SOLICITADO ?? [];
            const solicitud = registros.SOLICITUDES ?? [];

        // Combinar datos por cada solicitante
            const datosCombinados = solicitantes.map(solicitante => {
            const actividad = activity.find(a => a.solicitante_id === solicitante.solicitante_id) || {};
            const finanzas = financial.find(f => f.solicitante_id === solicitante.solicitante_id) || {};
            const ubicacion = location.find(l => l.solicitante_id === solicitante.solicitante_id) || {};
            const producto = product.find(p => p.solicitante_id === solicitante.solicitante_id) || {};
            const solicitudInfo = solicitud.find(s => s.solicitante_id === solicitante.solicitante_id) || {};

                return {
                    //info solicitante
                    id_solicitante: solicitante.solicitante_id || "N/A",
                    nombre: solicitante.nombre_completo || "N/A",
                    tipo_documento: solicitante.tipo_documento || "N/A",
                    fecha_nacimiento: solicitante.fecha_nacimiento || "N/A",
                    numero_documento: solicitante.numero_documento || "N/A",
                    correo: solicitante.correo_electronico || "N/A",
                    profesion: solicitante.profesion ||"N/A",
                    personas_a_cargo: solicitante.personas_a_cargo || "N/A",
                    numero_celular: solicitante.numero_celular || "N/A",
                    nivel_estudio: solicitante.nivel_estudio || "N/A",

                    //Actividad economica
                    actividad_economica: actividad.actividad_economica || "N/A",
                    cargo_actual: actividad.cargo_actual || "N/A",
                    empresa_labora: actividad.empresa_labora || "N/A",
                    direccion_empresa: actividad.direccion_empresa || "N/A",
                    telefono_empresa: actividad.telefono_empresa || "N/A",
                    tipo_de_contrato: actividad.tipo_contrato || "N/A",
                    fecha_vinculacion: actividad.fecha_vinculacion || "N/A",

                    //Finanzas
                    ingresos: finanzas.ingresos || "N/A",
                    egresos: finanzas.egresos || "N/A",
                    cuota_inicial: finanzas.cuota_inicial || "N/A",
                    porcentaje_financiar: finanzas.porcentaje_financiar || "N/A",
                    total_activos: finanzas.total_activos || "N/A",
                    total_pasivos: finanzas.total_pasivos || "N/A",
                    valor_inmueble: finanzas.valor_inmueble || "N/A",

                    //location
                    ciudad_gestion: ubicacion.ciudad_gestion || "N/A",
                    departamento: ubicacion.departamento || "N/A",
                    direccion: ubicacion.direccion_residencia || "N/A",
                    barrio: ubicacion.barrio || "N/A",
                    estrato: ubicacion.estrato || "N/A",

                    //product
                    producto_solicitado: producto.tipo_credito || "N/A",
                    observacion: producto.observacion || "N/A",
                    plazo_meses: producto.plazo_meses || "N/A",
                    observacion: producto.observacion || "N/A",
                    segundo_titular: producto.segundo_titular || "N/A",
                    estado: producto.estado || "N/A",

                    //agente
                 

                    //banco
                    banco: solicitudInfo.banco || "N/A",
                    created_at: solicitudInfo.created_at || "N/A",
                };
                
            });
         
            // console.log(datosCombinados)
            // Enviar los datos a la vista
            Vista.mostrarTodasLosDatos(datosCombinados);
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
            swalAlert.mensajeDeCarga("Filtrando tabla...")
            const { fecha } = Vista.tomarFecha();
            const fechaFormateada = Miscelaneas.formatearFechaParaEnvio(fecha);

            const fechaVacia = fechaFormateada.length;

            if (fechaVacia === 0) {
                Vista.mostrarTodasLosDatos();
            }

            const response = await ModeloTabla.mostrarVentasPorFecha(fechaFormateada);
            console.log(response)
            
            if (response.status == 204) {
                swalAlert.mostrarMensajeError("No se encontraron resultados. Verifica los datos ingresados")
                return;
            }

            // Extraer registros asegurando que sean arrays
            const registros = response.data.registros || {};
            const solicitantes = registros.solicitantes ?? [];
            const agents = registros.agents_info ?? [];
            const activity = registros.economic_activity ?? [];
            const financial = registros.financial_info ?? [];
            const location = registros.location ?? [];
            const product = registros.product ?? [];
            const solicitud = registros.solicitud ?? [];

        // Combinar datos por cada solicitante
            const datosCombinados = solicitantes.map(solicitante => {
            const actividad = activity.find(a => a.solicitante_id === solicitante.solicitante_id) || {};
            const finanzas = financial.find(f => f.solicitante_id === solicitante.solicitante_id) || {};
            const ubicacion = location.find(l => l.solicitante_id === solicitante.solicitante_id) || {};
            const producto = product.find(p => p.solicitante_id === solicitante.solicitante_id) || {};
            const solicitudInfo = solicitud.find(s => s.solicitante_id === solicitante.solicitante_id) || {};

                return {
                    //info solicitante
                    id_solicitante: solicitante.solicitante_id || "N/A",
                    nombre: solicitante.nombre_completo || "N/A",
                    tipo_documento: solicitante.tipo_documento || "N/A",
                    fecha_nacimiento: solicitante.fecha_nacimiento || "N/A",
                    numero_documento: solicitante.numero_documento || "N/A",
                    correo: solicitante.correo_electronico || "N/A",
                    profesion: solicitante.profesion ||"N/A",
                    personas_a_cargo: solicitante.personas_a_cargo || "N/A",
                    numero_celular: solicitante.numero_celular || "N/A",
                    nivel_estudio: solicitante.nivel_estudio || "N/A",

                    //Actividad economica
                    actividad_economica: actividad.actividad_economica || "N/A",
                    cargo_actual: actividad.cargo_actual || "N/A",
                    empresa_labora: actividad.empresa_labora || "N/A",
                    direccion_empresa: actividad.direccion_empresa || "N/A",
                    telefono_empresa: actividad.telefono_empresa || "N/A",
                    tipo_de_contrato: actividad.tipo_contrato || "N/A",
                    fecha_vinculacion: actividad.fecha_vinculacion || "N/A",

                    //Finanzas
                    ingresos: finanzas.ingresos || "N/A",
                    egresos: finanzas.egresos || "N/A",
                    cuota_inicial: finanzas.cuota_inicial || "N/A",
                    porcentaje_financiar: finanzas.porcentaje_financiar || "N/A",
                    total_activos: finanzas.total_activos || "N/A",
                    total_pasivos: finanzas.total_pasivos || "N/A",
                    valor_inmueble: finanzas.valor_inmueble || "N/A",

                    //location
                    ciudad_gestion: ubicacion.ciudad_gestion || "N/A",
                    departamento: ubicacion.departamento || "N/A",
                    direccion: ubicacion.direccion_residencia || "N/A",
                    barrio: ubicacion.barrio || "N/A",
                    estrato: ubicacion.estrato || "N/A",

                    //product
                    producto_solicitado: producto.tipo_credito || "N/A",
                    observacion: producto.observacion || "N/A",
                    plazo_meses: producto.plazo_meses || "N/A",
                    observacion: producto.observacion || "N/A",
                    segundo_titular: producto.segundo_titular || "N/A",
                    estado: producto.estado || "N/A",

                    //agente
                

                    //banco
                    banco: solicitudInfo.banco || "N/A",
                    created_at: solicitudInfo.created_at || "N/A",
                };
                
            });
         
            console.log(datosCombinados)
            // Enviar los datos a la vista
            Vista.mostrarTodasLosDatos(datosCombinados);
            Vista.mostrarFiltrosActivos('fecha', fechaFormateada);
            Swal.close();

        } catch (error) {
            console.log(error)
            Swal.close(); // Este cierra el Swal de carga para abrir el de error
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

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
        document.getElementById('columnaBuscar').value = "sin filtros";

    }
}

export default Tabla;