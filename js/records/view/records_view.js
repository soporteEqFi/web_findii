import Controller from "../controller/records_controller.js";
import Modal from '../../components/Modal/modal.js'
import swalAlert from '../../components/sweet_alert/sweetAlert.js';
import Tabla from "../../components/Tabla/tabla.js";
import Modales from '../../components/Modal/modal_views.js';
import ModeloVentas from '../model/records_model.js'

const Vista  = {

    mostrarTodasLosDatos(datosCombinados){
        const datos = datosCombinados
       
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        // const columnasAMostrar = ['nombre','numero_documento','profesion','nivel_estudio','correo','numero_celular','personas_a_cargo','direccion','ciudad_gestion','departamento','barrio','actividad_economica','empresa_labora', 'direccion_empresa','telefono_empresa', 'tipo_de_contrato','cargo_actual', 'ingresos', 'egresos','cuota_inicial', 'producto_solicitado','plazo_meses','observacion','segundo_titular', 'banco', 'created_at'];
        const columnasAMostrar = ['nombre','numero_documento', 'correo','numero_celular', 'ciudad_gestion', 'producto_solicitado', 'banco', "estado"];

        // Crear encabezado
        const encabezadoRow = document.createElement('tr');
        for (const columna of columnasAMostrar) {

            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }
        tablaDatos.appendChild(encabezadoRow);
           
        // Crear filas de datos
        datos.forEach(dato => {
            // console.log(dato)
            const fila = document.createElement('tr');
            for (const columna of columnasAMostrar) {
                const celda = document.createElement('td');
                celda.textContent = dato[columna];

                // Aplicar clases de estado según el valor
                if (columna === 'estado') {
                    const estado = dato[columna];
                    const rol = localStorage.getItem('rol');

                    if (rol.toLowerCase() === 'asesor') {
                        // Para asesores, solo mostrar el estado como texto
                        celda.textContent = estado;
                    } else {
                        // Para otros roles, mantener el select
                        const estadoSelect = document.createElement('select');
                        estadoSelect.setAttribute('id', 'actualizarEstado');
                        
                        const estadosPosibles = [
                            estado, 'Pendiente', 'Desembolsado', 'Radicado', 'Aprobado', 'Estudio de credito', 'Negado'
                        ];

                        estadosPosibles.forEach(estadoOpt => {
                            const option = document.createElement('option');
                            option.value = estadoOpt;
                            option.textContent = estadoOpt;
                            estadoSelect.appendChild(option);
                        });

                        estadoSelect.value = estado;

                        // Aplicar clases de color según el estado
                        if (estado === 'Aprobado') {
                            estadoSelect.classList.add('estado-verde');
                        } else if (estado === 'Estudio de credito' || estado === 'Desembolsado') {
                            estadoSelect.classList.add('estado-azul');
                        } else if (estado === 'Pendiente' || estado === 'Radicado') {
                            estadoSelect.classList.add('estado-amarillo');
                        } else if (estado === 'Negado') {
                            estadoSelect.classList.add('estado-rojo');
                        }

                        estadoSelect.addEventListener('change', async (event) => {
                            try {
                                const nuevoEstado = event.target.value;
                                // swalAlert.mensajeDeCarga("Actualizando estado...");
                                const cedulaUsuario = dato.numero_documento
                                const idSolicitante = dato.id_solicitante
                                const res = await ModeloVentas.editarEstadoDesdeTabla(idSolicitante, nuevoEstado, cedulaUsuario);
                                if (res.status == 200) {

                                    Controller.mostrarDatos();

                                    Swal.close();
                                }
                            } catch (error) {
                                Swal.close();
                                console.error(error);
                                swalAlert.mostrarMensajeError('Error al actualizar el estado');
                            }
                        });

                        celda.textContent = '';
                        celda.appendChild(estadoSelect);
                    }
                }

                fila.appendChild(celda);
            }

            // Agregar botón de editar
            const celdaAcciones = document.createElement('td');
            celdaAcciones.classList.add('no-padding');
            const botonEditar = document.createElement('button');
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fa-solid', 'fa-pen-to-square');
            iconoEditar.setAttribute('id', 'abrirModalInformacionDatos');
            
            botonEditar.addEventListener('click', () => {
                Modal.modalCero("targetModalInformacionDatos", "cerrar-modal-informacion-datos");
                const modalCuerpo = document.getElementById('modalCuerpo');
                Modales.editSellModal(modalCuerpo, dato);
            });

            botonEditar.appendChild(iconoEditar);
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);

            tablaDatos.appendChild(fila);
        });
        
    },

    eliminarVenta() {
        const id = document.getElementById('idVenta').textContent;
        return id
    },

    editarVenta() {
        const nombre_completo = document.getElementById('nombre_completo').value;
        const tipo_documento = document.getElementById('tipo_documento').value;
        const numero_documento = document.getElementById('numero_documento').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const numero_celular = document.getElementById('numero_celular').value;
        const correo_electronico = document.getElementById('correo_electronico').value;
        const nivel_estudio = document.getElementById('nivel_estudio').value;
        const profesion = document.getElementById('profesion').value;
        const estado_civil = document.getElementById('estado_civil').value;
        const personas_a_cargo = document.getElementById('personas_a_cargo').value;
        const direccion_residencia = document.getElementById('direccion_residencia').value;
        const tipo_vivienda = document.getElementById('tipo_vivienda').value;
        const barrio = document.getElementById('barrio').value;
        const departamento = document.getElementById('departamento').value;
        const estrato = document.getElementById('estrato').value;
        const ciudad_gestion = document.getElementById('ciudad_gestion').value;
        const actividad_economica = document.getElementById('actividad_economica').value;
        const empresa_labora = document.getElementById('empresa_labora').value;
        const fecha_vinculacion = document.getElementById('fecha_vinculacion').value;
        const direccion_empresa = document.getElementById('direccion_empresa').value;
        const telefono_empresa = document.getElementById('telefono_empresa').value;
        const tipo_contrato = document.getElementById('tipo_contrato').value;
        const cargo_actual = document.getElementById('cargo_actual').value;
        const ingresos = document.getElementById('ingresos').value;
        const valor_inmueble = document.getElementById('valor_inmueble').value;
        const cuota_inicial = document.getElementById('cuota_inicial').value;
        const porcentaje_financiar = document.getElementById('porcentaje_financiar').value;
        const total_egresos = document.getElementById('total_egresos').value;
        const total_activos = document.getElementById('total_activos').value;
        const total_pasivos = document.getElementById('total_pasivos').value;
        const tipo_credito = document.getElementById('tipo_credito').value;
        const plazo_meses = document.getElementById('plazo_meses').value;
        const segundo_titular = document.getElementById('segundo_titular').value;
        const observacion = document.getElementById('observacion').value;
        const estado = document.getElementById('estado').value;

        return {
            nombre_completo,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            numero_celular,
            correo_electronico,
            nivel_estudio,
            profesion,
            estado_civil,
            personas_a_cargo,
            direccion_residencia,
            tipo_vivienda,
            barrio,
            departamento,
            estrato,
            ciudad_gestion,
            actividad_economica,
            empresa_labora,
            fecha_vinculacion,
            direccion_empresa,
            telefono_empresa,
            tipo_contrato,
            cargo_actual,
            ingresos,
            valor_inmueble,
            cuota_inicial,
            porcentaje_financiar,
            total_egresos,
            total_activos,
            total_pasivos,
            tipo_credito,
            plazo_meses,
            segundo_titular,
            observacion,
            estado
        }
    },

    enviarDatosFormulario() {
        const nombre_completo = document.getElementById('nombre_completo').value;
        const tipo_documento = document.getElementById('tipo_documento').value; 
        const numero_documento = document.getElementById('numero_documento').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const numero_celular = document.getElementById('numero_celular').value;
        const correo_electronico = document.getElementById('correo_electronico').value;
        const nivel_estudio = document.getElementById('nivel_estudio').value;
        const profesion = document.getElementById('profesion').value;
        const estado_civil = document.getElementById('estado_civil').value;
        const personas_a_cargo = document.getElementById('personas_a_cargo').value;
        const direccion_residencia = document.getElementById('direccion_residencia').value;
        const tipo_vivienda = document.getElementById('tipo_vivienda').value;
        const barrio = document.getElementById('barrio').value;
        const departamento = document.getElementById('departamento').value;
        const estrato = document.getElementById('estrato').value;
        const ciudad_gestion = document.getElementById('ciudad_gestion').value;
        const actividad_economica = document.getElementById('actividad_economica').value;
        const empresa_labora = document.getElementById('empresa_labora').value;
        const fecha_vinculacion = document.getElementById('fecha_vinculacion').value;
        const direccion_empresa = document.getElementById('direccion_empresa').value;
        const telefono_empresa = document.getElementById('telefono_empresa').value;
        const tipo_contrato = document.getElementById('tipo_contrato').value;
        const cargo_actual = document.getElementById('cargo_actual').value;
        const ingresos = document.getElementById('ingresos').value;
        const valor_inmueble = document.getElementById('valor_inmueble').value;
        const cuota_inicial = document.getElementById('cuota_inicial').value;
        const porcentaje_financiar = document.getElementById('porcentaje_financiar').value;
        const total_egresos = document.getElementById('total_egresos').value;
        const total_activos = document.getElementById('total_activos').value;
        const total_pasivos = document.getElementById('total_pasivos').value;
        const tipo_credito = document.getElementById('tipo_credito').value;
        const plazo_meses = document.getElementById('plazo_meses').value;
        const segundo_titular = document.getElementById('segundo_titular').value;
        const observacion = document.getElementById('observacion').value;
        const banco = document.getElementById('banco').value;
        // const asesor = document.getElementById('asesor').value;

        // const camposVacios = [];
        // // const camposRequeridos = [
        // //     'nombre_completo', 'numero_documento', 'numero_celular', 
        // //     'direccion_residencia', 'ciudad_gestion', 'tipo_credito'
        // // ];

        // // camposRequeridos.forEach(campo => {
        // //     const input = document.getElementById(campo);
        // //     const valor = input.value.trim();
        // //     if (valor === "") {
        // //         input.style.borderColor = "red";
        // //         input.addEventListener('input', Vista.quitarBordeRojo);
        // //         camposVacios.push(campo);
        // //     } else {
        // //         input.style.borderColor = "";
        // //     }
        // // });

        // if (camposVacios.length > 0) {
        //     swalAlert.mostrarMensajeError(
        //         `Campos vacíos, verifica que el/los campo(s): ${camposVacios.join(', ')} estén llenos.`
        //     );
        //     return;
        // }

        return {
            nombre_completo,
            tipo_documento,
            numero_documento, 
            fecha_nacimiento,
            numero_celular,
            correo_electronico,
            nivel_estudio,
            profesion,
            estado_civil,
            personas_a_cargo,
            direccion_residencia,
            tipo_vivienda,
            barrio,
            departamento, 
            estrato,
            ciudad_gestion,
            actividad_economica,
            empresa_labora,
            fecha_vinculacion,
            direccion_empresa,
            telefono_empresa,
            tipo_contrato,
            cargo_actual,
            ingresos,
            valor_inmueble,
            cuota_inicial,
            porcentaje_financiar,
            total_egresos,
            total_activos,
            total_pasivos,
            tipo_credito,
            plazo_meses,
            segundo_titular,
            observacion,
            banco,
            // asesor
        };
    },

    tomarFecha() {
        const fecha = document.getElementById('buscarPorFecha').value;
        return { fecha }
    },

    buscarPorIntervalo() {
        const fechaInicio = document.getElementById('start_date').value;
        const fechaFinal = document.getElementById('end_date').value;

        return { fechaInicio, fechaFinal }
    },

    filtrarTabla() {
        const columnaBuscarComboBox = document.getElementById('columnaBuscar');
        const textoBuscar = document.getElementById('textoBuscar').value;

        columnaBuscarComboBox.addEventListener('change', () => {
            const estado = columnaBuscarComboBox.value;

            if (estado === "sin filtros") {
                // Miscelaneas.recargarPagina(500)
                let textoBuscar = document.getElementById('textoBuscar');
                textoBuscar.value = ""
            }

        })

        const columnaBuscar = columnaBuscarComboBox.value;

        return { columnaBuscar, textoBuscar }

    },

    mostrarFiltrosActivos(filtroActivo, filtroValor) {
        const contenedorFiltrosActivos = document.getElementById('contenedorFiltrosActivos');
        const filtro = document.createElement('div')

        contenedorFiltrosActivos.innerHTML = '';

        filtro.innerHTML =
            `
        <button id="descargarVentasIntervalo" class="btn-black">Exportar <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i></button>

        <div class="filtro">
            <p>${filtroActivo}: ${filtroValor} <i id = "quitarFiltro" class="fa-solid fa-xmark quitar-filtro"></i></p>
        </div>

        `;

        contenedorFiltrosActivos.append(filtro);

        // Boton que permite filtrar los registros para un intervalo de fechas
        const descargarVentasIntervalo = document.getElementById('descargarVentasIntervalo');
        descargarVentasIntervalo.onclick = function () {
            Controlador.descargarDatosPorIntervalo();
        }

        const quitarFiltro = document.getElementById('quitarFiltro');
        quitarFiltro.onclick = function () {
            Tabla.vaciarCamposFiltros();
            filtro.innerHTML = '';
            Controller.mostrarDatos();
        }
    },

    botonesCabecera(){
        const cabecera = document.getElementById('botonesCabecera')

        if (localStorage.getItem("rol").toLowerCase() == "admin") {
            cabecera.innerHTML = 
            `
                <div class="">
                    <button id="descargarVentas" class="btn-black">Exportar <i
                        class="fa-solid fa-file-arrow-down"></i></button>
                </div>
    
                <div class="">
                <button class="btn-success" id="botonAñadirVenta"><i class="fa-solid fa-plus"></i> Radicar solicitud</button>
                </div>
            `
            
        }else{
            cabecera.innerHTML = 
            `
                <div class="">
                <button class="btn-success" id="botonAñadirVenta"><i class="fa-solid fa-plus"></i> Radicar solicitud</button>
                </div>
            `
        }
        const botonAñadirVenta = document.getElementById('botonAñadirVenta');
        botonAñadirVenta.onclick = function () {
            Modal.modalCero("targetModalIngresarventa", "cerrar-modal-ingresar-venta")
            const modalCuerpo = document.getElementById('modalCuerpoAñadirVenta');
            Modales.modalContent(modalCuerpo, "sells_content")

            // //AGREGAR NUEVOS CAMPOS
            // const form = document.getElementById('companiaSeccion');
            // const combobox = document.getElementById('compania');
            // const tipomante = Vista.createTipoMantenimientoOptions

            // combobox.addEventListener('change', () => {
            //     const seleccion = combobox.value;

            //     // Remove existing labels and inputs
            //     const existingLabel = document.getElementById('label');
            //     const existingInput = document.getElementById('mantenimiento');
            //     const existingTipoLabel = document.getElementById('tipoLabel');
            //     const existingTipoInput = document.getElementById('tipoMantenimiento');

            //     if (existingLabel) existingLabel.remove();
            //     if (existingInput) existingInput.remove();

            //     if (seleccion === "no seleccionado") {
            //         alert("Tienes que seleccionar una compañia")
            //     }

            //     if (seleccion === 'Naturgy' || seleccion === 'Iberdrola (fuera de península)' || seleccion === 'Iberdrola (Cataluña, Aragón, Baleares, Canarias)') {
            //         const mantenimientolabel = document.createElement('label');
            //         mantenimientolabel.textContent = 'Mantenimiento:';
            //         mantenimientolabel.setAttribute('id', 'label');

            //         const mantenimientoInput = document.createElement('select');
            //         mantenimientoInput.setAttribute('name', 'mantenimiento');
            //         mantenimientoInput.setAttribute('id', 'mantenimiento');
            //         mantenimientoInput.innerHTML = `
            //         <option value="Sin mantenimiento" selected>Sin mantenimiento</option>
            //         <option value="Luz y gas">Luz y gas</option>
            //         <option value="Luz">Luz</option>
            //         <option value="Gas">Gas</option>
            //     `;

            //         form.appendChild(mantenimientolabel);
            //         form.appendChild(mantenimientoInput);
            //         mantenimientoInput.addEventListener('change', tipomante);
            //         if (existingTipoLabel) existingTipoLabel.remove();
            //         if (existingTipoInput) existingTipoInput.remove();
            //     } else {

            //         if (existingTipoLabel) existingTipoLabel.remove();
            //         if (existingTipoInput) existingTipoInput.remove();
            //     }

            //     if (seleccion === "Iberdrola (fuera de península)" || seleccion === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)") {
            //         const numeroContrato = document.getElementById('numeroContrato')
            //         numeroContrato.required = 'true';
            //     }
            //     return {
            //         seleccion
            //     }

            // });
        };
        
        // Boton que permite descargar las ventas de la BD
        const descargarVentas = document.getElementById('descargarVentas');
        descargarVentas.onclick = async function () {
            Controller.descargarVentas()
        };
        return cabecera
    }


}

