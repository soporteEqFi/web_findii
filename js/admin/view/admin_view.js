import Controlador from '../controller/admin_controller.js';
import Modal from '../../components/Modal/modal.js'
import swalAlert from '../../components/sweet_alert/sweetAlert.js';
import modalContent from '../../components/Modal/modal_views.js';

const Vista = {

    eliminarVenta() {
        const id = document.getElementById('idVenta').textContent;
        return id
    },

    editarVenta() {
        const id_venta = document.getElementById('idVenta').textContent;
        const cedula = document.getElementById('cedula').textContent;
        const compania = document.getElementById('campoCompañiaEditar').value;
        const dni = document.getElementById('campoDniEditar').value;
        const nombre = document.getElementById('campoNombreEditar').value;
        const telefono = document.getElementById('campoTelefonoEditar').value;
        const telefonoFijo = document.getElementById('campoTelefonoFijoEditar').value;
        const correo = document.getElementById('campoCorreoEditar').value;
        const direccion = document.getElementById('campoDireccionEditar').value;
        const fechaNacimiento = document.getElementById('campoFechaNacimientoEditar').value;
        const cupsLuz = document.getElementById('campoCupsLuzEditar').value;
        const cupsGas = document.getElementById('campoCupsGasEditar').value;
        const iban = document.getElementById('campoIbanEditar').value;
        const numeroContrato = document.getElementById('campoNumeroContratoEditar').value;
        const potencia = document.getElementById('campoPotenciaEditar').value;
        const peajeGas = document.getElementById('campoPeajeGasEditar').value;
        const tipoMantenimiento = document.getElementById('tipoMantenimientoEditar').value;
        const llamada_calidad = document.getElementById('llamadaCalidadComboBoxCampoEditar').value;
        const calidad_enviada = document.getElementById('calidadEnviadaComboBoxCampoEditar').value;
        const verificacion_calidad = document.getElementById('verificacionComboBoxCampoEditar').value;
        const observaciones_calidad = document.getElementById('observacionesCalidadCampoEditar').value;
        const audios_cargados = document.getElementById('audiosCargadosComboBoxCampoEditar').value;
        const estado = document.getElementById('estadoComboBoxCampoEditar').value;
        const observaciones_adicionales = document.getElementById('observacionesAdicionalesCampoEditar').value; // textarea
        const legalizacion = document.getElementById('legalizacion').value;

        return {
            id_venta,
            cedula,
            compania,
            nombre,
            dni,
            telefono,
            telefonoFijo,
            correo,
            direccion,
            fechaNacimiento,
            cupsLuz,
            cupsGas,
            iban,
            numeroContrato,
            potencia,
            peajeGas,
            tipoMantenimiento,
            llamada_calidad,
            calidad_enviada,
            verificacion_calidad,
            observaciones_calidad,
            audios_cargados,
            estado,
            observaciones_adicionales,
            legalizacion
        }

    },

    enviarDatosFormulario() {

        //const fechaFormatear = document.getElementById('fecha').value;
        const fechaNacimientoFormatear = document.getElementById('fechaNacimiento').value;
        //const fechaVentaFormatear = document.getElementById('fechaVenta').value;

        //const fecha = this.formatearFechaParaEnvio(fechaFormatear);
        //const fechaVenta = this.formatearFechaParaEnvio(fechaVentaFormatear);

        //const hora = document.getElementById('hora').value;
        const compania = document.getElementById('compania').value;
        const nombre = document.getElementById('nombre').value;
        const dni = document.getElementById('dni').value;
        const telefono = document.getElementById('telefono').value;
        const telefonoFijo = document.getElementById('telefonoFijo').value;
        const correo = document.getElementById('correo').value;
        const direccion = document.getElementById('direccion').value;
        const fechaNacimiento = Miscelaneas.formatearFechaParaEnvio(fechaNacimientoFormatear);
        const cupsLuz = document.getElementById('cupsLuz').value;
        const cupsGas = document.getElementById('cupsGas').value;
        const iban = document.getElementById('iban').value;
        const datos = document.getElementById('datos').value;
        const numeroContrato = document.getElementById('numeroContrato').value;
        const potencia = document.getElementById('potencia').value;
        const peajeGas = document.getElementById('peajeGas').value;
        const observacionesVenta = document.getElementById('observacionesVenta').value;
        const valorMantenimientoElement = document.getElementById('mantenimiento');
        const valorTipoMantenimientoElement = document.getElementById('tipoMantenimiento');

        // Verificar si los elementos select existen antes de intentar acceder a sus valores
        const valorMantenimiento = valorMantenimientoElement ? valorMantenimientoElement.value : null;
        const valorTipoMantenimiento = valorTipoMantenimientoElement ? valorTipoMantenimientoElement.value : null;

        const camposVacios = []
        if (nombre === "" || dni === "" || telefono === "" || direccion === "" || cupsLuz === "" || iban === "" || numeroContrato === "") {
            const campos = ['nombre', 'dni', 'telefono', 'direccion', 'cupsLuz', 'iban', 'numeroContrato'];

            campos.forEach(campo => {
                const input = document.getElementById(campo);
                const valor = input.value.trim();
                if (valor === "") {
                    input.style.borderColor = "red"; // Marcar el campo vacío en rojo
                    input.addEventListener('input', Vista.quitarBordeRojo); // Agregar evento para quitar el borde rojo al escribir
                    camposVacios.push(campo);
                } else {
                    input.style.borderColor = ""; // Restablecer el borde a su estado original
                }
            });
            //llenar mensajes
            swalAlert.mostrarMensajeAdvertencia(`Campos vacios, verifica que  el/los campo(s): ${camposVacios.join(', ')} esten llenos.`)

        } else if (compania === "Iberdrola (fuera de península)" || compania === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)") {
            if (numeroContrato.length == 0) {
                swalAlert.mostrarMensajeAdvertencia("Tienes que llenar el campo numero del contrato")
            } else {
                //AGREGAR POTENCIA Y EMPUJO
                return {
                    compania,
                    nombre,
                    dni,
                    telefono,
                    telefonoFijo,
                    correo,
                    direccion,
                    fechaNacimiento,
                    cupsLuz,
                    cupsGas,
                    iban,
                    datos,
                    observacionesVenta,
                    numeroContrato,
                    potencia,
                    peajeGas,
                    valorMantenimiento,
                    valorTipoMantenimiento,
                };
            }
        } else {

            return {
                compania,
                nombre,
                dni,
                telefono,
                telefonoFijo,
                correo,
                direccion,
                fechaNacimiento,
                cupsLuz,
                cupsGas,
                iban,
                datos,
                observacionesVenta,
                numeroContrato,
                potencia,
                peajeGas,
                valorMantenimiento,
                valorTipoMantenimiento,
            };
        }
    },

}

