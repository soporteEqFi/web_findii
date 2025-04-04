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
            let response = await ModeloVentas.mostrarDatos();

            // console.log(response)
            if (response.status === 500) {
                response = await ModeloVentas.mostrarDatos();
            }
            
            if (response.status !== 200) {
                swalAlert.mostrarMensajeError("Hubo un error al mostrar las ventas");
                return;
            }

            
            // Extraer registros asegurando que sean arrays
            const registros = response.data.registros || {};

            console.log(registros)
            const solicitantes = registros.solicitantes ?? [];
            const agents = registros.agents_info ?? [];
            const activity = registros.economic_activity ?? [];
            const financial = registros.financial_info ?? [];
            const location = registros.location ?? [];
            const product = registros.product ?? [];
            const solicitud = registros.solicitud ?? [];
            const documentos = registros.documentos ?? [];

        // Combinar datos por cada solicitante
            const datosCombinados = solicitantes.map(solicitante => {
            const agente = agents.find(a => a.asesor_id === solicitante.solicitante_id) || {};
            const actividad = activity.find(a => a.solicitante_id === solicitante.solicitante_id) || {};
            const finanzas = financial.find(f => f.solicitante_id === solicitante.solicitante_id) || {};
            const ubicacion = location.find(l => l.solicitante_id === solicitante.solicitante_id) || {};
            const producto = product.find(p => p.solicitante_id === solicitante.solicitante_id) || {};
            const solicitudInfo = solicitud.find(s => s.solicitante_id === solicitante.solicitante_id) || {};
            const documentosDelSolicitante = documentos.filter(d => d.id_solicitante === solicitante.solicitante_id) || [];

            console.log(solicitudInfo.banco)

            // console.log(documentosDelSolicitante)

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
                    //documentos
                    ruta_imagen: documentosDelSolicitante.map(doc => doc.imagen),
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
        const datos = Vista.enviarDatosFormulario()

        try {
            const cedula = localStorage.getItem('cedula')
            const datos_agente = await userModel.getUserInfo(cedula)
            console.log("los datos del agente son:")
            console.log(datos_agente)
            const asesor = datos_agente.data["cedula"]

            // Crear FormData para los archivos
            const formData = new FormData()

            // Agregar cada archivo al FormData
            if (datos.archivos) {
                for (let i = 0; i < datos.archivos.length; i++) {
                    formData.append('archivos', datos.archivos[i])
                }
            }

            // Agregar el resto de datos al FormData
            for (let key in datos) {
                if (key !== 'archivos') {
                    formData.append(key, datos[key])
                }
            }

            // Agregar el asesor al FormData
            formData.append('asesor_usuario', asesor)

            formData.forEach((valor, clave) => {
                console.log(clave, valor);
            });

            // Verificar los datos antes de enviar
            console.log("Datos a enviar al modelo:")
            console.log(formData)

            const res = await ModeloVentas.insertData(formData)

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se agregó el registro correctamente");
            } else {
                swalAlert.mostrarMensajeError("Hubo un error al insertar el registro")
            }

        } catch (error) {
            console.log("Error en insertarDatos:")
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
 
    async editarventa() {
        try {
            const valores = Vista.editarVenta();
            const cedulaUsuario = localStorage.getItem('cedula');

            const cedulaSolicitante = valores.numero_documento
            const datosSolicitante = await userModel.get_solicitante_info(cedulaSolicitante)

            console.log(datosSolicitante)

            const id_solicitante = datosSolicitante.data["solicitante_id"]

            console.log(id_solicitante)

            // Organizar datos en la estructura requerida
            const datosOrganizados = {
                solicitante_id: id_solicitante,
                SOLICITANTES: {
                    nombre_completo: valores.nombre_completo,
                    tipo_documento: valores.tipo_documento,
                    numero_documento: valores.numero_documento,
                    fecha_nacimiento: valores.fecha_nacimiento,
                    numero_celular: valores.numero_celular,
                    correo_electronico: valores.correo_electronico,
                    nivel_estudio: valores.nivel_estudio,
                    profesion: valores.profesion,
                    estado_civil: valores.estado_civil,
                    personas_a_cargo: valores.personas_a_cargo,
                },
                UBICACION: {
                    direccion_residencia: valores.direccion_residencia,
                    tipo_vivienda: valores.tipo_vivienda,
                    barrio: valores.barrio,
                    departamento: valores.departamento,
                    estrato: valores.estrato,
                    ciudad_gestion: valores.ciudad_gestion
                },
                ACTIVIDAD_ECONOMICA: {
                    actividad_economica: valores.actividad_economica,
                    empresa_labora: valores.empresa_labora,
                    fecha_vinculacion: valores.fecha_vinculacion,
                    direccion_empresa: valores.direccion_empresa,
                    telefono_empresa: valores.telefono_empresa,
                    tipo_contrato: valores.tipo_contrato,
                    cargo_actual: valores.cargo_actual
                },
                INFORMACION_FINANCIERA: {
                    ingresos: valores.ingresos,
                    valor_inmueble: valores.valor_inmueble,
                    cuota_inicial: valores.cuota_inicial,
                    porcentaje_financiar: valores.porcentaje_financiar,
                    total_egresos: valores.total_egresos,
                    total_activos: valores.total_activos,
                    total_pasivos: valores.total_pasivos
                },
                PRODUCTO_SOLICITADO: {
                    tipo_credito: valores.tipo_credito,
                    plazo_meses: valores.plazo_meses,
                    segundo_titular: valores.segundo_titular,
                    observacion: valores.observacion,
                    estado: valores.estado
                },
                SOLICITUDES: {
                    banco: valores.banco
                },
                DATA_ASESOR: {
                    asesor: cedulaUsuario
                }
            };

            const res = await ModeloVentas.actualizarDatosVenta(datosOrganizados);

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se actualizo el registro de la venta correctamente");
                // Miscelaneas.recargarPagina(1000);
            } else {
                swalAlert.mostrarMensajeError("Error al actualizar la venta")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
        }
    },

    async actualizarTablaEnSegundoPlano() {
        try {
            const datosCombinados = await Controller.mostrarDatos(); // Obtener datos actualizados
            mostrarTodasLosDatos(datosCombinados);
        } catch (error) {
            console.error("Error al actualizar la tabla:", error);
        } finally {
            setTimeout(actualizarTablaEnSegundoPlano, 1000); // Espera 1 segundos antes de volver a ejecutarse
        }
    },
    


    iniciar() {
        Vista.botonesCabecera()
        Controller.mostrarDatos();
        // Controlador.estadisticasSemanaMesDiaActual();
        //Controlador.topMensual();
        //Controlador.topSemanal();
        Menu.opcionesMenu();

    }

}

export default Controller;