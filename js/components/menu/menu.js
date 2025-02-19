// import Miscelaneas from "../../otros/miscelaneas.js";
import Modelo from "../../records/model/records_model.js";

const Menu = {

    usuarioLogeado() {
        if (!localStorage.getItem("access_token")) {
            location.href = "../index.html";
            return false
        }
        return true
    },

    async opcionesMenu() {
        if (this.usuarioLogeado() == true) {
            const opcionesMenu = document.getElementById("opcionesMenu");
            const datosUsuarioMenu = document.getElementById("datosUsuarioMenu");

            const cedula = localStorage.getItem('cedula')
            const res = await Modelo.mostrarDatos(cedula)
    
            const nombreUsuario = res.data["datos_agente"][0]["nombre"];
            const rolUsuario = res.data["datos_agente"][0]["rol"];
            // const liderEquipoUsuario = res.data["datos_agente"][0]["lider_equipo"];

            if (localStorage.getItem("rol") == "admin") {
                this.opcionesMenuAdmin(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario)
            }

            if (localStorage.getItem("rol") == "calidad") {
                this.opcionesMenuCalidad(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario)
            }

            if (localStorage.getItem("rol") == "team leader") {
                this.opcionesMenuTeamLeader(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario)
            }
            
            if (localStorage.getItem("rol") == "agente") {
                this.opcionesMenuAgente(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario)
            }

        } // Este ELSE no estaba añadido, lo estoy probando 08-02-2025
        else {
            if (localStorage.getItem("rol") == "admin") {
                this.opcionesMenuAdmin(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario)
            }else{
                this.opcionesMenuCalidad(opcionesMenu, datosUsuarioMenu, "Prueba", "rolUsuario", "liderEquipoUsuario")
            }
        }
    },

    opcionesMenuAdmin(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario) {
        opcionesMenu.innerHTML =
            `
            <a class="" href="./admin.html"><i class="fa-solid fa-house"></i> Inicio</a>
            <a class="" href="./estadisticas.html"><i class="fa-solid fa-chart-simple"></i> Estadísticas</a>
            <a class="" href="./usuarios.html"><i class="fa-solid fa-users"></i> Usuarios</a>
            <a class="" href="./perfil.html"><i class="fa-solid fa-user"></i> Perfil</a>
        `

        datosUsuarioMenu.innerHTML = 
        `
        <p>${nombreUsuario} </p>
        <p>${rolUsuario} </p>
        <p>Lider: ${liderEquipoUsuario} </p>
        `

        return opcionesMenu
    },

    opcionesMenuTeamLeader(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario) {
        opcionesMenu.innerHTML =
            `
            <a class="" href="./team_leader.html"><i class="fa-solid fa-house"></i> Inicio</a>
            <a class="" href="./estadisticas.html"><i class="fa-solid fa-chart-simple"></i> Estadísticas</a>
            <a class="" href="./usuarios.html"><i class="fa-solid fa-users"></i> Usuarios</a>
            <a class="" href="./perfil.html"><i class="fa-solid fa-user"></i> Perfil</a>
        `

        datosUsuarioMenu.innerHTML = 
        `
        <p>${nombreUsuario} </p>
        <p>${rolUsuario} </p>
        <p>Lider: ${liderEquipoUsuario} </p>
        `

        return opcionesMenu
    },

    opcionesMenuCalidad(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario) {
        opcionesMenu.innerHTML =
            `
            <a class="" href="./calidad.html"><i class="fa-solid fa-house"></i> Inicio</a>
        `

        datosUsuarioMenu.innerHTML = 
        `
        <p>${nombreUsuario} </p>
        <p>${rolUsuario} </p>
        <p>Lider: ${liderEquipoUsuario} </p>
        `

        return opcionesMenu
    },

    opcionesMenuAgente(opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, liderEquipoUsuario){
        opcionesMenu.innerHTML =
        `
            <a href="agentes.html"><i class="fa-solid fa-house"></i> Inicio</a>
            <a class="" href="./estadisticas.html"><i class="fa-solid fa-chart-simple"></i> Estadísticas</a>
            <a class="" href="./perfil.html"><i class="fa-solid fa-user"></i> Perfil</a>
        `

        datosUsuarioMenu.innerHTML = 
        `
        <p>${nombreUsuario} </p>
        <p>${rolUsuario} </p>
        <p>Lider: ${liderEquipoUsuario} </p>
        `

        return opcionesMenu
    }

}

export default Menu;

const cerrarSesion = document.getElementById("cerrarSesion")

cerrarSesion.onclick = function () {
    localStorage.clear();
    Miscelaneas.redirigirLogin();
}