export default Vista;

document.addEventListener('DOMContentLoaded', function () {
    Controller.iniciar()
    Vista.mostrarTodasLosDatos()
    Controller.actualizarTablaEnSegundoPlano()


});

// Botón dentro del modal al seleccionar un registro que edita la info de una venta
const botonEditar = document.getElementById('botonEditar');
botonEditar.onclick = function () {
    swalAlert.confirmarAccion({
        texto: '¿Estás seguro de actualizar la venta?',
        funcionAlAceptar: Controller.editarventa,
        mensajeAlCancelar: "No se ha editado nada"
    })
}

// Botón dentro del modal al seleccionar un registro que elimina la info de una venta
const botonEliminar = document.getElementById('botonEliminar');
botonEliminar.onclick = function () {
    swalAlert.confirmarAccion({
        texto: 'Se eliminará el registro de forma permanente',
        funcionAlAceptar: Controlador.eliminarVenta,
        mensajeAlCancelar: 'No se ha eliminado nada'
    })
}

// const botonAñadirVenta = document.getElementById('botonAñadirVenta');
// botonAñadirVenta.onclick = function () {
//     Modal.modalCero("targetModalIngresarventa", "cerrar-modal-ingresar-venta")
//     const modalCuerpo = document.getElementById('modalCuerpoAñadirVenta');
//     Modales.modalContent(modalCuerpo, "sells_content")

