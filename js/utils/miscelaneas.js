const Miscelaneas = {

    redirigirLogin() {
        location.href = ("../index.html");
    },

    redirigirAdmin() {
        location.href = ("./pages/admin.html");
    },

    redirigirTeamLeader() {
        location.href = ("./pages/team_leader.html");
    },

    redirigirCalidad() {
        location.href = ("./pages/calidad.html");
    },
    /*
        redirigirReportes() {
            location.href = ("./pages/reportes.html");
        },

    */
    redirigirAIndex() {
        location.href = ("./pages/agentes.html");
    },


    obtenerFechaActual() {
        const fecha = new Date();

        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; // ¡Recuerda que los meses comienzan desde 0!
        const año = fecha.getFullYear();

        return `${dia}/${mes}/${año}`;
    },

    obtenerFechaActualIngresarVenta() {
        const fecha = new Date();

        const dia = Miscelaneas.agregarCeroAlInicio(fecha.getDate());
        const mes = Miscelaneas.agregarCeroAlInicio(fecha.getMonth() + 1); // ¡Recuerda que los meses comienzan desde 0!
        const año = Miscelaneas.agregarCeroAlInicio(fecha.getFullYear());

        return `${dia}/${mes}/${año}`;
    },

    // Función para agregar un cero al inicio si el número es menor que 10
    agregarCeroAlInicio(numero) {
        return numero < 10 ? `0${numero}` : numero;
    },

    obtenerHoraActual() {
        const fecha = new Date();

        const horas = Miscelaneas.agregarCeroAlInicio(fecha.getHours());
        const minutos = Miscelaneas.agregarCeroAlInicio(fecha.getMinutes());
        const segundos = Miscelaneas.agregarCeroAlInicio(fecha.getSeconds());

        return `${horas}:${minutos}:${segundos}`;
    },

    // NO SIRVE
    capitalizarTexto(texto) {
        return texto.replace(/\b\w/g, function (l) {
            return l.toUpperCase();
        });
    },

    convertirAMayusculas(texto) {
        return texto.toUpperCase();
    },

    limpiarSaltosDeLinea(texto) {
        // Eliminar saltos de línea y espacios adicionales
        let textoSinEspacios = texto.replace(/\s+/g, ' ');

        // Eliminar espacios al principio y al final
        let textoLimpio = textoSinEspacios.trim();

        return textoLimpio
    },

    recargarPagina(tiempo) {
        setTimeout(function () {
            window.location.reload()
        }, tiempo);
    },

    formatearFechaParaEnvio() {
        // Crear un nuevo objeto Date, que contendrá la fecha y hora actuales
        var fechaActual = new Date();

        // Obtener los componentes de la fecha y hora
        var año = fechaActual.getFullYear();
        var mes = fechaActual.getMonth() + 1; // Se le agrega +1 ya que sino, iniciaria el mes desde 0 (ej. Enero = 0, Febrero = 1)
        var dia = fechaActual.getDate();
        var horas = fechaActual.getHours();
        var minutos = fechaActual.getMinutes();
        var segundos = fechaActual.getSeconds();

        // Formatear la salida para asegurarse de que los valores tengan dos dígitos
        if (mes < 10) {
            mes = '0' + mes;
        }

        if (dia < 10) {
            dia = '0' + dia;
        }

        if (horas < 10) {
            horas = '0' + horas;
        }

        if (minutos < 10) {
            minutos = '0' + minutos;
        }

        if (segundos < 10) {
            segundos = '0' + segundos;
        }

        // Crear una cadena con la fecha y hora formateada
        var fechaHoraActual = dia + '/' + mes + '/' + año + ' ' + horas + ':' + minutos + ':' + segundos;

        // Imprimir la cadena
        return fechaHoraActual
    },

    formatearFechaParaEnvio(fecha) {
        // Formatea la fecha en el formato deseado (dd/mm/yyyy)
        if (fecha.length == 0) {
            return fecha;
        } else {
            let dias = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var partes = fecha.split("-");

            if (dias.includes(parseInt(partes[2]))) {
                var fechaFormateada = partes[2].replace("0", "") + "/" + partes[1] + "/" + partes[0];
            } else {
                var fechaFormateada = partes[2] + "/" + partes[1] + "/" + partes[0];
            }
            return fechaFormateada;
        }
    },

    /* REGISTRO DE USUARIOS */

    unirNombreApellido(primerNombre, primerApellido) {
        const nombreFinal = primerNombre.trim();
        const apellidoFinal = primerApellido.trim();

        const usuario = `${nombreFinal.toLowerCase()}.${apellidoFinal.toLowerCase()}`
        return usuario
    },

    capitalizarTexto(texto) {
        return texto.replace(/\b\w/g, function (l) {
            return l.toUpperCase();
        });
    },

    generarNumeroAleatorio() {
        // Generar un número aleatorio entre 0 y 99999
        let numeroAleatorio = Math.floor(Math.random() * 1000000);

        // Convertir el número en una cadena y agregar ceros a la izquierda si es necesario
        let numeroComoString = numeroAleatorio.toString();
        while (numeroComoString.length < 6) {
            numeroComoString = "0" + numeroComoString;
        }

        return numeroComoString;
    },

}

export default Miscelaneas;