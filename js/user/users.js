// import Controller from "../records/controller/records_controller.js";
import Controller from "./user_controller/user_controller.js"
import Menu from "../components/menu/menu.js";
import ModalUsers from "../components/Modal/modal_users.js";
import Modal from '../components/Modal/modal.js'
// import swalAlert from '../components/sweet_alert/sweetAlert.js'


const VistaUsers = {
    mostrarUsuarios(res){
        const datos = res.data.users
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
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

            

                fila.appendChild(celda);
            }

            // Agregar botón de editar
            const celdaAcciones = document.createElement('td');
            celdaAcciones.classList.add('no-padding');
            const botonEditar = document.createElement('button');
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fa-solid', 'fa-pen-to-square');
            iconoEditar.setAttribute('id', 'abrirModalInformacionDatos');
            
        
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
        


    },


}

export default VistaUsers;


document.addEventListener('DOMContentLoaded', function () {

    Controller.getUsers()
    Menu.opcionesMenu()

});

const botonAñadirUsuario = document.getElementById('botonAñadirUsuario');
botonAñadirUsuario.onclick = function () {
    Modal.modalCero("targetModalIngresarventa", "cerrar-modal-ingresar-venta")
    const modalCuerpo = document.getElementById('modalCuerpoAñadirVenta');
    ModalUsers.modalContent(modalCuerpo, "users_contents")
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