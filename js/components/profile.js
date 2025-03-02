// import Controller from "../records/controller/records_controller.js";
import Controller from "../user/user_controller/user_controller.js";
import Menu from "./menu/menu.js";
import ModalProfile from './Modal/modal_perfil.js'
import Modal from './Modal/modal.js'
import swalAlert from './sweet_alert/sweetAlert.js'

const VistaProfile = {
    mostrarDatosUsuario(res) {
        const datos = res.data;
        const imagenAliado = datos["imagen_aliado"];
        const cedula = datos["cedula"];
        // const correo = datos["correo"];
        const nombre = datos["nombre"];
        const rol = datos["rol"];
        const empresa = datos["empresa"];
     
        const informacionPerfil = document.getElementById("informacionPerfil");
        informacionPerfil.innerHTML = `
                <div class="campo">
                    <div class="titulo">
                        <p>Cédula:</p>
                    </div>
                    <div class="texto nombre">
                        <p id = "cedulaAgente">${cedula}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Nombre:</p>
                    </div>
                    <div class="texto nombre">
                        <p>${nombre}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Empresa:</p>
                    </div>
                    <div class="texto correo">
                        <p>${empresa}</p>
                    </div>
                </div>

                <div class="campo">
                    <div class="titulo">
                        <p>Rol:</p>
                    </div>
                    <div class="texto direccion">
                        <p>${rol}</p>
                    </div>
                </div>


        `;

        const editarPerfil = document.getElementById('abrirModal');
        editarPerfil.onclick = function () {
            Modal.modalCero("targetModalEditarPerfil", "cerrar-modal-editar-perfil")
            const modalCuerpo = document.getElementById('modalCuerpoEditarPerfil');
            ModalProfile.editProfileModal(modalCuerpo, datos)
        }
    },

    actualizarAgentes() {
        const nombre = document.getElementById("nombre_completo").value;
        const cedula = document.getElementById("cedula").value;
        const rol = document.getElementById("rol").value;
        const empresa = document.getElementById("empresa").value;
     
        return {
            nombre,
            cedula,
            rol,
            empresa
        };
    },

}

export default VistaProfile;


document.addEventListener('DOMContentLoaded', function () {

    Controller.userData()
    Menu.opcionesMenu()

});

const editarAgente = document.getElementById("botonEditar");
editarAgente.onclick = function () {
    swalAlert.confirmarAccion({
        texto: 'actualizarás los datos del usuario',
        funcionAlAceptar: Controller.editarAgente
    })
};