export default Vista;

document.addEventListener('DOMContentLoaded', function () {

    Controlador.iniciar()

});


const botonAñadirVenta = document.getElementById('botonAñadirVenta');
botonAñadirVenta.onclick = function () {
    Modal.modalCero("targetModalIngresarventa", "cerrar-modal-ingresar-venta")
    const modalCuerpo = document.getElementById('modalCuerpoAñadirVenta');
    modalContent(modalCuerpo, "sells_content")
    
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
            Controlador.insertarDatos();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se ha ingresado nada',
                'error'
            );
        }
    });
}

// Botón dentro del modal al seleccionar un registro que edita la info de una venta
const botonEditar = document.getElementById('botonEditar');
botonEditar.onclick = function () {
    swalAlert.confirmarAccion({
        texto: '¿Estás seguro de actualizar la venta?',
        funcionAlAceptar: Controlador.editarventa,
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

// Boton que permite descargar las ventas de la BD
const descargarVentas = document.getElementById('descargarVentas');
descargarVentas.onclick = async function () {
    Controlador.descargarVentas()
};

// Boton que permite filtrar los registros para una fecha en especifico
const btnBuscarFecha = document.getElementById('btnBuscarFecha');
btnBuscarFecha.onclick = function () {
    Controlador.datosPorFecha();
}

// Boton que permite filtrar los registros para un intervalo de fechas
const btnBuscarIntervalo = document.getElementById('btnIntervalo');
btnBuscarIntervalo.onclick = function () {
    Controlador.datosPorIntervalo();
}

// Boton que permite filtrar los registros según una columna y texto a buscar
const btnFiltrarTabla = document.getElementById('btnFiltrarTabla');
btnFiltrarTabla.onclick = function () {
    Controlador.filtrarTabla();
}