//     // //AGREGAR NUEVOS CAMPOS
//     // const form = document.getElementById('companiaSeccion');
//     // const combobox = document.getElementById('compania');
//     // const tipomante = Vista.createTipoMantenimientoOptions

//     // combobox.addEventListener('change', () => {
//     //     const seleccion = combobox.value;

//     //     // Remove existing labels and inputs
//     //     const existingLabel = document.getElementById('label');
//     //     const existingInput = document.getElementById('mantenimiento');
//     //     const existingTipoLabel = document.getElementById('tipoLabel');
//     //     const existingTipoInput = document.getElementById('tipoMantenimiento');

//     //     if (existingLabel) existingLabel.remove();
//     //     if (existingInput) existingInput.remove();

//     //     if (seleccion === "no seleccionado") {
//     //         alert("Tienes que seleccionar una compañia")
//     //     }

//     //     if (seleccion === 'Naturgy' || seleccion === 'Iberdrola (fuera de península)' || seleccion === 'Iberdrola (Cataluña, Aragón, Baleares, Canarias)') {
//     //         const mantenimientolabel = document.createElement('label');
//     //         mantenimientolabel.textContent = 'Mantenimiento:';
//     //         mantenimientolabel.setAttribute('id', 'label');

//     //         const mantenimientoInput = document.createElement('select');
//     //         mantenimientoInput.setAttribute('name', 'mantenimiento');
//     //         mantenimientoInput.setAttribute('id', 'mantenimiento');
//     //         mantenimientoInput.innerHTML = `
//     //         <option value="Sin mantenimiento" selected>Sin mantenimiento</option>
//     //         <option value="Luz y gas">Luz y gas</option>
//     //         <option value="Luz">Luz</option>
//     //         <option value="Gas">Gas</option>
//     //     `;

