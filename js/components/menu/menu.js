import Model from "../../user/user_model.js";
import Miscelaneas from "../../utils/miscelaneas.js";

const Menu = {

    usuarioLogeado() {
        if (!localStorage.getItem("access_token")) {
            location.href = "./login.html";
            return false
        }
        return true
    },

    async opcionesMenu() {
        if (this.usuarioLogeado() == true) {
            
            const nombreEmpresa = document.getElementById('nombreEmpresa')
            const opcionesMenu = document.getElementById("opcionesMenu");
            const datosUsuarioMenu = document.getElementById("datosUsuarioMenu");

            const cedula = localStorage.getItem('cedula')
            
            const res = await Model.getUserInfo(cedula)
            const nombreUsuario = res.data['nombre']
            const rolUsuario = res.data["rol"]
            const empresaNombre = res.data['empresa']
            const logo = res.data['imagen_aliado']

            

            if (localStorage.getItem("rol").toLowerCase() == "admin") {
                this.opcionesMenuAdmin(nombreEmpresa, opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, empresaNombre, logo)
            }

            if (localStorage.getItem("rol").toLowerCase() == "banco") {
                this.opcionesMenuBanco(nombreEmpresa, opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, empresaNombre, logo)
            }
            
            if (localStorage.getItem("rol").toLowerCase() == "asesor") {
                this.opcionesMenuAsesor(nombreEmpresa, opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, empresaNombre, logo)
            }

            if (localStorage.getItem("rol").toLowerCase() == "calidad") {
                this.opcionesMenuCalidad(nombreEmpresa, opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, empresaNombre, logo)
            }

        } // Este ELSE no estaba añadido, lo estoy probando 08-02-2025
        else {
            if (localStorage.getItem("rol").toLowerCase() == "admin") {
                this.opcionesMenuAdmin(nombreEmpresa, opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario,empresaNombre, logo)
            }else{
                this.opcionesMenuCalidad(nombreEmpresa, opcionesMenu, datosUsuarioMenu, "Prueba", "rolUsuario",empresaNombre, logo)
            }
        }
    },

    opcionesMenuAdmin(nombreEmpresa,opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, empresaNombre, logo) {

        nombreEmpresa.innerHTML = 
            `
            <img src="${logo}" alt="">
            <h1 >${empresaNombre}</h1>
            `
        opcionesMenu.innerHTML =
            `
            <a class="" href="./admin.html"><i class="fa-solid fa-house"></i> Inicio</a>
            <a class="" href="./users.html"><i class="fa-solid fa-users"></i> Usuarios</a>
            <a class="" href="./profile.html"><i class="fa-solid fa-user"></i> Perfil</a>
        `

        datosUsuarioMenu.innerHTML = 
        `
        <p>${nombreUsuario} </p>
        <p>${rolUsuario} </p>
    
        `

        return opcionesMenu
    },

    opcionesMenuBanco(nombreEmpresa,opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, empresaNombre, logo) {
        nombreEmpresa.innerHTML = 
        `
        <img src="${logo}" alt="">
        <h1>${empresaNombre}</h1>
        `
        opcionesMenu.innerHTML =
            `
            <a class="" href="./bank.html"><i class="fa-solid fa-house"></i> Inicio</a>
            <a class="" href="./profile.html"><i class="fa-solid fa-users"></i> Perfil</a>
        `

        datosUsuarioMenu.innerHTML = 
        `
        <p>${nombreUsuario} </p>
        <p>${rolUsuario} </p>
        `

        return opcionesMenu
    },

    opcionesMenuAsesor(nombreEmpresa, opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, empresaNombre, logo){
        nombreEmpresa.innerHTML = 
        `
        <img src="${logo}" alt="">
        <h1>${empresaNombre}</h1>
        `
        opcionesMenu.innerHTML =
        `
            <a href="./agent.html"><i class="fa-solid fa-house"></i> Inicio</a>
            <a class="" href="./estadisticas.html"><i class="fa-solid fa-chart-simple"></i> Estadísticas</a>
            <a class="" href="./profile.html"><i class="fa-solid fa-user"></i> Perfil</a>
        `

        datosUsuarioMenu.innerHTML = 
        `
        <p>${nombreUsuario} </p>
        <p>${rolUsuario} </p>
        `

        return opcionesMenu
    },

    opcionesMenuCalidad(nombreEmpresa, opcionesMenu, datosUsuarioMenu, nombreUsuario, rolUsuario, empresaNombre, logo){
        nombreEmpresa.innerHTML = 
        `
        <img src="${logo}" alt="">
        <h1>${empresaNombre}</h1>
        `
        opcionesMenu.innerHTML =
        `
            <a href="./admin.html"><i class="fa-solid fa-house"></i> Inicio</a>
            <a class="" href="./estadisticas.html"><i class="fa-solid fa-chart-simple"></i> Estadísticas</a>
            <a class="" href="./profile.html"><i class="fa-solid fa-user"></i> Perfil</a>
        `

        datosUsuarioMenu.innerHTML = 
        `
        <p>${nombreUsuario} </p>
        <p>${rolUsuario} </p>
        `

        return opcionesMenu
    },

}

export default Menu;

const cerrarSesion = document.getElementById("cerrarSesion")

cerrarSesion.onclick = function () {
    localStorage.clear();
    Miscelaneas.redirigirLogin()
}



