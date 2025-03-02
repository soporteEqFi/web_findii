import Model from "../user_model.js";
// import ControllerA from "../../records/controller/records_controller.js";
import VistaProfile from "../../components/profile.js";
import swalAlert from "../../components/sweet_alert/sweetAlert.js";
import Miscelaneas from "../../utils/miscelaneas.js";

const Controller ={
    
    async userData(){
        const res = await Model.getUserInfo(localStorage.getItem('cedula'))
        VistaProfile.mostrarDatosUsuario(res)
    },

    async editarAgente() {
        try {
            const datos = VistaProfile.actualizarAgentes()
          
            const datosAgente = await Model.getUserInfo(localStorage.getItem('cedula'))
            const idAgente = datosAgente.data['id']
            const res = await Model.update_user(datos, idAgente)

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se actualizo el usuario correctamente");
                Miscelaneas.recargarPagina(1000)
            } else {
                swalAlert.mostrarMensajeError("No se pudo actualizar")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al actualizar el usuario")
        }
    },

}
export default Controller;

