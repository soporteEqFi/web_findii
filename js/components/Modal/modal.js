
const Modal = {

    modalIncrustado(targetModal, btnAbrir, claseCerrarModal) {

        /* MODAL Agregar datos */
        var modal = document.getElementById(targetModal);
        var btnAbrirModal = document.getElementById(btnAbrir);
        var btnCerrarModal = document.getElementsByClassName(claseCerrarModal)[0];
    
        btnAbrirModal.onclick = function () {
            modal.style.display = "block";
        }
    
        btnCerrarModal.onclick = function () {
            modal.style.display = "none";
        }
    
        // Eliminado el evento de click fuera para que no se cierre
    },
    
    modalCero(targetModal, claseCerrarModal) {
    
        /* MODAL Agregar datos */
        var modal = document.getElementById(targetModal);
        //var btnAbrirModal = document.getElementById(btnAbrir);
        var btnCerrarModal = document.getElementsByClassName(claseCerrarModal)[0];
    
        //btnAbrirModal.onclick = function () {
        modal.style.display = "block";
        //}
    
        btnCerrarModal.onclick = function () {
            modal.style.display = "none";
        }
    
        // Eliminado el evento de click fuera para que no se cierre
    },
    
}


export default Modal;