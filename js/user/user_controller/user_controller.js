import Model from "../user_model.js";
// import ControllerA from "../../records/controller/records_controller.js";
import swalAlert from "../../components/sweet_alert/sweetAlert.js";
import Miscelaneas from "../../utils/miscelaneas.js";
import VistaUsers from "../users.js";

const Controller ={
    async crearUser(){
        try {
            const datos = VistaUsers.crearUsuario()
          
            const res =  await Model.create_user(datos)

            if (res.status == 201) {
                swalAlert.mostrarAlertaSatisfactorio("Se creo el usuario correctamente");
                Miscelaneas.recargarPagina(1000)
            } else {
                swalAlert.mostrarMensajeError("No se pudo crear")
            }

            
        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al crear el usuario")
        }
     

    },

    async getUsers(){
        const res = await Model.get_all_user()
        VistaUsers.mostrarUsuarios(res)
    }, 
 

}
export default Controller;