//     //         form.appendChild(mantenimientolabel);
//     //         form.appendChild(mantenimientoInput);
//     //         mantenimientoInput.addEventListener('change', tipomante);
//     //         if (existingTipoLabel) existingTipoLabel.remove();
//     //         if (existingTipoInput) existingTipoInput.remove();
//     //     } else {

//     //         if (existingTipoLabel) existingTipoLabel.remove();
//     //         if (existingTipoInput) existingTipoInput.remove();
//     //     }

//     //     if (seleccion === "Iberdrola (fuera de península)" || seleccion === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)") {
//     //         const numeroContrato = document.getElementById('numeroContrato')
//     //         numeroContrato.required = 'true';
//     //     }
//     //     return {
//     //         seleccion
//     //     }

//     // });
// };


const botonModalAgregarVenta = document.getElementById('botonModalAgregarVenta');
botonModalAgregarVenta.onclick = function () {
    const nombre_completo = document.getElementById('nombre_completo').value;
    const tipo_documento = document.getElementById('tipo_documento').value;
    const numero_documento = document.getElementById('numero_documento').value;
    const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
    const numero_celular = document.getElementById('numero_celular').value;
    const correo_electronico = document.getElementById('correo_electronico').value;
    const nivel_estudio = document.getElementById('nivel_estudio').value;
    const profesion = document.getElementById('profesion').value;
    const estado_civil = document.getElementById('estado_civil').value;
    const personas_a_cargo = document.getElementById('personas_a_cargo').value;
    const direccion_residencia = document.getElementById('direccion_residencia').value;
    const tipo_vivienda = document.getElementById('tipo_vivienda').value;
    const barrio = document.getElementById('barrio').value;
    const departamento = document.getElementById('departamento').value;
    const estrato = document.getElementById('estrato').value;
    const ciudad_gestion = document.getElementById('ciudad_gestion').value;
    const actividad_economica = document.getElementById('actividad_economica').value;
    const empresa_labora = document.getElementById('empresa_labora').value;
    const fecha_vinculacion = document.getElementById('fecha_vinculacion').value;
    const direccion_empresa = document.getElementById('direccion_empresa').value;
    const telefono_empresa = document.getElementById('telefono_empresa').value;
    const tipo_contrato = document.getElementById('tipo_contrato').value;
    const cargo_actual = document.getElementById('cargo_actual').value;
    const ingresos = document.getElementById('ingresos').value;
    const valor_inmueble = document.getElementById('valor_inmueble').value;
    const cuota_inicial = document.getElementById('cuota_inicial').value;
    const porcentaje_financiar = document.getElementById('porcentaje_financiar').value;
    const total_egresos = document.getElementById('total_egresos').value;
    const total_activos = document.getElementById('total_activos').value;
    const total_pasivos = document.getElementById('total_pasivos').value;
    const tipo_credito = document.getElementById('tipo_credito').value;
    const plazo_meses = document.getElementById('plazo_meses').value;
    const segundo_titular = document.getElementById('segundo_titular').value;
    const observacion = document.getElementById('observacion').value;

    const htmlContent = `
    <div style="max-height: 400px; overflow-y: auto;">
        <h3>Información del Cliente:</h3>
        <p>Nombre Completo: ${nombre_completo}</p>
        <p>Tipo de Documento: ${tipo_documento}</p>
        <p>Número de Documento: ${numero_documento}</p>
        <p>Fecha de Nacimiento: ${fecha_nacimiento}</p>
        <p>Número Celular: ${numero_celular}</p>
        <p>Correo Electrónico: ${correo_electronico}</p>
        <p>Nivel de Estudio: ${nivel_estudio}</p>
        <p>Profesión: ${profesion}</p>
        <p>Estado Civil: ${estado_civil}</p>
        <p>Personas a Cargo: ${personas_a_cargo}</p>
        <p>Dirección de Residencia: ${direccion_residencia}</p>
        <p>Tipo de Vivienda: ${tipo_vivienda}</p>
        <p>Barrio: ${barrio}</p>
        <p>Departamento: ${departamento}</p>
        <p>Estrato: ${estrato}</p>
        <p>Ciudad de Gestión: ${ciudad_gestion}</p>
        <p>Actividad Económica: ${actividad_economica}</p>
        <p>Empresa donde Labora: ${empresa_labora}</p>
        <p>Fecha de Vinculación: ${fecha_vinculacion}</p>
        <p>Dirección Empresa: ${direccion_empresa}</p>
        <p>Teléfono Empresa: ${telefono_empresa}</p>
        <p>Tipo de Contrato: ${tipo_contrato}</p>
        <p>Cargo Actual: ${cargo_actual}</p>
        <p>Ingresos Mensuales: ${ingresos}</p>
        <p>Valor del Inmueble: ${valor_inmueble}</p>
        <p>Cuota Inicial: ${cuota_inicial}</p>
        <p>Porcentaje a Financiar: ${porcentaje_financiar}</p>
        <p>Total Egresos: ${total_egresos}</p>
        <p>Total Activos: ${total_activos}</p>
        <p>Total Pasivos: ${total_pasivos}</p>
        <p>Tipo de Crédito: ${tipo_credito}</p>
        <p>Plazo en Meses: ${plazo_meses}</p>
        <p>Segundo Titular: ${segundo_titular}</p>
        <p>Observaciones: ${observacion}</p>
    </div>
    `;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        // html: htmlContent,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Controller.insertarDatos();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se ha ingresado nada',
                'error'
            );
        }
    });
}

// Boton que permite filtrar los registros según una columna y texto a buscar
const btnFiltrarTabla = document.getElementById('btnFiltrarTabla');
btnFiltrarTabla.onclick = function () {
    Tabla.filtrarTabla();
}

// // Boton que permite descargar las ventas de la BD
// const descargarVentas = document.getElementById('descargarVentas');
// descargarVentas.onclick = async function () {
//     Controller.descargarVentas()
// };

// Boton que permite filtrar los registros para una fecha en especifico
const btnBuscarFecha = document.getElementById('btnBuscarFecha');
btnBuscarFecha.onclick = function () {
    Tabla.datosPorFecha();
}

// Boton que permite filtrar los registros para un intervalo de fechas
const btnBuscarIntervalo = document.getElementById('btnIntervalo');
btnBuscarIntervalo.onclick = function () {
    Tabla.datosPorIntervalo();
}
