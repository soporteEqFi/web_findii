import swalAlert from '../../components/sweet_alert/sweetAlert.js';
import Menu from "../../components/menu/menu.js";
import Vista from "../view/records_view.js";
import userModel from "../../user/user_model.js";
import ModeloVentas from "../model/records_model.js";
import dateUtils from "../../utils/date_utils.js";


const Controller = {

    async mostrarDatos(){
        try {
            swalAlert.mensajeDeCarga("Actualizando tabla...")
            const response = await ModeloVentas.mostrarDatos();
            
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

            // console.log(producto)

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
                    agente: agente.nombre || "N/A",
                    rol: agente.rol || "N/A",

                    //banco
                    banco: solicitudInfo.banco || "N/A",
                    created_at: solicitudInfo.created_at || "N/A",
                };
            });
    
            
    
            // Enviar los datos a la vista
            Vista.mostrarTodasLosDatos(datosCombinados);

            Swal.close();
        } catch (error) {
            console.log(error)
            Swal.close();
        }
    },

    async insertarDatos() {
        const { nombre_completo, tipo_documento, numero_documento, fecha_nacimiento, 
                numero_celular, correo_electronico, nivel_estudio, profesion, estado_civil,
                personas_a_cargo, direccion_residencia, tipo_vivienda, barrio, departamento,
                estrato, ciudad_gestion, actividad_economica, empresa_labora, fecha_vinculacion,
                direccion_empresa, telefono_empresa, tipo_contrato, cargo_actual, ingresos,
                valor_inmueble, cuota_inicial, porcentaje_financiar, total_egresos, total_activos,
                total_pasivos, tipo_credito, plazo_meses, segundo_titular, observacion, banco, asesor } = Vista.enviarDatosFormulario()

        console.log({
            nombre_completo, tipo_documento, numero_documento, fecha_nacimiento,
            numero_celular, correo_electronico, nivel_estudio, profesion, estado_civil,
            personas_a_cargo, direccion_residencia, tipo_vivienda, barrio, departamento,
            estrato, ciudad_gestion, actividad_economica, empresa_labora, fecha_vinculacion,
            direccion_empresa, telefono_empresa, tipo_contrato, cargo_actual, ingresos,
            valor_inmueble, cuota_inicial, porcentaje_financiar, total_egresos, total_activos,
            total_pasivos, tipo_credito, plazo_meses, segundo_titular, observacion, banco, asesor
        });

        try {
            const cedula = localStorage.getItem('cedula')
            const datos_agente = await userModel.get_agent_info(asesor)
            
            console.log("los datos del agente son:")
            console.log(datos_agente)
            const fechaActual = dateUtils.get_actual_date()

            // console.log(fechaActual)

            const res = await ModeloVentas.insertData({
                nombre_completo, tipo_documento, numero_documento, fecha_nacimiento,
                numero_celular, correo_electronico, nivel_estudio, profesion, estado_civil,
                personas_a_cargo, direccion_residencia, tipo_vivienda, barrio, departamento,
                estrato, ciudad_gestion, actividad_economica, empresa_labora, fecha_vinculacion,
                direccion_empresa, telefono_empresa, tipo_contrato, cargo_actual, ingresos,
                valor_inmueble, cuota_inicial, porcentaje_financiar, total_egresos, total_activos,
                total_pasivos, tipo_credito, plazo_meses, segundo_titular, observacion, banco, asesor
            })

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se agregó el registro correctamente");
                // Miscelaneas.recargarPagina(1000)
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al insertar el registro")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Error al insertar los datos")
        }
    },

    async descargarVentas() {
        try {
            const res = await ModeloVentas.descargarCSV();
            
            // Convertir el ArrayBuffer a string usando TextDecoder
            const csvString = new TextDecoder("utf-8").decode(res.data);
            
            const blob = new Blob([csvString], { type: "text/csv" });
            
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
    



    iniciar() {
        Controller.mostrarDatos();
        // Controlador.estadisticasSemanaMesDiaActual();
        //Controlador.topMensual();
        //Controlador.topSemanal();
        Menu.opcionesMenu();
    }

}

export default Controller;