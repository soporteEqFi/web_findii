
const sweetAlert = {

    mostrarMensajeError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: mensaje,
        })
    },

    mostrarAlertaSatisfactorio(mensaje) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    },

    mensajeDeCarga(mensaje){
        Swal.fire({
            title: mensaje,
            // html: '<div class="spinner"></div>',
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
            didOpen: () => {
              Swal.showLoading();
            }
          });
          
    }
    


}
export default sweetAlert;