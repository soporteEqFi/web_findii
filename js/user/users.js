// import Controller from "../records/controller/records_controller.js";
import Controller from "./user_controller/user_controller.js";
import Menu from "../components/menu/menu.js";
import ModalUsers from "../components/Modal/modal_users.js";
import Modal from '../components/Modal/modal.js'
import swalAlert from '../components/sweet_alert/sweetAlert.js'


const VistaUsers = {
    mostrarUsuarios(res){
        const datos = res.data.users
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        // const columnasAMostrar = ['nombre','numero_documento','profesion','nivel_estudio','correo','numero_celular','personas_a_cargo','direccion','ciudad_gestion','departamento','barrio','actividad_economica','empresa_labora', 'direccion_empresa','telefono_empresa', 'tipo_de_contrato','cargo_actual', 'ingresos', 'egresos','cuota_inicial', 'producto_solicitado','plazo_meses','observacion','segundo_titular', 'banco', 'created_at'];
        const columnasAMostrar = ['id','nombre','cedula','email', 'rol', 'empresa'];

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

                // // Aplicar clases de estado según el valor
                // if (columna === 'estado') {
                //     const estado = dato[columna];
                //     const rol = localStorage.getItem('rol');

                //     if (rol.toLowerCase() === 'asesor') {
                //         // Para asesores, solo mostrar el estado como texto
                //         celda.textContent = estado;
                //     } else {
                //         // Para otros roles, mantener el select
                //         const estadoSelect = document.createElement('select');
                //         estadoSelect.setAttribute('id', 'actualizarEstado');
                        
                //         const estadosPosibles = [
                //             estado, 'Pendiente', 'Desembolsado', 'Radicado', 'Aprobado', 'Estudio de credito', 'Negado'
                //         ];

                //         estadosPosibles.forEach(estadoOpt => {
                //             const option = document.createElement('option');
                //             option.value = estadoOpt;
                //             option.textContent = estadoOpt;
                //             estadoSelect.appendChild(option);
                //         });

                //         estadoSelect.value = estado;

                //         // Aplicar clases de color según el estado
                //         if (estado === 'Aprobado') {
                //             estadoSelect.classList.add('estado-verde');
                //         } else if (estado === 'Estudio de credito' || estado === 'Desembolsado') {
                //             estadoSelect.classList.add('estado-azul');
                //         } else if (estado === 'Pendiente' || estado === 'Radicado') {
                //             estadoSelect.classList.add('estado-amarillo');
                //         } else if (estado === 'Negado') {
                //             estadoSelect.classList.add('estado-rojo');
                //         }

                //         estadoSelect.addEventListener('change', async (event) => {
                //             try {
                //                 const nuevoEstado = event.target.value;
                //                 // swalAlert.mensajeDeCarga("Actualizando estado...");
                //                 const cedulaUsuario = dato.numero_documento
                //                 const idSolicitante = dato.id_solicitante
                //                 const res = await ModeloVentas.editarEstadoDesdeTabla(idSolicitante, nuevoEstado, cedulaUsuario);
                //                 if (res.status == 200) {

                //                     Controller.mostrarDatos();
                //                     // Controller.actualizarTablaEnSegundoPlano()

                //                     Swal.close();
                //                 }
                //             } catch (error) {
                //                 Swal.close();
                //                 console.error(error);
                //                 swalAlert.mostrarMensajeError('Error al actualizar el estado');
                //             }
                //         });

                //         celda.textContent = '';
                //         celda.appendChild(estadoSelect);
                //     }
                // }

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
    crearUsuario(){
        const nombre = document.getElementById('nombre_completo').value
        const cedula = document.getElementById('numero_documento').value
        const correo = document.getElementById('correo_electronico').value
        const contraseña = document.getElementById('contraseña').value
        const rol = document.getElementById('rol').value
        const empresa = document.getElementById('empresa').value

        return{
            nombre,
            cedula,
            correo,
            contraseña,
            rol,
            empresa
        }
        


    }


}

export default VistaUsers;


document.addEventListener('DOMContentLoaded', function () {

    Controller.getUsers()
    Menu.opcionesMenu()

});

// const editarAgente = document.getElementById("botonEditar");
// editarAgente.onclick = function () {
//     swalAlert.confirmarAccion({
//         texto: 'actualizarás los datos del usuario',
//         funcionAlAceptar: Controller.editarAgente
//     })
// };


const botonAñadirVenta = document.getElementById('botonAñadirUsuario');
botonAñadirVenta.onclick = function () {
    Modal.modalCero("targetModalIngresarventa", "cerrar-modal-ingresar-venta")
    const modalCuerpo = document.getElementById('modalCuerpoAñadirVenta');
    ModalUsers.modalContent(modalCuerpo, "sells_content")
};

const botonModalAgregarVenta = document.getElementById('botonModalAgregarUsuario');
botonModalAgregarVenta.onclick = function () {
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
            Controller.crearUser();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se ha ingresado nada',
                'error'
            );
        }
    });
}