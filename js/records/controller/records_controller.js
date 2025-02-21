import Modelo from "../model/records_model.js";
import swalAlert from '../../components/sweet_alert/sweetAlert.js';
import ModeloTabla from "../../components/Tabla/Modelo/modelo_tabla.js";
import Menu from "../../components/menu/menu.js";
import Vista from "../view/records_view.js";

const Controller = {

    async mostrarDatos(){
        try {
            swalAlert.mensajeDeCarga("Actualizando tabla...")
            const response = await Modelo.mostrarDatos();
            
            if (response.status !== 200) {
                swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas");
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
            const agente = agents.find(a => a.asesor_id === solicitante.solicitante_id) || {};
            const actividad = activity.find(a => a.solicitante_id === solicitante.solicitante_id) || {};
            const finanzas = financial.find(f => f.solicitante_id === solicitante.solicitante_id) || {};
            const ubicacion = location.find(l => l.solicitante_id === solicitante.solicitante_id) || {};
            const producto = product.find(p => p.solicitante_id === solicitante.solicitante_id) || {};
            const solicitudInfo = solicitud.find(s => s.solicitante_id === solicitante.solicitante_id) || {};

                return {
                    //info solicitante
                    id_solicitante: solicitante.solicitante_id || "N/A",
                    nombre: solicitante.nombre_completo || "N/A",
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
                    //agente

                    agente: agente.nombre || "N/A",
                    rol: agente.rol || "N/A"
                };
            });
    
            
    
            // Enviar los datos a la vista
            Vista.mostrarTodasLosDatos(datosCombinados);
            Vista.mostrarFiltrosActivos(columnaBuscar, textoBuscar);

            Swal.close();
        } catch (error) {
            console.log(error)
            Swal.close();
        }
    },

    async filtrarTabla() {
        try {
            swalAlert.mensajeDeCarga("Filtrando tabla...")
            const { columnaBuscar, textoBuscar } = Vista.filtrarTabla()
            const response = await ModeloTabla.filtrarTabla(columnaBuscar, textoBuscar)
            console.log(response)

            if (response.status !== 200) {
                swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas");
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
            const agente = agents.find(a => a.asesor_id === solicitante.solicitante_id) || {};
            const actividad = activity.find(a => a.solicitante_id === solicitante.solicitante_id) || {};
            const finanzas = financial.find(f => f.solicitante_id === solicitante.solicitante_id) || {};
            const ubicacion = location.find(l => l.solicitante_id === solicitante.solicitante_id) || {};
            const producto = product.find(p => p.solicitante_id === solicitante.solicitante_id) || {};
            const solicitudInfo = solicitud.find(s => s.solicitante_id === solicitante.solicitante_id) || {};

                return {
                    //info solicitante
                    id_solicitante: solicitante.solicitante_id || "N/A",
                    nombre: solicitante.nombre_completo || "N/A",
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
                    //agente

                    agente: agente.nombre || "N/A",
                    rol: agente.rol || "N/A"
                };
            });
    
            console.log(datosCombinados)
    
            // Enviar los datos a la vista
            Vista.mostrarTodasLosDatos(datosCombinados);
            // Vista.mostrarTodasLosDatos(res);
            // Vista.mostrarFiltrosActivos(columnaBuscar, textoBuscar);
            Swal.close();

        } catch (error) {
            console.log(error)
            Swal.close(); // Este cierra el Swal de carga para abrir el de error
            swalAlert.mostrarMensajeError("Revisa que haya un rango de fechas válido")
        }

    },

    iniciar() {
        Controller.mostrarDatos();
        // Controlador.estadisticasSemanaMesDiaActual();
        //Controlador.topMensual();
        //Controlador.topSemanal();
        Menu.opcionesMenu();
    }

}

export default Controller;